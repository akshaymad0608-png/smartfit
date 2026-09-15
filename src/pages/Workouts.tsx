import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, Target, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { WorkoutCard } from '@/components/cards/WorkoutCard';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { VideoModal } from '@/components/ui/VideoModal';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { workoutCategories, workouts } from '@/data/workouts';
import { muscleGroups } from '@/data/muscles';
import { MuscleDiagram } from '@/components/illustrations/MuscleDiagram';
import { cn } from '@/lib/cn';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;

/** Map a workout category to its demo clip (falls back to the general workout). */
const categoryVideo: Record<string, string> = {
  yoga: '/videos/yoga.mp4',
  stretching: '/videos/yoga.mp4',
  cardio: '/videos/cardio.mp4',
};
const videoFor = (category: string) => categoryVideo[category] ?? '/videos/workout.mp4';

export default function Workouts() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('cat') ?? 'all';
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('All');
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeMuscle, setActiveMuscle] = useState<string | null>(null);
  const [muscleExerciseIndex, setMuscleExerciseIndex] = useState(0);
  const activeMuscleGroup = muscleGroups.find((m) => m.key === activeMuscle) ?? null;
  const activeMuscleExercise = activeMuscleGroup?.exercises[muscleExerciseIndex] ?? null;
  const openMuscle = (key: string) => {
    setActiveMuscle(key);
    setMuscleExerciseIndex(0);
  };

  const setCat = (key: string) => {
    const next = new URLSearchParams(params);
    if (key === 'all') next.delete('cat');
    else next.set('cat', key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(
    () =>
      workouts.filter(
        (w) =>
          (activeCat === 'all' || w.category === activeCat) &&
          (difficulty === 'All' || w.difficulty === difficulty),
      ),
    [activeCat, difficulty],
  );

  // WorkoutCard links to /workouts?w=<slug> — every card used to link to
  // /workouts#<slug>, which nothing here ever read, so clicking any card
  // just reloaded the listing showing whichever workout happened to be
  // first. This reads the param so the clicked workout is the one that
  // actually opens in the spotlight.
  const requestedSlug = params.get('w');
  const spotlight =
    (requestedSlug && workouts.find((w) => w.slug === requestedSlug)) || filtered[0] || workouts[0];
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (requestedSlug) spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Only run when navigating to a specific workout, not on every filter change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedSlug]);

  return (
    <PageTransition>
      <Seo
        title="Free Workout Plans & Exercise Guides"
        description="Structured workout plans for strength, fat loss and general fitness, with proper form guidance for every exercise. Free, no-equipment options included."
        path="/workouts"
        keywords={['home workout', 'gym workout', 'HIIT', 'strength', 'cardio', 'exercise guide']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Workouts', path: '/workouts' },
        ])}
      />
      <PageHero
        eyebrow="Workouts"
        title="Find your next workout"
        subtitle="Filter by category and difficulty. Every workout lists duration, calories, equipment, target muscles and step-by-step instructions."
        crumbs={[{ label: 'Workouts' }]}
      />

      <Section spacing="md">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          <FilterChip active={activeCat === 'all'} onClick={() => setCat('all')} label="All" />
          {workoutCategories.map((cat) => (
            <FilterChip
              key={cat.key}
              active={activeCat === cat.key}
              onClick={() => setCat(cat.key)}
              label={cat.label}
            />
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-muted">Difficulty:</span>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                'flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors',
                difficulty === d
                  ? 'bg-primary text-white'
                  : 'text-body hover:bg-surface-muted',
              )}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Gym: per-muscle demo clips — the gym category has only one
            workout covering four muscle groups at once, so this gives a
            quick form-check clip for each muscle independent of the
            single workout in the spotlight below. */}
        {activeCat === 'gym' && (
          <Reveal className="mt-8">
            <Card className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-heading">Watch exercises by muscle group</h2>
                  <p className="mt-1 text-sm text-muted">
                    Quick form-check clips for the muscles a gym session trains.
                  </p>
                </div>
                <Link
                  to="/exercises"
                  className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Browse all exercises <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {muscleGroups.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => openMuscle(m.key)}
                    className="group block w-full rounded-xl border border-line bg-card p-2.5 text-center transition-colors hover:border-primary/40"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-surface-muted">
                      <MuscleDiagram
                        muscle={m.key}
                        className="aspect-square w-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition-all group-hover:bg-slate-950/10 group-hover:opacity-100">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-primary shadow-soft">
                          <Play size={13} className="ml-0.5" />
                        </span>
                      </span>
                    </div>
                    <span className="mt-2 block text-sm font-bold text-primary">{m.label}</span>
                  </button>
                ))}
              </div>
            </Card>
          </Reveal>
        )}

        {/* Spotlight detail */}
        {spotlight && (
          <div ref={spotlightRef}>
          <Reveal className="mt-10">
            <Card className="grid gap-8 p-8 lg:grid-cols-2">
              <div>
                <Badge tone="primary" className="mb-3">
                  <Sparkles size={13} /> Spotlight
                </Badge>
                <h2 className="text-section font-extrabold text-heading">{spotlight.name}</h2>
                <p className="mt-3 text-body">{spotlight.summary}</p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Metric label="Duration" value={`${spotlight.durationMin} min`} />
                  <Metric label="Calories" value={`${spotlight.calories}`} />
                  <Metric label="Level" value={spotlight.difficulty} />
                  <Metric label="Equipment" value={spotlight.equipment[0]} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {spotlight.muscles.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-body"
                    >
                      <Target size={12} className="text-primary" /> {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <button
                  onClick={() => setVideoOpen(true)}
                  aria-label={`Play ${spotlight.name} demo video`}
                  className="group/vid relative block aspect-video w-full overflow-hidden rounded-2xl bg-surface-muted"
                >
                  <img
                    src={spotlight.image}
                    alt={`${spotlight.name} workout`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/vid:scale-105"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-slate-950/25 transition-colors group-hover/vid:bg-slate-950/35">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-card/90 text-primary shadow-soft backdrop-blur transition-transform group-hover/vid:scale-110">
                      <Play size={24} className="ml-1" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    Watch demo
                  </span>
                </button>
                <div>
                  <h3 className="font-bold text-heading">How to do it</h3>
                  <ol className="mt-3 space-y-2">
                    {spotlight.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-body">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <MiniList title="Benefits" items={spotlight.benefits} />
                  <MiniList title="Coach tips" items={spotlight.tips} />
                </div>
              </div>
            </Card>
          </Reveal>
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </motion.div>
        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-line py-16 text-center">
            <p className="font-semibold text-heading">No workouts match those filters.</p>
            <p className="mt-1 text-sm text-muted">Try a different category or difficulty.</p>
          </div>
        )}
      </Section>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={videoFor(spotlight.category)}
        poster={spotlight.image}
        title={`${spotlight.name} demo`}
      />
      <VideoModal
        open={activeMuscle !== null}
        onClose={() => setActiveMuscle(null)}
        src={activeMuscleExercise?.video ?? ''}
        poster={activeMuscleGroup?.image}
        title={activeMuscleExercise ? `${activeMuscleExercise.name} — ${activeMuscleGroup?.label}` : undefined}
        footer={
          activeMuscleGroup && activeMuscleGroup.exercises.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {activeMuscleGroup.exercises.map((ex, i) => (
                <button
                  key={ex.name}
                  onClick={() => setMuscleExerciseIndex(i)}
                  className={`flex min-h-11 items-center rounded-full px-3.5 text-xs font-semibold transition-colors ${
                    i === muscleExerciseIndex
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {ex.name}
                </button>
              ))}
            </div>
          ) : undefined
        }
      />
    </PageTransition>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors',
        active
          ? 'border-primary bg-primary text-white'
          : 'border-line bg-card text-body hover:border-primary/40',
      )}
    >
      {label}
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-muted p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 font-bold text-heading">{value}</p>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-heading">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="text-sm text-muted">
            • {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
