const tones = {
  bg: 'bg-bg text-ink',
  surface: 'bg-surface text-ink',
  dark: 'bg-dark text-cream',
};

export function Section({ tone = 'bg', className = '', children, ...rest }) {
  return (
    <section className={`${tones[tone]} py-section ${className}`} {...rest}>
      {children}
    </section>
  );
}

export function Container({ className = '', children, ...rest }) {
  return (
    <div className={`container-site ${className}`} {...rest}>
      {children}
    </div>
  );
}
