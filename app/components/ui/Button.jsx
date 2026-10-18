import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

// Square, heavy, capitals: the industrial button. Labels stay short ("Get a Quote", "Explore").
const base =
  'group/btn inline-flex items-center justify-center gap-3 rounded-button text-small font-bold uppercase tracking-label transition-colors duration-300 ease-out-soft disabled:opacity-60';

const variants = {
  primary: 'min-h-12 px-6 bg-oxide text-white hover:bg-oxide-deep',
  secondary: 'min-h-12 px-6 border-2 border-ink text-ink hover:bg-ink hover:text-chalk',
  dark: 'min-h-12 px-6 bg-dark text-chalk hover:bg-dark-2',
  onDark: 'min-h-12 px-6 border-2 border-chalk text-chalk hover:bg-chalk hover:text-ink',
  onOxide: 'min-h-12 px-6 border-2 border-white text-white hover:bg-white hover:text-ink',
  text: 'py-1 text-oxide-deep underline decoration-2 underline-offset-[6px] hover:text-ink',
  textOnDark: 'py-1 text-chalk underline decoration-2 underline-offset-[6px] decoration-oxide-bright hover:text-oxide-bright',
};

/** Button or link styled as a button. Pass `to` for internal links, `href` for external, neither for <button>. */
export function Button({ to, href, variant = 'primary', arrow = false, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-soft group-hover/btn:translate-x-1"
          strokeWidth={2.25}
        />
      )}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
