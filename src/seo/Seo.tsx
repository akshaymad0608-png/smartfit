import { useEffect } from 'react';
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

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Central SEO manager. Imperatively sets title, meta description, canonical,
 * Open Graph, Twitter cards and JSON-LD for the current page. Dependency-free
 * and StrictMode-safe (works identically in dev and production).
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
  const metaKeywords = (keywords ?? site.keywords).join(', ');
  const schemaJson = JSON.stringify(
    schema ? (Array.isArray(schema) ? schema : [schema]) : [],
  );

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', metaKeywords);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', site.name);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:locale', site.locale);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', site.twitter);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    // JSON-LD — replace any previously managed blocks
    document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
    const schemas: Record<string, unknown>[] = JSON.parse(schemaJson);
    schemas.forEach((s) => {
      const sc = document.createElement('script');
      sc.type = 'application/ld+json';
      sc.setAttribute('data-seo-ld', '');
      sc.textContent = JSON.stringify(s);
      document.head.appendChild(sc);
    });
  }, [
    fullTitle,
    description,
    metaKeywords,
    canonical,
    image,
    type,
    noindex,
    schemaJson,
  ]);

  return null;
}
