# v4 `dev`: tasks from the client meeting

As of 2026-10-26.
- **Decisions and reasons:** `SITE-V4-DEV-DECISIONS-PLAN.md` (this folder). The meeting transcript is `../decision.txt`; line numbers are given as L…
- **Target:** build and deploy on **Saturday 31 October**; live on **1 November**.
- **Owner:** **Dev** = us; **Client** = Kiran Adate.
- **Status:** `[ ]` to do · `[x]` done · `[~]` waiting on the client.

Rules that apply to every task (from `CLAUDE.md`):
- No invented facts. Unconfirmed values are marked `PROVISIONAL` and listed in `CONTENT-GAPS.md`.
- Design codes never change.
- No AI tags in commits.
- `npm run check` must pass before every push.

---

## Phase 0: Decide (before any code). Answered 2026-10-26

| ID | Question | Owner | Answer |
|---|---|---|---|
| 0.1 | [x] URLs of the four services | Dev | `/sculptures`, `/murals-wall-features`, `/planters`, `/customised-products`. Old pages 301 to them (A1.6) |
| 0.2 | [x] Short name for "Customised designer products in FRP & GRC" (L1918) | Client | **"Customised Designer Products in FRP & GRC"**, his written list (decisions plan §6) |
| 0.3 | [x] Which Home sections stay between "Few executed works" and "Why choose us" | Dev | **Process + Clients** stay; **FAQ only on `/faq`** (A2.6) |
| 0.4 | [x] Executed-work heading | Dev | **"Few executed works"** + a "View gallery" button |
| 0.5 | [x] Sketchbook band | Dev | **Remove** (A2.5) |
| 0.6 | [x] Header right side once Get a Quote is removed | Dev | **Phone number + WhatsApp icon**; "Contact" stays in the menu (A4.1) |
| 0.7 | [x] Sculpture materials ("RSJ"?) (L794, L874) | Client | His written list: **steel, stone, bronze, FRP/GRP**; no RSJ (decisions plan §6) |

---

## Phase A: Structure (current photos stand in; no client input needed)

### A1. Four services instead of five lines (L794)
| ID | Task | Done when |
|---|---|---|
| A1.1 | [x] Rewrite `app/data/lines.js` as 4 services, each with a write-up and segments (see the table below) | `npm run check` passes |
| A1.2 | [x] Add a **segment** field to designs in `app/data/designs.js` (codes unchanged); move the GRC, GRL and FRP designs under Customised products | `check:codes`: 105 codes unchanged |
| A1.3 | [x] New service: **Murals & wall features**. Move the murals photos from Projects into it as designs with new codes (`IFA-MU-001…`) | The page shows the murals |
| A1.4 | [x] Service page template: one row or tab per segment. An empty segment shows "Photos coming soon" + Enquire (no fake photos) | Screenshots at 4 widths |
| A1.5 | [x] `app/routes.js`: four service routes; remove the old line routes | Build prerenders 4 service pages |
| A1.6 | [x] `vercel.json` 301s: `/designer-planters` → `/planters`; `/grc-products`, `/grc-grilles`, `/frp-products` → `/customised-products`; update the old v2 and `.html` targets | `postbuild` checks every redirect target |
| A1.7 | [x] Mega menu, mobile menu, footer and `/products`: four services | `test:ui` passes |
| A1.8 | [x] SEO title and description per service; sitemap | `check:seo` passes |
| A1.9 | [x] **Jaali only in Customised products** (remove it from every other service and segment) (L14–22) | grep: no jaali segment elsewhere |
| A1.10 | [x] Jaali **gate** photos (wall_murals 12–13) go under Customised products → Gates, not murals (L374) | |

Segments per service (his written list, decisions plan §6):

| Service | Segments |
|---|---|
| Sculptures | Steel · Stone · Bronze · FRP/GRP |
| Planters & Pots | FRP pots & planters · GRC pots & planters · Removable planters (on wheels) · Partition creeper planters · Big trays for flower beds (FRP) |
| Murals & wall features | Steel murals · FRP murals & wall features · Mixed media murals |
| Customised Designer Products in FRP & GRC | Reception tables · Console tables · Utility products · Garden benches · Fins · Grills, jaali & screens · Chhajjas · Columns & pillars · Arches |

### A2. Home order (L82–126)
| ID | Task | Done when |
|---|---|---|
| A2.1 | [x] New order: Hero → Services (4 cards, 4 photos each) → Calibre band → Few executed works → Materials → (Process, Clients per 0.3) → **Why choose us** → Contact | Matches in screenshots |
| A2.2 | [x] Services cards: each with 4 photos, its segments as a line, and a link to the page (L32–34) | |
| A2.3 | [x] Calibre band: keep the years, designs, 30+ corporate clients and certification, and the "community of artists" line (L42–50) | |
| A2.4 | [x] Few executed works: rename "Selected works"; 4–5 photos; "View gallery" button (L54–106) | |
| A2.5 | [x] Remove the Sketchbook band (if 0.5 = remove) | |
| A2.6 | [x] Remove the FAQ section from Home (if 0.3 = yes); keep `/faq` | |

