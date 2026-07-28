import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/Avatar';

/** Header account control: sign-in link when logged out, avatar menu when in. */
export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!user) {
    return (
      <Link
        to="/login"
        aria-label="Sign in"
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-body transition-colors hover:text-primary"
      >
        <User size={18} />
      </Link>
    );
  }

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
        className="grid place-items-center rounded-full ring-2 ring-transparent transition hover:ring-primary/30"
      >
        <Avatar initials={initials} src={user.picture} name={user.name} className="h-10 w-10" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-card"
          >
            <div className="border-b border-line px-3 py-2.5">
              <p className="truncate font-semibold text-heading">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-surface-muted"
            >
              <LayoutDashboard size={16} className="text-muted" /> Dashboard
            </Link>
            <button
              onClick={() => {
                signOut();
                setOpen(false);
                navigate('/');
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-body transition-colors hover:bg-surface-muted"
            >
              <LogOut size={16} className="text-muted" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
