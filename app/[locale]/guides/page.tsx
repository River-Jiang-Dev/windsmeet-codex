// app/[locale]/guides/page.tsx
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const articles = getAllArticles(locale, 'guides');

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Guides</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">No guides yet. Check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.slug} className="rounded-lg border p-4 hover:bg-gray-50">
              <Link href={`/${locale}/guides/${article.frontmatter.category}/${article.slug}`}>
                <h2 className="font-semibold text-gray-900">{article.frontmatter.title}</h2>
                <p className="text-sm text-gray-600">{article.frontmatter.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
