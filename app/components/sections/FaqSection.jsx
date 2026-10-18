import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { FaqList } from './FaqList';

/** FAQ band: heading on the left (sticky on desktop), the questions on the right. Used on Home and product pages. */
export function FaqSection({ items, title = <>Questions, <em>answered</em></>, tone = 'bg', more = true }) {
  return (
    <Section tone={tone}>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeading eyebrow="FAQ" title={title} />
            {more && (
              <Link to="/faq" className="group mt-6 inline-flex items-center gap-2 text-small font-bold uppercase tracking-label text-oxide-deep hover:text-ink">
                All questions
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
        <FaqList items={items} className="lg:col-span-8" />
      </Container>
    </Section>
  );
}
