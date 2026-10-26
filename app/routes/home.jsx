import { Seo } from '../components/ui/Seo';
import { Hero } from '../components/sections/Hero';
import { ProductLines } from '../components/sections/ProductLines';
import { TrustBand } from '../components/sections/TrustBand';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { Materials } from '../components/sections/Materials';
import { Process } from '../components/sections/Process';
import { ClientMarquee } from '../components/sections/ClientMarquee';
import { WhyUs } from '../components/sections/WhyUs';
import { EnquirySection } from '../components/sections/EnquirySection';
import { organization } from '../data/seo';

// Ends with the inline enquiry form, so the footer skips its CTA band.
export const handle = { inlineEnquiry: true };

// Home, in the order agreed at the 2026-10-24 meeting (SITE-V4-DEV-DECISIONS-PLAN.md §1.2): drawn hero, the four
// services, the calibre band, few executed works, materials, process, clients, why choose us, then contact.
export default function Home() {
  return (
    <>
      <Seo
        title="Invent Fine Art | Sculptures, Planters, GRC & FRP Products, Mumbai"
        description="Sculptures, designer planters, GRC products, GRC grilles and FRP products, made to your design by Invent Fine Art, Mumbai. Ask for a quote."
        image="gallery/sculptures/20"
        jsonLd={organization}
      />
      <Hero />
      <ProductLines />
      <TrustBand />
      <SelectedWorks />
      <Materials />
      <Process />
      <ClientMarquee />
      <WhyUs />
      <EnquirySection />
    </>
  );
}
