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
  { label: 'Health calculators', value: 9, suffix: '' },
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

/** Shown on /programs and baked into its static HTML (read by prerender.mjs). */
export const programsGuide: { heading: string; points: string[] }[] = [
  {
    heading: 'How to choose a program',
    points: [
      'Complete beginner or returning after a break: start with the 30-Day Kickstart Challenge. It is short, needs no equipment and builds the habit first.',
      'Want to lose fat without a gym: Home Shred uses bodyweight sessions only, five days a week.',
      'Want to lose fat and build muscle together: Lean & Strong pairs strength training with a calorie deficit.',
      'Already training and want size: Hypertrophy Builder is a structured muscle-gain block with built-in progression.',
    ],
  },
  {
    heading: 'How to get results from any program',
    points: [
      'Pick the one that fits the days you can really train, not the one that sounds hardest.',
      'Set your calories and protein with the calorie and protein calculators so food supports the training.',
      'Follow the plan for the full length before switching; most gains come from repeating a plan and adding reps or weight.',
      'Sleep seven to nine hours and see a doctor first if you have a medical condition or an injury.',
    ],
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
      "Yes. Every program on FitSmart is free and needs no sign-up. Creating an account only adds a dashboard with a tracker that saves your readings on your device.",
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
      'Yes. All workouts, nutrition guides and calculators are free to explore. There are no paid tiers and no sign-up is needed. Creating an account only adds a dashboard with a tracker that saves your readings on your device.',
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
      'Absolutely. Choose a goal-based program, follow the paired nutrition guidance and log your readings in the dashboard tracker. Consistency plus the right calorie and protein targets drives results.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Your inputs stay on your device by default via local storage. We never sell personal data, and any future account features will be fully opt-in with clear controls.',
  },
  {
    question: 'What is the AI Coach?',
    answer:
      'The AI Coach is a plan generator. Pick a mode, describe your goal in a few words and it builds a workout, meal day, weekly schedule or 8-week roadmap on your device from rule-based templates. It is not a live AI model and does not chat, so treat the result as a starting point and adjust it to you.',
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
  {
    id: "b19",
    title: "1500 Calorie Indian Diet Plan: A Full Day of Meals (Veg and Non-Veg)",
    slug: "1500-calorie-indian-diet-plan",
    excerpt:
      "A sample 1500-calorie Indian day with roti, dal, curd and paneer or chicken, rough calories and protein per meal, plus who it suits and who should eat more.",
    date: "2026-11-09",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["nutrition", "weight loss", "indian diet", "calories"],
    image: "/images/blog/calories-you-need.jpg",
    body: [
      {
        heading: "Is 1500 calories right for you?",
        paragraphs: [
          "A 1500-calorie plan is a starting point for some people, not a rule for everyone. Whether it creates a sensible deficit depends on how many calories you burn in a day. For many smaller or less active adults, 1500 kcal is roughly 15 to 20 percent below maintenance. For a tall, active or muscular person it can be a crash diet.",
          "Work out your own number first with the calorie calculator on FitSmart, which estimates your daily energy use and a fat-loss target. If your target is well above 1500, eat to your target instead. Very low calorie diets should only be followed under medical supervision."
        ],
      },
      {
        heading: "One full day: about 1500 calories",
        paragraphs: [
          "The numbers below are estimates. A roti, a bowl of dal or a teaspoon of oil varies from home to home, so treat the totals as a guide of plus or minus 10 percent.",
          "Breakfast, about 280 kcal and 17 g protein: two small moong dal chillas, 100 g curd and tea with a splash of milk and no sugar.",
          "Mid-morning, about 150 kcal: one guava or apple and ten almonds.",
          "Lunch, about 560 kcal and 20 g protein: two rotis without ghee, one bowl of dal, one bowl of vegetable sabzi cooked in a teaspoon of oil, a large salad and 100 g curd.",
          "Evening, about 150 kcal and 6 g protein: 30 g roasted chana and tea.",
          "Dinner, about 330 kcal and 16 g protein: 75 g paneer cooked with vegetables, one roti and a salad.",
          "The day comes to roughly 1450 to 1500 kcal and about 60 g of protein. If your protein target is higher, see the protein section below."
        ],
      },
      {
        heading: "Non-veg swaps",
        paragraphs: [
          "Swap the paneer at dinner for 100 g of chicken breast curry cooked in a teaspoon of oil, which adds about 25 to 30 g of protein for a similar calorie count, or for two eggs as bhurji, which adds about 12 g.",
          "Fish curry, egg curry and grilled chicken all fit as long as the oil stays small. Frying and heavy cream gravies are what push calories up quickly."
        ],
      },
      {
        heading: "How to keep protein high",
        paragraphs: [
          "On a deficit, protein protects muscle. A common target is 1.6 to 2.0 g per kg of bodyweight. On 1500 kcal that is often harder than it sounds, so build each meal around a protein source: dal or chilla at breakfast, curd with lunch, paneer, eggs, chicken or soya at dinner.",
          "If you are still short, add a bowl of sprouts, a glass of milk, roasted chana or soya chunks in place of a lower-protein snack. The protein calculator on FitSmart gives you a number to aim for."
        ],
      },
      {
        heading: "Portions that matter most",
        paragraphs: [
          "You do not need to drop roti or rice. The calories that sneak in are usually oil, ghee, sugar in tea, fried snacks and large rice portions. Measure oil with a teaspoon for a week and you will see where most of the extra calories were hiding.",
          "Fill half your plate with vegetables and salad, one quarter with protein and one quarter with roti or rice. This keeps meals filling without needing to count every gram."
        ],
      },
      {
        heading: "How to check if it is working",
        paragraphs: [
          "Weigh yourself at the same time each morning and look at the weekly average, not single days. A loss of about 0.25 to 0.75 kg a week is a realistic pace. If the trend is flat for two to three weeks, reduce portions slightly or add a daily walk before cutting more food.",
          "Stop and speak to a doctor if you feel dizzy, weak or constantly tired, or if you have a medical condition, are pregnant or breastfeeding. This article is general information, not personal medical advice."
        ],
      },
    ],
  },
  {
    id: "b20",
    title: "High-Protein Diet on a Budget for Hostel Students in India",
    slug: "high-protein-diet-hostel-budget-india",
    excerpt:
      "How to get enough protein on a hostel mess and a student budget: the cheapest protein foods in India, rough protein per 100 g, and a sample day.",
    date: "2026-11-09",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["nutrition", "indian diet", "muscle gain", "budget"],
    image: "/images/blog/indian-diet-muscle-gain.jpg",
    body: [
      {
        heading: "The hostel protein problem",
        paragraphs: [
          "Most hostel mess menus are built around rice, roti and a thin dal, so protein often lands well below what a student who trains actually needs. The fix is not expensive supplements. It is picking a few cheap, protein-dense foods and adding them to what the mess already serves.",
          "A useful target for someone who trains is about 1.6 g of protein per kg of bodyweight a day. For a 65 kg student that is roughly 105 g. Use the protein calculator to get your own number."
        ],
      },
      {
        heading: "The cheapest protein foods",
        paragraphs: [
          "Prices change by city and season, so compare protein per rupee in your own market. As a rule these foods give a lot of protein for the money, with approximate values per 100 g: soya chunks (dry) about 50 g, peanuts about 25 g, dry moong or masoor dal about 24 g, roasted chana about 19 to 22 g, sattu about 20 g.",
          "Eggs give about 6 g of protein each. Milk gives about 3.4 g per 100 ml and curd about 3.5 to 4 g per 100 g. Dry weights are higher than cooked weights, because dal and soya soak up water when cooked."
        ],
      },
      {
        heading: "How to upgrade mess food",
        paragraphs: [
          "Ask for a second serving of dal and eat it first, before the rice. Add an egg or two from outside the mess, boiled or as bhurji, if you eat eggs. Eat the curd or buttermilk the mess serves instead of skipping it.",
          "Keep shelf-stable protein in your room: roasted chana, peanuts, makhana and sattu. A sattu drink with water, lemon and salt needs nothing more than a glass and a spoon."
        ],
      },
      {
        heading: "A sample day that works in a hostel",
        paragraphs: [
          "Breakfast: mess breakfast plus two boiled eggs or a glass of milk. Mid-morning: a fistful of roasted chana or peanuts.",
          "Lunch: rice or roti with two servings of dal, a vegetable and curd. Evening: sattu drink or a banana with peanuts. Dinner: roti with dal or egg curry or soya chunks cooked in your own spices if you have a kettle or a small cooker.",
          "A day like this can reach roughly 80 to 110 g of protein without a single supplement. Adjust portions to your weight and goal."
        ],
      },
      {
        heading: "When protein powder makes sense",
        paragraphs: [
          "Powder is a convenience, not a requirement. If you regularly miss your protein target after using the foods above, a scoop of whey or plant protein can fill the gap. Check that the product is from a reputable brand with batch testing, and do not use it as a replacement for meals."
        ],
      },
      {
        heading: "Training and sleep still matter",
        paragraphs: [
          "Protein only helps muscle grow when you give the muscle a reason to. Follow a simple progressive plan, such as our beginner programs, and aim for seven to nine hours of sleep. If you have a medical condition, check with a doctor before changing your diet."
        ],
      },
    ],
  },
  {
    id: "b21",
    title: "BMI vs Body Fat for Indians: Why a Normal BMI Can Still Be Unhealthy",
    slug: "bmi-vs-body-fat-for-indians",
    excerpt:
      "Why Indian guidance uses lower BMI cut-offs, what waist size to watch, and how body fat percentage shows what a normal BMI can hide.",
    date: "2026-11-09",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Health",
    tags: ["health", "bmi", "body fat", "indian diet"],
    image: "/images/blog/calories-you-need.jpg",
    body: [
      {
        heading: "Why BMI behaves differently for Indians",
        paragraphs: [
          "BMI compares weight to height. It cannot tell muscle from fat or show where fat is stored. South Asians tend to carry more body fat, and more of it around the abdomen, at the same BMI as people of other backgrounds. That is why the risk of type 2 diabetes and heart disease starts rising at a lower BMI.",
          "For this reason, Indian consensus guidance uses lower cut-offs than the international table: a healthy BMI is about 18.5 to 22.9, overweight is 23 to 24.9 and obese is 25 and above. The BMI calculator on FitSmart shows both sets of cut-offs side by side."
        ],
      },
      {
        heading: "Waist size can matter more than the scale",
        paragraphs: [
          "Fat around the waist is more closely linked to metabolic risk than fat on the hips and thighs. Indian consensus guidance flags abdominal obesity at a waist of 90 cm or more for men and 80 cm or more for women.",
          "Measure at the level of the navel, standing relaxed, after breathing out. A rising waist with a steady weight is a warning sign that you may be gaining fat and losing muscle."
        ],
      },
      {
        heading: "What body fat percentage adds",
        paragraphs: [
          "Body fat percentage splits weight into fat and everything else. Two people at the same height and weight can have very different body fat, which is why a person can look slim and still carry a lot of fat, and why a muscular person can show an overweight BMI and be perfectly healthy.",
          "The body fat calculator on FitSmart uses the US Navy tape-measure method, which needs your neck and waist, and hip for women. It is an estimate, good for tracking your own trend over months rather than for comparing yourself with anyone else."
        ],
      },
      {
        heading: "What to do with these numbers",
        paragraphs: [
          "If your BMI is normal but your waist is above the Indian thresholds, focus on strength training twice or three times a week, enough protein and a modest calorie deficit if you want to lose fat. Resistance training builds the muscle that protects your metabolism.",
          "If your BMI is high because you are muscular and your waist and body fat are within a healthy range, there is no need to cut weight just to match a chart. Track waist, body fat and how you feel, not weight alone."
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "BMI, waist and body fat are screening tools, not diagnoses. If you have a family history of diabetes or heart disease, a high waist measurement or any symptoms, ask your doctor about blood sugar, blood pressure and cholesterol tests. This article is general information and not personal medical advice."
        ],
      },
    ],
  },
  {
    id: "b22",
    title: "How Much Protein Do You Need a Day? A Guide for Indian Diets",
    slug: "how-much-protein-per-day-india",
    excerpt:
      "How many grams of protein you need a day for health, fat loss and muscle gain, with a simple per-meal plan for vegetarian and non-vegetarian Indian diets.",
    date: "2026-11-09",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["nutrition", "protein", "indian diet", "muscle gain"],
    image: "/images/blog/indian-diet-muscle-gain.jpg",
    body: [
      {
        heading: "The short answer",
        paragraphs: [
          "The general recommended intake for healthy adults is about 0.8 g of protein per kg of bodyweight a day. That is the amount to avoid deficiency, not an ideal for people who train. If you lift weights or want to lose fat without losing muscle, research supports about 1.6 to 2.2 g per kg.",
          "For a 70 kg adult that is about 56 g at the general level and about 112 to 154 g if you train hard. The protein calculator on FitSmart turns your weight and goal into a daily target."
        ],
      },
      {
        heading: "Why Indian diets often fall short",
        paragraphs: [
          "Traditional Indian meals are rich in carbohydrate from rice and roti, and the protein often comes from a small bowl of dal. That can leave an average meal at only 8 to 15 g of protein. Without changes, reaching 100 g in a day is difficult, especially for vegetarians.",
          "The goal is not to cut the staples. It is to add a clear protein source to every meal."
        ],
      },
      {
        heading: "A simple per-meal plan",
        paragraphs: [
          "Divide your daily target by three or four meals. For a 100 g target that is roughly 25 to 30 g per main meal, and 10 to 15 g from snacks.",
          "Vegetarian options: moong dal chilla with curd, paneer bhurji, rajma or chole with roti, soya chunks curry, sprouts, sattu drink, milk and peanuts. Non-vegetarian options: eggs, chicken curry, fish, and egg curry.",
          "Our protein-in-Indian-foods chart lists grams per 100 g so you can build meals that add up."
        ],
      },
      {
        heading: "Do vegetarians need more?",
        paragraphs: [
          "Plant proteins are slightly less digestible and some are lower in certain amino acids. In practice, vegetarians can meet their needs by eating a variety of sources through the day, for example dal with roti or rice, and by aiming for the higher end of their protein range."
        ],
      },
      {
        heading: "Is too much protein dangerous?",
        paragraphs: [
          "In healthy adults, intakes within the range above are considered safe. People with kidney disease or other medical conditions should follow their doctor, and anyone planning a large increase can check with a dietitian first."
        ],
      },
      {
        heading: "Putting it into practice",
        paragraphs: [
          "Pick your daily target, divide it across meals, and use one or two convenient sources such as curd, eggs, paneer or roasted chana to fill gaps. Check your intake for a week, adjust, then stop tracking once your meals have become habit."
        ],
      },
    ],
  },
  {
    id: "b17",
    title: "Protein Powder in India: Do You Need It?",
    slug: "protein-powder-india-do-you-need-it-how-to-choose",
    excerpt:
      "Whether protein powder is worth buying, how to read the label, what to check for in India, and when real food is the better choice.",
    date: "2026-11-12",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["protein powder", "supplements", "nutrition", "india"],
    image: "/images/blog/indian-diet-muscle-gain.jpg",
    body: [
      {
        heading: "The honest answer first",
        paragraphs: [
          "Protein powder is a convenient food, not a magic product. It is simply protein that has been separated from milk, eggs, peas or other sources and dried into a powder. If you can reach your daily protein target from dal, curd, paneer, eggs, chicken, fish, soya and sprouts, you do not need powder at all.",
          "It becomes useful when your target is high and your meals fall short, for example if you train hard, eat mostly vegetarian food, or have a busy day where a shake is the only practical option. Think of it as a way to fill a gap, not as the foundation of your diet.",
        ],
      },
      {
        heading: "Work out your gap before you buy",
        paragraphs: [
          "Start with your daily target. A common range for people who train regularly is about 1.4 to 2.0 grams per kilogram of bodyweight, and the general adult recommendation is about 0.8 grams per kilogram. Our protein calculator turns your weight and goal into a number.",
          "Then write down what you actually eat in a normal day and add up the protein. If you are within 10 to 15 grams of your target, an extra egg, a bowl of curd or a handful of roasted chana may close the gap for far less money than a tub of powder. If you are 30 grams or more short most days, powder starts to make sense.",
        ],
      },
      {
        heading: "The main types",
        paragraphs: [
          "Whey is made from milk and is the most popular type. Whey concentrate usually has a little more fat and lactose, whey isolate is filtered further and has less, and hydrolysed whey is partly broken down. All three provide complete protein.",
          "Casein is also from milk and digests more slowly. Plant powders, such as pea, rice or soya blends, suit people who avoid dairy or eat vegan, and a blend of sources usually gives a better amino acid profile than a single one. Egg protein is another option. If milk upsets your stomach, try an isolate or a plant powder before you give up on powders altogether.",
        ],
      },
      {
        heading: "How to read the label",
        paragraphs: [
          "Look at protein per serving and the serving size. A typical scoop gives roughly 20 to 25 grams, but the label should say so clearly. Divide the price by the grams of protein, not by the weight of the tub, to compare brands fairly.",
          "Check the ingredient list. A short list is a good sign. Be careful with products that hide behind a proprietary blend without stating the amounts, and with ones that add large amounts of sugar, flavouring or fillers. Check the nutrition panel for the carbohydrate and fat per serving as well, because it should match the type of powder it claims to be.",
        ],
      },
      {
        heading: "Safety and authenticity in India",
        paragraphs: [
          "In India, food and supplement products fall under the food safety regulator, so look for a valid FSSAI licence number, a manufacturing date, a batch number and an expiry date on the pack. If any of these are missing or unclear, do not buy it.",
          "Counterfeit tubs are sold online and in some shops, so buy from the brand's own store or from authorised sellers, check the seal, and be suspicious of prices that are far below everyone else's. Some brands publish independent lab test reports for each batch, which is a useful sign. Never use a product that smells or looks odd.",
        ],
      },
      {
        heading: "Who should be careful",
        paragraphs: [
          "Healthy adults can usually use protein powder within normal intakes without problems. If you have kidney disease, liver disease, an allergy to milk, soya or eggs, are pregnant or breastfeeding, or take regular medicines, speak to your doctor first. Children and teenagers should get their protein from food unless a doctor or dietitian advises otherwise.",
          "Powders do not replace meals. If you drink shakes instead of eating, you may miss fibre, vitamins and minerals that whole foods provide.",
        ],
      },
      {
        heading: "A simple way to use it",
        paragraphs: [
          "One scoop, once a day, after training or as part of a breakfast, is enough for most people. Mix it with milk, water or curd, and add a banana or oats if you want a fuller meal. Check your total protein across the day, and adjust if you are already hitting your target.",
          "Remember that the biggest results come from regular training, enough total calories, good sleep and consistency. A supplement adds only a small piece. This article is general information and not medical advice.",
        ],
      },
    ],
  },
  {
    id: "b18",
    title: "Creatine for Beginners: Dose, Safety, Who Should Skip",
    slug: "creatine-for-beginners-india-what-it-does-who-should-skip",
    excerpt:
      "A plain guide to creatine monohydrate: what the research supports, a simple daily dose, common side effects, and when to speak to a doctor first.",
    date: "2026-11-12",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["creatine", "supplements", "strength", "muscle gain"],
    image: "/images/blog/progressive-overload.jpg",
    body: [
      {
        heading: "What creatine is",
        paragraphs: [
          "Creatine is a compound your body makes and also gets from food, mainly meat and fish. About 95 percent of it is stored in your muscles, where it helps recycle the energy your muscles use for short, hard efforts such as lifting a heavy set or sprinting.",
          "As a supplement, creatine monohydrate is one of the most studied sports supplements. That does not make it necessary or right for everyone, but it does mean we know more about it than about most products sold in gym shops.",
        ],
      },
      {
        heading: "What the research supports",
        paragraphs: [
          "Studies generally find that creatine can improve performance in short, high-intensity efforts and help people add a little more strength and lean mass over weeks of resistance training. The effect is modest, not dramatic, and it works only alongside training and enough food.",
          "Some people respond more than others. Vegetarians and vegans often have lower creatine stores to begin with, so they may notice more of an effect, although this varies between people. Creatine does not burn fat on its own and does not replace hard training.",
        ],
      },
      {
        heading: "How to take it, simply",
        paragraphs: [
          "The simplest approach is 3 to 5 grams of creatine monohydrate a day, taken at any time, with or without food. Consistency matters more than timing. Mix it into water, juice or a shake and drink it.",
          "You may see advice to do a loading phase of about 20 grams a day split into four doses for five to seven days. It saturates the muscles faster, but it is not required. The lower daily dose reaches the same level in a few weeks and is gentler on the stomach.",
          "Stay with plain creatine monohydrate. More expensive versions with fancy names have not been shown to work better. Choose a product with a clear ingredient list that contains only creatine, and check the FSSAI licence number, batch number and expiry date.",
        ],
      },
      {
        heading: "Common side effects",
        paragraphs: [
          "The most common effect is a small rise in body weight, often one to two kilograms, caused by extra water held inside the muscles. That is not fat. Some people have stomach discomfort or bloating, especially with big loading doses or if the powder is taken without enough fluid.",
          "Drink enough water through the day. If you get cramps or an upset stomach, lower the dose or split it into two servings with meals. You may read claims about hair loss. The evidence for that is limited, so do not treat it as established, but if you are worried, speak to a doctor.",
        ],
      },
      {
        heading: "Who should skip it or ask a doctor first",
        paragraphs: [
          "Do not start creatine without medical advice if you have kidney disease or a history of kidney problems, if you take medicines that affect the kidneys, or if you are pregnant or breastfeeding. People with other long-term conditions should check with their doctor too.",
          "Creatine is generally not recommended for children and teenagers unless a doctor advises it. If you are under 18, focus on training, food and sleep.",
        ],
      },
      {
        heading: "Do you actually need it?",
        paragraphs: [
          "If you are new to lifting, you will gain strength quickly from simply training regularly and eating enough protein and calories, even without any supplement. Fix your basics first: a plan that you follow for several months, protein across the day, seven to nine hours of sleep and progressive overload.",
          "Creatine is something to consider after those are in place, if you want a small extra edge and your doctor has no concerns. It is not a shortcut, and skipping it will not stop you from making good progress.",
        ],
      },
      {
        heading: "A quick checklist",
        paragraphs: [
          "Pick plain creatine monohydrate from a reliable seller. Take 3 to 5 grams daily. Drink water regularly. Expect a small weight gain from water in the first weeks. Stop and see a doctor if you feel unwell. Keep training hard and consistently, because that is where the results come from. This article is general information and not medical advice.",
        ],
      },
    ],
  },
  {
    id: "b19",
    title: "Start Running: A 6-Week Walk-Run Plan for Beginners",
    slug: "beginner-running-plan-6-week-walk-run-india",
    excerpt:
      "A gentle 6-week walk-run plan for beginners, with a warm-up, simple pacing rules, and tips for Indian weather, shoes and safety.",
    date: "2026-11-12",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Cardio",
    tags: ["running", "cardio", "beginner", "fat loss"],
    image: "/images/blog/hiit-vs-steady-state.jpg",
    body: [
      {
        heading: "Why walk-run works",
        paragraphs: [
          "Most beginners quit running because they start too fast, get out of breath within two minutes, and decide they are not runners. The fix is to mix short runs with walking breaks. Your heart, lungs and legs adapt over weeks, and the tendons and bones take longer than the muscles, so a slow build helps you avoid injury.",
          "This plan takes six weeks, three sessions a week, with a rest day in between. If you are not used to exercise, start with two weeks of brisk walking first.",
        ],
      },
      {
        heading: "Before you start",
        paragraphs: [
          "Wear proper running shoes with a cushioned sole and some room for your toes. Old worn shoes or flat fashion sneakers are a common cause of sore shins and knees. Wear light, breathable clothes.",
          "If you have a heart or lung condition, joint problems, are pregnant, or are significantly overweight or have not exercised for many years, talk to your doctor first. Stop at once and get help if you feel chest pain, dizziness or unusual breathlessness.",
        ],
      },
      {
        heading: "Every session: the structure",
        paragraphs: [
          "Warm up with five minutes of brisk walking and a few leg swings and bodyweight squats. Do the walk-run intervals. Finish with five minutes of easy walking and some gentle stretching.",
          "Use the talk test: you should be able to say a short sentence while running. If you cannot, slow down or walk. Running slowly is the point. Nobody is timing you.",
        ],
      },
      {
        heading: "The plan",
        paragraphs: [
          "Week 1: run 1 minute, walk 2 minutes, repeat 7 times. Week 2: run 2 minutes, walk 2 minutes, repeat 5 times. Week 3: run 3 minutes, walk 2 minutes, repeat 4 times.",
          "Week 4: run 5 minutes, walk 2 minutes, repeat 3 times. Week 5: run 8 minutes, walk 2 minutes, repeat 2 times, then run 5 more minutes if you feel good. Week 6: run 20 minutes slowly without stopping, or two 12-minute runs with a 2-minute walk in between.",
          "If a week feels too hard, repeat it before moving on. There is no rush, and repeating a week is a smart choice, not a failure.",
        ],
      },
      {
        heading: "Running in Indian conditions",
        paragraphs: [
          "Heat and humidity make running harder, so run early in the morning or after sunset. Drink water before and after, and carry some if you will be out for long. Wear a cap in strong sun.",
          "Check the air quality index before you go out. On days with very poor air, walk or exercise indoors instead of running outside. Choose safe, well-lit routes, a park or a track if possible, and avoid running on busy roads with heavy traffic. Watch for uneven surfaces and stray dogs.",
        ],
      },
      {
        heading: "Avoiding injury",
        paragraphs: [
          "Do not increase more than one step in this plan at a time. Add strength work twice a week for your legs and core, such as squats, lunges, glute bridges and planks, because strong muscles protect your joints. Sleep well, because that is when your body repairs itself.",
          "Mild muscle soreness is normal. Sharp pain, pain that gets worse as you run, or swelling is not. Rest, and see a doctor or physiotherapist if it does not settle in a few days.",
        ],
      },
      {
        heading: "Running and fat loss",
        paragraphs: [
          "Running burns calories, but weight loss still depends on your overall food intake and consistency. Do not use running to cancel out a large meal. Combine it with a balanced diet, enough protein and some strength training, which helps you keep muscle while you lose fat.",
          "Track progress by how you feel and what you can do, such as running for 20 minutes without stopping, not only by the weighing scale. This article is general information and not medical advice.",
        ],
      },
    ],
  },
  {
    id: "b20",
    title: "Push Pull Legs vs Full Body vs Upper/Lower Split",
    slug: "push-pull-legs-vs-full-body-vs-upper-lower-which-split",
    excerpt:
      "How the three most popular workout splits compare, who each suits, and how to choose one based on your schedule and experience.",
    date: "2026-11-12",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Training",
    tags: ["workout split", "strength", "gym", "beginner"],
    image: "/images/blog/progressive-overload.jpg",
    body: [
      {
        heading: "What a split is",
        paragraphs: [
          "A workout split is how you divide your training across the week. Do you train your whole body each time, or only some muscles on some days? There is no single best answer. The right split is the one that fits your schedule, that you enjoy, and that lets you train each muscle often enough with enough total work.",
          "Research on muscle growth suggests that total weekly volume, which is the number of hard sets per muscle, and training each muscle at least about twice a week both matter. The name of the split matters far less than whether you show up and add challenge over time.",
        ],
      },
      {
        heading: "Full body: 2 to 3 days a week",
        paragraphs: [
          "You train all major muscle groups in every session, usually with compound lifts such as a squat, a hinge, a push, a pull and some core work. Because you train each muscle several times a week, practice comes quickly, and missing one session does not wreck your plan.",
          "It suits beginners, people with limited time, and anyone who can only train two or three days a week. The downside is that sessions can feel long and tiring if you try to include too much, so keep the exercise list short.",
        ],
      },
      {
        heading: "Upper/lower: 4 days a week",
        paragraphs: [
          "You alternate between an upper-body day and a lower-body day, for example Monday upper, Tuesday lower, Thursday upper, Friday lower. Each muscle group is trained twice a week, and each session is shorter and more focused than a full-body day.",
          "It suits people with a little training experience who can reach the gym four days a week. It gives a good balance of volume, frequency and recovery, and it is simple to schedule around work.",
        ],
      },
      {
        heading: "Push/pull/legs: 3 or 6 days a week",
        paragraphs: [
          "Push days train chest, shoulders and triceps, pull days train back and biceps, and leg days train the lower body. Run it once through for a three-day week, or twice for six days, which trains each muscle twice.",
          "It suits people who enjoy the gym, want more exercises per muscle and can train five or six days. The risk is overdoing it. Six days a week needs good sleep, enough food and a plan to skip a day when you are tired. If you can only train three days, a single push, pull and legs cycle works, but each muscle then gets trained only once a week.",
        ],
      },
      {
        heading: "How to choose",
        paragraphs: [
          "Count the days you can train honestly, not the days you hope to train. Two or three days: full body. Four days: upper/lower. Five or six days with plenty of recovery: push, pull and legs. If you are brand new, start with full body for at least a few months before changing.",
          "Next, consider your experience. Beginners progress well on almost any sensible program, so simplicity is the priority. Intermediate lifters may need more volume per muscle, and that is where upper/lower or push, pull and legs become useful.",
        ],
      },
      {
        heading: "What matters more than the split",
        paragraphs: [
          "Progressive overload, which means gradually doing a little more over time, whether it is more weight, more reps or better control. Enough protein and total calories. Sleep. A plan you can repeat for months. Good form, with a weight you can control.",
          "Change your split only if it stops working or you stop enjoying it, not because a different one looks better on social media.",
        ],
      },
      {
        heading: "A sample week for each",
        paragraphs: [
          "Full body: Monday, Wednesday and Friday, each with squat, hinge, push, pull and core. Upper/lower: Monday upper, Tuesday lower, Thursday upper, Friday lower. Push, pull, legs: Monday push, Tuesday pull, Wednesday legs, then repeat on Friday to Sunday if you want six days.",
          "Whichever you choose, write down your weights and reps. If you cannot tell whether you are doing more than last month, you cannot be sure you are progressing. This article is general information, so check with a doctor if you have an injury or medical condition.",
        ],
      },
    ],
  },
  {
    id: "b21",
    title: "Intermittent Fasting: Evidence and Who Should Avoid It",
    slug: "intermittent-fasting-india-what-evidence-says-who-should-avoid",
    excerpt:
      "What intermittent fasting is, what research shows about weight loss, the common patterns, and who should not try it without medical advice.",
    date: "2026-11-12",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["intermittent fasting", "weight loss", "nutrition", "diet"],
    image: "/images/blog/calories-you-need.jpg",
    body: [
      {
        heading: "What intermittent fasting is",
        paragraphs: [
          "Intermittent fasting means eating only within certain hours or on certain days, and not eating, apart from water, tea or black coffee, during the rest. It is a pattern of when you eat, not a rule about what to eat.",
          "Popular versions include the 16:8 pattern, where you eat during an eight-hour window and fast for sixteen hours, and the 5:2 pattern, where you eat normally five days and eat much less on two non-consecutive days.",
        ],
      },
      {
        heading: "What research suggests",
        paragraphs: [
          "Studies comparing intermittent fasting with ordinary calorie reduction generally find similar weight loss when the total calories are matched. In other words, it seems to work mainly because many people eat less in a shorter window, not because fasting has a special fat-burning power.",
          "That makes it a tool, not a miracle. Some people find it easy to follow because there are fewer meals to plan. Others find it makes them hungry, irritable or likely to overeat later. If a pattern makes you miserable, a normal eating schedule with a modest calorie deficit works just as well.",
        ],
      },
      {
        heading: "How to try it sensibly",
        paragraphs: [
          "Start gently. Move your last meal a little earlier, delay breakfast by an hour or two, and build up to a 12-hour overnight break first. If that feels fine, you can try 14 hours and then 16.",
          "Within your eating window, eat proper meals with protein, fibre, vegetables and healthy fats, so that you meet your needs. Skipping meals and then eating chips and sweets defeats the purpose. Drink water through the day. Keep exercising, and train in the part of the day that makes you feel best.",
        ],
      },
      {
        heading: "Muscle gain and training",
        paragraphs: [
          "If you lift weights and want to gain muscle, you still need enough total protein and calories. That is harder in a short window. Spread protein over at least two or three meals in your window and consider eating something before or after training.",
          "If your performance drops, you feel weak or dizzy or you cannot recover, widen your eating window or drop the fasting. Hard training and strict fasting do not suit everyone.",
        ],
      },
      {
        heading: "Who should avoid it, or ask a doctor first",
        paragraphs: [
          "Do not try intermittent fasting without medical advice if you have diabetes or take medicines for blood sugar or blood pressure, have a history of an eating disorder, are pregnant or breastfeeding, are underweight, or have a medical condition that needs regular meals or medicines taken with food.",
          "It is also not suitable for children and teenagers. Older people and anyone with long-term illness should check with their doctor. Stop if you feel faint, shaky or unwell.",
        ],
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Eating far more in the window than you would have eaten all day. Not drinking enough water. Not eating enough protein. Pushing fasts that are too long, too soon. Using sugary drinks or large amounts of coffee to suppress hunger. Treating the fast as a punishment for a big meal, which can create an unhealthy relationship with food.",
          "If you observe religious or traditional fasts, that is a personal choice. The same rules apply: drink fluids, break the fast sensibly and see a doctor if you have a health condition.",
        ],
      },
      {
        heading: "The bottom line",
        paragraphs: [
          "Intermittent fasting is one of several ways to manage how much you eat. It can work for people who like it and are healthy. It is not necessary for fat loss, and it is not for everyone. What matters most is a calorie intake you can keep up, enough protein, regular movement and sleep.",
          "Try it for a few weeks and judge it by how you feel and what you can sustain. This article is general information and not medical advice.",
        ],
      },
    ],
  },
  {
    id: "b22",
    title: "Weight-Loss Plateau: Why It Happens and How to Fix It",
    slug: "weight-loss-plateau-why-scale-stops-moving-what-to-do",
    excerpt:
      "Why weight loss stalls, how to tell a real plateau from normal fluctuations, and a step-by-step checklist to get moving again.",
    date: "2026-11-12",
    readMinutes: 7,
    author: 'Akshay Mahajan',
    category: "Nutrition",
    tags: ["weight loss", "plateau", "fat loss", "calories"],
    image: "/images/blog/calories-you-need.jpg",
    body: [
      {
        heading: "First, is it really a plateau?",
        paragraphs: [
          "Body weight can move up or down by one to two kilograms in a day because of water, salt, the food still in your gut, hormones and how much carbohydrate you ate. So one or two flat weeks does not mean your fat loss has stopped.",
          "A better test is the trend. Weigh yourself at the same time each morning, ideally three or four times a week, and look at the average across two to three weeks. Also track your waist measurement and how your clothes fit. If all of these have not changed for three or four weeks, you are likely on a real plateau.",
        ],
      },
      {
        heading: "Why plateaus happen",
        paragraphs: [
          "As you lose weight, you weigh less, so your body needs fewer calories than it did before. The calorie level that gave steady loss at 85 kg may only maintain your weight at 78 kg. You also tend to move a little less without noticing, because your body saves energy when you eat less.",
          "Meanwhile, portions creep up, weekend meals and snacks add up, and tracking becomes less accurate over time. Oil, ghee, sweets, drinks and tastings while cooking are easy to forget and can quietly add a couple of hundred calories a day.",
        ],
      },
      {
        heading: "Step 1: tighten your tracking",
        paragraphs: [
          "For two weeks, weigh or measure your food and write down everything, including cooking oil, sauces, chai with sugar, fruit juice and snacks. Include weekends. Many people find that the gap between what they think they eat and what they actually eat is the whole story.",
          "Use the FitSmart calorie calculator to recheck your estimated maintenance calories at your current weight, then compare it with what you really eat.",
        ],
      },
      {
        heading: "Step 2: adjust calories modestly",
        paragraphs: [
          "If your tracking is accurate and you are still stuck, lower your intake by about 100 to 200 calories a day or add a little movement. Do not slash calories drastically. Eating too little leads to hunger, low energy, muscle loss and a rebound.",
          "A moderate deficit that you can sustain beats an aggressive one that you drop after a fortnight. For most people, aiming to lose around 0.25 to 0.75 kg a week is a reasonable pace.",
        ],
      },
      {
        heading: "Step 3: move more, and lift",
        paragraphs: [
          "Raise your daily steps by 1,000 to 2,000 and see what happens over two weeks. Everyday movement, such as walking, taking the stairs and doing chores, adds up more than most people expect.",
          "Strength training twice or three times a week helps you keep muscle while you lose fat, and muscle is what keeps your metabolism from dropping too far. If you only do cardio, add some resistance work.",
        ],
      },
      {
        heading: "Step 4: protein, sleep and stress",
        paragraphs: [
          "Eat enough protein, around 1.2 to 1.6 grams per kilogram of bodyweight for many people trying to lose fat, spread over your meals. It helps you feel full and protects muscle. Aim for seven to nine hours of sleep, because poor sleep increases hunger and cravings.",
          "Long periods of stress can also affect appetite and eating patterns. Walks, time outdoors, and breaks from screens help more than people think.",
        ],
      },
      {
        heading: "Step 5: consider a short diet break",
        paragraphs: [
          "If you have been dieting for a long time and feel worn out, a one- to two-week break at maintenance calories can help you recover mentally and physically, and then you can resume the deficit. Some studies suggest planned breaks may help people stick to a diet, although the research is not conclusive.",
          "If you have changed nothing for months and your weight has not moved despite careful tracking, or you have other symptoms such as extreme tiredness, hair loss or irregular periods, see a doctor to rule out medical causes. This article is general information and not medical advice.",
        ],
      },
    ],
  },
  {
    id: "b23",
    title: "Muscle Soreness (DOMS): Causes and What Helps",
    slug: "muscle-soreness-doms-why-it-happens-what-helps",
    excerpt:
      "Why you feel sore a day or two after training, what helps and what does not, and the warning signs that mean you should see a doctor.",
    date: "2026-11-12",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Recovery",
    tags: ["recovery", "muscle soreness", "DOMS", "stretching"],
    image: "/images/blog/sleep-fitness-tool.jpg",
    body: [
      {
        heading: "What DOMS is",
        paragraphs: [
          "DOMS stands for delayed onset muscle soreness. It is the stiff, tender feeling that shows up a day after a hard workout, often peaks around 24 to 72 hours later, and then fades over several days.",
          "It is most common when you try a new exercise, increase the volume or intensity suddenly, or return after a break. The lowering part of a lift, such as walking downhill, lowering a weight slowly or doing a deep squat, is especially likely to cause it.",
        ],
      },
      {
        heading: "Why it happens",
        paragraphs: [
          "Scientists do not fully agree on the exact cause. It seems to involve the stress of unfamiliar loading on muscle fibres and the surrounding tissue, which triggers an inflammatory repair response. Your muscles then adapt, which is why the same workout feels less sore the next time.",
          "This is why soreness is not a good measure of a good workout. You can train effectively and make progress with little soreness, and you can feel very sore after a poor, badly planned session.",
        ],
      },
      {
        heading: "What helps",
        paragraphs: [
          "Light movement. A walk, an easy cycle or gentle mobility work increases blood flow and often makes you feel better than lying still. Sleep, because your body does much of its repair while you rest, and our article on sleep explains why it matters.",
          "Enough protein and calories across the day. Hydration. A warm shower or a gentle massage may make muscles feel better in the short term, even if they do not speed up recovery much. Easing into new training gradually is the best prevention.",
        ],
      },
      {
        heading: "What does not help as much as people think",
        paragraphs: [
          "Stretching before or after a workout has not been shown to prevent soreness in a meaningful way, although stretching can feel pleasant and may help your flexibility over time. Pain-killer tablets can hide the soreness, but regular use is not a great idea and they can have side effects, so ask a doctor or pharmacist before you use them.",
          "Ice baths and cold water immersion can reduce the feeling of soreness for some people, but some research suggests that using them regularly after strength training might blunt muscle growth. Special supplements and pills do not make up for good basics.",
        ],
      },
      {
        heading: "Should you train when sore?",
        paragraphs: [
          "Mild soreness is fine. You can warm up thoroughly, do lighter work or train a different muscle group. If the soreness is severe, hurts when you move normally or limits your range of motion, take an easier day or a rest day.",
          "Do not push through sharp pain, joint pain or pain that gets worse as you warm up. Those are signs of something other than ordinary DOMS.",
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "Seek medical help if you have extreme pain and swelling, very dark or cola-coloured urine, weakness that does not match the workout, or soreness that lasts more than about a week. These can be signs of a serious condition called rhabdomyolysis, which is rare but needs urgent treatment.",
          "Also get checked if you have pain after an injury, numbness or tingling, or pain that is in a joint, not in the muscle belly.",
        ],
      },
      {
        heading: "How to reduce soreness next time",
        paragraphs: [
          "Increase your workload gradually, for example by adding weight or sets in small steps. Start new exercises lighter. Warm up properly. Keep your weekly routine consistent, because muscles adapt to regular training. Eat and sleep well.",
          "Soreness fades as your body adapts. If you are always in pain, you are probably doing too much, too fast. This article is general information and not medical advice.",
        ],
      },
    ],
  },
  {
    id: "b24",
    title: "Home Gym in India: What to Buy First",
    slug: "home-gym-india-what-to-buy-first-budget",
    excerpt:
      "A priority list for building a home gym on a budget in India, what to buy first, what to skip, and how to stay safe at home.",
    date: "2026-11-12",
    readMinutes: 6,
    author: 'Akshay Mahajan',
    category: "Training",
    tags: ["home gym", "equipment", "home workout", "budget"],
    image: "/images/blog/progressive-overload.jpg",
    body: [
      {
        heading: "Start with the question, not the shopping",
        paragraphs: [
          "Before you buy anything, decide what you want to do. Strength, fat loss and general fitness all need different things, but one list works for most beginners: something to lift, something to pull, a floor to work on and enough space to move safely.",
          "Start small and add equipment only when you know you will use it. Many people buy a large machine, use it a few times and end up hanging clothes on it. Bodyweight workouts on a mat cost almost nothing, so try those for a few weeks first.",
        ],
      },
      {
        heading: "Priority 1: a mat and a space",
        paragraphs: [
          "A good exercise mat protects your knees, spine and floor and makes floor work more comfortable. Make sure you have enough clear space to lie down with your arms and legs stretched out, and a ceiling that is high enough to press weights overhead.",
          "Check that the floor is not slippery, and keep water and a towel nearby.",
        ],
      },
      {
        heading: "Priority 2: dumbbells",
        paragraphs: [
          "Dumbbells are the most useful single item, because you can do squats, lunges, rows, presses, curls and deadlifts with them. Fixed-weight pairs are simple and sturdy. Adjustable dumbbells save space and let you progress, but check how the plates lock and that they do not slip.",
          "Buy from a reliable seller and avoid very cheap sets with loose or poorly finished parts. Plan to buy a heavier pair after a couple of months, because you will get stronger.",
        ],
      },
      {
        heading: "Priority 3: resistance bands",
        paragraphs: [
          "Resistance bands are cheap, light and flexible. They are good for warm-ups, shoulder and back exercises, assisted pull-ups and adding challenge to bodyweight moves. Check them for cracks before each use, and replace worn ones, because a snapping band can cause injury.",
          "Loop bands, long bands with handles and mini bands each have uses. If you buy only one, choose a set with several resistance levels.",
        ],
      },
      {
        heading: "Priority 4: a pull-up bar",
        paragraphs: [
          "Pull-ups and rows are the pulling half of your training, and many home routines lack them. Doorway bars are inexpensive, but they must fit your door frame and be rated for your weight. Install them exactly as the manufacturer says and test them gradually before you hang your full weight.",
          "If you cannot do a pull-up yet, use bands for assistance or do rows with dumbbells or a sturdy table.",
        ],
      },
      {
        heading: "Later: a bench, a rope, a bar",
        paragraphs: [
          "A flat or adjustable bench makes presses and supported rows possible, but it is not essential at the start. A skipping rope is a cheap cardio tool. A barbell and plates take space and need safety equipment, such as a rack or safety bars, so skip them until you have the room and the experience.",
          "Be sceptical of gadgets promising quick fat loss, such as vibration belts or electric muscle stimulators. They are unlikely to replace proper training and diet.",
        ],
      },
      {
        heading: "Safety and buying tips",
        paragraphs: [
          "Learn good form before you add weight, and use a weight you can control. Do not lift heavy overhead or near your limit without a spotter or safety equipment. Keep pets and children away from your workout area. Check equipment regularly for loose screws and wear.",
          "Compare prices across sellers, read recent reviews with photos and check the return policy. Second-hand dumbbells and benches from reputable sellers can be good value, but inspect them in person. Keep your plan simple, and use what you own consistently. This article is general information, so see a doctor before starting if you have a medical condition.",
        ],
      },
    ],
  },
];
