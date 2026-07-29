/**
 * Fire-and-forget request to the /api/welcome serverless function that emails
 * a thank-you note to a user who just signed in. Never throws — a failed or
 * unconfigured email must never block sign-in.
 */
export function sendWelcomeEmail(email: string, name?: string): void {
  if (!email) return;
  try {
    void fetch('/api/welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
      keepalive: true,
    }).catch(() => {
      /* ignore network/API errors */
    });
  } catch {
    /* ignore */
  }
}
