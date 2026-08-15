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
    title: 'BMI, BMR, TDEE & Macro Calculators — FitSmart',
    description:
      'Calculate your BMI, BMR, TDEE, daily calories and macro split for cutting, maintenance or bulking. Free, accurate and instant — no sign-up needed.',
    h1: 'Free Health & Fitness Calculators',
    intro:
      'Work out the numbers your training depends on: BMI, basal metabolic rate, total daily energy expenditure, your calorie target for cutting or bulking, and the macro split to hit it. Each calculator explains what the result means and what to do next, so the number is actually useful.',
  },
  {
    path: '/calculators/bmi',
    title: 'BMI Calculator — Body Mass Index for Men & Women — FitSmart',
    description:
      'Free BMI calculator. Enter height and weight to get your body mass index, the category it falls in, and what the number does and does not tell you.',
    h1: 'BMI Calculator',
    intro:
      'Body mass index compares your weight to your height. It is a screening number, not a diagnosis — useful for spotting a trend across a population, blunt for any single person.',
  },
  {
    path: '/calculators/bmr',
    title: 'BMR Calculator — Basal Metabolic Rate in Calories — FitSmart',
    description:
      'Free BMR calculator using the Mifflin-St Jeor equation. Find the calories your body burns at complete rest, before any activity is added.',
    h1: 'BMR Calculator',
    intro:
      'Basal metabolic rate is what you burn doing nothing at all — breathing, circulation, keeping warm. It is the floor under every calorie target, and eating below it for long is how people stall.',
  },
  {
    path: '/calculators/tdee',
    title: 'TDEE Calculator — Daily Calories You Actually Burn — FitSmart',
    description:
      'Free TDEE calculator. Combine your BMR with your activity level to find total daily energy expenditure, then set a calorie target for cutting, maintaining or bulking.',
    h1: 'TDEE Calculator',
    intro:
      'Total daily energy expenditure is everything you burn in a day — resting metabolism plus training, walking, fidgeting and digesting. It is the number every calorie target should be built from.',
  },
  {
    path: '/calculators/body-fat',
    title: 'Body Fat Percentage Calculator — Estimate Without Callipers — FitSmart',
    description:
      'Free body fat calculator. Estimate your body fat percentage and lean mass from height, weight, age and sex — no callipers or scan needed.',
    h1: 'Body Fat Calculator',
    intro:
      'Body fat percentage answers what BMI cannot: how much of your weight is fat and how much is everything else. Two people at the same BMI can sit ten points apart here.',
  },
  {
    path: '/calculators/ideal-weight',
    title: 'Ideal Weight Calculator — Healthy Weight for Your Height — FitSmart',
    description:
      'Free ideal weight calculator. Find a healthy weight range for your height and frame, and see why it is a range rather than a single number.',
    h1: 'Ideal Weight Calculator',
    intro:
      'Ideal weight is a range, not a target you must hit. It is a reference point for a healthy weight at your height — where you sit inside it depends on how much muscle you carry.',
  },
  {
    path: '/calculators/macros',
    title: 'Macro Calculator — Protein, Carbs & Fat Targets — FitSmart',
    description:
      'Free macro calculator. Get daily protein, carbohydrate and fat targets for fat loss, maintenance or muscle gain, based on your calories and goal.',
    h1: 'Macro Calculator',
    intro:
      'Calories decide whether weight moves; macros decide what that weight is. Enough protein in a deficit is the difference between losing fat and losing muscle along with it.',
  },
  {
    path: '/workouts',
    title: 'Free Workout Plans & Exercise Guides — FitSmart',
    description:
      'Structured workout plans for strength, fat loss and general fitness, with proper form guidance for every exercise. Free, no-equipment options included.',
    h1: 'Free Workout Plans & Exercise Guides',
    intro:
      'Structured routines for strength, fat loss, muscle gain and general conditioning, whether you train in a gym or at home with no equipment. Each plan sets out the sets, reps and progression, and every exercise comes with form guidance so you train safely.',
  },
  {
    path: '/nutrition',
    title: 'Nutrition Guides, Macros & Meal Plans — FitSmart',
    description:
      'Evidence-based nutrition guides: how to set macros, plan meals, hit a calorie deficit for fat loss, and eat enough protein — without fad diets.',
    h1: 'Evidence-Based Nutrition Guides',
    intro:
      'Nutrition explained without the fads: how to set your macros, build a calorie deficit that you can actually sustain, get enough protein, plan meals around your schedule, and understand which supplements are worth the money and which are not.',
  },
  {
    path: '/programs',
    title: 'Training Programs for Strength & Fat Loss — FitSmart',
    description:
      'Complete multi-week training programs for beginners, fat loss and strength. Follow a plan with clear progression instead of guessing each session.',
    h1: 'Structured Training Programs',
    intro:
      'Complete multi-week programs that tell you exactly what to do each session, with built-in progression so you keep improving. Choose a beginner foundation, a fat-loss block or a strength cycle, and follow it rather than improvising every time you train.',
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
    title: 'Fitness & Nutrition Articles — FitSmart',
    description:
      'Practical articles on training, nutrition and health science — including HIIT versus steady-state cardio, protein intake and recovery.',
    h1: 'Fitness & Nutrition Articles',
    intro:
      'Practical, research-backed articles on the questions people actually ask: HIIT versus steady-state cardio for fat loss, how much protein you really need, how long recovery should take, and which training variables matter most.',
  },
  {
    path: '/about',
    title: 'About — FitSmart',
    description:
      'FitSmart builds free, evidence-based fitness calculators, workout plans and nutrition guides. Learn what we build and the principles behind it.',
    h1: 'About FitSmart',
    intro:
      'FitSmart builds free fitness tools grounded in evidence rather than trends: calculators that show their working, training plans with real progression, and nutrition guidance that does not depend on buying anything.',
  },
  {
    path: '/contact',
    title: 'Contact — FitSmart',
    description: 'Get in touch with the FitSmart team with a question, a correction or a partnership enquiry.',
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
    title: 'Help Center — FitSmart',
    description: 'Answers to common questions about FitSmart calculators, workout plans, accounts and the AI coach.',
    h1: 'Help & Frequently Asked Questions',
    intro: 'Common questions about the calculators, the training plans, accounts and the AI coach, answered in one place.',
  },
  // Legal and utility routes. These need unique titles mainly so they stop
  // competing with the homepage in search — /disclaimer and /contact were
  // outranking it purely because every route shipped identical HTML.
  { path: '/privacy', title: 'Privacy Policy — FitSmart', description: 'How FitSmart collects, uses and protects your data.', h1: 'Privacy Policy', intro: 'How FitSmart collects, uses and protects your personal data.' },
  { path: '/terms', title: 'Terms & Conditions — FitSmart', description: 'The terms that apply when you use FitSmart.', h1: 'Terms of Service', intro: 'The terms that apply when you use the FitSmart website and tools.' },
  { path: '/cookies', title: 'Cookie Policy — FitSmart', description: 'Which cookies FitSmart uses and how to control them.', h1: 'Cookie Policy', intro: 'Which cookies FitSmart uses, what they do, and how you can control them.' },
  { path: '/disclaimer', title: 'Disclaimer — FitSmart', description: 'FitSmart provides general fitness information, not medical advice.', h1: 'Medical Disclaimer', intro: 'FitSmart provides general fitness and nutrition information. It is not medical advice — speak to a qualified professional before changing your training or diet.' },
  { path: '/accessibility', title: 'Accessibility — FitSmart', description: 'How FitSmart works towards an accessible experience for everyone.', h1: 'Accessibility Statement', intro: 'How FitSmart works towards an accessible experience, and how to report a barrier you hit.' },
  { path: '/careers', title: 'Careers — FitSmart', description: 'Open roles and how to get in touch about working with FitSmart.', h1: 'Careers at FitSmart', intro: 'Open roles and how to get in touch about working with us.' },
  { path: '/press', title: 'Press & Media — FitSmart', description: 'Brand assets and press enquiries for FitSmart.', h1: 'Press & Media', intro: 'Brand assets, background and press enquiries.' },
  { path: '/sitemap', title: 'Sitemap — FitSmart', description: 'Every page on FitSmart in one list.', h1: 'Sitemap', intro: 'Every page on FitSmart, in one list.' },
];

