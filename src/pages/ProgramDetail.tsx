import { Navigate, useParams, Link } from 'react-router-dom';
import { Calendar, Target, Check, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { programs } from '@/data/content';

/**
 * A single program, given its own URL.
 *
 * ProgramCard's "View program" button linked every card to the same
 * /programs listing it was already on — the exact bug this page fixes.
 * There's no deeper per-program content in data/content.ts beyond what
 * the card already shows (goal, level, weeks, days/week, summary,
 * highlights), so this page presents that real data properly rather
 * than padding it out with invented day-by-day detail nobody wrote.
 */
export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);

  if (!program) return <Navigate to="/programs" replace />;

  const others = programs.filter((p) => p.slug !== program.slug);

  return (
    <PageTransition>
      <Seo
        title={`${program.title} — ${program.weeks}-Week Program`}
        description={program.summary}
        path={`/programs/${program.slug}`}
        keywords={[program.goal, program.level, 'training program', 'workout plan']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/programs' },
          { name: program.title, path: `/programs/${program.slug}` },
        ])}
      />

      <PageHero
        eyebrow="Program"
        title={program.title}
        subtitle={program.summary}
        crumbs={[{ label: 'Programs', href: '/programs' }, { label: program.title }]}
      />

      <Section spacing="md">
        <Reveal>
          <Card className="overflow-hidden p-0">
            <div className="relative h-56 overflow-hidden bg-surface-muted sm:h-72">
              <img
                src={program.image}
                alt={`${program.title} program`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
              <Badge tone={program.featured ? 'primary' : 'neutral'} className="absolute left-4 top-4">
                {program.level}
              </Badge>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface-muted p-4">
                  <p className="text-xs text-muted">Goal</p>
                  <p className="mt-0.5 font-bold text-heading">{program.goal}</p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-surface-muted p-4">
                  <Calendar size={18} className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted">Duration</p>
                    <p className="font-bold text-heading">{program.weeks} weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-surface-muted p-4">
                  <Target size={18} className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted">Frequency</p>
                    <p className="font-bold text-heading">{program.daysPerWeek}×/week</p>
                  </div>
                </div>
              </div>

              <h2 className="mt-8 font-bold text-heading">What's included</h2>
              <ul className="mt-4 space-y-2.5">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-body">
                    <Check size={16} className="mt-0.5 shrink-0 text-secondary" /> {h}
                  </li>
                ))}
              </ul>

              <Button as="link" to="/dashboard" className="mt-8 w-full sm:w-auto">
                Start this program
              </Button>
            </div>
          </Card>
        </Reveal>

        <div className="mt-14">
          <h2 className="font-bold text-heading">Other programs</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/programs/${p.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
              >
                {p.title} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
