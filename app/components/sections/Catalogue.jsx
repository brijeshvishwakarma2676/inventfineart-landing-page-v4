import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { DesignCard } from './DesignCard';
import { useLightbox } from '../ui/useLightbox';
import { useHydrated } from '../../motion/useReducedMotion';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * The design catalogue of one product line (SITE-V4-PLAN.md §3.2-4).
 * - 2 columns on phones, 3 on tablets, 4 on desktop. The first 12 (phone) / 24 (wider) show, then "Show all":
 *   the extra cards are hidden with CSS, so the prerendered HTML and the first render match.
 * - `groups` (optional) adds filter tabs; `groupKey` is the design field they filter on ('group' for the sculpture
 *   subjects, 'segment' for a service's segments). A tab with no designs yet says so, with Enquire.
 * - ?design=IFA-SC-012 opens that design in the lightbox; ?segment=<slug> opens that tab. Both are read only after
 *   hydration (React #418); a tab clicked afterwards wins until the URL asks for another segment.
 */
export function Catalogue({ designs, groups, groupKey = 'group', line }) {
  const [pick, setPick] = useState({ for: null, value: null });
  const [expanded, setExpanded] = useState(false);
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  const { open: enquire } = useEnquiry();
  const segmentParam = hydrated ? params.get('segment') : null;
  const fromUrl = segmentParam && groups?.some((g) => g.slug === segmentParam) ? segmentParam : 'all';
  const group = pick.value && pick.for === segmentParam ? pick.value : fromUrl;
  const setGroup = (value) => setPick({ for: segmentParam, value });

  const shown = group === 'all' ? designs : designs.filter((d) => d[groupKey] === group);
  const { open, element } = useLightbox(shown, {
    onEnquire: (d) => enquire({ category: d.line, code: d.code, title: d.title }),
  });

  // Deep link: open the requested design once, after hydration.
  const requested = hydrated ? params.get('design') : null;
  useEffect(() => {
    if (!requested) return;
    // A fresh page load starts on "All", so the index into `designs` is the index into what's shown.
    const i = designs.findIndex((d) => d.code === requested.toUpperCase());
    if (i >= 0) open(i);
  }, [requested, designs, open]);

  const tabs = groups ? [{ slug: 'all', name: 'All', count: designs.length }, ...groups.map((g) => ({ ...g, count: designs.filter((d) => d[groupKey] === g.slug).length }))] : [];
  const emptyTab = group !== 'all' && shown.length === 0 ? tabs.find((t) => t.slug === group) : null;
  const limitClasses = expanded ? '' : 'max-md:[&>li:nth-child(n+13)]:hidden [&>li:nth-child(n+25)]:hidden';

  return (
    <div>
      {tabs.length > 0 && (
        <div className="mb-8 overflow-x-auto border-b-2 border-line-strong" role="group" aria-label="Filter designs">
          <div className="flex w-max gap-6">
            {tabs.map((t) => (
              <button
                key={t.slug}
                type="button"
                aria-pressed={group === t.slug}
                onClick={() => {
                  setGroup(t.slug);
                  setExpanded(false);
                }}
                className={`-mb-0.5 border-b-2 py-3 text-small font-bold uppercase tracking-label ${
                  group === t.slug ? 'border-oxide text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                }`}
              >
                {t.name} <span className="text-oxide-deep">{t.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {emptyTab && (
        <div className="flex flex-col items-start gap-4 border-t-2 border-line-strong py-10">
          <p className="text-h3">{emptyTab.name}: photos coming soon</p>
          <p className="max-w-xl text-ink-muted">{emptyTab.text ?? 'We make these to your design and requirement.'} Ask us for photos of work we have done, and a quote.</p>
          <button
            type="button"
            onClick={() => enquire({ category: line?.slug })}
            className="min-h-12 bg-oxide px-6 text-small font-bold uppercase tracking-label text-white hover:bg-oxide-deep"
          >
            Enquire about {emptyTab.name.toLowerCase()}
          </button>
        </div>
      )}

      <ul className={`grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 ${limitClasses}`}>
        {shown.map((d, i) => (
          <li key={d.code}>
            <DesignCard design={d} onOpen={() => open(i)} />
          </li>
        ))}
      </ul>

      {!expanded && shown.length > 12 && (
        <div className={`mt-12 flex justify-center border-t border-line pt-8 ${shown.length > 24 ? '' : 'md:hidden'}`}>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="min-h-12 border-2 border-ink px-6 text-small font-bold uppercase tracking-label hover:bg-ink hover:text-chalk"
          >
            Show all {shown.length} designs
          </button>
        </div>
      )}
      {element}
    </div>
  );
}
