import { useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Img } from '../ui/Img';
import { lines } from '../../data/lines';
import { applications } from '../../data/applications';

/**
 * The header's mega menus, white panels under the bar. `kind="products"`: the five lines with a photo each.
 * `kind="applications"`: the kinds of space, each opening its tile in "Browse by application" on /products.
 */
export function MegaMenu({ kind, open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    // Any press outside a menu trigger + panel closes it (logo, Get a Quote, the page…).
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

  const products = kind === 'products';
  return (
    <div
      id={products ? 'mega-menu' : `${kind}-menu`}
      inert={!open}
      className={`absolute inset-x-0 top-full hidden border-t border-line bg-bg text-ink shadow-menu transition-all duration-300 ease-out-soft lg:block ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      <div className="container-site grid grid-cols-12 gap-8 py-8">
        <div className="col-span-3 flex flex-col justify-between gap-6 border-r border-line pr-8">
          <div className="flex flex-col gap-3">
            <p className="caps-label text-oxide-deep">{products ? 'Our products' : 'Browse by application'}</p>
            <p className="headline text-[1.75rem] leading-tight">{products ? 'Five product lines, made to your design.' : 'Made for your kind of space.'}</p>
          </div>
          <Link
            to={products ? '/products' : '/products#applications'}
            onClick={onClose}
            className="group inline-flex items-center gap-2 text-small font-bold text-oxide-deep hover:text-ink"
          >
            {products ? 'All products' : 'All applications'}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>

        {products ? (
          <ul className="col-span-9 grid grid-cols-5 gap-5">
            {lines.map((l) => (
              <li key={l.slug}>
                <Link to={`/${l.slug}`} onClick={onClose} className="group flex h-full flex-col gap-3">
                  <span className="block aspect-[4/3] overflow-hidden bg-surface-2">
                    <Img
                      id={l.banner.image}
                      alt=""
                      sizes="200px"
                      className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                      style={{ objectPosition: l.banner.position }}
                    />
                  </span>
                  <span className="text-body font-bold leading-tight group-hover:text-oxide-deep">{l.name}</span>
                  <span className="-mt-2 text-small leading-snug text-ink-muted">{l.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="col-span-9 grid grid-cols-3 gap-5">
            {applications.map((a) => (
              <li key={a.slug}>
                <Link to={`/products#app-${a.slug}`} onClick={onClose} className="group flex items-center gap-4">
                  <span className="block size-20 shrink-0 overflow-hidden bg-surface-2">
                    <Img id={a.image} alt="" sizes="80px" className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
                  </span>
                  <span className="text-body font-bold leading-tight group-hover:text-oxide-deep">{a.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
