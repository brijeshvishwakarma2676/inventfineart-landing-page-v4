import themeCss from '../styles/global.css?raw';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading, Eyebrow } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Plate } from '../components/ui/Plate';
import { dots } from '../components/ui/format';
import { lines, lineBySlug, finishes } from '../data/lines';
import { designs, designsFor, designByCode, sculptureGroups } from '../data/designs';
import { projects, projectGroups } from '../data/projects';
import { clientLogos, clientNames } from '../data/clients';
import { PAIRS, BANNED_PAIRS, contrast } from '../styles/contrast';
import { useEnquiry } from '../enquiry/EnquiryContext';

// Read from global.css at build time, so this page can't drift from the real tokens.
const TOKENS = [...themeCss.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;(?:\s*\/\*\s*(.*?)\s*\*\/)?/gi)].map((m) => ({
  name: m[1],
  hex: m[2].toUpperCase(),
  note: m[3] ?? '',
}));
const HEX = Object.fromEntries(TOKENS.map((t) => [t.name, t.hex]));

// Full class names (Tailwind only generates classes it can see written out).
const SWATCH = {
  bg: 'bg-bg', surface: 'bg-surface', 'surface-2': 'bg-surface-2', paper: 'bg-paper', line: 'bg-line',
  'line-strong': 'bg-line-strong', field: 'bg-field', ink: 'bg-ink', 'ink-muted': 'bg-ink-muted', oxide: 'bg-oxide',
  'oxide-deep': 'bg-oxide-deep', 'oxide-bright': 'bg-oxide-bright', dark: 'bg-dark', 'dark-2': 'bg-dark-2',
  chalk: 'bg-chalk', 'chalk-muted': 'bg-chalk-muted', white: 'bg-white', whatsapp: 'bg-whatsapp', error: 'bg-error',
};
const FINISH = { 'surface-2': 'bg-surface-2', surface: 'bg-surface', 'ink-muted': 'bg-ink-muted', 'oxide-deep': 'bg-oxide-deep', line: 'bg-line' };

// Real designs from the catalogue (codes match site-v3, SITE-V4-PLAN.md §5.3).
const PLATES = ['IFA-SC-012', 'IFA-PL-003', 'IFA-GRL-002'].map((code) => designByCode[code]);

// Headline sizes (Archivo condensed 800 capitals; h3 is normal width).
const TYPE = [
  ['text-display', 'Display 48→128', <>Made to <em>your</em> design.</>],
  ['text-h1', 'H1 44→104', <>Sculptures, <em>made to measure</em></>],
  ['text-h2', 'H2 36→72', <>Where nature <em>meets design</em></>],
];

