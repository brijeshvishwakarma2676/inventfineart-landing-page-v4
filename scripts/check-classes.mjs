// Runs after the build. Tailwind v4 silently ignores a class whose token doesn't exist (the default palette is
// switched off), so a class copied from v3 like `text-olive` would just do nothing. This reads every class in
// the prerendered HTML and checks that the built CSS has a rule for it. It also rejects hex colours in classes.
// Usage: node scripts/check-classes.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve(import.meta.dirname, '../build/client');
// Classes that are markers for other selectors (or added by libraries, like lucide's icon names) and have
// no CSS of their own.
const MARKERS = new Set(['group', 'peer', 'not-prose', 'lucide']);
const isMarker = (c) => MARKERS.has(c) || /^(group|peer)\/[\w-]+$/.test(c) || /^lucide-[\w-]+$/.test(c);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return out.flat();
}

const files = await walk(OUT);
const css = (await Promise.all(files.filter((f) => f.endsWith('.css')).map((f) => fs.readFile(f, 'utf8')))).join('\n');
const used = new Map(); // class → pages
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const page = '/' + path.relative(OUT, f).replace(/(^|\/)index\.html$/, '');
  const html = await fs.readFile(f, 'utf8');
  for (const [, value] of html.matchAll(/\sclass="([^"]*)"/g)) {
    for (const c of value.split(/\s+/).filter(Boolean)) {
      const cls = c.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
      if (!used.has(cls)) used.set(cls, new Set());
      used.get(cls).add(page);
    }
  }
}

const escape = (c) => c.replace(/[^a-zA-Z0-9_-]/g, (ch) => `\\${ch}`);
const hasRule = (c) => {
  const needle = `.${escape(c)}`;
  let i = css.indexOf(needle);
  while (i !== -1) {
    const next = css[i + needle.length];
    if (next === undefined || !/[a-zA-Z0-9_\\-]/.test(next)) return true;
    i = css.indexOf(needle, i + 1);
  }
  return false;
};

const problems = [];
for (const [cls, pages] of [...used].sort()) {
  const where = [...pages].slice(0, 3).join(', ');
  if (/#[0-9a-f]{3,8}\b|rgba?\(/i.test(cls)) problems.push(`${cls}  hex/rgb colour in a class (${where})`);
  else if (!isMarker(cls) && !hasRule(cls)) problems.push(`${cls}  no CSS generated (${where})`);
}
if (problems.length) {
  console.error(`check-classes: ${problems.length} class(es) without CSS or with raw colours:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-classes: ${used.size} classes, all generate CSS`);
