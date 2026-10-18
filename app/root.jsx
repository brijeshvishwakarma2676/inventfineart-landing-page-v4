import { useRef } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLocation } from 'react-router';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/archivo/wdth.css';
import frauncesLatin from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url';
import archivoLatin from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
import './styles/global.css';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { EnquiryProvider } from './enquiry/EnquiryContext';
import { MotionProvider } from './motion/MotionProvider';
import { useReveal } from './motion/useReveal';

// The two Latin font files used above the fold are preloaded; italics and other subsets load on use.
export const links = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'preload', href: frauncesLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: archivoLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#faf8f5" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const scope = useRef(null);
  useReveal(scope, pathname);

  return (
    <MotionProvider>
      <EnquiryProvider>
        <a
          href="#main"
          className="sr-only z-[80] rounded-button bg-ink px-4 py-3 text-small text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <div ref={scope}>
          <main id="main">
            <Outlet />
          </main>
          <Footer />
        </div>
      </EnquiryProvider>
    </MotionProvider>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="container-site flex min-h-[70vh] flex-col items-start justify-center gap-4 py-section">
      <title>{notFound ? 'Page not found | Invent Fine Art' : 'Something went wrong | Invent Fine Art'}</title>
      <p className="caps-label text-bronze-deep">Invent Fine Art</p>
      <h1 className="text-h1">{notFound ? 'Page not found' : 'Something went wrong'}</h1>
      <a href="/" className="font-semibold text-bronze-deep underline underline-offset-4">
        Back to the home page
      </a>
    </main>
  );
}
