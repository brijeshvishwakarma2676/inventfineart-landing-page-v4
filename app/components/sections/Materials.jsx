import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { dots } from '../ui/format';
import { materials, otherMaterials } from '../../data/content';
import { lineBySlug, finishes } from '../../data/lines';

// Full class names (Tailwind only generates classes it can read in the source).
const SWATCH = { 'surface-2': 'bg-surface-2', surface: 'bg-surface', 'ink-muted': 'bg-ink-muted', 'oxide-deep': 'bg-oxide-deep', line: 'bg-line' };

/**
 * Materials (meeting 2026-10-24, L110–122, L592–760): GRC and FRP side by side, each with its own photos, its three
 * product groups, its advantages (GRC also "Why GRC"), and the services made in it; then the other materials in one
 * line, and the finish samples (flat swatches until the client's samples arrive, TASKS.md B5).
 */
export function Materials() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Materials" title={<>Made in <em>GRC</em> and <em>FRP</em></>} />

        <div className="mt-12 grid border-t-2 border-line-strong md:grid-cols-2" data-reveal="stagger">
          {materials.map((m) => (
            <article key={m.name} className="flex flex-col gap-5 border-b border-line py-8 md:border-b-0 md:px-8 md:first:border-r md:first:pl-0 md:last:pr-0">
              <div className="flex items-baseline gap-4">
                <p className="condensed text-number text-oxide">{m.name}</p>
                <h3 className="text-h3">{m.full}</h3>
              </div>
              <ul className="grid grid-cols-3 gap-2" aria-hidden="true">
                {m.photos.map((id) => (
                  <li key={id} className="aspect-[4/5] overflow-hidden bg-surface-2">
                    <Img id={id} alt="" sizes="(min-width: 768px) 15vw, 30vw" className="size-full object-cover" />
                  </li>
                ))}
              </ul>
              <p className="max-w-[60ch] text-ink-muted">{m.text}</p>
              <p className="text-small">
                <span className="caps-label mr-2">Made in {m.name}</span>
                {dots(m.groups)}
              </p>
              <div>
                <p className="caps-label mb-2 text-oxide-deep">Advantages</p>
                <ul className="border-t border-line">
                  {m.advantages.map((a) => (
                    <li key={a} className="border-b border-line py-2 text-small">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              {m.why && (
                <div>
                  <p className="caps-label mb-2 text-oxide-deep">Why {m.name}</p>
                  <p className="text-small text-ink-muted">{m.why}</p>
                </div>
              )}
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
        <p className="mt-8 text-ink-muted">{otherMaterials}</p>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8">
          <p className="caps-label">Colours and finishes</p>
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
