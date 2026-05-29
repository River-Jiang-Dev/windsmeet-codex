// app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllArticles } from '@/lib/mdx';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const guides = getAllArticles(locale, 'guides').slice(0, 2);
  const codex  = getAllArticles(locale, 'codex').slice(0, 2);
  const isZh   = locale === 'zh';

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="noise-overlay relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 py-24"
        style={{ backgroundColor: 'var(--ink)' }}
      >
        {/* Ambient ghost characters */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden">
          <span
            className="anim-drift absolute -left-16 top-1/2 -translate-y-1/2 leading-none"
            style={{
              fontSize: 'clamp(220px, 38vw, 480px)',
              color: 'var(--gold)',
              opacity: 0.03,
              fontFamily: '"Noto Serif SC","Noto Serif TC",serif',
              fontWeight: 300,
            }}
          >
            燕
          </span>
          <span
            className="anim-drift absolute -right-8 bottom-1/3 leading-none"
            style={{
              fontSize: 'clamp(140px, 25vw, 340px)',
              color: 'var(--gold)',
              opacity: 0.025,
              fontFamily: '"Noto Serif SC","Noto Serif TC",serif',
              fontWeight: 300,
              animationDelay: '-6s',
            }}
          >
            雲
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Era badge */}
          <div className="anim-fade-in flex items-center gap-4">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, var(--gold-3))' }} />
            <span className="font-cinzel text-xs tracking-[0.4em]" style={{ color: 'var(--parchment-3)' }}>
              907 — 960 CE
            </span>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, var(--gold-3))' }} />
          </div>

          {/* Brand name */}
          <h1 className="anim-fade-up anim-delay-200 mt-8 font-cinzel leading-tight">
            <span
              className="block"
              style={{ fontSize: 'clamp(2.8rem, 8.5vw, 6.5rem)', fontWeight: 900, color: 'var(--parchment)', letterSpacing: '0.12em' }}
            >
              WINDSMEET
            </span>
            <span
              className="block"
              style={{ fontSize: 'clamp(2.8rem, 8.5vw, 6.5rem)', fontWeight: 400, color: 'var(--gold)', letterSpacing: '0.22em', marginTop: '-0.05em' }}
            >
              CODEX
            </span>
          </h1>

          {/* Gold divider */}
          <div
            className="anim-fade-in anim-delay-400 my-8 h-px w-48"
            style={{ background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }}
          />

          {/* Tagline */}
          <p className="anim-fade-up anim-delay-400 font-crimson text-xl italic" style={{ color: 'var(--parchment-2)' }}>
            {isZh ? '燕云十六声的文化典籍' : 'The cultural encyclopedia of Where Winds Meet'}
          </p>
          <p
            className="anim-fade-up anim-delay-600 mx-auto mt-3 max-w-sm font-crimson text-base"
            style={{ color: 'var(--parchment-3)', lineHeight: 1.75 }}
          >
            {isZh
              ? '其他攻略告诉你做什么。我们告诉你为什么。'
              : 'Other guides tell you what to do. We tell you why it matters.'}
          </p>

          {/* CTAs */}
          <div className="anim-fade-up anim-delay-800 mt-10 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/codex`} className="btn-gold font-cinzel">
              {isZh ? '进入典籍' : 'ENTER THE CODEX'}
            </Link>
            <Link href={`/${locale}/guides`} className="btn-outline font-cinzel">
              {isZh ? '浏览攻略' : 'BROWSE GUIDES'}
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="anim-fade-in anim-delay-800 mt-20 flex flex-col items-center gap-2">
            <span className="font-cinzel text-xs tracking-[0.3em]" style={{ color: 'var(--parchment-3)' }}>
              {isZh ? '向下' : 'SCROLL'}
            </span>
            <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, var(--parchment-3), transparent)' }} />
          </div>
        </div>
      </section>

      {/* ── PILLARS ───────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ backgroundColor: 'var(--ink-2)', borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px md:grid-cols-3" style={{ border: '1px solid var(--border)' }}>
            {[
              {
                num: '一',
                en: 'GUIDES', zh: '攻略', char: '攻',
                desc: isZh
                  ? '从新手到深度流派，每篇攻略都包含一层文化注脚。'
                  : "From first steps to deep builds — every guide carries cultural context you won't find elsewhere.",
                href: `/${locale}/guides`,
                cta: isZh ? '查看攻略' : 'Browse Guides',
                ctaClass: 'link-muted',
              },
              {
                num: '二',
                en: 'CODEX', zh: '典籍', char: '典',
                desc: isZh
                  ? '五代十国的真实历史、武学流派渊源、人物原型考据。'
                  : "The real Five Dynasties history, martial lineages, and character origins behind the game's world.",
                href: `/${locale}/codex`,
                cta: isZh ? '进入典籍' : 'Enter Codex',
                ctaClass: 'link-gold',
              },
              {
                num: '三',
                en: 'COMMUNITY', zh: '社区', char: '社',
                desc: isZh
                  ? '投稿你发现的彩蛋和文化梗，一起把这本典籍写完整。'
                  : 'Submit easter eggs and lore you\'ve found. Help us complete the codex.',
                href: `/${locale}/guides`,
                cta: isZh ? '即将上线' : 'Coming Soon',
                ctaClass: 'link-muted',
              },
            ].map((p) => (
              <div key={p.num} className="pillar-card">
                <span
                  className="pillar-char font-crimson"
                  style={{
                    fontSize: '7rem',
                    fontFamily: '"Noto Serif SC",serif',
                    color: 'var(--gold)',
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                  aria-hidden
                >
                  {p.char}
                </span>

                <div className="mb-6">
                  <span className="font-crimson text-2xl italic" style={{ color: 'var(--gold-3)' }}>{p.num}</span>
                </div>

                <h3 className="font-cinzel mb-1 text-xl tracking-widest" style={{ color: 'var(--parchment)', fontWeight: 700 }}>
                  {p.en}
                </h3>
                <p className="mb-1 text-sm" style={{ color: 'var(--parchment-3)', fontFamily: '"Noto Serif SC",serif' }}>
                  {p.zh}
                </p>

                <div className="pillar-line" />

                <p className="font-crimson mb-8 flex-1 text-base leading-relaxed" style={{ color: 'var(--parchment-2)' }}>
                  {p.desc}
                </p>

                <Link href={p.href} className={`font-cinzel flex items-center gap-2 text-xs tracking-widest ${p.ctaClass}`}>
                  <span>{p.cta.toUpperCase()}</span>
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────── */}
      <section
        className="px-6 py-24 text-center"
        style={{ backgroundColor: 'var(--ink-3)', borderTop: '1px solid var(--border)' }}
      >
        <div className="mx-auto max-w-2xl">
          <div className="font-crimson mb-6 text-5xl italic" style={{ color: 'var(--gold-3)' }}>&ldquo;</div>
          <blockquote className="font-crimson text-xl italic leading-relaxed" style={{ color: 'var(--parchment-2)' }}>
            {isZh
              ? '其他攻略站告诉你做什么。我们告诉你这个世界为什么是这样的。'
              : 'Fextralife tells you what skill to take. We tell you where that skill came from — and why a warrior in 920 CE would have given his life for it.'}
          </blockquote>
          <div className="mx-auto mt-10 h-px w-24" style={{ backgroundColor: 'var(--border-2)' }} />
        </div>
      </section>

      {/* ── LATEST CONTENT ────────────────────────────────── */}
      {(guides.length > 0 || codex.length > 0) && (
        <section className="px-6 py-20" style={{ backgroundColor: 'var(--ink)', borderTop: '1px solid var(--border)' }}>
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-12 flex items-center gap-6">
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
              <h2 className="font-cinzel text-xs tracking-[0.4em]" style={{ color: 'var(--parchment-3)' }}>
                {isZh ? '最新收录' : 'RECENTLY ADDED'}
              </h2>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {guides.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/guides/${article.frontmatter.category}/${article.slug}`}
                  className="card-guide"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--parchment-3)' }}>
                      {isZh ? '攻略' : 'GUIDE'}
                    </span>
                    <span style={{ color: 'var(--border-2)' }}>·</span>
                    <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--parchment-3)' }}>
                      {article.frontmatter.category.replace(/-/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-crimson mb-3 text-xl leading-snug" style={{ color: 'var(--parchment)', fontWeight: 600 }}>
                    {article.frontmatter.title}
                  </h3>
                  <p className="font-crimson text-base leading-relaxed" style={{ color: 'var(--parchment-3)' }}>
                    {article.frontmatter.description}
                  </p>
                  <div className="mt-6 font-cinzel text-xs tracking-widest link-gold flex items-center gap-2">
                    <span>{isZh ? '阅读' : 'READ'}</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}

              {codex.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/${locale}/codex/${entry.frontmatter.category}/${entry.slug}`}
                  className="card-codex"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold-3)' }}>
                      {isZh ? '典籍' : 'CODEX'}
                    </span>
                    <span style={{ color: 'var(--border-2)' }}>·</span>
                    <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--parchment-3)' }}>
                      {entry.frontmatter.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-crimson mb-3 text-xl leading-snug" style={{ color: 'var(--parchment)', fontWeight: 600 }}>
                    {entry.frontmatter.title}
                  </h3>
                  <p className="font-crimson text-base leading-relaxed" style={{ color: 'var(--parchment-3)' }}>
                    {entry.frontmatter.description}
                  </p>
                  <div className="mt-6 font-cinzel text-xs tracking-widest link-gold flex items-center gap-2">
                    <span>{isZh ? '阅读' : 'READ'}</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="px-6 py-12" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--ink)' }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--parchment-3)' }}>
            WINDSMEET CODEX
          </span>
          <div className="flex gap-6">
            <Link href={`/${locale}/guides`} className="font-cinzel text-xs tracking-widest link-muted">
              {isZh ? '攻略' : 'GUIDES'}
            </Link>
            <Link href={`/${locale}/codex`} className="font-cinzel text-xs tracking-widest link-muted">
              {isZh ? '典籍' : 'CODEX'}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