/** Internal reference page (noindex): every token, contrast pair, type size, button, plate and reveal. */
export default function Styleguide() {
  const sculptures = lineBySlug.sculptures;
  const { open } = useEnquiry();
  const sample = designByCode['IFA-SC-012'];
  return (
    <>
      <Seo title="Style guide | Invent Fine Art" description="Design tokens and components." noindex />
      <Section>
        <Container className="flex flex-col gap-20">
          <SectionHeading eyebrow="Internal · noindex" title={<>Style guide <em>v4</em></>} tagline="Concrete & Oxide: concrete, cement, graphite and one oxide accent. SITE-V4-PLAN.md §2." />

          <div className="flex flex-col gap-6">
            <Eyebrow>Colour tokens</Eyebrow>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
              {TOKENS.map((t) => (
                <li key={t.name} className="flex flex-col gap-2 text-small">
                  <span className={`h-16 rounded-image border border-line ${SWATCH[t.name] ?? ''}`} />
                  <span className="font-semibold">{t.name}</span>
                  <span className="caps-label text-ink-muted">{t.hex}</span>
                  {t.note && <span className="text-micro text-ink-muted">{t.note}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Contrast (WCAG), computed from the tokens</Eyebrow>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] border-t border-line-strong text-left text-small">
                <thead>
                  <tr className="border-b border-line-strong">
                    {['Text', 'On', 'Ratio', 'Needs', 'Used for'].map((h) => (
                      <th key={h} className="caps-label py-3 pr-4 font-semibold text-ink-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PAIRS.map(([fg, bg, min, use]) => {
                    const r = contrast(HEX[fg], HEX[bg]);
                    return (
                      <tr key={`${fg}-${bg}-${use}`} className="border-b border-line">
                        <td className="py-2 pr-4 font-semibold">{fg}</td>
                        <td className="py-2 pr-4">{bg}</td>
                        <td className={`py-2 pr-4 tabular-nums ${r >= min ? '' : 'font-semibold text-error'}`}>{r.toFixed(2)}:1</td>
                        <td className="py-2 pr-4 tabular-nums text-ink-muted">{min}:1</td>
                        <td className="py-2 text-ink-muted">{use}</td>
                      </tr>
                    );
                  })}
                  {BANNED_PAIRS.map(([fg, bg, instead]) => (
                    <tr key={`${fg}-${bg}-ban`} className="border-b border-line text-ink-muted">
                      <td className="py-2 pr-4 line-through">{fg}</td>
                      <td className="py-2 pr-4 line-through">{bg}</td>
                      <td className="py-2 pr-4 tabular-nums">{contrast(HEX[fg], HEX[bg]).toFixed(2)}:1</td>
                      <td className="py-2 pr-4">banned</td>
                      <td className="py-2">{instead}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Eyebrow>Type: Archivo only (condensed capitals for headlines, normal width for text)</Eyebrow>
            {TYPE.map(([cls, label, sample]) => (
              <div key={cls} className="grid gap-2 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
                <span className="caps-label text-ink-muted">{label}</span>
                <p className={`condensed ${cls} [&_em]:text-oxide [&_em]:not-italic`}>{sample}</p>
              </div>
            ))}
            <div className="grid gap-2 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="caps-label text-ink-muted">H3 22→30</span>
              <p className="text-h3 font-bold">Distinctive Patterns. Timeless Architectural Appeal.</p>
            </div>
            <div className="grid gap-2 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="caps-label text-ink-muted">Number 64→144</span>
              <p className="condensed flex gap-6 text-number text-oxide">
                <span>01</span>
                <span className="text-ink">02</span>
                <span className="text-transparent [-webkit-text-stroke:2px_var(--color-ink)]">03</span>
              </p>
            </div>
            <div className="grid gap-2 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="caps-label text-ink-muted">Lead 18→20</span>
              <p className="max-w-[68ch] text-lead text-ink-muted">{sculptures.intro[0]}</p>
            </div>
            <div className="grid gap-2 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="caps-label text-ink-muted">Body 16→17</span>
              <p className="max-w-[68ch]">{lineBySlug['grc-products'].intro[1]}</p>
            </div>
            <div className="grid gap-2 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="caps-label text-ink-muted">Small 14</span>
              <p className="text-small text-ink-muted">Small text for notes, captions and form hints.</p>
            </div>
            <div className="grid gap-3 border-t border-line pt-4 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="caps-label text-ink-muted">caps-label</span>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                <span className="caps-label text-oxide-deep">01 / 05 · Sculptures</span>
                <span className="caps-label text-oxide-deep">IFA-SC-012</span>
                <span className="caps-label text-ink-muted">Suitable for</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Buttons</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Button arrow>Get a Quote</Button>
              <Button variant="secondary" arrow>Explore products</Button>
              <Button variant="text" arrow>All projects</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 bg-dark p-6">
              <Button arrow>Get a Quote</Button>
              <Button variant="onDark">WhatsApp us</Button>
              <Button variant="textOnDark" arrow>About us</Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Enquiry panel: the three kinds of entry point</Eyebrow>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => open()} data-test="enquire-general">General (header, footer)</Button>
              <Button variant="secondary" onClick={() => open({ category: 'sculptures' })} data-test="enquire-line">
                A product line
              </Button>
              <Button
                variant="secondary"
                onClick={() => open({ category: sample.line, code: sample.code, title: sample.title })}
                data-test="enquire-design"
              >
                A design ({sample.code})
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Catalogue plates (real designs, v3 codes)</Eyebrow>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-8" data-reveal="stagger">
              {PLATES.map((p) => (
                <li key={p.code} className="flex flex-col gap-3">
                  <div className="aspect-[4/5] overflow-hidden rounded-image bg-surface-2">
                    <Img id={p.image} alt={p.alt} sizes="(min-width: 768px) 30vw, 45vw" className="size-full object-cover" />
                  </div>
                  <Plate code={p.code} title={p.title} detail={p.detail} as="h3" />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Content inventory (app/data)</Eyebrow>
            <dl className="max-w-3xl border-t border-line-strong">
              {[
                ['Designs', `${designs.length}: ${dots(lines.map((l) => `${l.num}\u00a0${l.name} ${designsFor(l.slug).length}`))}`],
                ['Sculpture groups', dots(sculptureGroups.map((g) => `${g.name} ${designs.filter((d) => d.group === g.slug).length}`))],
                ['Projects', `${projects.length}: ${dots(projectGroups.map((g) => `${g.name} ${projects.filter((p) => p.group === g.slug).length}`))}`],
                ['Clients', `${clientLogos.length} logo brands · ${clientNames.length} names from the old site`],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="caps-label text-ink-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <Eyebrow>Ruled spec list (no chips)</Eyebrow>
            <dl className="max-w-xl border-t border-line-strong">
              {[
                ['Suitable for', dots(sculptures.suitableFor)],
                ['Materials', dots(sculptures.materials)],
                ['Sizes', sculptures.sizes],
                ['Finishes', dots(finishes.map((f) => f.name))],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="caps-label text-ink-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-4">
              {finishes.map((f) => (
                <li key={f.name} className="flex w-28 flex-col gap-2 text-small">
                  <span className={`aspect-square rounded-image border border-line ${FINISH[f.tone]}`} />
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Section tone: surface" title={<>Alternate <em>sections</em></>} tagline="Bands are separated by tone or a visible ruled line, never by floating boxes." />
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="flex flex-col gap-10">
          <SectionHeading tone="dark" eyebrow="Section tone: dark" title={<>Graphite, <em>at most two</em> per page</>} tagline="Besides the header and footer. Eyebrows, numbers and links on graphite use oxide-bright." />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
            {PLATES.slice(0, 2).map((p) => (
              <li key={p.code}>
                <Plate tone="dark" code={p.code} title={p.title} detail={p.detail} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-6">
          <Eyebrow>Reveals (scroll down; off under reduced motion)</Eyebrow>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-image bg-surface p-8" data-reveal="up">data-reveal=&quot;up&quot;</div>
            <ul className="flex flex-col gap-2" data-reveal="stagger">
              {['stagger 1', 'stagger 2', 'stagger 3'].map((t) => (
                <li key={t} className="rounded-image bg-surface p-3">{t}</li>
              ))}
            </ul>
            <div className="aspect-[4/3] overflow-hidden rounded-image" data-reveal="clip">
              <Img id="gallery/sculptures/20" alt="Giant garden chess set" sizes="(min-width: 640px) 33vw, 90vw" className="size-full object-cover" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
