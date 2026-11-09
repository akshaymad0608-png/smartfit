/**
 * Written guidance for each muscle-group page (/exercises/:key).
 *
 * The exercise list and demo videos come from data/muscles.ts; this file adds
 * the words a page needs to be worth reading on its own: what the muscle does,
 * how to train it, a form cue per exercise and the mistakes that cost people
 * progress. General, widely accepted training guidance — not medical advice.
 */

export interface MuscleGuide {
  /** What the muscle group is and why it matters. */
  intro: string;
  /** Practical programming: frequency, sets, reps. */
  howToTrain: string[];
  /** Common mistakes to avoid. */
  mistakes: string[];
  /** Questions people actually ask about this muscle group. */
  faqs: { question: string; answer: string }[];
}

/** One-line form cue per exercise name (matches data/muscles.ts names). */
export const exerciseCues: Record<string, string> = {
  'Chest Press Machine':
    'Set the seat so the handles line up with mid-chest, keep your shoulder blades pulled back and press without letting your shoulders roll forward.',
  'Bench Press':
    'Plant your feet, pull your shoulder blades together, lower the bar to the lower chest with elbows at about 45 degrees and press back up in a slight arc.',
  'Cable Fly':
    'Keep a soft bend in the elbows, bring your hands together in a wide hugging arc and control the stretch on the way back instead of letting the stack pull you.',
  'Push-ups':
    'Hands under shoulders, body in one straight line from head to heels, lower until your chest is a fist-width from the floor and press away without sagging your hips.',
  'Pull-ups':
    'Start from a full hang, pull your elbows down towards your ribs until your chin clears the bar and lower slowly instead of dropping.',
  'Lat Pulldown':
    'Lean back slightly, pull the bar to your upper chest by driving the elbows down and keep your torso still rather than swinging.',
  'Rowing Machine':
    'Drive with the legs first, then lean back and pull the handle to your lower ribs, squeezing your shoulder blades together before returning in the same order.',
  'Shoulder Press Machine':
    'Adjust the seat so the handles start at shoulder height, press without arching your lower back and stop just short of locking out.',
  'Dumbbell Shoulder Press':
    'Brace your core, press the dumbbells up in a slight arc until your arms are straight above your shoulders and lower under control to ear level.',
  'Bicep Curl':
    'Keep your elbows pinned beside your ribs, curl until your forearms are vertical and lower for a slow count of two to three.',
  'Cable Bicep Curl':
    'Stand tall with the elbows fixed at your sides, curl against the constant cable tension and avoid leaning back to finish the rep.',
  'Dumbbell Bicep Curl':
    'Rotate your palms to face up as you curl, keep your upper arms still and lower fully so the muscle gets its stretch.',
  'Cable Tricep Extension':
    'Keep your elbows tucked and still, push the handle down until your arms are straight and let it rise only as far as a 90-degree elbow bend.',
  'Tricep Dips':
    'Keep your chest up and elbows pointing back, lower until your upper arms are about parallel to the floor and stop if you feel pinching in the front of the shoulder.',
  'Abs Training':
    'Exhale as you curl your ribs towards your hips, keep your lower back controlled and prefer slow reps to fast ones.',
  Crunches:
    'Curl your ribs towards your pelvis rather than pulling on your neck, pause at the top and lower slowly.',
  Plank:
    'Stack elbows under shoulders, squeeze your glutes and abs so your body forms a straight line and stop the set when your hips start to sag.',
  'Leg Press':
    'Place your feet shoulder-width on the platform, lower until your knees reach about 90 degrees without your lower back peeling off the pad and press through the whole foot.',
  Squats:
    'Brace your core, sit down and back until your thighs are at least parallel if mobility allows, keep your knees tracking over your toes and drive up through mid-foot.',
  'Squats with Dumbbells':
    'Hold the dumbbells at your chest or sides, keep your chest tall and sit between your hips as you would with a barbell.',
  'Leg Extension':
    'Align the machine pivot with your knee, extend until the legs are nearly straight and lower slowly instead of letting the weight drop.',
  Deadlift:
    'Bar over mid-foot, hinge at the hips with a flat back, push the floor away and stand tall without leaning back at the top.',
  'Leg Curl Machine':
    'Keep your hips pressed into the pad, curl through the full range and take at least two seconds to lower the weight.',
  'Lunges with Dumbbells':
    'Take a long enough step that your front shin stays near vertical, lower your back knee towards the floor and push through the front heel.',
  Lunges:
    'Step forward or back, keep your torso upright, lower until both knees are about 90 degrees and drive up through the front foot.',
  'Donkey Kicks':
    'Keep your core braced and spine neutral, kick the heel up towards the ceiling by squeezing the glute and avoid arching your lower back.',
  'Calf Raises':
    'Rise onto the balls of your feet as high as you can, pause at the top and lower fully until you feel a stretch in the calf.',
};

