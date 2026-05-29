# Content Inbox

Drop raw material here while playing. Don't organize — just capture.

## Folder Meanings

- `screenshots/` — Game screenshots. Name them descriptively:
  `jade-blade-skill-animation.png`, `yunzhou-market-exterior.png`

- `notes/` — Quick text notes. One `.txt` file per topic:
  `jade-blade-history-notes.txt`

- `quotes/` — Exact in-game dialogue or item descriptions you want to quote.
  One `.txt` file per character/item: `master-qiu-dialogue.txt`

## Naming Convention

Prefix files with the article slug they'll be used in:
`jade-blade-arc__master-qiu-sword.png`
`jade-blade-arc__player-choice-dialogue.txt`

## After Playing

1. Move relevant files from `content-inbox/` to the article's image folder:
   `content/images/guides/story-quests/[slug]/`

2. Fill in the intake form:
   `content-templates/intake-guide.json` (for guides)
   `content-templates/intake-codex.json` (for Codex entries)

3. Run the stub generator:
   `node scripts/new-article.js --type guide`
   `node scripts/new-article.js --type codex`
