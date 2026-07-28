import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { GoogleCredentialResponse } from './gsi';

// A Google OAuth Client ID is public (safe in frontend code); the env var only
// overrides the built-in default so different environments can point elsewhere.
const CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) ||
  '9198804182-08bsp6pcdtkpohjda8l74kvm1t08uj7p.apps.googleusercontent.com';
const GSI_SRC = 'https://accounts.google.com/gsi/client';

let gsiPromise: Promise<void> | null = null;
function loadGsi(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
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

/**
 * Renders the official "Sign in with Google" button when VITE_GOOGLE_CLIENT_ID
 * is set. Falls back to a working demo button otherwise, so the auth flow is
 * usable immediately and becomes real Google sign-in once the ID is configured.
 */
export function GoogleSignInButton({ onSuccess }: { onSuccess?: () => void }) {
  const { signInWithGoogle, signInDemo } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Keep latest callbacks in refs so the GSI button initializes only once.
  const signInRef = useRef(signInWithGoogle);
  signInRef.current = signInWithGoogle;
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;
    loadGsi()
      .then(() => {
        if (cancelled || !ref.current || !window.google) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (res: GoogleCredentialResponse) => {
            signInRef.current(res.credential);
            onSuccessRef.current?.();
          },
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.renderButton(ref.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          logo_alignment: 'left',
          width: 320,
        });
        setReady(true);
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const demo = () => {
    signInDemo();
    onSuccess?.();
  };

  // Real Google button (configured + loaded)
  if (CLIENT_ID && !failed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div ref={ref} className="min-h-[44px]" />
        {!ready && <p className="text-xs text-muted">Loading Google Sign-In…</p>}
      </div>
    );
  }

  // Fallback: demo button (no client id configured, or GSI blocked)
  return (
    <button
      onClick={demo}
      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-line bg-card px-6 py-3 font-semibold text-heading shadow-soft transition-colors hover:bg-surface-muted"
    >
      <GoogleIcon /> Continue with Google
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.42 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
