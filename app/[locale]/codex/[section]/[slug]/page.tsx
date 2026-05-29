// app/[locale]/codex/[section]/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getArticle, getAllSlugs } from '@/lib/mdx';
import { ArticleLayout } from '@/components/ArticleLayout';
import { CodexNote } from '@/components/CodexNote';

const components = { CodexNote };

interface Props {
  params: Promise<{ locale: string; section: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const allParams: { locale: string; section: string; slug: string }[] = [];
  for (const locale of locales) {
    const sections = ['martial', 'people', 'places', 'lore'];
    for (const section of sections) {
      const slugs = getAllSlugs(locale, 'codex', section);
      slugs.forEach((slug) => allParams.push({ locale, section, slug }));
    }
  }
  return allParams;
}

export default async function CodexEntryPage({ params }: Props) {
  const { locale, section, slug } = await params;
  try {
    const { frontmatter, content } = getArticle(locale, 'codex', section, slug);
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
