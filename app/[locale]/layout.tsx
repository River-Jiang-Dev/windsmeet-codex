// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site';
import { Navigation } from '@/components/Navigation';
import '@fontsource/cinzel/latin-400.css';
import '@fontsource/cinzel/latin-700.css';
import '@fontsource/cinzel/latin-900.css';
import '@fontsource/crimson-pro/latin-300.css';
import '@fontsource/crimson-pro/latin-400.css';
import '@fontsource/crimson-pro/latin-600.css';
import '@fontsource/crimson-pro/latin-300-italic.css';
import '@fontsource/crimson-pro/latin-400-italic.css';
import '@fontsource/crimson-pro/latin-600-italic.css';
import '../globals.css';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'WindsMeet Codex',
      template: '%s · WindsMeet Codex',
    },
    description: isZh
      ? '燕云十六声的攻略与文化典籍。'
      : 'The cultural encyclopedia of Where Winds Meet — guides, lore, and Five Dynasties history.',
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main className="flex-1 w-full">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
