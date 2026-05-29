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
    <aside className="my-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">📖</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Codex Note
        </span>
      </div>
      <p className="mb-1 font-semibold text-gray-900">{title}</p>
      <p className="mb-3 text-sm text-gray-600">{preview}</p>
      <a
        href={href}
        className="text-sm font-medium text-amber-700 hover:text-amber-900 hover:underline"
      >
        Read full entry →
      </a>
    </aside>
  );
}
