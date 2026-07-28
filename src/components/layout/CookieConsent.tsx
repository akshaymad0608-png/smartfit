import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const KEY = 'smartfit-cookie-consent';

/**
 * Minimal, privacy-first cookie notice. SmartFit only uses essential local
 * storage, so this is informational with a single acknowledge action.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay so it doesn't fight with first paint / LCP.
    const t = window.setTimeout(() => {
      try {
        if (!localStorage.getItem(KEY)) setShow(true);
      } catch {
        /* storage unavailable */
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const decide = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie notice"
          className="fixed inset-x-4 bottom-4 z-[75] mx-auto max-w-2xl rounded-2xl border border-line bg-card p-4 shadow-card sm:flex sm:items-center sm:gap-4 sm:p-5"
        >
          <span className="mb-3 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:mb-0">
            <Cookie size={20} />
          </span>
          <p className="mb-3 flex-1 text-sm text-body sm:mb-0">
            We use essential local storage to remember your preferences — no ads or cross-site
            tracking. See our{' '}
            <Link to="/cookies" className="font-semibold text-primary hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => decide('essential')}
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-body transition-colors hover:bg-surface-muted"
            >
              Essential only
            </button>
            <button
              onClick={() => decide('accepted')}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
