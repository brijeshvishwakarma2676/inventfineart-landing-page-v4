import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { intro, facility } from '../../data/content';
import { site } from '../../data/site';
import { useCountUp } from '../../motion/useCountUp';

/**
 * The factory (Home; replaces the graphite trust band): the old site's "community of artists" line, two photos from
 * the workshop, the provisional stats with the certification, then the four units of the facility.
 */
export function Factory() {
  const stats = useRef(null);
  useCountUp(stats);

  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 aspect-[3/4] overflow-hidden bg-surface-2">
              <Img id="gallery/sculptures/78" alt="A lion sculpture of machine parts in the Invent Fine Art workshop" sizes="(min-width: 1024px) 30vw, 60vw" className="size-full object-cover" />
            </div>
            <div className="col-span-2 mt-12 aspect-[3/4] overflow-hidden bg-surface-2">
              <Img id="gallery/sculptures/54" alt="A Gandhi statue in the Invent Fine Art workshop" sizes="(min-width: 1024px) 20vw, 40vw" className="size-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow={intro.eyebrow} title={intro.title}>
              {intro.body.map((p) => (
                <p key={p} className="max-w-2xl text-ink-muted">
                  {p}
                </p>
              ))}
            </SectionHeading>

            <dl ref={stats} className="grid grid-cols-3 gap-4 border-y border-line-strong py-6">
              {site.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-small text-ink-muted">{s.label}</dt>
                  <dd className="headline text-number text-oxide">
                    <span data-count={s.value}>{s.value}</span>
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button to="/about" variant="secondary" arrow>
                About us
              </Button>
              <p className="inline-flex items-center gap-2 text-small font-bold">
                <ShieldCheck className="size-4 text-oxide" strokeWidth={2.25} aria-hidden="true" />
                {site.certification}
              </p>
            </div>
          </div>
        </div>

        {/* The four units of the facility (old About page) */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {facility.map((u, i) => (
            <li key={u.name} className="flex flex-col gap-2 bg-bg p-6">
              <span className="caps-label text-oxide-deep">Unit {String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-body font-bold">{u.name}</h3>
              <p className="text-small text-ink-muted">{u.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
