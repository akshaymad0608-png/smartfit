import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Tone = 'primary' | 'secondary' | 'accent' | 'neutral';

const tones: Record<Tone, string> = {
  primary: 'bg-primary-50 text-primary-700 dark:bg-primary/15 dark:text-primary-300',
  secondary: 'bg-secondary-50 text-secondary-600 dark:bg-secondary/15 dark:text-secondary-400',
  accent: 'bg-amber-50 text-amber-700 dark:bg-accent/15 dark:text-accent-400',
  neutral: 'bg-surface-muted text-muted',
};

export function Badge({
  children,
  tone = 'primary',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
