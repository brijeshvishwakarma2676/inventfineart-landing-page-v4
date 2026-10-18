import { Link } from 'react-router';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { materials } from '../../data/content';
import { lineBySlug, finishes } from '../../data/lines';

// Full class names (Tailwind only generates classes it can read in the source).
const SWATCH = { 'surface-2': 'bg-surface-2', surface: 'bg-surface', 'ink-muted': 'bg-ink-muted', 'oxide-deep': 'bg-oxide-deep', line: 'bg-line' };

/**
 * Materials (SITE-V4-PLAN.md §3.1-5): the two materials the sources name, GRC and FRP, in the brief's own words,
 * each with the lines made in it; then the provisional finishes as flat swatches until photos arrive.
 */
export function Materials() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Materials" title={<>Made in <em>GRC</em> and <em>FRP</em></>} />

        <div className="mt-12 grid border-t-2 border-line-strong md:grid-cols-2" data-reveal="stagger">
          {materials.map((m) => (
            <article key={m.name} className="flex flex-col gap-4 border-b border-line py-8 md:border-b-0 md:px-8 md:first:border-r md:first:pl-0">
              <p className="condensed text-number text-oxide">{m.name}</p>
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

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8">
          <p className="caps-label">Finishes</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {finishes.map((f) => (
              <li key={f.name} className="flex flex-col gap-2">
                <span className={`aspect-[4/3] border border-line ${SWATCH[f.tone]}`} aria-hidden="true" />
                <span className="text-small font-bold">{f.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-small text-ink-muted">Colours shown are indicative. Colours and textures can be matched to your brief.</p>
        </div>
      </Container>
    </Section>
  );
}
