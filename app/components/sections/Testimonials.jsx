import { testimonials } from '../../data/testimonials';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

/** Renders only when real client quotes exist (spec §4.1-10). Entry shape: { quote, name, role }. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="In their words" title={<>What our clients <em>say</em></>} />
        <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {testimonials.map((t) => (
            <li key={t.name} className="flex flex-col gap-6 border-t-2 border-line-strong pt-6">
              <blockquote className="text-h3 leading-snug font-bold">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="text-small">
                <span className="font-semibold">{t.name}</span>
                {t.role && <span className="text-ink-muted">, {t.role}</span>}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
