// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Cinzel, Crimson_Pro } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { Navigation } from '@/components/Navigation';
import '../globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WindsMeet Codex',
  description: 'The cultural encyclopedia of Where Winds Meet — guides, lore, and Five Dynasties history for overseas players.',
};

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
    <html
      lang={locale}
      className={`${cinzel.variable} ${crimsonPro.variable} h-full`}
    >
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
