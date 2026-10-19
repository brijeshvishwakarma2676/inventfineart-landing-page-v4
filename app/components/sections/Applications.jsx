import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { applications } from '../../data/applications';
import { lineBySlug } from '../../data/lines';

/**
 * Browse by application (Home and /products): one tile per kind of space, with the product lines whose brief copy
 * names it. Each tile has an id (`app-<slug>`), so the header's Applications menu can link straight to it.
 */
export function Applications({ tone = 'bg', id = 'applications' }) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-(--header-h)">
      <Container>
        <SectionHeading eyebrow="Browse by application" title="Made for your kind of space" />
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {applications.map((a) => (
            <li key={a.slug} id={`app-${a.slug}`} className="flex scroll-mt-[calc(var(--header-h)+1.5rem)] flex-col gap-4">
              <div className="aspect-[4/3] overflow-hidden bg-surface-2">
                <Img id={a.image} alt={a.name} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="size-full object-cover" />
              </div>
              <h3 className="text-h3">{a.name}</h3>
              <ul className="-mt-1 flex flex-col border-t border-line">
                {a.lines.map((slug) => (
                  <li key={slug}>
                    <Link to={`/${slug}`} className="group flex items-center justify-between gap-3 border-b border-line py-2.5 text-small font-bold hover:text-oxide-deep">
                      {lineBySlug[slug].name}
                      <ArrowRight className="size-4 text-oxide transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
