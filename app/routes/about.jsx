import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { breadcrumbs } from '../data/seo';

export default function About() {
  return (
    <>
      <Seo
        title="About Invent Fine Art | Artisans and Product Designers, Mumbai"
        description="A team of artisans and product designers in Mumbai, providing start-to-end solutions from concept to complete execution."
        image="gallery/sculptures/2"
        jsonLd={breadcrumbs([{ name: 'About', path: '/about' }])}
      />
      <PageStub
        crumbs={[{ name: 'About' }]}
        eyebrow="About us"
        title="Artisans and product designers"
        lead="We provide start to end solutions from conceptualizations to the complete execution."
        sections={[
          ['Photo header', '', 'Phase 7'],
          ['Stats strip', 'Provisional', 'Phase 7'],
          ['Sticky sub-nav', 'Story · What we make · Process · Facility · Visit', 'Phase 7'],
          ['Story', 'Old About page, tidied', 'Phase 7'],
          ['What we make', 'The 5 lines plus the old service range', 'Phase 7'],
          ['Process', '5 steps', 'Phase 7'],
          ['Facility', '4 units', 'Phase 7'],
          ['Client marquee', '', 'Phase 7'],
          ['Visit block', 'Office and factory', 'Phase 7'],
        ]}
      />
    </>
  );
}
