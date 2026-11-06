// components/CodexNote.tsx
interface CodexNoteProps {
  title: string;
  preview: string;
  section: string;
  slug: string;
  locale?: string;
}

export function CodexNote({ title, preview, section, slug, locale = 'en' }: CodexNoteProps) {
  const href = `/${locale}/codex/${section}/${slug}`;
  return (
    <aside
      className="not-prose my-8"
      style={{
        border: '1px solid var(--border-2)',
        background: 'var(--ink-3)',
        padding: '1.25rem 1.5rem',
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span aria-hidden>📖</span>
        <span className="font-cinzel text-xs tracking-widest" style={{ color: 'var(--gold-3)' }}>
          CODEX NOTE
        </span>
      </div>
      <p className="font-crimson mb-1" style={{ color: 'var(--parchment)', fontWeight: 600 }}>
        {title}
      </p>
      <p className="font-crimson mb-3 text-base" style={{ color: 'var(--parchment-3)' }}>
        {preview}
      </p>
      <a href={href} className="font-cinzel text-xs tracking-widest link-gold">
        {locale === 'zh' ? '阅读完整条目 →' : 'Read full entry →'}
      </a>
    </aside>
  );
}
