import { Navigate, useParams, Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { CalculatorSuite } from '@/features/calculators/CalculatorSuite';
import {
  CALCULATOR_PAGES,
  CALCULATOR_SOURCES,
  CALCULATOR_TAB,
  findCalculatorPage,
} from '@/features/calculators/pages';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';

/**
 * A single calculator, given its own URL, wording and questions.
 *
 * The maths is the shared suite — nobody needs six copies of it. What differs
 * is everything a search engine reads: title, description, heading, the formula
 * written out, and the questions people ask about this one metric.
 */
export default function CalculatorDetail() {
  const { slug } = useParams();
  const page = findCalculatorPage(slug);

  if (!page) return <Navigate to="/calculators" replace />;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const others = CALCULATOR_PAGES.filter((c) => c.slug !== page.slug);

  return (
    <PageTransition>
      <Seo
        title={page.title}
        description={page.description}
        path={`/calculators/${page.slug}`}
        keywords={page.keywords}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Calculators', path: '/calculators' },
            { name: page.name, path: `/calculators/${page.slug}` },
          ]),
          faqSchema,
        ]}
      />

      <PageHero
        eyebrow="Calculator"
        title={page.h1}
        subtitle={page.intro}
        crumbs={[{ label: 'Calculators', href: '/calculators' }, { label: page.name }]}
      />

      <Section spacing="md">
        <Reveal>
          <CalculatorSuite initialTab={CALCULATOR_TAB[page.slug] ?? 'body'} />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-6">
              <h2 className="font-bold text-heading">How it is calculated</h2>
              <p className="mt-3 rounded-xl bg-surface-muted p-4 font-mono text-sm text-body">
                {page.formula}
              </p>
              <ul className="mt-5 space-y-2">
                {page.facts.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="h-full p-6">
              <h2 className="font-bold text-heading">Common questions</h2>
              <dl className="mt-4 space-y-5">
                {page.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="text-sm font-semibold text-heading">{f.q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
        </div>

        {/* Each calculator links to the others — one entry point pulls the rest up. */}
        <div className="mt-14">
          <h2 className="font-bold text-heading">Other calculators</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/calculators/${c.slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-4 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
              >
                {c.name} calculator <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>

        {page.extra && (
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {page.extra.map((e) => (
              <Reveal key={e.heading}>
                <Card className="h-full p-6">
                  <h2 className="font-bold text-heading">{e.heading}</h2>
                  <ul className="mt-4 space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        )}

        {CALCULATOR_SOURCES[page.slug] && (
          <Reveal>
            <Card className="mt-14 p-6">
              <h2 className="font-bold text-heading">Sources and method</h2>
              <p className="mt-2 text-sm text-muted">
                The numbers on this page come from published methods, not from a black box. Check the
                working yourself:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-body">
                {CALCULATOR_SOURCES[page.slug].map((s) => (
                  <li key={s.label}>{s.label}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">
                Built and maintained by Akshay Mahajan, a software developer — not a medical
                professional. These tools give estimates for healthy adults and are not medical
                advice; see a doctor or registered dietitian for personal medical decisions.
              </p>
            </Card>
          </Reveal>
        )}

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-surface-muted p-5">
          <Calculator size={18} className="mt-0.5 shrink-0 text-muted" />
          <p className="text-sm text-muted">
            FitSmart calculators use established formulas (Mifflin-St Jeor, Deurenberg body fat,
            Devine ideal weight). They give reliable estimates but are not a substitute for
            professional medical assessment.
          </p>
        </div>
      </Section>
    </PageTransition>
  );
}
