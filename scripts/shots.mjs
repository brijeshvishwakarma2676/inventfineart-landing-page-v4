// Screenshots at 360 / 768 / 1024 / 1440 into shots/: the first screen (`-fold`) and the full page.
// Needs the site running: `npm run preview` (default http://localhost:4173) or pass BASE=http://…
// With no paths, every prerendered page in build/client is captured (plus /404.html).
// Motion is set to "reduce" so reveals don't leave content hidden in full-page captures; pass --motion to keep it.
// Fails (exit 1) on horizontal scroll, page errors or console errors (e.g. React #418 hydration mismatches).
// Usage: node scripts/shots.mjs [--motion] [--fold] [/path ...]
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4173';
const OUT = path.resolve(import.meta.dirname, '../shots');
const WIDTHS = [360, 768, 1024, 1440];
const args = process.argv.slice(2);
const motion = args.includes('--motion');
const foldOnly = args.includes('--fold');
let routes = args.filter((a) => a.startsWith('/'));

async function builtRoutes() {
  const dir = path.resolve(import.meta.dirname, '../build/client');
  const walk = async (d) =>
    (await Promise.all((await fs.readdir(d, { withFileTypes: true })).map((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])))).flat();
  return (await walk(dir))
    .filter((f) => f.endsWith('.html'))
    .map((f) => '/' + path.relative(dir, f).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, ''))
    .map((r) => (r === '/' ? r : r.replace(/\/$/, '')))
    .sort();
}
if (!routes.length) routes = await builtRoutes();

await fs.mkdir(OUT, { recursive: true });
const problems = [];
const browser = await chromium.launch();
for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 780 : 900 },
    hasTouch: width < 1024,
    isMobile: width < 768,
    reducedMotion: motion ? 'no-preference' : 'reduce',
  });
  const page = await context.newPage();
  let current = '';
  page.on('pageerror', (e) => problems.push(`${current} @${width}: page error: ${e.message.slice(0, 160)}`));
  page.on('console', (m) => m.type() === 'error' && problems.push(`${current} @${width}: console: ${m.text().slice(0, 160)}`));
  for (const route of routes) {
    current = route;
    const name = (route === '/' ? 'home' : route.slice(1).replace(/\.html$/, '').replace(/\//g, '_')) + `-${width}`;
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, `${name}-fold.png`) });
    if (!foldOnly) {
      // Scroll through so lazy images load, then return to the top before the full-page capture.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 100));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
    }
    const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    if (sw > iw) problems.push(`${route} @${width}: horizontal scroll (${sw}px > ${iw}px)`);
    console.log(`shots/${name}${foldOnly ? '-fold' : ''}.png`);
  }
  await context.close();
}
await browser.close();
if (problems.length) {
  console.error(`\nshots: ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nshots: ${routes.length} pages × ${WIDTHS.length} widths, no problems`);
