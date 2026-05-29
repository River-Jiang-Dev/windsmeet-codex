# Deployment Guide

## Cloudflare Pages (Active)

### First-time setup
1. Push this repo to GitHub (see below)
2. Go to https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
3. Select this repo
4. Build settings:
   - Framework preset: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Build output directory: `out`
5. Click Save and Deploy

### After deploying
- Cloudflare auto-deploys on every `git push` to main
- Preview deployments are created for every pull request

### Environment variables (Phase 2+)
Add in Cloudflare Pages dashboard → Settings → Environment Variables.
See `.env.example` for the full list.

## Local development

```bash
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Static export to out/ directory
npm test                 # Run tests
npm run validate:content # Check all MDX frontmatter before publishing
node scripts/new-article.js --type guide   # Create new guide stub
node scripts/new-article.js --type codex   # Create new codex stub
```

## Build notes
- Uses webpack (not Turbopack) via `--webpack` flag
- Static export via `output: 'export'` — generates `out/` directory
- Content lives in `content/en/` and `content/zh/` as MDX files
- Root `/` redirects to `/en` via `public/_redirects`
