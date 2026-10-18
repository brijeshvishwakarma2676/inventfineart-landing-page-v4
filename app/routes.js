import { index, route } from '@react-router/dev/routes';
import { lines } from './data/lines';

// Every static path here is prerendered to its own HTML file (react-router.config.js).
// The splat route is also prerendered at /404 and served as 404.html (scripts/postbuild.mjs).
export default [
  index('routes/home.jsx'),
  route('products', 'routes/products.jsx'),
  ...lines.map((l) => route(l.slug, 'routes/category.jsx', { id: `line-${l.slug}` })),
  route('projects', 'routes/projects.jsx'),
  route('about', 'routes/about.jsx'),
  route('clients', 'routes/clients.jsx'),
  route('faq', 'routes/faq.jsx'),
  route('contact', 'routes/contact.jsx'),
  route('privacy', 'routes/privacy.jsx'),
  route('thank-you', 'routes/thank-you.jsx'),
  route('styleguide', 'routes/styleguide.jsx'),
  route('*', 'routes/not-found.jsx'),
];
