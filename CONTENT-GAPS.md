# Content gaps and provisional values

As of 2026-10-18 (Phase 0). This is the **master list**: it supersedes `site-v3/CONTENT-GAPS.md`. Every value below is a stand-in. It can be built and shown, but the client must confirm or replace it before launch.

- Find them all with `grep -rn PROVISIONAL app`. Launch is blocked until that command shows nothing (SITE-V4-PLAN.md §7).
- Sources of truth are `../old data/raw_html/*.html`, `../old data/media/` and `../new-design.md`. The archive's own notes (`old data/pages/*.md`, `README.md`, `site_data.json`) are **not** a source. Anything found only there is provisional.
- "Phase N" in the Where column means the value arrives in that build phase.

## Provisional values

| # | What | Value used now | Where |
|---|---|---|---|
| 1 | Founding year | 2008 (old Home: "SINCE 2008"; old About: 2009) | `app/data/site.js:7` |
| 2 | Stats | 18+ years · 160+ designs · 30+ clients (34 client names and 28 logo brands on the old site) | `app/data/site.js:51` |
| 3 | Certification | "ISO 9001 Certified". The old site says ISO 9001:2008, withdrawn in 2018; ask for the current certificate | `app/data/site.js:14` |
| 4 | Enquiry inbox | inventfineart.mum@gmail.com | `app/data/site.js:21` |
| 5 | WhatsApp number | +91 93232 10327 | `app/data/site.js:23` |
| 6 | Hero headline | "Sculptures, designer planters, GRC and FRP, made to your design." The alternative is v3's "Art that gives your space an identity."; the client picks at the Home mock-up | `app/data/site.js:46` |
| 7 | Hero video | none, so the slider is used | `app/data/site.js:48` |
| 8 | Catalogue PDF | none (`/catalogue` is not built) | `app/data/site.js:58` |
| 9 | Sizes | Planters S/M/L/Custom; the rest "Made to your size and drawing" | `app/data/lines.js:18, 38, 59, 79, 100` |
| 10 | Finishes | 5 names; swatches are flat token colours | `app/data/lines.js:110` |
| 11 | FRP banner and designs | photos from `other_products` that look fibre-made (3, 6, 8, 9, 11, 12, 13, 14) | `app/data/lines.js:101`; designs: Phase 2 |
| 12 | GRC Grilles split | `grc_products` 4, 5, 6, 10 = grilles; plus `wall_murals` 12, 13 (jali gates) | `app/data/lines.js:80`; designs: Phase 2 |
| 13 | Testimonials | none (section hidden) | `app/data/testimonials.js:2` |
| 14 | Architect logos | none (section hidden) | Phase 2 (`app/data/clients.js`) |
| 15 | Logo | wordmark only; the vector logo is needed | Phase 3 (`app/components/ui/Logo.jsx`) |
| 16 | FAQ answers | short answers built only from sourced facts | Phase 2 (`app/data/faqs.js`) |
| 17 | **Factory address wording** | "Opp. Jag Mata Mandir, Wagholi Road, Nalasopara West, Thane 401203" (old contact page; "Nalasopra" spelling fixed). Nalasopara is now in Palghar district: should it say Palghar? v2 and v3 wrongly said "Vasai/Virar" | `app/data/site.js:37` |
| 18 | **Second email** | inventfineart@gmail.com (old contact page only). Is it still in use? | `app/data/site.js:22` |
| 19 | **Client list** | the 34 names and 28 logo brands from the old site (2017). Is the list current, and may we publish it? | Phase 2 (`app/data/clients.js`) |
| 20 | **Sculpture materials** | Fibre · Metal · Stone (archive notes only, not the old site) | `app/data/lines.js:17` |
| 21 | **Sculpture typology groupings** | the filter groups on /sculptures, proposed by us from the photos | Phase 2 (`app/data/designs.js`) |
| 22 | **Client sector groups** | the sectors on /clients, proposed by us | Phase 2 (`app/data/clients.js`) |

## Design titles

- Only the designs whose subject is unambiguous have descriptive titles (v3: 9 sculptures, 4 planters, all 15 GRC/GRL photos, the 8 FRP picks). The rest show "Sculpture design" with their code.
- **Ask the client for names** (and, ideally, size and material) per code. The list will be in `app/data/designs.js` (Phase 2). Codes stay identical to v3's.

## Photos still needed for a polished launch

- [ ] Designer planters: 20+ photos (4 on hand)
- [ ] FRP products: 10+ real photos (0 on hand; stand-ins used)
- [ ] GRC grilles: a pattern sheet, one image per pattern (4 photos on hand, plus 2 jali gates)
- [ ] 10+ installation or site photos for Projects
- [ ] Hero video: 15–30 s, landscape, at least 1080p, no audio
- [ ] Finish swatch photos (concrete grey, sandstone, matte colour, metallic bronze)
- [ ] Vector logo (SVG/AI/PDF)
- [ ] Larger client logos (the files on hand are 142 px wide)

## Image quality notes

- 71 source photos are under 1,200 px wide. They're fine in grids but are never used full-bleed (`npm run images` lists them).
- Most photos are site or workshop snapshots. The hero picks are made by eye in Phase 4; new photos are the biggest single improvement.
- Excluded from the catalogue (as in v3): `sculptures/22` (a concept drawing) and `other_products/10` (an exhibition poster).
