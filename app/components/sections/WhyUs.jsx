import { Building2, Factory, PackageCheck, Route, Ruler, ShieldCheck } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { reasons } from '../../data/content';

const ICONS = { factory: Factory, ruler: Ruler, route: Route, building: Building2, check: ShieldCheck, truck: PackageCheck };

/** Why choose us (Home): six reasons, each restating the old site (data/content.js `reasons`), as icon cards. */
export function WhyUs() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="Why Invent Fine Art" title="Why clients choose us" align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {reasons.map((r) => {
            const Icon = ICONS[r.icon];
            return (
              <li key={r.title} className="flex flex-col items-start gap-3 bg-surface p-6 md:p-8">
                <span className="grid size-12 place-items-center bg-bg text-oxide" aria-hidden="true">
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="text-h3">{r.title}</h3>
                <p className="text-ink-muted">{r.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
