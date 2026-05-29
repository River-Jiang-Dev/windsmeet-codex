// components/ArticleLayout.tsx
interface ArticleLayoutProps {
  title: string;
  description: string;
  publishedAt: string;
  children: React.ReactNode;
}

export function ArticleLayout({ title, description, publishedAt, children }: ArticleLayoutProps) {
  return (
    <article className="prose prose-gray max-w-none">
      <header className="mb-8 not-prose">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-lg text-gray-600">{description}</p>
        <time className="mt-1 block text-sm text-gray-400">{publishedAt}</time>
      </header>
      <div>{children}</div>
    </article>
  );
}
