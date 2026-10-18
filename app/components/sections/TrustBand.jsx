import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { Eyebrow } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { intro, facility } from '../../data/content';
import { site } from '../../data/site';
import { useCountUp } from '../../motion/useCountUp';

/**
 * Trust band (graphite; SITE-V4-PLAN.md §3.1-3): the old site's "community of artists" line, the provisional stats
 * as oversized oxide numbers with the certification, and the four units of the facility in a ruled grid.
 */
export function TrustBand() {
  const stats = useRef(null);
  useCountUp(stats);

  return (
    <Section tone="dark">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-7" data-reveal="up">
            <Eyebrow tone="dark">{intro.eyebrow}</Eyebrow>
            <h2 className="text-h2 text-chalk">{intro.title}</h2>
            {intro.body.map((p) => (
              <p key={p} className="max-w-2xl text-lead text-chalk-muted">
                {p}
              </p>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-6">
              <Button variant="onDark" to="/about" arrow>
                About us
              </Button>
              <Button variant="textOnDark" to="/contact">
                Contact
              </Button>
            </div>
          </div>

          <div ref={stats} className="lg:col-span-5">
            <dl className="border-t-2 border-chalk">
              {site.stats.map((s) => (
                <div key={s.label} className="flex items-end justify-between gap-6 border-b border-chalk/15 py-5">
                  <dt className="caps-label pb-2 text-chalk-muted">{s.label}</dt>
                  <dd className="condensed text-number text-oxide-bright">
                    <span data-count={s.value}>{s.value}</span>
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="caps-label mt-5 inline-flex items-center gap-2 text-chalk">
              <ShieldCheck className="size-4 text-oxide-bright" strokeWidth={2.25} aria-hidden="true" />
              {site.certification}
            </p>
          </div>
        </div>

        {/* The four units of the facility (old About page) */}
        <ul className="mt-16 grid border-t border-chalk/15 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {facility.map((f, i) => (
            <li key={f.name} className="flex flex-col gap-3 border-b border-chalk/15 py-6 sm:px-6 sm:odd:pl-0 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
              <span className="condensed text-[2rem] leading-none text-oxide-bright">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-bold text-chalk">{f.name}</p>
              <p className="text-small text-chalk-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
