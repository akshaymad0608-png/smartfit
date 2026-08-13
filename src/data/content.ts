import type { BlogPost, Faq, Program, Stat, Testimonial } from '@/types';

export const stats: Stat[] = [
  { label: 'Active members', value: 250000, suffix: '+' },
  { label: 'Guided workouts', value: 1200, suffix: '+' },
  { label: 'Member satisfaction', value: 96, suffix: '%' },
  { label: 'Countries reached', value: 90, suffix: '+' },
];

export const programs: Program[] = [
  {
    id: 'p1',
    title: '30-Day Kickstart Challenge',
    slug: '30-day-kickstart',
    image: '/images/programs/30-day-kickstart.jpg',
    goal: 'Build the habit',
    level: 'Beginner',
    weeks: 4,
    daysPerWeek: 5,
    summary:
      'A month-long guided plan that turns fitness into a daily habit with short, achievable sessions.',
    highlights: ['Daily 20–30 min sessions', 'Habit tracking', 'No equipment required'],
    featured: true,
  },
  {
    id: 'p2',
    title: 'Lean & Strong',
    slug: 'lean-and-strong',
    image: '/images/programs/lean-and-strong.jpg',
    goal: 'Fat loss + muscle',
    level: 'Intermediate',
    weeks: 8,
    daysPerWeek: 4,
    summary:
      'A body-recomposition program pairing strength training with smart nutrition to lose fat and keep muscle.',
    highlights: ['Progressive strength blocks', 'Macro guidance', 'Weekly check-ins'],
    featured: true,
  },
  {
    id: 'p3',
    title: 'Hypertrophy Builder',
    slug: 'hypertrophy-builder',
    image: '/images/programs/hypertrophy-builder.jpg',
    goal: 'Muscle gain',
    level: 'Advanced',
    weeks: 12,
    daysPerWeek: 5,
    summary:
      'A 12-week push-pull-legs split engineered for maximum lean-mass gains with deload weeks built in.',
    highlights: ['Push-pull-legs split', 'Auto-regulated volume', 'Deload weeks included'],
    featured: true,
  },
  {
    id: 'p4',
    title: 'Home Shred',
    slug: 'home-shred',
    image: '/images/programs/home-shred.jpg',
    goal: 'Fat loss',
    level: 'Beginner',
    weeks: 6,
    daysPerWeek: 5,
    summary:
      'Six weeks of equipment-free HIIT and conditioning you can do in a living room, hotel or dorm.',
    highlights: ['Zero equipment', 'Follow-along timers', 'Low-impact options'],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    role: 'Lost 12 kg in 5 months',
    initials: 'PS',
    photo: '/images/people/priya.jpg',
    rating: 5,
    quote:
      'FitSmart made fitness finally click for me. The plans are realistic and the calculators took the guesswork out of my nutrition.',
  },
  {
    id: 't2',
    name: 'Marcus Lee',
    role: 'Gained 6 kg lean muscle',
    initials: 'ML',
    photo: '/images/people/marcus.jpg',
    rating: 5,
    quote:
      'The Hypertrophy Builder program is world-class. I finally understand progressive overload and my lifts have never been higher.',
  },
  {
    id: 't3',
    name: 'Amelia Rossi',
    role: 'Marathon finisher',
    initials: 'AR',
    photo: '/images/people/amelia.jpg',
    rating: 5,
    quote:
      'I love how clean and fast the app feels. The AI coach kept me accountable through my entire marathon build.',
  },
  {
    id: 't4',
    name: 'David Okafor',
    role: 'Busy dad of three',
    initials: 'DO',
    photo: '/images/people/david.jpg',
    rating: 5,
    quote:
      'The 20-minute home workouts fit my schedule perfectly. Down two belt sizes and full of energy again.',
  },
];

