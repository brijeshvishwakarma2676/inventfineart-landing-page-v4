# Invent Fine Art — Site v4 plan

As of 2026-10-18. Status: **awaiting your approval**. Nothing has been built. Building starts at Phase 0 only when you say so.

v4 inherits every rule in `SITE-V3-SPEC.md` and `SITE-V3-STACK-AND-PLUGINS.md` unless this plan says otherwise.

---

## 0. Context

**What v4 is.** v2 (`frontend-demo/`) has the depth of content and the section design the owner wants to keep: the five numbered product lines, and applications, typologies, materials, process, trust strip, FAQ and the client marquee. But v2 also:
- states specs, clients and awards that exist nowhere in the sources;
- uses wrong or tiny photos;
- has a hero that is almost black;
- shows a cookie notice that covers 41% of a phone screen;
- runs as a browser-rendered SPA that indexes poorly.

v3 (`site-v3/`) solved the engineering: prerendering, the enquiry system, the image pipeline and the menu. **v4 = v2's section design and content depth, in a new industrial look of its own (§2, clearly different from v3) + v3's machinery + only sourced facts.**

**Decisions made in this chat (2026-10-18):**

| Question | Decision |
|---|---|
| Visual base | **Concrete & Oxide** (changed later the same day from "Refined v2", which was too close to v3). Concrete and cement greys, graphite, one oxide accent, Archivo condensed capitals, square corners, visible ruled lines (§2). |
| AI chatbot | **Dropped.** The 3D gallery, intro overlay, newsletter, mock awards and cookie notice are dropped too. |
| Code location | **A new Git repo**, checked out at `site-v4/`. `frontend-demo/` and `site-v3/` stay untouched. |

**How this was checked:**
- Against the code, the old site's raw HTML and both builds, run in Chromium at 360, 768, 1024 and 1440 px (served from the existing `dist/` and `build/client`, which match the current sources).
- A separate review checked the plan's technical claims against `@react-router/dev` 8.4 and v3's files.

---

## 1. Verdict on v2

### 1.1 Your findings, checked

