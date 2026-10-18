# Site v4 — QA against the acceptance checklist

As of 2026-10-18, after Phase 9. Build: `dev` at the commit that adds this file, in `brijeshvishwakarma2676/inventfineart-landing-page-v4`. Checklist: `SITE-V4-PLAN.md` §7.

**Status: 18 of the 24 checklist items pass. The other 6 (4, 7, 9, 10, 13, 20) can't close until three things happen, none of them code:**
1. **The Vercel project.** Import the repo (framework "Other", production branch `main`) and copy v3's environment variables. That unlocks the live enquiry test, the live 404 and 301 checks, Lighthouse on the real host, and the URL for the client.
2. **The client's sign-off** on the Home mock-up and the look.
3. **The client's answers** to the 22 rows in `site-v4/CONTENT-GAPS.md`.

## How it was checked

| Command (in `site-v4/`) | What it proves | Result |
|---|---|---|
| `npm run check` | lint · no removed claims · design codes unchanged from v3 · 29 contrast pairs · build (16 prerendered pages, 404.html, sitemap, 24 redirects) · every rendered class has CSS · SEO on every page | all pass |
| `npm run test:ui` | 53 browser checks: mega menu, mobile menu, enquiry panel (focus, Esc, Tab, pre-fill, failed send), catalogue (24/12 shown, Show all, filters, lightbox, Enquire from the lightbox, `?design=`), projects `?type=`/`?img=`, contact `?service=`/`?code=`, the map on click, thank-you after a reload, About sub-nav position, no React #418 | 53/53 |
| `npm run test:api` | 16 offline checks of `api/enquiry.js` with Resend and Turnstile intercepted | 16/16 |
| `npm run shots` | every page at 360, 768, 1024, 1440: no horizontal scroll, no console errors | 16 × 4 pass |
| Lighthouse 12 (mobile) | on a local server with compression | see item 7 |

