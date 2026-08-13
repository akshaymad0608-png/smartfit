/**
 * FitSmart AI Coach — local generation engine.
 *
 * This produces useful, structured plans entirely on-device from rule-based
 * templates so the feature works with zero configuration. It is intentionally
 * shaped like an async API call (`generate` returns a Promise) so a real model
 * — e.g. the Anthropic Claude API — can be dropped in behind the same interface
 * later without touching the UI. See docs/FUTURE_ROADMAP.md.
 */

export type CoachMode = 'workout' | 'meal' | 'motivation' | 'weekly' | 'goal';

export interface CoachRequest {
  mode: CoachMode;
  prompt: string;
}

export interface CoachSection {
  heading: string;
  items: string[];
}

export interface CoachResponse {
  title: string;
  intro: string;
  sections: CoachSection[];
  footer?: string;
}

const focusFrom = (p: string): string => {
  const t = p.toLowerCase();
  if (t.includes('lose') || t.includes('fat') || t.includes('weight loss')) return 'fat loss';
  if (t.includes('muscle') || t.includes('gain') || t.includes('bulk')) return 'muscle gain';
  if (t.includes('strength') || t.includes('strong')) return 'strength';
  if (t.includes('endurance') || t.includes('run') || t.includes('cardio')) return 'endurance';
  return 'general fitness';
};

const workoutPlan = (prompt: string): CoachResponse => {
  const focus = focusFrom(prompt);
  const byFocus: Record<string, string[]> = {
    'fat loss': [
      'Circuit A ×3: jump squats, push-ups, mountain climbers, plank (40s on / 20s off)',
      'Circuit B ×3: reverse lunges, burpees, high knees, bicycle crunches',
      'Finisher: 5-minute incline walk or easy jog',
    ],
    'muscle gain': [
      'Compound block: goblet squats 4×8, dumbbell bench 4×10, rows 4×10',
      'Accessory block: RDLs 3×10, lateral raises 3×12, biceps curls 3×12',
      'Core: hanging or lying leg raises 3×12',
    ],
    strength: [
      'Main lift: back squat 5×5 at a hard-but-clean load',
      'Secondary: overhead press 4×5, weighted rows 4×6',
      'Accessory: hip thrusts 3×8, farmer carries 3×30m',
    ],
    endurance: [
      'Warm-up: 10-minute easy jog',
      'Intervals: 6×400m at 5k pace, 90s walk recovery',
      'Cool-down: 10-minute easy jog + mobility',
    ],
    'general fitness': [
      'Full-body circuit ×3: squats, push-ups, rows, glute bridges, plank',
      'Conditioning: 10 minutes of steady cardio you enjoy',
      'Mobility: 5 minutes of hips and shoulders',
    ],
  };
  return {
    title: `Your ${focus} workout`,
    intro: `Here's a focused session for ${focus}. Warm up for 5 minutes, then work through each block with good form.`,
    sections: [
      { heading: 'Warm-up (5 min)', items: ['Light cardio', 'Dynamic leg swings', 'Arm circles & band pull-aparts'] },
      { heading: 'Main session', items: byFocus[focus] },
      { heading: 'Cool-down (5 min)', items: ['Full-body stretch', 'Slow nasal breathing', 'Hydrate'] },
    ],
    footer: 'Progress by adding reps or load each week. Rest 48h before training the same muscles.',
  };
};

const mealPlan = (prompt: string): CoachResponse => {
  const focus = focusFrom(prompt);
  const veg = prompt.toLowerCase().includes('veg');
  const protein = veg
    ? ['Tofu / paneer scramble', 'Lentil & chickpea bowls', 'Greek yogurt & nuts']
    : ['Eggs & oats', 'Grilled chicken / fish', 'Greek yogurt & berries'];
  return {
    title: `A day of ${focus} meals`,
    intro: `A balanced ${veg ? 'vegetarian ' : ''}day built around whole foods and adequate protein for ${focus}.`,
    sections: [
      { heading: 'Breakfast', items: [protein[0], 'Fruit + a source of fibre', 'Water or black coffee'] },
      { heading: 'Lunch', items: [protein[1], 'Complex carbs (rice / quinoa)', 'A large portion of vegetables'] },
      { heading: 'Snack', items: [protein[2], 'A piece of fruit or a handful of nuts'] },
      { heading: 'Dinner', items: ['Lean protein', 'Roasted or steamed vegetables', 'A small carb portion if training hard'] },
    ],
    footer: 'Adjust portions to hit your calorie target from the Calculators page.',
  };
};

const motivation = (): CoachResponse => ({
  title: 'Your daily spark',
  intro: 'A little push for today.',
  sections: [
    {
      heading: 'Remember',
      items: [
        'You do not have to be extreme, just consistent.',
        'The workout you finish is worth more than the perfect one you skip.',
        'Small daily wins compound into remarkable results.',
      ],
    },
    { heading: 'One action', items: ['Do the next 10 minutes. Momentum handles the rest.'] },
  ],
});

const weeklyPlan = (prompt: string): CoachResponse => {
  const focus = focusFrom(prompt);
  return {
    title: `Your ${focus} week`,
    intro: `A balanced 7-day split for ${focus} with built-in recovery.`,
    sections: [
      {
        heading: 'Schedule',
        items: [
          'Mon — Lower body strength',
          'Tue — Upper body strength',
          'Wed — Active recovery: walk + mobility',
          'Thu — HIIT / conditioning',
          'Fri — Full-body strength',
          'Sat — Cardio of choice',
          'Sun — Rest & stretch',
        ],
      },
    ],
    footer: 'Move a rest day if life gets busy — total weekly consistency matters most.',
  };
};

const goalPlan = (prompt: string): CoachResponse => {
  const focus = focusFrom(prompt);
  return {
    title: `Reaching your ${focus} goal`,
    intro: `Here's how to structure the next 8 weeks for ${focus}.`,
    sections: [
      { heading: 'Set the target', items: ['Pick one measurable goal', 'Define a realistic 8-week milestone'] },
      { heading: 'Train', items: ['3–5 focused sessions per week', 'Track load and progress each session'] },
      { heading: 'Fuel', items: ['Hit your calorie and protein targets', 'Prioritise sleep and hydration'] },
      { heading: 'Review', items: ['Check progress every 2 weeks', 'Adjust calories or volume as needed'] },
    ],
  };
};

const builders: Record<CoachMode, (p: string) => CoachResponse> = {
  workout: workoutPlan,
  meal: mealPlan,
  motivation: () => motivation(),
  weekly: weeklyPlan,
  goal: goalPlan,
};

/** Async by design — swap this body for a real model call later. */
export async function generate(req: CoachRequest): Promise<CoachResponse> {
  await new Promise((r) => setTimeout(r, 650));
  return builders[req.mode](req.prompt || 'general fitness');
}
