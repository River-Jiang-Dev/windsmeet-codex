// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('nav');
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold">WindsMeet Codex</h1>
      <p className="mt-4 text-gray-600">
        The complete guide for Where Winds Meet — with cultural deep-dives.
      </p>
      <nav className="mt-8 flex gap-4">
        <Link href="/guides" className="text-blue-600 hover:underline">{t('guides')}</Link>
        <Link href="/codex" className="text-blue-600 hover:underline">{t('codex')}</Link>
      </nav>
    </main>
  );
}
