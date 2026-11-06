// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  // Every page is a static file under /en or /zh. Do not negotiate a locale
  // or write NEXT_LOCALE: a Set-Cookie header would skip the edge cache.
  localePrefix: 'always',
  localeCookie: false,
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/guides': '/guides',
    '/codex': '/codex',
  }
});

export type Locale = (typeof routing.locales)[number];
