// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ArticleFrontmatter {
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  codexLinks?: Array<{ section: string; slug: string; title: string }>;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
  slug: string;
}

export function getArticle(
  locale: string,
  type: 'guides' | 'codex',
  category: string,
  slug: string
): Article {
  const filePath = path.join(CONTENT_DIR, locale, type, category, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    frontmatter: data as ArticleFrontmatter,
    content,
    slug,
  };
}

export function getAllSlugs(
  locale: string,
  type: 'guides' | 'codex',
  category: string
): string[] {
  const dir = path.join(CONTENT_DIR, locale, type, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

export function getAllArticles(locale: string, type: 'guides' | 'codex'): Article[] {
  const typeDir = path.join(CONTENT_DIR, locale, type);
  if (!fs.existsSync(typeDir)) return [];
  const categories = fs.readdirSync(typeDir);
  return categories.flatMap((category) => {
    const slugs = getAllSlugs(locale, type, category);
    return slugs.map((slug) => getArticle(locale, type, category, slug));
  });
}
