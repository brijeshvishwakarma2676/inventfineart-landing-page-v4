import { Seo } from '../components/ui/Seo';
import { Hero } from '../components/sections/Hero';
import { ProductLines } from '../components/sections/ProductLines';
import { FeaturedDesigns } from '../components/sections/FeaturedDesigns';
import { WhyUs } from '../components/sections/WhyUs';
import { Factory } from '../components/sections/Factory';
import { Materials } from '../components/sections/Materials';
import { Applications } from '../components/sections/Applications';
import { Process } from '../components/sections/Process';
import { SelectedWorks } from '../components/sections/SelectedWorks';
import { ClientMarquee } from '../components/sections/ClientMarquee';
import { FaqSection } from '../components/sections/FaqSection';
import { EnquirySection } from '../components/sections/EnquirySection';
import { organization } from '../data/seo';
import { homeFaqs } from '../data/faqs';

// Ends with the inline enquiry form, so the footer skips its CTA band.
export const handle = { inlineEnquiry: true };

// Home (SITE-V4-PLAN.md §3.1, catalogue direction): photo hero, the five lines, popular designs, why choose us, the
// factory, materials and finishes, applications, process, latest projects, clients, FAQ, enquiry.
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
      <FeaturedDesigns />
      <WhyUs />
      <Factory />
      <Materials />
      <Applications tone="surface" />
      <Process tone="bg" />
      <SelectedWorks />
      <ClientMarquee />
      <FaqSection items={homeFaqs} tone="surface" />
      <EnquirySection tone="bg" />
    </>
  );
}
