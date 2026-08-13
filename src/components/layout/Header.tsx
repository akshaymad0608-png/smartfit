import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { primaryNav, type NavItem } from '@/config/site';
import { cn } from '@/lib/cn';
import { MobileDrawer } from './MobileDrawer';
import { SearchModal } from './SearchModal';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

function MegaMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors',
            isActive ? 'text-primary' : 'text-body hover:text-heading',
          )
        }
      >
        {item.label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </NavLink>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full w-72 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-card">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface-muted"
                >
                  <span className="block text-sm font-semibold text-heading">{child.label}</span>
                  {child.description && (
                    <span className="mt-0.5 block text-xs text-muted">{child.description}</span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard shortcut: ⌘K / Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'glass border-b border-line' : 'border-b border-transparent',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-18">
          <Link to="/" aria-label="FitSmart home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {primaryNav.map((item) =>
              item.children ? (
                <MegaMenu key={item.href} item={item} />
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-primary' : 'text-body hover:text-heading',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Ctrl+K)"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-body transition-colors hover:text-primary"
            >
              <Search size={18} />
            </button>
            <ThemeToggle />
            <div className="hidden sm:block">
              <UserMenu />
            </div>
            <Button as="link" to="/programs" size="sm" className="hidden sm:inline-flex">
              Get Started
            </Button>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-body xl:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
