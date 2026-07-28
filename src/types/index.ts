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
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  photo: string;
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
