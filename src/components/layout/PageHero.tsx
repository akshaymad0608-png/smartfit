import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, crumbs = [], children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-muted">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <Container className="relative py-14 md:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight size={14} aria-hidden />
                  {c.href ? (
                    <Link to={c.href} className="hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-body">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-primary">
              {eyebrow}
            </span>
          )}
          <h1 className="text-hero font-extrabold text-heading">{title}</h1>
          {subtitle && <p className="mt-4 text-body-lg text-body">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
