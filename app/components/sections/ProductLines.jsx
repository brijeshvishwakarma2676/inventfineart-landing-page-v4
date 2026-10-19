import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { lines } from '../../data/lines';
import { designsFor } from '../../data/designs';

/**
 * The five product lines (SITE-V4-PLAN.md §3.1-2) as photo tiles: Sculptures large on the left, the other four in a
 * 2 × 2 block beside it. Each tile: photo, name, the brief's tagline, the number of designs in the catalogue.
 */
export function ProductLines() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our products" title="Five product lines" tagline="Every piece is made as per your design and requirement." />
          <Button to="/products" variant="secondary" arrow className="shrink-0">
            All products
          </Button>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {lines.map((l, i) => {
            const count = designsFor(l.slug).length;
            const big = i === 0;
            return (
              <li key={l.slug} className={big ? 'sm:col-span-2 lg:row-span-2' : ''}>
                <Link to={`/${l.slug}`} className="group flex h-full flex-col gap-4">
                  {/* The large tile fills its two rows: its photo is absolute there, so it can't stretch the grid */}
                  <span className={`relative block overflow-hidden bg-surface-2 ${big ? 'aspect-[4/3] lg:aspect-auto lg:min-h-80 lg:flex-1' : 'aspect-[4/3]'}`}>
                    <Img
                      id={l.banner.image}
                      alt={`${l.name} by Invent Fine Art`}
                      sizes={big ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                      className={`size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105 ${big ? 'lg:absolute lg:inset-0' : ''}`}
                      style={{ objectPosition: l.banner.position }}
                    />
                  </span>
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex flex-col gap-1">
                      <span className={`headline leading-tight group-hover:text-oxide-deep ${big ? 'text-h2' : 'text-h3'}`}>{l.name}</span>
                      <span className="text-small text-ink-muted">{l.tagline}</span>
                      <span className="caps-label mt-1 text-oxide-deep">{count} designs</span>
                    </span>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-oxide transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
