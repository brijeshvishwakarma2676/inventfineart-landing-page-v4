import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { breadcrumbs } from '../data/seo';

export default function Clients() {
  return (
    <>
      <Seo
        title="Clients | Invent Fine Art"
        description="Developers, corporates, hotels, design studios and institutions that have worked with Invent Fine Art."
        jsonLd={breadcrumbs([{ name: 'Clients', path: '/clients' }])}
      />
      <PageStub
        crumbs={[{ name: 'Clients' }]}
        eyebrow="Our clients"
        title="Recent projects for our valued clients"
        sections={[
          ['Header', '', 'Phase 7'],
          ['Logo grid', '28 brands', 'Phase 7'],
          ['Clients by sector', 'The 34 names from the old site', 'Phase 7'],
          ['Testimonials', 'Only if supplied', 'Phase 7'],
        ]}
      />
    </>
  );
}
