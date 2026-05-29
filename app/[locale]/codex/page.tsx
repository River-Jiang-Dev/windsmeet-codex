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
    <div>
      <h1 className="mb-2 text-3xl font-bold">Codex</h1>
      <p className="mb-8 text-gray-600">
        Cultural deep-dives: the real history behind Where Winds Meet.
      </p>
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet. Check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry.slug} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <Link href={`/${locale}/codex/${entry.frontmatter.category}/${entry.slug}`}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {SECTION_LABELS[entry.frontmatter.category]?.[locale as 'en' | 'zh'] ??
                    entry.frontmatter.category}
                </p>
                <h2 className="font-semibold text-gray-900">{entry.frontmatter.title}</h2>
                <p className="text-sm text-gray-600">{entry.frontmatter.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
