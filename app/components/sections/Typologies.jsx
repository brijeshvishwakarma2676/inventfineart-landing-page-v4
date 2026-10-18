import { Img } from '../ui/Img';

/** Typology tiles of a product line (SITE-V4-PLAN.md §3.2-3): the brief's own words, one real photo each. */
export function Typologies({ items }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[items.length] ?? 'sm:grid-cols-3';
  return (
    <ul className={`grid gap-x-6 gap-y-10 ${cols}`} data-reveal="stagger">
      {items.map((t, i) => (
        <li key={t.name} className="flex flex-col gap-3">
          <div className="aspect-[4/3] overflow-hidden bg-surface-2">
            <Img id={t.image} alt={t.name} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="size-full object-cover" />
          </div>
          <div className="flex items-baseline gap-3 border-t-2 border-line-strong pt-3">
            <span className="caps-label text-oxide-deep">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="condensed text-[1.6rem] leading-none">{t.name}</h3>
          </div>
          <p className="text-small text-ink-muted">{t.text}</p>
        </li>
      ))}
    </ul>
  );
}
