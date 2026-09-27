/**
 * Post-build prerender: writes a static HTML file per route with correct
 * <title>, description, canonical, Open Graph tags and a crawlable
 * <h1> + intro baked in.
 *
 * Why this exists: every route was serving the identical 5 KB SPA shell with
 * zero <h1> and zero body text, so Google could not tell the pages apart —
 * /disclaimer and /contact were outranking the homepage. React still hydrates
 * and replaces #prerender-seo on mount, so nothing changes for real users.
 *
 * Output convention is dist/<route>/index.html. Vercel checks the filesystem
 * before applying the SPA rewrite in vercel.json, so these files win.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const DIST = 'dist';
const SITE = 'https://fitsmart.space';

/**
 * Titles lead with what people actually search for, not the brand. The domain
 * collides with "Smart Fit" (the Latin-American gym chain), which sends
 * location-intent traffic we can never convert — leading non-branded is the
 * only way out of that.
 */
const ROUTES = [
  {
    path: '/',
    title: 'Free Fitness Calculators, Workouts & Nutrition — FitSmart',
    description:
      'Free health calculators (BMI, BMR, TDEE, macros), structured workout plans and evidence-based nutrition guides — no sign-up, works on any device.',
    h1: 'Free Fitness Calculators, Workout Plans & Nutrition Guides',
    intro:
      'FitSmart brings together the tools people actually need to train well: precise health calculators for BMI, BMR, TDEE and macros, structured workout plans for every level, evidence-based nutrition guidance, and an AI coach that ties it together. Everything is free and runs in your browser.',
    sections: [
      { h2: 'Health calculators', points: [
        'BMI — body mass index against standard weight ranges',
        'BMR — resting calorie burn, the baseline before activity',
        'TDEE — total daily calories burned including activity level, with a calorie target for your goal',
        'Body fat % — the US Navy tape-measurement method',
        'Lean body mass and ideal weight for your height',
        'Daily protein target and a full macro split (protein, carbs, fat)',
        'Daily water intake based on your weight and activity level',
      ] },
      { h2: 'Training & nutrition', points: [
        'Structured workout plans for beginner through advanced',
        'Evidence-based nutrition guides, not fad-diet advice',
        'An AI coach that adapts plans to your numbers',
      ] },
      { h2: 'Training programs', points: [
        '30-Day Kickstart Challenge — build the training habit',
        'Lean & Strong — fat loss combined with muscle gain',
        'Hypertrophy Builder — structured muscle-gain program',
        'Home Shred — a fat-loss program with no gym equipment',
      ] },
    ],
  },
  {
    path: '/calculators',
    title: 'BMI, BMR, TDEE and Macro Calculators — Free | FitSmart',
    description:
      'Calculate your BMI, BMR, TDEE, daily calories and macro split for cutting, maintenance or bulking. Free, accurate and instant — no sign-up needed.',
    h1: 'Free Health & Fitness Calculators',
    intro:
      'Work out the numbers your training depends on: BMI, basal metabolic rate, total daily energy expenditure, your calorie target for cutting or bulking, and the macro split to hit it. Each calculator explains what the result means and what to do next, so the number is actually useful.',
    links: [
      { href: '/calculators/bmi', label: 'BMI Calculator' },
      { href: '/calculators/bmr', label: 'BMR Calculator' },
      { href: '/calculators/tdee', label: 'TDEE Calculator' },
      { href: '/calculators/body-fat', label: 'Body Fat % Calculator' },
      { href: '/calculators/ideal-weight', label: 'Ideal Weight Calculator' },
      { href: '/calculators/macros', label: 'Macro Calculator' },
    ],
  },
  {
    path: '/calculators/bmi',
    title: 'BMI Calculator — Body Mass Index for Men & Women — FitSmart',
    description:
      'Free BMI calculator. Enter height and weight to get your body mass index, the category it falls in, and what the number does and does not tell you.',
    h1: 'BMI Calculator',
    intro:
      'Body mass index compares your weight to your height. It is a screening number, not a diagnosis — useful for spotting a trend across a population, blunt for any single person. Enter your height and weight below to get your BMI, the category it falls in, and what the number actually means for your health.',
    sections: [
      { h2: 'BMI categories', points: [
        'Underweight: below 18.5',
        'Normal weight: 18.5 to 24.9',
        'Overweight: 25.0 to 29.9',
        'Obese class I: 30.0 to 34.9',
        'Obese class II: 35.0 to 39.9',
        'Obese class III: 40.0 and above',
      ] },
      { h2: 'Limitations of BMI', points: [
        'Does not distinguish between fat mass and muscle mass',
        'Athletes and bodybuilders often register as overweight or obese despite low body fat',
        'May underestimate body fat in older adults who have lost muscle',
        'Does not account for where fat is stored on the body (visceral vs subcutaneous)',
      ] },
    ],
    faq: [
      { question: 'What is a healthy BMI?', answer: 'A healthy BMI is between 18.5 and 24.9. Below 18.5 is considered underweight; 25 to 29.9 is overweight; 30 and above is classified as obese. These thresholds are the same for men and women.' },
      { question: 'Is BMI accurate for athletes?', answer: 'No. BMI does not account for body composition. Athletes with high muscle mass often register as overweight or obese despite having low body fat. Body fat percentage is a more useful measure for active people.' },
      { question: 'What is the difference between BMI and body fat percentage?', answer: 'BMI is calculated from height and weight alone and gives no information about body composition. Body fat percentage measures how much of your weight is fat versus muscle, bone and water — a much more actionable number for fitness goals.' },
      { question: 'How often should I check my BMI?', answer: 'Once a month is enough. BMI changes slowly, and checking more frequently creates noise rather than useful signal. Track the trend over several months rather than reacting to any single reading.' },
    ],
  },
  {
    path: '/calculators/bmr',
    title: 'BMR Calculator — Basal Metabolic Rate in Calories — FitSmart',
    description:
      'Free BMR calculator using the Mifflin-St Jeor equation. Find the calories your body burns at complete rest, before any activity is added.',
    h1: 'BMR Calculator',
    intro:
      'Basal metabolic rate is what you burn doing nothing at all — breathing, circulation, keeping warm. It is the floor under every calorie target, and eating below it for long is how people stall. This calculator uses the Mifflin-St Jeor equation, the most accurate formula validated for modern populations.',
    sections: [
      { h2: 'How BMR is calculated', points: [
        'Men: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5',
        'Women: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) - 161',
        'The Mifflin-St Jeor equation is more accurate than the older Harris-Benedict formula',
        'BMR accounts for sex, age, height and weight — not activity level',
      ] },
      { h2: 'What to do with your BMR', points: [
        'Multiply by an activity factor to get your TDEE (total daily energy expenditure)',
        'Your TDEE is the starting point for setting a calorie target',
        'A 500 calorie daily deficit below TDEE produces roughly 0.5 kg of fat loss per week',
        'Never eat significantly below your BMR long-term — it triggers muscle loss and metabolic adaptation',
      ] },
    ],
    faq: [
      { question: 'What is BMR?', answer: 'BMR (basal metabolic rate) is the number of calories your body burns at complete rest — just to maintain basic functions like breathing, circulation and keeping your organs running. It accounts for the largest share of your total daily calorie burn.' },
      { question: 'What is the difference between BMR and TDEE?', answer: 'BMR is your resting calorie burn only. TDEE (total daily energy expenditure) adds your activity level on top — exercise, walking, work and even fidgeting. TDEE is always higher than BMR and is the number you build your calorie target around.' },
      { question: 'Which BMR formula is most accurate?', answer: 'The Mifflin-St Jeor equation (1990) is the most accurate for most people and is what this calculator uses. The older Harris-Benedict formula tends to overestimate by around 5%. Neither is perfectly precise — treat the result as a starting estimate and adjust based on real-world results.' },
      { question: 'Does BMR change as you lose weight?', answer: 'Yes. BMR falls as you lose weight because there is less body mass to maintain. This is why calorie targets should be recalculated every 4 to 6 weeks during a fat-loss phase, and why very aggressive deficits slow down over time.' },
    ],
  },
  {
    path: '/calculators/tdee',
    title: 'TDEE Calculator — Daily Calories You Actually Burn',
    description:
      'Free TDEE calculator. Combine your BMR with your activity level to find total daily energy expenditure, then set a target for cutting or bulking.',
    h1: 'TDEE Calculator',
    intro:
      'Total daily energy expenditure is everything you burn in a day — resting metabolism plus training, walking, fidgeting and digesting. It is the number every calorie target should be built from. Eat below your TDEE to lose fat; above it to gain muscle.',
    sections: [
      { h2: 'Activity multipliers', points: [
        'Sedentary (desk job, little exercise): BMR x 1.2',
        'Lightly active (exercise 1-3 days/week): BMR x 1.375',
        'Moderately active (exercise 3-5 days/week): BMR x 1.55',
        'Very active (hard exercise 6-7 days/week): BMR x 1.725',
        'Extra active (physical job + daily training): BMR x 1.9',
      ] },
      { h2: 'How to use your TDEE', points: [
        'Fat loss: eat 300-500 calories below your TDEE per day',
        'Muscle gain: eat 200-300 calories above your TDEE per day',
        'Maintenance: eat at your TDEE',
        'Recalculate every 4-6 weeks as your weight changes',
      ] },
    ],
    faq: [
      { question: 'What is TDEE?', answer: 'TDEE (total daily energy expenditure) is the total number of calories you burn each day, combining your basal metabolic rate with all physical activity — exercise, walking, work and everyday movement. It is the most important number for setting a fat-loss or muscle-gain calorie target.' },
      { question: 'How many calories below TDEE should I eat to lose weight?', answer: 'A deficit of 300 to 500 calories per day below your TDEE produces steady, sustainable fat loss of around 0.3 to 0.5 kg per week. Larger deficits speed up weight loss but increase the risk of muscle loss and hunger that undermines the diet.' },
      { question: 'How accurate is a TDEE calculator?', answer: 'A TDEE calculator gives a good starting estimate — usually within 10 to 15% of your actual burn. Track your weight over 2 to 3 weeks at the calculated target and adjust by 100 to 200 calories if you are not seeing the expected rate of change.' },
      { question: 'Does TDEE change when you diet?', answer: 'Yes. TDEE drops as you lose weight because there is less body mass to move and maintain. It also drops through metabolic adaptation — the body becomes more efficient under a prolonged deficit. Recalculating every 4 to 6 weeks keeps your target accurate.' },
    ],
  },
  {
    path: '/calculators/body-fat',
    title: 'Body Fat Percentage Calculator — No Callipers Needed',
    description:
      'Free body fat calculator. Estimate your body fat percentage and lean mass from height, weight, age and sex — no callipers or scan needed.',
    h1: 'Body Fat Calculator',
    intro:
      'Body fat percentage answers what BMI cannot: how much of your weight is fat and how much is everything else. Two people at the same BMI can sit ten points apart here. This calculator uses the US Navy tape-measurement method — one of the most accessible accurate estimates without specialist equipment.',
    sections: [
      { h2: 'Healthy body fat ranges', points: [
        'Essential fat (men): 2-5%',
        'Essential fat (women): 10-13%',
        'Athletes (men): 6-13%',
        'Athletes (women): 14-20%',
        'Fitness (men): 14-17%',
        'Fitness (women): 21-24%',
        'Average (men): 18-24%',
        'Average (women): 25-31%',
      ] },
    ],
    faq: [
      { question: 'What is a healthy body fat percentage?', answer: 'For men, 10 to 20% is generally considered healthy; for women, 18 to 28%. Athletes typically sit lower — 6 to 13% for men and 14 to 20% for women. Going below essential fat levels (2-5% men, 10-13% women) carries serious health risks.' },
      { question: 'How accurate is the Navy body fat calculator?', answer: 'The US Navy method typically estimates body fat within 3 to 4 percentage points of a DEXA scan for most people. It is less accurate at very low or very high body fat levels. Consistent use of the same method over time tells you whether you are moving in the right direction, even if the absolute number is slightly off.' },
      { question: 'What is the difference between body fat percentage and BMI?', answer: 'BMI is calculated from height and weight alone and cannot distinguish between fat and muscle. Body fat percentage directly measures how much of your total weight is fat. A muscular athlete can have a high BMI but low body fat — body fat percentage catches this where BMI does not.' },
    ],
  },
  {
    path: '/calculators/ideal-weight',
    title: 'Ideal Weight Calculator — Healthy Range for Your Height',
    description:
      'Free ideal weight calculator. Find a healthy weight range for your height and frame, and see why it is a range rather than a single number.',
    h1: 'Ideal Weight Calculator',
    intro:
      'Ideal weight is a range, not a single number you must hit. It is a reference point for a healthy weight at your height — where you sit inside it depends on how much muscle you carry. This calculator uses multiple formulas (Devine, Robinson, Miller, Hamwi) and shows you the full range.',
    faq: [
      { question: 'How is ideal weight calculated?', answer: 'Several formulas exist — Devine (1974), Robinson (1983), Miller (1983) and Hamwi (1964) are the most widely used. They are based on height and sex and give slightly different results. The average across formulas is a reasonable target range rather than a precise goal.' },
      { question: 'Should I aim to reach my ideal weight?', answer: 'Ideal weight is a reference range, not a mandatory target. Body composition matters more than the number on a scale — someone carrying more muscle than average may sit above the ideal weight range while being healthier than someone within it.' },
      { question: 'Is ideal weight the same for men and women?', answer: 'No. Men are expected to carry more muscle mass, so ideal weight formulas give a higher number for men than for women at the same height. The Devine formula, for example, gives men a higher baseline by about 2.3 kg per inch of height above 5 feet.' },
    ],
  },
  {
    path: '/calculators/macros',
    title: 'Macro Calculator — Protein, Carbs & Fat Targets — FitSmart',
    description:
      'Free macro calculator. Get daily protein, carbohydrate and fat targets for fat loss, maintenance or muscle gain, based on your calories and goal.',
    h1: 'Macro Calculator',
    intro:
      'Calories decide whether weight moves; macros decide what that weight is. Enough protein in a deficit is the difference between losing fat and losing muscle along with it. Enter your goal, calorie target and body weight to get your personalised protein, carb and fat targets.',
    sections: [
      { h2: 'Recommended macro splits by goal', points: [
        'Fat loss: 40% protein, 35% carbs, 25% fat',
        'Muscle gain: 30% protein, 50% carbs, 20% fat',
        'Maintenance: 25-30% protein, 40-45% carbs, 25-30% fat',
        'Minimum protein regardless of goal: 1.6 g per kg of bodyweight',
      ] },
    ],
    faq: [
      { question: 'What are macros?', answer: 'Macros (macronutrients) are the three main nutrients that provide calories: protein, carbohydrates and fat. Protein and carbs provide 4 calories per gram; fat provides 9 calories per gram. Tracking macros gives you finer control over body composition than tracking calories alone.' },
      { question: 'How much protein do I need to build muscle?', answer: 'Research consistently shows that 1.6 to 2.2 grams of protein per kilogram of bodyweight per day is enough to maximise muscle protein synthesis. Going higher does not hurt but provides no additional muscle-building benefit. Spreading intake across 3 to 4 meals optimises absorption.' },
      { question: 'What macro split is best for fat loss?', answer: 'A higher-protein split (around 40% of calories from protein) is most effective for fat loss because protein preserves lean muscle during a calorie deficit and has a higher thermic effect than carbs or fat — you burn more calories digesting it. Carb and fat ratios are less critical than getting protein right.' },
      { question: 'Do I need to track macros every day?', answer: 'Not necessarily. Consistent tracking for 4 to 8 weeks builds enough awareness of portion sizes and food composition that most people can maintain progress with periodic checks. The goal is to build habits, not to track indefinitely.' },
    ],
  },
  {
    path: '/workouts',
    title: 'Free Workout Plans and Exercise Guides for Every Level',
    description:
      'Structured workout plans for strength, fat loss and general fitness, with proper form guidance for every exercise. Free, no-equipment options included.',
    h1: 'Free Workout Plans & Exercise Guides',
    intro:
      'Structured routines for strength, fat loss, muscle gain and general conditioning, whether you train in a gym or at home with no equipment. Each plan sets out the sets, reps and progression, and every exercise comes with form guidance so you train safely.',
    sections: [
      { h2: 'Workout plans by goal', points: [
        'Fat loss — calorie-burning circuits, HIIT and conditioning sessions',
        'Muscle gain — progressive overload strength training, push-pull-legs splits',
        'Beginner — foundational movement patterns, shorter sessions, lower intensity',
        'Home workouts — bodyweight-only plans, no equipment required',
        'Strength — compound lifts, linear progression for squat, bench, deadlift and overhead press',
      ] },
      { h2: 'What each plan includes', points: [
        'Weekly schedule with rest day placement',
        'Sets, reps, tempo and rest periods for every session',
        'Progression guide — when and how to increase the load',
        'Exercise demo videos for proper form on every movement',
        'A beginner modification for most exercises',
      ] },
    ],
    links: [{ href: '/exercises', label: 'Exercises by Muscle Group' }],
  },
  {
    path: '/exercises',
    title: 'Exercises by Muscle Group — Free Form-Check Videos | FitSmart',
    description:
      'Browse exercise demo videos by muscle group — chest, back, shoulders, biceps, triceps, abs, quads, hamstrings, glutes and calves. Free, no sign-up.',
    h1: 'Exercises by Muscle Group',
    intro:
      'Pick a muscle group to see a real exercise demo — quick form-check clips for chest, back, shoulders, arms, abs and legs. Free, no sign-up.',
  },
  {
    path: '/nutrition',
    title: 'Nutrition Guides, Macros and Meal Plans | FitSmart',
    description:
      'Evidence-based nutrition guides: how to set macros, plan meals, hit a calorie deficit for fat loss, and eat enough protein — without fad diets.',
    h1: 'Evidence-Based Nutrition Guides',
    intro:
      'Nutrition explained without the fads: how to set your macros, build a calorie deficit that you can actually sustain, get enough protein, plan meals around your schedule, and understand which supplements are worth the money and which are not.',
    sections: [
      { h2: 'Topics covered', points: [
        'How to calculate and set a calorie deficit that is sustainable for 12+ weeks',
        'Protein — how much you actually need, best sources, timing and spreading across meals',
        'Carbs and fat — why neither is the enemy and how to balance both around your goal',
        'Meal planning — building a weekly structure that does not require cooking every day',
        'Supplements — what the evidence actually says about creatine, protein powder, caffeine and fish oil',
        'Indian diet and vegetarian options — high-protein meal building with common ingredients',
      ] },
      { h2: 'Nutrition principles that work', points: [
        'Calories in vs calories out is the primary driver of weight change',
        'Protein (1.6-2.2 g per kg bodyweight) preserves muscle during fat loss',
        'No food is categorically off-limits — frequency and portion matter more than food choice',
        'Consistency over 80% of the time beats perfection briefly followed by abandonment',
      ] },
    ],
  },
  {
    path: '/programs',
    title: 'Training Programs for Strength & Fat Loss — FitSmart',
    description:
      'Complete multi-week training programs for beginners, fat loss and strength. Follow a plan with clear progression instead of guessing each session.',
    h1: 'Structured Training Programs',
    intro:
      'Complete multi-week programs that tell you exactly what to do each session, with built-in progression so you keep improving. Choose a beginner foundation, a fat-loss block or a strength cycle, and follow it rather than improvising every time you train.',
    // Every ProgramCard's "View program" button linked back to this same
    // page until the fix that added the four routes below — the exact bug
    // a user reported. Same reasoning as /calculators' links list: give
    // this listing page a real, crawlable path to each one.
    links: [
      { href: '/programs/30-day-kickstart', label: '30-Day Kickstart Challenge' },
      { href: '/programs/lean-and-strong', label: 'Lean & Strong' },
      { href: '/programs/hypertrophy-builder', label: 'Hypertrophy Builder' },
      { href: '/programs/home-shred', label: 'Home Shred' },
    ],
  },
  {
    path: '/programs/30-day-kickstart',
    title: '30-Day Kickstart Challenge — 4-Week Beginner Habit Plan',
    description:
      'A month-long guided plan that turns fitness into a daily habit with short, achievable 20-30 minute sessions, 5 days a week, no equipment required.',
    h1: '30-Day Kickstart Challenge',
    intro:
      'Four weeks, five short sessions a week, no equipment — built to get the habit in place before anything else. The goal is not intensity; it is still training on day 25, which is where most people who start from nothing actually fall off.',
  },
  {
    path: '/programs/lean-and-strong',
    title: 'Lean & Strong — 8-Week Fat Loss & Muscle Program',
    description:
      'An 8-week body-recomposition program pairing progressive strength training with macro guidance and weekly check-ins to lose fat and keep muscle.',
    h1: 'Lean & Strong',
    intro:
      'Eight weeks, four sessions a week, pairing progressive strength blocks with macro guidance so the scale moving down does not just mean muscle going with it. Weekly check-ins keep the plan honest instead of static.',
  },
  {
    path: '/programs/hypertrophy-builder',
    title: 'Hypertrophy Builder — 12-Week Muscle Gain Program',
    description:
      'A 12-week push-pull-legs split with auto-regulated volume and built-in deload weeks, engineered for maximum lean-mass gains.',
    h1: 'Hypertrophy Builder',
    intro:
      'Twelve weeks of a push-pull-legs split, five days a week, with auto-regulated volume and deload weeks built into the plan rather than left for you to guess when to take one.',
  },
  {
    path: '/programs/home-shred',
    title: 'Home Shred — 6-Week Fat Loss Program, No Equipment',
    description:
      'Six weeks of equipment-free HIIT and conditioning for fat loss, with follow-along timers and low-impact options — do it in a living room, hotel or dorm.',
    h1: 'Home Shred',
    intro:
      'Six weeks of equipment-free HIIT and conditioning, five days a week, with follow-along timers and low-impact options for anyone whose joints do not love standard HIIT. Works in a living room, hotel room or dorm.',
  },
  {
    path: '/ai-coach',
    title: 'AI Fitness Coach for Personalised Training — FitSmart',
    description:
      'Ask an AI fitness coach about training, form, macros and recovery, and get personalised, evidence-based answers built around your goals — free.',
    h1: 'AI Fitness Coach',
    intro:
      'Ask about training, exercise form, macros, recovery or plateaus and get a clear, evidence-based answer built around your own goals and equipment. The coach explains the reasoning rather than just handing you a plan, so you learn how to adjust it yourself.',
  },
  {
    path: '/blog',
    title: 'Fitness and Nutrition Articles, Written Plainly | FitSmart',
    description:
      'Practical articles on training, nutrition and health science — including HIIT versus steady-state cardio, protein intake and recovery.',
    h1: 'Fitness & Nutrition Articles',
    intro:
      'Practical, research-backed articles on the questions people actually ask: HIIT versus steady-state cardio for fat loss, how much protein you really need, how long recovery should take, and which training variables matter most.',
    // Every BlogCard's link pointed at /blog#<slug>, which nothing read —
    // same orphan-page bug already fixed on /programs and /calculators.
    // These six titles/descriptions are pulled straight from
    // data/content.ts's blogPosts array, not invented.
    links: [
      { href: '/blog/progressive-overload-guide', label: "The Beginner's Guide to Progressive Overload" },
      { href: '/blog/calories-you-need', label: 'How Many Calories Do You Actually Need?' },
      { href: '/blog/indian-diet-muscle-gain', label: 'A Balanced Indian Diet Plan for Muscle Gain' },
      { href: '/blog/mobility-desk-posture', label: '5 Mobility Drills to Fix Desk Posture' },
      { href: '/blog/hiit-vs-steady-state', label: 'HIIT vs Steady-State Cardio: Which Burns More Fat?' },
      { href: '/blog/sleep-fitness-tool', label: 'Sleep: The Most Underrated Fitness Tool' },
    ],
  },
  {
    path: '/blog/progressive-overload-guide',
    title: "The Beginner's Guide to Progressive Overload — FitSmart",
    description:
      'The single most important principle for building strength and muscle — explained simply, with rep targets, load increments and a practical 4-week starter plan.',
    h1: "The Beginner's Guide to Progressive Overload",
    intro:
      'Progressive overload is the single most important principle for building strength and muscle: consistently making your training harder over time, whether by adding weight, reps, sets or reducing rest. Without it, adaptation stops and the body has no reason to keep changing. This guide explains the principle simply, with practical rep targets, load increment guidance and a 4-week starter plan you can begin this week.',
  },
  {
    path: '/blog/calories-you-need',
    title: 'How Many Calories Do You Actually Need? — FitSmart',
    description:
      'BMR, TDEE and calorie targets demystified — how to calculate your maintenance number and set a deficit or surplus that you can actually stick to.',
    h1: 'How Many Calories Do You Actually Need?',
    intro:
      'Most calorie estimates are either too low (crash-diet territory) or too high (maintenance or above). The right number depends on your BMR — the calories your body burns at rest — multiplied by your actual activity level to get your TDEE. This article demystifies both numbers, shows you how to calculate your personal maintenance calorie target, and explains how to set a deficit or surplus that produces results you can actually sustain beyond a few weeks.',
  },
  {
    path: '/blog/indian-diet-muscle-gain',
    title: 'A Balanced Indian Diet Plan for Muscle Gain — FitSmart',
    description:
      'High-protein, vegetarian-friendly meals built around everyday Indian grocery staples — dal, paneer, curd and eggs — to support steady lean muscle growth.',
    h1: 'A Balanced Indian Diet Plan for Muscle Gain',
    intro:
      'Building muscle on an Indian diet is straightforward once you know which everyday ingredients are high in protein. Dal, paneer, curd, eggs, soya, chickpeas and peanuts are all excellent sources — affordable, widely available and easy to combine into high-protein meals without relying on imported supplements. This guide builds a practical daily meal plan around these staples, hitting the 1.6 to 2.2 g of protein per kg bodyweight that research identifies as the range for maximising muscle growth.',
  },
  {
    path: '/blog/mobility-desk-posture',
    title: '5 Mobility Drills to Fix Desk Posture — FitSmart',
    description:
      'Sitting all day? These five daily mobility drills open your hips and shoulders, fix your thoracic spine and undo the damage of a desk job.',
    h1: '5 Mobility Drills to Fix Desk Posture',
    intro:
      'Sitting for 8 or more hours a day compresses the hip flexors, rounds the thoracic spine and pulls the shoulders forward — and those patterns carry directly into training, increasing injury risk on squats, deadlifts and pressing movements. These five daily mobility drills take under 10 minutes and specifically target the areas most damaged by desk work: hip flexors, thoracic rotation, shoulder external rotation and posterior chain length.',
  },
  {
    path: '/blog/hiit-vs-steady-state',
    title: 'HIIT vs Steady-State Cardio: Which Burns More Fat? — FitSmart',
    description: 'The honest, evidence-based answer on HIIT vs steady-state cardio — plus a practical strategy to combine both training styles for the best fat-loss results.',
    h1: 'HIIT vs Steady-State Cardio: Which Burns More Fat?',
    intro:
      'HIIT burns more calories per minute and creates a post-exercise oxygen consumption effect that continues burning calories after the session ends. Steady-state cardio is easier to recover from, can be sustained for longer and is gentler on joints. The honest answer is that both work — and that combining them intelligently beats choosing one exclusively. This article gives you the evidence-based breakdown and a practical weekly structure that uses both.',
  },
  {
    path: '/blog/sleep-fitness-tool',
    title: 'Sleep: The Most Underrated Fitness Tool — FitSmart',
    description: 'Why quality sleep beats most supplements for muscle recovery and growth — plus simple habits to wind down faster and recover harder while you rest.',
    h1: 'Sleep: The Most Underrated Fitness Tool',
    intro:
      'Most of the physiological processes that actually build muscle and burn fat happen during sleep: growth hormone peaks in the first hours, testosterone recovers overnight, and muscle protein synthesis runs at its highest rate while you rest. Cutting sleep short — even by an hour or two — measurably reduces muscle gain, increases fat storage and impairs gym performance the next day. This article explains the mechanisms and gives you specific, practical habits to improve sleep quality starting tonight.',
  },
  {
    path: '/about',
    title: 'About FitSmart — Who Builds These Calculators and Why',
    description:
      'FitSmart builds free, evidence-based fitness calculators, workout plans and nutrition guides. Learn what we build and the principles behind it.',
    h1: 'About FitSmart',
    intro:
      'FitSmart builds free fitness tools grounded in evidence rather than trends: calculators that show their working, training plans with real progression, and nutrition guidance that does not depend on buying anything.',
  },
  {
    path: '/contact',
    title: 'Contact FitSmart — Questions, Corrections and Feedback',
    description: 'Get in touch with FitSmart about a question, a correction to a calculator or a guide, or a partnership enquiry. We read and reply to everything.',
    h1: 'Contact FitSmart',
    // The name, address and phone are spelled out here, not just rendered by
    // React, so the crawlers that read this file without running JavaScript can
    // match them against the same details published anywhere else.
    intro:
      'Questions, corrections or partnership enquiries are all welcome — send a message and we will get back to you. ' +
      'FitSmart is run by Akshay Mahajan from Surat, Gujarat, India. ' +
      'Email akshaymad0608@gmail.com or call +91 76008 85080, Monday to Saturday, 10:00 AM to 8:00 PM IST.',
  },
  {
    path: '/help',
    title: 'Help Centre — Using the FitSmart Calculators and Plans',
    description: 'Answers to common questions about the FitSmart calculators, workout plans, accounts and the AI coach — how each works and how to use it.',
    h1: 'Help & Frequently Asked Questions',
    intro: 'Common questions about the calculators, the training plans, accounts and the AI coach, answered in one place.',
    // Mirrors helpFaqs in src/pages/legal.tsx. Kept in sync by hand — React's
    // Seo.tsx already injects the same FAQPage schema client-side, but that
    // useEffect never runs for non-JS AI crawlers (GPTBot, ClaudeBot,
    // PerplexityBot — all explicitly welcomed in robots.txt), so it needs to
    // ship in the static HTML too or those crawlers see zero structured data
    // on the one page whose whole job is answering questions.
    faq: [
      {
        question: 'How do I get started with FitSmart?',
        answer:
          'Start with a program that matches your goal, use the calculators to set your calorie and protein targets, then let the AI Coach fill in the details.',
      },
      {
        question: 'How do the calculators work?',
        answer:
          'Enter your details once on the Calculators page to see every metric — BMI, BMR, TDEE, body fat, ideal weight and macros — and download a PDF report to keep.',
      },
      {
        question: 'What if I need more help?',
        answer: 'Email akshaymad0608@gmail.com any time — we usually reply within one business day.',
      },
    ],
  },
  // Legal and utility routes. These need unique titles mainly so they stop
  // competing with the homepage in search — /disclaimer and /contact were
  // outranking it purely because every route shipped identical HTML.
  { path: '/privacy', title: 'Privacy Policy — What FitSmart Collects and Never Stores', description: 'How FitSmart collects, uses and protects your data, what stays in your browser, what we never store, and the choices you have over any of it.', h1: 'Privacy Policy', intro: 'How FitSmart collects, uses and protects your personal data.' },
  { path: '/terms', title: 'Terms and Conditions for Using FitSmart | FitSmart', description: 'The terms that apply when you use FitSmart — what the calculators and plans are, what they are not, and the limits of what we can promise.', h1: 'Terms of Service', intro: 'The terms that apply when you use the FitSmart website and tools.' },
  { path: '/cookies', title: 'Cookie Policy — Which Cookies FitSmart Uses and Why', description: 'Which cookies FitSmart uses, what each one is for, how long they last, and how to control or clear them from your browser at any time.', h1: 'Cookie Policy', intro: 'Which cookies FitSmart uses, what they do, and how you can control them.' },
  { path: '/disclaimer', title: 'Disclaimer — FitSmart Is Not Medical Advice, Read This', description: 'FitSmart provides general fitness and nutrition information, not medical advice. What that means for you, and when to speak to a doctor first.', h1: 'Medical Disclaimer', intro: 'FitSmart provides general fitness and nutrition information. It is not medical advice — speak to a qualified professional before changing your training or diet.' },
  { path: '/accessibility', title: 'Accessibility at FitSmart — What We Do and What Is Next', description: 'How FitSmart works towards an accessible experience for everyone — keyboard navigation, contrast, screen readers, and what we are still fixing.', h1: 'Accessibility Statement', intro: 'How FitSmart works towards an accessible experience, and how to report a barrier you hit.' },
  { path: '/careers', title: 'Careers at FitSmart — Open Roles and How to Reach Us', description: 'Open roles at FitSmart and how to get in touch about working on the calculators, the training plans or the nutrition guides behind them.', h1: 'Careers at FitSmart', intro: 'Open roles and how to get in touch about working with us.' },
  { path: '/press', title: 'Press and Media — FitSmart Brand Assets and Enquiries', description: 'Brand assets, logos and press enquiries for FitSmart — what you may use, how to credit it, and who to contact about a story or interview.', h1: 'Press & Media', intro: 'Brand assets, background and press enquiries.' },
  { path: '/sitemap', title: 'Sitemap — Every Page on FitSmart in One Plain List', description: 'Every page on FitSmart in one plain list — calculators, workout plans, nutrition guides, articles and the policy pages, all in one place.', h1: 'Sitemap', intro: 'Every page on FitSmart, in one list.' },
];

