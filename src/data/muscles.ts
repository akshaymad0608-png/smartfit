export interface MuscleGroup {
  key: string;
  label: string;
  video: string;
  image: string;
}

/**
 * Shared by the standalone Exercises page and the Gym Workout section on
 * /workouts, so both stay in sync from one source instead of two copies
 * drifting apart. Video/image sourced from Mixkit (Stock Video Free
 * License) and Pexels (Pexels License) — both free for commercial use, no
 * attribution required. Each was verified against its own page metadata
 * before downloading, so the clip/photo showing is the exercise it's
 * labelled as, not just a plausible filename.
 *
 * Triceps and Calves came from Pexels; Mixkit's library had nothing that
 * actually showed the right exercise for those two.
 */
export const muscleGroups: MuscleGroup[] = [
  { key: 'chest', label: 'Chest', video: '/videos/muscles/chest.mp4', image: '/images/muscles/chest.jpg' },
  { key: 'back', label: 'Back', video: '/videos/muscles/back.mp4', image: '/images/muscles/back.jpg' },
  {
    key: 'shoulders',
    label: 'Shoulders',
    video: '/videos/muscles/shoulders.mp4',
    image: '/images/muscles/shoulders.jpg',
  },
  { key: 'biceps', label: 'Biceps', video: '/videos/muscles/biceps.mp4', image: '/images/muscles/biceps.jpg' },
  { key: 'triceps', label: 'Triceps', video: '/videos/muscles/triceps.mp4', image: '/images/muscles/triceps.jpg' },
  { key: 'abs', label: 'Abs', video: '/videos/muscles/abs.mp4', image: '/images/muscles/abs.jpg' },
  { key: 'quads', label: 'Quads', video: '/videos/muscles/quads.mp4', image: '/images/muscles/quads.jpg' },
  {
    key: 'hamstrings',
    label: 'Hamstrings',
    video: '/videos/muscles/hamstrings.mp4',
    image: '/images/muscles/hamstrings.jpg',
  },
  { key: 'glutes', label: 'Glutes', video: '/videos/muscles/glutes.mp4', image: '/images/muscles/glutes.jpg' },
  { key: 'calves', label: 'Calves', video: '/videos/muscles/calves.mp4', image: '/images/muscles/calves.jpg' },
];
