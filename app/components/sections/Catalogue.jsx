import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { DesignCard } from './DesignCard';
import { useLightbox } from '../ui/useLightbox';
import { useHydrated } from '../../motion/useReducedMotion';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * The design catalogue of one product line (SITE-V4-PLAN.md §3.2-4).
 * - 2 columns on phones, 3 on tablets, 4 on desktop. The first 12 (phone) / 24 (wider) show, then "Show all":
 *   the extra cards are hidden with CSS, so the prerendered HTML and the first render match.
 * - `groups` (optional, ≥ 12 designs) adds filter tabs.
 * - ?design=IFA-SC-012 opens that design in the lightbox, read only after hydration (React #418).
 */
export function Catalogue({ designs, groups }) {
  const [group, setGroup] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  const { open: enquire } = useEnquiry();

  const shown = useMemo(() => (group === 'all' ? designs : designs.filter((d) => d.group === group)), [designs, group]);
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

  const tabs = groups ? [{ slug: 'all', name: 'All', count: designs.length }, ...groups.map((g) => ({ ...g, count: designs.filter((d) => d.group === g.slug).length }))] : [];
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
