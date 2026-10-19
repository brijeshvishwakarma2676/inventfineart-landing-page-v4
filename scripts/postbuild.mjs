// Runs after `react-router build` (SITE-V4-PLAN.md §5.2):
// 1. Moves the prerendered /404 page to 404.html, which Vercel serves with a 404 status for unknown URLs.
// 2. Deletes __spa-fallback.html (every route is prerendered, so nothing needs it; left in, it would be a
//    reachable page with no title).
// 3. Writes sitemap.xml from the prerendered pages (noindex pages are skipped), and points robots.txt at it.
// 4. Fails the build if a redirect in vercel.json points to a page that wasn't built.
// 5. Link previews: saves each page's og:image as a 1200 × 630 JPG under /og/ (WhatsApp and other apps show JPG
//    reliably; WebP not always) and points og:image at it, with its size and type.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { siteUrl } from './site-url.mjs';

const SITE = siteUrl();

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'build/client');
const fail = (msg) => {
  console.error(`postbuild: ${msg}`);
  process.exit(1);
};

// 1 + 2
const notFoundDir = path.join(OUT, '404');
await fs.rename(path.join(notFoundDir, 'index.html'), path.join(OUT, '404.html')).catch(() => fail('build/client/404/index.html is missing (is /404 in the prerender list?)'));
await fs.rm(notFoundDir, { recursive: true });
await fs.rm(path.join(OUT, '__spa-fallback.html'), { force: true });

// 3
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return out.flat();
}
const built = new Set();
const pages = [];
for (const f of (await walk(OUT)).filter((f) => f.endsWith('.html'))) {
  const rel = path.relative(OUT, f).replace(/\\/g, '/');
  if (rel === '404.html') continue;
  const route = ('/' + rel.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '')).replace(/\/$/, '') || '/';
  built.add(route);
  const html = await fs.readFile(f, 'utf8');
  if (!html.includes('name="robots" content="noindex"')) pages.push(route);
}
pages.sort();
const today = new Date().toISOString().slice(0, 10);
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((p) => `  <url><loc>${SITE}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  '\n</urlset>\n';
await fs.writeFile(path.join(OUT, 'sitemap.xml'), xml);
const robots = path.join(OUT, 'robots.txt');
const robotsTxt = await fs.readFile(robots, 'utf8').catch(() => null);
if (robotsTxt) await fs.writeFile(robots, robotsTxt.replace(/^Sitemap:.*$/m, `Sitemap: ${SITE}/sitemap.xml`));
console.log(`postbuild: 404.html ready, spa fallback removed, sitemap ${pages.length} URLs`);

// 4. Expand ":param(a|b)" alternatives so every concrete destination can be checked.
const { redirects = [] } = JSON.parse(await fs.readFile(path.join(ROOT, 'vercel.json'), 'utf8'));
const missing = [];
for (const r of redirects) {
  if (r.statusCode !== 301) missing.push(`${r.source} must use "statusCode": 301`);
  const dest = r.destination.split('?')[0];
  const alt = r.source.match(/:(\w+)\(([^)]+)\)/);
  const targets = dest.includes(':')
    ? alt && dest.includes(`:${alt[1]}`)
      ? alt[2].split('|').map((v) => dest.replace(`:${alt[1]}`, v))
      : []
    : [dest];
  for (const t of targets) if (!built.has(t)) missing.push(`${r.source} → ${t}`);
}
if (missing.length) fail(`redirects to pages that were not built:\n  ${missing.join('\n  ')}`);
console.log(`postbuild: ${redirects.length} redirects checked`);

// 5
const ogDir = path.join(OUT, 'og');
await fs.mkdir(ogDir, { recursive: true });
const made = new Map(); // webp URL → jpg URL
let ogPages = 0;
for (const f of (await walk(OUT)).filter((f) => f.endsWith('.html'))) {
  let html = await fs.readFile(f, 'utf8');
  const m = html.match(/<meta property="og:image" content="([^"]+)"\/?>/);
  if (!m || !m[1].startsWith(SITE + '/img/')) continue;
  const src = m[1];
  if (!made.has(src)) {
    const file = src.slice(SITE.length); // /img/gallery/sculptures/20-1200.63265118.webp
    const name = file.replace(/^\/img\/gallery\//, '').replace(/-\d+\.([0-9a-f]+)\.webp$/, '.$1').replace(/\//g, '-') + '.jpg';
    await sharp(path.join(OUT, file)).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(ogDir, name));
    made.set(src, `${SITE}/og/${name}`);
  }
  const jpg = made.get(src);
  html = html.replace(
    m[0],
    `<meta property="og:image" content="${jpg}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:type" content="image/jpeg"/>`,
  );
  await fs.writeFile(f, html);
  ogPages++;
}
console.log(`postbuild: link-preview JPGs for ${ogPages} pages (${made.size} images), site URL ${SITE}`);
