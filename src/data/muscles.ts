export interface Exercise {
  name: string;
  video: string;
}

export interface MuscleGroup {
  key: string;
  label: string;
  /** Primary demo clip — used as the picker card's poster/thumbnail video. */
  video: string;
  image: string;
  /** Every named exercise available for this muscle, primary included. */
  exercises: Exercise[];
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
 * Exercise counts genuinely vary (1 for calves, up to 4 elsewhere) because
 * that's how many distinct, correctly-labelled real clips could actually
 * be found and verified. Calves stays at 1 despite an extensive search
 * (Mixkit, Pexels and Pixabay, under "calf raise", "seated calf raise",
 * "jump rope" and more) — one promising "jump rope" clip turned out, once
 * actually inspected frame by frame, to show a man standing by a punching
 * bag, not jumping rope, so it was rejected rather than used under a
 * label it doesn't match. Padding the list out with a wrong or duplicate
 * clip would be worse than an honest shorter one.
 */
export const muscleGroups: MuscleGroup[] = [
  {
    key: 'chest',
    label: 'Chest',
    video: '/videos/muscles/chest.mp4',
    image: '/images/muscles/chest.jpg',
    exercises: [
      { name: 'Chest Press Machine', video: '/videos/muscles/chest.mp4' },
      { name: 'Bench Press', video: '/videos/exercises/chest-bench-press.mp4' },
      { name: 'Cable Fly', video: '/videos/exercises/chest-cable-fly.mp4' },
      { name: 'Push-ups', video: '/videos/exercises/chest-pushups.mp4' },
    ],
  },
  {
    key: 'back',
    label: 'Back',
    video: '/videos/muscles/back.mp4',
    image: '/images/muscles/back.jpg',
    exercises: [
      { name: 'Pull-ups', video: '/videos/muscles/back.mp4' },
      { name: 'Lat Pulldown', video: '/videos/exercises/back-lat-pulldown.mp4' },
      { name: 'Rowing Machine', video: '/videos/exercises/back-rowing-machine.mp4' },
    ],
  },
  {
    key: 'shoulders',
    label: 'Shoulders',
    video: '/videos/muscles/shoulders.mp4',
    image: '/images/muscles/shoulders.jpg',
    exercises: [
      { name: 'Shoulder Press Machine', video: '/videos/muscles/shoulders.mp4' },
      { name: 'Dumbbell Shoulder Press', video: '/videos/exercises/shoulders-dumbbell-press.mp4' },
    ],
  },
  {
    key: 'biceps',
    label: 'Biceps',
    video: '/videos/muscles/biceps.mp4',
    image: '/images/muscles/biceps.jpg',
    exercises: [
      { name: 'Bicep Curl', video: '/videos/muscles/biceps.mp4' },
      { name: 'Cable Bicep Curl', video: '/videos/exercises/biceps-cable-curl.mp4' },
      { name: 'Dumbbell Bicep Curl', video: '/videos/exercises/biceps-dumbbell-curl.mp4' },
    ],
  },
  {
    key: 'triceps',
    label: 'Triceps',
    video: '/videos/muscles/triceps.mp4',
    image: '/images/muscles/triceps.jpg',
    exercises: [
      { name: 'Cable Tricep Extension', video: '/videos/muscles/triceps.mp4' },
      { name: 'Tricep Dips', video: '/videos/exercises/triceps-dips.mp4' },
    ],
  },
  {
    key: 'abs',
    label: 'Abs',
    video: '/videos/muscles/abs.mp4',
    image: '/images/muscles/abs.jpg',
    exercises: [
      { name: 'Abs Training', video: '/videos/muscles/abs.mp4' },
      { name: 'Crunches', video: '/videos/exercises/abs-crunches.mp4' },
      { name: 'Plank', video: '/videos/exercises/abs-plank.mp4' },
    ],
  },
  {
    key: 'quads',
    label: 'Quads',
    video: '/videos/muscles/quads.mp4',
    image: '/images/muscles/quads.jpg',
    exercises: [
      { name: 'Leg Press', video: '/videos/muscles/quads.mp4' },
      { name: 'Squats', video: '/videos/exercises/quads-squats.mp4' },
      { name: 'Squats with Dumbbells', video: '/videos/exercises/quads-squats-dumbbells.mp4' },
      { name: 'Leg Extension', video: '/videos/exercises/quads-leg-extension.mp4' },
    ],
  },
  {
    key: 'hamstrings',
    label: 'Hamstrings',
    video: '/videos/muscles/hamstrings.mp4',
    image: '/images/muscles/hamstrings.jpg',
    exercises: [
      { name: 'Deadlift', video: '/videos/muscles/hamstrings.mp4' },
      { name: 'Leg Curl Machine', video: '/videos/exercises/hamstrings-leg-curl.mp4' },
    ],
  },
  {
    key: 'glutes',
    label: 'Glutes',
    video: '/videos/muscles/glutes.mp4',
    image: '/images/muscles/glutes.jpg',
    exercises: [
      { name: 'Lunges with Dumbbells', video: '/videos/muscles/glutes.mp4' },
      { name: 'Lunges', video: '/videos/exercises/glutes-lunges-alt.mp4' },
      { name: 'Donkey Kicks', video: '/videos/exercises/glutes-donkey-kicks.mp4' },
    ],
  },
  {
    key: 'calves',
    label: 'Calves',
    video: '/videos/muscles/calves.mp4',
    image: '/images/muscles/calves.jpg',
    exercises: [{ name: 'Calf Raises', video: '/videos/muscles/calves.mp4' }],
  },
];
