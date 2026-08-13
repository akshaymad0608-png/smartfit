import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Show the "FitSmart" wordmark alongside the mark. */
  showWordmark?: boolean;
  /** Pixel size of the square mark. */
  size?: number;
}

/**
 * FitSmart logo — a rounded gradient badge holding a heartbeat pulse that reads
 * as an implied "S". Blue → green, matching the brand palette.
 */
export function Logo({ className, showWordmark = true, size = 36 }: LogoProps) {
  const gid = 'sf-logo-grad';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="FitSmart"
      >
        <defs>
          <linearGradient id={gid} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="16" fill={`url(#${gid})`} />
        <path
          d="M14 34 H22 L26 24 L32 44 L38 30 L41 34 H50"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span className="text-lg font-extrabold tracking-tight text-heading">
          Fit<span className="text-gradient">Smart</span>
        </span>
      )}
    </span>
  );
}
