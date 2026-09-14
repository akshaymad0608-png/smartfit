import { Navigate, useParams, Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema, articleSchema } from '@/seo/schema';
import { blogPosts } from '@/data/content';

/**
 * A single article, given its own URL.
 *
 * BlogCard's link pointed every card at /blog#<slug> — a hash Blog.tsx never
 * read, so clicking any article just reloaded the same listing. Same shaped
 * bug as ProgramCard and WorkoutCard before it. Each post's `body` (section
 * heading + paragraphs) is the actual article; `excerpt` remains what feeds
 * the card preview, meta description and OG tags.
 */
export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const date = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageTransition>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={post.tags}
        type="article"
        image={`${location.origin}${post.image}`}
        schema={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            date: post.date,
            author: post.author,
          }),
        ]}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]}
      />

      <Section spacing="md">
        <Reveal>
          <Card className="overflow-hidden p-0">
            <div className="h-56 overflow-hidden bg-surface-muted sm:h-80">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="font-semibold text-body">{post.author}</span>
                <span>·</span>
                <span>{date}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {post.readMinutes} min read
                </span>
              </div>

              <p className="mt-6 text-lg leading-relaxed text-body">{post.excerpt}</p>

              {post.body && (
                <div className="mt-8 space-y-7">
                  {post.body.map((s) => (
                    <div key={s.heading}>
                      <h2 className="font-bold text-heading">{s.heading}</h2>
                      <div className="mt-2.5 space-y-3">
                        {s.paragraphs.map((p, i) => (
                          <p key={i} className="text-body">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Badge key={t} tone="neutral">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>

        <div className="mt-14">
          <h2 className="font-bold text-heading">More articles</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-line bg-card px-4 py-3 text-sm font-medium text-body transition-colors hover:border-primary hover:text-primary"
              >
                {p.title} <ArrowRight size={14} className="shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