// Only these 6 links ever shipped in NAV — every route carried it, but the 6
// calculator sub-pages and 11 legal/utility routes below had nothing
// crawlable pointing at them, on any page. They existed only via
// sitemap.xml. Same fix already applied on aimastertools, QUICK-RESUME- and
// akshay.website this week: add every route here so a non-JS crawler has a
// path to all of them, not just the top six.
const NAV =
  '<nav aria-label="Sections">' +
  '<a href="/calculators">Health calculators</a> · ' +
  '<a href="/calculators/bmi">BMI</a> · ' +
  '<a href="/calculators/bmr">BMR</a> · ' +
  '<a href="/calculators/tdee">TDEE</a> · ' +
  '<a href="/calculators/body-fat">Body fat %</a> · ' +
  '<a href="/calculators/ideal-weight">Ideal weight</a> · ' +
  '<a href="/calculators/macros">Macros</a> · ' +
  '<a href="/workouts">Workout plans</a> · ' +
  '<a href="/exercises">Exercises by Muscle</a> · ' +
  '<a href="/programs">Training programs</a> · ' +
  '<a href="/nutrition">Nutrition guides</a> · ' +
  '<a href="/ai-coach">AI coach</a> · ' +
  '<a href="/blog">Articles</a> · ' +
  '<a href="/about">About</a> · ' +
  '<a href="/contact">Contact</a> · ' +
  '<a href="/help">Help</a> · ' +
  '<a href="/careers">Careers</a> · ' +
  '<a href="/press">Press</a> · ' +
  '<a href="/sitemap">Sitemap</a> · ' +
  '<a href="/privacy">Privacy</a> · ' +
  '<a href="/terms">Terms</a> · ' +
  '<a href="/cookies">Cookies</a> · ' +
  '<a href="/disclaimer">Disclaimer</a> · ' +
  '<a href="/accessibility">Accessibility</a> · ' +
  '<a href="/bmi-calculator-for-indians.html">BMI for Indians</a> · ' +
  '<a href="/fitness-guidelines-reference.html">Guidelines Reference</a> · ' +
  '<a href="/protein-for-vegetarians-india.html">Protein for Vegetarians</a>' +
  '</nav>';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

