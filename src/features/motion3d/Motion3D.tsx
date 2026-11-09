import { useEffect, useRef, useState } from 'react';
import { MuscleDiagram } from '@/components/illustrations/MuscleDiagram';
import { MOTIONS } from './motions';
import type { FigureScene } from './scene';

interface Motion3DProps {
  /** Key into MOTIONS (see motions.ts). */
  motion: string;
  /** Muscle keys to glow (chest, quads, ...). */
  muscles: string[];
  className?: string;
}

/**
 * The 3D figure on a canvas. three.js is fetched only when this mounts, the
 * animation runs only while the canvas is on screen, and people who ask for
 * reduced motion get a still pose. If WebGL is unavailable it falls back to
 * the flat muscle chart.
 */
export function Motion3D({ motion, muscles, className }: Motion3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const figRef = useRef<FigureScene | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'unsupported'>('loading');
  const latest = useRef({ motion, muscles });
  latest.current = { motion, muscles };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let observer: IntersectionObserver | undefined;
    let resizer: ResizeObserver | undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    import('./scene')
      .then(({ createFigureScene }) => {
        if (disposed) return;
        let fig: FigureScene;
        try {
          fig = createFigureScene(canvas);
        } catch {
          setState('unsupported');
          return;
        }
        figRef.current = fig;
        const rect = canvas.getBoundingClientRect();
        fig.resize(rect.width, rect.height);
        fig.setMotion(latest.current.motion, latest.current.muscles);
        if (reduce) fig.setProgress(1);
        setState('ready');

        resizer = new ResizeObserver(([entry]) => {
          fig.resize(entry.contentRect.width, entry.contentRect.height);
        });
        resizer.observe(canvas);

        observer = new IntersectionObserver(
          ([entry]) => {
            if (reduce) return;
            if (entry.isIntersecting && !document.hidden) fig.start();
            else fig.stop();
          },
          { threshold: 0.15 },
        );
        observer.observe(canvas);
      })
      .catch(() => setState('unsupported'));

    return () => {
      disposed = true;
      observer?.disconnect();
      resizer?.disconnect();
      figRef.current?.dispose();
      figRef.current = null;
    };
  }, []);

  const key = muscles.join(',');
  useEffect(() => {
    figRef.current?.setMotion(motion, muscles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion, key]);

  // Drag to turn the figure.
  const drag = useRef<{ x: number; turn: number } | null>(null);
  const turn = useRef(0);
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, turn: turn.current };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    turn.current = drag.current.turn + (e.clientX - drag.current.x) * 0.012;
    figRef.current?.setViewTurn(turn.current);
  };
  const onUp = () => {
    drag.current = null;
  };

  if (state === 'unsupported') {
    return (
      <div className={className}>
        <MuscleDiagram muscle={muscles[0] ?? 'chest'} className="mx-auto h-full max-h-80 w-auto" />
      </div>
    );
  }

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
        role="img"
        aria-label={`3D figure doing the ${MOTIONS[motion]?.label ?? 'exercise'}; the working muscles glow blue. Drag to turn it.`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
      {state === 'loading' && (
        <p className="sr-only" role="status">
          Loading the 3D figure
        </p>
      )}
    </div>
  );
}