export const muscleGuides: Record<string, MuscleGuide> = {
  chest: {
    intro:
      'The chest (pectoralis major and minor) pushes your arms forward and across your body. It does most of the work in every pressing movement, from push-ups to bench press, and a strong chest also protects the front of the shoulder joint.',
    howToTrain: [
      'Train chest twice a week with at least 48 hours between sessions.',
      'Aim for 10 to 16 hard sets a week, split across those two sessions.',
      'Use 6 to 12 reps for presses and 10 to 15 for flys, stopping a rep or two before failure.',
      'Start with a heavy press, then add an isolation move like a cable fly.',
    ],
    mistakes: [
      'Flaring the elbows to 90 degrees on the bench, which loads the shoulder joint.',
      'Bouncing the bar off the chest instead of controlling the lowering phase.',
      'Letting the shoulders roll forward so the front delts take over from the chest.',
      'Using the same rep range forever and never adding weight or reps over time.',
    ],
    faqs: [
      {
        question: 'How do I build a bigger chest at home?',
        answer:
          'Push-ups are the foundation. Make them harder with a slower lowering phase, a pause at the bottom, elevated feet or a weighted backpack, and train them two to three times a week.',
      },
      {
        question: 'Is bench press necessary for a good chest?',
        answer:
          'No. Any pressing movement taken close to failure with progressive overload builds the chest, including machine presses and push-ups. Pick the one you can do well and progress consistently.',
      },
    ],
  },
  back: {
    intro:
      'The back (latissimus dorsi, rhomboids, traps and spinal erectors) pulls your arms towards your body and holds your spine tall. A strong back improves posture, balances all the pushing you do and makes pull-ups, rows and deadlifts possible.',
    howToTrain: [
      'Train your back two times a week, mixing vertical pulls (pull-ups, pulldowns) and horizontal pulls (rows).',
      'Aim for 10 to 18 hard sets a week.',
      'Use 6 to 12 reps for most pulls and stop one or two reps short of failure.',
      'Pull with your elbows, not your hands, to keep the biceps from taking over.',
    ],
    mistakes: [
      'Swinging the torso to finish a rep instead of lifting with the back.',
      'Shrugging the shoulders up towards the ears on pulldowns and pull-ups.',
      'Only doing vertical pulls and ignoring rows, or the reverse.',
      'Cutting the range of motion short at the bottom, where the lats are stretched.',
    ],
    faqs: [
      {
        question: 'I cannot do a pull-up yet. What should I do?',
        answer:
          'Start with lat pulldowns and slow lowering reps (negatives) from the top of a pull-up, or use a resistance band for assistance. Most beginners get their first pull-up within a few weeks of regular practice.',
      },
      {
        question: 'How often should I train my back?',
        answer:
          'Twice a week works for most people. The back recovers well, so it can handle this frequency if the total sets stay within a sensible range.',
      },
    ],
  },
  shoulders: {
    intro:
      'The shoulders (front, side and rear deltoids) lift and rotate your arms in every direction. They give the upper body its width and take part in almost every pressing and pulling exercise, so keeping them healthy matters as much as making them strong.',
    howToTrain: [
      'Train shoulders two times a week; they also get work from chest and back sessions.',
      'Aim for 8 to 14 hard sets a week, favouring side and rear delts because presses already hit the front delts.',
      'Use 6 to 12 reps for presses and 12 to 20 for lateral and rear raises.',
      'Warm up with light band work or lighter sets before heavy pressing.',
    ],
    mistakes: [
      'Pressing with an overly arched lower back instead of bracing the core.',
      'Using momentum on lateral raises so the traps do the work.',
      'Skipping rear delts, which leads to rounded posture over time.',
      'Pressing behind the neck, which puts the shoulder in a risky position for most people.',
    ],
    faqs: [
      {
        question: 'Is a machine or dumbbell shoulder press better?',
        answer:
          'Both work. The machine is more stable and easier to push hard on, while dumbbells need more control and let each arm work independently. Many programs use one of each.',
      },
      {
        question: 'Why do my shoulders hurt when I press?',
        answer:
          'Common causes are flared elbows, poor warm-up and too much weight too soon. Lighten the load and tuck the elbows slightly. If pain persists, see a physiotherapist or doctor.',
      },
    ],
  },
  biceps: {
    intro:
      'The biceps bend the elbow and rotate the forearm so your palm faces up. They work hard in every pulling exercise and respond quickly to direct training, which is why curls are one of the most popular gym exercises.',
    howToTrain: [
      'Train the biceps two times a week, or let them recover and work them after back sessions.',
      'Aim for 6 to 12 hard sets a week on top of the work they already get from rows and pulldowns.',
      'Use 8 to 15 reps and a full range of motion with a slow lowering phase.',
      'Vary the grip and angle (standing, incline, cable) to hit different parts of the muscle.',
    ],
    mistakes: [
      'Swinging the body to heave heavy dumbbells up.',
      'Letting the elbows drift forward so the shoulders take over.',
      'Skipping the lowering phase and dropping the weight.',
      'Stopping short of a full stretch at the bottom of every rep.',
    ],
    faqs: [
      {
        question: 'How heavy should I curl?',
        answer:
          'Heavy enough that the last two reps of each set are hard but your form stays strict. If you need to swing to finish, the weight is too heavy.',
      },
    ],
  },
  triceps: {
    intro:
      'The triceps make up about two thirds of your upper-arm size and extend the elbow. They are the main driver of every pressing movement, so a stronger triceps usually means a stronger bench press and overhead press as well.',
    howToTrain: [
      'Train triceps two times a week, or rely on pressing days plus one direct session.',
      'Aim for 6 to 12 hard sets a week of direct work.',
      'Use 8 to 15 reps and include an overhead or cable movement to work the long head.',
      'Add a second angle, such as dips or close-grip push-ups, once extensions feel easy.',
    ],
    mistakes: [
      'Flaring the elbows out so the movement turns into a half press.',
      'Using body momentum on dips and cable pushdowns.',
      'Going too deep on dips when the shoulders are not ready for it.',
      'Locking out violently, which stresses the elbow joint.',
    ],
    faqs: [
      {
        question: 'Are dips safe?',
        answer:
          'For most people, yes, if you do not lower too deep and keep your chest up. If your shoulders pinch or hurt, switch to close-grip push-ups or cable extensions.',
      },
    ],
  },
  abs: {
    intro:
      'The abdominal muscles brace your spine, transfer force between the upper and lower body and help you bend and rotate your trunk. Strong abs improve posture and lifting technique; visible abs mostly depend on body fat, not on how many crunches you do.',
    howToTrain: [
      'Train abs two to three times a week with a mix of curling movements and anti-extension holds like planks.',
      'Use 2 to 4 sets of 10 to 20 slow reps for crunches and 20 to 60 seconds for planks.',
      'Progress by adding a pause, a slower tempo or extra resistance rather than more endless reps.',
      'Keep your nutrition in check: a lean waistline comes from your overall calorie balance.',
    ],
    mistakes: [
      'Pulling on the neck with your hands during crunches.',
      'Doing hundreds of fast reps that never get hard.',
      'Letting the hips sag in a plank until the lower back takes the load.',
      'Believing ab exercises burn belly fat from that spot — spot reduction does not work.',
    ],
    faqs: [
      {
        question: 'How do I get visible abs?',
        answer:
          'Build the muscle with regular training and reduce overall body fat through a modest calorie deficit and enough protein. Use the calorie calculator to set a target and track progress over weeks, not days.',
      },
      {
        question: 'Can I train abs every day?',
        answer:
          'You can do light core work often, but hard ab training benefits from rest like any other muscle. Two to three focused sessions a week is plenty for most people.',
      },
    ],
  },
  quads: {
    intro:
      'The quadriceps are the four large muscles at the front of the thigh that straighten the knee. They power squats, leg presses, stairs and running, and strong quads help protect the knee joint and support daily movement for life.',
    howToTrain: [
      'Train quads two times a week with at least two days between sessions.',
      'Aim for 10 to 16 hard sets a week, combining a compound lift (squat, leg press) with an isolation move (leg extension).',
      'Use 6 to 12 reps for squats and presses and 10 to 20 for extensions.',
      'Go to a depth you can control; a full range of motion builds more muscle than short, heavy partial reps.',
    ],
    mistakes: [
      'Letting the knees collapse inward on the way up.',
      'Rounding the lower back at the bottom of a squat.',
      'Loading the bar too heavy and cutting depth.',
      'Skipping warm-up sets for the hips, knees and ankles.',
    ],
    faqs: [
      {
        question: 'Squats or leg press for quads?',
        answer:
          'Both build quads. Squats train balance and the whole body; leg press lets you load the legs hard with less technical demand. Beginners can start with the leg press and add squats as technique improves.',
      },
      {
        question: 'Are squats bad for the knees?',
        answer:
          'Done with good technique and a sensible load, squats are generally safe and can strengthen the muscles around the knee. If you have knee pain or an injury, ask a physiotherapist first.',
      },
    ],
  },
  hamstrings: {
    intro:
      'The hamstrings run along the back of the thigh and bend the knee and extend the hip. They work in every deadlift, hinge and sprint, and strong, flexible hamstrings help protect both the knees and the lower back.',
    howToTrain: [
      'Train hamstrings once or twice a week, mixing a hip hinge (deadlift, Romanian deadlift) with a knee-flexion movement (leg curl).',
      'Aim for 8 to 14 hard sets a week.',
      'Use 6 to 10 reps for hinges and 8 to 15 for curls with a slow lowering phase.',
      'Keep a flat back on hinges and stop the set if your form breaks down.',
    ],
    mistakes: [
      'Rounding the lower back during a deadlift.',
      'Treating the deadlift as a squat and bending the knees too much.',
      'Using speed on the leg curl so the hips lift off the pad.',
      'Neglecting hamstring flexibility, which can limit hinge depth.',
    ],
    faqs: [
      {
        question: 'How heavy should I deadlift as a beginner?',
        answer:
          'Start light enough to keep a flat back for every rep, often just the bar or a light kettlebell. Add small amounts of weight only when every rep looks the same.',
      },
    ],
  },
  glutes: {
    intro:
      'The glutes are the largest muscles in the body and extend and rotate the hip. They power standing up, climbing and sprinting, and strong glutes take pressure off the lower back and knees.',
    howToTrain: [
      'Train glutes two to three times a week, using hip-dominant moves like hinges, lunges and glute bridges.',
      'Aim for 10 to 16 hard sets a week.',
      'Use 6 to 15 reps, with a pause and a squeeze at the top of each rep.',
      'Add load over time with dumbbells, bands or a barbell instead of only adding reps.',
    ],
    mistakes: [
      'Arching the lower back at the top of a kick or bridge instead of finishing with the glutes.',
      'Taking steps that are too short in lunges, which shifts load to the quads.',
      'Rushing reps without a squeeze at the top.',
      'Never adding resistance, so the muscle stops being challenged.',
    ],
    faqs: [
      {
        question: 'How do I build glutes at home?',
        answer:
          'Use lunges, glute bridges, hip thrusts on a sofa and donkey kicks with a band or ankle weights. Slow tempo, a full squeeze at the top and gradually adding reps or resistance drive growth.',
      },
    ],
  },
  calves: {
    intro:
      'The calves (gastrocnemius and soleus) point your foot down and absorb the force every time you walk, run or jump. They are made of dense, endurance-oriented muscle that responds best to frequent, full-range training.',
    howToTrain: [
      'Train calves two to three times a week since they recover quickly.',
      'Aim for 8 to 14 hard sets a week.',
      'Use 8 to 20 reps with a full stretch at the bottom and a pause at the top.',
      'Try both straight-knee (standing) and bent-knee (seated) versions to work both calf muscles.',
    ],
    mistakes: [
      'Bouncing through short, fast reps.',
      'Skipping the full stretch at the bottom of every rep.',
      'Using so much weight that the range of motion shrinks.',
      'Training calves rarely and expecting rapid change.',
    ],
    faqs: [
      {
        question: 'Why are calves so hard to grow?',
        answer:
          'They are used all day, so they adapt to ordinary load. Steady progress comes from a full range of motion, higher frequency and gradually adding reps or weight over months.',
      },
    ],
  },
};
