import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { materials } from '../../data/content';
import { lineBySlug, finishes } from '../../data/lines';

/**
 * Materials and finishes (SITE-V4-PLAN.md §3.1): the two materials the sources name, GRC and FRP, in the brief's own
 * words, each with the lines made in it; then the provisional finishes as round photo swatches.
 */
export function Materials() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Materials and finishes" title="Made in GRC and FRP" />

        <div className="mt-12 grid gap-4 md:grid-cols-2" data-reveal="stagger">
          {materials.map((m) => (
            <article key={m.name} className="flex flex-col gap-4 bg-surface p-6 md:p-8">
              <p className="headline text-number text-oxide">{m.name}</p>
              <h3 className="text-h3">{m.full}</h3>
              <p className="max-w-[60ch] text-ink-muted">{m.text}</p>
              <p className="text-small">
                <span className="caps-label mr-2">Used for</span>
                {m.lines.map((slug, i) => (
                  <span key={slug}>
                    {i > 0 && <span className="text-ink-muted"> · </span>}
                    <Link to={`/${slug}`} className="font-bold text-oxide-deep underline-offset-4 hover:underline">
                      {lineBySlug[slug].name}
                    </Link>
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-8 text-center">
          <h3 className="text-h3">Finishes</h3>
          <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {finishes.map((f) => (
              <li key={f.name} className="flex flex-col items-center gap-3">
                <span className="block aspect-square w-full max-w-44 overflow-hidden rounded-full bg-surface-2">
                  <Img id={f.image} alt="" sizes="176px" className="size-full object-cover" />
                </span>
                <span className="text-small font-bold">{f.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-small text-ink-muted">Shown as indicative examples. Colours and textures can be matched to your brief.</p>
        </div>
      </Container>
    </Section>
  );
}
