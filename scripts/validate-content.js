// scripts/validate-content.js
// Run before publishing: node scripts/validate-content.js
// Checks all MDX files for required frontmatter fields.

const fs = require('fs');
const path = require('path');

const REQUIRED_FIELDS = ['title', 'description', 'category', 'publishedAt'];

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const result = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key && value) result[key] = value;
  }
  return result;
}

function validateDir(dirPath, errors) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      validateDir(fullPath, errors);
    } else if (entry.name.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const fm = extractFrontmatter(content);
      if (!fm) {
        errors.push(`${fullPath}: missing frontmatter`);
        continue;
      }
      for (const field of REQUIRED_FIELDS) {
        if (!fm[field]) {
          errors.push(`${fullPath}: missing required field "${field}"`);
        }
      }
    }
  }
}

const errors = [];
validateDir(path.join('content', 'en', 'guides'), errors);
validateDir(path.join('content', 'zh', 'guides'), errors);
validateDir(path.join('content', 'en', 'codex'), errors);
validateDir(path.join('content', 'zh', 'codex'), errors);

if (errors.length === 0) {
  console.log(`✅ All content files valid.`);
  process.exit(0);
} else {
  console.error(`❌ Found ${errors.length} content error(s):\n`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
