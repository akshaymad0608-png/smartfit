import { useCountUp } from '@/hooks/useCountUp';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Animated number that counts up when scrolled into view. */
export function Counter({ value, prefix = '', suffix = '', className }: CounterProps) {
  const { ref, value: current } = useCountUp(value);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}
