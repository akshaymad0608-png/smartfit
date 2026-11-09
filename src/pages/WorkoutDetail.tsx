import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Dumbbell, Flame, Target } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { WorkoutCard } from '@/components/cards/WorkoutCard';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { site } from '@/config/site';
import { workoutCategories, workouts } from '@/data/workouts';
import { posterFor } from '@/data/muscles';
import { yogaPoses } from '@/data/yogaPoses';
import { YogaPose } from '@/components/illustrations/YogaPose';
import type { Workout } from '@/types';

/**
 * A single workout, given its own URL. Before this every card linked to
 * /workouts?w=<slug>, which is one page with a query string — nothing for a
 * search engine to index per workout. The content is the workout's own data
 * (instructions, tips, benefits); prerender.mjs reads the same file.
 */
/** Keep the meta description under 160 characters, same rule as prerender.mjs. */
const workoutDescription = (w: Workout) => {
  const full = `${w.summary} ${w.durationMin} min, ${w.difficulty.toLowerCase()}, ${w.equipment.join(', ').toLowerCase()}.`;
  if (full.length <= 160) return full;
  if (w.summary.length <= 160) return w.summary;
  return `${w.summary.slice(0, 157).replace(/\s+\S*$/, '')}...`;
};

export default function WorkoutDetail() {
  const { slug } = useParams();
  const workout = workouts.find((w) => w.slug === slug);

  if (!workout) return <Navigate to="/workouts" replace />;

  const category = workoutCategories.find((c) => c.key === workout.category);
  const related = workouts.filter((w) => w.slug !== workout.slug).slice(0, 3);

  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: workout.name,
    description: workout.summary,
    totalTime: `PT${workout.durationMin}M`,
    image: `${site.url}${workout.image}`,
    step: workout.instructions.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text,
    })),
  };

  return (
    <PageTransition>
      <Seo
        title={`${workout.name} — ${workout.durationMin}-Minute ${category?.label ?? 'Workout'}`}
        description={workoutDescription(workout)}
        path={`/workouts/${workout.slug}`}
        image={`${site.url}${workout.image}`}
        keywords={[workout.name.toLowerCase(), `${category?.label.toLowerCase() ?? 'workout'} plan`, 'free workout']}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Workouts', path: '/workouts' },
            { name: workout.name, path: `/workouts/${workout.slug}` },
          ]),
          howTo,
        ]}
      />

      <PageHero
        eyebrow={category?.label ?? 'Workout'}
        title={workout.name}
        subtitle={workout.summary}
        crumbs={[{ label: 'Workouts', href: '/workouts' }, { label: workout.name }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-body">
          <Badge tone="primary">{workout.difficulty}</Badge>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={15} className="text-muted" /> {workout.durationMin} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame size={15} className="text-accent" /> about {workout.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Dumbbell size={15} className="text-muted" /> {workout.equipment.join(', ')}
          </span>
        </div>
      </PageHero>

      <Section spacing="md">
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <Reveal>
            <h2 className="text-section font-extrabold text-heading">How to do this workout</h2>
            <ol className="mt-6 space-y-4">
              {workout.instructions.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-body">{step}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-section font-extrabold text-heading">Coaching tips</h2>
            <ul className="mt-4 space-y-3">
              {workout.tips.map((t) => (
                <li key={t} className="flex gap-2.5 text-body">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <Card className="p-6">
              <h2 className="flex items-center gap-2 font-bold text-heading">
                <Target size={18} className="text-primary" /> Focus: {workout.focus}
              </h2>
              <h3 className="mt-5 text-sm font-semibold text-heading">Muscles worked</h3>
              <p className="mt-1 text-sm text-muted">{workout.muscles.join(', ')}</p>
              <h3 className="mt-5 text-sm font-semibold text-heading">Benefits</h3>
              <ul className="mt-2 space-y-2">
                {workout.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {workout.videos && workout.videos.length > 0 && (
          <div className="mt-14">
            <h2 className="text-section font-extrabold text-heading">Watch the moves</h2>
            <p className="mt-2 text-sm text-muted">
              Short demo clips of the exercises in this workout. Tap play; they stay silent.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workout.videos.map((v) => (
                <Reveal key={v.src}>
                  <Card className="overflow-hidden p-0">
                    <video
                      className="aspect-video w-full bg-surface-muted object-cover"
                      src={v.src}
                      poster={posterFor(v.src)}
                      controls
                      muted
                      playsInline
                      preload="none"
                      aria-label={`${v.title} demo`}
                    />
                    <p className="p-4 text-sm font-semibold text-heading">{v.title}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {workout.poses && workout.poses.length > 0 && (
          <div className="mt-14">
            <h2 className="text-section font-extrabold text-heading">Poses in this flow</h2>
            <p className="mt-2 text-sm text-muted">
              Move through them in this order, matching each movement to your breath. Never push
              into pain; use a blanket or block to make any pose easier.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workout.poses
                .map((id) => yogaPoses.find((p) => p.id === id))
                .filter((p): p is (typeof yogaPoses)[number] => Boolean(p))
                .map((pose, i) => (
                  <Reveal key={pose.id}>
                    <Card className="h-full p-5">
                      <div className="overflow-hidden rounded-2xl bg-surface-muted">
                        <YogaPose pose={pose.id} className="aspect-[8/5] w-full" />
                      </div>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                        Pose {i + 1} · {pose.sanskrit}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-heading">{pose.name}</h3>
                      <ul className="mt-3 space-y-2">
                        {pose.cues.map((c) => (
                          <li key={c} className="flex gap-2 text-sm text-body">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {c}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-sm text-muted">
                        <strong className="text-heading">Breath:</strong> {pose.breath}
                      </p>
                      <p className="mt-1 text-xs text-muted">{pose.caution}</p>
                    </Card>
                  </Reveal>
                ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/calculators/calorie"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
          >
            Set your daily calories <ArrowRight size={14} />
          </Link>
          <Link
            to="/programs"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
          >
            See full training programs <ArrowRight size={14} />
          </Link>
          <Link
            to="/exercises"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
          >
            Browse exercises by muscle <ArrowRight size={14} />
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted">
          Check with a doctor before starting if you have a medical condition, injury or pain.
          Calories shown are rough estimates and vary with body weight and effort.
        </p>
      </Section>

      <Section spacing="md" muted>
        <h2 className="text-section font-extrabold text-heading">More workouts</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
