import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PlainHeader } from '../components/sections/PageHeader';
import { lines } from '../data/lines';

// Prerendered at /404 and served by Vercel as 404.html with a 404 status (scripts/postbuild.mjs).
// No loader and no thrown 404 response: prerender only accepts a 200.
export default function NotFound() {
  const links = [...lines.map((l) => ({ to: `/${l.slug}`, num: l.num, name: l.name })), { to: '/projects', name: 'Projects' }, { to: '/contact', name: 'Contact' }];
  return (
    <>
      <Seo title="Page not found | Invent Fine Art" description="The page you were looking for could not be found." noindex />
      <PlainHeader eyebrow="404" title={<>Page <em>not found</em></>} lead="This page has moved or doesn’t exist. These might help:" />
      <Section className="pt-0">
        <Container>
          <ul className="max-w-2xl border-t-2 border-line-strong">
            {links.map((l) => (
              <li key={l.to} className="border-b border-line">
                <Link to={l.to} className="group flex items-center justify-between gap-3 py-3 font-bold hover:text-oxide-deep">
                  <span>
                    {l.num && <span className="caps-label mr-3 text-oxide-deep">{l.num}</span>}
                    {l.name}
                  </span>
                  <ArrowRight className="size-4 text-oxide transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
