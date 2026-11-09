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
  /** Extra sections shown under the calculator and baked into the static HTML. */
  extra?: { heading: string; points: string[] }[];
}

/** Which results tab each calculator page opens on. */
export const CALCULATOR_TAB: Record<string, 'body' | 'energy' | 'nutrition'> = {
  bmi: 'body',
  'body-fat': 'body',
  'ideal-weight': 'body',
  'water-intake': 'body',
  bmr: 'energy',
  tdee: 'energy',
  calorie: 'energy',
  macros: 'nutrition',
  protein: 'nutrition',
};

export interface CalculatorSource {
  label: string;
}

/**
 * The published methods behind each calculator, listed on the page so the
 * numbers can be checked. Cited as references, not as endorsements.
 */
export const CALCULATOR_SOURCES: Record<string, CalculatorSource[]> = {
  bmi: [
    { label: 'WHO — BMI classification (international cut-offs)' },
    { label: 'WHO Expert Consultation, Lancet 2004 — appropriate BMI for Asian populations' },
    { label: 'Misra et al., 2009 — consensus statement for Asian Indians (overweight from 23, obese from 25)' },
  ],
  bmr: [{ label: 'Mifflin MD et al., Am J Clin Nutr 1990 — new predictive equation for resting energy expenditure' }],
  tdee: [
    { label: 'Mifflin MD et al., Am J Clin Nutr 1990 — resting energy expenditure' },
    { label: 'Standard physical-activity multipliers (1.2 to 1.9)' },
  ],
  calorie: [
    { label: 'Mifflin MD et al., Am J Clin Nutr 1990 — resting energy expenditure' },
    { label: 'Standard physical-activity multipliers (1.2 to 1.9)' },
  ],
  'body-fat': [{ label: 'Hodgdon & Beckett, US Navy circumference method (1984)' }],
  'ideal-weight': [
    { label: 'Devine BJ, 1974 — ideal body weight formula' },
    { label: 'WHO BMI bands for the healthy range check' },
  ],
  macros: [
    { label: 'Morton RW et al., Br J Sports Med 2018 — protein intake and resistance-training gains' },
    { label: 'ICMR-NIN, Dietary Guidelines for Indians' },
  ],
  protein: [
    { label: 'Morton RW et al., Br J Sports Med 2018 — 1.6 g/kg and above for resistance-trained gains' },
    { label: 'ICMR-NIN, Dietary Guidelines for Indians and RDA tables' },
  ],
  'water-intake': [{ label: 'EFSA / NASEM adequate-intake reviews for total water — used as a sanity range' }],
};

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
      '18.5 to 24.9 — healthy range (international)',
      '25 to 29.9 — overweight (international)',
      '30 and above — obese (international)',
      'Indian / Asian cut-offs: healthy 18.5–22.9, overweight 23–24.9, obese 25 and above',
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
    extra: [
      {
        heading: 'How to read an ideal weight range',
        points: [
          'Treat it as a range, not a single number: any weight inside the healthy BMI band for your height is reasonable.',
          'Where you sit inside the range depends on frame size and how much muscle you carry.',
          'People who lift weights often sit above the formula and are perfectly healthy; check body fat percentage alongside it.',
          'For Indians the healthy BMI band tops out at 22.9 rather than 24.9, so the upper end of a healthy range is a little lower.',
        ],
      },
      {
        heading: 'Healthy weight range by height (BMI 18.5 to 24.9)',
        points: [
          '150 cm: about 42 to 56 kg',
          '160 cm: about 47 to 64 kg',
          '170 cm: about 53 to 72 kg',
          '180 cm: about 60 to 81 kg',
        ],
      },
    ],
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
    keywords: ['macro calculator', 'macronutrient calculator', 'IIFYM calculator'],
  },
  {
    slug: 'protein',
    name: 'Protein',
    title: 'Protein Calculator — Daily Protein Needs in Grams',
    description:
      'Free protein calculator. Get a daily protein target in grams for fat loss, maintenance or muscle gain, with notes for vegetarians and Indian diets.',
    h1: 'Protein Calculator',
    intro:
      'Most Indian diets are heavy on carbohydrate and light on protein. Enter your weight and goal to get a daily protein target in grams, then see how it splits across meals.',
    formula: 'Daily protein (g) = bodyweight (kg) × grams per kg — 1.6 to maintain, 1.8 to lose fat, 2.0 to build muscle',
    facts: [
      'The general RDA is about 0.8 g per kg — the minimum to avoid deficiency, not a target for training',
      'This tool uses 1.6 / 1.8 / 2.0 g per kg, inside the 1.6–2.2 g range with the best evidence for active people',
      'Spread it over three to four meals, roughly 20–40 g each',
      'Vegetarians can reach the same target; it just takes more planning (dal, paneer, curd, soya, sattu)',
    ],
    faqs: [
      {
        q: 'How much protein do I need per day?',
        a: 'Sedentary adults need roughly 0.8 g per kg to avoid deficiency. If you train, 1.6–2.2 g per kg is the range with the strongest evidence for keeping and building muscle. This calculator uses 1.6 g per kg to maintain, 1.8 to lose fat and 2.0 to gain.',
      },
      {
        q: 'Can I hit my protein target on a vegetarian Indian diet?',
        a: 'Yes. Dal, rajma, chana, paneer, curd, milk, soya chunks, sattu and peanuts add up. Plant proteins are slightly less digestible, so aiming for the upper end of your range is sensible. Our protein-in-Indian-foods guide lists grams per 100 g.',
      },
      {
        q: 'Is a high protein intake bad for the kidneys?',
        a: 'In healthy adults, intakes in this range have not been shown to harm the kidneys. If you have kidney disease or any medical condition, follow your doctor’s advice instead of a calculator.',
      },
      {
        q: 'Do I need protein powder?',
        a: 'No. It is a convenience, not a requirement. If whole foods get you to your target, powder adds nothing.',
      },
    ],
    keywords: ['protein calculator', 'protein calculator india', 'how much protein per day', 'daily protein intake calculator', 'protein for vegetarians'],
  },
  {
    slug: 'calorie',
    name: 'Calorie',
    title: 'Calorie Calculator — Daily Calories for Your Goal',
    description:
      'Free calorie calculator. Find the calories you burn a day and a daily target to lose fat, maintain or gain weight, using the Mifflin-St Jeor equation.',
    h1: 'Calorie Calculator',
    intro:
      'Your body burns a predictable number of calories a day. Eat below it and weight falls; eat above it and weight rises. This calculator estimates that number and sets a sensible target for your goal.',
    formula: 'TDEE = BMR (Mifflin-St Jeor) × activity factor. Target = TDEE × 0.82 to lose fat, × 1.12 to gain, × 1.0 to maintain',
    facts: [
      'BMR is what you burn at rest; TDEE adds everything you do in a day',
      'Fat-loss target here is about 18% below maintenance — a deficit most people can sustain',
      'Muscle-gain target is about 12% above maintenance, enough to grow without piling on fat',
      'Every formula is an estimate; adjust by 100 kcal every two weeks based on how your weight trend actually moves',
    ],
    faqs: [
      {
        q: 'How many calories should I eat to lose weight?',
        a: 'Roughly 15–20% below your maintenance calories is a deficit most people can keep up. Large cuts feel fast at first but usually cost muscle and are hard to sustain.',
      },
      {
        q: 'How accurate is a calorie calculator?',
        a: 'It is an estimate, typically within about 10% for most adults. Treat it as a starting point and adjust it against your real weight trend over two to three weeks.',
      },
      {
        q: 'What is a safe rate of weight loss?',
        a: 'About 0.25–0.75 kg a week suits most people. Very low calorie diets should only be followed under medical supervision.',
      },
      {
        q: 'Do I need to count calories on an Indian diet?',
        a: 'Not forever. Tracking for a couple of weeks teaches you the portions of roti, rice, dal and oil that actually matter. After that, portion habits can replace the app.',
      },
    ],
    keywords: ['calorie calculator', 'calorie calculator for weight loss', 'daily calorie calculator', 'calorie deficit calculator', 'maintenance calories calculator'],
  },
  {
    slug: 'water-intake',
    name: 'Water intake',
    title: 'Water Intake Calculator — Litres Per Day by Weight',
    description:
      'Free water intake calculator. Estimate how many litres of water you need a day from your weight and activity level, including hot-weather and training days.',
    h1: 'Water Intake Calculator',
    intro:
      'There is no single number that fits everyone. A practical daily target scales with your body weight and how active you are — and rises on hot days and training days.',
    formula: 'Water (L) = bodyweight (kg) × 0.035, plus 0 to 1 L depending on activity level',
    facts: [
      'Starts from about 35 ml per kg of bodyweight',
      'Adds 0.35 L for light activity up to 1 L for athletes training twice a day',
      'Tea, coffee, milk and water-rich food all count towards the total',
      'Add more in hot weather, at altitude, or when you sweat heavily',
    ],
    faqs: [
      {
        q: 'How much water should I drink a day?',
        a: 'For most adults, somewhere between 2 and 3.5 litres of total fluid a day, depending on body size, activity and climate. The calculator gives you a personal starting figure.',
      },
      {
        q: 'Does tea or coffee count?',
        a: 'Yes. Moderate amounts of tea and coffee contribute to your fluid intake. So do milk, buttermilk, soups and water-rich foods like fruit and vegetables.',
      },
      {
        q: 'How do I know if I am drinking enough?',
        a: 'Pale-yellow urine and not feeling persistently thirsty are the simplest signs. Dark urine, headaches and dizziness can mean you need more.',
      },
      {
        q: 'Can you drink too much water?',
        a: 'Rarely, but yes — drinking very large volumes in a short time can dilute blood sodium. Sip through the day rather than forcing large amounts at once.',
      },
    ],
    keywords: ['water intake calculator', 'how much water should i drink', 'daily water intake', 'water intake per day by weight'],
  },
];

/** Shown on /calculators and baked into its static HTML. */
export const CALCULATORS_GUIDE: { heading: string; points: string[] }[] = [
  {
    heading: 'Which calculator should I use?',
    points: [
      'Want to know if your weight is in a healthy range: start with BMI, then check body fat percentage if you train.',
      'Want to lose or gain weight: use the calorie calculator to set a daily target, then the macro calculator to split it.',
      'Want to build muscle: use the protein calculator for a daily gram target and the TDEE calculator for your calorie surplus.',
      'Want to know how much you burn at rest: BMR. How much you burn in a full day including activity: TDEE.',
      'Want a daily hydration target: use the water intake calculator.',
    ],
  },
  {
    heading: 'How to get the most from the results',
    points: [
      'Use your real numbers: measure weight in the morning and height without shoes.',
      'Treat every result as a starting estimate and adjust against your real weight trend over two to three weeks.',
      'Re-run the calculators every few kilos of change, because your calorie needs move with your weight.',
      'Indian users: the BMI calculator also shows the Indian and Asian cut-offs, where overweight starts at 23 rather than 25.',
    ],
  },
];

export const findCalculatorPage = (slug?: string) => CALCULATOR_PAGES.find((c) => c.slug === slug);
