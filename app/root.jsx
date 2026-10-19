import { useRef } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLocation } from 'react-router';
// One family, one variable file (weight and width axes): headline capitals for headlines, normal width for text.
import '@fontsource-variable/archivo/wdth.css';
import archivoLatin from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
import './styles/global.css';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { EnquiryProvider } from './enquiry/EnquiryContext';
import { EnquiryPanel } from './enquiry/EnquiryPanel';
import { MotionProvider } from './motion/MotionProvider';
import { useReveal } from './motion/useReveal';

// The Latin font file is preloaded; other subsets load only if a page needs them.
export const links = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'preload', href: archivoLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a1a" />
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
          className="sr-only z-[80] rounded-button bg-ink px-4 py-3 text-small text-chalk focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <div ref={scope}>
          <main id="main" className="pt-(--header-offset)">
            <Outlet />
          </main>
          <Footer />
        </div>
        <FloatingWhatsApp />
        <EnquiryPanel />
      </EnquiryProvider>
    </MotionProvider>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="container-site flex min-h-[70vh] flex-col items-start justify-center gap-4 py-section">
      <title>{notFound ? 'Page not found | Invent Fine Art' : 'Something went wrong | Invent Fine Art'}</title>
      <p className="caps-label text-oxide-deep">Invent Fine Art</p>
      <h1 className="text-h1">{notFound ? 'Page not found' : 'Something went wrong'}</h1>
      <a href="/" className="font-semibold text-oxide-deep underline underline-offset-4">
        Back to the home page
      </a>
    </main>
  );
}
