#!/usr/bin/env node
// Pulls SKILL.md from noslopui.com into this repo.
//
// The workflow has exactly one source, and it isn't here: it's assembled on
// the server from `src/lib/agent/` in the website repo and served at
// /skill/SKILL.md. That's what the MCP server sends as its instructions, what
// the `build_ui` prompt expands to, and what `npx noslopui init` installs.
//
// This repo keeps a copy only so skill directories (Smithery, skills.sh,
// `npx skills add noslopUI/skills`) have a file in a GitHub repo to point at.
// Never edit skills/noslopui/SKILL.md by hand — the daily workflow overwrites
// it. Change the markdown in the website repo instead.
//
//   node scripts/sync-skill.mjs           update the copy
//   node scripts/sync-skill.mjs --check   fail if it is out of date

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ORIGIN = (process.env.NOSLOPUI_ORIGIN || 'https://noslopui.com').replace(/\/$/, '');
const TARGET = fileURLToPath(new URL('../skills/noslopui/SKILL.md', import.meta.url));
const check = process.argv.includes('--check');

const res = await fetch(`${ORIGIN}/skill/SKILL.md`, {
  headers: { 'user-agent': 'noslopui-skills-sync (+https://github.com/noslopUI/skills)' },
});
if (!res.ok) {
  // Enough to tell a real 404 from a bot filter or proxy answering for the
  // server — a challenge page looks nothing like a missing file.
  console.error(`Could not download the skill: HTTP ${res.status} ${res.statusText}`);
  console.error(`  content-type: ${res.headers.get('content-type') ?? '(none)'}`);
  console.error(`  server:       ${res.headers.get('server') ?? '(none)'}`);
  console.error(`  cf-ray:       ${res.headers.get('cf-ray') ?? '(none)'}`);
  console.error(`  body starts:  ${(await res.text()).slice(0, 300).replace(/\s+/g, ' ')}`);
  process.exitCode = 1;
} else {
  const latest = await res.text();
  if (!latest.startsWith('---')) {
    console.error('What came back does not look like a skill file.');
    process.exitCode = 1;
  } else {
    const current = existsSync(TARGET) ? readFileSync(TARGET, 'utf8') : '';
    if (current === latest) {
      console.log('SKILL.md is up to date.');
    } else if (check) {
      console.error(`SKILL.md is out of date with ${ORIGIN}/skill/SKILL.md. Run "node scripts/sync-skill.mjs" and commit the result.`);
      process.exitCode = 1;
    } else {
      writeFileSync(TARGET, latest, 'utf8');
      console.log(`SKILL.md updated from ${ORIGIN} (${latest.length} bytes).`);
    }
  }
}
