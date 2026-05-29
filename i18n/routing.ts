// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/guides': '/guides',
    '/codex': '/codex',
  }
});

export type Locale = (typeof routing.locales)[number];
