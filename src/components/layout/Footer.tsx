import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '@/features/home/NewsletterForm';
import { site } from '@/config/site';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Workouts', href: '/workouts' },
      { label: 'Nutrition', href: '/nutrition' },
      { label: 'Programs', href: '/programs' },
      { label: 'AI Coach', href: '/ai-coach' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Calculators',
    links: [
      { label: 'BMI Calculator', href: '/calculators#bmi' },
      { label: 'BMR & TDEE', href: '/calculators#tdee' },
      { label: 'Body Fat', href: '/calculators#bodyfat' },
      { label: 'Macros', href: '/calculators#macros' },
      { label: 'Water Intake', href: '/calculators#water' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

const socials = [
  { icon: Instagram, href: site.social.instagram, label: 'Instagram' },
  { icon: Linkedin, href: site.social.linkedin, label: 'LinkedIn' },
  { icon: Github, href: site.social.github, label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-muted">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-body">{site.tagline}</p>
            <p className="mt-3 text-sm text-muted">
              Guided workouts, science-backed nutrition, precise calculators and an AI coach — one
              clean platform for your whole fitness journey.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-body transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-heading">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-3xl border border-line bg-card p-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-card-title font-bold text-heading">Join the FitSmart newsletter</h3>
            <p className="mt-1.5 text-sm text-muted">
              Weekly workouts, nutrition tips and product updates. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/sitemap" className="text-sm text-muted hover:text-primary">
              Sitemap
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary"
            >
              Back to top <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
