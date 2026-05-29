// components/LocaleSwitcher.tsx
'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale() {
    const next = locale === 'en' ? 'zh' : 'en';
    // Replace current locale prefix in path
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
    >
      {locale === 'en' ? '中文' : 'English'}
    </button>
  );
}
