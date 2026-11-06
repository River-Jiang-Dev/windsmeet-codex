import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllArticles } from '@/lib/mdx';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      { url: `${SITE_URL}/${locale}` },
      { url: `${SITE_URL}/${locale}/guides` },
      { url: `${SITE_URL}/${locale}/codex` },
    );

    for (const article of getAllArticles(locale, 'guides')) {
      entries.push({
        url: `${SITE_URL}/${locale}/guides/${article.frontmatter.category}/${article.slug}`,
      });
    }

    for (const article of getAllArticles(locale, 'codex')) {
      entries.push({
        url: `${SITE_URL}/${locale}/codex/${article.frontmatter.category}/${article.slug}`,
      });
    }
  }

  return entries;
}
