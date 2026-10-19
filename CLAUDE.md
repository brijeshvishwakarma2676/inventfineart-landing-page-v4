# Invent Fine Art — website v4

A marketing and catalogue site for Invent Fine Art, which makes sculptures, designer planters, GRC products, GRC grilles and FRP products in Mumbai.

**Source of truth: `docs/SITE-V4-PLAN.md`.** If this file and the plan disagree, the plan wins. Change the plan first, then the code. v4 inherits the v3 rules in `../SITE-V3-SPEC.md` unless the plan says otherwise. Product copy comes from `docs/new-design.md`, word for word.

## Stack (locked)
- React 19, **JavaScript only** (`.jsx`/`.js`, no TypeScript).
- Tailwind CSS v4 (`@tailwindcss/vite`), with no config file.
- React Router v8 framework mode with `ssr: false`; every route is prerendered, plus `/404`.
- `scripts/postbuild.mjs` moves `/404` to `404.html`, deletes `__spa-fallback.html`, writes the sitemap and saves the link-preview JPGs (`/og/`). The site URL comes from `scripts/site-url.mjs` (the Vercel project's domain until inventfineart.com moves).
- Other libraries: GSAP (ScrollTrigger), Lenis, yet-another-react-lightbox, lucide-react, react-hook-form, Resend, Turnstile, and Fontsource (Archivo `wdth`).
- Images: `scripts/images.mjs` (sharp) turns `media-src/` into content-hashed `public/img/*.webp` plus `app/data/images.generated.js`.
- Do **not** add other UI or CSS libraries, a CMS, framer-motion, Three.js, a chatbot or AI APIs.

## Design tokens (locked; they live ONLY in `app/styles/global.css` `@theme`)
Direction: **"Catalogue"** (plan §2): white and photo-led, after metalssculpture.com. The default Tailwind palette is switched off. Tailwind ignores a missing token silently, so check new classes against the theme.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FFFFFF` | The page |
| `surface` | `#F3F2EF` | Light grey bands, cards |
| `surface-2` | `#E7E5E1` | Image placeholders |
| `paper` | `#FAF9F7` | Forms, panel, tables |
| `line` / `line-strong` | `#E2DFDA` / `#C9C5BE` | Hairlines / rules (spec tags, tab strips, tables) |
| `field` | `#8A857D` | Form field borders |
| `ink` / `ink-muted` | `#1A1A1A` / `#5C5851` | Text / secondary text |
| `oxide` | `#C24A1C` | The one accent: button fills (white text), headline emphasis, numbers |
| `oxide-deep` | `#8C3010` | Small accent text on light: links, eyebrows, codes; button hover |
| `oxide-bright` | `#E0612E` | The accent on charcoal only |
| `dark` / `dark-2` | `#1A1A1A` / `#262624` | Contact bar, footer / raised on charcoal |
| `chalk` / `chalk-muted` | `#F2F1EE` / `#A3A09A` | Text on charcoal / secondary text on charcoal |
| `white` | `#FFFFFF` | Text on oxide and on the hero photos |
| `whatsapp` | `#25D366` | The floating WhatsApp button only |
| `error` | `#9B2C1F` | Form errors only |

- **Type:** Archivo only (`font-sans`). h1/h2 are bold, normal width, sentence case; the `headline` utility gives the same voice elsewhere (card titles, numbers, wordmark).
  - Labels, design codes and eyebrows: the `caps-label` utility (bold capitals, tabular figures).
  - Sizes: `text-display` (40→72), `text-h1` (36→60), `text-h2` (28→44), `text-h3` (20→24), `text-number`, `text-lead`, `text-body` (16→17), `text-small`, `text-micro`.
- **Layout:** container 1320 px (`container-site`), gutter 16 → 32 px. Section padding `py-section` (72→128). Sections alternate white and `surface`.
- **Header:** charcoal contact bar from 1024 px + white bar; `--header-h` is 4.5rem, 6.75rem from 1024 px. Sticky offsets read it.
- **Shape:** square corners. The only circles are the WhatsApp button and the round finish swatches. No card shadows (the mega menus use `shadow-menu`), no chips, no pills.
- **Photos:** text sits on a photo only in the Home hero, on `hero-scrim`. Everywhere else, captions go under the photo.

## Rules
1. Token colours only; no hex values in classes (named styles such as `hero-scrim` live in `global.css`). Text on oxide is white; on charcoal use `chalk` or `oxide-bright`.
   - Allowed colour pairs and their contrast live in `app/styles/contrast.js`; `npm run check:contrast` tests them against the tokens.
   - Write class names out in full (use a lookup object, never `` `bg-${tone}` ``): Tailwind only generates classes it can read in the source. `npm run check:classes` fails on any rendered class without CSS.
   - Dot-separated lists use `dots()` from `components/ui/format.js`, so a wrapped line never starts with "·".
2. **Never invent facts:** specs, materials, stats, certifications, clients, testimonials, awards or years.
   - Use only `docs/new-design.md`, `../old data/raw_html`, `../old data/media`, or a value in `CONTENT-GAPS.md`.
   - Each provisional value lives in one data file, marked `// PROVISIONAL – confirm with client`, and is listed in `CONTENT-GAPS.md` with file:line.
   - `npm run check:claims` fails on the claims removed in plan §4.3. Don't weaken it to make a build pass.
   - Design codes (`IFA-SC-012`…) are enquiry references and never change: each photo has an explicit code in `app/data/designs.js`, identical to v3's. A new photo gets the next free number; a removed one leaves a gap. `npm run check:codes` compares against `test/designs.snapshot.json`.
3. Every route renders `<Seo>` with a unique title and description, plus JSON-LD where the plan says.
4. Images only through `<Img id="…">` / `imageSrc()`; file names come from the manifest. Never use a source under 1,600 px wide full-bleed.
5. Browser APIs (`window`, `document`) only inside effects. Read search params and `location.state` only after hydration (`useHydrated()`), or React throws #418. Viewport-dependent counts use CSS, not JS.
6. Never animate `visibility` when *opening* a dialog (focus can't move in). Motion follows plan §2.4 and respects `prefers-reduced-motion`.
   - Never import `gsap`, `gsap/ScrollTrigger` or `lenis` statically. They arrive through `useMotion()` (`app/motion/motion.js`), which loads them when the browser is idle and returns null until then (and always under reduced motion). Everything must work with native scrolling while it is null.
   - Mark elements with `data-reveal="up" | "stagger" | "clip"`; `useReveal` (run once in `root.jsx`) animates the ones below the fold.
7. After any visual change, run `npm run shots` and look at the screenshots (360, 768, 1024, 1440) before calling it done.
8. No features outside the plan. Ideas go in `BACKLOG.md`.
9. Don't modify `../frontend`, `../frontend-demo`, `../site-v3` or `../old data`. They're read-only references.
10. **Commits and PRs never include `Co-Authored-By: Claude` or any AI tag.**

## Commands
- `npm run dev`: dev server (http://localhost:5173)
- `npm run check`: lint (oxlint) + claims + codes + contrast checks, build, then the class check
- `npm run build`: prerendered static build into `build/client` (+ `404.html`, `sitemap.xml`)
- `npm run preview`: serve the build (http://localhost:4173); unknown URLs answer 404 as on Vercel
- `npm run test:api`: 16 offline checks of `api/enquiry.js` (validation, honeypot, file limits, Turnstile, the email payload and auto-reply); Resend is intercepted, nothing is sent
- `npm run shots`: Playwright screenshots of every built page at 4 widths into `shots/`; fails on horizontal scroll or console errors (needs `npm run preview` running)
- `npm run images`: rebuild images after adding photos to `media-src/` (`-- --force` rebuilds all)

## Folder map
```
app/
  root.jsx            document shell, providers, header/footer
  routes.js           route list (every entry is prerendered)
  routes/             one file per page; category.jsx serves all five product lines
  components/ui/      Button, Section/Container, SectionHeading, Plate, Img, Logo, Seo…
  components/layout/  Header, MegaMenu, MobileMenu, Footer, FloatingWhatsApp
  components/sections/ page sections
  enquiry/            EnquiryProvider + panel + form
  motion/             motion.js (idle loader: GSAP, ScrollTrigger, Lenis), MotionProvider, useReveal, useHydrated
  data/               hard-coded content (site, lines, designs, projects, clients…)
  styles/global.css   tokens + base styles (the only place tokens live)
  styles/contrast.js  allowed colour pairs + contrast maths (check script and /styleguide)
api/enquiry.js        Vercel function: validates, sends with Resend
media-src/            original photos (input to scripts/images.mjs)
public/img/           generated WebP (commit these)
scripts/              images, postbuild, check-claims, check-contrast, check-classes, shots
```
