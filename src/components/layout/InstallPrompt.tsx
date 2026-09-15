import { AnimatePresence, motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const DISMISS_KEY = 'fitsmart-install-dismissed';
const COOKIE_KEY = 'fitsmart-cookie-consent';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * "Add FitSmart to your home screen" — a mobile-only nudge to install the
 * PWA. FitSmart already ships a full manifest + service worker (vite-plugin-
 * pwa), so the browser is capable of installing it, but nothing ever told a
 * mobile visitor that option exists. Chrome's own install icon is easy to
 * miss in a crowded address bar; this surfaces the same action explicitly.
 *
 * Waits for the cookie banner to be dismissed first (checked via a short
 * poll rather than a prop, since CookieConsent owns its own localStorage
 * key and the two are siblings in Layout) so a first-time mobile visitor
 * never sees two banners stacked at once. Dismissing this remembers the
 * choice for 14 days rather than forever — installability can change (a
 * missed manifest update, a re-visit after clearing data), so a permanent
 * "never ask again" isn't the right default for a free tool.
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  useEffect(() => {
    if (!deferredPrompt) return;

    let dismissedUntil = 0;
    try {
      dismissedUntil = Number(localStorage.getItem(DISMISS_KEY)) || 0;
    } catch {
      /* storage unavailable */
    }
    if (Date.now() < dismissedUntil) return;

    // Poll briefly for the cookie banner's own decision instead of showing
    // over it — CookieConsent shows itself ~1.2s after mount and this
    // should never compete with it for a first-time visitor's attention.
    const poll = window.setInterval(() => {
      try {
        if (localStorage.getItem(COOKIE_KEY)) {
          setShow(true);
          window.clearInterval(poll);
        }
      } catch {
        setShow(true);
        window.clearInterval(poll);
      }
    }, 500);
    // Safety net: show anyway after 8s even if the cookie key never
    // appears (e.g. storage blocked), so the prompt isn't silently lost.
    const fallback = window.setTimeout(() => setShow(true), 8000);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(fallback);
    };
  }, [deferredPrompt]);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 14 * 24 * 60 * 60 * 1000));
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Install FitSmart"
          className="fixed inset-x-4 bottom-20 z-[74] mx-auto max-w-md rounded-2xl border border-line bg-card p-4 shadow-card sm:hidden"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Download size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-heading">Add FitSmart to your home screen</p>
              <p className="mt-0.5 text-xs text-muted">
                Faster access to calculators and workouts — works offline too.
              </p>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="-m-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-muted hover:text-heading"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={dismiss}
              className="flex min-h-11 flex-1 items-center justify-center rounded-full border border-line text-sm font-semibold text-body transition-colors hover:bg-surface-muted"
            >
              Not now
            </button>
            <button
              onClick={install}
              className="flex min-h-11 flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              Install
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
