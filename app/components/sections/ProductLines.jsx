import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { dots } from '../ui/format';
import { lines } from '../../data/lines';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * The five product lines (SITE-V4-PLAN.md §3.1-2): full-width numbered rows. On desktop a sticky preview beside
 * the list shows the photo of the row under the pointer or keyboard focus; on phones each row carries its photo.
 * Each row: number · name · tagline · suitable for (the brief's words) · Explore and Enquire.
 */
export function ProductLines() {
  const [shown, setShown] = useState(0);
  const { open } = useEnquiry();
  const preview = lines[shown];

  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Our products" title={<>Our <em>five</em> product lines</>} tagline="Every piece is made as per your design and requirement." />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ol className="lg:col-span-7" data-reveal="stagger">
            {lines.map((l, i) => (
              <li
                key={l.slug}
                onPointerEnter={() => setShown(i)}
                onFocusCapture={() => setShown(i)}
                className="group relative grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-4 border-t-2 border-line-strong py-6 last:border-b-2 sm:grid-cols-[6.5rem_1fr_auto] sm:gap-x-6"
              >
                <span aria-hidden="true" className={`condensed text-[3.5rem] leading-[0.85] transition-colors sm:text-[5rem] ${shown === i ? 'text-oxide' : 'text-ink'}`}>
                  {l.num}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="condensed text-[clamp(1.9rem,1.4rem+1.6vw,2.9rem)] leading-[0.95]">
                    {/* Stretched link: the whole row opens the line */}
                    <Link to={`/${l.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline">
                      <span className="sr-only">{l.num} </span>
                      {l.name}
                    </Link>
                  </h3>
                  <p className="font-medium text-ink-muted">{l.tagline}</p>
                  <p className="text-small text-ink-muted">
                    <span className="caps-label mr-2 text-ink">Suitable for</span>
                    {dots(l.suitableFor)}
                  </p>
                </div>
                <div className="relative z-10 col-span-2 flex items-center gap-4 sm:col-span-1 sm:flex-col sm:items-end sm:justify-between">
                  <span className="inline-flex items-center gap-2 text-small font-bold uppercase tracking-label text-oxide-deep">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <button
                    type="button"
                    onClick={() => open({ category: l.slug })}
                    className="text-small font-bold uppercase tracking-label text-ink underline decoration-2 underline-offset-4 hover:text-oxide-deep"
                    aria-label={`Enquire about ${l.name}`}
                  >
                    Enquire
                  </button>
                </div>
                {/* Phones and tablets: the photo sits in the row */}
                <div className="col-span-2 aspect-[16/10] overflow-hidden bg-surface-2 sm:col-span-3 lg:hidden">
                  <Img id={l.banner.image} alt={`${l.name} by Invent Fine Art`} sizes="100vw" className="size-full object-cover" style={{ objectPosition: l.banner.position }} />
                </div>
              </li>
            ))}
          </ol>

          {/* Desktop: sticky preview of the row in focus */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                {lines.map((l, i) => (
                  <Img
                    key={l.slug}
                    id={l.banner.image}
                    alt=""
                    sizes="40vw"
                    className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${shown === i ? 'opacity-100' : 'opacity-0'}`}
                    style={{ objectPosition: l.banner.position }}
                  />
                ))}
              </div>
              <p className="caps-label mt-3 border-t-2 border-line-strong pt-3 text-oxide-deep" aria-hidden="true">
                {preview.num} / 05 · {preview.name}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