| Finding | Result | Evidence |
|---|---|---|
| Invented specs | **Confirmed, and more than listed** (full list in §4.3) | `src/data/services.js:49,50,53,103,107`; `src/components/MaterialSpecBar.jsx`; `src/components/FactoryTrustStrip.jsx:16-17,57` |
| Wrong photos and counts on the Home cards | **Confirmed** | Sculptures uses `hero/banner-1` (a GRC palace façade). Planters uses `services/ser.webp`, a 290×320 photo of a blue wave mural. GRC Grilles' "12" is typed in by hand and FRP's "17" is the count of "other" photos (`src/data/categories.js:104`). Both tiny images are also stretched to 1920 px as hero slides. |
| Cookie notice | **Confirmed** | 41% of the screen height at 360×780, 34% at 1440×900. "Essential only" is `text-text` (#191715) on a #14110e panel, about 1.06:1 contrast, so it can't be read. The site sets no ads or tracking cookies. **Remove the notice.** |
| Hero almost black | **Confirmed** | Three overlays are stacked (`src/components/Hero.jsx:128-130`): `from-black/85` top scrim + `from-bg-dark via-bg-dark/70` + `bg-black/30 mix-blend-multiply`. Slides change every 3.2 s. |
| Legacy navigation | **Confirmed** | Home · About · Gallery · Our Clients · Services ▾ · FAQ · Contact. There's no Get a Quote, and no floating WhatsApp (`FloatingWhatsApp.jsx` returns null). |
| Brand facts conflict | **Confirmed, and wider** | v2 says "Since 2009" and ISO 9001:2008, and even misquotes the old home line "SINCE 2008" as 2009. The factory address in v2 *and* v3 is wrong (see §4.2). |
| Browser-rendered SPA | **Confirmed** | `createBrowserRouter` in `src/routes.jsx`. Service-page canonical URLs become `https://www.inventfineart.comundefined` (`ServicePage.jsx:26`). |
| Template look | **Confirmed** | Outside the chatbot: Inter is used for headings, with 47 `rounded-full`, about 30 `shadow-*` and 2 `animate-pulse`. Two visual languages are mixed (hairline editorial vs. pill-and-card catalogue). |
| Out-of-brief scope | **Confirmed** | Chatbot: `src/chatbot/` + `chatbot/`, and `api/chat.js` returns 501, so it only ever ran on scripted mock replies. Three.js gallery (`ImmersiveGallery`/`ThreeDGallery`). `IntroReveal`. Disabled `NewsletterForm`. `AwardsSection` with `SHOW_MOCK_AWARDS = true`, so 4 fake awards render on /about. |
| Black strip above the header at 1440 | **It's the design, not a layout bug.** | The desktop info bar is `bg-black/30` (`Nav.jsx:87-118`) and sits on top of the hero's `from-black/85` scrim. v4 drops both. |
| Header halfway down the hero in screenshots | **A screenshot artifact** | In a real browser the header is `fixed` at top 0 at every width. `base.css:32` sets `scroll-behavior: smooth`, so the page is still scrolling back up when the full-page capture is taken. v4's screenshot script turns smooth scrolling off before capturing. |

**More v2 bugs found:**
- Clicking any gallery image on a service page crashes it: `ServicePage.jsx:311-317` passes the wrong props to `Lightbox.jsx:9`.
- `/gallery/wall-murals` and `/gallery/water-fountains` are linked across the site but are 404s.
- The badge reads "Service 001".
- `ServicePage` calls hooks after an early return (`:21-26`).
- The About sub-nav leaves a 36 px gap once the info bar collapses.
- `text-accent-light` (#c88950, about 2.8:1) is used as text 44 times.
- The WhatsApp number is typed directly into 9 files.

### 1.2 Pages

| v2 page | Verdict | In v4 |
|---|---|---|
| Home `src/pages/Home.jsx` | **Change** | Keep the section ideas; new order and honest copy (§3.1). |
| Services `src/pages/Services.jsx` | **Change → `/products`** | Keep the sticky 01–05 index with one block per line. Drop the invented materials. Add "browse by application" from v3. |
| ServicePage `src/pages/ServicePage.jsx` (`/sculptures` … and `/services/:slug`) | **Change → one product template** | **Keep:** banner, applications, typologies, gallery, prev/next. **Drop:** "Technical Data Sheet", "Materials & Surface Alchemy" and "How We Fabricate" (all invented). **Fix:** lighter banner, lightbox crash, canonical URL, badge. **Add:** design codes, Enquire on every card, "Show more", `?design=` deep links. `/services/*` 301s to the product pages. |
| GalleryHub `src/pages/GalleryHub.jsx` | **Go** | `/gallery` 301s to `/products`. Its hover-preview sentence and the 3D gallery are dropped. |
| GalleryCategory `src/pages/GalleryCategory.jsx` | **Go (its best parts move)** | "Load more", deep links (`?design=` on product pages, `?img=` on /projects) and prev/next move into v4 pages. `/gallery/*` 301s (§3). |
| About `src/pages/About.jsx` | **Change** | **Keep:** stats strip, sticky sub-nav (fixed), story, what we make, process, facility, client marquee, visit block. **Drop:** awards. Facts are corrected. |
| Clients `src/pages/Clients.jsx` | **Change** | **Keep:** logo grid. **Add:** the client names (34 in the old site's text) grouped by sector. **Drop:** the metrics strip, the "commission standard" claims and Ahmedabad. The marquee/grid toggle becomes a grid only. |
| Faq `src/pages/Faq.jsx` | **Keep** (answers rewritten) | Three groups. Answers are built only from sourced facts and stay PROVISIONAL (gap 16). FAQPage JSON-LD. |
| Contact `src/pages/Contact.jsx` + `components/ContactForm.jsx` | **Change** | v3's inline enquiry form (email + WhatsApp fallback) replaces the WhatsApp-only form. v2's link pre-fill is kept: `?service=` + `?code=` are read after hydration. Shows both addresses, both emails and 3 phones. The map loads on click. |
| NotFound `src/pages/NotFound.jsx` | **Keep the idea** | Served with a real **404 status** (v2 and v3 both return 200). |

### 1.3 Components, data, styles and tooling

| v2 file(s) | Verdict | In v4 |
|---|---|---|
| `main.jsx`, `routes.jsx`, `layouts/RootLayout.jsx`, `index.css` | **Go → v3 equivalents** | v3's `root.jsx` (providers, skip link, ScrollToTop, header/footer) + `routes.js` + `global.css`. The route progress bar and page fade are dropped. |
| `components/Nav.jsx` | **Change** | v3's `Header` + `MegaMenu` + `MobileMenu`, restyled. Menu: **Products ▾ · Projects · About · Clients · Contact · [Get a Quote]**. FAQ moves to the footer and mobile menu. The top bar is transparent over the hero, with no black fill. |
| `components/Hero.jsx` | **Change** | Keep v2's idea of **one slide per product line**. The layout becomes split (headline block beside the photo), so there is no overlay at all; 6.5 s per slide, photos at least 2,400 px wide, a static H1 and one set of controls (the duplicate bottom ribbon goes). No pulsing badge. Built on v3's `Hero.jsx`. |
| `components/PillarsShowcase.jsx` | **Change** | Keep the 5 numbered cards (the first spans 2 columns). Correct photos. No counts, chips or shadows. Only sourced materials. |
| `components/FactoryTrustStrip.jsx` | **Change (copy rewritten)** | A dark trust band: the 4 facility units from the old About page, provisional stats and ISO. Lodha/Oberoi/Godrej, the foundry and the CAD/crane claims are deleted. |
| `components/MaterialSpecBar.jsx` | **Change** | Two materials only, GRC and FRP, using the brief's own text, plus provisional finish swatches. The Metals tab and the spec table are deleted. |
| `components/FeaturedWorks.jsx` | **Change** | Six project photos of at least 1,200 px (the current ones are about 555 px), with catalogue-plate captions. |
| `components/BespokeProcess.jsx` | **Change** | Five sourced steps (from `data/site.js` `about.processSteps`). Its button opens the enquiry panel with file upload. |
| `components/ClientMarquee.jsx` | **Keep** (restyled) | Real brand names as alt text. Pauses on hover and focus. A static grid when the visitor prefers reduced motion. |
| `components/FaqTeaser.jsx`, `FaqList.jsx` | **Keep** | Restyled, with the contrast fixed. |
| `components/CtaBand.jsx` → `AnimatedMarqueeHero.jsx` | **Change** | Keep the old site's line "We can turn your ideas and imagination into reality." and the button. Rebuilt without framer-motion, as the footer CTA band. |
| `components/Footer.jsx` | **Change** | v3's dark footer layout with v2's content and your credit line. The newsletter, social placeholders, "Cookie settings" and "Replay intro" are removed. |
| `NewsletterForm.jsx`, `SocialLinks.jsx` | **Go** | No newsletter, and no real social URLs exist. |
| `CookieBanner.jsx`, `hooks/useConsent.js` | **Go** | No cookies are set. The map loads only when clicked. |
| `IntroReveal.jsx`, `Intro.jsx`, `utils/intro.js`, `utils/network.js`, `hooks/useIntro.js`, the boot loader + inline dark hero in `index.html` | **Go** | |
| `ImmersiveGallery.jsx`, `ThreeDGallery.jsx`, `data/showcase3d.js`, `HoverPreviewText.jsx` | **Go** | |
| `src/chatbot/**`, `chatbot/`, `api/chat.js`, `api/_lib/`, `environments/.env`, `scripts/build-knowledge.mjs`, `check-mock-data.mjs` | **Go** | Chatbot dropped. |
| `AwardsSection.jsx`, `data/awards.js`, `public/assets/awards/` | **Go** | Mock content. |
| `Lightbox.jsx`, `MasonryGrid.jsx`, `SmartImage.jsx`, `data/lqip.js` | **Go → v3 equivalents** | v3's `useLightbox` (yet-another-react-lightbox), `ProjectGrid` and `Img` with its dominant-colour placeholder. v2's "Enquire about this piece" action is kept in the lightbox caption. |
| `PageHeader.jsx` / `PageSkeleton.jsx` | **Change / Go** | v3's `PageHeader`, adapted. Prerendered pages don't need a loading skeleton. |
| `ServiceDetail.jsx` | **Change** | Becomes the line block on `/products`. |
| `MapEmbed.jsx` | **Change** | v3's click-to-load map, without v2's dark invert filter. |
| `AboutStatsStrip.jsx` | **Change** | 4 provisional stats; "6 disciplines" is dropped. |
| `AboutSubNav.jsx` | **Keep** (fixed) | Its offset uses the real header height. |
| `AboutVisitBlock.jsx` | **Keep** (fixed) | Labelled "Office address" (not "Registered"), with the real factory address. |
| `Icons.jsx` | **Go** | lucide-react. |
| `FloatingWhatsApp.jsx` (null), `ServicesTeaser.jsx` (dead) | **Go** | v3's `FloatingWhatsApp`. |
| `data/site.js` | **Change** | Corrected facts (§4.2). |
| `data/services.js` + `data/categories.js` | **Change → `data/lines.js`** | Brief copy word for word. Invented fields deleted. |
| `data/faqs.js` | **Change** | Only answers built from sourced facts. |
| `data/seo.js`, `hooks/usePageMeta.js` | **Change → v3 `Seo` + `seo.js`** | Fix the canonical, the address/geo mismatch and the fake "credential" JSON-LD. |
| `data/gallery.js`, `gallery-meta.js`, `clients.js` | **Go (regenerate)** | `images.generated.js` from v3's image script. |
| `styles/tokens.css`, `styles/base.css` | **Change** | The v4 tokens (§2) in one `@theme`. Dark-theme leftovers go. |
| `hooks/useReveal.js`, `usePresence.js` | **Go** | v3's GSAP `useReveal`. |
| `utils/whatsapp.js` | **Change** | One `whatsappLink()` built from `site.js`. |
| `scripts/optimize-images.mjs`, `build-manifest.mjs` | **Go** | v3's `scripts/images.mjs`. |
| `vercel.json` | **Change** | v3's file, plus 301s for v2's URLs. |
| `src/docs/*` (14 docs) | **Go** | They describe v1 (dark theme, 7 services). Superseded by this plan. |

---

## 2. Visual direction: "Catalogue"

Revised on 2026-10-19. The client saw v4, v2 and a third demo side by side and answered: "All are in same style. Only background color is different." All three shared the same structure (dark hero with a line drawing and 01–05 strip, the same Home order, nav and copy). So each demo now follows a different inspiration site from `new-design.md` (`THREE-DEMOS-DIRECTION.md`). **v4 follows metalssculpture.com: a white, photo-led, catalogue-first manufacturer site.** The line drawings now belong to the third demo only, and v4 no longer uses them.

Earlier directions, for the record: "Refined v2" (cream, bronze, serif; dropped on 2026-10-18 as too close to v3), then "Concrete & Oxide" (concrete greys, graphite, condensed capitals, split hero; 2026-10-18 to 2026-10-19).

### 2.1 Colour (Tailwind `@theme`, with the default palette switched off)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FFFFFF` | The page |
| `surface` | `#F3F2EF` | Light grey bands, cards |
| `surface-2` | `#E7E5E1` | Image placeholders |
| `paper` | `#FAF9F7` | Forms, the enquiry panel, tables |
| `line` / `line-strong` | `#E2DFDA` / `#C9C5BE` | Hairlines / rules (spec tags, tab strips, tables) |
| `field` | `#8A857D` | Form field borders (≥ 3:1) |
| `ink` / `ink-muted` | `#1A1A1A` / `#5C5851` | Charcoal text / secondary text |
| `oxide` | `#C24A1C` | The one accent: button fills (white text), headline emphasis, numbers |
| `oxide-deep` | `#8C3010` | Small accent text: links, eyebrows, codes; button hover |
| `oxide-bright` | `#E0612E` | The accent on charcoal (contact bar, footer) |
| `dark` / `dark-2` | `#1A1A1A` / `#262624` | The contact bar above the header, the footer |
| `chalk` / `chalk-muted` | `#F2F1EE` / `#A3A09A` | Text on charcoal |
| `white`, `whatsapp`, `error` | | As before |

Every allowed pair is in `app/styles/contrast.js` and tested by `npm run check:contrast`. No hex values in classes; the hero scrim and the menu shadow are named in `global.css` (`hero-scrim`, `shadow-menu`).

### 2.2 Type: Archivo only

- **Headlines (h1, h2, display):** Archivo bold at normal width, **sentence case**, tight tracking (−0.02em). Display 40 → 72 px, h1 36 → 60, h2 28 → 44, h3 20 → 24. `<em>` inside a headline is oxide.
- **The `headline` utility** (bold, tight) carries the same voice outside h1/h2: card titles, numbers, the wordmark.
- **Labels, design codes, eyebrows:** `caps-label` (bold capitals, tabular figures), as before.
- **Body and UI:** 400 body, 500–700 UI. Buttons in bold capitals.

### 2.3 Layout and shape

- **Container** 1320 px, gutter 16 → 32 px. Sections alternate white and light grey; no dark bands in the page body.
- **Header:** from 1024 px a charcoal contact bar (three phones, email, WhatsApp), then the white bar: logo · Products ▾ · Applications ▾ · Projects · About · Contact · [Get a Quote]. Both menus are white mega panels with photos.
- **Hero:** a full-width photo slideshow with the H1 centred on one dark scrim (this replaces the earlier "no text on photos" rule, for the hero only; product and inner-page headers stay split, with no text on photos).
- **Cards:** catalogue grids with photos and spec tags (code, title, detail); light grey icon cards for reasons and facility units. Square corners, except the **round finish swatches** (and the WhatsApp button).
- **Photography:** full-bleed only at ≥ 1,600 px. Catalogue photos 4:5.

### 2.4 Motion

As before: GSAP and Lenis load on idle, reveals skip what is on screen, the hero crossfades every 6.5 s with a slow zoom and can be paused, reduced motion stops everything. No line-drawing animation.

### 2.5 What makes it different from the other two demos

1. **Catalogue first:** popular designs with their IFA codes on Home, product-line tiles with design counts, Applications in the main menu.
2. **White and photo-led:** a full-width photo hero; no dark hero, no line drawings, no 01–05 strip.
3. **Manufacturer proof:** "Why clients choose us" cards, workshop photos with the stats and the four facility units, materials with round finish swatches, process steps. Every point restates the old site.

---

## 3. Site map and section order

```
/                       Home
/products               All five lines (v2 Services layout) + browse by application
  /sculptures  /designer-planters  /grc-products  /grc-grilles  /frp-products
/projects               Past work: wall murals, water features, outdoor structures
/about   /clients   /faq   /contact
/privacy   /thank-you (noindex)   /styleguide (noindex)   404 (real 404 status)
```

**Redirects.** All use `"statusCode": 301`; Vercel's `permanent: true` would answer 308.
- The 12 old `.html` URLs (as in v3).
- `/services` → `/products`.
- `/services/{the 5 slugs}` → `/{slug}`; any other `/services/*` → `/products`.
- `/gallery` → `/products`.
- To the matching line: `/gallery/{sculptures, designer-planters, planters, grc-products, grc, grc-grilles, grilles, frp-products, frp}`.
- `/gallery/other` → `/frp-products` (v2 mapped "other" to FRP).
- `/gallery/{wall-murals, murals}` → `/projects?type=wall-murals`; `/gallery/{water-fountains, fountains}` → `/projects?type=water-features`.
- Any other `/gallery/*` → `/products`.

**Header (every page)**
- Contact bar (from 1024 px): three phones · email · WhatsApp.
- Main row: logo · **Products ▾** (five lines with photos) · **Applications ▾** (six kinds of space, each linking to its tile on /products) · Projects · About · Contact · **[Get a Quote]**. Clients and FAQ are in the footer and the mobile menu.
- Mobile: a full-screen white menu (products with thumbnails, applications, pages), with **Get a Quote** and **Call** pinned at the bottom.

**Footer:**
- The CTA band ("We can turn your ideas and imagination into reality." [Get a Quote] [WhatsApp]). It is hidden on routes that export `handle.inlineEnquiry` (Home, Contact, and product pages, which end in the enquiry section).
- Product links 01–05, company links (including FAQ, Privacy), both addresses, 3 phones, 2 emails, "© Invent Fine Art", your credit line.

**Floating on every page:** the WhatsApp button, with a message that names the current page or design.

### 3.1 Home (12 sections + footer; catalogue direction, 2026-10-19)

1. **Hero.** Full-width photos, one per line (`site.hero.slides`, all ≥ 2,400 px), crossfading every 6.5 s. Centred on one scrim: "Sculptures · Planters · GRC · FRP", the H1 (PROVISIONAL, gap 6), the old About page's "start to end solutions" line, [Explore products] [Get a Quote]. Below: what the photo shows, one bar per slide, previous / pause / next. Slide 1 is preloaded.
2. **Five product lines.** Photo tiles (Sculptures large), each with the brief's tagline and its number of designs.
3. **Popular designs.** Eight catalogue cards with codes, Enquire, a second view on hover and the lightbox.
4. **Why clients choose us.** Six icon cards, each restating the old site (`content.js` `reasons`).
5. **Factory.** The "community of artists" line, two workshop photos, the provisional stats with ISO, the four facility units.
6. **Materials and finishes.** GRC | FRP in the brief's words; the provisional finishes as round photo swatches.
7. **Browse by application.** Six kinds of space with the lines that suit them (shared with /products).
8. **How we work.** Five sourced steps, [Send your drawing].
9. **Latest projects.** Six project photos.
10. **Trusted by.** Client logos.
11. **FAQ.** Five questions.
12. **Enquiry.** Pitch and direct lines beside the inline form.

### 3.2 Product page template (all 5 lines)

1. **Banner.** A photo of at least 1,600 px, breadcrumb, `0N / 05`, H1, tagline, [Get a Quote] [See the designs ↓].
2. **Intro and spec list.**
   - Left: the brief's copy **word for word**.
   - Right, as ruled rows: Suitable for (brief) · Materials · Sizes (P) · Finishes (P) · "Made to your size and drawing".
3. **Typologies.** 2–4 tiles, each with a real photo. Labels come from the brief's own words:

   | Line | Typologies |
   |---|---|
   | Sculptures | Decorative sculptures · Custom statement pieces |
   | Designer Planters | Contemporary · Traditional · Custom sizes & finishes |
   | GRC Products | Façade elements · Ornamental features · Cornices, columns & mouldings · Cladding & custom components |
   | GRC Grilles | Traditional ornamental · Contemporary geometric |
   | FRP Products | Decorative · Architectural · Project-specific |

4. **Catalogue.**
   - 4:5 plates in 2 columns on phone, 3 on tablet, 4 on desktop. Every card has **Enquire** (pre-fills the code), and tapping the photo opens the lightbox.
   - `?design=IFA-SC-012` opens that design, applied after hydration.
   - The first 12 (phone) or 24 (desktop) are shown, then *Show all N*. Extra cards are hidden with CSS, so there's no hydration mismatch.
   - Filter tabs appear only on lines with 12 or more designs (today, only Sculptures; the groupings are PROVISIONAL).
5. **"Made to your design" panel** (v3) + process. Shown when a line has **fewer than 6 designs or uses stand-in photos** (today: Planters with 4, and FRP with 8 provisional stand-ins).
6. **Related projects** (3).
7. **FAQ** for the line: 4–5 questions (answers PROVISIONAL, gap 16) + FAQPage JSON-LD.
8. **Prev / next line** (v2): `← 01 Sculptures · 03 GRC Products →`.
9. **Enquiry section**, pre-filled with this line.

### 3.3 Other pages

- **/products**
  1. Plain page header.
  2. v2's **sticky 01–05 index** on the left (a sticky tab strip on phone) next to five line blocks. Each block has a photo, tagline, short intro, Suitable for, [Explore range] and [Enquire].
  3. **Browse by application:** v3's 6 tiles.
  4. Footer CTA band.
- **/projects**
  1. Photo header.
  2. Tabs: All · Wall murals · Water features · Outdoor structures. `?type=` is read after hydration (v3's fix).
  3. Masonry + lightbox. `?img=` deep links are also read after hydration. *Show more*.
  4. Footer CTA band.
- **/about**
  1. Photo header, "Artisans and product designers".
  2. Stats strip (P).
  3. Sticky sub-nav: Story · What we make · Process · Facility · Visit.
  4. Story: the old About page, tidied but with the same facts.
  5. What we make: the 5 lines, plus murals, fountains, rockery, acoustic panels, 3D façades, railings, pergolas and gazebos (from the old About page).
  6. Process.
  7. 4 facility units.
  8. Client marquee.
  9. Visit block (both addresses).
  10. Footer CTA band.
- **/clients**
  1. Header with the old site's line about recent projects for valued clients.
  2. Logo grid: 28 brands, with duplicates removed (files 12/13 and 20/29).
  3. **Clients by sector:** the 34 names from the old site, grouped (developers, corporate & finance, hospitality & healthcare, defence & institutions, architects & design studios, industry & media). The grouping is PROVISIONAL.
  4. Testimonials, only if supplied.
  5. Footer CTA band.
- **/faq**
  1. Plain header.
  2. Three groups (The studio · Products · Enquiries), each with a sticky group title (v2).
  3. Footer CTA band.
  - FAQPage JSON-LD.
- **/contact**
  1. Plain header.
  2. Inline form (pre-filled from `?service=`/`?code=`), next to: 3 phones, 2 emails, WhatsApp.
  3. Office and factory addresses (§4.2) with directions links.
  4. A map that loads on click.
  - No footer CTA band.
- **/privacy**
  1. Plain header.
  2. What is collected (enquiry fields and file), where it goes (email to the client), no analytics or tracking cookies, the map loads only on click, contact for removal.
- **/thank-you:** noindex. Header with the visitor's name, read only after hydration (L1 fix). Buttons: keep exploring, or send photos on WhatsApp.
- **404**
  1. Plain header "Page not found".
  2. Links to the 5 lines, Projects and Contact.
  - Served with a 404 status.

---

## 4. Content audit

### 4.1 Source rules

1. **Sources of truth:** `new-design.md` (product copy, word for word), `old data/raw_html/*.html` and `old data/media/`.
2. **The archive's own notes** (`old data/pages/*.md`, `README.md`, `site_data.json`) add things the old site never said, such as bronze, fibre, mixed media and "Vasai/Virar". Anything found **only** there is PROVISIONAL.
3. **Provisional values** are allowed only if they are in `site-v3/CONTENT-GAPS.md` or added to v4's `CONTENT-GAPS.md` (§4.7). Each one is marked `// PROVISIONAL – confirm with client` in exactly one data file.
4. **A build check enforces this.** `scripts/check-claims.mjs` (run in `npm run check`) scans `app/data/**` and the JSX text nodes and attributes in `app/**`. It skips CSS and class names, so `100%` in a clip-path doesn't trip it.
   - It matches **claim phrases** with case-insensitive regexes: `C83600`, `SS ?3(04|16)`, `2K polyurethane`, `Lodha|Oberoi|Godrej`, `Ahmedabad`, `foundry`, `Euroclass`, `ASTM`, `\bMPa\b`, `70% lighter`, `100% (weather|impermeable|immune|rust)`, `9001 ?: ?2008`, `since 2009`, `Vasai`, `award`, `master craftsm`.
   - A hit fails the build.

### 4.2 Corrected brand facts (these go into `app/data/site.js`)

| Fact | v4 value | Source / status |
|---|---|---|
| Name and tagline | Invent Fine Art · "Reinventing spaces through Innovations in Art" | `raw_html/index.html` hero |
| Founded | **2008** → "Since 2008", "18+ years" | PROVISIONAL. Old Home says "SINCE 2008" (`index.html:279`); old About says 2009 (`about-us.html:216`) |
| Certification | "ISO 9001 Certified" (no version) | PROVISIONAL. The old site says 9001:2008, which was withdrawn in 2018 |
| Office | Invent Fine Art, No. 14, Jay Bharat Zip Sangh, Vadar Pada, Kandivali East, Mumbai 400101, Maharashtra, India | `contact-us.html:246-251`. **v3 lacks it** |
| **Factory** | Invent Fine Art, Opp. Jag Mata Mandir, Wagholi Road, Nalasopara West, Thane 401203, Maharashtra, India | `contact-us.html:258-261`. The raw text says "Nalasopra"; v4 fixes the spelling. **v2 and v3 both say "Near Jag Mata Mandir, Vasai/Virar"**, which comes only from the archive notes. PROVISIONAL: the area is now in Palghar district, so ask whether "Thane" should change |
| Phones | +91 93232 10327 · +91 96196 60089 · +91 89767 77123 | Old headers and footers |
| Emails | inventfineart.mum@gmail.com (main) · **inventfineart@gmail.com** | Both are on `contact-us.html:254,265`. v2 and v3 miss the second |
| WhatsApp | +91 93232 10327 | PROVISIONAL (v3 gap 5) |
| Social | none shown | All old links were `#` placeholders |
| Clients | 34 names in text (`our_client.html:219-266`) and 30 logo files = 28 brands | **v3's "Names are unknown" is wrong** |
| Materials named in sources | GRC (Glassfibre Reinforced Concrete), FRP (Fibre-Reinforced Plastic) | Brief and `services.html:546-548`. Everything else is PROVISIONAL |
| Geo (JSON-LD) | Office 19.1982543, 72.8644545 · factory 19.4196725, 72.7856904 | Old map links. v2 put the factory's coordinates on the office address |
| Awards, testimonials | none | Neither exists in the sources |

### 4.3 REMOVE: invented, with no source in the raw HTML or the brief

| Claim | Where in v2 |
|---|---|
| Cast bronze (C83600), hot chemical patinas, SS304/SS316 ("marine-grade"), spun brass/copper, corten, marble; Mirror/Satin/Verdigris/"Liver of Sulfur" finishes | `data/services.js:24-27,50-51`; `data/categories.js:19`; `MaterialSpecBar.jsx:38-49` (the whole Metals tab) |
| "From 2 ft … to 35+ ft monumental landmarks" | `services.js:49` |
| "100% Weatherproof", "100% Impermeable", "100% immune to rust", "UV-stabilized", "zero maintenance", "−20 °C to +80 °C" | `services.js:53,79,104,263,266,267`; `categories.js:39`; `MaterialSpecBar.jsx:28-31,35` |
| "Approx. 70% lighter" | `services.js:103`; `MaterialSpecBar.jsx:14` |
| "Automotive-grade 2K Polyurethane" | `services.js:107,240`; `categories.js:97`; `MaterialSpecBar.jsx:31` |
| In-house foundry, "metalfoundry bays", foundry casting, "alloy pours"; "formulated in-house to guarantee structural resilience" | `services.js:15,54`; `FactoryTrustStrip.jsx:16-17`; `ServicePage.jsx:183,359-360` |
| "Engineering Reliability Built for Decades"; "Unlike trading agents or brokers…" (the old site says the company *does* trade) | `FactoryTrustStrip.jsx:57,60` |
| Engineering data: ASTM C947 50–80 MPa, 18–30 MPa flexural, Class 0/A1 Euroclass, 1,900–2,100 kg/m³, 12–25 mm, 16–20% zirconia AR glass, SG 1.5–1.8, 15–65% open area, 2.4 × 1.2 m modules, SHGC, wind-load/seismic brackets | `services.js:133-135,156-161,176,181,185-188,209-214,262-264`; `MaterialSpecBar.jsx:14-21`; `categories.js:58,77` |
| Planter engineering: double-walled insulation, sub-irrigation, RAL matching, branding debossing, soil pressure | `services.js:69,81,99-100,106,108` |
| **Lodha, Oberoi Realty, Godrej Properties as clients** (only L&T is real) | `FactoryTrustStrip.jsx:34-35` |
| **An Ahmedabad workshop** | `pages/Clients.jsx:42`; `ServicesTeaser.jsx:26-27` |
| **4 mock awards** + award images; "Verified standard" | `data/awards.js:21-62`; `AwardsSection.jsx`; `public/assets/awards/` |
| CAD/DWG, 3D maquettes, parametric modelling, crane erection, heavy rigging, CNC metal/patterns, "structural anchoring, plumbing integration" | `BespokeProcess.jsx:9-27`; `ServicePage.jsx:127,350-355`; `FactoryTrustStrip.jsx:25-26`; `Nav.jsx:404`; `site.js:150,316`; `services.js:209`; `Clients.jsx:52` |
| "Parameters certified under our ISO 9001:2008 framework"; ISO "credential" JSON-LD | `ServicePage.jsx:253`; `data/seo.js:108-117` |
| "Vasai Works" / "In-House Vasai Works, Mumbai" (the factory is in Nalasopara) | `ServicePage.jsx:102`; `Nav.jsx:425` |
| "Master Craftsmen & Art Installers" / "Master craftsmen … since 2009" (the old site says "Artisans and Product designers") | `site.js:188`; `About.jsx:40`; `seo.js:93` |
| "Five-star hotels and luxury resorts", penthouses, bronze for villas, "engineered to weather all Indian climates", "artistic gravitas" | `Clients.jsx:15,27,33-34,47,227` |
| "Since 2009" as a quote of the home line (the old site says SINCE 2008) | `site.js:10-11,115` |
| "Registered Address" label | `AboutVisitBlock.jsx:30` |
| FAQ material list: bronze, brass, steel, terracotta, ceramic, acrylic, wood | `data/faqs.js:50` |
| GRC/FRP puffery ("gold standard", "dead-load", "international standards", "custom resin matrices") | `services.js:123,229` |
| Cookie notice copy ("monumental stone… atelier"); newsletter promise | `CookieBanner.jsx:164`; `NewsletterForm.jsx`; `site.js:365-369` |

### 4.4 PROVISIONAL: shown only as marked values

| Claim | v4 value | v2 location |
|---|---|---|
| Founding year | 2008 | `site.js:3`; `seo.js:84,99`; `index.html` |
| ISO | "ISO 9001 Certified" | `site.js:9,199`; `Footer.jsx`; `About.jsx:41` |
| Stats | 18+ years · 160+ designs · 30+ clients (v3). These replace v2's 15+ years / 166+ works / 30+ partners / 6 disciplines | `Clients.jsx:57-60`; `AboutStatsStrip.jsx:7-11` |
| WhatsApp number | 919323210327, kept in `site.js` only | `site.js:40` plus 8 hard-coded copies |
| Sculpture materials | Fibre · Metal · Stone (from the archive notes, not the raw HTML) | `site.js:300`; `categories.js:19` |
| "Lightweight", "rust-proof" (planters / FRP) | dropped unless the client confirms | `services.js:78,80,232` |
| Sizes, finishes | v3 values (gaps 9–10) | `services.js:105,241,265` |
| GRC/GRL split, FRP stand-in photos | v3 values (gaps 11–12) | `categories.js:80,100` |
| "Turnkey… across India" | "From concept to installation, across India". The old site has "turnkey projects" and lists clients in 10 cities | `faqs.js:82` |
| FAQ answers | built only from sourced facts (gap 16) | `data/faqs.js` |
| Client sector groups; sculpture typology filters | proposed by us | new |

### 4.5 KEEP: sourced

- The brief's taglines, intros and "suitable for" lists, **word for word** (`services.js`, `categories.js`, hero slides). Source: `new-design.md`.
- "Reinventing spaces through Innovations in Art". Source: old Home.
- From old About:
  - story, the line "start to end solutions from conceptualizations to the complete execution";
  - the 4 facility units;
  - the 5-step process ending in packing and fixing;
  - "stringently examined on numerous factors" (`site.js:185-296`, with the year, ISO and "Master Craftsmen" title corrected).
- "We can turn your ideas and imagination into reality." Tidied from the old Home CTA.
- The old service range (murals, gate grills, rockery, fountains, sculptures, façades, planters) and "GRC grills, railings, pergolas and gazebo". These go on About and Projects.
- The office address, 3 phones and the main email.
- Client logos, plus the 34 names.

### 4.6 v3 values that v4 corrects

| What | Correction |
|---|---|
| `site.js` factory "Near Jag Mata Mandir, Vasai–Virar" | Use the raw address |
| Office address | Add the full address (v3 shows only "Kandivali East") |
| Second email | Add it |
| `clients.js` "Names are unknown" | Use the real names |
| `content.js` process "using our own moulds and tools" | "in our manufacturing unit" (raw) |
| Sculpture "Bronze finish · Mixed media" | PROVISIONAL |

### 4.7 v4 `CONTENT-GAPS.md`

- v3's 16 rows, carried over. Row 6, the hero headline, now also covers the H1 choice.
- **New rows:**
  - 17 factory address wording (Thane or Palghar)
  - 18 whether `inventfineart@gmail.com` is still in use
  - 19 whether the client list is current
  - 20 sculpture materials
  - 21 sculpture typology groupings
  - 22 client sector groups

---

## 5. Tech approach

### 5.1 Repo and folders

- **Repo:** a new repo (name in open question 2), checked out at `site-v4/` with its own Vercel project.
- **Branches:** `main` is production; `dev` is where work happens, and every push gets a preview URL.
- **Commits and PRs never contain `Co-Authored-By: Claude` or any AI tag.**

```
site-v4/
  app/
    root.jsx  routes.js
    routes/               home, products, category, projects, about, clients, faq, contact,
                          privacy, thank-you, styleguide, not-found
    components/ui/        Button, Section/Container, SectionHeading, Plate (catalogue caption), Img,
                          Logo, Seo, useFocusTrap, useScrollLock, useLightbox, LightboxImpl
    components/layout/    Header, MegaMenu, MobileMenu, Footer (+ CtaBand), FloatingWhatsApp
    components/sections/  Hero, ProductLines, TrustBand, SelectedWorks, Materials, Process,
                          ClientMarquee, FaqList, EnquirySection, PageHeader, Typologies,
                          Catalogue, DesignCard, MadeToDesign, PrevNextLine, LineIndex,
                          Applications, ProjectGrid, StatsStrip, SubNav, VisitBlock,
                          ClientsWall, ClientSectors, Testimonials
    enquiry/              EnquiryContext, EnquiryPanel, EnquiryForm
    motion/               gsap, loadMotion (idle import), LenisProvider, useReducedMotion, useReveal
    data/                 site, seo, lines, designs (explicit code map), projects, clients,
                          applications, content, faqs, testimonials, images.generated
    styles/global.css     the only place tokens live
  api/enquiry.js
  media-src/              original photos (the same 207 as v3)
  public/                 img/ (generated), favicon.svg, robots.txt
  scripts/                images.mjs, shots.mjs, check-claims.mjs, postbuild.mjs (404 + sitemap)
  test/                   designs.snapshot.json (v3's code→photo list) + check-codes.mjs
  docs/                   SITE-V4-PLAN.md, new-design.md (copies)
  CLAUDE.md  CONTENT-GAPS.md  BACKLOG.md  README.md
  package.json  react-router.config.js  vite.config.js  vercel.json  jsconfig.json
  .oxlintrc.json  .gitignore  .env.example
```

### 5.2 How every page gets prerendered

- **Router config.** React Router **framework mode** with `ssr: false` and `prerender: async ({ getStaticPaths }) => [...getStaticPaths(), '/404']`. Checked valid in `@react-router/dev` 8.4:
  - `getStaticPaths()` returns every static route.
  - `/404` matches the `*` route and is written to `build/client/404/index.html`.
  - Prerender throws on any non-200 response, so the not-found route has no loader and never throws a 404 response.
- **`scripts/postbuild.mjs`:**
  - **moves** `404/index.html` to `404.html`;
  - **deletes** `__spa-fallback.html` (with `ssr:false` the build always writes it);
  - writes `sitemap.xml` (v3's logic: skips noindex pages).
- **`vercel.json` has no catch-all rewrite.**
  - Real paths serve their prerendered file (`cleanUrls`). Anything else gets `404.html` with a **404 status**.
  - This is safe: with `ssr:false`, route discovery is "initial", so there are no manifest requests.
  - `/api/enquiry` is unaffected, and query strings resolve by path.
  - The 404 HTML hydrates correctly at any URL, because hydration matches `window.location` against the same `*` route.
- **Local preview:** `sirv build/client --dev` **without `--single`**, so local 404s behave like Vercel. Screenshots capture `/404.html` directly.
- **Per-page `<Seo>`** (v3, a component; React 19 moves the tags into `<head>`) renders the title, description, canonical, OG and JSON-LD:
  - LocalBusiness with **both** addresses and the correct geo for each;
  - BreadcrumbList;
  - CollectionPage on product pages;
  - FAQPage on product pages and `/faq`.
- **Prerender rules:**
  - Browser APIs only inside effects.
  - Search params (`?type=`, `?img=`, `?design=`, `?service=`, `?code=`) and `location.state` are read only after hydration, through `useHydrated()` (React error #418).
  - Viewport-dependent counts use CSS, not JS.
- **Images:** `images.mjs` writes **content-hashed file names**, so the one-year `immutable` cache is safe. The manifest gains a `files` map, e.g. `{"gallery/sculptures/15": {w, h, color, files: {480: "gallery/sculptures/15-480.3f9a1c2e.webp", …}}}`. `Img`, `imageSrc()` (used by `Seo`) and `useLightbox` read names from it.

### 5.3 What comes from v3

| Treatment | Files |
|---|---|
| **Copied as-is** | `vite.config.js`, `jsconfig.json`, `.oxlintrc.json`, `.gitignore` · `app/components/ui/useFocusTrap.js`, `app/components/ui/Section.jsx` · `app/motion/gsap.js`, `app/motion/useReducedMotion.js` · `app/enquiry/EnquiryContext.jsx` · `app/components/sections/Testimonials.jsx`, `ClientsWall.jsx` · `app/data/testimonials.js` (`[]`) · `media-src/**`. These work unchanged because v4 `global.css` defines every token they use: `bg`, `surface`, `surface-2`, `ink`, `ink-muted`, `line`, `dark`, `cream`, `white`, `text-h1/h2/h3/small/micro`, `tracking-label/eyebrow`, `ease-out-soft`, `font-display/sans`, `rounded-image/button`, `py-section`, `container-site`. Tailwind silently ignores missing tokens, so Phase 1 greps every copied file's classes against the theme. |
| **Copied, then adapted** | `package.json`: name; fonts swapped for Archivo only; `check:claims`, `check:codes`; preview without `--single`; build tools stay in `dependencies`; `engines.node` `24.x`. · `react-router.config.js`: `/404`. · `vercel.json`: no catch-all; `statusCode: 301` redirects incl. v2's URLs; image cache header kept. · `.env.example`. · `app/root.jsx`: fonts, theme-color, branded ErrorBoundary, motion loader. · `app/routes.js`. · `app/styles/global.css`: v4 tokens + the aliases above. · `ui/Img.jsx`, `ui/useLightbox.jsx`: hashed file names. · `ui/LightboxImpl.jsx`: backdrop colour = `dark`; caption with code + Enquire; controlled index for deep links. · `ui/SectionHeading.jsx`: eyebrow is `bronze-deep`, Archivo wide at 600 (v3 uses olive, bold, 0.18em). · `ui/useScrollLock.js`, `motion/LenisProvider.jsx`, `motion/useReveal.js`: the motion loader rules in §2.4. · `ui/Button.jsx`. · `ui/Logo.jsx`: the PROVISIONAL wordmark, restyled. · `ui/Seo.jsx`, `data/seo.js`: two addresses. · `data/site.js`: §4.2. · `data/categories.js` → `data/lines.js`: it already holds the brief's copy word for word, plus SEO titles, banners and finishes; add numbering, typologies, prev/next. · `sections/PageHeader.jsx`: overlay ≤ 0.72; top padding from the header-height variable. · `sections/ProjectGrid.jsx`: controlled lightbox index for `?img=`, Show more. · `sections/DesignCard.jsx`: plate caption. · `sections/Hero.jsx`: one slide per line, static H1, no JS entrance on the H1. · `sections/StatsBand.jsx` → `StatsStrip`. · `sections/{Process, EnquirySection, Applications}.jsx`. · `layout/{Header, MegaMenu, MobileMenu, Footer, FloatingWhatsApp}.jsx`: numbering, FAQ in mobile, CTA band + `handle.inlineEnquiry`, both emails. · `enquiry/{EnquiryPanel, EnquiryForm}.jsx`: **reset the Turnstile token after a failed send**; pre-fill from `?service=`/`?code=`. · `api/enquiry.js`: import the product list from `app/data/lines.js`; with `TURNSTILE_SECRET` but no site key, log a clear error rather than reject every enquiry. · `routes/category.jsx`: typologies, catalogue, `?design=`, prev/next. · `routes/projects.jsx`: keeps the hydration-gated filter; adds `?img=`. · `routes/contact.jsx`: map on click, pre-fill. · `routes/thank-you.jsx`: name read after hydration. · `routes/{privacy, not-found, styleguide}.jsx`. · `scripts/images.mjs`: hashing. · `scripts/shots.mjs`: all routes; turns off smooth scroll and Lenis before capture; asserts no horizontal scroll. · `scripts/sitemap.mjs` → `postbuild.mjs`. · `public/robots.txt`. · `CLAUDE.md`: v4 tokens and rules. |
| **Reference only** (re-expressed, not copied) | `data/designs.js` → `designs.js` with an **explicit code per photo, identical to v3's** (exact mapping below). `data/{projects, clients, applications, content}.js` (shapes only; facts per §4). |
| **Not copied** | `sections/{CategoryPanels, Collections, MaterialsFinishes}.jsx`, `routes/{home, about, clients, products}.jsx` (rebuilt; each must export `handle.heroHeader` where it has a photo banner), `images.generated.js` and `public/img` (regenerated), `build/`, `shots/`, `.react-router/`, `node_modules/`, `package-lock.json` (regenerated). |

**Design codes: the exact v3 mapping that v4 writes down as a literal table.** v3 derives codes from list position.

| Code | Photo |
|---|---|
| `IFA-SC-001…076` | `sculptures/*` in numeric order, **skipping 22** (so SC-012 = sculptures/15, SC-068 = /80) |
| `IFA-PL-001…004` | `planters/1–4` |
| `IFA-GRC-001…011` | `grc_products` 1, 2, 3, 7, 8, 9, 11, 12, 13, 14, 15 |
| `IFA-GRL-001…006` | `grc_products` 4, 5, 6, 10, then `wall_murals/12`, `wall_murals/13` |
| `IFA-FRP-001…008` | `other_products` 3, 6, 8, 9, 11, 12, 13, 14. This is numeric order: `Object.keys` sorts the integer keys, not the declared 6, 3, 8… |

`test/designs.snapshot.json` is v3's code→photo list. `npm run check:codes` fails if any existing code changes. New photos get the next free number.

**From v2:** nothing is copied as a file, because v2 is read-only and needs rewriting. Its **section designs** (pillars, trust strip, materials, selected works, process, marquee, FAQ, the sticky line index, typologies, prev/next, the About sub-nav and visit block, client sectors, contact pre-fill) and its **sourced copy** (`site.js` `about`, the sourced parts of `faqs.js`) are rebuilt in v4.

**Libraries** (v3's set, all versions as in `site-v3/package.json`): react-router 8.4, React 19, Tailwind 4, GSAP + `@gsap/react`, Lenis, yet-another-react-lightbox, lucide-react, react-hook-form, Resend, Turnstile, sharp, Playwright, oxlint, sirv-cli. **Changes:** fonts become `@fontsource-variable/fraunces` and `@fontsource-variable/archivo`. No framer-motion, Three.js or chatbot APIs.

---

## 6. Build phases

Every phase ends the same way:
1. `npm run check` passes (lint + claims + codes + build).
2. `npm run shots` captures the phase's pages at **360, 768, 1024 and 1440 px**.
3. I review the shots and fix what's off.
4. Commit (no AI tags) and push to `dev`, which gives a Vercel preview URL.
5. A short report to you, with the shot paths.

| # | Phase | Delivers | Exit check (besides shots) |
|---|---|---|---|
| 0 | **Repo and skeleton** | New repo + Vercel project; v3 infra copied (§5.3); stub routes for every page; prerender + `/404`; postbuild; redirects; `CLAUDE.md`, `CONTENT-GAPS.md`, `BACKLOG.md` | Each route has its own HTML, and `404.html` exists. On the preview: `curl -I /nope` returns **404**; `/services/sculptures`, `/gallery/murals` and `/about-us.html` return **301**; `/__spa-fallback` returns 404 |
| 1 | **Design system** | `global.css` tokens + aliases, fonts, Button/Plate/SectionHeading/Section, motion loader, `/styleguide` | Contrast table for every text/background pair ≥ 4.5:1 (UI ≥ 3:1). No hex values in classes. Every class in copied files resolves to a theme token. Font file sizes noted |
| 2 | **Data and content** | `site.js` (§4.2), `lines.js` (brief word for word), `designs.js` (literal code table), projects, clients (names), faqs, content; `check-claims.mjs`, `check-codes.mjs`; `CONTENT-GAPS.md` with file:line | `check:codes` shows 0 codes changed. `grep -rn PROVISIONAL app` matches `CONTENT-GAPS.md`. The styleguide shows real plates |
| 3 | **Layout shell + enquiry panel** | Graphite header bar, mega menu, mobile menu, footer + CTA band, WhatsApp button, enquiry panel + form (v3, restyled) | Keyboard: menu, mega menu and panel trap and restore focus; Esc closes; the panel opens from 3 entry points with the right pre-fill |
| 4 | **Home mock-up (CLIENT GATE)** | Header, Hero, Product lines, Trust band, Selected works, footer, with real photos | Preview URL sent to the client. **STOP until written sign-off on desktop and phone** |
| 5 | **Rest of Home** | Client feedback first, then Materials, How we work, Trusted by, FAQ, Enquiry | Home is 9 sections; 2 dark bands |
| 6 | **Product pages + /products** | The 5 lines on one template; the hub with sticky index and applications | Every card has Enquire; lightbox and `?design=` work after a reload; Show all; prev/next; "Made to your design" on Planters and FRP |
| 7 | **Remaining pages** | /projects, /about, /clients, /faq, /contact, /privacy, /thank-you, 404 | Filters, deep links, contact pre-fill and thank-you survive a reload with no React #418 |
| 8 | **Enquiry live** | Env vars on the Vercel project; Resend + Turnstile | Tests on the preview: with and without an attachment, invalid phone, a 5 MB file, a network failure (keeps input + WhatsApp fallback), retry after failure |
| 9 | **SEO, performance, accessibility, motion polish** | Lighthouse fixes, JSON-LD validation, reduced motion, motion loader timing | Lighthouse mobile scores on 4 pages reported; keyboard walk-through |
| 10 | **QA and client review** | §7 checklist with evidence; remaining gaps listed | Client reviews the staging URL; the domain moves only after sign-off |

---

## 7. Acceptance checklist

**From v3 spec §9 (and §6), kept:**
- [ ] Menu, Home and URLs are built on the 5 product lines. GRC Grilles and FRP have their own pages.
- [ ] Palette and fonts exactly as in §2. No off-token colours.
- [ ] Enquire on every design card, Get a Quote in the header, WhatsApp on every page.
- [ ] A test enquiry with an upload reaches the client's inbox, and the auto-reply arrives.
- [ ] Checked at 360, 768, 1024 and 1440 with no horizontal scroll (asserted by `shots.mjs`). The mobile menu works.
- [ ] Reduced motion is respected.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100, LCP < 2.5 s. The first hero image is preloaded.
- [ ] No invented stats, clients, testimonials or certifications. No placeholder text.
- [ ] Every PROVISIONAL value is confirmed or replaced (`grep -rn PROVISIONAL app` is empty) before launch.
- [ ] Old URLs redirect. The sitemap is submitted. Enquiry conversions are counted (see open question 3).

**New for v4:**
- [ ] `npm run check:claims` passes: none of the §4.1 phrases appear in data or JSX text.
- [ ] The facts match §4.2 everywhere (footer, Contact, About, JSON-LD), including the raw factory address and both emails.
- [ ] Every v2 URL (`/services*`, `/gallery*`) answers **301** to a v4 page. An unknown URL returns **HTTP 404**. No `__spa-fallback` page is reachable.
- [ ] Text sits on a photo only in the Home hero, on one scrim, with white text ≥ 4.5:1 on the brightest slide; elsewhere no text on photos. No photo under 1,600 px is used full-bleed.
- [ ] No cookie notice while the site sets no tracking cookies. If analytics are added, the notice is at most 20% of a 360×780 screen and both buttons are ≥ 4.5:1.
- [ ] No pills, no card shadows, no chips, square corners; the only circles are the WhatsApp button and the round finish swatches. Small accent text uses `oxide-deep` on light and `oxide-bright` on charcoal; text on oxide is white.
- [ ] View-source of every route already contains its H1, title, description, canonical and JSON-LD. Link previews (og:image) are 1200 × 630 JPGs on the project's own domain, so WhatsApp shows a picture.
- [ ] `npm run check:codes`: design codes match v3 for the same photos. Adding a photo renumbers nothing.
- [ ] Image file names are content-hashed. Replacing a photo shows the new one at once.
- [ ] Turnstile: a retry after a failed send succeeds.
- [ ] Upload limit is 4 MB, the Vercel request limit. This is a stated change from spec §5's 10 MB, and larger files are sent by WhatsApp or email.
- [ ] GSAP and Lenis are not in the initial bundle. No above-the-fold element is hidden after it has painted.
- [ ] None of the chatbot, 3D gallery, intro, newsletter, awards or framer-motion is in the bundle.
- [ ] `git log --format=%B | grep -iE "co-authored-by|generated with|noreply@anthropic"` prints nothing (no attribution lines or AI tags).

---

## 8. Open questions for you

| # | Question | My recommendation |
|---|---|---|
| 1 | Does v4 replace v3 as the launch candidate? | **Yes.** Freeze v3 as a reference. v4's `CONTENT-GAPS.md` becomes the one master list. The domain moves to v4 only after the client signs off. |
| 2 | What should the new repo be called, and who owns it and the Vercel project? | `inventfineart-site-v4`, under the same GitHub owner as v3. A new Vercel project in the same team. Copy v3's env values (Resend key, `ENQUIRY_TO`/`FROM`, Turnstile keys). |
| 3 | Analytics and the cookie notice? | **Launch with no tracking cookies and no notice.** Count enquiries from the API. Add Vercel Web Analytics (cookieless) if page views are wanted. Add GA4/Clarity only if the client asks; then a one-line consent bar that meets §7. |
| 4 | Publish client names on /clients? | **Yes.** They come from the client's own old site: 28 logo brands plus 34 names grouped by sector. Add a gap row asking the client to confirm the list is current. |
| 5 | Which hero H1 should the mock-up show? | *"Sculptures, designer planters, GRC and FRP, made to your design."* It names the five lines, is backed by the old site's "as per design and requirement", and doesn't repeat the Sculptures tagline on slide 1. Show v3's *"Art that gives your space an identity."* as the alternative and let the client pick at the gate. |

---

## 9. How this is verified

- **Per phase:**
  - `npm run check` (oxlint + `check:claims` + `check:codes` + build).
  - Confirm that `build/client/**/index.html` exists for every route, that `404.html` exists and that `__spa-fallback.html` doesn't.
  - `npm run preview` (sirv `--dev`, no `--single`, never `vite preview`), then `npm run shots` at the 4 widths.
  - Review the screenshots, then push for a Vercel preview.
- **On every preview:**
  - `curl -sI` on an unknown path (expect 404), on old `.html` and v2 URLs (expect 301 + `Location`), and on `/sculptures` (expect 200 + HTML containing the H1).
  - View-source spot checks.
  - A reload of each deep-link URL with the console open (expect no #418).
- **Enquiry (Phase 8):** the 6 test cases in §6, with the email and the auto-reply checked in the inbox.
- **Launch gate (Phase 10):** every §7 item, each with evidence (screenshot path, command output or Lighthouse report), and the list of remaining `CONTENT-GAPS.md` rows.

---

## 10. Changes made during the build

Decisions taken while building, recorded here so this plan stays the source of truth.

| Phase | Change | Why |
|---|---|---|
| — | Open questions 1–5 (§8) accepted as recommended (2026-10-18): v4 replaces v3 as the launch candidate; repo created as `brijeshvishwakarma2676/inventfineart-landing-page-v4` (branches `main`, `dev`); no analytics cookies; client names published; the recommended hero H1 | You said "go" |
| 0 | Fraunces loads `opsz.css` + `opsz-italic.css`, not `full.css`; the SOFT axis is dropped | The Latin regular + italic are 149 KB instead of 271 KB |
| 0 | `ClientsWall.jsx` and `Testimonials.jsx` are copied in the phase that uses them, not in Phase 0 | They import files that arrive later; every commit must build |
| 0 | The attribution check in §7 matches `co-authored-by`, `generated with` and `noreply@anthropic` | The earlier pattern also matched the file name `CLAUDE.md` |
| 1 | v3's `motion/gsap.js` and `LenisProvider.jsx` are replaced by `motion/motion.js` (idle loader) + `MotionProvider.jsx`; `@gsap/react` is removed | Any static import of GSAP would put it back in the first download (§2.4) |
| 1 | Two more build checks: `check:contrast` (every allowed pair in `app/styles/contrast.js` against the tokens) and `check:classes` (every class in the prerendered HTML must generate CSS) | Turn the Phase 1 exit checks into checks that run on every build |
| 2 | No client sector groups on /clients (CONTENT-GAPS row 22 becomes a question) | Half the 34 names don't say what the business is, so grouping them would be guesswork; the names show as one list |
| 2 | All 76 sculptures get a descriptive title (v3 left 67 as "Sculpture design") and one of 5 filter groups | A catalogue needs readable plates; titles describe only what each photo shows, and are flagged for the client to name |
| 2 | "Browse by application" links each space only to the lines whose brief copy names it; the 6th tile is "Large-scale & project-specific" (was "Public & large-scale") | The brief never mentions public projects; v3 had linked FRP to hotels and commercial spaces without a source |
| 2 | Related projects re-picked from photos ≥ 1,300 px wide | Some of v3's picks were 504–900 px |
| 2 | Line FAQs are 4 per line: 2 specific to the line + "Do you deliver and install?" + "How do I get a quote?" | Plan said 4–5; every extra answer would need a source |
| 3 | **Visual direction changed to "Concrete & Oxide"** (§2 rewritten): concrete/cement/graphite + oxide, Archivo only (Fraunces removed), 0 radius, ruled lines, a solid graphite header, a split hero with no overlay | You asked for a theme and style clearly different from v3; v2's palette is too close to v3's |
| 3 | `Section.jsx` gains a `paper` tone and `Container frame` (grid lines), so it is adapted rather than copied as-is; `useFocusTrap.js` listens on the document | Theme; and the trap lost Esc and Tab after the submit button disabled itself (focus fell to <body>), a bug v3 has too |
| 3 | Reduced-motion CSS makes transitions `0s` instead of `0.01ms` | With 0.01ms every element transitioned its inherited `visibility`, so the panel and menu could not take focus as they opened (also in v3) |
| 3 | `npm run test:ui` (`scripts/ui-check.mjs`): 35 browser checks of the menus, the panel and the form | Phase 3's keyboard and pre-fill exit checks, kept for later phases |
| 4 | Phone hero order: photo, then the 01–05 strip and a one-line caption, then the headline (desktop keeps headline beside the photo) | On a phone the first screen was all text |
| 4 | Product lines are numbered rows with a sticky preview, not v2's card grid | The new theme's "numbered rows that reveal a photo" layout |
| 8 | Phase 8 is split: `npm run test:api` (16 offline checks, Resend and Turnstile intercepted) now; the live tests with the real inbox wait for the Vercel project and its environment variables | The Vercel project isn't set up yet |
| 9 | Reveals animate opacity only (no `autoAlpha`) | `visibility: hidden` took below-the-fold headings out of the accessibility tree (Lighthouse "heading-order"; screen-reader heading navigation) |
| 9 | The panel's form loads on first open; inline forms stay a normal import | Lazy inline forms streamed a placeholder first and shifted the Contact layout (CLS 0.73) |
| 9 | A 1,200 px image width added | Phones at ~2.6× jumped from 960 to the 1,600 px file (224–267 KB) |
| 9 | `npm run check:seo` in `npm run check` | One H1, unique titles (≤ 70) and descriptions, canonical, OG image, JSON-LD fields, alt text, sitemap |
| After 10 | Home hero shows line drawings instead of photos: one per product line, graphite band, 01–05 tabs kept. The first drawing is complete in the prerendered page; each next one draws itself (CSS `pathLength` dashes, no GSAP). Photo slides stay in `site.js`, unused | Asked for after the owner saw a drawn-hero reference. Real photos remain on every other page |
| After 10 | New graphite "Sketchbook" band on Home (between Materials and How we work) with the same five drawings, each captioned with the design codes it is drawn from (`/line?design=` links). Home is now 10 sections, 3 graphite bands (hero, trust band, sketchbook) | Asked for together with the drawn hero |
| After 10 | The hero slideshow no longer stalls when the tab is hidden at the moment a slide changes | Bug: the timer skipped the change and never ran again |
| After 10 | Design and project cards show a second view on hover or keyboard focus: the piece's line drawing (20 design cards), else another photo of the same piece (`SAME_PIECE` in `designs.js`, from the titles) or project (`SAME_PROJECT` in `projects.js`, 4 pairs judged from the photos). A short hint under the card names it; touch screens keep one photo. The second photo loads only on first hover | Asked for: two images of the same product on hover |
| 2026-10-19 | **Visual direction changed to "Catalogue"** (§2, §3 header, §3.1 rewritten): white page and light-grey bands, Archivo bold in sentence case, a charcoal contact bar and white header with Products and Applications menus, a full-width photo hero with a centred headline on one scrim, product-line tiles, popular designs with codes, "why clients choose us", the factory, round finish swatches, applications on Home. Removed: the drawn hero, the Sketchbook band and the drawings in card hover views (the second photo on hover stays) | The client said the three demos were "all in same style, only background color is different". Each demo now follows a different inspiration site from `new-design.md` (`THREE-DEMOS-DIRECTION.md`); v4 follows metalssculpture.com, and the line drawings belong to the third demo |
| 2026-10-19 | Link previews: the site URL comes from the build (`scripts/site-url.mjs`: `SITE_URL`, else the Vercel project's production domain, else inventfineart.com), and postbuild saves each page's og:image as a 1200 × 630 JPG under `/og/`. `sharp` moved to `dependencies` (postbuild runs on Vercel) | WhatsApp showed no picture: og:image pointed at www.inventfineart.com, which still serves the old site, and was a WebP |
