import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { primaryNav } from '@/config/site';
import { cn } from '@/lib/cn';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { user, signOut } = useAuth();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] xl:hidden">
          <motion.div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute right-0 top-0 flex h-full w-[min(86vw,22rem)] flex-col bg-card shadow-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 38 }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo size={32} />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-muted hover:bg-surface-muted hover:text-heading"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {primaryNav.map((item) => (
                <div key={item.href} className="mb-1">
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary dark:bg-primary/15'
                          : 'text-heading hover:bg-surface-muted',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="ml-3 border-l border-line pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          to={c.href}
                          className="block rounded-lg px-3 py-2 text-sm text-body hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="space-y-2 border-t border-line p-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-1 pb-1">
                    <Avatar
                      initials={user.name.slice(0, 2).toUpperCase()}
                      src={user.picture}
                      name={user.name}
                      className="h-9 w-9"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-heading">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  <Button as="link" to="/dashboard" variant="outline" className="w-full">
                    Dashboard
                  </Button>
                  <Button onClick={signOut} variant="ghost" className="w-full">
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button as="link" to="/login" variant="outline" className="w-full">
                    Sign in
                  </Button>
                  <Button as="link" to="/programs" className="w-full">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
