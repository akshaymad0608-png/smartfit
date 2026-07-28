import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

/** Soft, rounded surface card. Set `interactive` for hover lift on links/CTAs. */
export function Card({ className, interactive, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-line bg-card shadow-soft',
        interactive &&
          'transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
