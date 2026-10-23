import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Show the "FitSmart" wordmark alongside the mark. */
  showWordmark?: boolean;
  /** Pixel height of the mark. */
  size?: number;
}

/**
 * FitSmart logo — the "FS" monogram tile from /logo-mark.svg plus a live text
 * wordmark. The wordmark is text so it stays sharp and readable at header size
 * and follows the theme; the mark is a self-contained gradient tile.
 */
export function Logo({ className, showWordmark = true, size = 40 }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/logo-mark.svg"
        alt={showWordmark ? '' : 'FitSmart'}
        width={size}
        height={size}
        decoding="async"
        className="object-contain"
      />
      {showWordmark && (
        <span className="text-lg font-extrabold tracking-tight text-heading">
          Fit<span className="text-gradient">Smart</span>
        </span>
      )}
    </span>
  );
}
