import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';

export interface ContentSection {
  heading: string;
  body: string[];
}

interface ContentPageProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  path: string;
  updated?: string;
  sections: ContentSection[];
}

/**
 * Reusable long-form content page — used for legal pages (Privacy, Terms,
 * Cookies, Disclaimer, Accessibility) and simple informational pages.
 */
export function ContentPage({
  eyebrow = 'Legal',
  title,
  subtitle,
  path,
  updated,
  sections,
}: ContentPageProps) {
  return (
    <PageTransition>
      <Seo
        title={title}
        description={subtitle ?? `${title} — FitSmart`}
        path={path}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: title, path },
        ])}
      />
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} crumbs={[{ label: title }]} />
      <Section spacing="md">
        <div className="mx-auto max-w-3xl">
          {updated && <p className="mb-8 text-sm text-muted">Last updated: {updated}</p>}
          <div className="space-y-10">
            {sections.map((s) => (
              <Reveal as="section" key={s.heading}>
                <h2 className="text-card-title font-bold text-heading">{s.heading}</h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-body">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
