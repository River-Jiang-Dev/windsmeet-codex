import { getArticle, getAllSlugs, getStaticArticleParams } from '@/lib/mdx';

describe('getArticle', () => {
  it('returns frontmatter and content for a valid article', () => {
    const article = getArticle('en', 'guides', 'story-quests', 'introduction');
    expect(article.frontmatter.title).toBeTruthy();
    expect(article.frontmatter.category).toBe('story-quests');
    expect(article.content).toContain('#');
    expect(article.slug).toBe('introduction');
  });

  it('throws when article does not exist', () => {
    expect(() => getArticle('en', 'guides', 'story-quests', 'nonexistent')).toThrow();
  });
});

describe('getAllSlugs', () => {
  it('returns array of slugs for a category', () => {
    const slugs = getAllSlugs('en', 'guides', 'story-quests');
    expect(slugs).toContain('introduction');
  });

  it('returns empty array for nonexistent category', () => {
    const slugs = getAllSlugs('en', 'guides', 'nonexistent-category');
    expect(slugs).toEqual([]);
  });
});

describe('getStaticArticleParams', () => {
  it('includes the published English and Chinese articles', () => {
    const guides = getStaticArticleParams('guides');
    expect(guides).toEqual(
      expect.arrayContaining([
        { locale: 'en', category: 'story-quests', slug: 'introduction' },
        { locale: 'zh', category: 'story-quests', slug: 'introduction' },
      ])
    );

    const codex = getStaticArticleParams('codex');
    expect(codex).toEqual(
      expect.arrayContaining([
        { locale: 'en', category: 'martial', slug: 'jade-blade' },
        { locale: 'zh', category: 'martial', slug: 'jade-blade' },
      ])
    );
  });
});
