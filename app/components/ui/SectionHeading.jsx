/** The catalogue label voice for eyebrows: wide Archivo caps. Bronze on light, cream-muted on dark (bronze is 3.8:1 there). */
export function Eyebrow({ tone = 'light', className = '', children }) {
  return <p className={`caps-label ${tone === 'dark' ? 'text-cream-muted' : 'text-bronze-deep'} ${className}`}>{children}</p>;
}

/** Eyebrow + H2 + optional italic tagline (Fraunces). `align="center"` centres it; `tone="dark"` for dark bands. */
export function SectionHeading({ eyebrow, title, tagline, align = 'left', tone = 'light', as: Tag = 'h2', className = '', children }) {
  const center = align === 'center' ? 'mx-auto text-center items-center' : '';
  const dark = tone === 'dark';
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${center} ${className}`} data-reveal="up">
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag className={`text-h2 ${dark ? 'text-cream' : ''}`}>{title}</Tag>
      {tagline && <p className={`font-display text-h3 italic ${dark ? 'text-cream-muted' : 'text-ink-muted'}`}>{tagline}</p>}
      {children}
    </div>
  );
}
