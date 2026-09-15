import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Apple, Bot, Menu } from 'lucide-react';
import { MobileDrawer } from './MobileDrawer';
import { cn } from '@/lib/cn';

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/nutrition', label: 'Nutrition', icon: Apple },
  { to: '/ai-coach', label: 'Coach', icon: Bot },
];

/**
 * App-style bottom tab bar, mobile only. A hamburger-menu drawer reads as
 * "website" — a persistent bottom bar with the core sections one thumb-tap
 * away is the pattern every native fitness app (and most PWAs people
 * actually keep on their home screen) uses instead. Sits alongside the
 * existing MobileDrawer rather than replacing it: the 5th slot opens the
 * same drawer for everything that doesn't fit 4 icons (Calculators,
 * Programs, Blog, About, account).
 *
 * Renders its own independent MobileDrawer instance (open state local to
 * this component) rather than threading Header's drawer state down through
 * props — MobileDrawer is a plain controlled component, so two instances
 * with separate state are safe and far less invasive than refactoring
 * Header to accept external control.
 */
export function MobileTabBar() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-[73] border-t border-line bg-card/95 backdrop-blur-lg lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-5">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                cn(
                  'flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors',
                  isActive ? 'text-primary' : 'text-muted hover:text-heading',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <tab.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.label}
                </>
              )}
            </NavLink>
          ))}
          <button
            onClick={() => setMoreOpen(true)}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-muted transition-colors hover:text-heading"
          >
            <Menu size={20} />
            More
          </button>
        </div>
      </nav>
      <MobileDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