### A3. Gallery instead of Projects
| ID | Task | Done when |
|---|---|---|
| A3.1 | [x] Rename "Projects" to **Gallery** in the menu, page title, H1 and links; route `/gallery` | |
| A3.2 | [x] 301 `/projects` → `/gallery` (keep `?type=` and `?img=`) | Redirect checked in `postbuild` |
| A3.3 | [x] Gallery groups: Murals & relief art · Water features & rockery · Pergolas & gazebos (+ service photos later) | |

### A4. No Get a Quote at the top (L450–486)
| ID | Task | Done when |
|---|---|---|
| A4.1 | [x] Header: remove the oxide **Get a Quote** block; show the phone number + WhatsApp (per 0.6) | |
| A4.2 | [x] Hero: replace the "Get a Quote" button with "Explore products" / "View gallery" | |
| A4.3 | [x] Keep: the floating WhatsApp button, the enquiry/contact section **at the end** of pages, `/contact` | `test:ui` updated and passing |
| A4.4 | [x] Footer CTA band: keep it at the bottom (it is the end of the page) | |

### A5. Why choose us at the end (L124–126)
| ID | Task | Done when |
|---|---|---|
| A5.1 | [x] New section before Contact. Points from his own words only: own factory working 24×7 (L410), made as per design, start-to-end solutions, turnkey projects, quality checked, packing & fixing | `check:claims` passes |
| A5.2 | [x] Add **"3D-printed miniature for your approval"** (his own 3D printer) to Why choose us and as a step in How we work (L2228–2240) | |
| A5.3 | [~] Certification line: the ISO certificate, plus any extra certifications he names (L48) | ISO shown in the trust band; extra certifications wait for his list (Phase B) |

### A6. Details on click (L298–318)
| ID | Task | Done when |
|---|---|---|
| A6.1 | [x] Add optional `location`, `client` and `material` fields to designs and gallery photos | |
| A6.2 | [x] Lightbox caption and card show them when filled; empty fields are hidden | `test:ui`: caption shows a filled field |

### A7. Materials: GRC and FRP (L110–122, L592, L600–752)
| ID | Task | Done when |
|---|---|---|
| A7.1 | [x] Two columns, GRC and FRP, each with 3–4 photos of that material | |
| A7.1b | [x] Under each: three product groups only, **Jaali · Pots & planters · Building products** (arch, column…) (L732–760) | |
| A7.1c | [x] One line covering the other materials (stainless steel, stone, bronze…) so the section covers every material (L592–600) | |
| A7.2 | [x] Colour/finish samples per material (placeholders until B5) | |
| A7.3 | [x] **FRP advantages** from his words: RCC substitute, looks right, fast to make, lightweight, strong, durable (L736–752) | |
| A7.4 | [x] **GRC: just two blocks, "Advantages" and "Why GRC"** (L716), in our own words (topics only from yogigrc.com; **no copied text**), marked PROVISIONAL | Row added to `CONTENT-GAPS.md` |
| A7.6 | [x] "Why FRP/GRC for building products": an RCC substitute; RCC would cost far more and needs moulds (L736–744) | |
| A7.5 | [x] No installation detail (L656) | |

### A8. Brochure (L454–486)
| ID | Task | Done when |
|---|---|---|
| A8.1 | [x] No brochure at launch; no download link anywhere | |
| A8.2 | [~] If he sends a brochure: an in-page viewer of page images (no PDF published) | Moves to Phase B |

### A9. Check and push Phase A
| ID | Task | Done when |
|---|---|---|
| A9.1 | [x] Update `SITE-V4-PLAN.md` §3 and §10, `CLAUDE.md`, `CONTENT-GAPS.md`, `README.md` | |
| A9.2 | [x] `npm run check`, `test:ui`, `test:api`, `shots` (360/768/1024/1440) and the 12-size layout audit (tap targets ≥ 44 px) | All pass. Done 2026-10-26: check, test:ui 54/54, test:api 16/16, shots 15 pages × 4 widths; 12-width audit (320–1440, 7 pages): no sideways scroll; small targets are inline text links and card Enquire, same as before |
| A9.3 | [~] Commit (no AI tags), push to `dev`, send the preview link to the client | Only with your go-ahead for each step |

---

## Phase B: His content (needs the WhatsApp group photos)

