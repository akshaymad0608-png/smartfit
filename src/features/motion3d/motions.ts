/**
 * Movement data for the 3D figure. A motion is two poses (start and end of one
 * rep) in joint angles, in degrees. Nothing here imports three.js, so the page
 * text and prerender can read it without loading the 3D engine.
 *
 * Conventions (figure faces +Z, +X is its left, +Y is up):
 *   pitch   lean of the pelvis/torso, + is forward
 *   spine   extra forward bend of the upper body; twist turns it
 *   neck    + looks down
 *   sh      shoulder flexion, + raises the arm forward and up; abd + lifts it out
 *   el      elbow flexion
 *   hip     hip flexion, + lifts the thigh forward
 *   kn      knee flexion, + folds the shin back
 *   ankle   + points the toes down
 * Limbs come in a pair, A (left, +X) and B (right); a value with an A or B
 * suffix overrides one side, otherwise both sides share it.
 */

export type PoseKey =
  | 'y' | 'pitch' | 'spine' | 'twist' | 'neck'
  | 'sh' | 'shA' | 'shB' | 'abd' | 'el' | 'elA' | 'elB'
  | 'hip' | 'hipA' | 'hipB' | 'kn' | 'knA' | 'knB' | 'ankle';

export type Pose = Partial<Record<PoseKey, number>>;

export type Prop = 'none' | 'bar' | 'db' | 'bench' | 'seat' | 'pullbar' | 'dipbars';

export interface Motion {
  label: string;
  a: Pose;
  b: Pose;
  prop?: Prop;
  /** Camera angle around the figure: 0 is front-on, 90 is side-on. */
  yaw: number;
  /** Seconds for one rep (default 3). */
  period?: number;
  /** Cyclic motion driven by a phase instead of a start/end blend. */
  cycle?: 'run';
}

