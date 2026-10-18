import { useLocation } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { dots } from '../components/ui/format';
import { SplitHeader } from '../components/sections/PageHeader';
import { Typologies } from '../components/sections/Typologies';
import { Catalogue } from '../components/sections/Catalogue';
import { MadeToDesign } from '../components/sections/MadeToDesign';
import { ProjectTiles } from '../components/sections/ProjectTiles';
import { FaqSection } from '../components/sections/FaqSection';
import { PrevNextLine } from '../components/sections/PrevNextLine';
import { EnquirySection } from '../components/sections/EnquirySection';
import { lineBySlug, typologies, finishes, inSentence } from '../data/lines';
import { designsFor, sculptureGroups } from '../data/designs';
import { relatedProjects } from '../data/projects';
import { lineFaqs, faqJsonLd } from '../data/faqs';
import { breadcrumbs } from '../data/seo';
import { SITE_URL } from '../data/site';
import { useEnquiry } from '../enquiry/EnquiryContext';

// Ends with the inline enquiry form, so the footer skips its CTA band.
export const handle = { inlineEnquiry: true };

// One template for all five product lines (SITE-V4-PLAN.md §3.2).
export default function Category() {
  const { pathname } = useLocation();
  const line = lineBySlug[pathname.split('/')[1]];
  const designs = designsFor(line.slug);
  const faq = lineFaqs[line.slug] ?? [];
  const related = relatedProjects(line.slug);
  const { open } = useEnquiry();
  // "Made to your design" when the range on hand is small or the photos are stand-ins (Planters, FRP).
  const madeToOrder = designs.length < 6 || designs.some((d) => d.provisional);
  const groups = designs.length >= 12 && line.slug === 'sculptures' ? sculptureGroups : null;

  const spec = [
    ['Suitable for', dots(line.suitableFor)],
    ['Materials', dots(line.materials)],
    ['Sizes', line.sizes],
    ['Finishes', dots(finishes.map((f) => f.name))],
    ['Customisation', 'Made to your size and drawing: share your concept to start.'],
  ];

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
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: line.name, description: line.seo.description, url: `${SITE_URL}/${line.slug}` },
          faqJsonLd(faq),
        ]}
      />

      <SplitHeader
        crumbs={[{ name: 'Products', to: '/products' }, { name: line.name }]}
        eyebrow={`${line.num} / 05`}
        title={line.name}
        lead={line.tagline}
        image={line.banner.image}
        position={line.banner.position}
        alt={`${line.name} by Invent Fine Art`}
      >
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => open({ category: line.slug })} arrow>
            Get a Quote
          </Button>
          <Button href="#designs" variant="secondary">
            See the designs
          </Button>
        </div>
      </SplitHeader>

      {/* Intro (the brief, word for word) + spec list */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 text-lead lg:col-span-7" data-reveal="up">
            {line.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <dl className="border-t-2 border-line-strong lg:col-span-5" data-reveal="up">
            {spec.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="caps-label pt-0.5">{k}</dt>
                <dd className="text-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Typologies */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Types" title={<>Types of <em>{inSentence(line.name)}</em></>} className="mb-12" />
          <Typologies items={typologies[line.slug]} />
        </Container>
      </Section>

      {/* Catalogue */}
      <Section id="designs" className="scroll-mt-(--header-h)">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow={`${designs.length} designs`} title={madeToOrder ? <>Recent <em>work</em></> : <>The <em>designs</em></>} />
            <p className="max-w-sm text-small text-ink-muted">Tap a photo to view it larger. Every design has a code: quote it when you enquire.</p>
          </div>
          <Catalogue designs={designs} groups={groups} />
        </Container>
      </Section>

      {madeToOrder && <MadeToDesign line={line} />}

      {related.length > 0 && (
        <Section tone="surface">
          <Container>
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="Related projects" title={<>More of <em>our work</em></>} />
              <Button to="/projects" variant="text" arrow>
                All projects
              </Button>
            </div>
            <ProjectTiles items={related} />
          </Container>
        </Section>
      )}

      <FaqSection items={faq} title={<>Good to <em>know</em></>} />
      <PrevNextLine slug={line.slug} />
      <EnquirySection prefill={{ category: line.slug }} title={<>Enquire about <em>{inSentence(line.name)}</em></>} />
    </>
  );
}
