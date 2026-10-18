// Runs after the build: every prerendered page must already carry its SEO in the HTML (SITE-V4-PLAN.md §6, §7).
// Checks: one H1 · title (unique, ≤ 70 chars) · description (unique, 50–170 chars) · canonical = the page URL ·
// og:image is absolute and the file exists · every JSON-LD block parses and has the fields its type needs ·
// every <img> has an alt attribute · noindex pages are left out of the sitemap.
// Usage: node scripts/check-seo.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL } from '../app/data/site.js';

const OUT = path.resolve(import.meta.dirname, '../build/client');
const walk = async (d) =>
  (await Promise.all((await fs.readdir(d, { withFileTypes: true })).map((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])))).flat();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const NEEDS = {
  LocalBusiness: ['name', 'url', 'address', 'telephone'],
  BreadcrumbList: ['itemListElement'],
  CollectionPage: ['name', 'url'],
  FAQPage: ['mainEntity'],
};

const problems = [];
const titles = new Map();
const descriptions = new Map();
const sitemap = await fs.readFile(path.join(OUT, 'sitemap.xml'), 'utf8');
const pages = (await walk(OUT)).filter((f) => f.endsWith('.html'));

for (const file of pages) {
  const rel = path.relative(OUT, file).replace(/\\/g, '/');
  const route = rel === '404.html' ? '/404' : ('/' + rel.replace(/(^|\/)index\.html$/, '')).replace(/\/$/, '') || '/';
  const html = await fs.readFile(file, 'utf8');
  const bad = (msg) => problems.push(`${route}: ${msg}`);
  const noindex = html.includes('name="robots" content="noindex"');

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) bad(`${h1s.length} <h1> elements (want 1)`);

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  if (!title) bad('no <title>');
  else if (title.length > 70) bad(`title is ${title.length} chars (max 70): ${title}`);
  if (!noindex) titles.set(title, [...(titles.get(title) ?? []), route]);

  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  if (!description) bad('no meta description');
  else if (!noindex && (description.length < 50 || description.length > 170)) bad(`description is ${description.length} chars (50–170)`);
  if (!noindex) descriptions.set(description, [...(descriptions.get(description) ?? []), route]);

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const expected = SITE_URL + (route === '/' ? '' : route);
  if (route !== '/404' && canonical !== expected) bad(`canonical is ${canonical}, expected ${expected}`);

  const og = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (!og?.startsWith(SITE_URL + '/img/')) bad(`og:image is not an absolute /img URL: ${og}`);
  else if (!(await fs.access(path.join(OUT, og.slice(SITE_URL.length))).then(() => true, () => false))) bad(`og:image file missing: ${og}`);

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      bad('JSON-LD does not parse');
      continue;
    }
    for (const field of NEEDS[data['@type']] ?? []) {
      const v = data[field];
      if (v == null || (Array.isArray(v) && v.length === 0)) bad(`${data['@type']} JSON-LD has no ${field}`);
    }
  }

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(tag)) bad(`<img> without alt: ${tag.slice(0, 90)}`);

  const inSitemap = sitemap.includes(`<loc>${expected}</loc>`);
  if (noindex && inSitemap) bad('noindex page is in the sitemap');
  if (!noindex && route !== '/404' && !inSitemap) bad('indexable page missing from the sitemap');
}
for (const [t, r] of titles) if (r.length > 1) problems.push(`duplicate title "${t}": ${r.join(', ')}`);
for (const [d, r] of descriptions) if (r.length > 1) problems.push(`duplicate description: ${r.join(', ')}`);

if (problems.length) {
  console.error(`check-seo: ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-seo: ${pages.length} pages: one H1, unique titles and descriptions, canonical, OG image, JSON-LD, alt text`);
