import { Seo } from '../components/ui/Seo';
import { Hero } from '../components/sections/Hero';
import { ProductLines } from '../components/sections/ProductLines';
import { TrustBand } from '../components/sections/TrustBand';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { Materials } from '../components/sections/Materials';
import { Sketchbook } from '../components/sections/Sketchbook';
import { Process } from '../components/sections/Process';
import { ClientMarquee } from '../components/sections/ClientMarquee';
import { FaqSection } from '../components/sections/FaqSection';
import { EnquirySection } from '../components/sections/EnquirySection';
import { organization } from '../data/seo';
import { homeFaqs } from '../data/faqs';

// Ends with the inline enquiry form, so the footer skips its CTA band.
export const handle = { inlineEnquiry: true };

// Home (SITE-V4-PLAN.md §3.1): ten sections; two graphite bands (trust band, sketchbook) besides the header and footer.
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
      <Sketchbook />
      <Process />
      <ClientMarquee />
      <FaqSection items={homeFaqs} />
      <EnquirySection />
    </>
  );
}
