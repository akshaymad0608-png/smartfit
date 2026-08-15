/**
 * One page per calculator.
 *
 * Everything lived on /calculators — six different things people search for,
 * behind one URL. Search Console showed the result: that page took 15
 * impressions in 28 days, while the site's own best performer elsewhere is a
 * page built for exactly one query. "BMI calculator" and "TDEE calculator" are
 * separate searches with separate intent, and a page that answers all six ranks
 * for none of them.
 *
 * The suite itself is unchanged and shared — these add the wording, the formula
 * and the questions that belong to one metric, so each URL has something of its
 * own for a crawler to match against.
 */

export interface CalculatorPage {
  slug: string;
  /** Short name used in nav and breadcrumbs. */
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** The maths, written out — the thing people actually want to check. */
  formula: string;
  facts: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const CALCULATOR_PAGES: CalculatorPage[] = [
  {
    slug: 'bmi',
    name: 'BMI',
    title: 'BMI Calculator — Body Mass Index for Men & Women',
    description:
      'Free BMI calculator. Enter height and weight to get your body mass index, the category it falls in, and what the number does and does not tell you.',
    h1: 'BMI Calculator',
    intro:
      'Body mass index compares your weight to your height. It is a screening number, not a diagnosis — useful for spotting a trend across a population, blunt for any single person.',
    formula: 'BMI = weight (kg) ÷ height (m)²',
    facts: [
      'Under 18.5 — underweight',
      '18.5 to 24.9 — healthy range',
      '25 to 29.9 — overweight',
      '30 and above — obese',
    ],
    faqs: [
      {
        q: 'Is BMI accurate for muscular people?',
        a: 'No. BMI cannot tell muscle from fat, so a lifter can read as overweight while carrying very little fat. Use body fat percentage alongside it.',
      },
      {
        q: 'Is BMI different for men and women?',
        a: 'The formula and the categories are the same. Women naturally carry more essential fat at the same BMI, which is one more reason to read it alongside body fat percentage.',
      },
      {
        q: 'What is a healthy BMI for Indians?',
        a: 'Indian health guidelines often use lower cut-offs than the international ones — overweight from 23 and obese from 25 — because metabolic risk appears at a lower BMI in South Asian populations.',
      },
    ],
    keywords: ['BMI calculator', 'body mass index calculator', 'BMI calculator for men', 'BMI calculator for women'],
  },
  {
    slug: 'bmr',
    name: 'BMR',
    title: 'BMR Calculator — Basal Metabolic Rate in Calories',
    description:
      'Free BMR calculator using the Mifflin-St Jeor equation. Find the calories your body burns at complete rest, before any activity is added.',
    h1: 'BMR Calculator',
    intro:
      'Basal metabolic rate is what you burn doing nothing at all — breathing, circulation, keeping warm. It is the floor under every calorie target, and eating below it for long is how people stall.',
    formula:
      'Mifflin-St Jeor — men: 10×weight(kg) + 6.25×height(cm) − 5×age + 5. Women: the same, −161 instead of +5.',
    facts: [
      'Covers roughly 60–70% of what most people burn in a day',
      'Falls as you lose weight, which is why targets need revisiting',
      'Muscle raises it; extended crash dieting lowers it',
      'Add activity to BMR to get TDEE',
    ],
    faqs: [
      {
        q: 'Should I eat at my BMR to lose weight?',
        a: 'No. BMR excludes all movement, so eating at it is a steeper deficit than it looks. Work from TDEE and take a moderate deficit off that.',
      },
      {
        q: 'Why do BMR calculators disagree?',
        a: 'They use different equations. Mifflin-St Jeor is the most accurate for most people; Harris-Benedict and Katch-McArdle will give you a different number from the same inputs.',
      },
    ],
    keywords: ['BMR calculator', 'basal metabolic rate calculator', 'metabolism calculator', 'Mifflin St Jeor calculator'],
  },
  {
    slug: 'tdee',
    name: 'TDEE',
    title: 'TDEE Calculator — Daily Calories You Actually Burn',
    description:
      'Free TDEE calculator. Combine your BMR with your activity level to find total daily energy expenditure, then set a calorie target for cutting, maintaining or bulking.',
    h1: 'TDEE Calculator',
    intro:
      'Total daily energy expenditure is everything you burn in a day — resting metabolism plus training, walking, fidgeting and digesting. It is the number every calorie target should be built from.',
    formula: 'TDEE = BMR × activity factor (1.2 sedentary → 1.9 very active)',
    facts: [
      'Sedentary ×1.2 — desk work, little exercise',
      'Light ×1.375 — 1–3 sessions a week',
      'Moderate ×1.55 — 3–5 sessions a week',
      'Very active ×1.725 to ×1.9 — daily hard training or physical work',
    ],
    faqs: [
      {
        q: 'How big a deficit should I take off TDEE?',
        a: 'Around 15–20% for most people — roughly 300–500 kcal. Bigger deficits cost muscle and get abandoned.',
      },
      {
        q: 'Which activity level should I pick?',
        a: 'Most people overestimate. If you train three times a week but sit the rest of the day, that is light to moderate, not very active.',
      },
    ],
    keywords: ['TDEE calculator', 'daily calorie calculator', 'maintenance calories calculator', 'calorie needs calculator'],
  },
  {
    slug: 'body-fat',
    name: 'Body fat',
    title: 'Body Fat Percentage Calculator — Estimate Without Callipers',
    description:
      'Free body fat calculator. Estimate your body fat percentage and lean mass from height, weight, age and sex — no callipers or scan needed.',
    h1: 'Body Fat Calculator',
    intro:
      'Body fat percentage answers what BMI cannot: how much of your weight is fat and how much is everything else. Two people at the same BMI can sit ten points apart here.',
    formula: 'Estimated from BMI, age and sex (Deurenberg), then lean mass = weight − fat mass',
    facts: [
      'Essential fat — 2–5% men, 10–13% women',
      'Athletic — 6–13% men, 14–20% women',
      'Fitness — 14–17% men, 21–24% women',
      'Average — 18–24% men, 25–31% women',
    ],
    faqs: [
      {
        q: 'How accurate is a body fat calculator?',
        a: 'It is an estimate, typically within a few percent. DEXA and hydrostatic weighing are far more accurate. What matters more is tracking the same method over time.',
      },
      {
        q: 'What is lean body mass?',
        a: 'Everything that is not fat — muscle, bone, organs, water. Holding it steady while total weight falls is the goal of a good cut.',
      },
    ],
    keywords: ['body fat calculator', 'body fat percentage calculator', 'lean body mass calculator'],
  },
  {
    slug: 'ideal-weight',
    name: 'Ideal weight',
    title: 'Ideal Weight Calculator — Healthy Weight for Your Height',
    description:
      'Free ideal weight calculator. Find a healthy weight range for your height and frame, and see why it is a range rather than a single number.',
    h1: 'Ideal Weight Calculator',
    intro:
      'Ideal weight is a range, not a target you must hit. It is a reference point for a healthy weight at your height — where you sit inside it depends on how much muscle you carry.',
    formula: 'Devine and related formulas, cross-checked against the healthy BMI band for your height',
    facts: [
      'Always a range, never a single figure',
      'Says nothing about body composition on its own',
      'Muscular people sit above it and are perfectly healthy',
      'Best read next to body fat percentage',
    ],
    faqs: [
      {
        q: 'What should I weigh for my height?',
        a: 'Any weight inside the healthy BMI band for your height is reasonable. Where you land within it depends on your muscle mass and frame.',
      },
      {
        q: 'Is ideal weight different for men and women?',
        a: 'Yes. At the same height, the formulas give men a higher figure, reflecting typically greater muscle and bone mass.',
      },
    ],
    keywords: ['ideal weight calculator', 'healthy weight calculator', 'weight for height calculator'],
  },
  {
    slug: 'macros',
    name: 'Macros',
    title: 'Macro Calculator — Protein, Carbs & Fat Targets',
    description:
      'Free macro calculator. Get daily protein, carbohydrate and fat targets for fat loss, maintenance or muscle gain, based on your calories and goal.',
    h1: 'Macro Calculator',
    intro:
      'Calories decide whether weight moves; macros decide what that weight is. Enough protein in a deficit is the difference between losing fat and losing muscle along with it.',
    formula: 'Protein set per kg of bodyweight, fat as a share of calories, carbohydrate filling the remainder',
    facts: [
      'Protein 1.6–2.2 g per kg — the range with the best evidence',
      'Fat around 20–30% of calories, not lower for long',
      'Carbohydrate takes whatever calories are left',
      'Protein 4 kcal/g · carbs 4 kcal/g · fat 9 kcal/g',
    ],
    faqs: [
      {
        q: 'How much protein do I need to build muscle?',
        a: '1.6–2.2 g per kg of bodyweight per day. Beyond that the returns are negligible for almost everyone.',
      },
      {
        q: 'Do macros matter more than calories?',
        a: 'No. Calories decide the direction of weight change. Macros decide how much of it is muscle versus fat, and how well you hold training quality.',
      },
    ],
    keywords: ['macro calculator', 'protein calculator', 'macronutrient calculator', 'IIFYM calculator'],
  },
];

export const findCalculatorPage = (slug?: string) => CALCULATOR_PAGES.find((c) => c.slug === slug);
