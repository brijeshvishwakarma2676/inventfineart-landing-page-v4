import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Plate } from '../ui/Plate';
import { featuredProjects } from '../../data/projects';

/**
 * Selected works (SITE-V4-PLAN.md §3.1-4): six project photos (all ≥ 1,200 px) in an asymmetric ruled grid,
 * the first one large, each with a spec tag. Every tile opens Projects on its group.
 */
export function SelectedWorks() {
  return (
    <Section tone="surface">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected works" title={<>Past work, <em>in place</em></>} tagline="Murals, water features, pergolas and more from past projects." />
          <Button to="/projects" variant="secondary" arrow className="shrink-0">
            All projects
          </Button>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {featuredProjects.map((p, i) => (
            <li key={p.image} className={i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}>
              <Link to={`/projects?type=${p.group}`} className="group flex h-full flex-col gap-3">
                <span className={`block overflow-hidden bg-surface-2 ${i === 0 ? 'aspect-[4/3] lg:aspect-auto lg:flex-1' : 'aspect-[4/3]'}`}>
                  <Img
                    id={p.image}
                    alt={p.alt}
                    sizes={i === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                    className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                  />
                </span>
                <Plate code={p.groupName} title={p.title} as="h3" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
