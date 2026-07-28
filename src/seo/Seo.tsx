import { Helmet } from 'react-helmet-async';
import { site } from '@/config/site';

interface SeoProps {
  title?: string;
  description?: string;
  /** Path only, e.g. "/workouts". Combined with site.url for canonical + OG. */
  path?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** One or more JSON-LD objects to embed. */
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Central SEO component — sets title, meta description, canonical, Open Graph,
 * Twitter cards and JSON-LD structured data for any page.
 */
export function Seo({
  title,
  description = site.description,
  path = '/',
  keywords,
  image = `${site.url}/icon.svg`,
  type = 'website',
  noindex = false,
  schema,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const canonical = `${site.url}${path}`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  const metaKeywords = (keywords ?? site.keywords).join(', ');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={site.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
