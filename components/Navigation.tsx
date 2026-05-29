// components/Navigation.tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { LocaleSwitcher } from './LocaleSwitcher';

interface NavigationProps {
  locale: string;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="text-lg font-bold text-gray-900">
          WindsMeet Codex
        </Link>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/guides`} className="text-sm text-gray-600 hover:text-gray-900">
            {t('guides')}
          </Link>
          <Link href={`/${locale}/codex`} className="text-sm text-gray-600 hover:text-gray-900">
            {t('codex')}
          </Link>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
