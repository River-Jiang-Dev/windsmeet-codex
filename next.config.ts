// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Static export only on Cloudflare Pages (CF_PAGES=1 is set automatically by Cloudflare build env).
  // Local dev keeps the full server so proxy.ts runs and / redirects to /en.
  output: process.env.CF_PAGES ? 'export' : undefined,
};

export default withNextIntl(nextConfig);
