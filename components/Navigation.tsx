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
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--ink)',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="font-cinzel tracking-[0.2em] transition-colors"
          style={{ color: 'var(--gold)', fontSize: '0.875rem', fontWeight: 900 }}
        >
          WINDSMEET CODEX
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link
            href={`/${locale}/guides`}
            className="font-cinzel text-xs tracking-widest transition-colors hover:text-gold"
            style={{ color: 'var(--parchment-2)', letterSpacing: '0.15em' }}
          >
            {t('guides').toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/codex`}
            className="font-cinzel text-xs tracking-widest transition-colors hover:text-gold"
            style={{ color: 'var(--parchment-2)', letterSpacing: '0.15em' }}
          >
            {t('codex').toUpperCase()}
          </Link>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
