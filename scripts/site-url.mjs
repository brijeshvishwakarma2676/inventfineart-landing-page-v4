// The site's own origin, for canonical links, the sitemap and link-preview images. Read at build time by
// vite.config.js (as __SITE_URL__ in the app) and by the build scripts.
// - SITE_URL, if set, wins.
// - On Vercel: the project's production domain (VERCEL_PROJECT_PRODUCTION_URL). While a demo lives on *.vercel.app its
//   previews point at itself (so WhatsApp shows the picture); once inventfineart.com is added to the project, the
//   real domain takes over with no change here.
// - Otherwise the real domain.
export function siteUrl() {
  const env = process.env;
  if (env.SITE_URL) return env.SITE_URL.replace(/\/$/, '');
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return 'https://www.inventfineart.com';
}
