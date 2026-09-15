import { useState } from 'react';
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
} from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { VideoModal } from '@/components/ui/VideoModal';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { muscleGroups } from '@/data/muscles';

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
      <PageHero
        eyebrow="Exercises"
        title="Exercises by muscle group"
        subtitle="Pick a muscle group to see a real exercise demo — quick form-check clips, free and no sign-up."
        crumbs={[{ label: 'Exercises' }]}
      />

      <Section spacing="md">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
