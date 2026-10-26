// Interaction checks in a real browser (Playwright): mega menu, mobile menu, enquiry panel and form.
// Needs the site running: `npm run preview` (default http://localhost:4173) or pass BASE=http://…
// Saves screenshots of each open state into shots/ui-*.png. Exit 1 if any check fails.
// Usage: node scripts/ui-check.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4173';
const OUT = path.resolve(import.meta.dirname, '../shots');
await fs.mkdir(OUT, { recursive: true });
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });
const shot = (page, name) => page.screenshot({ path: path.join(OUT, `ui-${name}.png`) });

const browser = await chromium.launch();
const panel = '[role="dialog"][aria-labelledby="enquiry-title"]';
const panelOpen = (page) => page.$eval(panel, (el) => !el.inert && getComputedStyle(el).visibility === 'visible');
const focusIn = (page, sel) => page.evaluate((s) => !!document.querySelector(s)?.contains(document.activeElement), sel);

// ---------- Desktop, mouse ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${BASE}/styleguide`, { waitUntil: 'networkidle' });

  const trigger = page.locator('button[aria-controls="mega-menu"]');
  await trigger.hover();
  await page.waitForTimeout(250);
  check('mega menu opens on mouse hover', (await trigger.getAttribute('aria-expanded')) === 'true');
  await page.locator('#mega-menu a').first().hover();
  await page.waitForTimeout(250);
  check('mega menu stays open moving into the panel', (await trigger.getAttribute('aria-expanded')) === 'true');
  await shot(page, 'mega-1440');
  await page.mouse.move(700, 850);
  await page.waitForTimeout(400);
  check('mega menu closes when the mouse leaves', (await trigger.getAttribute('aria-expanded')) === 'false');

  // Keyboard: open with Enter, Tab into the panel, Esc closes and returns focus to the trigger.
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  check('mega menu opens with Enter', (await trigger.getAttribute('aria-expanded')) === 'true');
  await page.keyboard.press('Tab');
  check('Tab moves into the mega menu', await focusIn(page, '#mega-menu'));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  check('Esc closes the mega menu', (await trigger.getAttribute('aria-expanded')) === 'false');
  check('focus returns to the Products button', await page.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'mega-menu'));

  // No Get a Quote at the top (meeting 2026-10-24): the header offers the phone and WhatsApp instead.
  check('header has no Get a Quote', (await page.locator('header', { hasText: 'Get a Quote' }).count()) === 0);
  check('header has the phone and WhatsApp', (await page.locator('header a[href^="tel:"]').count()) > 0 && (await page.locator('header a[href*="wa.me"]').count()) > 0);

  // Footer Get a Quote (end of the page) → panel; focus inside; Tab stays inside; Esc closes and restores focus.
  const quote = page.locator('footer button', { hasText: 'Get a Quote' });
  await quote.click();
  await page.waitForTimeout(200);
  check('footer Get a Quote opens the panel', await panelOpen(page));
  check('focus moves into the panel', await focusIn(page, panel));
  for (let i = 0; i < 40; i++) await page.keyboard.press('Tab');
  check('Tab stays inside the panel', await focusIn(page, panel));
  check('general enquiry: heading', (await page.textContent('#enquiry-title'))?.trim() === 'Tell us about your space');
  await shot(page, 'panel-1440');

  // Empty submit → validation messages.
  await page.locator(`${panel} button[type="submit"]`).click();
  await page.waitForTimeout(150);
  const alerts = await page.locator(`${panel} [role="alert"]`).allTextContents();
  check('empty submit shows name, phone and consent errors', alerts.length >= 3, alerts.join(' | '));

  // Valid submit against a server with no API → error, input kept, WhatsApp fallback filled in.
  await page.fill(`${panel} input[autocomplete="name"]`, 'Asha Rao');
  await page.fill(`${panel} input[type="tel"]`, '+91 98765 43210');
  await page.locator(`${panel} input[type="checkbox"][aria-invalid]`).check();
  await page.locator(`${panel} button[type="submit"]`).click();
  await page.waitForSelector(`${panel} a:has-text("Send on WhatsApp instead")`, { timeout: 5000 }).catch(() => {});
  const fallback = await page.locator(`${panel} a:has-text("Send on WhatsApp instead")`).getAttribute('href').catch(() => null);
  check('failed send shows the WhatsApp fallback', !!fallback);
  check('fallback message carries the details', fallback && decodeURIComponent(fallback).includes('Name: Asha Rao'));
  check('input is kept after a failed send', (await page.inputValue(`${panel} input[autocomplete="name"]`)) === 'Asha Rao');
  await shot(page, 'panel-error-1440');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  check('Esc closes the panel', !(await panelOpen(page)));
  check('focus returns to Get a Quote', await page.evaluate(() => document.activeElement?.textContent?.trim() === 'Get a Quote'));

  // Line and design pre-fill.
  await page.click('[data-test="enquire-line"]');
  await page.waitForTimeout(200);
  check('line enquiry: heading is the line', (await page.textContent('#enquiry-title'))?.trim() === 'Sculptures');
  check('line enquiry: line is ticked', await page.isChecked(`${panel} input[value="sculptures"]`));
  check('line enquiry: no design code field', (await page.locator(`${panel} input[readonly]`).count()) === 0);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await page.click('[data-test="enquire-design"]');
  await page.waitForTimeout(200);
  check('design enquiry: heading is the design', (await page.textContent('#enquiry-title'))?.trim() === 'Seated Buddha');
  check('design enquiry: code is filled in', (await page.inputValue(`${panel} input[readonly]`)) === 'IFA-SC-012');
  check('design enquiry: line is ticked', await page.isChecked(`${panel} input[value="sculptures"]`));
  await shot(page, 'panel-design-1440');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  check('no page errors (desktop)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Desktop, motion on: initial focus must also work with transitions running ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/styleguide`, { waitUntil: 'networkidle' });
  await page.locator('footer button', { hasText: 'Get a Quote' }).click();
  await page.waitForTimeout(200);
  check('motion on: focus moves into the panel', await focusIn(page, panel));
  await page.keyboard.press('Escape');
  await ctx.close();
}

