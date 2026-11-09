/**
 * Original, hand-built anatomy diagram: a front or back view of a body with the
 * target muscle highlighted in the brand colour and the other muscles shown
 * faintly for context. Every shape is a path authored for this site (drawn for
 * the right half of the body and mirrored), not traced or copied from any
 * source. The view is cropped to the region that matters for each muscle, so
 * the highlight is large enough to read on a small card.
 */

const BASE = 'var(--color-muted)';
const HIGHLIGHT = 'var(--color-primary)';

const FRONT_MUSCLES = new Set(['chest', 'shoulders', 'biceps', 'abs', 'quads']);

/** Where to look: [x, y, width, height] in the 200 x 460 body space. */
const VIEW: Record<string, [number, number, number, number]> = {
  chest: [28, 40, 144, 144],
  shoulders: [28, 40, 144, 144],
  biceps: [28, 56, 144, 144],
  abs: [40, 92, 120, 120],
  back: [28, 44, 144, 144],
  triceps: [28, 56, 144, 144],
  glutes: [40, 188, 120, 120],
  quads: [40, 232, 120, 120],
  hamstrings: [40, 232, 120, 120],
  calves: [40, 322, 120, 130],
};

/** Right-half silhouette: head-neck join, arm, torso side, leg and foot. */
const SILHOUETTE =
  'M100 54 L108 54 C109 62 112 66 122 70 C138 72 152 76 160 86 C168 96 170 112 169 128 ' +
  'C168 146 169 160 170 176 C171 196 173 210 174 224 C176 232 176 244 172 250 ' +
  'C168 252 164 244 163 232 C162 214 160 196 158 178 C156 160 154 140 150 120 ' +
  'C146 112 142 108 140 104 C136 126 134 150 134 176 C134 196 138 214 142 232 ' +
  'C146 262 146 290 140 326 C138 346 140 366 138 386 C136 410 134 424 132 436 ' +
  'C138 440 140 448 130 452 L110 452 C106 448 108 440 110 436 C108 416 108 396 106 372 ' +
  'C104 346 104 330 104 316 C102 290 102 268 100 248 Z';

/** Muscle shapes for the right half of the body (mirrored for the left). */
const FRONT: Record<string, string[]> = {
  shoulders: [
    'M122 70 C138 72 152 76 160 86 C167 95 169 108 167 120 C160 114 152 110 146 106 C138 100 128 90 122 80 Z',
  ],
  chest: [
    'M102 84 C112 80 128 82 140 94 C142 104 138 112 128 118 C118 120 108 116 102 108 Z',
  ],
  biceps: [
    'M152 112 C160 112 166 120 166 134 C166 148 163 158 158 164 C153 160 151 146 151 132 C151 122 151 116 152 112 Z',
  ],
  abs: [
    'M103 124 L119 124 Q122 124 122 128 L122 136 Q122 140 119 140 L103 140 Z',
    'M103 144 L119 144 Q122 144 122 148 L122 156 Q122 160 119 160 L103 160 Z',
    'M103 164 L119 164 Q122 164 122 168 L122 176 Q122 180 119 180 L103 180 Z',
    'M103 184 L117 184 Q120 184 120 188 L120 196 Q120 200 117 200 L103 200 Z',
  ],
  quads: [
    'M106 254 C120 248 138 252 144 264 C146 288 142 312 136 328 C128 326 118 326 110 320 C106 300 104 276 106 254 Z',
  ],
};

const BACK: Record<string, string[]> = {
  back: [
    'M100 58 C108 60 118 68 124 76 C120 88 110 98 100 106 Z',
    'M106 104 C122 98 138 102 140 114 C138 140 134 166 128 182 C118 178 108 172 100 160 C102 140 104 120 106 104 Z',
  ],
  triceps: [
    'M152 108 C160 108 167 116 168 130 C168 146 164 158 158 164 C152 158 150 140 150 126 C150 116 150 110 152 108 Z',
  ],
  glutes: [
    'M101 214 C114 208 132 210 140 226 C142 240 134 252 122 254 C110 254 102 248 100 238 Z',
  ],
  hamstrings: [
    'M104 258 C118 254 136 256 143 268 C145 292 141 316 135 330 C125 326 113 324 107 316 C103 296 103 274 104 258 Z',
  ],
  calves: [
    'M108 338 C120 334 134 336 138 350 C140 370 136 390 132 406 C124 406 114 404 110 398 C106 378 106 354 108 338 Z',
  ],
};

/** Rear shoulders sit behind the arm on the back view; drawn faintly for context. */
const BACK_CONTEXT = [
  'M122 70 C138 72 152 76 160 86 C167 95 169 108 167 120 C160 114 152 110 146 106 C138 100 128 90 122 80 Z',
];

interface MuscleDiagramProps {
  muscle: string;
  className?: string;
}

/** Draw a path for the right half, then again mirrored for the left half. */
function Both({ d, fill, opacity, stroke }: { d: string; fill: string; opacity: number; stroke?: string }) {
  return (
    <>
      <path d={d} fill={fill} opacity={opacity} stroke={stroke} strokeWidth={stroke ? 0.8 : 0} />
      <path
        d={d}
        fill={fill}
        opacity={opacity}
        stroke={stroke}
        strokeWidth={stroke ? 0.8 : 0}
        transform="translate(200 0) scale(-1 1)"
      />
    </>
  );
}

export function MuscleDiagram({ muscle, className }: MuscleDiagramProps) {
  const isFront = FRONT_MUSCLES.has(muscle);
  const set = isFront ? FRONT : BACK;
  const [x, y, w, h] = VIEW[muscle] ?? [0, 0, 200, 460];

  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} className={className} aria-hidden>
      {/* Body silhouette and head */}
      <Both d={SILHOUETTE} fill={BASE} opacity={0.22} />
      <ellipse cx="100" cy="30" rx="18" ry="23" fill={BASE} opacity={0.22} />

      {/* Context muscles, faint */}
      {!isFront && BACK_CONTEXT.map((d) => <Both key={d} d={d} fill={BASE} opacity={0.3} />)}
      {Object.entries(set)
        .filter(([key]) => key !== muscle)
        .flatMap(([key, paths]) => paths.map((d, i) => <Both key={`${key}${i}`} d={d} fill={BASE} opacity={0.3} />))}

      {/* Target muscle */}
      {(set[muscle] ?? []).map((d, i) => (
        <Both key={`t${i}`} d={d} fill={HIGHLIGHT} opacity={1} stroke="var(--color-card)" />
      ))}
    </svg>
  );
}
