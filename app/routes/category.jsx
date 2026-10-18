import { useLocation } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { lineBySlug } from '../data/lines';
import { breadcrumbs } from '../data/seo';
import { SITE_URL } from '../data/site';

export const handle = { heroHeader: true, inlineEnquiry: true };

// One template for all five product lines (SITE-V4-PLAN.md §3.2).
export default function Category() {
  const { pathname } = useLocation();
  const line = lineBySlug[pathname.split('/')[1]];

  return (
    <>
      <Seo
        title={line.seo.title}
        description={line.seo.description}
        image={line.banner.image}
        jsonLd={[
          breadcrumbs([
            { name: 'Products', path: '/products' },
            { name: line.name, path: `/${line.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: line.name,
            description: line.seo.description,
            url: `${SITE_URL}/${line.slug}`,
          },
        ]}
      />
      <PageStub
        crumbs={[{ name: 'Products', to: '/products' }, { name: line.name }]}
        eyebrow={`${line.num} / 05`}
        title={line.name}
        lead={line.tagline}
        sections={[
          ['Banner', 'Photo ≥ 1,600 px, breadcrumb, number, H1, tagline', 'Phase 6'],
          ['Intro and spec list', 'Brief copy word for word; suitable for, materials, sizes, finishes', 'Phase 6'],
          ['Typologies', 'From the brief’s own words, one real photo each', 'Phase 6'],
          ['Catalogue', 'Plates with code + Enquire, lightbox, Show all', 'Phase 6'],
          ['Made to your design', 'Fewer than 6 designs or stand-in photos', 'Phase 6'],
          ['Related projects', '3 projects', 'Phase 6'],
          ['FAQ', '4–5 questions + FAQPage JSON-LD', 'Phase 6'],
          ['Prev / next line', '', 'Phase 6'],
          ['Enquiry', 'Pre-filled with this line', 'Phase 6'],
        ]}
      >
        <div className="mt-8 max-w-[68ch] space-y-4">
          {line.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </PageStub>
    </>
  );
}
