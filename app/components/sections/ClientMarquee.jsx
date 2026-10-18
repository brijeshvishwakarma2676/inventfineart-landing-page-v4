import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { clientLogos } from '../../data/clients';

function Logo({ c, hidden = false, className = '' }) {
  return (
    <li className={`grid h-24 w-44 shrink-0 place-items-center border-r border-line bg-white px-6 motion-reduce:h-20 motion-reduce:w-auto motion-reduce:border-b motion-reduce:px-3 ${className}`} aria-hidden={hidden || undefined}>
      <Img
        id={c.image}
        alt={hidden ? '' : c.alt}
        sizes="142px"
        className="max-h-[60%] w-auto max-w-full object-contain grayscale transition duration-300 hover:grayscale-0"
      />
    </li>
  );
}

/**
 * Trusted by (SITE-V4-PLAN.md §3.1-7): v2's client marquee, CSS only. The 28 logo brands from the old site scroll
 * in one row and pause on hover or keyboard focus. Under reduced motion it is a static wrapped grid.
 */
export function ClientMarquee({ tone = 'bg', heading = true }) {
  return (
    <Section tone={tone}>
      <Container>
        {heading && (
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Trusted by" title={<>Developers, brands <em>and institutions</em></>} />
            <Link to="/clients" className="group inline-flex shrink-0 items-center gap-2 text-small font-bold uppercase tracking-label text-oxide-deep hover:text-ink">
              All clients
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
        )}
      </Container>
      <div className="group mt-12 overflow-hidden border-y-2 border-line-strong" aria-label="Client logos">
        <ul className="flex w-max animate-[marquee_60s_linear_infinite] border-l border-line group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:grid motion-reduce:w-full motion-reduce:animate-none motion-reduce:grid-cols-3 sm:motion-reduce:grid-cols-5 lg:motion-reduce:grid-cols-7">
          {clientLogos.map((c) => (
            <Logo key={c.image} c={c} />
          ))}
          {/* Second copy for a seamless loop; hidden from assistive tech and under reduced motion */}
          {clientLogos.map((c) => (
            <Logo key={`dup-${c.image}`} c={c} hidden className="motion-reduce:hidden" />
          ))}
        </ul>
      </div>
    </Section>
  );
}
