// Section tones: concrete (bg), cement (surface), paper (lightest) and graphite (dark).
const tones = {
  bg: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  paper: 'bg-paper text-ink',
  dark: 'bg-dark text-chalk',
};

export function Section({ tone = 'bg', className = '', children, ...rest }) {
  return (
    <section className={`${tones[tone]} py-section ${className}`} {...rest}>
      {children}
    </section>
  );
}

/** Page-width container. `frame` draws the visible vertical grid lines at its edges from 1024px up. */
export function Container({ frame = false, dark = false, className = '', children, ...rest }) {
  const lines = frame ? (dark ? 'lg:border-x lg:border-chalk/15' : 'lg:border-x lg:border-line') : '';
  return (
    <div className={`container-site ${lines} ${className}`} {...rest}>
      {children}
    </div>
  );
}
