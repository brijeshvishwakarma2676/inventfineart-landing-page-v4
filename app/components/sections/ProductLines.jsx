import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { dots } from '../ui/format';
import { lines } from '../../data/lines';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * The four services (meeting 2026-10-24, L32–38, L794): full-width numbered rows. Each row: number · name · tagline ·
 * what it covers (its segments) · four photos · Explore and Enquire. The whole row opens the service page.
 */
export function ProductLines() {
  const { open } = useEnquiry();

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Our services" title={<>What we <em>make</em></>} tagline="Every piece is made as per your design and requirement." />

        <ol className="mt-14" data-reveal="stagger">
          {lines.map((l) => (
            <li key={l.slug} className="group relative grid gap-6 border-t-2 border-line-strong py-8 last:border-b-2 lg:grid-cols-12 lg:gap-10">
              <div className="flex flex-col gap-3 lg:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span aria-hidden="true" className="condensed text-[3.5rem] leading-[0.85] text-oxide sm:text-[4.5rem]">
                    {l.num}
                  </span>
                  <h3 className="condensed text-[clamp(1.9rem,1.4rem+1.6vw,2.9rem)] leading-[0.95]">
                    {/* Stretched link: the whole row opens the service */}
                    <Link to={`/${l.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline">
                      <span className="sr-only">{l.num} </span>
                      {l.name}
                    </Link>
                  </h3>
                </div>
                <p className="font-medium text-ink-muted">{l.tagline}</p>
                <p className="text-small text-ink-muted">
                  <span className="caps-label mr-2 text-ink">{l.segmentsAreMaterials ? 'Made in' : 'Includes'}</span>
                  {dots(l.segmentsAreMaterials ? l.materials : l.segments.map((sg) => sg.name))}
                </p>
                <div className="relative z-10 mt-2 flex items-center gap-6">
                  <span className="inline-flex items-center gap-2 text-small font-bold uppercase tracking-label text-oxide-deep">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <button
                    type="button"
                    onClick={() => open({ category: l.slug })}
                    className="min-h-11 text-small font-bold uppercase tracking-label text-ink underline decoration-2 underline-offset-4 hover:text-oxide-deep"
                    aria-label={`Enquire about ${l.name}`}
                  >
                    Enquire
                  </button>
                </div>
              </div>
              <ul className="grid grid-cols-4 gap-2 sm:gap-3 lg:col-span-7" aria-hidden="true">
                {l.photos.map((id) => (
                  <li key={id} className="aspect-[4/5] overflow-hidden bg-surface-2">
                    <Img id={id} alt="" sizes="(min-width: 1024px) 14vw, 24vw" className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
