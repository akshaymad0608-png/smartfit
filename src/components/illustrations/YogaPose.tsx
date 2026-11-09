/**
 * Original, hand-built yoga pose figures — a side-view figure drawn from joint
 * positions (head, shoulder, elbow, wrist, hip, knee, ankle, toe) with round
 * strokes, on a mat. Nothing is traced from a photo or a library; every pose is
 * a table of coordinates below, so a figure can be corrected by editing a
 * number. Figures face right and are drawn on a 240 x 150 canvas.
 */

type Pt = [number, number];

interface Pose {
  head: Pt;
  neck: Pt;
  shoulder: Pt;
  hip: Pt;
  knee: Pt;
  ankle: Pt;
  toe: Pt;
  elbow: Pt;
  wrist: Pt;
  /** Bends the spine: quadratic control point between shoulder and hip. */
  spine?: Pt;
  /** Positions for the far limbs; default is the near limb nudged back. */
  far?: Partial<Record<'elbow' | 'wrist' | 'knee' | 'ankle' | 'toe', Pt>>;
}

const POSES: Record<string, Pose> = {
  mountain: {
    head: [118, 22], neck: [118, 32], shoulder: [118, 40], hip: [118, 78],
    knee: [119, 108], ankle: [118, 137], toe: [131, 140],
    elbow: [121, 61], wrist: [122, 80],
  },
  fold: {
    head: [133, 124], neck: [127, 116], shoulder: [122, 110], hip: [104, 76],
    knee: [108, 107], ankle: [109, 137], toe: [122, 140],
    elbow: [120, 126], wrist: [124, 139],
    spine: [118, 88],
  },
  plank: {
    head: [51, 94], neck: [59, 97], shoulder: [65, 99], hip: [100, 112],
    knee: [129, 123], ankle: [158, 134], toe: [167, 139],
    elbow: [63, 119], wrist: [61, 138],
  },
  cobra: {
    head: [88, 92], neck: [93, 98], shoulder: [97, 105], hip: [121, 133],
    knee: [152, 135], ankle: [182, 136], toe: [194, 139],
    elbow: [102, 122], wrist: [93, 138],
    spine: [107, 113],
  },
  downdog: {
    head: [57, 117], neck: [61, 110], shoulder: [66, 104], hip: [90, 74],
    knee: [101, 104], ankle: [112, 134], toe: [125, 140],
    elbow: [57, 121], wrist: [48, 138],
  },
  child: {
    head: [107, 130], neck: [115, 127], shoulder: [122, 124], hip: [156, 118],
    knee: [129, 135], ankle: [160, 136], toe: [173, 138],
    elbow: [103, 131], wrist: [84, 138],
    spine: [140, 107],
  },
  cat: {
    head: [74, 116], neck: [78, 108], shoulder: [83, 100], hip: [120, 102],
    knee: [120, 133], ankle: [150, 137], toe: [158, 140],
    elbow: [81, 119], wrist: [80, 138],
    spine: [101, 80],
  },
  cow: {
    head: [68, 86], neck: [76, 94], shoulder: [83, 100], hip: [120, 102],
    knee: [120, 133], ankle: [150, 137], toe: [158, 140],
    elbow: [81, 119], wrist: [80, 138],
    spine: [101, 120],
  },
  easy: {
    head: [118, 75], neck: [118, 85], shoulder: [118, 92], hip: [118, 129],
    knee: [147, 134], ankle: [124, 138], toe: [111, 140],
    elbow: [131, 108], wrist: [145, 123],
    far: { knee: [140, 136], ankle: [118, 139], toe: [132, 140] },
  },
};

export const YOGA_POSE_IDS = Object.keys(POSES);

const STROKE = 'var(--color-primary)';
const FAR = 0.45;

const line = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
const nudge = (p: Pt, dx = -5): Pt => [p[0] + dx, p[1]];

export function YogaPose({ pose, className }: { pose: string; className?: string }) {
  const p = POSES[pose];
  if (!p) return null;
  const f = p.far ?? {};
  const fElbow = f.elbow ?? nudge(p.elbow, -6);
  const fWrist = f.wrist ?? nudge(p.wrist, -6);
  const fKnee = f.knee ?? nudge(p.knee, -4);
  const fAnkle = f.ankle ?? nudge(p.ankle, -4);
  const fToe = f.toe ?? nudge(p.toe, -4);
  const torso = p.spine
    ? `M${p.shoulder[0]} ${p.shoulder[1]} Q${p.spine[0]} ${p.spine[1]} ${p.hip[0]} ${p.hip[1]}`
    : line([p.shoulder, p.hip]);

  return (
    <svg viewBox="0 0 240 150" className={className} role="img" aria-label={`Yoga pose: ${pose}`}>
      {/* sun + mat */}
      <circle cx="196" cy="40" r="22" fill="var(--color-accent)" opacity="0.18" />
      <rect x="14" y="140" width="212" height="6" rx="3" fill="var(--color-secondary)" opacity="0.55" />

      {/* far limbs */}
      <g stroke={STROKE} opacity={FAR} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={line([p.shoulder, fElbow, fWrist])} strokeWidth="8" />
        <path d={line([p.hip, fKnee, fAnkle])} strokeWidth="10" />
        <path d={line([fAnkle, fToe])} strokeWidth="6" />
      </g>

      {/* torso, neck, near limbs */}
      <g stroke={STROKE} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={torso} strokeWidth="17" />
        <path d={line([p.shoulder, p.neck])} strokeWidth="6" />
        <path d={line([p.hip, p.knee, p.ankle])} strokeWidth="11" />
        <path d={line([p.ankle, p.toe])} strokeWidth="7" />
        <path d={line([p.shoulder, p.elbow, p.wrist])} strokeWidth="9" />
      </g>

      <circle cx={p.head[0]} cy={p.head[1]} r="9" fill={STROKE} />
    </svg>
  );
}
