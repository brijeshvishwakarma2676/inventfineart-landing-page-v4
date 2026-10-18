import { useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { X, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useFocusTrap } from '../ui/useFocusTrap';
import { useScrollLock } from '../ui/useScrollLock';
import { lines } from '../../data/lines';
import { nav, site } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

const more = [...nav.filter((n) => !n.mega), { label: 'FAQ', to: '/faq' }];

/** Full-screen graphite menu below 1024px. Get a Quote and Call stay pinned at the bottom. */
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
      className={`fixed inset-0 z-[60] flex flex-col bg-dark text-chalk duration-300 lg:hidden ${
        // visibility animates only on close, so focus can move in as soon as it opens
        open ? 'visible opacity-100 transition-opacity' : 'invisible opacity-0 transition-[opacity,visibility]'
      }`}
    >
      <div className="container-site flex h-(--header-h) shrink-0 items-center justify-between border-b border-chalk/10">
        <Link to="/" onClick={onClose} aria-label="Invent Fine Art, home">
          <Logo />
        </Link>
        <button type="button" onClick={onClose} className="-mr-2 p-2.5" aria-label="Close menu">
          <X className="size-6" strokeWidth={2} />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto py-6">
        <p className="caps-label mb-2 text-oxide-bright">Products</p>
        <ul className="mb-8 border-t border-chalk/15">
          {lines.map((l) => (
            <li key={l.slug}>
              <Link to={`/${l.slug}`} onClick={onClose} className="flex items-baseline gap-4 border-b border-chalk/15 py-3">
                <span className="condensed w-9 shrink-0 text-[1.6rem] leading-none text-oxide-bright">{l.num}</span>
                <span className="condensed text-[1.6rem] leading-none">{l.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/products" onClick={onClose} className="flex items-baseline gap-4 border-b border-chalk/15 py-3 text-small font-bold uppercase tracking-label text-chalk-muted">
              <span className="w-9 shrink-0" />
              All products
            </Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-1">
          {more.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `condensed text-[2.5rem] leading-[1.05] ${isActive ? 'text-oxide-bright' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid shrink-0 grid-cols-2 border-t border-chalk/10">
        <button
          type="button"
          onClick={() => {
            onClose();
            openEnquiry();
          }}
          className="min-h-14 bg-oxide px-4 text-small font-bold uppercase tracking-label text-white"
        >
          Get a Quote
        </button>
        <a
          href={`tel:${site.phones[0].tel}`}
          className="inline-flex min-h-14 items-center justify-center gap-2 px-4 text-small font-bold uppercase tracking-label"
        >
          <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
