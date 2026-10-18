import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { Img } from '../components/ui/Img';
import { useLightbox } from '../components/ui/useLightbox';
import { SplitHeader } from '../components/sections/PageHeader';
import { projects, projectGroups } from '../data/projects';
import { breadcrumbs } from '../data/seo';
import { useHydrated } from '../motion/useReducedMotion';

// ?img=<folder>-<number> names one photo, e.g. ?img=wall_murals-9
const imgKey = (image) => image.split('/').slice(1).join('-');

/**
 * Projects (SITE-V4-PLAN.md §3.3): past work outside the five product lines, in three groups.
 * The prerendered HTML is the unfiltered page; ?type= and ?img= apply only after hydration (React #418).
 * The first 18 photos show, then "Show all" (hidden with CSS, so prerender and hydration match).
 */
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const hydrated = useHydrated();
  const [expanded, setExpanded] = useState(false);
  const requested = params.get('type');
  const active = hydrated && projectGroups.some((g) => g.slug === requested) ? requested : 'all';
  const shown = useMemo(() => (active === 'all' ? projects : projects.filter((p) => p.group === active)), [active]);
  const { open, element } = useLightbox(shown);

  const wantedImg = hydrated ? params.get('img') : null;
  useEffect(() => {
    if (!wantedImg) return;
    const i = shown.findIndex((p) => imgKey(p.image) === wantedImg);
    if (i >= 0) open(i);
  }, [wantedImg, shown, open]);

  const select = (slug) => {
    setExpanded(false);
    setParams(slug === 'all' ? {} : { type: slug }, { preventScrollReset: true, replace: true });
  };
  const tabs = [{ slug: 'all', name: 'All', count: projects.length }, ...projectGroups.map((g) => ({ ...g, count: projects.filter((p) => p.group === g.slug).length }))];

  return (
    <>
      <Seo
        title="Projects: Wall Murals, Water Features & Installations | Invent Fine Art"
        description="Past work by Invent Fine Art: wall murals and relief art, water features and rockery, pergolas and gazebos."
        image="gallery/wall_murals/9"
        jsonLd={breadcrumbs([{ name: 'Projects', path: '/projects' }])}
      />
      <SplitHeader
        crumbs={[{ name: 'Projects' }]}
        eyebrow="Past work"
        title={<>Our <em>projects</em></>}
        lead="Murals and relief art, water features and rockery, pergolas and gazebos, beyond our five product lines."
        image="gallery/wall_murals/9"
        alt="Metal leaf wall installation in a living room, by Invent Fine Art"
      />

      <Section>
        <Container>
          <div className="mb-10 overflow-x-auto border-b-2 border-line-strong" role="group" aria-label="Filter projects">
            <div className="flex w-max gap-6">
              {tabs.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  aria-pressed={active === t.slug}
                  onClick={() => select(t.slug)}
                  className={`-mb-0.5 border-b-2 py-3 text-small font-bold uppercase tracking-label ${
                    active === t.slug ? 'border-oxide text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                  }`}
                >
                  {t.name} <span className="text-oxide-deep">{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Masonry via CSS columns; each photo opens the lightbox */}
          <ul key={active} className={`columns-2 gap-4 md:columns-3 lg:gap-6 ${expanded ? '' : '[&>li:nth-child(n+19)]:hidden'}`}>
            {shown.map((p, i) => (
              <li key={p.image} className="mb-4 break-inside-avoid lg:mb-6">
                <button type="button" onClick={() => open(i)} className="group block w-full cursor-zoom-in overflow-hidden bg-surface-2" aria-label={`View larger: ${p.title}`}>
                  <Img id={p.image} alt={p.alt} sizes="(min-width: 768px) 33vw, 50vw" className="w-full transition-transform duration-700 ease-out-soft group-hover:scale-105" />
                </button>
                <p className="caps-label mt-2 text-oxide-deep">{p.groupName}</p>
              </li>
            ))}
          </ul>
          {!expanded && shown.length > 18 && (
            <div className="mt-10 flex justify-center border-t border-line pt-8">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="min-h-12 border-2 border-ink px-6 text-small font-bold uppercase tracking-label hover:bg-ink hover:text-chalk"
              >
                Show all {shown.length} photos
              </button>
            </div>
          )}
          {element}
        </Container>
      </Section>
    </>
  );
}
