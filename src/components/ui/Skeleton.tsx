import { cn } from '@/lib/cn';

/** Shimmering placeholder for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-surface-muted',
        className,
      )}
      aria-hidden
    />
  );
}
