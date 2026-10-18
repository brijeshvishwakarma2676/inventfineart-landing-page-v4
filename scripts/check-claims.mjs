// Fails if a claim removed in SITE-V4-PLAN.md §4.3 appears in visitor-facing code (app/ and api/).
// Scans .js/.jsx only (CSS is skipped) and ignores code comments, so notes like "the old site said
// ISO 9001:2008" are allowed in comments. Phrases, not bare strings: "100%" in a clip-path is fine.
// Usage: node scripts/check-claims.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIRS = ['app', 'api'];
const SKIP = new Set(['app/data/images.generated.js']);

const BANNED = [
  [/C83600/i, 'bronze alloy grade'],
  [/\bSS ?3(04|16)\b/i, 'stainless steel grade'],
  [/cast\s+bronze/i, 'cast bronze'],
  [/\bcorten\b/i, 'corten steel'],
  [/marine[- ]grade/i, 'marine-grade'],
  [/2K\s+polyurethane/i, '2K polyurethane'],
  [/\b(Lodha|Oberoi|Godrej)\b/i, 'clients not in the sources'],
  [/Ahmedabad/i, 'Ahmedabad workshop'],
  [/foundry/i, 'foundry'],
  [/Euroclass|\bASTM\b|\bMPa\b/i, 'engineering data'],
  [/70\s?%\s+lighter|light-?weight/i, 'weight claim'],
  [/100\s?%\s+(weather|impermeable|immune|rust)|weather-?proof|UV[- ]stabili[sz]ed|zero maintenance/i, 'durability claim'],
  [/9001\s?:\s?2008/i, 'withdrawn ISO version'],
  [/since\s+2009/i, 'founding year 2009'],
  [/Vasai/i, 'factory location (it is Nalasopara West)'],
  [/\bawards?\b|award-winning/i, 'awards'],
  [/master\s+craftsm/i, 'master craftsmen'],
  [/\bCNC\b|\bcrane\b|maquette/i, 'process claim'],
  [/registered\s+(office|address)/i, '"registered" address'],
  [/five-star/i, 'five-star'],
];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const out = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return out.flat();
}

// Blank out comments but keep line numbers. `//` after ":" or a quote is a URL, not a comment.
const stripComments = (src) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => m.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((line) => line.replace(/(^|[^:'"`\\])\/\/.*$/, '$1'))
    .join('\n');

const hits = [];
for (const dir of DIRS) {
  for (const file of await walk(path.join(ROOT, dir))) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    if (!/\.(jsx?|mjs)$/.test(rel) || SKIP.has(rel)) continue;
    const lines = stripComments(await fs.readFile(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      for (const [re, why] of BANNED) {
        const m = line.match(re);
        if (m) hits.push(`${rel}:${i + 1}  "${m[0]}"  (${why})`);
      }
    });
  }
}

if (hits.length) {
  console.error(`check-claims: ${hits.length} removed claim(s) found (SITE-V4-PLAN.md §4.3):\n  ${hits.join('\n  ')}`);
  process.exit(1);
}
console.log('check-claims: no removed claims found');
