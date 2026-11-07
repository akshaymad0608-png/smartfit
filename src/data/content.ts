import type { BlogPost, Faq, Program, Stat } from '@/types';

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
    plan: {
      "related": ["home-workout-no-equipment-beginners", "full-body-workout-3-days-beginners", "sleep-fitness-tool"],
      "overview": "This plan is built for people starting from zero, or restarting after a long break. Every session takes 20 to 30 minutes and needs only floor space. Three days are short full-body strength circuits and two days are brisk walks, so you practise the habit five times a week without overloading joints that are not used to training yet. The aim for these four weeks is consistency, not exhaustion: finish every session feeling you could have done a little more.",
      "whoFor": [
        "Complete beginners and people returning after months or years off",
        "Anyone who wants a routine that fits into a busy day",
        "People training at home with no equipment"
      ],
      "notFor": [
        "Experienced lifters looking to build maximum strength or size",
        "Anyone told by a doctor to avoid exercise until cleared"
      ],
      "equipment": [
        "A mat or carpet",
        "A sturdy table, bench or kitchen counter for incline push-ups",
        "Comfortable shoes for walking"
      ],
      "warmup": [
        "March on the spot for 1 minute",
        "10 arm circles forwards and 10 backwards",
        "10 bodyweight good mornings (hands on hips, hinge at the hips)",
        "8 slow squats to a comfortable depth"
      ],
      "phases": [
        {
          "name": "Weeks 1–2: Learn the movements",
          "goal": "Practise each exercise with good form and get used to training five days a week.",
          "days": [
            {
              "day": "Day 1",
              "focus": "Full body A",
              "exercises": [
                {
                  "name": "Bodyweight squat",
                  "sets": "2",
                  "reps": "10",
                  "rest": "45 sec",
                  "note": "Sit back as if onto a chair; stop where your form stays good."
                },
                {
                  "name": "Incline push-up (hands on a table)",
                  "sets": "2",
                  "reps": "8",
                  "rest": "45 sec"
                },
                {
                  "name": "Glute bridge",
                  "sets": "2",
                  "reps": "12",
                  "rest": "45 sec"
                },
                {
                  "name": "Bird dog",
                  "sets": "2",
                  "reps": "8 per side",
                  "rest": "30 sec"
                },
                {
                  "name": "Front plank",
                  "sets": "2",
                  "reps": "20 sec",
                  "rest": "30 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Brisk walk",
              "exercises": [
                {
                  "name": "Brisk walk",
                  "sets": "1",
                  "reps": "20 min",
                  "note": "You should be able to talk but not sing."
                },
                {
                  "name": "Calf and hip-flexor stretch",
                  "sets": "1",
                  "reps": "30 sec per side"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Full body B",
              "exercises": [
                {
                  "name": "Reverse lunge (hold a wall if needed)",
                  "sets": "2",
                  "reps": "8 per leg",
                  "rest": "45 sec"
                },
                {
                  "name": "Knee push-up or wall push-up",
                  "sets": "2",
                  "reps": "10",
                  "rest": "45 sec"
                },
                {
                  "name": "Superman hold",
                  "sets": "2",
                  "reps": "10",
                  "rest": "30 sec"
                },
                {
                  "name": "Dead bug",
                  "sets": "2",
                  "reps": "8 per side",
                  "rest": "30 sec"
                },
                {
                  "name": "Side plank on knees",
                  "sets": "2",
                  "reps": "15 sec per side",
                  "rest": "30 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Brisk walk",
              "exercises": [
                {
                  "name": "Brisk walk",
                  "sets": "1",
                  "reps": "25 min"
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Full body A",
              "exercises": [
                {
                  "name": "Repeat Day 1",
                  "sets": "2",
                  "reps": "Same reps",
                  "note": "Try to make each rep a little smoother than on Day 1."
                }
              ]
            },
            {
              "day": "Days 6–7",
              "focus": "Rest",
              "exercises": [
                {
                  "name": "Rest or an easy walk",
                  "sets": "—",
                  "reps": "As you like"
                }
              ]
            }
          ]
        },
        {
          "name": "Weeks 3–4: Build the base",
          "goal": "Add a third set and a little more walking now that the movements feel familiar.",
          "days": [
            {
              "day": "Day 1",
              "focus": "Full body A",
              "exercises": [
                {
                  "name": "Bodyweight squat",
                  "sets": "3",
                  "reps": "12",
                  "rest": "45 sec"
                },
                {
                  "name": "Incline push-up (lower surface if easy)",
                  "sets": "3",
                  "reps": "10",
                  "rest": "45 sec"
                },
                {
                  "name": "Single-leg glute bridge",
                  "sets": "3",
                  "reps": "8 per leg",
                  "rest": "45 sec"
                },
                {
                  "name": "Bird dog",
                  "sets": "3",
                  "reps": "10 per side",
                  "rest": "30 sec"
                },
                {
                  "name": "Front plank",
                  "sets": "3",
                  "reps": "30 sec",
                  "rest": "30 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Walk with pickups",
              "exercises": [
                {
                  "name": "Brisk walk with intervals",
                  "sets": "1",
                  "reps": "30 min",
                  "note": "Every few minutes walk fast for 1 minute, then 2 minutes at normal brisk pace."
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Full body B",
              "exercises": [
                {
                  "name": "Reverse lunge",
                  "sets": "3",
                  "reps": "10 per leg",
                  "rest": "45 sec"
                },
                {
                  "name": "Knee or full push-up",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "45 sec"
                },
                {
                  "name": "Superman hold",
                  "sets": "3",
                  "reps": "12",
                  "rest": "30 sec"
                },
                {
                  "name": "Dead bug",
                  "sets": "3",
                  "reps": "10 per side",
                  "rest": "30 sec"
                },
                {
                  "name": "Side plank",
                  "sets": "3",
                  "reps": "20 sec per side",
                  "rest": "30 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Brisk walk",
              "exercises": [
                {
                  "name": "Brisk walk",
                  "sets": "1",
                  "reps": "30 min"
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Full body A",
              "exercises": [
                {
                  "name": "Repeat Day 1 of this phase",
                  "sets": "3",
                  "reps": "Same reps"
                }
              ]
            },
            {
              "day": "Days 6–7",
              "focus": "Rest",
              "exercises": [
                {
                  "name": "Rest or an easy walk",
                  "sets": "—",
                  "reps": "As you like"
                }
              ]
            }
          ]
        }
      ],
      "progression": "Use one simple rule: when you can finish every set of an exercise at the top of the rep range with good form, make it slightly harder next session. Add two reps, hold a plank five seconds longer, or move to a harder version, for example from wall push-ups to knee push-ups to incline push-ups on a lower surface.",
      "tips": [
        "Train at the same time each day so it becomes automatic.",
        "Tick off each session on a calendar or in the FitSmart dashboard; seeing a streak helps.",
        "Mild muscle soreness for a day or two is normal in week one. Joint pain is not, so swap or skip that exercise.",
        "After week 4, move to Home Shred or Lean & Strong depending on your goal."
      ],
      "faqs": [
        {
          "question": "Can I do the 30-Day Kickstart if I am overweight or very unfit?",
          "answer": "Yes, it was written for that. Use the easiest version of each exercise, such as wall push-ups and partial squats, and walk at a pace that feels brisk to you. If you have a medical condition, check with a doctor first."
        },
        {
          "question": "Will I lose weight in 30 days?",
          "answer": "You may, but weight loss depends mostly on your food intake. This plan builds the exercise habit; pair it with a modest calorie deficit if fat loss is your goal. The TDEE calculator can help you set one."
        },
        {
          "question": "What should I do after the 30 days?",
          "answer": "If you want fat loss at home, move to Home Shred. If you can get to a gym and want to build strength, move to Lean & Strong."
        }
      ],
      "safety": "This is general fitness guidance, not medical advice. If you have a heart, joint, blood-pressure or other health condition, are pregnant, or have not exercised in a long time, check with a doctor before you start. Stop any exercise that causes sharp pain, dizziness or chest discomfort."
    },
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
    plan: {
      "related": ["calories-you-need", "progressive-overload-guide", "protein-in-indian-foods", "indian-diet-plan-for-weight-loss"],
      "overview": "Lean & Strong is an eight-week body-recomposition plan for people who already train a little and want to lose fat without losing muscle. It uses an upper/lower split four days a week, built around compound lifts with a double-progression rule so the work gets harder in small, trackable steps. Strength training protects muscle while you eat in a modest calorie deficit; walking on the other days adds activity without eating into recovery. Each week you check three numbers, and adjust food or steps based on them rather than guessing.",
      "whoFor": [
        "People with at least a few months of training who know the main lifts",
        "Anyone who wants to lose fat while keeping or building muscle",
        "Gym-goers with access to barbells, dumbbells and cables"
      ],
      "notFor": [
        "Complete beginners (start with the 30-Day Kickstart)",
        "People training only at home without weights"
      ],
      "equipment": [
        "Barbell, squat rack and bench",
        "Dumbbells",
        "Cable machine or lat pulldown",
        "Leg press and leg curl machine (or dumbbell alternatives)"
      ],
      "warmup": [
        "5 minutes on a bike or rower at an easy pace",
        "Dynamic stretches for the joints you are about to train",
        "2 to 3 lighter warm-up sets of the first lift, building up to your working weight"
      ],
      "phases": [
        {
          "name": "Weeks 1–4: Foundation block",
          "goal": "Establish working weights you can lift for every rep with good form and about 2 reps in reserve.",
          "days": [
            {
              "day": "Monday",
              "focus": "Upper A",
              "exercises": [
                {
                  "name": "Bench press",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2–3 min"
                },
                {
                  "name": "Barbell or cable row",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Standing overhead press",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Lat pulldown",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Dumbbell curl",
                  "sets": "2",
                  "reps": "12",
                  "rest": "60 sec"
                },
                {
                  "name": "Triceps pushdown",
                  "sets": "2",
                  "reps": "12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Tuesday",
              "focus": "Lower A",
              "exercises": [
                {
                  "name": "Back squat",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2–3 min"
                },
                {
                  "name": "Romanian deadlift",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Walking lunge",
                  "sets": "2",
                  "reps": "10 per leg",
                  "rest": "90 sec"
                },
                {
                  "name": "Lying or seated leg curl",
                  "sets": "2",
                  "reps": "12",
                  "rest": "60 sec"
                },
                {
                  "name": "Standing calf raise",
                  "sets": "3",
                  "reps": "12–15",
                  "rest": "60 sec"
                },
                {
                  "name": "Front plank",
                  "sets": "3",
                  "reps": "30–45 sec",
                  "rest": "45 sec"
                }
              ]
            },
            {
              "day": "Wednesday",
              "focus": "Walk",
              "exercises": [
                {
                  "name": "Brisk walk or easy cycle",
                  "sets": "1",
                  "reps": "30–40 min"
                }
              ]
            },
            {
              "day": "Thursday",
              "focus": "Upper B",
              "exercises": [
                {
                  "name": "Incline dumbbell press",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Pull-up or assisted pull-up",
                  "sets": "3",
                  "reps": "6–10",
                  "rest": "2 min"
                },
                {
                  "name": "Seated dumbbell shoulder press",
                  "sets": "3",
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Seated cable row",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Lateral raise",
                  "sets": "3",
                  "reps": "12–15",
                  "rest": "60 sec"
                },
                {
                  "name": "Face pull",
                  "sets": "2",
                  "reps": "15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Friday",
              "focus": "Lower B",
              "exercises": [
                {
                  "name": "Conventional or trap-bar deadlift",
                  "sets": "3",
                  "reps": "5",
                  "rest": "3 min"
                },
                {
                  "name": "Leg press",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "2 min"
                },
                {
                  "name": "Bulgarian split squat",
                  "sets": "2",
                  "reps": "8–10 per leg",
                  "rest": "90 sec"
                },
                {
                  "name": "Hip thrust",
                  "sets": "3",
                  "reps": "10",
                  "rest": "90 sec"
                },
                {
                  "name": "Hanging knee raise",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Weekend",
              "focus": "Active rest",
              "exercises": [
                {
                  "name": "Walk",
                  "sets": "1",
                  "reps": "30–60 min",
                  "note": "Aim for roughly 8,000–10,000 steps a day across the week."
                }
              ]
            }
          ]
        },
        {
          "name": "Weeks 5–8: Strength block",
          "goal": "Push the main lifts heavier while keeping the same structure, so you can see clear progress.",
          "days": [
            {
              "day": "Monday",
              "focus": "Upper A",
              "exercises": [
                {
                  "name": "Bench press",
                  "sets": "4",
                  "reps": "5–6",
                  "rest": "3 min"
                },
                {
                  "name": "Barbell row",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2 min"
                },
                {
                  "name": "Standing overhead press",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2 min"
                },
                {
                  "name": "Weighted or assisted pull-up",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2 min"
                },
                {
                  "name": "Dumbbell curl + triceps pushdown superset",
                  "sets": "2",
                  "reps": "12 each",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Tuesday",
              "focus": "Lower A",
              "exercises": [
                {
                  "name": "Back squat",
                  "sets": "4",
                  "reps": "5–6",
                  "rest": "3 min"
                },
                {
                  "name": "Romanian deadlift",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2 min"
                },
                {
                  "name": "Walking lunge",
                  "sets": "2",
                  "reps": "12 per leg",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg curl",
                  "sets": "2",
                  "reps": "10–12",
                  "rest": "60 sec"
                },
                {
                  "name": "Calf raise",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Wednesday",
              "focus": "Walk",
              "exercises": [
                {
                  "name": "Brisk walk or easy cycle",
                  "sets": "1",
                  "reps": "30–40 min"
                }
              ]
            },
            {
              "day": "Thursday",
              "focus": "Upper B",
              "exercises": [
                {
                  "name": "Incline dumbbell press",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2 min"
                },
                {
                  "name": "Chest-supported row",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "90 sec"
                },
                {
                  "name": "Seated dumbbell shoulder press",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "90 sec"
                },
                {
                  "name": "Lat pulldown",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Lateral raise",
                  "sets": "3",
                  "reps": "15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Friday",
              "focus": "Lower B",
              "exercises": [
                {
                  "name": "Deadlift",
                  "sets": "3",
                  "reps": "3–5",
                  "rest": "3 min"
                },
                {
                  "name": "Leg press",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Bulgarian split squat",
                  "sets": "3",
                  "reps": "8 per leg",
                  "rest": "90 sec"
                },
                {
                  "name": "Hip thrust",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "90 sec"
                },
                {
                  "name": "Ab wheel or plank",
                  "sets": "3",
                  "reps": "8–10 / 45 sec",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Weekend",
              "focus": "Active rest",
              "exercises": [
                {
                  "name": "Walk",
                  "sets": "1",
                  "reps": "30–60 min"
                }
              ]
            }
          ]
        }
      ],
      "progression": "Use double progression. Each exercise has a rep range, for example 6–8. Start with a weight you can lift for the bottom of the range on every set. Add reps session by session; once you reach the top of the range on all sets, increase the weight by the smallest jump available (2.5 kg on barbell lifts, 1–2 kg per dumbbell) and start again at the bottom. If your lifts stall for two weeks in a row while dieting, that is normal; hold the weight and focus on clean reps.",
      "tips": [
        "Nutrition: start around 300–500 kcal per day below your maintenance from the TDEE calculator, and eat roughly 1.6–2.2 g of protein per kg of body weight.",
        "Weekly check-in: average your morning weight over 3–4 days, measure your waist once a week, and note your best set on each main lift.",
        "If your average weight has not moved for two weeks, cut about 150–200 kcal a day or add 2,000 daily steps. If you are losing more than about 1% of body weight a week, eat a little more.",
        "Sleep 7–9 hours where you can; poor sleep makes dieting and recovery harder."
      ],
      "faqs": [
        {
          "question": "Can I lose fat and build muscle at the same time?",
          "answer": "Many people can, especially those newer to lifting or returning after a break. A modest deficit, high protein and progressive strength training give you the best chance. Experienced lifters usually see slower muscle gain while dieting."
        },
        {
          "question": "Do I need to do cardio on this program?",
          "answer": "Daily walking is the main extra activity because it burns calories without hurting recovery. You can add one or two short cardio sessions if you enjoy them, but food intake does most of the work for fat loss."
        },
        {
          "question": "What if I miss a session?",
          "answer": "Do the missed session next time you train and continue the order. Try to keep at least one rest or walk day between Lower A and Lower B."
        }
      ],
      "safety": "This is general fitness guidance, not medical advice. If you have a heart, joint, blood-pressure or other health condition, are pregnant, or have not exercised in a long time, check with a doctor before you start. Stop any exercise that causes sharp pain, dizziness or chest discomfort."
    },
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
    plan: {
      "related": ["progressive-overload-guide", "indian-diet-muscle-gain", "indian-veg-diet-plan-muscle-gain", "high-protein-indian-breakfast"],
      "overview": "Hypertrophy Builder is a twelve-week muscle-gain plan for experienced lifters. It runs five days a week as push, pull and legs followed by an upper and a lower day, so every muscle is trained about twice a week. The twelve weeks are split into three four-week blocks: three weeks of building effort and volume, then a deload week to recover before the next block. Volume is auto-regulated, which means you add sets only when your performance and recovery say you can handle them.",
      "whoFor": [
        "Lifters with at least a year of consistent training",
        "People whose main goal is muscle size",
        "Anyone with full gym access who can train five days a week"
      ],
      "notFor": [
        "Beginners (start with the 30-Day Kickstart or Lean & Strong)",
        "People who can only train two or three days a week"
      ],
      "equipment": [
        "Barbell, squat rack and bench",
        "Dumbbells",
        "Cable station",
        "Leg press, hack squat or similar machines",
        "Pull-up bar"
      ],
      "warmup": [
        "5 minutes easy cardio",
        "Ramp-up sets on the first exercise: about 50%, 70% and 85% of the working weight",
        "Light band work for shoulders before push and upper days"
      ],
      "phases": [
        {
          "name": "Weekly split (all blocks)",
          "goal": "Train each muscle group about twice a week with 2–3 working sets per exercise to start.",
          "days": [
            {
              "day": "Day 1",
              "focus": "Push",
              "exercises": [
                {
                  "name": "Barbell bench press",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2–3 min"
                },
                {
                  "name": "Incline dumbbell press",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Seated dumbbell shoulder press",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Cable fly",
                  "sets": "2",
                  "reps": "12–15",
                  "rest": "90 sec"
                },
                {
                  "name": "Lateral raise",
                  "sets": "3",
                  "reps": "12–20",
                  "rest": "60 sec"
                },
                {
                  "name": "Overhead cable triceps extension",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Pull",
              "exercises": [
                {
                  "name": "Pull-up or lat pulldown",
                  "sets": "3",
                  "reps": "6–10",
                  "rest": "2 min"
                },
                {
                  "name": "Barbell row",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Chest-supported dumbbell row",
                  "sets": "2",
                  "reps": "10–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Rear-delt fly",
                  "sets": "3",
                  "reps": "15",
                  "rest": "60 sec"
                },
                {
                  "name": "Barbell curl",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "60 sec"
                },
                {
                  "name": "Hammer curl",
                  "sets": "2",
                  "reps": "12",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Legs",
              "exercises": [
                {
                  "name": "Back squat",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "3 min"
                },
                {
                  "name": "Romanian deadlift",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Leg press",
                  "sets": "3",
                  "reps": "10–15",
                  "rest": "2 min"
                },
                {
                  "name": "Lying leg curl",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Leg extension",
                  "sets": "2",
                  "reps": "12–15",
                  "rest": "60 sec"
                },
                {
                  "name": "Standing calf raise",
                  "sets": "4",
                  "reps": "10–15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Rest",
              "exercises": [
                {
                  "name": "Rest or light walk",
                  "sets": "—",
                  "reps": "—"
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Upper",
              "exercises": [
                {
                  "name": "Standing overhead press",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2–3 min"
                },
                {
                  "name": "Weighted pull-up or pulldown",
                  "sets": "3",
                  "reps": "6–8",
                  "rest": "2 min"
                },
                {
                  "name": "Flat dumbbell press",
                  "sets": "3",
                  "reps": "8–12",
                  "rest": "2 min"
                },
                {
                  "name": "Seated cable row",
                  "sets": "3",
                  "reps": "10–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Lateral raise",
                  "sets": "2",
                  "reps": "15–20",
                  "rest": "60 sec"
                },
                {
                  "name": "Curl + triceps pushdown superset",
                  "sets": "2",
                  "reps": "12 each",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 6",
              "focus": "Lower",
              "exercises": [
                {
                  "name": "Trap-bar or conventional deadlift",
                  "sets": "3",
                  "reps": "5",
                  "rest": "3 min"
                },
                {
                  "name": "Hack squat or front squat",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "2 min"
                },
                {
                  "name": "Hip thrust",
                  "sets": "3",
                  "reps": "8–12",
                  "rest": "90 sec"
                },
                {
                  "name": "Walking lunge",
                  "sets": "2",
                  "reps": "12 per leg",
                  "rest": "90 sec"
                },
                {
                  "name": "Seated leg curl",
                  "sets": "3",
                  "reps": "12",
                  "rest": "60 sec"
                },
                {
                  "name": "Seated calf raise",
                  "sets": "3",
                  "reps": "15",
                  "rest": "60 sec"
                }
              ]
            },
            {
              "day": "Day 7",
              "focus": "Rest",
              "exercises": [
                {
                  "name": "Rest",
                  "sets": "—",
                  "reps": "—"
                }
              ]
            }
          ]
        },
        {
          "name": "Block structure: weeks 1–4, 5–8 and 9–12",
          "goal": "Build for three weeks, then deload in the fourth.",
          "days": [
            {
              "day": "Week 1 of each block",
              "focus": "Base",
              "exercises": [
                {
                  "name": "All exercises",
                  "sets": "2–3",
                  "reps": "Top of range possible",
                  "rest": "—",
                  "note": "Stop about 3 reps before failure (3 RIR)."
                }
              ]
            },
            {
              "day": "Week 2",
              "focus": "Build",
              "exercises": [
                {
                  "name": "All exercises",
                  "sets": "Same or +1 set",
                  "reps": "Add reps or weight",
                  "rest": "—",
                  "note": "Stop about 2 reps before failure."
                }
              ]
            },
            {
              "day": "Week 3",
              "focus": "Peak",
              "exercises": [
                {
                  "name": "All exercises",
                  "sets": "Same or +1 set",
                  "reps": "Add reps or weight",
                  "rest": "—",
                  "note": "1 rep in reserve; last set of isolation moves can go to failure."
                }
              ]
            },
            {
              "day": "Week 4",
              "focus": "Deload",
              "exercises": [
                {
                  "name": "All exercises",
                  "sets": "Half the sets",
                  "reps": "Same reps",
                  "rest": "—",
                  "note": "Use the same or about 10% lighter weights and stop well short of failure."
                }
              ]
            }
          ]
        }
      ],
      "progression": "Auto-regulate volume muscle by muscle. After each week, ask two questions for every muscle group: did my performance go up or hold, and had soreness cleared before I trained it again? If both are yes, add one set to one exercise for that muscle next week. If performance dropped or you are still sore, keep sets the same. Within each exercise, use double progression: reach the top of the rep range on all sets, then add a small amount of weight. Start each new block a little heavier than the last one began.",
      "tips": [
        "Eat in a small surplus of roughly 200–300 kcal a day above maintenance, with about 1.6–2.2 g of protein per kg of body weight.",
        "Aim for a gain of about 0.25–0.5% of body weight per week; faster than that is mostly fat.",
        "Log every set. Auto-regulation only works if you can see last week's numbers.",
        "Take the deload weeks even if you feel good; they let fatigue drop so the next block starts stronger."
      ],
      "faqs": [
        {
          "question": "Why does the program include deload weeks?",
          "answer": "Hard training builds up fatigue faster than fitness shows it. A lighter week every fourth week lets joints and the nervous system recover so you can keep progressing in the next block."
        },
        {
          "question": "What does reps in reserve mean?",
          "answer": "It is how many more reps you could have done with good form. Two reps in reserve means you stop when you could still do about two more."
        },
        {
          "question": "Can I swap exercises?",
          "answer": "Yes. Replace an exercise with one that trains the same muscle in a similar way, such as a machine press for a dumbbell press, and keep it for the whole block so you can track progress."
        }
      ],
      "safety": "This is general fitness guidance, not medical advice. If you have a heart, joint, blood-pressure or other health condition, are pregnant, or have not exercised in a long time, check with a doctor before you start. Stop any exercise that causes sharp pain, dizziness or chest discomfort."
    },
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
    plan: {
      "related": ["hiit-vs-steady-state", "indian-diet-plan-for-weight-loss", "home-workout-no-equipment-beginners", "mobility-desk-posture"],
      "overview": "Home Shred is a six-week, equipment-free plan for people who want to lose fat and get fitter at home. It mixes three interval circuits that raise your heart rate with two bodyweight strength sessions that keep muscle working. Intervals get a little harder every two weeks by changing the work-to-rest ratio. Every jumping move has a low-impact swap, so you can do the plan quietly in a flat or with sensitive knees. Remember that exercise supports fat loss, but your food intake decides most of it.",
      "whoFor": [
        "Beginners and early intermediates who train at home",
        "People short on time who want 25–35 minute sessions",
        "Anyone travelling or living in a hostel, dorm or hotel"
      ],
      "notFor": [
        "People with joint injuries who have not been cleared for interval training",
        "Lifters chasing maximum strength or muscle size"
      ],
      "equipment": [
        "A mat or carpet",
        "A sturdy chair or step",
        "A timer app or phone stopwatch"
      ],
      "warmup": [
        "2 minutes marching or light jogging on the spot",
        "10 arm swings and 10 hip circles each way",
        "10 bodyweight squats and 5 inchworms"
      ],
      "phases": [
        {
          "name": "Weekly plan",
          "goal": "Three interval days and two strength days, with rest in between.",
          "days": [
            {
              "day": "Day 1",
              "focus": "Interval circuit A",
              "exercises": [
                {
                  "name": "Jumping jacks (low impact: step jacks)",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Bodyweight squat",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Incline push-up",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Mountain climber (low impact: slow, alternating)",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Glute bridge",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase",
                  "note": "Rest 90 seconds between rounds."
                }
              ]
            },
            {
              "day": "Day 2",
              "focus": "Strength circuit",
              "exercises": [
                {
                  "name": "Split squat",
                  "sets": "3",
                  "reps": "10–12 per leg",
                  "rest": "60 sec"
                },
                {
                  "name": "Push-up (knee or full)",
                  "sets": "3",
                  "reps": "8–12",
                  "rest": "60 sec"
                },
                {
                  "name": "Chair-supported reverse lunge",
                  "sets": "3",
                  "reps": "10 per leg",
                  "rest": "60 sec"
                },
                {
                  "name": "Reverse snow angel (lying face down)",
                  "sets": "3",
                  "reps": "12",
                  "rest": "45 sec"
                },
                {
                  "name": "Side plank",
                  "sets": "3",
                  "reps": "20–30 sec per side",
                  "rest": "45 sec"
                }
              ]
            },
            {
              "day": "Day 3",
              "focus": "Low-impact cardio",
              "exercises": [
                {
                  "name": "Brisk walk, step-ups or cycling",
                  "sets": "1",
                  "reps": "25–35 min",
                  "note": "Steady pace you could hold a conversation at."
                }
              ]
            },
            {
              "day": "Day 4",
              "focus": "Interval circuit B",
              "exercises": [
                {
                  "name": "High knees (low impact: fast march)",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Reverse lunge",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Plank shoulder taps",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Skater step (side to side)",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase"
                },
                {
                  "name": "Squat to calf raise",
                  "sets": "3–4 rounds",
                  "reps": "Work/rest by phase",
                  "note": "Rest 90 seconds between rounds."
                }
              ]
            },
            {
              "day": "Day 5",
              "focus": "Strength + core",
              "exercises": [
                {
                  "name": "Step-up onto a chair or stair",
                  "sets": "3",
                  "reps": "10 per leg",
                  "rest": "60 sec"
                },
                {
                  "name": "Pike push-up or incline push-up",
                  "sets": "3",
                  "reps": "8–10",
                  "rest": "60 sec"
                },
                {
                  "name": "Single-leg glute bridge",
                  "sets": "3",
                  "reps": "10 per leg",
                  "rest": "45 sec"
                },
                {
                  "name": "Dead bug",
                  "sets": "3",
                  "reps": "10 per side",
                  "rest": "45 sec"
                },
                {
                  "name": "Hollow hold (knees bent if needed)",
                  "sets": "3",
                  "reps": "20–30 sec",
                  "rest": "45 sec"
                }
              ]
            },
            {
              "day": "Days 6–7",
              "focus": "Rest",
              "exercises": [
                {
                  "name": "Rest or an easy walk",
                  "sets": "—",
                  "reps": "—"
                }
              ]
            }
          ]
        },
        {
          "name": "Interval progression",
          "goal": "Make the interval days harder every two weeks.",
          "days": [
            {
              "day": "Weeks 1–2",
              "focus": "30 sec work / 30 sec rest",
              "exercises": [
                {
                  "name": "Interval circuits A and B",
                  "sets": "3 rounds",
                  "reps": "30 / 30"
                }
              ]
            },
            {
              "day": "Weeks 3–4",
              "focus": "40 sec work / 20 sec rest",
              "exercises": [
                {
                  "name": "Interval circuits A and B",
                  "sets": "3 rounds",
                  "reps": "40 / 20"
                }
              ]
            },
            {
              "day": "Weeks 5–6",
              "focus": "45 sec work / 15 sec rest",
              "exercises": [
                {
                  "name": "Interval circuits A and B",
                  "sets": "4 rounds",
                  "reps": "45 / 15"
                }
              ]
            }
          ]
        }
      ],
      "progression": "Interval days progress by the schedule above. On strength days, once you reach the top of the rep range on every set, move to a harder version: knee to full push-ups, split squats to rear-foot-elevated split squats, or slow the lowering phase to three seconds. If a week feels too hard, repeat it rather than moving on.",
      "tips": [
        "Fat loss comes mainly from a modest calorie deficit; use the TDEE calculator to find a starting target and keep protein high.",
        "Walk on rest days if you can. Daily steps add up to more calories than one extra workout.",
        "Use the low-impact options any time. A lower heart rate with good form beats sloppy jumping.",
        "Track your waist measurement and how your clothes fit, not just body weight."
      ],
      "faqs": [
        {
          "question": "Can I really lose fat with home workouts and no equipment?",
          "answer": "Yes, if you combine them with a calorie deficit. The workouts burn calories and help keep muscle, while your diet creates most of the deficit."
        },
        {
          "question": "Is Home Shred suitable for apartments?",
          "answer": "Yes. Use the low-impact option for every jumping exercise and the workouts stay quiet enough for upper-floor flats."
        },
        {
          "question": "What if I cannot finish all the rounds?",
          "answer": "Do as many rounds as you can with good form and add a round when you are ready. Repeating a week is fine."
        }
      ],
      "safety": "This is general fitness guidance, not medical advice. If you have a heart, joint, blood-pressure or other health condition, are pregnant, or have not exercised in a long time, check with a doctor before you start. Stop any exercise that causes sharp pain, dizziness or chest discomfort."
    },
  },
];

export const programsFaqs: Faq[] = [
  {
    question: "Which program should a complete beginner start with?",
    answer:
      "Start with the 30-Day Kickstart Challenge: four weeks, five short 20-30 minute sessions a week, no equipment. It is designed to build the habit first. Once you finish it, Lean & Strong or Home Shred are natural next steps depending on whether you have gym access.",
  },
  {
    question: "Can I follow these workout programs at home without equipment?",
    answer:
      "Yes. The 30-Day Kickstart Challenge and Home Shred need no equipment at all. Home Shred is a six-week HIIT and conditioning plan with follow-along timers and low-impact options. Lean & Strong and Hypertrophy Builder are strength programs that work best with weights.",
  },
  {
    question: "Which program is best for fat loss and which for muscle gain?",
    answer:
      "For fat loss, Home Shred (6 weeks, no equipment) or Lean & Strong (8 weeks, strength training plus macro guidance) fit best. For muscle gain, Hypertrophy Builder is a 12-week push-pull-legs split with built-in deload weeks. Results still depend mainly on your food and sleep.",
  },
  {
    question: "How many days a week do the programs take?",
    answer:
      "30-Day Kickstart, Home Shred and Hypertrophy Builder are five days a week; Lean & Strong is four. Rest days are part of every plan, so you recover between harder sessions.",
  },
  {
    question: "Are the programs free?",
    answer:
      "Yes. Every program on FitSmart is free and needs no sign-up. Creating an account only adds a dashboard that saves your progress.",
  },
];

export const calculatorsFaqs: Faq[] = [
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is the calories your body burns at complete rest. TDEE is BMR multiplied by an activity factor, so it estimates what you burn in a normal day including training. TDEE is the number to build a calorie target on.",
  },
  {
    question: "Which formula do the FitSmart calculators use?",
    answer:
      "BMR uses the Mifflin-St Jeor equation, body fat uses the U.S. Navy circumference method, and ideal weight uses the Devine formula. They give reliable estimates, not a medical assessment.",
  },
  {
    question: "How do I use these numbers to lose fat or gain muscle?",
    answer:
      "Calculate your TDEE first. For fat loss, eat a modest amount below it; for muscle gain, a modest amount above it. Then use the macro calculator to split that calorie target into protein, carbs and fats.",
  },
  {
    question: "Is BMI accurate for people who lift weights?",
    answer:
      "Not always. BMI uses only height and weight, so a muscular person can read as overweight. Body fat percentage is a more useful measure for active people.",
  },
  {
    question: "Do the calculators store or upload my data?",
    answer:
      "No. All calculations run in your browser and nothing is uploaded.",
  },
];

export const faqs: Faq[] = [
  {
    question: 'Is FitSmart free to use?',
    answer:
      'Yes. All workouts, nutrition guides and calculators are free to explore. There are no paid tiers and no sign-up is needed. Creating an account only adds a dashboard that saves your progress.',
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
    author: 'Akshay Mahajan',
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
    author: 'Akshay Mahajan',
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
    author: 'Akshay Mahajan',
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
    author: 'Akshay Mahajan',
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
    author: 'Akshay Mahajan',
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
    author: 'Akshay Mahajan',
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
  {
    id: 'b7',
    title: "Indian Veg Diet Plan for Muscle Gain (No Eggs, No Meat)",
    slug: "indian-veg-diet-plan-muscle-gain",
    excerpt:
      "A fully vegetarian day of eating that reaches 100g+ of protein from dal, paneer, soya, curd and sattu, with portions and a simple weekly rhythm.",
    date: "2026-10-17",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["Indian diet", "vegetarian", "muscle gain"],
    image: "/images/blog/indian-diet-muscle-gain.jpg",
    body: [
      {
        heading: "Start with a protein number, not a menu",
        paragraphs: [
          "Before choosing foods, fix a daily protein target. For muscle gain, 1.6 to 2.2 g per kg of body weight is the range most often used in sports nutrition research. For a 65 kg person that is roughly 105 to 140 g a day. Write the number down. Every meal below is just a way of reaching it.",
          "If that looks like a lot, remember that the grains and vegetables you already eat contribute 15 to 25 g without you trying. The plan only has to cover the rest."
        ],
      },
      {
        heading: "Protein in the foods you already buy",
        paragraphs: [
          "These are approximate values per 100 g, and they vary by brand and by whether the food is raw or cooked. Paneer is around 18 g. Dry soya chunks are the most concentrated vegetarian source at roughly 50 g, before soaking. Cooked dals, rajma and chana give about 7 to 9 g. Roasted chana, peanuts and sattu flour sit between about 20 and 25 g in dry form. Curd gives 3 to 4 g, and hung curd or Greek-style curd roughly double that. A glass of milk has about 6 to 8 g. Wheat roti gives about 3 g each.",
          "The point of knowing these numbers is that soya chunks, sattu and peanuts are cheap per gram of protein, while paneer is more expensive but easy to eat in large amounts."
        ],
      },
      {
        heading: "A sample day (about 105 to 120 g protein)",
        paragraphs: [
          "Breakfast: two besan or moong dal chillas with a bowl of curd, and a glass of milk. That is roughly 28 to 32 g. Mid-morning: a handful of roasted chana or peanuts, about 8 to 10 g.",
          "Lunch: a bowl of dal, 100 g of paneer sabzi, two rotis, rice, and salad, about 35 g. Evening: a glass of sattu drink (two tablespoons of sattu in water with lemon and salt) or a bowl of sprouts, about 10 to 12 g. Dinner: rajma or chana with two rotis and a bowl of curd, about 22 to 25 g.",
          "Add it up and you are near 105 to 120 g with no supplements. If you train hard and need more, add a soya chunk curry or a third roti at dinner before reaching for powder."
        ],
      },
      {
        heading: "Rotate through the week",
        paragraphs: [
          "Eating the same dal and paneer every day gets tiring and narrows what you take in. Rotate the protein anchor: paneer on two days, soya chunks on two days, rajma or chole on two days, and a lighter day with dal and curd. Use besan, moong and oats for breakfast on different days.",
          "Combining cereals with pulses, as dal-chawal and rajma-roti already do, also gives a more complete mix of amino acids across the day."
        ],
      },
      {
        heading: "Calories, timing and what to track",
        paragraphs: [
          "To gain muscle you usually need to eat slightly above maintenance, around 200 to 300 kcal a day. Use the TDEE calculator on this site to find your maintenance number and add a small surplus. Weigh yourself weekly and aim for 0.25 to 0.5 kg of gain a month if you are an experienced lifter, a little faster if you are new.",
          "Spread protein over three or four meals, since that is easier to eat and digest than one large meal. If your weight is not moving after three weeks, add a small amount of food before changing anything else."
        ],
      },
    ],
  },
  {
    id: 'b8',
    title: "Protein in Indian Foods: A Simple Chart per 100g and per Serving",
    slug: "protein-in-indian-foods",
    excerpt:
      "How much protein is in dal, paneer, rajma, eggs, chicken, curd, soya and more, in per-100g and per-serving terms, so you can count it without an app.",
    date: "2026-10-17",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["protein", "Indian diet", "nutrition"],
    image: "/images/blog/calories-you-need.jpg",
    body: [
      {
        heading: "Raw versus cooked is the number one source of confusion",
        paragraphs: [
          "Dal, rajma, chana and soya chunks absorb water when cooked, so 100 g of dry dal has far more protein than 100 g of cooked dal. Dry toor, moong or masoor dal is about 22 to 25 g per 100 g. Once cooked into a thin dal, 100 g of the finished dish is closer to 5 to 8 g.",
          "When you read a chart, check whether it is raw or cooked. The values below are approximate and rounded, taken from standard food composition tables, and they will vary by brand and recipe."
        ],
      },
      {
        heading: "Vegetarian staples (approximate, per 100 g)",
        paragraphs: [
          "Paneer: about 18 g. Dry soya chunks: about 50 g. Dry dal such as moong, masoor or toor: about 22 to 25 g. Cooked rajma or chole: about 8 to 9 g. Besan (gram flour): about 22 g. Sattu flour: about 20 g. Peanuts: about 25 g. Tofu: about 8 g. Oats: about 12 to 13 g.",
          "Dairy: curd is about 3 to 4 g per 100 g, hung curd is about 8 to 10 g, and milk is about 3.4 g per 100 ml."
        ],
      },
      {
        heading: "Eggs, chicken and fish (approximate)",
        paragraphs: [
          "One whole egg has roughly 6 g of protein. Cooked chicken breast is around 30 g per 100 g, and chicken curry made with pieces on the bone is lower per spoon because of the bones and gravy. Most cooked fish such as rohu or pomfret gives about 18 to 22 g per 100 g.",
          "These are the densest sources by weight, but a vegetarian diet can reach the same daily total with larger portions."
        ],
      },
      {
        heading: "Per serving, which is what you actually eat",
        paragraphs: [
          "A katori of cooked dal is around 7 to 9 g. A 100 g portion of paneer sabzi is 15 to 18 g. Two rotis give about 6 g. A glass of milk gives 6 to 8 g and a bowl of curd about 5 g. Two chillas made from besan can give 12 to 15 g. A scoop of whey protein powder usually lists 20 to 25 g on the label.",
          "Use these as building blocks. A normal Indian thali with dal, paneer, roti and curd already provides 30 to 40 g of protein."
        ],
      },
      {
        heading: "How to estimate your day without an app",
        paragraphs: [
          "Pick one protein anchor per meal, such as paneer, eggs, dal, soya or curd, and count only that plus a rough 15 g for everything else in the day. Add the anchors and compare with your target.",
          "Use the daily protein target in our TDEE and macro calculators to see your own number, then check your estimate for a week. After that you will rarely need to look anything up."
        ],
      },
    ],
  },
  {
    id: 'b9',
    title: "10 High-Protein Indian Breakfast Ideas (Veg and Egg)",
    slug: "high-protein-indian-breakfast",
    excerpt:
      "Ten quick Indian breakfasts with 15 to 30 g of protein each: chillas, paneer bhurji, sattu, sprouts, egg bhurji and more, with rough protein counts.",
    date: "2026-10-17",
    readMinutes: 5,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["breakfast", "protein", "Indian diet"],
    image: "/images/blog/sleep-fitness-tool.jpg",
    body: [
      {
        heading: "Why breakfast protein is worth fixing",
        paragraphs: [
          "A breakfast with 20 g or more of protein keeps you full longer and makes the rest of the day's protein target far easier to hit. If you eat only 8 g at breakfast, you have to find an extra 12 g later.",
          "None of the ideas below needs special equipment. Protein counts are approximate and depend on portion size."
        ],
      },
      {
        heading: "Vegetarian ideas",
        paragraphs: [
          "1. Moong dal chilla (two) with curd: about 18 to 20 g. 2. Besan chilla (two) with mint chutney: about 12 to 14 g. 3. Paneer bhurji (100 g) with two rotis: about 24 g. 4. Sprouts salad or sprouts chaat, one large bowl with chopped vegetables: about 12 to 15 g. 5. Sattu drink, two tablespoons in water with lemon, plus a banana: about 8 to 10 g.",
          "6. Poha with a handful of peanuts and a bowl of curd on the side: about 14 g. 7. Overnight oats made with milk, a spoon of peanut butter and chopped fruit: about 15 to 18 g."
        ],
      },
      {
        heading: "Egg ideas",
        paragraphs: [
          "8. Egg bhurji made with three eggs and onion, tomato and chilli, with two rotis: about 26 to 28 g. 9. Boiled eggs (two or three) with toast and fruit: about 15 to 20 g. 10. A masala omelette with two eggs and a glass of milk: about 20 g.",
          "Eggs are the cheapest complete protein for most people who eat them, and a three-egg bhurji is hard to beat for effort and cost."
        ],
      },
      {
        heading: "Easy ways to add protein to what you already eat",
        paragraphs: [
          "Serve curd or hung curd with any paratha. Stir a scoop of whey or a spoon of sattu into oats. Add grated paneer or tofu to upma or poha. Eat a small handful of roasted chana or peanuts on the side.",
          "Small additions of 5 to 10 g, repeated at each meal, close most of the gap between a typical Indian diet and a muscle-building target."
        ],
      },
      {
        heading: "Quick prep for busy mornings",
        paragraphs: [
          "Soak moong dal or sprouts the night before, mix chilla batter in advance, and boil a few eggs for the week. Keep roasted chana in a jar for days when you have no time.",
          "If you only change one thing, make breakfast the meal you are sure to hit 20 g of protein in."
        ],
      },
    ],
  },
  {
    id: 'b10',
    title: "Indian Diet Plan for Weight Loss: A Realistic Calorie-Deficit Approach",
    slug: "indian-diet-plan-for-weight-loss",
    excerpt:
      "How to lose fat on an ordinary Indian diet: set a small calorie deficit, keep protein high, fix portions of rice and roti, and track progress without crash dieting.",
    date: "2026-10-17",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["weight loss", "Indian diet", "calories"],
    image: "/images/blog/calories-you-need.jpg",
    body: [
      {
        heading: "The deficit is small, not dramatic",
        paragraphs: [
          "A deficit of roughly 300 to 500 kcal below maintenance is enough for most people and usually produces 0.25 to 0.5 kg of fat loss a week. Crash diets that cut 1,000 kcal or more tend to cost muscle, wreck energy and rebound.",
          "Start by finding your maintenance calories with the TDEE calculator on this site, then subtract a modest amount. Treat that number as a starting point and adjust after two to three weeks based on your actual weight trend."
        ],
      },
      {
        heading: "Keep protein high",
        paragraphs: [
          "When you eat less, protein is what helps you keep muscle instead of losing it. A common target while losing fat is about 1.6 to 2 g per kg of body weight a day. For many people that means adding one protein anchor to each meal: eggs, paneer, dal, curd, soya or chicken.",
          "Protein also keeps you fuller on fewer calories, which is the main reason it makes dieting easier."
        ],
      },
      {
        heading: "Adjust the plate instead of rebuilding it",
        paragraphs: [
          "Keep familiar foods but change proportions. Fill half the plate with vegetables and salad, a quarter with dal, paneer, egg or chicken, and a quarter with roti or rice. Replace one roti with a second serving of sabzi, or swap some rice for dal.",
          "Cooking oil is the hidden calorie source in Indian food, around 120 kcal per tablespoon. Measure it with a spoon for a week and you will probably find a quick saving. Fried snacks, sweets and sugary chai are the next easy cuts."
        ],
      },
      {
        heading: "A simple day at about 1,600 kcal",
        paragraphs: [
          "Breakfast: moong chilla or egg bhurji with a bowl of curd. Lunch: one katori of rice or two rotis, dal, a large serving of sabzi and salad. Evening: roasted chana, fruit or a cup of unsweetened chai. Dinner: one or two rotis, a paneer or chicken dish and vegetables.",
          "This is only an example. Your own calorie number may be higher or lower depending on size, age and activity, so use your calculator result rather than copying a number."
        ],
      },
      {
        heading: "Measure progress properly",
        paragraphs: [
          "Weigh yourself at the same time a few mornings a week and look at the weekly average, not single days. Add a waist measurement every two weeks. If your average weight has not moved after three weeks, reduce intake by about 100 to 150 kcal or add 2,000 steps a day.",
          "Lifting weights two or three days a week makes the weight you lose more likely to be fat. If you feel dizzy, constantly tired or have a medical condition, speak to a doctor or dietitian first."
        ],
      },
    ],
  },
  {
    id: 'b11',
    title: "Home Workout for Beginners: 20 Minutes, No Equipment",
    slug: "home-workout-no-equipment-beginners",
    excerpt:
      "A simple 20-minute bodyweight routine you can do in a small room, with sets, reps, form cues and how to progress it over four weeks.",
    date: "2026-10-17",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Training",
    tags: ["home workout", "beginner", "bodyweight"],
    image: "/images/blog/hiit-vs-steady-state.jpg",
    body: [
      {
        heading: "How the routine works",
        paragraphs: [
          "Do the six moves below in order, as a circuit. Complete one round of all six, rest for a minute, then repeat for two or three rounds in total. Three days a week with a rest day between is plenty to begin with.",
          "If any move hurts a joint rather than working a muscle, stop and use an easier version."
        ],
      },
      {
        heading: "The six moves",
        paragraphs: [
          "1. Bodyweight squat, 10 to 15 reps: feet shoulder-width, sit back and down, knees tracking over the toes, chest up. 2. Incline or knee push-up, 6 to 12 reps: hands on a table or the floor with knees down, body in a straight line. 3. Glute bridge, 12 to 15 reps: lie on your back, feet flat, push hips up and squeeze at the top.",
          "4. Reverse lunge, 8 per leg: step back, lower the back knee toward the floor, push through the front heel. 5. Plank, 20 to 40 seconds: forearms on the floor, ribs down, do not let the hips sag. 6. Bird-dog, 8 per side: on hands and knees, extend the opposite arm and leg slowly."
        ],
      },
      {
        heading: "Warm-up and cool-down",
        paragraphs: [
          "Spend three minutes warming up before you start: march on the spot, make arm circles, do a few easy squats and hip circles. Afterwards, stretch the hips, calves and chest for a minute each.",
          "A short warm-up reduces the chance of stiffness and makes the first set feel better."
        ],
      },
      {
        heading: "How to progress over four weeks",
        paragraphs: [
          "Add reps first. When you can complete all rounds at the top of the rep range with good form, move to the next version of the exercise: full push-ups instead of knee push-ups, tempo squats with a three-second lowering phase, or a longer plank.",
          "A simple plan: week one is two rounds, week two is three rounds, week three adds reps, week four moves to harder variations. This is progressive overload without any equipment."
        ],
      },
      {
        heading: "Pair it with the basics",
        paragraphs: [
          "Training works best with enough sleep, protein in each meal and a daily walk. Use the TDEE and protein calculators on this site to set your targets.",
          "If you have a heart condition, high blood pressure, are pregnant or have an injury, check with a doctor before starting."
        ],
      },
    ],
  },
  {
    id: 'b12',
    title: "3-Day Full-Body Gym Workout Plan for Beginners",
    slug: "full-body-workout-3-days-beginners",
    excerpt:
      "A simple three-day full-body gym routine with exercises, sets, reps and rest times, plus how to add weight safely and when to change the plan.",
    date: "2026-10-17",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Training",
    tags: ["gym", "beginner", "strength"],
    image: "/images/blog/progressive-overload.jpg",
    body: [
      {
        heading: "Why full-body three days a week works for beginners",
        paragraphs: [
          "Beginners recover quickly and learn movements by repeating them often. Training each major muscle group three times a week gives you plenty of practice and stimulus, and the rest day in between lets you recover. A body-part split, where each muscle is trained once a week, is slower for most new lifters.",
          "Train Monday, Wednesday and Friday, or any three non-consecutive days."
        ],
      },
      {
        heading: "Workout A (Monday and, in week two, Wednesday)",
        paragraphs: [
          "Squat or leg press, 3 sets of 8 to 10. Bench press or dumbbell press, 3 sets of 8 to 10. Seated cable row or dumbbell row, 3 sets of 8 to 10. Overhead dumbbell press, 2 sets of 10. Plank, 2 sets of 30 seconds.",
          "Rest 90 to 120 seconds between the big exercises and about 60 seconds between the smaller ones."
        ],
      },
      {
        heading: "Workout B (Wednesday and Friday, alternating)",
        paragraphs: [
          "Romanian deadlift or hip hinge with dumbbells, 3 sets of 8 to 10. Lat pulldown or assisted pull-up, 3 sets of 8 to 10. Incline dumbbell press or push-up, 3 sets of 8 to 12. Goblet squat, 2 sets of 10 to 12. Biceps curl and triceps pushdown, 2 sets of 10 to 12 each.",
          "Alternate A and B across the week, so one week is A-B-A and the next is B-A-B."
        ],
      },
      {
        heading: "How to add weight",
        paragraphs: [
          "Choose a weight that you can lift for the target reps with two or three reps left in reserve. When you complete every set at the top of the rep range with good form, add the smallest weight increase available, for example 1 to 2.5 kg on the upper body and 2.5 to 5 kg on the lower body.",
          "If you cannot reach the lower end of the rep range, keep the same weight next time. This approach is called progressive overload, and it is the engine behind all strength gains."
        ],
      },
      {
        heading: "When to change the plan",
        paragraphs: [
          "Most beginners can run a plan like this for two to four months. When you stop adding weight for several weeks even though sleep and food are in order, move to an upper-lower split or a program with more volume.",
          "Learn the main lifts with light weights or from a qualified coach first. Eat enough protein, sleep 7 to 9 hours and see a doctor before starting if you have a medical condition."
        ],
      },
    ],
  },
];
