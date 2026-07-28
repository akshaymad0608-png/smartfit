import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import { BackToTop } from './BackToTop';
import { ScrollToTop } from './ScrollToTop';
import { PageLoader } from './PageLoader';
import { ErrorBoundary } from './ErrorBoundary';
import { CookieConsent } from './CookieConsent';

export function Layout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1 pt-16 lg:pt-18">
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <div key={location.pathname}>
                <Outlet />
              </div>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}
