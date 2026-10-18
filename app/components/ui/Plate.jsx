/**
 * Catalogue plate: the museum-style caption under every product photo (SITE-V4-PLAN.md §2.5).
 *   ───────────────
 *   IFA-SC-012          ← code, wide caps (also the enquiry reference)
 *   Seated Buddha       ← title, Fraunces
 *   Gold finish         ← optional detail
 * `as` sets the title's element (h3 in grids). `tone="dark"` on dark bands and photos.
 */
export function Plate({ code, title, detail, as: Title = 'p', tone = 'light', className = '', children }) {
  const dark = tone === 'dark';
  return (
    <div className={`flex flex-col gap-1.5 border-t pt-3 ${dark ? 'border-cream/25' : 'border-line-strong'} ${className}`}>
      {code && <p className={`caps-label ${dark ? 'text-cream-muted' : 'text-bronze-deep'}`}>{code}</p>}
      <Title className={`font-display text-lead leading-snug ${dark ? 'text-cream' : 'text-ink'}`}>{title}</Title>
      {detail && <p className={`text-small ${dark ? 'text-cream-muted' : 'text-ink-muted'}`}>{detail}</p>}
      {children}
    </div>
  );
}
