import type { BlogPost, Faq, Program, Stat, Testimonial } from '@/types';

// Every number here must be one an answer engine can quote as fact without
// FitSmart being unable to back it up. "250,000+ Active members" and
// "90+ Countries reached" were fabricated vanity metrics — not derived from
// any real count in this codebase — the exact same problem flagged and
// removed from the akshay.website portfolio ("1M+ users"). AEO/GEO tools
// (ChatGPT, Perplexity, AI Overviews) quote stats like this verbatim, so a
// fake one here becomes a false "fact" about the brand. These four are
// real, countable things: 6 calculators, 4 programs, 6 workout plans in
// data/workouts.ts, and the "free, no sign-up" claim already made honestly
// elsewhere on the site (About, Home intro).
export const stats: Stat[] = [
  { label: 'Health calculators', value: 6, suffix: '' },
  { label: 'Training programs', value: 4, suffix: '' },
  { label: 'Workout plans', value: 6, suffix: '' },
  { label: 'Free to use', value: 100, suffix: '%' },
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
    body: [
      {
        heading: 'Why the same workout stops working',
        paragraphs: [
          "Your body adapts to whatever you consistently ask of it, and only to that. The first time you squat with 40kg, it's a real stimulus — muscle fibres are stressed, and the body responds by getting a little stronger and more resilient so that weight is easier next time. Repeat that exact same 40kg for eight weeks straight and something predictable happens: nothing. The stimulus that used to be new is now just maintenance.",
          "This is the entire logic behind progressive overload. It isn't a training style or a program — it's the requirement underneath every program that actually works. Without it, you can train hard, sweat plenty, and still plateau, because effort and stimulus are not the same thing.",
        ],
      },
      {
        heading: 'Four ways to overload, not just one',
        paragraphs: [
          "Adding weight to the bar is the obvious lever, but it's not the only one, and leaning on it exclusively is why a lot of beginners stall or get hurt. There are four practical ways to make a session harder than the last one: more weight, more reps at the same weight, more sets of the same weight and reps, or the same weight and reps with better control — a slower lowering phase, less rest between sets, or a fuller range of motion.",
          "A beginner squatting 40kg for 3 sets of 8 doesn't need to jump to 45kg next week. Getting to 3 sets of 10 at 40kg first, with good form, is real progress — and a safer one. Weight is the lever to pull last, after reps and sets have been pushed within a sensible range.",
        ],
      },
      {
        heading: 'A practical 4-week starting plan',
        paragraphs: [
          "Pick three or four compound movements — squat, hinge (deadlift or Romanian deadlift), push (bench or overhead press) and pull (row or pulldown) — and train them twice a week. Start at a weight where the last two reps of a set feel genuinely hard but the form doesn't break down.",
          'Week 1: establish the baseline — 3 sets of 8 at that weight, focusing on form. Week 2: add one rep per set where you can (3 sets of 9, then 10). Week 3: once you hit 3 sets of 10 cleanly, add a small amount of weight (2.5–5kg) and drop back to 3 sets of 8. Week 4: repeat the rep climb at the new weight. That cycle — climb reps, add weight, repeat — is the entire system. It sounds almost too simple, and that is exactly why it works: it removes the guesswork about what to change each session.',
        ],
      },
      {
        heading: 'The mistake that undoes all of it',
        paragraphs: [
          "The most common way people sabotage progressive overload is changing their entire workout too often — a new program every two weeks because the current one feels boring. Adaptation needs a stable stimulus to adapt to. Chasing novelty instead of tracking numbers against the same few lifts is the single biggest reason 'working out consistently' and 'getting stronger' can be two completely different outcomes for the same person.",
        ],
      },
    ],
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
    body: [
      {
        heading: 'BMR is the floor, not the target',
        paragraphs: [
          "Basal metabolic rate is what your body burns doing absolutely nothing — organ function, circulation, keeping your temperature stable — over 24 hours if you stayed in bed the whole time. It's usually estimated with the Mifflin-St Jeor equation from your height, weight, age and sex, and for most adults it lands somewhere between 1,300 and 1,800 calories.",
          "The mistake is treating BMR as a calorie target. It isn't one — it's the baseline everything else gets added to. Eating close to your BMR for an extended period, thinking it's a smart deficit, is usually eating well below what your body actually needs once movement is accounted for, which is why it backfires: fatigue, poor training performance, and a metabolism that eventually adapts downward to match.",
        ],
      },
      {
        heading: 'TDEE is the real number',
        paragraphs: [
          'Total daily energy expenditure takes BMR and adds everything else you burn: structured exercise, walking, fidgeting, digestion. This is the number that actually determines whether you gain, maintain or lose weight, because it reflects what you burn in a real day, not a day spent motionless.',
          "TDEE is usually estimated by multiplying BMR by an activity multiplier — roughly 1.2 for a mostly sedentary desk job, up to 1.55 or higher for someone training hard five to six times a week. It's an estimate, not a lab measurement, which is why it's a starting point to adjust from based on what actually happens to your weight over two to three weeks, not a number to trust blindly forever.",
        ],
      },
      {
        heading: 'Setting a deficit or surplus that sticks',
        paragraphs: [
          "A pound of fat is roughly 3,500 calories, which is where the common '500 calorie deficit for 1lb/week loss' guidance comes from. It's a reasonable starting point, but a deficit that large isn't necessary or even ideal for everyone — a smaller, more sustainable deficit (250-400 calories under TDEE) is often the difference between someone who sticks with it for three months and someone who burns out in three weeks.",
          "The same logic applies in reverse for a surplus aimed at muscle gain: a small one (200-300 calories over TDEE) supports growth without adding fat faster than the body can actually build muscle. Bigger is not better in either direction — it's just a faster way to either feel miserable or gain more fat than intended.",
        ],
      },
      {
        heading: 'Why crash diets backfire, specifically',
        paragraphs: [
          "Cutting calories drastically below TDEE does cause fast initial weight loss, but a meaningful chunk of it is water and, if protein intake isn't high enough, muscle — not fat. Losing muscle lowers your BMR, which lowers your TDEE, which means the same 'diet' calorie count that worked in week one stops working by week six, without you having done anything differently. This is the mechanism behind the frustrating plateau most crash dieters hit, and it's a physiological outcome, not a willpower failure.",
        ],
      },
      {
        heading: 'Where to actually start',
        paragraphs: [
          'Calculate BMR and TDEE once with real numbers, set a modest deficit or surplus based on your goal, and hold it for two to three weeks before adjusting. Weight fluctuates daily from water and food volume alone, so judge the trend over weeks, not the number on any single morning.',
        ],
      },
    ],
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
    body: [
      {
        heading: 'Most muscle-gain advice assumes you eat meat',
        paragraphs: [
          "A lot of fitness content defaults to chicken breast and whey as the entire protein strategy, which is a problem for the roughly 500 million vegetarians in India who are following that same generic advice and wondering why it doesn't quite fit. The target itself doesn't change with diet — muscle doesn't care where the amino acids came from — but the food list absolutely does.",
        ],
      },
      {
        heading: 'The number that actually matters: protein, not the source',
        paragraphs: [
          "For muscle gain specifically, the range worth aiming for is roughly 1.6-2.2g of protein per kg of body weight per day (higher end if you're in a calorie surplus and training hard). For a 70kg person, that's 112-154g daily — a number that sounds intimidating until you look at what Indian vegetarian staples actually provide.",
          'Paneer gives about 18g of protein per 100g. Dry soya chunks are the most concentrated vegetarian source available, at roughly 52g per 100g. Dal, rajma and chana provide 7-9g per 100g cooked. Curd, milk and peanuts round out the rest. None of these are exotic or expensive — the ingredients were already there, they just need to be counted with a target in mind instead of eaten on habit.',
        ],
      },
      {
        heading: 'A sample day built entirely from Indian staples',
        paragraphs: [
          'Breakfast: a glass of milk with a handful of peanuts or almonds. Lunch: a bowl of dal, a portion of paneer sabzi, roti and rice. Mid-afternoon: a cup of curd or a soya-chunk snack. Dinner: rajma or chana with roti. That combination alone lands around 70-85g of protein before counting the smaller amounts already present in the grains and vegetables — enough to cover most training-day targets for a moderately active person without any protein powder.',
        ],
      },
      {
        heading: 'The meal-timing myth worth dropping',
        paragraphs: [
          "The idea of a narrow 'anabolic window' right after training — where protein has to be consumed within 30-60 minutes or the workout is wasted — has been walked back significantly by more recent research. Total protein intake across the day, spread reasonably evenly across meals, matters far more than hitting a tight post-workout deadline. That's good news for anyone on a typical Indian meal schedule that doesn't always line up neatly with gym timing.",
        ],
      },
    ],
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
    body: [
      {
        heading: 'What eight hours of sitting actually does',
        paragraphs: [
          "Sitting doesn't just feel stiff afterward — it produces a specific, predictable pattern. Hip flexors shorten from staying in a flexed position all day. Glutes, which barely fire while seated, get weaker from disuse. The upper back rounds forward toward the screen, and the muscles between the shoulder blades that should be holding posture upright get stretched out and underused. None of this is dramatic on any single day, but it compounds over months into the stiff hips and rounded shoulders that feel like 'just getting older' but are really just a desk job's cumulative signature.",
        ],
      },
      {
        heading: 'Five drills, in order',
        paragraphs: [
          "1. Kneeling hip flexor stretch — 30 seconds each side. Kneel on one knee, tuck the pelvis slightly, and lean forward until a stretch is felt at the front of the hip on the kneeling-leg side.",
          "2. Cat-cow — 10 slow reps. On hands and knees, alternate arching and rounding the spine, moving with the breath. This restores motion through the whole spine that sitting locks up.",
          '3. Glute bridges — 15 reps. Lying on your back, knees bent, feet flat, push through the heels to lift the hips. This re-activates the glutes that sitting switches off.',
          "4. Wall slides — 10 reps. Back against a wall, arms in a goalpost position, slide them overhead while keeping contact with the wall. This opens the shoulders and upper back against the rounding sitting causes.",
          '5. Thoracic rotation — 10 reps each side. On hands and knees, one hand behind the head, rotate the elbow up toward the ceiling then down under the body. This targets rotation through the upper back specifically, which sitting removes almost entirely.',
        ],
      },
      {
        heading: 'How often actually moves the needle',
        paragraphs: [
          "Five to ten minutes daily beats thirty minutes once a week, because the problem being fixed is a daily posture, not a one-time tightness. A short break every 60-90 minutes to stand and do two or three of these — even without the full sequence — does more for how the body feels by evening than a single long session ever will.",
        ],
      },
    ],
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
    body: [
      {
        heading: 'Two different tools, not rivals',
        paragraphs: [
          'HIIT alternates short bursts of near-maximal effort with brief recovery — think 30 seconds hard, 15 seconds easy, repeated for 15-20 minutes. Steady-state cardio holds one moderate, conversational pace for a longer, continuous stretch — a 30-45 minute jog or cycle. They feel completely different, burn calories through different mechanisms, and the honest answer to "which burns more fat" is that it depends what you\'re actually measuring.',
        ],
      },
      {
        heading: "The afterburn effect isn't a myth, but it's often overstated",
        paragraphs: [
          "HIIT's main advantage is EPOC — excess post-exercise oxygen consumption, sometimes called the afterburn effect. After an intense session, your body keeps burning calories at an elevated rate for a period afterward while it restores itself. It's real, but the size of that effect is often exaggerated online — realistic estimates put it at an extra 6-15% of the workout's own calorie burn, not the 'burns fat for 24 hours' framing that circulates in ads.",
          "Steady-state cardio burns more calories during the session itself, simply because it runs longer at a sustained effort. Over similar total time invested, the two approaches often land closer in total calorie burn than the marketing for either one suggests.",
        ],
      },
      {
        heading: 'What the research actually shows for fat loss specifically',
        paragraphs: [
          'Multiple comparison studies have found HIIT and steady-state cardio produce similar fat-loss outcomes when total energy expenditure is matched — the afterburn effect helps, but it does not make HIIT dramatically superior for fat loss on its own. Where HIIT does win clearly is time efficiency: a 20-minute HIIT session can produce comparable results to 40-45 minutes of steady-state, which matters most for people whose limiting factor is time, not motivation.',
        ],
      },
      {
        heading: 'Who should pick which',
        paragraphs: [
          "HIIT suits people short on time and already reasonably conditioned — it's demanding on joints and the nervous system, so 2-3 sessions a week with rest days between is plenty. Steady-state suits beginners building a base, anyone managing joint issues, and works well on days meant for active recovery rather than another hard effort. It's also easier to sustain longer term for people who dislike high-intensity discomfort.",
        ],
      },
      {
        heading: 'The best answer: use both',
        paragraphs: [
          'A simple split — 1-2 HIIT sessions and 1-2 steady-state sessions a week — gets the time efficiency of one and the joint-friendly sustainability of the other, without betting the whole fat-loss outcome on a single method having to be objectively "the best" one.',
        ],
      },
    ],
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
    body: [
      {
        heading: 'Sleep is where the actual adaptation happens',
        paragraphs: [
          "Training breaks muscle tissue down — it's the recovery afterward that rebuilds it stronger, and most of that rebuilding happens during sleep, not during the workout itself. Deep sleep is when growth hormone release peaks, when muscle protein synthesis is highest, and when the nervous system recovers from a hard session. Skipping sleep doesn't just make the next workout feel harder; it blunts the result of the workout that already happened.",
        ],
      },
      {
        heading: 'What actually happens when sleep is cut short',
        paragraphs: [
          "Chronic short sleep (routinely under 6-7 hours) measurably raises cortisol and lowers testosterone, a combination that works directly against muscle retention and fat loss. It also disrupts ghrelin and leptin — the hormones that signal hunger and fullness — which is a documented, physiological reason poor sleepers tend to eat more the next day, not simply a willpower issue.",
          "Performance takes a direct hit too: reaction time, coordination and perceived exertion all get worse on insufficient sleep, meaning the exact same workout feels harder and is more likely to end in a worse set or a missed rep than it would on a full night's rest.",
        ],
      },
      {
        heading: 'Why it beats another supplement',
        paragraphs: [
          "Almost every popular supplement claims a single-digit percentage improvement in some metric, under ideal conditions. Fixing chronically poor sleep affects hormone balance, hunger regulation, recovery speed and workout performance simultaneously — a bigger lever than nearly anything sold in a tub, and one that costs nothing.",
        ],
      },
      {
        heading: 'Habits that actually move the needle',
        paragraphs: [
          'Consistent sleep and wake times — even on weekends — matter more than most people expect, because it keeps the internal clock stable rather than resetting it every few days. Cutting caffeine after early afternoon avoids the six-hour half-life catching up at bedtime. Dimming screens or switching to night mode an hour before bed reduces the blue light that delays melatonin release. None of these are dramatic changes, but consistency with all three does more for sleep quality than any single "sleep hack" on its own.',
        ],
      },
    ],
  },
];
