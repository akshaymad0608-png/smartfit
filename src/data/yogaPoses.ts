/**
 * The poses in the Sunrise Vinyasa Flow, written out so the page teaches them.
 * Figures live in components/illustrations/YogaPose.tsx (same ids). General
 * beginner guidance, not medical advice.
 */

export interface YogaPose {
  id: string;
  name: string;
  sanskrit: string;
  /** Step-by-step set-up cues. */
  cues: string[];
  /** How long to stay and how to breathe. */
  breath: string;
  /** Who should modify or skip it. */
  caution: string;
}

export const yogaPoses: YogaPose[] = [
  {
    id: 'child',
    name: 'Child’s Pose',
    sanskrit: 'Balasana',
    cues: [
      'Kneel with your big toes touching and your knees as wide as your mat.',
      'Sit your hips back towards your heels and fold forward over your thighs.',
      'Rest your forehead on the mat and reach your arms long in front of you, or let them rest beside your legs.',
      'Place a folded blanket under your hips or between your thighs and calves if your heels feel far away.',
    ],
    breath: 'Stay for 5 to 10 slow breaths, letting the back of your ribs widen as you inhale.',
    caution: 'Skip or pad it if you have knee pain, and avoid it late in pregnancy without your doctor’s advice.',
  },
  {
    id: 'cat',
    name: 'Cat Pose',
    sanskrit: 'Marjaryasana',
    cues: [
      'Start on all fours with your wrists under your shoulders and your knees under your hips.',
      'As you exhale, press the floor away and round your spine up towards the ceiling.',
      'Let your head hang and draw your belly gently in towards your spine.',
    ],
    breath: 'Move with the breath: exhale into Cat, 5 to 8 rounds with Cow.',
    caution: 'Pad your knees with a blanket, and keep the movement small if your wrists are sore.',
  },
  {
    id: 'cow',
    name: 'Cow Pose',
    sanskrit: 'Bitilasana',
    cues: [
      'From all fours, inhale and let your belly drop towards the floor.',
      'Lift your chest and tailbone together and look forward, keeping the back of your neck long.',
      'Keep your shoulders away from your ears and your arms active.',
    ],
    breath: 'Inhale into Cow, exhale into Cat, 5 to 8 rounds.',
    caution: 'Do not let your lower back sink or crunch; stay within a comfortable range.',
  },
  {
    id: 'downdog',
    name: 'Downward-Facing Dog',
    sanskrit: 'Adho Mukha Svanasana',
    cues: [
      'From all fours, spread your fingers wide and tuck your toes under.',
      'Lift your knees and send your hips up and back so your body makes an upside-down V.',
      'Keep a soft bend in your knees and let your heels reach towards the floor without forcing them down.',
      'Press your hands into the mat, lengthen your spine and let your head hang between your upper arms.',
    ],
    breath: 'Hold for 5 breaths, pedalling your heels if your hamstrings feel tight.',
    caution: 'Avoid holding it long if you have wrist pain, high blood pressure or glaucoma, and ask your doctor if unsure.',
  },
  {
    id: 'mountain',
    name: 'Mountain Pose',
    sanskrit: 'Tadasana',
    cues: [
      'Stand with your feet hip-width apart and your weight even across both feet.',
      'Lengthen your tailbone towards the floor and lift the crown of your head towards the ceiling.',
      'Relax your shoulders away from your ears and let your arms hang with your palms facing forward.',
    ],
    breath: 'Stand for 3 to 5 calm breaths, feeling the ground beneath you.',
    caution: 'Keep a slight bend in your knees if they tend to lock out.',
  },
  {
    id: 'fold',
    name: 'Standing Forward Fold',
    sanskrit: 'Uttanasana',
    cues: [
      'From Mountain, hinge forward at your hips with a long spine.',
      'Bend your knees as much as you need so your belly rests on your thighs.',
      'Let your head and arms hang heavy, or hold opposite elbows.',
      'To come up, press into your feet and roll up slowly, or lead with a flat back.',
    ],
    breath: 'Hold for 5 breaths, letting each exhale release a little more.',
    caution: 'Keep your knees bent with lower back pain, and come up slowly if you feel dizzy.',
  },
  {
    id: 'plank',
    name: 'Plank Pose',
    sanskrit: 'Phalakasana',
    cues: [
      'Place your hands under your shoulders with your fingers spread.',
      'Step your feet back so your body forms one straight line from head to heels.',
      'Draw your belly in, squeeze your thighs and push the floor away.',
      'Keep your hips level, neither sagging nor piking up.',
    ],
    breath: 'Hold for 3 to 5 breaths, dropping your knees to the floor if form slips.',
    caution: 'Rest on your knees if your wrists or lower back complain.',
  },
  {
    id: 'cobra',
    name: 'Cobra Pose',
    sanskrit: 'Bhujangasana',
    cues: [
      'Lie face down with your hands under your shoulders and your elbows hugging your ribs.',
      'Press the tops of your feet and your pubic bone into the floor.',
      'On an inhale, lift your head and chest, keeping your elbows bent and your shoulders away from your ears.',
      'Look forward, keeping the back of your neck long.',
    ],
    breath: 'Hold for 3 to 5 breaths and lower on an exhale.',
    caution: 'Keep the lift low if your back feels pinched, and skip it during pregnancy.',
  },
  {
    id: 'easy',
    name: 'Easy Pose',
    sanskrit: 'Sukhasana',
    cues: [
      'Sit on the floor, or on a folded blanket, with your legs loosely crossed.',
      'Stack your shoulders over your hips and lengthen your spine.',
      'Rest your hands on your knees and soften your jaw and eyes.',
      'Switch which shin is in front halfway through your sit.',
    ],
    breath: 'Sit for 3 minutes, breathing slowly through your nose.',
    caution: 'Sit higher on a cushion if your knees are above your hips.',
  },
];
