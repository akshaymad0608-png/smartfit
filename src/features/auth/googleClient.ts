// A Google OAuth Client ID is public (safe in frontend code); the env var only
// overrides the built-in default so different environments can point elsewhere.
// Shared by both the "Sign in with Google" button and Google Fit connect
// button — one client ID, one consent screen, two scopes.
export const GOOGLE_CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) ||
  '9198804182-08bsp6pcdtkpohjda8l74kvm1t08uj7p.apps.googleusercontent.com';

export const GSI_SRC = 'https://accounts.google.com/gsi/client';

let gsiPromise: Promise<void> | null = null;

/** Loads the Google Identity Services script once, shared across sign-in and Fit connect. */
export function loadGsi(): Promise<void> {
  if (window.google?.accounts) return Promise.resolve();
  if (gsiPromise) return gsiPromise;
  gsiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('gsi failed')));
      return;
    }
    const s = document.createElement('script');
    s.src = GSI_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('gsi failed'));
    document.head.appendChild(s);
  });
  return gsiPromise;
}
