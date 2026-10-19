import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { DesignCard } from './DesignCard';
import { useLightbox } from '../ui/useLightbox';
import { designByCode } from '../../data/designs';
import { useEnquiry } from '../../enquiry/EnquiryContext';

// Eight designs across the five lines, all with photos ≥ 1,200 px wide.
const FEATURED = ['IFA-SC-012', 'IFA-PL-003', 'IFA-GRC-001', 'IFA-SC-068', 'IFA-GRL-002', 'IFA-PL-001', 'IFA-SC-070', 'IFA-GRC-011'];

/**
 * Popular designs (Home): a catalogue grid of designs with their codes, each with Enquire (pre-fills the code),
 * a second view on hover and the lightbox on click.
 */
export function FeaturedDesigns() {
  const items = FEATURED.map((code) => designByCode[code]).filter(Boolean);
  const { open: enquire } = useEnquiry();
  const { open, element } = useLightbox(items, {
    onEnquire: (d) => enquire({ category: d.line, code: d.code, title: d.title }),
  });

  return (
    <Section tone="surface">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="From the catalogue"
            title="Popular designs"
            tagline="Every design has a code. Quote it in your enquiry, or ask for it in your own size and finish."
          />
          <Button to="/sculptures" variant="secondary" arrow className="shrink-0">
            Browse the catalogue
          </Button>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6" data-reveal="stagger">
          {items.map((d, i) => (
            <li key={d.code}>
              <DesignCard design={d} onOpen={() => open(i)} />
            </li>
          ))}
        </ul>
      </Container>
      {element}
    </Section>
  );
}
