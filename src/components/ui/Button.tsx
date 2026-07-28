import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-soft hover:bg-primary-600 hover:shadow-lift hover:-translate-y-0.5',
  secondary:
    'bg-secondary text-white shadow-soft hover:bg-secondary-600 hover:shadow-lift hover:-translate-y-0.5',
  outline:
    'border border-line bg-card text-heading hover:border-primary hover:text-primary hover:-translate-y-0.5',
  ghost: 'text-body hover:bg-surface-muted hover:text-heading',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 h-9',
  md: 'text-sm px-5 h-11',
  lg: 'text-base px-7 h-13',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

type ButtonProps =
  | (CommonProps & { as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | (CommonProps & { as: 'link'; to: string })
  | (CommonProps & { as: 'a'; href: string });

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, leftIcon, rightIcon } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {inner}
      </Link>
    );
  }
  if (props.as === 'a') {
    return (
      <a href={props.href} className={classes} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, leftIcon: _l, rightIcon: _r, as: _a, ...buttonRest } = props;
  return (
    <button className={classes} {...buttonRest}>
      {inner}
    </button>
  );
}
