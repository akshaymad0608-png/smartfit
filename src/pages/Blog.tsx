import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { BlogCard } from '@/components/cards/BlogCard';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { blogPosts } from '@/data/content';
import { cn } from '@/lib/cn';

export default function Blog() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))),
    );
  }, [query, category]);

  return (
    <PageTransition>
      <Seo
        title="Fitness & Nutrition Articles"
        description="Practical articles on training, nutrition and health science — including HIIT versus steady-state cardio, protein intake and recovery."
        path="/blog"
        keywords={['fitness blog', 'workout planner', 'nutrition guide', 'healthy lifestyle']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <PageHero
        eyebrow="Blog"
        title="Train your mind, too"
        subtitle="Practical, evidence-based articles on training, nutrition and recovery — written by our coaches and dietitians."
        crumbs={[{ label: 'Blog' }]}
      />

      <Section spacing="md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full rounded-full border border-line bg-card py-3 pl-11 pr-4 text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
                  category === c
                    ? 'border-primary bg-primary text-white'
                    : 'border-line bg-card text-body hover:border-primary/40',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-line py-16 text-center">
            <p className="font-semibold text-heading">No articles found.</p>
            <p className="mt-1 text-sm text-muted">Try another search or category.</p>
          </div>
        )}
      </Section>
    </PageTransition>
  );
}
