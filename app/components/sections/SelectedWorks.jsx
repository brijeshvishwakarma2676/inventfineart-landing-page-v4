import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Plate } from '../ui/Plate';
import { featuredProjects } from '../../data/projects';
import { HoverView, HoverHint, useHoverView } from './HoverView';

/**
 * Few executed works (meeting 2026-10-24, L94–106; was "Selected works"): five eye-catching photos (all ≥ 1,200 px),
 * the first one large, each with a spec tag, then "View gallery". Every tile opens the Gallery on its group; a work
 * with a second photo shows it on hover.
 */
export function SelectedWorks() {
  return (
    <Section tone="surface">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Work done by us" title={<>Few executed <em>works</em></>} tagline="A few pieces we are proud of. The gallery has the rest." />
          <Button to="/gallery" variant="secondary" arrow className="shrink-0">
            View gallery
          </Button>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {featuredProjects.map((p, i) => (
            <li key={p.image} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <WorkTile p={p} large={i === 0} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function WorkTile({ p, large }) {
  const [armed, hoverHandlers] = useHoverView();
  const sizes = large ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';
  return (
    <Link to={`/gallery?type=${p.group}`} className="group sketch-trigger flex h-full flex-col gap-3" {...hoverHandlers}>
      <span className={`relative block overflow-hidden bg-surface-2 ${large ? 'aspect-[4/3] lg:aspect-auto lg:flex-1' : 'aspect-[4/3]'}`}>
        <Img id={p.image} alt={p.alt} sizes={sizes} className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
        <HoverView item={p} armed={armed} sizes={sizes} />
      </span>
      <Plate code={p.groupName} title={p.title} as="h3">
        <HoverHint item={p} />
      </Plate>
    </Link>
  );
}
