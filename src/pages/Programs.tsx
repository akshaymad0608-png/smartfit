import { useState } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { ProgramCard } from '@/components/cards/ProgramCard';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { programs } from '@/data/content';
import type { Difficulty } from '@/types';
import { cn } from '@/lib/cn';

const levels: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Programs() {
  const [level, setLevel] = useState<(typeof levels)[number]>('All');
  const filtered = programs.filter((p) => level === 'All' || p.level === level);

  return (
    <PageTransition>
      <Seo
        title="Training Programs for Strength & Fat Loss"
        description="Complete multi-week training programs for beginners, fat loss and strength. Follow a plan with clear progression instead of guessing each session."
        path="/programs"
        keywords={['fitness challenge', '30 day fitness plan', 'weight loss', 'muscle gain', 'workout planner']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/programs' },
        ])}
      />
      <PageHero
        eyebrow="Programs"
        title="Follow a proven plan"
        subtitle="Pick a goal-based program and let FitSmart guide every session, week by week, with progressive structure built in."
        crumbs={[{ label: 'Programs' }]}
      />

      <Section spacing="md">
        <div className="flex flex-wrap gap-2">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                level === l
                  ? 'border-primary bg-primary text-white'
                  : 'border-line bg-card text-body hover:border-primary/40',
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
