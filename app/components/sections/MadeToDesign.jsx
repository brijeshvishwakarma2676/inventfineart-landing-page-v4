import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { process } from '../../data/content';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * "Made to your design" (SITE-V4-PLAN.md §3.2-5): on lines with fewer than 6 designs or stand-in photos
 * (today Planters and FRP), a graphite band that leads with making to the visitor's own concept.
 */
export function MadeToDesign({ line }) {
  const { open } = useEnquiry();
  return (
    <Section tone="dark">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            tone="dark"
            eyebrow="Made to your design"
            title={<>Don&rsquo;t see your design? <em>We make it.</em></>}
            tagline="Our products are offered in numerous sizes, specifications and dimensions, as per your design and requirement."
          />
          <Button onClick={() => open({ category: line.slug })} arrow className="shrink-0">
            Share your concept
          </Button>
        </div>
        <ol className="mt-12 grid border-t border-chalk/15 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 border-b border-chalk/15 py-6 sm:px-5 sm:odd:pl-0 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0">
              <span className="condensed text-[2.5rem] leading-[0.85] text-oxide-bright">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="condensed text-[1.4rem] leading-none text-chalk">{step.title}</h3>
              <p className="text-small text-chalk-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