| ID | Task | Owner | Done when |
|---|---|---|---|
| B1 | [~] Send photos to the group, **labelled by section**, via AirDrop, email or Drive (not WhatsApp re-shares, which lose quality) (L1994–2004) | Client | |
| B2 | [ ] Photo-selection session at his office, about 10 am (L1878–1884) | Both | Final list per section |
| B3 | [ ] Hero: ~5 photos → hand-drawn SVG line drawings (same draw-in animation) (L942–946) | Dev | Hero shows his pieces |
| B4 | [ ] 4 photos per service card; photos per segment, including the removable planter (photo, video, sketch) and the partition creeper planter (Worli) | Dev | No empty segment for which he has photos |
| B5 | [ ] GRC and FRP colour/finish samples (L114) | Client → Dev | |
| B6 | [ ] 4–5 best photos for "Few executed works" (e.g. Thane Buddha, Zeus reception table, suspended light, Reliance wall piece, Bandra fins) | Client → Dev | |
| B7 | [ ] Location, client and material per photo (where he allows) | Client | A6 fields filled |
| B8 | [ ] Short write-up per service and segment, from his words; short text ("लोग पढ़ते कम है") | Dev | Client OK |
| B9 | [ ] `npm run images` (WebP, hashed); new design codes for new photos only | Dev | `check:codes` passes |
| B10 | [ ] FRP reference website he mentioned (L656) | Client | |
| B11 | [ ] **Photos only from him, or free-licence stock** (Unsplash/Pexels, unedited, credited). **Never internet photos with watermarks removed** (copyright) | Dev | |
| B12 | [~] Professional photographer for key sites (Bandra fins, Worli creepers, Thane Buddha) (L970–990) | Client | Later update |
| B13 | [ ] Order of his inputs: Home photos first, then brochure, then selected images (L1928) | Client | |
| B14 | [ ] Sculptures: 2–3 angles per piece where good photos exist (L2090) | Dev | |
| B15 | [ ] Gallery: add work-in-progress photos/videos he selects (L1978–1984) | Dev | |
| B16 | [ ] Use only good photos; many existing ones are mid-work shots. Site visits for new photos where needed (L1886, L2150–2192) | Both | |
| B17 | [ ] Named pieces to include when photos arrive: two reception tables (Zeus, factory), stair-step planter, wood-finish garden benches, steel sculptures, Reliance wall piece, suspended light (L794, L1058, L1954–1990, L2106, L2142) | Dev | |
| B18 | [ ] **Never publish prices** mentioned in the meeting (e.g. the ₹6 lakh light) | Dev | |
| B19 | [~] Façade photos: his written list has no façades. Keep IFA-GRC-001…007 (shown under "All" in Customised for now)? | Client | His answer (CONTENT-GAPS row 23) |
| B20 | [~] Service order: his notebook lists Customised, Sculptures, Murals, Planters; the site uses the meeting order (01 Sculptures … 04 Customised) | Client | His answer |

---

## Phase C: Verify and deploy (Saturday 31 October)

| ID | Task | Owner | Done when |
|---|---|---|---|
| C1 | [ ] `npm run check`, `test:ui`, `test:api`, `shots`, the layout audit | Dev | All pass |
| C2 | [ ] Real phones: iPhone and Samsung (L764–766) | Both | No issues |
| C3 | [ ] Test the contact paths: WhatsApp, call, email, enquiry form reaches his inbox (the main goal, L386–390) | Both | Message received |
| C4 | [ ] Client approval on the `dev` preview | Client | Written OK |
| C5 | [ ] Merge `dev` → `main`; Vercel production deploy | Dev | Live on the Vercel URL |
| C6 | [~] Domain: point `inventfineart.com` to Vercel (needs the GoDaddy login); renew before February (L1534) | Both | Site on inventfineart.com, 1 November |
| C7 | [ ] Search Console: submit the sitemap | Dev | |

---

## After launch (from the meeting)

| ID | Task | Source |
|---|---|---|
| P1 | [~] Photo updates as they come: mall fountain and ring once installed and lit; Worli creeper planters grown; Thane Buddha in place | L1028, L1078–1086, L1908, L1934–1944 |

## Later (not this site; order: this site live first, then his personal site before the December event, then Art Images, L1176–1180, L1876)

| ID | Task | Source |
|---|---|---|
| L1 | [ ] Recover or recreate **kiran@inventfineart.com** and **info@inventfineart.com** (domain email via GoDaddy) | L1596–1730 |
| L2 | [ ] **Personal site for Kiran Adate** (kiranadate.com / .in): his work, awards, current projects; before his **3–6 December** event | L490–576 |
| L3 | [ ] **Art Images** site: trophies, sculptures, artefacts, canvas paintings, murals | L1098–1166 |