export const faqs: Faq[] = [
  {
    question: 'Is FitSmart free to use?',
    answer:
      'Yes. All workouts, nutrition guides and calculators are free to explore. Premium coaching and programs are available for members who want structured plans and progress tracking.',
  },
  {
    question: 'Do I need any equipment to start?',
    answer:
      'Not at all. Many of our most popular workouts require zero equipment. As you progress, we offer gym-based routines and clearly list any equipment for each session.',
  },
  {
    question: 'How accurate are the health calculators?',
    answer:
      'Our calculators use well-established formulas — Mifflin-St Jeor for BMR, activity multipliers for TDEE and validated methods for body fat. They are excellent estimates, though not a substitute for medical testing.',
  },
  {
    question: 'Can FitSmart help me lose weight and build muscle?',
    answer:
      'Absolutely. Choose a goal-based program, follow the paired nutrition guidance and track progress in your dashboard. Consistency plus the right calorie and protein targets drives results.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Your inputs stay on your device by default via local storage. We never sell personal data, and any future account features will be fully opt-in with clear controls.',
  },
  {
    question: 'What is the AI Coach?',
    answer:
      'The AI Coach generates personalised workout and meal suggestions from your goals and preferences. It is built to plug into leading AI models so recommendations get smarter over time.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Beginner’s Guide to Progressive Overload',
    slug: 'progressive-overload-guide',
    excerpt:
      'The single most important principle for building strength and muscle — explained simply, with a practical 4-week plan.',
    date: '2026-07-12',
    readMinutes: 7,
    author: 'Coach Ava',
    category: 'Training',
    tags: ['strength', 'muscle gain', 'beginner'],
    image: '/images/blog/progressive-overload.jpg',
  },
  {
    id: 'b2',
    title: 'How Many Calories Do You Actually Need?',
    slug: 'calories-you-need',
    excerpt:
      'BMR, TDEE and calorie targets demystified — plus how to set a deficit or surplus that you can actually stick to.',
    date: '2026-07-05',
    readMinutes: 6,
    author: 'Dr. Neha Rao',
    category: 'Nutrition',
    tags: ['nutrition', 'weight loss', 'calories'],
    image: '/images/blog/calories-you-need.jpg',
  },
  {
    id: 'b3',
    title: 'A Balanced Indian Diet Plan for Muscle Gain',
    slug: 'indian-diet-muscle-gain',
    excerpt:
      'High-protein, vegetarian-friendly meals built around everyday Indian ingredients to support lean growth.',
    date: '2026-06-28',
    readMinutes: 8,
    author: 'Coach Ravi',
    category: 'Nutrition',
    tags: ['Indian diet', 'muscle gain', 'protein'],
    image: '/images/blog/indian-diet-muscle-gain.jpg',
  },
  {
    id: 'b4',
    title: '5 Mobility Drills to Fix Desk Posture',
    slug: 'mobility-desk-posture',
    excerpt:
      'Sitting all day? These five daily drills open your hips and shoulders and undo the damage of a desk job.',
    date: '2026-06-20',
    readMinutes: 5,
    author: 'Coach Ava',
    category: 'Mobility',
    tags: ['mobility', 'recovery', 'posture'],
    image: '/images/blog/mobility-desk-posture.jpg',
  },
  {
    id: 'b5',
    title: 'HIIT vs Steady-State Cardio: Which Burns More Fat?',
    slug: 'hiit-vs-steady-state',
    excerpt:
      'The honest, evidence-based answer — and how to combine both for the best fat-loss results.',
    date: '2026-06-14',
    readMinutes: 6,
    author: 'Dr. Neha Rao',
    category: 'Cardio',
    tags: ['cardio', 'hiit', 'fat loss'],
    image: '/images/blog/hiit-vs-steady-state.jpg',
  },
  {
    id: 'b6',
    title: 'Sleep: The Most Underrated Fitness Tool',
    slug: 'sleep-fitness-tool',
    excerpt:
      'Why quality sleep beats another supplement — and simple habits to recover harder while you rest.',
    date: '2026-06-08',
    readMinutes: 5,
    author: 'Coach Ravi',
    category: 'Recovery',
    tags: ['recovery', 'sleep', 'health'],
    image: '/images/blog/sleep-fitness-tool.jpg',
  },
];
