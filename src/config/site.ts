/**
 * Global site configuration — single source of truth for branding, SEO
 * defaults and navigation. Referenced by the SEO layer, header and footer.
 */
export const site = {
  name: 'SmartFit',
  tagline: 'Smarter Fitness. Better Health.',
  description:
    'SmartFit is a premium fitness platform: guided workouts, science-backed nutrition, precise health calculators and an AI coach — all in one clean, fast experience.',
  url: 'https://smartfit.app',
  locale: 'en_US',
  twitter: '@smartfit',
  themeColor: '#3B82F6',
  keywords: [
    'fitness',
    'fitness website',
    'home workout',
    'gym workout',
    'exercise guide',
    'healthy lifestyle',
    'healthy diet',
    'nutrition guide',
    'BMI calculator',
    'BMR calculator',
    'TDEE calculator',
    'ideal weight calculator',
    'body fat calculator',
    'protein calculator',
    'calorie calculator',
    'macro calculator',
    'fitness tracker',
    'AI fitness coach',
    'AI workout planner',
    'AI meal planner',
    'fitness challenge',
    '30 day fitness plan',
    'Indian diet plan',
    'weight loss',
    'muscle gain',
    'health calculator',
    'fitness blog',
    'workout planner',
  ],
  contact: {
    email: 'hello@smartfit.app',
    phone: '+1 (555) 013-0420',
    address: '500 Wellness Ave, Suite 200, Austin, TX 78701',
    hours: 'Mon–Fri, 8:00 AM – 6:00 PM CT',
  },
  social: {
    twitter: 'https://twitter.com/smartfit',
    instagram: 'https://instagram.com/smartfit',
    youtube: 'https://youtube.com/@smartfit',
    linkedin: 'https://linkedin.com/company/smartfit',
    github: 'https://github.com/smartfit',
  },
} as const;

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Workouts',
    href: '/workouts',
    children: [
      { label: 'All Workouts', href: '/workouts', description: 'Browse every routine by goal' },
      { label: 'Home Workout', href: '/workouts?cat=home', description: 'No equipment needed' },
      { label: 'Gym Workout', href: '/workouts?cat=gym', description: 'Build strength & size' },
      { label: 'HIIT & Cardio', href: '/workouts?cat=hiit', description: 'Burn fat, fast' },
      { label: 'Yoga & Mobility', href: '/workouts?cat=yoga', description: 'Recover & restore' },
    ],
  },
  {
    label: 'Nutrition',
    href: '/nutrition',
    children: [
      { label: 'Meal Plans', href: '/nutrition', description: 'Plans for every goal' },
      { label: 'Indian Diet', href: '/nutrition?plan=indian', description: 'Balanced desi meals' },
      { label: 'High Protein', href: '/nutrition?plan=protein', description: 'Fuel muscle growth' },
      { label: 'Weight Loss', href: '/nutrition?plan=weight-loss', description: 'Sustainable deficit' },
    ],
  },
  { label: 'Calculators', href: '/calculators' },
  { label: 'Programs', href: '/programs' },
  { label: 'AI Coach', href: '/ai-coach' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
