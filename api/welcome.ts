import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * POST /api/welcome  { email, name }
 * Sends a thank-you email to a user who just signed in.
 *
 * Runs server-side on Vercel so the email API key is never exposed to the
 * browser. Configure these environment variables in the Vercel dashboard:
 *   RESEND_API_KEY      – from https://resend.com (required)
 *   WELCOME_FROM_EMAIL  – e.g. "SmartFit <hello@fitsmart.space>"
 *                          (must be a Resend-verified sender/domain)
 *
 * If RESEND_API_KEY is missing it no-ops gracefully so sign-in never breaks.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const email = (body?.email ?? '').toString().trim();
  const name = (body?.name ?? '').toString().trim();

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.WELCOME_FROM_EMAIL || 'SmartFit <onboarding@resend.dev>';

  // Not configured yet — don't fail sign-in, just report skipped.
  if (!apiKey) {
    return res.status(200).json({ ok: false, skipped: 'email-not-configured' });
  }

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: 'Welcome to SmartFit — thanks for joining! 🎉',
        html: buildHtml(name || 'there'),
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      return res.status(502).json({ ok: false, error: 'send-failed', detail });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: (err as Error).message });
  }
}

function safeParse(s: string): Record<string, unknown> {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

function buildHtml(name: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#fafaf8;font-family:Inter,Segoe UI,Arial,sans-serif;color:#374151;">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;">
        <div style="height:6px;background:linear-gradient(90deg,#3B82F6,#10B981);"></div>
        <div style="padding:32px;">
          <div style="font-size:22px;font-weight:800;color:#111827;">Smart<span style="color:#10B981;">Fit</span></div>
          <h1 style="font-size:24px;color:#111827;margin:20px 0 8px;">Thanks for joining, ${escapeHtml(name)}! 🎉</h1>
          <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
            Welcome to <strong>SmartFit</strong> — smarter fitness, better health. Your account is ready,
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
            You're receiving this because you signed in to SmartFit. Stay strong 💪
          </p>
        </div>
      </div>
      <p style="text-align:center;font-size:12px;color:#9ca3af;margin:16px 0 0;">
        © ${new Date().getFullYear()} SmartFit · Smarter Fitness. Better Health.
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
