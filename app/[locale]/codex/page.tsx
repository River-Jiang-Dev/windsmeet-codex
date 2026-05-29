// app/[locale]/codex/page.tsx
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getAllArticles } from '@/lib/mdx';

interface Props {
  params: Promise<{ locale: string }>;
}

const SECTION_LABELS: Record<string, { en: string; zh: string }> = {
  martial: { en: 'Martial Arts', zh: '武学源流' },
  people: { en: 'People', zh: '人物志' },
  places: { en: 'Places', zh: '地志' },
  lore: { en: 'Lore', zh: '考据' },
};

export default async function CodexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const entries = getAllArticles(locale, 'codex');

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="font-cinzel mb-2 text-3xl tracking-widest" style={{ color: 'var(--parchment)', fontWeight: 700 }}>
        {locale === 'zh' ? '典籍' : 'CODEX'}
      </h1>
      <p className="font-crimson mb-10 text-base italic" style={{ color: 'var(--parchment-3)' }}>
        {locale === 'zh' ? '游戏里每个"为什么"的答案。' : 'The real history behind Where Winds Meet.'}
      </p>
      {entries.length === 0 ? (
        <p className="font-crimson italic" style={{ color: 'var(--parchment-3)' }}>
          {locale === 'zh' ? '暂无内容，敬请期待。' : 'No entries yet. Check back soon.'}
        </p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry.slug} style={{ borderTop: '1px solid var(--border)' }}>
              <Link href={`/${locale}/codex/${entry.frontmatter.category}/${entry.slug}`}
                className="group block py-6 transition-colors">
                <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold-3)' }}>
                  {SECTION_LABELS[entry.frontmatter.category]?.[locale as 'en' | 'zh'] ?? entry.frontmatter.category}
                </span>
                <h2 className="font-crimson mt-1 text-xl" style={{ color: 'var(--parchment)', fontWeight: 600 }}>
                  {entry.frontmatter.title}
                </h2>
                <p className="font-crimson mt-1 text-base" style={{ color: 'var(--parchment-3)' }}>
                  {entry.frontmatter.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
