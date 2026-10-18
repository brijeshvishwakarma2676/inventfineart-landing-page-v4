import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { lines } from '../../data/lines';

/** Products mega menu: a graphite panel ruled into five cells, one per numbered product line. */
export function MegaMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    // Any press outside the Products trigger + panel closes it (logo, Get a Quote, the page…).
    const onClick = (e) => {
      if (!e.target.closest('[data-mega-root]')) onClose();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  return (
    <div
      id="mega-menu"
      inert={!open}
      className={`absolute inset-x-0 top-full hidden border-y border-chalk/10 bg-dark text-chalk transition-all duration-300 ease-out-soft lg:block ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      <div className="container-site grid grid-cols-12">
        <div className="col-span-3 flex flex-col justify-between gap-6 border-r border-chalk/10 py-8 pr-8">
          <div className="flex flex-col gap-3">
            <p className="caps-label text-oxide-bright">Our products</p>
            <p className="condensed text-[2.5rem] leading-[0.95]">Five lines, made to your design.</p>
          </div>
          <Link to="/products" onClick={onClose} className="group inline-flex items-center gap-2 text-small font-bold uppercase tracking-label text-chalk">
            All products
            <ArrowRight className="size-4 text-oxide-bright transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>
        <ul className="col-span-9 grid grid-cols-5 divide-x divide-chalk/10">
          {lines.map((l) => (
            <li key={l.slug}>
              <Link to={`/${l.slug}`} onClick={onClose} className="group flex h-full flex-col gap-4 p-5 transition-colors hover:bg-dark-2">
                <span className="condensed text-[3rem] leading-none text-oxide-bright">{l.num}</span>
                <span className="block aspect-[4/5] overflow-hidden bg-dark-2">
                  <Img
                    id={l.banner.image}
                    alt=""
                    sizes="200px"
                    className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                    style={{ objectPosition: l.banner.position }}
                  />
                </span>
                <span className="condensed text-[1.35rem] leading-tight">{l.name}</span>
                <span className="-mt-2 text-small leading-snug text-chalk-muted">{l.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
