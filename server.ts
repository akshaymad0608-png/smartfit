import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/welcome", async (req, res) => {
    const email = (req.body?.email ?? "").toString().trim();
    const name = (req.body?.name ?? "").toString().trim();

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      res.status(400).json({ error: "A valid email is required" });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.WELCOME_FROM_EMAIL || "FitSmart <onboarding@resend.dev>";

    // Not configured yet — don't fail sign-in, just report skipped.
    if (!apiKey) {
      res.status(200).json({ ok: false, skipped: "email-not-configured" });
      return;
    }

    try {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [email],
          subject: "Welcome to FitSmart — thanks for joining! 🎉",
          html: buildHtml(name || "there"),
        }),
      });

      if (!resp.ok) {
        const detail = await resp.text();
        res.status(502).json({ ok: false, error: "send-failed", detail });
        return;
      }
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ ok: false, error: (err as Error).message });
    }
  });

  // Google OAuth callback
  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { code, error } = req.query;

    if (error) {
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${error}' }, '*');
                window.close();
              }
            </script>
            <p>Authentication failed. You can close this window.</p>
          </body>
        </html>
      `);
      return;
    }

    if (!code) {
      res.status(400).send("No authorization code provided.");
      return;
    }

    try {
      const redirectUri = `https://${req.get("host")}/auth/callback`;
      
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.VITE_GOOGLE_CLIENT_ID || "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
          code: code as string,
          grant_type: "authorization_code",
          redirect_uri: redirectUri,
        }),
      });

      const tokens = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokens.error_description || tokens.error || "Failed to exchange code");
      }

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'OAUTH_AUTH_SUCCESS', 
                  id_token: '${tokens.id_token}'
                }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: '${errorMessage}' }, '*');
                window.close();
              }
            </script>
            <p>Authentication failed: ${errorMessage}. You can close this window.</p>
          </body>
        </html>
      `);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

function buildHtml(name: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#fafaf8;font-family:Inter,Segoe UI,Arial,sans-serif;color:#374151;">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
        <div style="height:6px;background:linear-gradient(90deg,#3B82F6,#10B981);"></div>
        <div style="padding:32px;">
          <div style="font-size:22px;font-weight:800;color:#111827;">Fit<span style="color:#10B981;">Smart</span></div>
          <h1 style="font-size:24px;color:#111827;margin:20px 0 8px;">Thanks for joining, ${escapeHtml(name)}! 🎉</h1>
          <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
            Welcome to <strong>FitSmart</strong> — smarter fitness, better health. Your account is ready,
            and everything you need to train smarter is one click away.
          </p>
          <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">Here's a great place to start:</p>
          <ul style="font-size:15px;line-height:1.9;padding-left:18px;margin:0 0 24px;">
            <li>Set your targets with the <strong>health calculators</strong></li>
            <li>Pick a <strong>guided program</strong> that matches your goal</li>
            <li>Generate a plan with your <strong>AI coach</strong></li>
          </ul>
          <a href="https://fitsmart.space/dashboard"
             style="display:inline-block;background:#3B82F6;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:999px;">
            Go to your dashboard
          </a>
          <p style="font-size:13px;color:#6b7280;margin:28px 0 0;">
            You're receiving this because you signed in to FitSmart. Stay strong 💪
          </p>
        </div>
      </div>
      <p style="text-align:center;font-size:12px;color:#9ca3af;margin:16px 0 0;">
        © ${new Date().getFullYear()} FitSmart · Smarter Fitness. Better Health.
      </p>
    </div>
  </body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}
