// scripts/new-article.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Generate a guide article MDX stub from intake data.
 * @param {object} intake - Filled intake-guide.json data
 * @param {string} contentRoot - Root content directory (default: ./content)
 */
function generateGuideStub(intake, contentRoot = path.join(process.cwd(), 'content')) {
  const today = new Date().toISOString().split('T')[0];
  const tags = intake.tags.map(t => `"${t}"`).join(', ');

  const codexNotesBlock = (intake.codex_connections || [])
    .filter(c => c.slug && c.title)
    .map(c => `
<CodexNote
  title="${c.title}"
  preview="${c.preview_note || ''}"
  section="${c.section}"
  slug="${c.slug}"
/>`).join('\n');

  const sectionsBlock = (intake.sections || []).map(s => `
## ${s.title}

${s.notes}

<!-- Claude prompt: Turn these notes into guide content (steps, tips). -->
`).join('\n');

  const content = `---
title: "${intake.title}"
description: "${intake.description}"
category: "${intake.category}"
publishedAt: "${today}"
tags: [${tags}]
codexLinks: []
---

## Overview

${intake.overview_notes}

<!-- Claude prompt: Expand into a 2-paragraph introduction. -->
<!-- Audience: English-speaking gamers 20-40, unfamiliar with Chinese history. -->
<!-- Tone: Knowledgeable but not academic. Think "friend who knows a lot". -->
<!-- Avoid: delve, leverage, plethora, robust, tapestry, embark, journey (metaphor) -->
${codexNotesBlock}
${sectionsBlock}
`;

  const outputPath = path.join(contentRoot, 'en', 'guides', intake.category, `${intake.slug}.mdx`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf-8');
  return outputPath;
}

/**
 * Generate a Codex entry MDX stub from intake data.
 * @param {object} intake - Filled intake-codex.json data
 * @param {string} contentRoot - Root content directory
 */
function generateCodexStub(intake, contentRoot = path.join(process.cwd(), 'content')) {
  const today = new Date().toISOString().split('T')[0];
  const tags = intake.tags.map(t => `"${t}"`).join(', ');
  const sources = (intake.sources || []).length > 0
    ? intake.sources.map(s => `- ${s}`).join('\n')
    : '- (Add sources here)';

  const content = `---
title: "${intake.title}"
description: "${intake.description}"
category: "${intake.category}"
publishedAt: "${today}"
tags: [${tags}]
---

## Historical Background

${intake.history_notes}

<!-- Claude prompt: Expand into 2-3 paragraphs of accessible history. -->
<!-- Historical period: ${intake.historical_period} -->
<!-- Tone: Like a documentary narrator — vivid but factual. -->
<!-- Audience: Western gamers who don't know Chinese history. -->
<!-- Known sources:
${sources}
-->

## In the Game

${intake.in_game_notes}

<!-- Claude prompt: Bridge the history to the game in 1-2 paragraphs. -->
<!-- Be specific about how the game uses or adapts the history. -->

## Why It Matters

${intake.significance_notes}

<!-- Claude prompt: 1-2 paragraphs on why this history enriches the game. -->
<!-- End with a sentence that makes the reader want to replay that section. -->
`;

  const outputPath = path.join(contentRoot, 'en', 'codex', intake.category, `${intake.slug}.mdx`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf-8');
  return outputPath;
}

// CLI entry point
async function main() {
  const args = process.argv.slice(2);
  const typeFlag = args.indexOf('--type');
  const type = typeFlag !== -1 ? args[typeFlag + 1] : null;

  if (!type || !['guide', 'codex'].includes(type)) {
    console.error('Usage: node scripts/new-article.js --type guide|codex');
    process.exit(1);
  }

  const templateFile = type === 'guide'
    ? 'content-templates/intake-guide.json'
    : 'content-templates/intake-codex.json';

  const templatePath = path.join(process.cwd(), templateFile);
  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`);
    process.exit(1);
  }

  console.log(`\n=== WindsMeet Codex — New ${type === 'guide' ? 'Guide Article' : 'Codex Entry'} ===\n`);
  console.log(`1. Open and fill in: ${templateFile}`);
  console.log('2. Save the file');
  console.log('3. Press Enter here to generate the MDX stub\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await new Promise(resolve => rl.question('Press Enter when done...', resolve));
  rl.close();

  let intake;
  try {
    intake = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
  } catch (e) {
    console.error('Error reading intake file:', e.message);
    process.exit(1);
  }

  if (!intake.title || !intake.slug || !intake.category) {
    console.error('Error: title, slug, and category are required in the intake form.');
    process.exit(1);
  }

  const outputPath = type === 'guide'
    ? generateGuideStub(intake)
    : generateCodexStub(intake);

  console.log(`\n✅ Created: ${outputPath}`);
  console.log('\nNext steps:');
  console.log('1. Open the file — each section has a <!-- Claude prompt: ... --> comment');
  console.log('2. Paste section notes + prompt into Claude');
  console.log('3. Review, paste expanded content back');
  console.log('4. npm run validate:content');
  console.log('5. git add + git commit');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateGuideStub, generateCodexStub };
