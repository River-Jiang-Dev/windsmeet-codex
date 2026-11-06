# WindsMeet Codex

Guides and cultural notes for Where Winds Meet (燕云十六声). English and Chinese pages are static files under `/en` and `/zh`.

## Local

```bash
npm ci
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en). `/` redirects to `/en` in production; in dev, open `/en` directly.

```bash
npm run build            # production static export to out/
npm run preview          # serve out/ the way Cloudflare Workers will
npm test
npm run validate:content
```

## Deploy

Production is a Cloudflare Workers static-asset site at `yanyun.mvphubapp.com`. Workers Builds runs `npm run build`, then `npx wrangler deploy`, after a push to `master`. See [DEPLOYMENT.md](DEPLOYMENT.md).
