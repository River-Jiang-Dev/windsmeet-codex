// app/[locale]/page.tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">WindsMeet Codex</h1>
      <p className="mt-4 text-gray-600">
        The complete guide for Where Winds Meet — with cultural deep-dives.
      </p>
      <nav className="mt-8 flex gap-4">
        <Link href={`/${locale}/guides`} className="text-blue-600 hover:underline">{t('guides')}</Link>
        <Link href={`/${locale}/codex`} className="text-blue-600 hover:underline">{t('codex')}</Link>
      </nav>
    </main>
  );
}