## Checklist

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Menu, Home and URLs built on the 5 lines; GRC Grilles and FRP have their own pages | **Pass** | `/sculptures` … `/frp-products` prerendered; Products mega menu; Home product rows |
| 2 | Palette and fonts as in §2; no off-token colours | **Pass** | `check:contrast` 29 pairs; `check:classes` 542 classes, no raw colours; Archivo only |
| 3 | Enquire on every design card, Get a Quote in the header, WhatsApp on every page | **Pass** | `DesignCard`, the lightbox Enquire, header block, `FloatingWhatsApp` in `root.jsx`; `test:ui` |
| 4 | A test enquiry with an upload reaches the inbox; the auto-reply arrives | **Pending (Vercel)** | Offline: `test:api` checks the recipient, reply-to, subject, escaped HTML, attachment and auto-reply payloads |
| 5 | 360/768/1024/1440 with no horizontal scroll; the mobile menu works | **Pass** | `shots` asserts it on all 16 pages; `test:ui` (phone) |
| 6 | Reduced motion is respected | **Pass** | Motion code never loads under reduced motion; the marquee becomes a grid; the hero doesn't advance; transitions are instant; `test:ui` runs in both modes |
| 7 | Lighthouse mobile: Perf ≥ 90, A11y ≥ 95, SEO 100, LCP < 2.5 s; hero preloaded | **Partly** | Local, compressed, HTTP/1.1: **A11y 100, Best practices 100, SEO 100** on Home, Sculptures, Projects, Contact. **Perf 83 / 79 / 89 / 91**, LCP 4.0 / 4.7 / 3.5 / 3.0 s, CLS 0. The hero photo is preloaded. On HTTP/1.1 the photo queues behind about 28 script files; re-measure on the Vercel preview (HTTP/2, CDN) before judging |
| 8 | No invented stats, clients, testimonials or certifications; no placeholder text | **Pass** | `check:claims`; every stand-in is marked PROVISIONAL; no lorem. Design titles are descriptions of the photos, flagged for the client |
| 9 | Every PROVISIONAL value confirmed or replaced (`grep -rn PROVISIONAL app` empty) | **Open: blocks launch** | 27 markers, listed with file:line in `site-v4/CONTENT-GAPS.md` |
| 10 | Old URLs redirect; sitemap submitted; enquiry conversions counted | **Partly** | 24 redirects (`statusCode: 301`) whose targets the build verifies; `sitemap.xml` (13 URLs) built. Search Console submission after launch. Conversions are counted as enquiry emails (no analytics, by decision) |
| 11 | `check:claims` passes | **Pass** | |
| 12 | Facts match §4.2 everywhere, incl. the raw factory address and both emails | **Pass** | Built Home, Contact, About and Sculptures all show "Nalasopara West" and `inventfineart@gmail.com`; "Vasai" appears nowhere; JSON-LD has both locations with their own coordinates |
| 13 | v2 URLs answer 301; unknown URLs 404; no `__spa-fallback` page | **Partly** | Locally: unknown paths and `/__spa-fallback` answer 404; `404.html` hydrates at any URL. The real status codes need the Vercel preview (`curl -I`) |
| 14 | No text or dark overlay on photos; no photo under 1,600 px used full-bleed | **Pass** | Split hero and headers; every edge-to-edge photo is 1,932–4,160 px |
| 15 | No cookie notice while no tracking cookies are set | **Pass** | None in the code; Google Maps loads only on click |
| 16 | No pills except WhatsApp, no card shadows, no chips, 0 radius; accent rules | **Pass** | The only `rounded-full` is the WhatsApp button; shadows only on it and the panel; radius tokens are 0 |
| 17 | View-source of every route has its H1, title, description, canonical and JSON-LD | **Pass** | `check:seo` on all 16 pages |
| 18 | Design codes match v3; adding a photo renumbers nothing | **Pass** | `check:codes`: all 105 v3 codes unchanged |
| 19 | Image file names content-hashed | **Pass** | `scripts/images.mjs`: hash of the source photo in every name; stale files removed |
| 20 | Turnstile: a retry after a failed send succeeds | **Partly** | The form resets the token after a failure; the server checks are in `test:api`. The live widget needs the keys on Vercel |
| 21 | Upload limit 4 MB | **Pass** | Client check; `test:api` "file over 4 MB: 400" |
| 22 | GSAP and Lenis not in the initial bundle; nothing above the fold hidden after paint | **Pass** | No motion chunk loads before the page's `load` event; reveals skip anything on screen and use opacity only |
| 23 | No chatbot, 3D gallery, intro, newsletter, awards or framer-motion in the bundle | **Pass** | Not in `package.json`; nothing in `build/client/assets` |
| 24 | No attribution lines in git | **Pass** | `git log --format=%B \| grep -iE "co-authored-by\|generated with\|noreply@anthropic"` prints nothing |

## What still blocks launch

1. **Vercel.** Import the repo, set the environment variables (from v3: `RESEND_API_KEY`, `ENQUIRY_TO`, `ENQUIRY_FROM`, and the Turnstile keys if used), then run on the preview:
   - the 6 enquiry tests in plan §6 Phase 8, checked in the real inbox;
   - `curl -I` on an unknown URL (404), on `/services/sculptures`, `/gallery/murals` and `/about-us.html` (301 + `Location`);
   - Lighthouse mobile on the 4 pages.
2. **Client sign-off** on the look: the Home mock-up on desktop and phone.
3. **Client answers** to `site-v4/CONTENT-GAPS.md`, in particular:
   - founding year (2008 or 2009), stats, ISO certificate;
   - WhatsApp number, enquiry inbox, whether `inventfineart@gmail.com` is still used;
   - the factory address wording (Thane or Palghar);
   - the client list (current? may we publish it?) and the sculpture filter groups;
   - sizes, finishes, sculpture materials, the GRC Grilles split, the FRP stand-in photos;
   - real names for the designs, the hero headline, the vector logo.
4. **Photos**: 20+ planters, 10+ FRP, a GRC grille pattern sheet, 10+ installation photos, finish swatches, a hero video if possible.
5. **Domain**: move `inventfineart.com` to the v4 project after sign-off, then submit the sitemap in Search Console.
