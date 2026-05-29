# Deployment Guide

## Vercel (Recommended)

### First-time setup
1. Push this repo to GitHub: `git remote add origin <your-repo-url> && git push -u origin main`
2. Go to https://vercel.com → Import Project → select this repo
3. Framework preset: Next.js (auto-detected)
4. Root directory: leave blank (project root)
5. No environment variables needed for Phase 1 (all content is static)
6. Click Deploy

### After deploying
- Vercel auto-deploys on every `git push` to main
- Preview deployments are created for every pull request

### Environment variables (Phase 2+)
Add these in Vercel dashboard → Project Settings → Environment Variables.
See `.env.example` for the full list with descriptions.

## Local development

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm test           # Run tests
node scripts/new-article.js --type guide   # Create new guide stub (after content pipeline setup)
```

## Build notes
- Uses webpack (not Turbopack) via `--webpack` flag for stability
- Content lives in `content/en/` and `content/zh/` as MDX files
- Static pages are pre-generated at build time via `generateStaticParams`
