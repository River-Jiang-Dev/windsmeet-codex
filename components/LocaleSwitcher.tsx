'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    const next = locale === 'en' ? 'zh' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="font-cinzel text-xs tracking-widest transition-colors"
      style={{
        border: '1px solid var(--border-2)',
        color: 'var(--parchment-3)',
        padding: '4px 12px',
        letterSpacing: '0.1em',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-3)';
        (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)';
        (e.currentTarget as HTMLElement).style.color = 'var(--parchment-3)';
      }}
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  );
}
