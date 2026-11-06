// app/[locale]/codex/[section]/[slug]/page.tsx
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getArticle, getStaticArticleParams } from '@/lib/mdx';
import { ArticleLayout } from '@/components/ArticleLayout';
import { CodexNote } from '@/components/CodexNote';

const components = { CodexNote };

interface Props {
  params: Promise<{ locale: string; section: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticArticleParams('codex').map(({ locale, category, slug }) => ({
    locale,
    section: category,
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, section, slug } = await params;
  try {
    const { frontmatter } = getArticle(locale, 'codex', section, slug);
    return { title: frontmatter.title, description: frontmatter.description };
  } catch {
    return { title: 'WindsMeet Codex' };
  }
}

export default async function CodexEntryPage({ params }: Props) {
  const { locale, section, slug } = await params;
  setRequestLocale(locale);
  let article;
  try {
    article = getArticle(locale, 'codex', section, slug);
  } catch {
    notFound();
  }
  const { frontmatter, content } = article;
  return (
    <ArticleLayout
      title={frontmatter.title}
      description={frontmatter.description}
      publishedAt={frontmatter.publishedAt}
    >
      <MDXRemote source={content} components={components} />
    </ArticleLayout>
  );
}
