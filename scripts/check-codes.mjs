// Fails if a design code changed. Codes are the enquiry reference, so a code shared with a client must keep
// pointing at the same photo. test/designs.snapshot.json is site-v3's code → photo list; every code in it must
// still exist in app/data/designs.js with the same image. The service a design is filed under may change (the
// 2026-10-24 restructure moved GRC/GRL/FRP designs into Customised products); the code and its photo may not.
// New codes are allowed; changed or missing ones are not, and no code or photo may appear twice.
// Usage: node scripts/check-codes.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const snapshot = JSON.parse(await fs.readFile(path.join(ROOT, 'test/designs.snapshot.json'), 'utf8'));
const src = await fs.readFile(path.join(ROOT, 'app/data/designs.js'), 'utf8');
const rows = [...src.matchAll(/code: '([^']+)', line: '([^']+)', image: '([^']+)'/g)].map(([, code, line, image]) => ({ code, line, image }));

const problems = [];
const byCode = new Map();
const byImage = new Map();
for (const r of rows) {
  if (byCode.has(r.code)) problems.push(`${r.code} appears twice`);
  if (byImage.has(r.image)) problems.push(`${r.image} has two codes (${byImage.get(r.image)}, ${r.code})`);
  if (!/^IFA-(SC|PL|MU|CP|GRC|GRL|FRP)-\d{3}$/.test(r.code)) problems.push(`${r.code} does not match IFA-<line>-<nnn>`);
  byCode.set(r.code, r);
  byImage.set(r.image, r.code);
}
for (const s of snapshot) {
  const r = byCode.get(s.code);
  if (!r) problems.push(`${s.code} is missing (was ${s.image})`);
  else if (r.image !== s.image) problems.push(`${s.code} changed photo: was ${s.image}, now ${r.image}`);
}
if (problems.length) {
  console.error(`check-codes: ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
const added = rows.length - snapshot.length;
console.log(`check-codes: ${rows.length} designs, all ${snapshot.length} v3 codes unchanged${added > 0 ? `, ${added} new` : ''}`);
