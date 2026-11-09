import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, TriangleAlert } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema, faqSchema } from '@/seo/schema';
import { muscleGroups, posterFor, videoFitClass } from '@/data/muscles';
import { exerciseCues, muscleGuides } from '@/data/muscleGuides';
import { MuscleDiagram } from '@/components/illustrations/MuscleDiagram';
import { MotionGuide } from '@/features/motion3d/MotionGuide';
import { APPROXIMATE_MOTION, EXERCISE_MOTION } from '@/features/motion3d/motions';

/**
 * One muscle group, given its own URL: what it does, how to train it, a form
 * cue and demo clip per exercise, and the mistakes to avoid. The exercise list
 * and videos come from data/muscles.ts, the words from data/muscleGuides.ts —
 * prerender.mjs reads the same two files so the static HTML matches.
 */
export default function ExerciseDetail() {
  const { key } = useParams();
  const group = muscleGroups.find((m) => m.key === key);
  const guide = key ? muscleGuides[key] : undefined;

  if (!group || !guide) return <Navigate to="/exercises" replace />;

  const label = group.label;
  const others = muscleGroups.filter((m) => m.key !== group.key);
  const moves = group.exercises
    .filter((e) => EXERCISE_MOTION[e.name])
    .map((e) => ({
      title: e.name,
      motion: EXERCISE_MOTION[e.name],
      muscles: [group.key],
      approximate: APPROXIMATE_MOTION.has(e.name),
    }));

  return (
    <PageTransition>
      <Seo
        title={`${label} Exercises — Form Cues, Sets and Reps`}
        description={`Best ${label.toLowerCase()} exercises with form cues, demo videos, how many sets and reps to do, and the mistakes to avoid. Free, no sign-up.`}
        path={`/exercises/${group.key}`}
        keywords={[`${label.toLowerCase()} exercises`, `${label.toLowerCase()} workout`, `how to train ${label.toLowerCase()}`, 'gym exercises']}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Exercises', path: '/exercises' },
            { name: `${label} exercises`, path: `/exercises/${group.key}` },
          ]),
          faqSchema(guide.faqs.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      <PageHero
        eyebrow="Exercise library"
        title={`${label} exercises`}
        subtitle={guide.intro}
        crumbs={[{ label: 'Exercises', href: '/exercises' }, { label }]}
      />

      <Section spacing="md">
        <div className="mb-10 flex items-center gap-6 rounded-3xl border border-line bg-card p-5 sm:max-w-md">
          <MuscleDiagram muscle={group.key} className="h-40 w-40 shrink-0 rounded-2xl bg-surface-muted" />
          <p className="text-sm text-muted">
            <strong className="text-heading">Muscle worked:</strong> {label.toLowerCase()}, highlighted in
            blue on the body chart.
          </p>
        </div>
        {moves.length > 0 && (
          <div className="mb-12">
            <h2 className="text-section font-extrabold text-heading">3D movement guide</h2>
            <p className="mt-2 text-sm text-muted">
              Pick an exercise and watch the figure do it. The {label.toLowerCase()} glow blue as they work.
            </p>
            <MotionGuide moves={moves} className="mt-6" />
          </div>
        )}
        <h2 className="text-section font-extrabold text-heading">
          {label} exercises with form cues
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {group.exercises.map((ex) => (
            <Reveal key={ex.name}>
              <Card className="h-full overflow-hidden p-0">
                <video
                  className={`aspect-video w-full ${videoFitClass(ex.video)}`}
                  src={ex.video}
                  poster={posterFor(ex.video)}
                  controls
                  muted
                  playsInline
                  preload="none"
                  aria-label={`${ex.name} demo`}
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-heading">{ex.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {exerciseCues[ex.name] ?? 'Move through a full range of motion under control.'}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="md" muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-6">
              <h2 className="flex items-center gap-2 font-bold text-heading">
                <Lightbulb size={18} className="text-primary" /> How to train {label.toLowerCase()}
              </h2>
              <ul className="mt-4 space-y-3">
                {guide.howToTrain.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal>
            <Card className="h-full p-6">
              <h2 className="flex items-center gap-2 font-bold text-heading">
                <TriangleAlert size={18} className="text-accent" /> Common mistakes
              </h2>
              <ul className="mt-4 space-y-3">
                {guide.mistakes.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section spacing="md">
        <h2 className="text-section font-extrabold text-heading">Common questions</h2>
        <dl className="mt-6 grid gap-6 md:grid-cols-2">
          {guide.faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-heading">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{f.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <h2 className="font-bold text-heading">Put it into a plan</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/programs"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
            >
              Follow a training program <ArrowRight size={14} />
            </Link>
            <Link
              to="/calculators/protein"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
            >
              Work out your protein target <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-bold text-heading">Other muscle groups</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((m) => (
              <Link
                key={m.key}
                to={`/exercises/${m.key}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
              >
                {m.label} exercises
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
