export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Workout {
  id: string;
  name: string;
  slug: string;
  category: string;
  difficulty: Difficulty;
  durationMin: number;
  calories: number;
  equipment: string[];
  muscles: string[];
  focus: string;
  summary: string;
  image: string;
  benefits: string[];
  instructions: string[];
  tips: string[];
}

export interface WorkoutCategory {
  key: string;
  label: string;
  description: string;
  accent: 'primary' | 'secondary' | 'accent';
}

export interface ProgramExercise {
  name: string;
  sets: string;
  reps: string;
  rest?: string;
  note?: string;
}

export interface ProgramDay {
  day: string;
  focus: string;
  exercises: ProgramExercise[];
}

export interface ProgramPhase {
  name: string;
  goal: string;
  days: ProgramDay[];
}

/** The full written plan behind a program: who it is for, the sessions, and how to progress. */
export interface ProgramPlan {
  overview: string;
  whoFor: string[];
  notFor: string[];
  equipment: string[];
  warmup: string[];
  phases: ProgramPhase[];
  progression: string;
  tips: string[];
  safety: string;
  faqs: Faq[];
  /** Slugs of blog posts to link from the program page. */
  related?: string[];
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  goal: string;
  level: Difficulty;
  weeks: number;
  daysPerWeek: number;
  summary: string;
  image: string;
  highlights: string[];
  featured?: boolean;
  /** Week-by-week sessions, progression rules and FAQs. */
  plan?: ProgramPlan;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  author: string;
  category: string;
  tags: string[];
  image: string;
  /** Full article body, section by section. Optional so nothing breaks if a post ever ships without one. */
  body?: BlogSection[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}
