import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';
import { Container } from './Container';
import { Reveal } from '@/components/motion/Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/** Consistent section heading block with eyebrow, title and subtitle. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="text-section font-extrabold text-heading">{title}</h2>
      {subtitle && <p className="mt-4 text-body-lg text-body">{subtitle}</p>}
    </Reveal>
  );
}

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Vertical padding scale. */
  spacing?: 'sm' | 'md' | 'lg';
  muted?: boolean;
}

const spacings = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  spacing = 'md',
  muted = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(spacings[spacing], muted && 'bg-surface-muted', className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
