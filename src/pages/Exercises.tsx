import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dumbbell,
  ArrowUpFromLine,
  CircleDot,
  Zap,
  Flame,
  Hexagon,
  Footprints,
  Activity,
  PersonStanding,
  TrendingUp,
  Play,
  Home,
  Flame as FlameCat,
  Sparkles,
  Gauge,
  HeartPulse,
  Timer,
  Leaf,
  Waves,
} from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { VideoModal } from '@/components/ui/VideoModal';
import { WorkoutCard } from '@/components/cards/WorkoutCard';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { muscleGroups } from '@/data/muscles';
import { workoutCategories, workouts } from '@/data/workouts';

const icons: Record<string, typeof Dumbbell> = {
  chest: Dumbbell,
  back: ArrowUpFromLine,
  shoulders: CircleDot,
  biceps: Zap,
  triceps: Flame,
  abs: Hexagon,
  quads: Footprints,
  hamstrings: Activity,
  glutes: PersonStanding,
  calves: TrendingUp,
};

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
  const activeGroup = muscleGroups.find((m) => m.key === active) ?? null;

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
        <SectionHeader eyebrow="Form check" title="Browse by muscle group" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {muscleGroups.map((m, i) => {
            const Icon = icons[m.key] ?? Dumbbell;
            return (
              <Reveal key={m.key} delay={i * 0.03}>
                <button
                  onClick={() => setActive(m.key)}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-muted text-left shadow-soft transition-transform hover:-translate-y-1"
                >
                  <img
                    src={m.image}
                    alt={`${m.label} exercise`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                  <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary shadow-soft backdrop-blur">
                    <Icon size={17} />
                  </span>
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Play size={15} className="ml-0.5" />
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 text-base font-bold text-white">
                    {m.label}
                  </span>
                </button>
              </Reveal>
            );
          })}
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
        src={activeGroup?.video ?? ''}
        poster={activeGroup?.image}
        title={activeGroup ? `${activeGroup.label} exercise demo` : undefined}
      />
    </PageTransition>
  );
}
