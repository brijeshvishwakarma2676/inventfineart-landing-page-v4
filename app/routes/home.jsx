import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { organization } from '../data/seo';
import { site } from '../data/site';

export const handle = { heroHeader: true, inlineEnquiry: true };

export default function Home() {
  return (
    <>
      <Seo
        title="Invent Fine Art | Sculptures, Designer Planters, GRC & FRP Products, Mumbai"
        description="Sculptures, designer planters, GRC products, GRC grilles and FRP products, made to your design by Invent Fine Art, Mumbai. Ask for a quote."
        jsonLd={organization}
      />
      <PageStub
        eyebrow="Sculptures · Planters · GRC · FRP"
        title={site.hero.title}
        lead={site.tagline}
        sections={[
          ['Hero', 'One slide per product line, static H1, photos ≥ 2,400 px', 'Phase 4'],
          ['Product lines', 'Five numbered entries, the first spans 2 columns', 'Phase 4'],
          ['Trust band', 'Dark: community of artists, 4 facility units, stats, ISO', 'Phase 4'],
          ['Selected works', '6 project photos with plate captions', 'Phase 4'],
          ['Materials', 'GRC | FRP from the brief, finish swatches', 'Phase 5'],
          ['How we work', '5 sourced steps, Send your drawing', 'Phase 5'],
          ['Trusted by', 'Client marquee', 'Phase 5'],
          ['FAQ', '5 questions', 'Phase 5'],
          ['Enquiry', 'Pitch + inline form', 'Phase 5'],
        ]}
      />
    </>
  );
}