const NAV =
  '<nav aria-label="Sections">' +
  '<a href="/calculators">Health calculators</a> · ' +
  '<a href="/workouts">Workout plans</a> · ' +
  '<a href="/programs">Training programs</a> · ' +
  '<a href="/nutrition">Nutrition guides</a> · ' +
  '<a href="/ai-coach">AI coach</a> · ' +
  '<a href="/blog">Articles</a>' +
  '</nav>';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

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

  // Crawlable body per route. React replaces #root's children on mount, so this
  // is only ever seen by non-JS crawlers and the first Google pass.
  const sectionsHtml = (route.sections || [])
    .map((s) =>
      `<h2 style="font-size:20px;margin:28px 0 10px">${esc(s.h2)}</h2>` +
      `<ul style="font-size:15px;line-height:1.6;color:#444;padding-left:20px">${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`,
    )
    .join('');
  const seoBlock =
    `<div id="prerender-seo" style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">` +
    `<h1 style="font-size:30px;line-height:1.2;margin:0 0 14px">${esc(route.h1)}</h1>` +
    `<p style="font-size:17px;line-height:1.6;color:#444">${esc(route.intro)}</p>` +
    `${sectionsHtml}${NAV}</div>`;
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
const priorityFor = (path) => {
  if (path === '/') return '1.0';
  if (/^\/(workouts|nutrition|calculators|programs)$/.test(path)) return '0.9';
  if (path.startsWith('/calculators/')) return '0.8';
  if (/^\/(ai-coach|blog|about)$/.test(path)) return '0.7';
  if (/^\/(privacy|terms|cookies|disclaimer|accessibility|careers|press|sitemap)$/.test(path)) return '0.3';
  return '0.5';
};
const changefreqFor = (path) =>
  path === '/blog' ? 'daily' : /^\/(privacy|terms|cookies|disclaimer|accessibility)$/.test(path) ? 'yearly' : 'monthly';

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ROUTES
    .map(
      (r) =>
        `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod>` +
        `<changefreq>${changefreqFor(r.path)}</changefreq><priority>${priorityFor(r.path)}</priority></url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join('public', 'sitemap.xml'), sitemap);
console.log(`sitemap.xml: ${ROUTES.length} urls`);
