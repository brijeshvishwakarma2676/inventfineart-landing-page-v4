import { useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { X, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Img } from '../ui/Img';
import { useFocusTrap } from '../ui/useFocusTrap';
import { useScrollLock } from '../ui/useScrollLock';
import { lines } from '../../data/lines';
import { applications } from '../../data/applications';
import { nav, site } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

const more = [...nav.filter((n) => !n.mega), { label: 'Clients', to: '/clients' }, { label: 'FAQ', to: '/faq' }];

/** Full-screen white menu below 1024px: products, applications, pages. Get a Quote and Call stay pinned at the bottom. */
export function MobileMenu({ open, onClose }) {
  const ref = useRef(null);
  const { open: openEnquiry } = useEnquiry();
  useFocusTrap(ref, open, onClose);
  useScrollLock(open);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      data-lenis-prevent
      className={`fixed inset-0 z-[60] flex flex-col bg-bg text-ink duration-300 lg:hidden ${
        // visibility animates only on close, so focus can move in as soon as it opens
        open ? 'visible opacity-100 transition-opacity' : 'invisible opacity-0 transition-[opacity,visibility]'
      }`}
    >
      <div className="container-site flex h-(--header-h) shrink-0 items-center justify-between border-b border-line">
        <Link to="/" onClick={onClose} aria-label="Invent Fine Art, home">
          <Logo />
        </Link>
        <button type="button" onClick={onClose} className="-mr-2 p-2.5" aria-label="Close menu">
          <X className="size-6" strokeWidth={2} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto py-6">
        <p className="caps-label mb-2 text-oxide-deep">Products</p>
        <ul className="mb-8 border-t border-line">
          {lines.map((l) => (
            <li key={l.slug}>
              <Link to={`/${l.slug}`} onClick={onClose} className="flex items-center gap-3 border-b border-line py-2.5">
                <span className="block size-11 shrink-0 overflow-hidden bg-surface-2">
                  <Img id={l.banner.image} alt="" sizes="44px" className="size-full object-cover" style={{ objectPosition: l.banner.position }} />
                </span>
                <span className="text-lead font-bold leading-tight">{l.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/products" onClick={onClose} className="block border-b border-line py-3 text-small font-bold text-oxide-deep">
              All products
            </Link>
          </li>
        </ul>
        <p className="caps-label mb-2 text-oxide-deep">Applications</p>
        <ul className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3">
          {applications.map((a) => (
            <li key={a.slug}>
              <Link to={`/products#app-${a.slug}`} onClick={onClose} className="text-small font-bold hover:text-oxide-deep">
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-1">
          {more.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `headline text-[2rem] leading-[1.15] ${isActive ? 'text-oxide-deep' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid shrink-0 grid-cols-2 border-t border-line">
        <button
          type="button"
          onClick={() => {
            onClose();
            openEnquiry();
          }}
          className="min-h-14 bg-oxide px-4 text-small font-bold text-white"
        >
          Get a Quote
        </button>
        <a
          href={`tel:${site.phones[0].tel}`}
          className="inline-flex min-h-14 items-center justify-center gap-2 px-4 text-small font-bold"
        >
          <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
