import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Img } from '../components/ui/Img';
import { PlainHeader } from '../components/sections/PageHeader';
import { Testimonials } from '../components/sections/Testimonials';
import { clientLogos, clientNames } from '../data/clients';
import { breadcrumbs } from '../data/seo';

/**
 * Clients (SITE-V4-PLAN.md §3.3): the 28 logo brands and the 34 names from the client's own old site
 * (PROVISIONAL: the client confirms the list is current). No sector groups: half the names don't say what the
 * business is (CONTENT-GAPS.md row 22).
 */
export default function Clients() {
  return (
    <>
      <Seo
        title="Clients | Invent Fine Art"
        description="Developers, corporates, hotels, design studios and institutions that have worked with Invent Fine Art."
        jsonLd={breadcrumbs([{ name: 'Clients', path: '/clients' }])}
      />
      <PlainHeader
        crumbs={[{ name: 'Clients' }]}
        eyebrow="Our clients"
        title={<>Recent projects for <em>our valued clients</em></>}
        lead={`${clientNames.length} clients from the list on our earlier website, from Mumbai to Nagpur, Hyderabad, Coimbatore and New Delhi.`}
      />

      <Section className="pt-0">
        <Container>
          <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-4 lg:grid-cols-7" data-reveal="stagger">
            {clientLogos.map((c) => (
              <li key={c.image} className="grid h-28 place-items-center border-r border-b border-line bg-white px-4">
                <Img id={c.image} alt={c.alt} sizes="142px" className="max-h-[55%] w-auto max-w-full object-contain grayscale transition duration-300 hover:grayscale-0" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-10 lg:grid-cols-12">
          <SectionHeading eyebrow="The full list" title={<>{clientNames.length} <em>clients</em></>} className="lg:col-span-4" />
          <ul className="grid border-t-2 border-line-strong sm:grid-cols-2 sm:gap-x-8 lg:col-span-8">
            {clientNames.map((n) => (
              <li key={n} className="border-b border-line py-3 font-bold">
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Testimonials />
    </>
  );
}
