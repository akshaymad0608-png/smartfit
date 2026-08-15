import { Calculator, FileText, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { CalculatorSuite } from '@/features/calculators/CalculatorSuite';
import { CALCULATOR_PAGES } from '@/features/calculators/pages';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';

const features = [
  { icon: Zap, title: 'Instant results', text: 'Every metric updates live as you type — no submit button.' },
  { icon: FileText, title: 'PDF report', text: 'Download a clean, shareable summary of all your numbers.' },
  { icon: ShieldCheck, title: 'Private by design', text: 'Calculations run in your browser. Nothing is uploaded.' },
];

export default function Calculators() {
  return (
    <PageTransition>
      <Seo
        title="BMI, BMR, TDEE & Macro Calculators"
        description="Calculate your BMI, BMR, TDEE, daily calories and macro split for cutting, maintenance or bulking. Free, accurate and instant — no sign-up needed."
        path="/calculators"
        keywords={[
          'BMI calculator',
          'BMR calculator',
          'TDEE calculator',
          'body fat calculator',
          'macro calculator',
          'protein calculator',
          'calorie calculator',
          'ideal weight calculator',
        ]}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Calculators', path: '/calculators' },
        ])}
      />
      <PageHero
        eyebrow="Calculators"
        title="Know your numbers"
        subtitle="Enter your details once and get every key metric — BMI, BMR, TDEE, body fat, ideal weight, macros, protein and water — instantly."
        crumbs={[{ label: 'Calculators' }]}
      >
        <div className="flex flex-wrap gap-3">
          {features.map((f) => (
            <span
              key={f.title}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-body"
            >
              <f.icon size={15} className="text-primary" /> {f.title}
            </span>
          ))}
        </div>
      </PageHero>

      <Section id="bmi" spacing="md">
        {/* Links out to the per-calculator pages. Without these the new URLs are
            orphans — in the sitemap but reachable from nowhere, which is how
            pages end up indexed and ranking for nothing. */}
        <Reveal>
          <nav aria-label="Calculators" className="mb-10 flex flex-wrap gap-3">
            {CALCULATOR_PAGES.map((c) => (
              <Link
                key={c.slug}
                to={`/calculators/${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
              >
                {c.name} calculator <ArrowRight size={14} />
              </Link>
            ))}
          </nav>
        </Reveal>

        <Reveal>
          <CalculatorSuite />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Reveal key={f.title}>
              <Card className="h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 font-bold text-heading">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-surface-muted p-5">
          <Calculator size={18} className="mt-0.5 shrink-0 text-muted" />
          <p className="text-sm text-muted">
            FitSmart calculators use established formulas (Mifflin-St Jeor, U.S. Navy body-fat,
            Devine ideal weight). They provide reliable estimates but are not a substitute for
            professional medical assessment.
          </p>
        </div>
      </Section>
    </PageTransition>
  );
}
