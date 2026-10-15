import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppRoutes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 },
  },
});

/**
 * Auto ads are allowed only on long-form content (the blog). App screens,
 * calculators, utility and legal pages stay ad-free; the CSS in index.css
 * hides anything AdSense injects while data-ads is not "on".
 */
const AD_FRIENDLY = [/^\/blog$/, /^\/blog\/[^/]+$/];

function AdGuard() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/';
    document.documentElement.setAttribute(
      'data-ads',
      AD_FRIENDLY.some((re) => re.test(path)) ? 'on' : 'off',
    );
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <AdGuard />
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