// ---------- Product page catalogue (desktop) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto(`${BASE}/sculptures`, { waitUntil: 'networkidle' });
  const cards = '#designs ul > li';
  const visible = () => page.$$eval(cards, (els) => els.filter((el) => el.offsetParent !== null).length);
  check('catalogue: 24 designs show at first (desktop)', (await visible()) === 24, String(await visible()));
  await page.click('#designs button:has-text("Show all")');
  check('catalogue: Show all shows every design', (await visible()) === 76, String(await visible()));
  await page.click('#designs button[aria-pressed]:has-text("Devotional")');
  check('catalogue: a filter tab narrows the list', (await visible()) === 5, String(await visible()));
  await page.click('#designs button[aria-pressed]:has-text("All")');
  await page.locator('#designs ul > li button[aria-label^="View larger"]').first().click();
  await page.waitForSelector('.yarl__root', { timeout: 5000 }).catch(() => {});
  check('lightbox opens from a design photo', (await page.locator('.yarl__root').count()) > 0);
  await page.click('.yarl__root button:has-text("Enquire")').catch(() => {});
  await page.waitForTimeout(400);
  check('lightbox Enquire opens the panel with the code', (await page.inputValue(`${panel} input[readonly]`).catch(() => '')) === 'IFA-SC-001');
  check('lightbox closes when enquiring', (await page.locator('.yarl__root').count()) === 0);
  await page.keyboard.press('Escape');

  await page.goto(`${BASE}/sculptures?design=IFA-SC-012`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.yarl__root', { timeout: 5000 }).catch(() => {});
  const title = await page.locator('.yarl__slide_current .yarl__slide_title').textContent().catch(() => '');
  check('?design= deep link opens that design', title?.includes('Seated Buddha'), title);
  check('no page or console errors on the product page (incl. #418)', errors.length === 0, errors.join(' | ').slice(0, 300));
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/sculptures`, { waitUntil: 'networkidle' });
  const n = await page.$$eval('#designs ul > li', (els) => els.filter((el) => el.offsetParent !== null).length);
  check('catalogue: 12 designs show at first (phone)', n === 12, String(n));
  await ctx.close();
}

// ---------- Other pages: query strings, state and sticky nav survive a reload ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto(`${BASE}/gallery?type=water-features`, { waitUntil: 'networkidle' });
  check('gallery: ?type= selects the tab', (await page.getAttribute('button[aria-pressed="true"]', 'aria-pressed').catch(() => null)) && (await page.textContent('button[aria-pressed="true"]'))?.includes('Water features'));
  const shownProjects = await page.$$eval('main ul.columns-2 > li', (els) => els.filter((el) => el.offsetParent !== null).length);
  check('gallery: the filter shows only that group', shownProjects === 18, String(shownProjects));
  await page.goto(`${BASE}/gallery?img=wall_murals-9`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.yarl__root', { timeout: 5000 }).catch(() => {});
  check('gallery: ?img= opens that photo', (await page.locator('.yarl__root').count()) > 0);

  await page.goto(`${BASE}/contact?service=grc-grilles`, { waitUntil: 'networkidle' });
  check('contact: an old ?service=grc-grilles link ticks Customised products', await page.isChecked('main input[value="customised-products"]').catch(() => false));
  await page.goto(`${BASE}/contact?code=IFA-SC-012`, { waitUntil: 'networkidle' });
  check('contact: ?code= fills in the design', (await page.inputValue('main input[readonly]').catch(() => '')) === 'IFA-SC-012');
  await page.click('main button:has-text("Show office on the map")');
  check('contact: the map loads only on click', (await page.locator('main iframe[title^="Map"]').count()) === 1);

  await page.goto(`${BASE}/thank-you`, { waitUntil: 'networkidle' });
  await page.evaluate(() => history.replaceState({ usr: { name: 'Asha' }, key: 'test', idx: 0 }, ''));
  await page.reload({ waitUntil: 'networkidle' });
  check('thank-you: the name from navigation state shows after a reload', (await page.textContent('h1'))?.includes('Asha'));

  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(300);
  const navTop = await page.$eval('nav[aria-label="On this page"]', (el) => Math.round(el.getBoundingClientRect().top));
  const headerH = await page.$eval('header', (el) => Math.round(el.getBoundingClientRect().height));
  check('about: the sub-nav sticks right under the header (no gap)', navTop === headerH, `${navTop} vs ${headerH}`);

  check('no page or console errors on these pages (incl. #418)', errors.length === 0, errors.join(' | ').slice(0, 300));
  await ctx.close();
}

// ---------- Phone, touch ----------
{
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, hasTouch: true, isMobile: true, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const menu = '[role="dialog"][aria-label="Menu"]';
  await page.tap('button[aria-label="Open menu"]');
  await page.waitForTimeout(200);
  check('mobile menu opens', await page.$eval(menu, (el) => !el.inert && getComputedStyle(el).visibility === 'visible'));
  check('focus moves into the mobile menu', await focusIn(page, menu));
  await shot(page, 'menu-360');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  check('Esc closes the mobile menu', await page.$eval(menu, (el) => el.inert));
  check('focus returns to the menu button', await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Open menu'));

  await page.tap('button[aria-label="Open menu"]');
  await page.waitForTimeout(200);
  check('menu: WhatsApp pinned at the bottom (no Get a Quote)', (await page.locator(`${menu} a[href*="wa.me"]`, { hasText: 'WhatsApp' }).count()) === 1 && (await page.locator(menu, { hasText: 'Get a Quote' }).count()) === 0);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  await page.locator('button[aria-label="Enquire about Sculptures"]').first().tap();
  await page.waitForTimeout(300);
  check('a service Enquire opens the panel on the phone', await panelOpen(page));
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  check('no horizontal scroll with the panel open', sw <= iw, `${sw} > ${iw}`);
  await shot(page, 'panel-360');
  check('call link in the phone header', (await page.locator('header a[href^="tel:"]').count()) > 0);
  check('no page errors (phone)', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

await browser.close();
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.ok || !r.detail ? '' : `  (${r.detail})`}`);
const failed = results.filter((r) => !r.ok);
console.log(`\nui-check: ${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
