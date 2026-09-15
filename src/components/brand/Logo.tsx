import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Show the "FitSmart" wordmark alongside the mark. */
  showWordmark?: boolean;
  /** Pixel size of the square mark. */
  size?: number;
}

/**
 * FitSmart logo — a rounded gradient badge with a weightlifter-and-barbell
 * mark: the universal, instantly-readable gym pictogram (same shape as the
 * Olympic weightlifting icon), built from plain geometric shapes rather
 * than an illustrated character, so it stays crisp from a 16px favicon up
 * to the header. Blue → green, matching the brand palette (unchanged from
 * the previous heartbeat-pulse mark).
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
        {/* Barbell: outer + inner plates each end, bar through the middle */}
        <rect x="6" y="16" width="6" height="22" rx="2" fill="#FFFFFF" />
        <rect x="13" y="19" width="4" height="16" rx="2" fill="#FFFFFF" />
        <rect x="52" y="16" width="6" height="22" rx="2" fill="#FFFFFF" />
        <rect x="47" y="19" width="4" height="16" rx="2" fill="#FFFFFF" />
        <rect x="15" y="25.5" width="34" height="3" rx="1.5" fill="#FFFFFF" />
        {/* Figure: head, torso, arms up to the bar, legs braced apart */}
        <circle cx="32" cy="18" r="4.2" fill="#FFFFFF" />
        <rect x="29" y="24" width="6" height="12" rx="3" fill="#FFFFFF" />
        <path
          d="M30 26 L17 27 M34 26 L47 27 M30 35 L24 50 M34 35 L40 50"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
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
