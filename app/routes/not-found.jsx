import { Link } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { lines } from '../data/lines';

// Prerendered at /404 and served by Vercel as 404.html with a 404 status (scripts/postbuild.mjs).
// No loader and no thrown 404 response: prerender only accepts a 200.
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Invent Fine Art" description="The page you were looking for could not be found." noindex />
      <PageStub eyebrow="404" title="Page not found" lead="This page has moved or doesn’t exist. These might help:">
        <ul className="mt-8 grid gap-2">
          {lines.map((l) => (
            <li key={l.slug}>
              <Link to={`/${l.slug}`} className="hover:underline">
                <span className="caps-label mr-3 text-oxide-deep">{l.num}</span>
                {l.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/projects" className="hover:underline">Projects</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </PageStub>
    </>
  );
}
