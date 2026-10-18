import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { process } from '../../data/content';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * How we work (SITE-V4-PLAN.md §3.1-6): the five steps from the old About page on a ruled line, each with an
 * oversized number. "Send your drawing" opens the enquiry panel, which takes an upload.
 */
export function Process({ tone = 'surface', cta = true }) {
  const { open } = useEnquiry();
  return (
    <Section tone={tone}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="How we work" title={<>From concept to <em>complete execution</em></>} />
          {cta && (
            <Button onClick={() => open()} arrow className="shrink-0">
              Send your drawing
            </Button>
          )}
        </div>

        <ol className="mt-12 grid border-t-2 border-line-strong sm:grid-cols-2 lg:grid-cols-5" data-reveal="stagger">
          {process.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 border-b border-line py-6 sm:px-5 sm:odd:pl-0 lg:border-b-0 lg:border-l lg:px-5 lg:first:border-l-0 lg:first:pl-0">
              <span className="condensed text-[3.5rem] leading-[0.85] text-oxide">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="condensed text-[1.6rem] leading-none">{step.title}</h3>
              <p className="text-small text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
