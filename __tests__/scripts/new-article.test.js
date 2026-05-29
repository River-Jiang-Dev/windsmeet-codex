const { generateGuideStub, generateCodexStub } = require('../../scripts/new-article');
const fs = require('fs');
const path = require('path');
const os = require('os');

describe('generateGuideStub', () => {
  it('creates an MDX file at the correct path', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-test-'));
    const intake = {
      title: 'Test Guide',
      description: 'A test guide description.',
      category: 'story-quests',
      slug: 'test-guide',
      tags: ['test'],
      overview_notes: 'Overview notes here.',
      sections: [
        { title: 'First Section', notes: 'First section notes.' }
      ],
      codex_connections: []
    };
    generateGuideStub(intake, tmpDir);
    const outputPath = path.join(tmpDir, 'en', 'guides', 'story-quests', 'test-guide.mdx');
    expect(fs.existsSync(outputPath)).toBe(true);
    const content = fs.readFileSync(outputPath, 'utf-8');
    expect(content).toContain('title: "Test Guide"');
    expect(content).toContain('category: "story-quests"');
    expect(content).toContain('Overview notes here.');
    expect(content).toContain('First Section');
  });
});

describe('generateCodexStub', () => {
  it('creates a Codex MDX file at the correct path', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-test-'));
    const intake = {
      title: 'Test Codex Entry',
      description: 'A test codex entry.',
      category: 'martial',
      slug: 'test-entry',
      tags: ['test'],
      historical_period: 'Five Dynasties (907-960 CE)',
      history_notes: 'Historical notes here.',
      in_game_notes: 'In-game notes here.',
      significance_notes: 'Why it matters.',
      sources: []
    };
    generateCodexStub(intake, tmpDir);
    const outputPath = path.join(tmpDir, 'en', 'codex', 'martial', 'test-entry.mdx');
    expect(fs.existsSync(outputPath)).toBe(true);
    const content = fs.readFileSync(outputPath, 'utf-8');
    expect(content).toContain('title: "Test Codex Entry"');
    expect(content).toContain('Historical notes here.');
  });
});
