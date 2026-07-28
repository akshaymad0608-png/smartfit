import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) ||
  '9198804182-08bsp6pcdtkpohjda8l74kvm1t08uj7p.apps.googleusercontent.com';

export function GoogleSignInButton({ onSuccess }: { onSuccess?: () => void }) {
  const { signInWithGoogle, signInDemo } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setLoading(false);
        signInWithGoogle(event.data.id_token);
        onSuccess?.();
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setLoading(false);
        console.error('OAuth error:', event.data.error);
        alert('Authentication failed: ' + event.data.error);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [signInWithGoogle, onSuccess]);

  const handleConnect = async () => {
    if (!CLIENT_ID) {
      demo();
      return;
    }
    
    setLoading(true);
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'email profile openid',
        prompt: 'select_account',
      });
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
      const authWindow = window.open(authUrl, 'oauth_popup', 'width=500,height=600');
      
      if (!authWindow) {
        setLoading(false);
        alert('Please allow popups for this site to sign in with Google.');
      }
    } catch (error) {
      setLoading(false);
      console.error('OAuth initiation error:', error);
    }
  };

  const demo = () => {
    signInDemo();
    onSuccess?.();
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-line bg-card px-6 py-3 font-semibold text-heading shadow-soft transition-colors hover:bg-surface-muted disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <GoogleIcon /> {loading ? 'Signing in...' : 'Continue with Google'}
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
