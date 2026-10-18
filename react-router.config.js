/** @type {import('@react-router/dev/config').Config} */
export default {
  // Static site: every route in app/routes.js is rendered to its own HTML file at build time.
  ssr: false,
  // Plus /404, which the splat route renders; scripts/postbuild.mjs moves it to 404.html so Vercel serves it
  // with a real 404 status. The not-found route must not throw a 404 response (prerender only accepts 200).
  prerender: async ({ getStaticPaths }) => [...getStaticPaths(), '/404'],
};
