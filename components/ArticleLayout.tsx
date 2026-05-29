// components/ArticleLayout.tsx
interface ArticleLayoutProps {
  title: string;
  description: string;
  publishedAt: string;
  children: React.ReactNode;
}

export function ArticleLayout({ title, description, publishedAt, children }: ArticleLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <article className="prose max-w-none">
        <header className="mb-10 not-prose">
          {/* Decorative top rule */}
          <div
            className="mb-8 h-px w-12"
            style={{ backgroundColor: 'var(--gold-3)' }}
          />
          <h1
            className="font-crimson text-4xl leading-tight"
            style={{ color: 'var(--parchment)', fontWeight: 600 }}
          >
            {title}
          </h1>
          <p
            className="font-crimson mt-3 text-lg italic"
            style={{ color: 'var(--parchment-3)' }}
          >
            {description}
          </p>
          <time
            className="font-cinzel mt-4 block text-xs tracking-widest"
            style={{ color: 'var(--parchment-3)' }}
          >
            {publishedAt}
          </time>
          <div
            className="mt-8 h-px"
            style={{ backgroundColor: 'var(--border)' }}
          />
        </header>
        <div>{children}</div>
      </article>
    </div>
  );
}
