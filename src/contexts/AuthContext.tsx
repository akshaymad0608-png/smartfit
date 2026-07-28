import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  picture?: string;
  provider: 'google' | 'demo';
}

interface AuthContextValue {
  user: AuthUser | null;
  /** Sign in from a Google Identity Services credential (JWT). */
  signInWithGoogle: (credential: string) => void;
  /** Local demo sign-in used when no Google Client ID is configured. */
  signInDemo: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'smartfit-user';

/** Decode a JWT payload safely (unicode-aware, no verification — client display only). */
function decodeJwt(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
  }, [user]);

  const signInWithGoogle = useCallback((credential: string) => {
    const claims = decodeJwt(credential);
    if (!claims) return;
    setUser({
      name: (claims.name as string) ?? (claims.email as string) ?? 'Member',
      email: (claims.email as string) ?? '',
      picture: claims.picture as string | undefined,
      provider: 'google',
    });
  }, []);

  const signInDemo = useCallback(() => {
    setUser({
      name: 'Alex Rivera',
      email: 'alex.demo@fitsmart.space',
      provider: 'demo',
    });
  }, []);

  const signOut = useCallback(() => {
    // Best-effort GIS disable so the account chooser reappears next time.
    try {
      window.google?.accounts?.id?.disableAutoSelect?.();
    } catch {
      /* ignore */
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, signInWithGoogle, signInDemo, signOut }),
    [user, signInWithGoogle, signInDemo, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