// path -> h1, so a nested route (e.g. /programs/:slug) can name its parent
// in the breadcrumb without repeating the title text by hand.
const h1ByPath = Object.fromEntries(ROUTES.map((r) => [r.path, r.h1]));

/**
 * Breadcrumb + (optional) FAQPage JSON-LD, baked directly into the static
 * HTML. Seo.tsx already injects the same breadcrumb/FAQ schema client-side
 * via a useEffect, but that never runs for AI crawlers that don't execute
 * JS (GPTBot, ClaudeBot, PerplexityBot — all explicitly welcomed in
 * robots.txt for GEO/AEO). Organization + WebSite schema already ship
 * statically in index.html's template and so reach every route already;
 * this closes the gap for the per-page schema that template can't cover.
 */
function pageSchema(route) {
  const graph = [];
  if (route.path !== '/') {
    const segments = route.path.split('/').filter(Boolean);
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' }];
    let acc = '';
    segments.forEach((seg, i) => {
      acc += '/' + seg;
      const name = i === segments.length - 1 ? route.h1 : h1ByPath[acc] || seg;
      crumbs.push({ '@type': 'ListItem', position: i + 2, name, item: SITE + acc });
    });
    graph.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs });
  }
  if (route.faq?.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }
  return graph;
}

let count = 0;
for (const route of ROUTES) {
  const url = `${SITE}${route.path}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[\s\S]*?>/, `<meta name="description" content="${esc(route.description)}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title"[\s\S]*?>/, `<meta property="og:title" content="${esc(route.title)}" />`);
  html = html.replace(/<meta\s+property="og:description"[\s\S]*?>/, `<meta property="og:description" content="${esc(route.description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta name="twitter:title"[\s\S]*?>/, `<meta name="twitter:title" content="${esc(route.title)}" />`);
  html = html.replace(/<meta\s+name="twitter:description"[\s\S]*?>/, `<meta name="twitter:description" content="${esc(route.description)}" />`);

  const schemaGraph = pageSchema(route);
  if (schemaGraph.length) {
    const schemaTag = schemaGraph
      .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('');
    html = html.replace('</head>', `${schemaTag}</head>`);
  }

  // Crawlable body per route. React replaces #root's children on mount, so this
  // is only ever seen by non-JS crawlers and the first Google pass.
  const sectionsHtml = (route.sections || [])
    .map((s) =>
      `<h2 style="font-size:20px;margin:28px 0 10px">${esc(s.h2)}</h2>` +
      `<ul style="font-size:15px;line-height:1.6;color:#444;padding-left:20px">${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`,
    )
    .join('');
  // Plain-text points can't link anywhere. /calculators listed its six
  // sub-calculators nowhere crawlable — this renders route.links as real
  // <a> tags instead, same mechanism added to the portfolio site's
  // prerender.mjs for the same reason.
  const linksHtml = route.links?.length
    ? `<h2 style="font-size:20px;margin:28px 0 10px">${esc(route.linksHeading || 'On this page')}</h2>` +
      `<ul style="font-size:15px;line-height:1.6;color:#444;padding-left:20px">${route.links
        .map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`)
        .join('')}</ul>`
    : '';
  const seoBlock =
    `<div id="prerender-seo" style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">` +
    `<h1 style="font-size:30px;line-height:1.2;margin:0 0 14px">${esc(route.h1)}</h1>` +
    `<p style="font-size:17px;line-height:1.6;color:#444">${esc(route.intro)}</p>` +
    `${linksHtml}${sectionsHtml}${NAV}</div>`;
  html = html.replace(/<div id="prerender-seo"[\s\S]*?<\/nav><\/div>/, seoBlock);

  const outPath = route.path === '/' ? join(DIST, 'index.html') : join(DIST, route.path.slice(1), 'index.html');
  if (route.path !== '/') mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerendered ${route.path}`);
  count++;
}

console.log(`\nPrerender complete: ${count} routes`);

/* ---------------------------------------------------------------- sitemap -- */

/**
 * Built from the same route list, not maintained by hand.
 *
 * public/sitemap.xml had drifted to nine URLs while this file was prerendering
 * far more — every route added since was live, crawlable and absent from the
 * one file whose job is to announce it. Generating it here means the two can
 * no longer disagree.
 */

/**
 * Standalone static HTML pages living directly in public/ — not React
 * routes, so ROUTES/prerender never touches them, but they still need a
 * sitemap entry or they repeat the exact "exists, but nowhere else knows
 * it" problem this file was written to stop. Same reasoning as NAV below:
 * add each one here so it isn't silently orphaned again.
 */
const EXTRA_STATIC_PAGES = [
  '/bmi-calculator-for-indians.html',
  '/fitness-guidelines-reference.html',
  '/protein-for-vegetarians-india.html',
];

const priorityFor = (path) => {
  if (path === '/') return '1.0';
  if (/^\/(workouts|nutrition|calculators|programs)$/.test(path)) return '0.9';
  if (path.startsWith('/calculators/')) return '0.8';
  if (/^\/(ai-coach|blog|about)$/.test(path)) return '0.7';
  if (/^\/(privacy|terms|cookies|disclaimer|accessibility|careers|press|sitemap)$/.test(path)) return '0.3';
  if (EXTRA_STATIC_PAGES.includes(path)) return '0.7';
  return '0.5';
};
const changefreqFor = (path) =>
  path === '/blog' ? 'daily' : /^\/(privacy|terms|cookies|disclaimer|accessibility)$/.test(path) ? 'yearly' : 'monthly';

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  [...ROUTES.map((r) => r.path), ...EXTRA_STATIC_PAGES]
    .map(
      (path) =>
        `  <url><loc>${SITE}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod>` +
        `<changefreq>${changefreqFor(path)}</changefreq><priority>${priorityFor(path)}</priority></url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join('public', 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${ROUTES.length + EXTRA_STATIC_PAGES.length} urls`);
