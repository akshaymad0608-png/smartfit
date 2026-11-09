import { Link } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { CALCULATOR_PAGES } from '@/features/calculators/pages';
import { blogPosts, programs } from '@/data/content';
import { muscleGroups } from '@/data/muscles';
import { workouts } from '@/data/workouts';

interface Group {
  heading: string;
  links: { to: string; label: string }[];
}

/**
 * The human sitemap: every page as a real link. It used to be four lines of
 * text naming sections without linking to any of them, which made it useless
 * to visitors and to crawlers alike.
 */
export function Sitemap() {
  const groups: Group[] = [
    {
      heading: 'Main',
      links: [
        { to: '/', label: 'Home' },
        { to: '/workouts', label: 'Workout plans' },
        { to: '/exercises', label: 'Exercises by muscle group' },
        { to: '/nutrition', label: 'Nutrition guides' },
        { to: '/programs', label: 'Training programs' },
        { to: '/ai-coach', label: 'AI coach' },
        { to: '/blog', label: 'Articles' },
      ],
    },
    {
      heading: 'Calculators',
      links: [
        { to: '/calculators', label: 'All calculators' },
        ...CALCULATOR_PAGES.map((c) => ({ to: `/calculators/${c.slug}`, label: `${c.name} calculator` })),
      ],
    },
    {
      heading: 'Workouts',
      links: workouts.map((w) => ({ to: `/workouts/${w.slug}`, label: w.name })),
    },
    {
      heading: 'Exercises by muscle',
      links: muscleGroups.map((m) => ({ to: `/exercises/${m.key}`, label: `${m.label} exercises` })),
    },
    {
      heading: 'Training programs',
      links: programs.map((p) => ({ to: `/programs/${p.slug}`, label: p.title })),
    },
    {
      heading: 'Articles',
      links: blogPosts.map((b) => ({ to: `/blog/${b.slug}`, label: b.title })),
    },
    {
      heading: 'About and help',
      links: [
        { to: '/about', label: 'About FitSmart' },
        { to: '/contact', label: 'Contact' },
        { to: '/help', label: 'Help centre' },
        { to: '/privacy', label: 'Privacy policy' },
        { to: '/terms', label: 'Terms of service' },
        { to: '/cookies', label: 'Cookie policy' },
        { to: '/disclaimer', label: 'Medical disclaimer' },
        { to: '/accessibility', label: 'Accessibility statement' },
      ],
    },
  ];

  return (
    <PageTransition>
      <Seo
        title="Sitemap — Every Page on FitSmart"
        description="Every page on FitSmart in one plain list — calculators, workout plans, exercise guides, nutrition guides, articles and the policy pages."
        path="/sitemap"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Sitemap', path: '/sitemap' },
        ])}
      />
      <PageHero
        eyebrow="Navigation"
        title="Sitemap"
        subtitle="Every page on FitSmart, in one list."
        crumbs={[{ label: 'Sitemap' }]}
      />
      <Section spacing="md">
        <div className="grid gap-10 md:grid-cols-2">
          {groups.map((g) => (
            <section key={g.heading}>
              <h2 className="text-card-title font-bold text-heading">{g.heading}</h2>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-body hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
