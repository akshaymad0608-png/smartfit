import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Show the "FitSmart" wordmark alongside the mark. */
  showWordmark?: boolean;
  /** Pixel height of the mark. */
  size?: number;
}

/** Width / height of /logo-mark.png (200 x 135). */
const MARK_RATIO = 200 / 135;

/**
 * FitSmart logo — the two-athlete emblem from /logo-mark.png (cropped from the
 * full lockup in /logo.png) plus a live text wordmark. The wordmark is text so
 * it stays sharp and readable at header size and follows the theme; the image
 * has a white background, so it sits in a small rounded tile.
 */
export function Logo({ className, showWordmark = true, size = 40 }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/logo-mark.png"
        alt={showWordmark ? '' : 'FitSmart'}
        width={Math.round(size * MARK_RATIO)}
        height={size}
        decoding="async"
        className="rounded-lg bg-white object-contain"
      />
      {showWordmark && (
        <span className="text-lg font-extrabold tracking-tight text-heading">
          Fit<span className="text-gradient">Smart</span>
        </span>
      )}
    </span>
  );
}
