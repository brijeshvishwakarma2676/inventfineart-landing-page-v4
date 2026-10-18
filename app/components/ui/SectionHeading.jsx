/** Eyebrow: bold capitals with an oxide rule in front. Oxide-deep on light; oxide-bright on graphite. */
export function Eyebrow({ tone = 'light', className = '', children }) {
  const dark = tone === 'dark';
  return (
    <p className={`caps-label inline-flex items-center gap-3 ${dark ? 'text-oxide-bright' : 'text-oxide-deep'} ${className}`}>
      <span aria-hidden="true" className={`h-0.5 w-6 ${dark ? 'bg-oxide-bright' : 'bg-oxide'}`} />
      {children}
    </p>
  );
}

/** Eyebrow + condensed H2 + optional tagline. `align="center"` centres it; `tone="dark"` on graphite. */
export function SectionHeading({ eyebrow, title, tagline, align = 'left', tone = 'light', as: Tag = 'h2', className = '', children }) {
  const center = align === 'center' ? 'mx-auto text-center items-center' : '';
  const dark = tone === 'dark';
  return (
    <div className={`flex max-w-4xl flex-col gap-5 ${center} ${className}`} data-reveal="up">
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag className={`text-h2 ${dark ? 'text-chalk' : 'text-ink'}`}>{title}</Tag>
      {tagline && <p className={`max-w-2xl text-lead font-medium ${dark ? 'text-chalk-muted' : 'text-ink-muted'}`}>{tagline}</p>}
      {children}
    </div>
  );
}
