import { getArticle, getAllSlugs } from '@/lib/mdx';

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
