import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

/**
 * Scroll-reveal wrapper — fades + slides content in once on view.
 *
 * `margin: '-80px'` shrinks the intersection root by 80px on every edge
 * before framer-motion's default `amount: "some"` threshold is checked
 * against it. That's fine for a short card, but plenty of the content this
 * wraps — the Workouts spotlight card measured 668px tall against a 767px
 * viewport — is taller than the shrunk root ends up being. The element
 * then never satisfies "some of me is inside that window" cleanly, so
 * `whileInView` never fires: content sits at its `initial` opacity: 0
 * forever, buttons and links inside it un-clickable, with no error to
 * explain why. `amount: 0` fires on the first visible pixel instead of a
 * size-relative ratio, which a tall element can always satisfy; dropping
 * the negative margin removes the geometry that caused this in the first
 * place, at the cost of the reveal starting slightly earlier on scroll —
 * a fully visible page is worth more than a few px of extra runway.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
