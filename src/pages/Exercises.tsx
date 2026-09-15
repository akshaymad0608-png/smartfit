import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  Play,
  Home,
  Flame as FlameCat,
  Sparkles,
  Gauge,
  HeartPulse,
  Timer,
  Leaf,
  Waves,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { VideoModal } from '@/components/ui/VideoModal';
import { WorkoutCard } from '@/components/cards/WorkoutCard';
import { MuscleDiagram } from '@/components/illustrations/MuscleDiagram';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { muscleGroups } from '@/data/muscles';
import { workoutCategories, workouts } from '@/data/workouts';

const categoryIcons: Record<string, typeof Dumbbell> = {
  home: Home,
  gym: Dumbbell,
  'weight-loss': FlameCat,
  'muscle-gain': Sparkles,
  strength: Gauge,
  cardio: HeartPulse,
  hiit: Timer,
  yoga: Leaf,
  stretching: Waves,
};

/**
 * A dedicated, browsable "exercises by muscle group" page — the same
 * picker already embedded in the Gym Workout filter on /workouts, given
 * its own URL and a proper icon + photo per muscle instead of being
 * tucked behind a filter click. Same real, verified video/image sources
 * as the Workouts page (see data/muscles.ts) — nothing invented here.
 */
export default function Exercises() {
  const [active, setActive] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const activeGroup = muscleGroups.find((m) => m.key === active) ?? null;
  const activeExercise = activeGroup?.exercises[exerciseIndex] ?? null;

  const openMuscle = (key: string) => {
    setActive(key);
    setExerciseIndex(0);
  };

  return (
    <PageTransition>
      <Seo
        title="Exercises by Muscle Group"
        description="Browse form-check exercise videos by muscle group — chest, back, shoulders, arms, abs and legs. Free, no sign-up."
        path="/exercises"
        keywords={['exercises by muscle', 'gym exercises', 'workout videos', 'chest exercises', 'leg exercises']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Exercises', path: '/exercises' },
        ])}
      />
      {/* Bold photo hero + stats strip, matching the "exercise database" feel
          of dedicated exercise-library sites — but with FitSmart's own real
          photo and real counts (10 muscle groups, 9 categories, 6 workouts),
          not invented numbers. */}
      <section className="relative overflow-hidden">
        <img
          src="/images/muscles/chest.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <Container className="relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight size={14} aria-hidden />
                <span className="font-medium text-white">Exercises</span>
              </li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-primary-300">
              Exercise library
            </span>
            <h1 className="text-hero font-extrabold text-white">Exercises by muscle group</h1>
            <p className="mt-4 text-body-lg text-white/85">
              Pick a muscle group to see a real exercise demo — quick form-check clips, free and no
              sign-up.
            </p>
          </div>
        </Container>
      </section>
      <div className="border-b border-line bg-surface-muted">
        <Container>
          <div className="grid grid-cols-3 divide-x divide-line py-8 text-center">
            <div>
              <p className="text-hero font-extrabold text-gradient">
                <Counter value={muscleGroups.length} />
              </p>
              <p className="mt-1 text-sm font-semibold text-muted">Muscle groups</p>
            </div>
            <div>
              <p className="text-hero font-extrabold text-gradient">
                <Counter value={workoutCategories.length} />
              </p>
              <p className="mt-1 text-sm font-semibold text-muted">Categories</p>
            </div>
            <div>
              <p className="text-hero font-extrabold text-gradient">
                <Counter value={workouts.length} />
              </p>
              <p className="mt-1 text-sm font-semibold text-muted">Full workouts</p>
            </div>
          </div>
        </Container>
      </div>

      <Section spacing="md">
        <SectionHeader
          eyebrow="Form check"
          title="Browse by muscle group"
          subtitle="Choose the muscle group you want to target — each opens a real exercise demo."
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {muscleGroups.map((m, i) => (
            <Reveal key={m.key} delay={i * 0.03}>
              <button
                onClick={() => openMuscle(m.key)}
                className="group block w-full rounded-2xl border border-line bg-card p-4 text-center shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <div className="relative overflow-hidden rounded-xl bg-surface-muted">
                  <MuscleDiagram
                    muscle={m.key}
                    className="aspect-square w-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition-all group-hover:bg-slate-950/10 group-hover:opacity-100">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-primary shadow-soft">
                      <Play size={16} className="ml-0.5" />
                    </span>
                  </span>
                </div>
                <span className="mt-3 block text-sm font-bold text-primary">{m.label}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {m.exercises.length} exercise{m.exercises.length !== 1 ? 's' : ''}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <SectionHeader eyebrow="By goal" title="Browse by category" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {workoutCategories.map((cat) => {
            const Icon = categoryIcons[cat.key] ?? Dumbbell;
            return (
              <Link
                key={cat.key}
                to={`/workouts?cat=${cat.key}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-card p-5 text-center shadow-soft transition-colors hover:border-primary/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-bold text-heading">{cat.label}</span>
                <span className="text-xs text-muted">{cat.description}</span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section spacing="md">
        <SectionHeader eyebrow="Full routines" title="Popular workouts" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </Section>

      <VideoModal
        open={activeGroup !== null}
        onClose={() => setActive(null)}
        src={activeExercise?.video ?? ''}
        poster={activeGroup?.image}
        title={activeExercise ? `${activeExercise.name} — ${activeGroup?.label}` : undefined}
        footer={
          activeGroup && activeGroup.exercises.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {activeGroup.exercises.map((ex, i) => (
                <button
                  key={ex.name}
                  onClick={() => setExerciseIndex(i)}
                  className={`min-h-9 rounded-full px-3.5 text-xs font-semibold transition-colors ${
                    i === exerciseIndex
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
