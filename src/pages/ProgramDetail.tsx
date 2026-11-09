import { Navigate, useParams, Link } from 'react-router-dom';
import { Calendar, Target, Check, ArrowRight, X, Dumbbell, Flame, TrendingUp, Lightbulb, ShieldAlert } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema, faqSchema } from '@/seo/schema';
import { programs, blogPosts } from '@/data/content';
import type { ReactNode } from 'react';
import type { ProgramPhase } from '@/types';

/**
 * A single program, given its own URL.
 *
 * Each program in data/content.ts carries a written `plan`: who it suits,
 * equipment, warm-up, the sessions phase by phase, the progression rule,
 * coaching tips and FAQs. prerender.mjs reads the same data so the static
 * HTML a crawler sees matches what visitors get. Programs without a plan
 * still render the summary card.
 */
function PhaseBlock({ phase }: { phase: ProgramPhase }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold text-heading">{phase.name}</h3>
      <p className="mt-1 text-sm text-muted">{phase.goal}</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {phase.days.map((d) => (
          <Card key={`${phase.name}-${d.day}`} className="min-w-0 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-bold text-heading">{d.day}</p>
              <Badge tone="neutral">{d.focus}</Badge>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                    <th className="py-2 pr-3 font-semibold">Exercise</th>
                    <th className="py-2 pr-3 font-semibold">Sets</th>
                    <th className="py-2 pr-3 font-semibold">Reps / time</th>
                    <th className="py-2 font-semibold">Rest</th>
                  </tr>
                </thead>
                <tbody>
                  {d.exercises.map((e) => (
                    <tr key={e.name} className="border-b border-line/60 align-top last:border-0">
                      <td className="py-2.5 pr-3 text-body">
                        <span className="font-medium text-heading">{e.name}</span>
                        {e.note && <span className="mt-0.5 block text-xs text-muted">{e.note}</span>}
                      </td>
                      <td className="py-2.5 pr-3 text-body">{e.sets}</td>
                      <td className="py-2.5 pr-3 text-body">{e.reps}</td>
                      <td className="py-2.5 text-body">{e.rest ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ListCard({ title, items, icon, tone = 'check' }: { title: string; items: string[]; icon: ReactNode; tone?: 'check' | 'cross' | 'dot' }) {
  return (
    <Card className="p-6">
      <h3 className="flex items-center gap-2 font-bold text-heading">
        {icon} {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-sm text-body">
            {tone === 'check' && <Check size={16} className="mt-0.5 shrink-0 text-secondary" />}
            {tone === 'cross' && <X size={16} className="mt-0.5 shrink-0 text-muted" />}
            {tone === 'dot' && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
            {it}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const program = programs.find((p) => p.slug === slug);

  if (!program) return <Navigate to="/programs" replace />;

  const others = programs.filter((p) => p.slug !== program.slug);
  const plan = program.plan;
  const related = (plan?.related ?? [])
    .map((r) => blogPosts.find((b) => b.slug === r))
    .filter((b): b is (typeof blogPosts)[number] => Boolean(b));

  const schema: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Programs', path: '/programs' },
      { name: program.title, path: `/programs/${program.slug}` },
    ]),
  ];
  if (plan?.faqs.length) schema.push(faqSchema(plan.faqs));

  return (
    <PageTransition>
      <Seo
        title={`${program.title} — ${program.weeks}-Week Program`}
        description={program.summary}
        path={`/programs/${program.slug}`}
        keywords={[program.goal, program.level, 'training program', 'workout plan']}
        schema={schema}
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
              <img src={program.image} alt={`${program.title} program`} className="h-full w-full object-cover" />
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

              {plan ? (
                <p className="mt-8 leading-relaxed text-body">{plan.overview}</p>
              ) : (
                <>
                  <h2 className="mt-8 font-bold text-heading">What's included</h2>
                  <ul className="mt-4 space-y-2.5">
                    {program.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-body">
                        <Check size={16} className="mt-0.5 shrink-0 text-secondary" /> {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Button as="link" to="/dashboard" className="mt-8 w-full sm:w-auto">
                Track this program
              </Button>
            </div>
          </Card>
        </Reveal>

        {plan && (
          <>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <ListCard title="Good fit if you are" items={plan.whoFor} icon={<Check size={18} className="text-secondary" />} />
              <ListCard title="Not the right fit" items={plan.notFor} tone="cross" icon={<X size={18} className="text-muted" />} />
              <ListCard title="What you need" items={plan.equipment} tone="dot" icon={<Dumbbell size={18} className="text-primary" />} />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-heading">The plan</h2>
              <Card className="mt-5 p-6">
                <h3 className="flex items-center gap-2 font-bold text-heading">
                  <Flame size={18} className="text-primary" /> Warm-up before every session (5–8 min)
                </h3>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-body">
                  {plan.warmup.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ol>
              </Card>
              {plan.phases.map((ph) => (
                <PhaseBlock key={ph.name} phase={ph} />
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
                  <TrendingUp size={18} className="text-primary" /> How to progress
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-body">{plan.progression}</p>
              </Card>
              <ListCard title="Coaching tips" items={plan.tips} tone="dot" icon={<Lightbulb size={18} className="text-primary" />} />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-heading">Common questions</h2>
              <Accordion items={plan.faqs} className="mt-5" />
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-surface-muted p-5 text-sm text-body">
              <ShieldAlert size={18} className="mt-0.5 shrink-0 text-muted" />
              <p>{plan.safety}</p>
            </div>
          </>
        )}

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-bold text-heading">Related reading</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((b) => (
                <li key={b.slug}>
                  <Link to={`/blog/${b.slug}`} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-card p-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary">
                    {b.title} <ArrowRight size={14} className="shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

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
