import { cn } from '@/lib/cn';

/** Initials avatar with a subtle brand gradient ring. */
export function Avatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white',
        className,
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}
