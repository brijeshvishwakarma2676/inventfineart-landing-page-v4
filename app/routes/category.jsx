import { Link, useLocation } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { dots } from '../components/ui/format';
import { SplitHeader } from '../components/sections/PageHeader';
import { Catalogue } from '../components/sections/Catalogue';
import { MadeToDesign } from '../components/sections/MadeToDesign';
import { ProjectTiles } from '../components/sections/ProjectTiles';
import { FaqSection } from '../components/sections/FaqSection';
import { PrevNextLine } from '../components/sections/PrevNextLine';
import { EnquirySection } from '../components/sections/EnquirySection';
import { lines, lineBySlug, finishes, inSentence } from '../data/lines';
import { designsFor, sculptureGroups } from '../data/designs';
import { relatedProjects } from '../data/projects';
import { lineFaqs, faqJsonLd } from '../data/faqs';
import { breadcrumbs } from '../data/seo';
import { SITE_URL } from '../data/site';
import { useEnquiry } from '../enquiry/EnquiryContext';

// Ends with the inline enquiry form, so the footer skips its CTA band.
export const handle = { inlineEnquiry: true };

// One template for the four services (SITE-V4-PLAN.md §3.2; four services since the 2026-10-24 meeting).
export default function Category() {
  const { pathname } = useLocation();
  const line = lineBySlug[pathname.split('/')[1]];
  const designs = designsFor(line.slug);
  const faq = lineFaqs[line.slug] ?? [];
  const related = relatedProjects(line.slug);
  const { open } = useEnquiry();
  // "Made to your design" when the range on hand is small or the photos are stand-ins (Planters, FRP).
  const madeToOrder = designs.length < 6 || designs.some((d) => d.provisional);
  // Sculptures: the photos aren't labelled by material yet, so the filter keeps the subjects (figures, devotional…)
  // and the material segments are listed only. Other services filter by segment.
  const materialSegments = line.segmentsAreMaterials;
  const groups = materialSegments ? sculptureGroups : line.segments;
  const groupKey = materialSegments ? 'group' : 'segment';
  const countFor = (slug) => designs.filter((d) => d.segment === slug).length;

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
        eyebrow={`${line.num} / 0${lines.length}`}
        title={line.name}
        lead={line.tagline}
        image={line.banner.image}
        position={line.banner.position}
        alt={`${line.name} by Invent Fine Art`}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#designs" arrow>
            See the designs
          </Button>
          <Button onClick={() => open({ category: line.slug })} variant="secondary">
            Enquire
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

      {/* What the service covers: its segments (meeting 2026-10-24). Each opens its tab in the designs below. */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="What we make" title={materialSegments ? <>Made in <em>four materials</em></> : <>Our <em>{inSentence(line.name)}</em> range</>} className="mb-10" />
          <ul className="grid border-t-2 border-line-strong sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {line.segments.map((sg) => {
              const n = countFor(sg.slug);
              const body = (
                <>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="condensed text-[1.5rem] leading-tight">{sg.name}</span>
                    {!materialSegments && <span className="caps-label shrink-0 text-oxide-deep">{n ? `${n} ${n === 1 ? 'photo' : 'photos'}` : 'Coming soon'}</span>}
                  </span>
                  {sg.text && <span className="text-small text-ink-muted">{sg.text}</span>}
                </>
              );
              return (
                <li key={sg.slug} className="border-b border-line sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:border-r lg:px-6 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n+1)]:pl-0">
                  {materialSegments ? (
                    <div className="flex flex-col gap-2 py-5">{body}</div>
                  ) : (
                    <Link to={`?segment=${sg.slug}#designs`} className="group flex flex-col gap-2 py-5 hover:text-oxide-deep">
                      {body}
                      <ArrowRight className="size-4 text-oxide transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Catalogue */}
      <Section id="designs" className="scroll-mt-(--header-h)">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow={`${designs.length} designs`} title={madeToOrder ? <>Recent <em>work</em></> : <>The <em>designs</em></>} />
            <p className="max-w-sm text-small text-ink-muted">Tap a photo to view it larger. Every design has a code: quote it when you enquire.</p>
          </div>
          <Catalogue designs={designs} groups={groups} groupKey={groupKey} line={line} />
        </Container>
      </Section>

      {madeToOrder && <MadeToDesign line={line} />}

      {related.length > 0 && (
        <Section tone="surface">
          <Container>
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow="From the gallery" title={<>More of <em>our work</em></>} />
              <Button to="/gallery" variant="text" arrow>
                View the gallery
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
