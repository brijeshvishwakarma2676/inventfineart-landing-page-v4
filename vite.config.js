import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { siteUrl } from './scripts/site-url.mjs';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  // The same origin in the prerendered HTML and in the browser (app/data/site.js SITE_URL)
  define: { __SITE_URL__: JSON.stringify(siteUrl()) },
});
