import { useState } from 'react';
import { cn } from '@/lib/cn';

interface AvatarProps {
  initials: string;
  src?: string;
  name?: string;
  className?: string;
}

/** Photo avatar with a graceful initials fallback (used for members & team). */
export function Avatar({ initials, src, name, className }: AvatarProps) {
  const [ok, setOk] = useState(Boolean(src));

  if (src && ok) {
    return (
      <img
        src={src}
        alt={name ?? ''}
        loading="lazy"
        onError={() => setOk(false)}
        className={cn('h-11 w-11 rounded-full object-cover', className)}
      />
    );
  }

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
