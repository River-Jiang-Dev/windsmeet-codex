// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Pure static site: MDX is read at build time. Workers serves the `out/`
  // directory as assets, so requests do not run a Worker (no CPU, no Set-Cookie).
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
