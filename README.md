# Invent Fine Art — website v4

Static, prerendered React site: React 19 (JS) + Tailwind CSS v4 + React Router v8 framework mode (`ssr: false`, prerender every route + `/404`).

- Plan and source of truth: `docs/SITE-V4-PLAN.md`
- Rules for AI-assisted work: `CLAUDE.md`
- Provisional content and what the client still has to send: `CONTENT-GAPS.md`

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # lint + claims check + build (static site in build/client, with 404.html and sitemap.xml)
npm run preview    # serve the build at http://localhost:4173 (unknown URLs answer 404, as on Vercel)
npm run shots      # screenshots of every page at 360/768/1024/1440 into shots/ (preview must be running)
npm run images     # after adding or replacing photos in media-src/
```

Deploy: Vercel, with `vercel.json` included and the output in `build/client`. Node 24.x.
