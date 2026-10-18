// Checks every allowed colour pair in app/styles/contrast.js against the token values in global.css.
// Usage: node scripts/check-contrast.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { PAIRS, BANNED_PAIRS, contrast } from '../app/styles/contrast.js';

const css = await fs.readFile(path.resolve(import.meta.dirname, '../app/styles/global.css'), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const rows = [];
const failures = [];
for (const [fg, bg, min, use] of PAIRS) {
  if (!tokens[fg] || !tokens[bg]) {
    failures.push(`${fg} on ${bg}: unknown token`);
    continue;
  }
  const ratio = contrast(tokens[fg], tokens[bg]);
  const ok = ratio >= min;
  rows.push(`${ok ? 'ok  ' : 'FAIL'} ${ratio.toFixed(2).padStart(5)}:1 ≥ ${min}  ${fg} on ${bg}  (${use})`);
  if (!ok) failures.push(`${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${min}:1 (${use})`);
}
for (const [fg, bg, instead] of BANNED_PAIRS) {
  rows.push(`ban  ${contrast(tokens[fg], tokens[bg]).toFixed(2).padStart(5)}:1        ${fg} on ${bg}  (${instead})`);
}
console.log(rows.join('\n'));
if (failures.length) {
  console.error(`\ncheck-contrast: ${failures.length} failure(s):\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`\ncheck-contrast: ${PAIRS.length} pairs pass`);
