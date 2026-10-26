import { Box, Building2, Factory, PackageCheck, Route, Ruler } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { reasons } from '../../data/content';

const ICONS = { factory: Factory, ruler: Ruler, cube: Box, route: Route, building: Building2, check: PackageCheck };

/** Why choose us (Home, near the end: meeting 2026-10-24, L124–126): six reasons in a ruled grid, from content.js. */
export function WhyUs() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeading eyebrow="Why Invent Fine Art" title={<>Why clients <em>choose us</em></>} />
        <ul className="mt-12 grid border-t-2 border-line-strong sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {reasons.map((r) => {
            const Icon = ICONS[r.icon];
            return (
              <li key={r.title} className="flex flex-col gap-3 border-b border-line py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-l lg:px-8 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0 lg:sm:even:pl-8">
                <Icon className="size-8 text-oxide" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="condensed text-[1.6rem] leading-none">{r.title}</h3>
                <p className="text-small text-ink-muted">{r.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
