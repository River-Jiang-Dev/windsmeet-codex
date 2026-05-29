// app/[locale]/guides/[category]/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getArticle, getAllSlugs } from '@/lib/mdx';
import { ArticleLayout } from '@/components/ArticleLayout';
import { CodexNote } from '@/components/CodexNote';

const components = { CodexNote };

interface Props {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const allParams: { locale: string; category: string; slug: string }[] = [];
  for (const locale of locales) {
    const categories = ['story-quests', 'getting-started', 'character-builds', 'maps', 'exploration', 'dungeons'];
    for (const category of categories) {
      const slugs = getAllSlugs(locale, 'guides', category);
      slugs.forEach((slug) => allParams.push({ locale, category, slug }));
    }
  }
  return allParams;
}

export default async function GuidePage({ params }: Props) {
  const { locale, category, slug } = await params;
  setRequestLocale(locale);
  try {
    const { frontmatter, content } = getArticle(locale, 'guides', category, slug);
    return (
      <ArticleLayout
        title={frontmatter.title}
        description={frontmatter.description}
        publishedAt={frontmatter.publishedAt}
      >
        <MDXRemote source={content} components={components} />
      </ArticleLayout>
    );
  } catch {
    notFound();
  }
}
