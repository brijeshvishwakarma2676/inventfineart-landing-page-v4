import { Seo } from '../components/ui/Seo';
import { Hero } from '../components/sections/Hero';
import { ProductLines } from '../components/sections/ProductLines';
import { TrustBand } from '../components/sections/TrustBand';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { organization } from '../data/seo';

// Home (SITE-V4-PLAN.md §3.1). Phase 4 mock-up: sections 1–4. Phase 5 adds Materials, How we work, Trusted by,
// FAQ and the inline Enquiry section (then the route exports handle { inlineEnquiry: true }).
export default function Home() {
  return (
    <>
      <Seo
        title="Invent Fine Art | Sculptures, Designer Planters, GRC & FRP Products, Mumbai"
        description="Sculptures, designer planters, GRC products, GRC grilles and FRP products, made to your design by Invent Fine Art, Mumbai. Ask for a quote."
        image={'gallery/sculptures/20'}
        jsonLd={organization}
      />
      <Hero />
      <ProductLines />
      <TrustBand />
      <SelectedWorks />
    </>
  );
}
