/**
 * Spec tag: the caption under every product photo (SITE-V4-PLAN.md §2.5).
 *   ━━━━━━━━━━━━━━━  black rule
 *   IFA-SC-012       ← code, bold capitals in oxide (also the enquiry reference)
 *   Seated Buddha    ← title
 *   Gold finish      ← optional detail
 * `as` sets the title's element (h3 in grids). `tone="dark"` on graphite.
 */
export function Plate({ code, title, detail, as: Title = 'p', tone = 'light', className = '', children }) {
  const dark = tone === 'dark';
  return (
    <div className={`flex flex-col gap-1 border-t-2 pt-3 ${dark ? 'border-chalk' : 'border-line-strong'} ${className}`}>
      {code && <p className={`caps-label ${dark ? 'text-oxide-bright' : 'text-oxide-deep'}`}>{code}</p>}
      <Title className={`text-body font-bold leading-snug ${dark ? 'text-chalk' : 'text-ink'}`}>{title}</Title>
      {detail && <p className={`text-small ${dark ? 'text-chalk-muted' : 'text-ink-muted'}`}>{detail}</p>}
      {children}
    </div>
  );
}
