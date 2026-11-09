import { useState } from 'react';
import { Move3D } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import { Motion3D } from './Motion3D';
import { MOTIONS } from './motions';

export interface GuideMove {
  title: string;
  motion: string;
  /** Muscle keys that glow. */
  muscles: string[];
  /** The real exercise uses a machine or a variation; the figure shows the closest free movement. */
  approximate?: boolean;
}

const LABEL: Record<string, string> = {
  chest: 'Chest', back: 'Back', shoulders: 'Shoulders', biceps: 'Biceps', triceps: 'Triceps',
  abs: 'Abs', quads: 'Quads', hamstrings: 'Hamstrings', glutes: 'Glutes', calves: 'Calves',
};

/**
 * A 3D figure with a row of moves to switch between. Pick a move and the figure
 * performs it on a loop with the working muscles glowing; drag to turn it.
 */
export function MotionGuide({ moves, className }: { moves: GuideMove[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const move = moves[Math.min(index, moves.length - 1)];
  if (!move) return null;

  return (
    <Card className={cn('overflow-hidden p-0', className)}>
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div className="relative bg-gradient-to-b from-primary-50 to-surface-muted dark:from-primary/10">
          <Motion3D motion={move.motion} muscles={move.muscles} className="aspect-[4/3] w-full" />
          <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-heading shadow-soft">
            <Move3D size={13} className="text-primary" /> 3D · drag to turn
          </span>
        </div>
        <div className="flex flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {MOTIONS[move.motion]?.label ?? 'Movement'}
          </p>
          <h3 className="mt-1 text-lg font-bold text-heading">{move.title}</h3>
          <p className="mt-3 text-xs font-semibold text-muted">Working muscles</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {move.muscles.map((m) => (
              <Badge key={m} tone="primary">
                {LABEL[m] ?? m}
              </Badge>
            ))}
          </div>
          {move.approximate && (
            <p className="mt-3 text-xs text-muted">
              Stylised guide: the real exercise uses a machine or a variation, so the figure shows
              the closest free movement.
            </p>
          )}
          {moves.length > 1 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-5" role="tablist" aria-label="Choose a move">
              {moves.map((m, i) => (
                <button
                  key={m.title}
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    'flex min-h-11 items-center rounded-full border px-3.5 text-xs font-semibold transition-colors',
                    i === index
                      ? 'border-primary bg-primary text-white'
                      : 'border-line bg-card text-body hover:border-primary/40',
                  )}
                >
                  {m.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
