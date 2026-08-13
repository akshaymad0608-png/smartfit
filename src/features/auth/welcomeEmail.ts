import emailjs from '@emailjs/browser';

/**
 * Client-side welcome email via EmailJS — no backend/serverless needed, so it
 * works on any static host. Configure these (public) env vars at build time:
 *   VITE_EMAILJS_PUBLIC_KEY   – EmailJS account public key
 *   VITE_EMAILJS_SERVICE_ID   – the connected email service
 *   VITE_EMAILJS_TEMPLATE_ID  – the welcome template (its "To Email" = {{to_email}})
 *
 * Fire-and-forget: never throws, never blocks sign-in. No-ops if unconfigured.
 */
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;

export function sendWelcomeEmail(email: string, name?: string): void {
  if (!email || !PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) return;
  const displayName = name || 'there';
  try {
    void emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // Provide several common variable names so the template just works.
          to_email: email,
          to_name: displayName,
          email,
          name: displayName,
          subject: 'Welcome to FitSmart — thanks for joining!',
        },
        { publicKey: PUBLIC_KEY },
      )
      .catch(() => {
        /* ignore EmailJS errors — email is best-effort */
      });
  } catch {
    /* ignore */
  }
}
