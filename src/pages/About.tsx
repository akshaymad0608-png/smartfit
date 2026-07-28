import { Compass, Eye, Flag, HeartHandshake, Sparkles, Users } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Counter } from '@/components/ui/Counter';
import { Avatar } from '@/components/ui/Avatar';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { stats } from '@/data/content';

const values = [
  { icon: Sparkles, title: 'Simplicity', text: 'Fitness is hard enough. Our product never should be.' },
  { icon: HeartHandshake, title: 'Evidence first', text: 'We build on science, not fads or hype.' },
  { icon: Users, title: 'For everyone', text: 'Beginner to athlete, every body is welcome here.' },
  { icon: Compass, title: 'Sustainable', text: 'We design for habits that last a lifetime, not a month.' },
];

const timeline = [
  { year: '2023', title: 'The idea', text: 'Frustrated by cluttered fitness apps, we sketched a calmer alternative.' },
  { year: '2024', title: 'First 10k members', text: 'The calculators and home workouts found their audience.' },
  { year: '2025', title: 'AI Coach beta', text: 'We launched personalised plan generation for members.' },
  { year: '2026', title: '250k strong', text: 'SmartFit now supports members across 90+ countries.' },
];

const team = [
  { name: 'Ava Thompson', role: 'Head Coach', initials: 'AT' },
  { name: 'Dr. Neha Rao', role: 'Lead Dietitian', initials: 'NR' },
  { name: 'Ravi Menon', role: 'Strength Coach', initials: 'RM' },
  { name: 'Sofia Marín', role: 'Product Lead', initials: 'SM' },
];

export default function About() {
  return (
    <PageTransition>
      <Seo
        title="About"
        description="SmartFit's mission is to make smarter fitness accessible to everyone — through clean design, evidence-based coaching and thoughtful technology."
        path="/about"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero
        eyebrow="About"
        title="Smarter fitness for everyone"
        subtitle="We're a small team of coaches, dietitians and designers building the calm, credible fitness platform we always wanted."
        crumbs={[{ label: 'About' }]}
      />

      <Section spacing="md">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Flag size={22} />
              </span>
              <h2 className="mt-4 text-card-title font-bold text-heading">Our mission</h2>
              <p className="mt-3 text-body">
                To make smarter fitness genuinely accessible — removing friction, jargon and
                guesswork so anyone can train well and feel better, wherever they start.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                <Eye size={22} />
              </span>
              <h2 className="mt-4 text-card-title font-bold text-heading">Our vision</h2>
              <p className="mt-3 text-body">
                A world where a personal coach, a dietitian and a supportive community fit in your
                pocket — and where healthy living is the easy, obvious choice.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section muted spacing="sm">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <dd className="text-hero font-extrabold text-gradient">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-sm font-medium text-muted">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section spacing="md">
        <SectionHeader eyebrow="Our journey" title="How we got here" />
        <div className="mx-auto mt-12 max-w-3xl">
          <ol className="relative border-l-2 border-line pl-8">
            {timeline.map((t) => (
              <Reveal as="li" key={t.year} className="mb-10 last:mb-0">
                <span className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-card bg-primary" />
                <span className="text-sm font-bold text-primary">{t.year}</span>
                <h3 className="mt-1 text-lg font-bold text-heading">{t.title}</h3>
                <p className="mt-1 text-body">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section muted spacing="md">
        <SectionHeader eyebrow="Values" title="What we stand for" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Reveal key={v.title}>
              <Card className="h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <v.icon size={20} />
                </span>
                <h3 className="mt-4 font-bold text-heading">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <SectionHeader eyebrow="Team" title="Meet the coaches" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <Reveal key={m.name}>
              <Card className="flex flex-col items-center p-6 text-center">
                <Avatar initials={m.initials} className="h-16 w-16 text-lg" />
                <h3 className="mt-4 font-bold text-heading">{m.name}</h3>
                <p className="text-sm text-muted">{m.role}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
