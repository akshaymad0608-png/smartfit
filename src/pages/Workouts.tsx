import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, Target } from 'lucide-react';
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
import { cn } from '@/lib/cn';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;

/** Map a workout category to its demo clip (falls back to the general workout). */
const categoryVideo: Record<string, string> = {
  yoga: '/videos/yoga.mp4',
  stretching: '/videos/yoga.mp4',
  cardio: '/videos/cardio.mp4',
};
const videoFor = (category: string) => categoryVideo[category] ?? '/videos/workout.mp4';

/**
 * Muscle-group demo clips for the Gym Workout filter. The gym category only
 * has one workout (Push-Pull Power) covering four muscle groups at once, so
 * this gives a quick per-muscle form-check clip independent of which single
 * workout is in the spotlight. Free stock footage — Mixkit Stock Video Free
 * License for most, Pexels License for triceps/calves (both free for
 * commercial use, no attribution required). Triceps and calves needed a
 * second source: Mixkit's library had nothing that actually showed the
 * right exercise for those two (calf-raise searches returned literal baby
 * cows), so those two came from Pexels instead, each verified against the
 * exact video ID's own metadata before downloading — not just a plausible
 * filename — so the clip showing is the exercise it's labelled as.
 */
const muscleVideos: Record<string, { label: string; src: string }> = {
  chest: { label: 'Chest', src: '/videos/muscles/chest.mp4' },
  back: { label: 'Back', src: '/videos/muscles/back.mp4' },
  shoulders: { label: 'Shoulders', src: '/videos/muscles/shoulders.mp4' },
  biceps: { label: 'Biceps', src: '/videos/muscles/biceps.mp4' },
  triceps: { label: 'Triceps', src: '/videos/muscles/triceps.mp4' },
  abs: { label: 'Abs', src: '/videos/muscles/abs.mp4' },
  quads: { label: 'Quads', src: '/videos/muscles/quads.mp4' },
  hamstrings: { label: 'Hamstrings', src: '/videos/muscles/hamstrings.mp4' },
  glutes: { label: 'Glutes', src: '/videos/muscles/glutes.mp4' },
  calves: { label: 'Calves', src: '/videos/muscles/calves.mp4' },
};

export default function Workouts() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('cat') ?? 'all';
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('All');
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeMuscle, setActiveMuscle] = useState<string | null>(null);

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
                'rounded-full px-3 py-1 text-sm font-medium transition-colors',
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
              <h2 className="font-bold text-heading">Watch exercises by muscle group</h2>
              <p className="mt-1 text-sm text-muted">
                Quick form-check clips for the muscles a gym session trains.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {Object.entries(muscleVideos).map(([key, m]) => (
                  <button
                    key={key}
                    onClick={() => setActiveMuscle(key)}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface-muted p-4 text-center transition-colors hover:border-primary/40"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-card text-primary shadow-soft transition-transform group-hover:scale-110">
                      <Play size={18} className="ml-0.5" />
                    </span>
                    <span className="text-sm font-semibold text-heading">{m.label}</span>
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
        src={activeMuscle ? muscleVideos[activeMuscle].src : ''}
        title={activeMuscle ? `${muscleVideos[activeMuscle].label} exercise demo` : undefined}
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
        'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
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
