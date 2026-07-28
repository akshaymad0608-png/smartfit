import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Sparkles, Target } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { WorkoutCard } from '@/components/cards/WorkoutCard';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { workoutCategories, workouts } from '@/data/workouts';
import { cn } from '@/lib/cn';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;

export default function Workouts() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('cat') ?? 'all';
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('All');

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

  const spotlight = filtered[0] ?? workouts[0];

  return (
    <PageTransition>
      <Seo
        title="Workouts"
        description="Browse hundreds of guided workouts by goal, difficulty and equipment — home, gym, HIIT, strength, cardio, yoga and more."
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

        {/* Spotlight detail */}
        {spotlight && (
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
                <div className="grid aspect-video place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-card text-primary shadow-soft">
                    <Dumbbell size={26} />
                  </span>
                  <span className="sr-only">Video placeholder for {spotlight.name}</span>
                </div>
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
