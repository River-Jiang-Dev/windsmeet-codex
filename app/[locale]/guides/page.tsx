// app/[locale]/guides/page.tsx
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getAllArticles } from '@/lib/mdx';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const articles = getAllArticles(locale, 'guides');

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-cinzel mb-2 text-3xl tracking-widest" style={{ color: 'var(--parchment)', fontWeight: 700 }}>
        {locale === 'zh' ? '攻略' : 'GUIDES'}
      </h1>
      <p className="font-crimson mb-10 text-base italic" style={{ color: 'var(--parchment-3)' }}>
        {locale === 'zh' ? '从新手到深度流派，每篇都有文化注脚。' : 'Every guide carries a layer of cultural context.'}
      </p>
      {articles.length === 0 ? (
        <p className="font-crimson italic" style={{ color: 'var(--parchment-3)' }}>
          {locale === 'zh' ? '暂无内容，敬请期待。' : 'No guides yet. Check back soon.'}
        </p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.slug} style={{ borderTop: '1px solid var(--border)' }}>
              <Link href={`/${locale}/guides/${article.frontmatter.category}/${article.slug}`}
                className="group block py-6 transition-colors">
                <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--parchment-3)' }}>
                  {article.frontmatter.category.replace(/-/g, ' ').toUpperCase()}
                </span>
                <h2 className="font-crimson mt-1 text-xl transition-colors" style={{ color: 'var(--parchment)', fontWeight: 600 }}>
                  {article.frontmatter.title}
                </h2>
                <p className="font-crimson mt-1 text-base" style={{ color: 'var(--parchment-3)' }}>
                  {article.frontmatter.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
