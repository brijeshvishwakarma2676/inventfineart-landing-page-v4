import { Link } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { lines } from '../data/lines';
import { breadcrumbs } from '../data/seo';

export default function Products() {
  return (
    <>
      <Seo
        title="Products: Sculptures, Planters, GRC & FRP | Invent Fine Art"
        description="Five product lines by Invent Fine Art: sculptures, designer planters, GRC products, GRC grilles and FRP products, each made to your design."
        jsonLd={breadcrumbs([{ name: 'Products', path: '/products' }])}
      />
      <PageStub
        crumbs={[{ name: 'Products' }]}
        eyebrow="Five product lines"
        title="Our products"
        sections={[
          ['Page header', 'Plain', 'Phase 6'],
          ['Line index', 'Sticky 01–05 index next to five line blocks', 'Phase 6'],
          ['Browse by application', 'Six tiles', 'Phase 6'],
        ]}
      >
        <ul className="mt-10 grid gap-2">
          {lines.map((l) => (
            <li key={l.slug}>
              <Link to={`/${l.slug}`} className="hover:underline">
                <span className="caps-label mr-3 text-bronze-deep">{l.num}</span>
                {l.name} <em className="font-display text-ink-muted">{l.tagline}</em>
              </Link>
            </li>
          ))}
        </ul>
      </PageStub>
    </>
  );
}
