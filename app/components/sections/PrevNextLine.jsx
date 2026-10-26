import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { lines } from '../../data/lines';

/** Previous / next product line (v2's prev/next), wrapping around 05 → 01. */
export function PrevNextLine({ slug }) {
  const i = lines.findIndex((l) => l.slug === slug);
  const prev = lines[(i + lines.length - 1) % lines.length];
  const next = lines[(i + 1) % lines.length];
  const cell = 'group flex flex-col gap-2 py-8';
  return (
    <nav aria-label="Other services" className="bg-bg">
      <div className="container-site grid border-y-2 border-line-strong sm:grid-cols-2">
        <Link to={`/${prev.slug}`} className={`${cell} border-b border-line sm:border-r sm:border-b-0 sm:pr-8`}>
          <span className="caps-label inline-flex items-center gap-2 text-ink-muted">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.25} aria-hidden="true" />
            Previous line
          </span>
          <span className="condensed text-[2rem] leading-none">
            <span className="text-oxide">{prev.num}</span> {prev.name}
          </span>
        </Link>
        <Link to={`/${next.slug}`} className={`${cell} items-end text-right sm:pl-8`}>
          <span className="caps-label inline-flex items-center gap-2 text-ink-muted">
            Next line
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
          </span>
          <span className="condensed text-[2rem] leading-none">
            <span className="text-oxide">{next.num}</span> {next.name}
          </span>
        </Link>
      </div>
    </nav>
  );
}