export const MOTIONS: Record<string, Motion> = {
  squat: {
    label: 'Squat',
    a: { sh: 38, el: 105 },
    b: { pitch: 32, hip: 118, kn: 112, ankle: 14, sh: 38, el: 105, neck: -10 },
    prop: 'db', yaw: 70,
  },
  lunge: {
    label: 'Lunge',
    a: { hipA: 22, knA: 18, hipB: -22, knB: 16 },
    b: { hipA: 86, knA: 92, hipB: -26, knB: 100, pitch: 4 },
    prop: 'db', yaw: 70,
  },
  deadlift: {
    label: 'Hip hinge (deadlift)',
    a: { kn: 4 },
    b: { pitch: 58, hip: 64, kn: 24, neck: -28, sh: 58 },
    prop: 'bar', yaw: 75,
  },
  pushup: {
    label: 'Push-up',
    a: { pitch: 74, sh: 74, el: 3, neck: -16, hip: 0 },
    b: { pitch: 80, sh: 46, el: 100, neck: -16, hip: 0 },
    yaw: 72,
  },
  plank: {
    label: 'Plank',
    a: { pitch: 76, sh: 76, el: 90, neck: -18 },
    b: { pitch: 78, sh: 78, el: 90, neck: -18 },
    yaw: 72, period: 4,
  },
  benchPress: {
    label: 'Bench or chest press',
    a: { y: 0.55, pitch: -90, hip: 6, kn: 92, sh: 90, el: 4 },
    b: { y: 0.55, pitch: -90, hip: 6, kn: 92, abd: 55, sh: 40, el: 100 },
    prop: 'bench', yaw: 70,
  },
  fly: {
    label: 'Cable fly',
    a: { abd: 85, sh: 0, el: 18 },
    b: { abd: 85, sh: 78, el: 18 },
    yaw: 20,
  },
  pullup: {
    label: 'Pull-up',
    a: { y: 0.84, sh: 176, el: 2, hip: 4, kn: 20 },
    b: { y: 1.14, abd: 25, sh: 170, el: 105, hip: 4, kn: 20 },
    prop: 'pullbar', yaw: 28,
  },
  pulldown: {
    label: 'Lat pulldown',
    a: { y: 0.5, hip: 92, kn: 92, abd: 18, sh: 172, el: 8 },
    b: { y: 0.5, hip: 92, kn: 92, pitch: -10, abd: 40, sh: 30, el: 105 },
    prop: 'seat', yaw: 35,
  },
  row: {
    label: 'Seated row',
    a: { y: 0.5, hip: 90, kn: 14, pitch: 14, sh: 84, el: 6 },
    b: { y: 0.5, hip: 90, kn: 14, pitch: -6, sh: 6, el: 100 },
    prop: 'seat', yaw: 80,
  },
  press: {
    label: 'Shoulder press',
    a: { abd: 88, sh: 0, el: 92 },
    b: { abd: 172, sh: 0, el: 4 },
    prop: 'db', yaw: 28,
  },
  curl: {
    label: 'Curl',
    a: { sh: 2, el: 6 },
    b: { sh: 2, el: 142 },
    prop: 'db', yaw: 62,
  },
  overheadExtension: {
    label: 'Overhead triceps extension',
    a: { sh: 168, el: 125 },
    b: { sh: 168, el: 6 },
    yaw: 68,
  },
  dips: {
    label: 'Dips',
    a: { y: 1.16, sh: -22, el: 4, hip: 14, kn: 70 },
    b: { y: 0.96, sh: -38, el: 100, hip: 14, kn: 70, pitch: 8 },
    prop: 'dipbars', yaw: 62,
  },
  twist: {
    label: 'Seated twist',
    a: { y: 0.14, pitch: -26, hip: 112, kn: 78, sh: 42, el: 100, twist: 42 },
    b: { y: 0.14, pitch: -26, hip: 112, kn: 78, sh: 42, el: 100, twist: -42 },
    prop: 'db', yaw: 35,
  },
  legRaise: {
    label: 'Seated leg raise',
    a: { y: 0.13, pitch: -32, hip: 38, kn: 6, sh: -42, el: 4 },
    b: { y: 0.13, pitch: -32, hip: 104, kn: 70, sh: -42, el: 4 },
    yaw: 82,
  },
  legExtension: {
    label: 'Leg extension',
    a: { y: 0.5, hip: 90, kn: 96, sh: 8, el: 70 },
    b: { y: 0.5, hip: 90, kn: 4, sh: 8, el: 70 },
    prop: 'seat', yaw: 82,
  },
  legCurl: {
    label: 'Leg curl',
    a: { sh: 24, el: 18, kn: 4 },
    b: { sh: 24, el: 18, knA: 118, kn: 4 },
    yaw: 78,
  },
  kickback: {
    label: 'Glute kickback',
    a: { pitch: 16, sh: 70, el: 24, hipA: 4, knA: 6 },
    b: { pitch: 16, sh: 70, el: 24, hipA: -42, knA: 8 },
    yaw: 78,
  },
  calfRaise: {
    label: 'Calf raise',
    a: { ankle: 0 },
    b: { ankle: 58 },
    yaw: 65,
  },
  run: {
    label: 'Running',
    a: {}, b: {}, cycle: 'run', yaw: 78, period: 1.1,
  },
};

/**
 * Which motion shows each library exercise. Where the real exercise uses a
 * machine, the closest free movement is used and the figure is labelled as a
 * guide, not a recording of the machine.
 */
export const EXERCISE_MOTION: Record<string, string> = {
  'Chest Press Machine': 'benchPress',
  'Bench Press': 'benchPress',
  'Cable Fly': 'fly',
  'Push-ups': 'pushup',
  'Pull-ups': 'pullup',
  'Lat Pulldown': 'pulldown',
  'Seated Cable Row': 'row',
  'Shoulder Press Machine': 'press',
  'Dumbbell Shoulder Press': 'press',
  'Standing Dumbbell Press': 'press',
  'Barbell Curl': 'curl',
  'Cable Bicep Curl': 'curl',
  'Dumbbell Bicep Curl': 'curl',
  'Cable Tricep Extension': 'overheadExtension',
  'Tricep Dips': 'dips',
  'Seated Dumbbell Twist': 'twist',
  'Seated Leg Raises': 'legRaise',
  Plank: 'plank',
  'Leg Press': 'squat',
  'Goblet Squat': 'squat',
  'Leg Extension': 'legExtension',
  Deadlift: 'deadlift',
  'Leg Curl Machine': 'legCurl',
  Lunges: 'lunge',
  'Donkey Kicks': 'kickback',
  'Calf Raises': 'calfRaise',
};

/** Exercises where the figure is a stand-in for a machine or a variation. */
export const APPROXIMATE_MOTION = new Set(['Leg Press', 'Donkey Kicks', 'Leg Curl Machine', 'Chest Press Machine', 'Lat Pulldown']);
