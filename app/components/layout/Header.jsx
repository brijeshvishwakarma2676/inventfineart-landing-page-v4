import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ChevronDown, Mail, Menu, MessageCircle, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { nav, site, whatsappLink } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * The header (SITE-V4-PLAN.md §2–3): from 1024px a dark contact bar (phones, email, WhatsApp), then the white bar:
 * logo · Products ▾ · Applications ▾ · Projects · About · Contact · [Get a Quote]. It hides while scrolling down
 * and comes back on scroll up.
 */
export function Header() {
  const { open: openEnquiry } = useEnquiry();
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(null); // which mega menu is open: 'products' | 'applications' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const hoverTimer = useRef(null);
  const lastPointer = useRef('');
  const roots = useRef({});
  const triggers = useRef({});

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > 480 && y > lastY.current + 2;
      setHidden(hide);
      if (hide) setMenu(null);
      if (y < lastY.current - 2 || y <= 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shown = hidden ? null : menu;

  // Mega menus. Each trigger and its panel share one wrapper (the panel is its DOM child), so moving the pointer
  // from the button down into the panel never counts as leaving. Hover only for a real mouse; touch and keyboard
  // use the click toggle.
  const onEnter = (key) => (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMenu(key), 80);
  };
  const onLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMenu(null), 180);
  };
  const onClick = (key) => () => {
    clearTimeout(hoverTimer.current);
    // A mouse click while hovering keeps it open (hover already opened it); touch/keyboard toggle.
    // Read the ref now: the state updater runs later, after it has been reset.
    const byMouse = lastPointer.current === 'mouse';
    lastPointer.current = '';
    setMenu((m) => (byMouse || m !== key ? key : null));
  };
  const onBlur = (key) => (e) => {
    if (!roots.current[key]?.contains(e.relatedTarget)) setMenu((m) => (m === key ? null : m));
  };
  const closeMenu = () => {
    clearTimeout(hoverTimer.current);
    const key = menu;
    if (key && roots.current[key]?.contains(document.activeElement)) triggers.current[key]?.focus();
    setMenu(null);
  };

  const link = 'relative px-3 py-2 text-small font-bold xl:px-4';
  const underline =
    'after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:bg-oxide after:transition-transform after:duration-300 hover:after:scale-x-100 xl:after:inset-x-4';
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-(--header-h) flex-col bg-bg text-ink shadow-[0_1px_0_var(--color-line)] transition-transform duration-500 ease-out-soft ${
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Contact bar, from 1024px */}
        <div className="hidden h-9 shrink-0 bg-dark text-chalk-muted lg:block">
          <div className="container-site flex h-full items-center justify-between gap-6 text-micro">
            <ul className="flex items-center gap-5">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="inline-flex items-center gap-1.5 hover:text-chalk">
                    <Phone className="size-3.5" strokeWidth={2} aria-hidden="true" />
                    {p.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-chalk">
                  <Mail className="size-3.5" strokeWidth={2} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
            <a
              href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-chalk"
            >
              <MessageCircle className="size-3.5" strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="container-site flex min-h-0 flex-1 items-stretch justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Invent Fine Art, home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-stretch lg:flex">
            {nav.map((item) =>
              item.mega ? (
                // Full bar height, and not positioned: the panel anchors to the whole header.
                <div
                  key={item.to}
                  ref={(el) => (roots.current[item.mega] = el)}
                  data-mega-root
                  className="flex items-center"
                  onPointerEnter={onEnter(item.mega)}
                  onPointerLeave={onLeave}
                  onBlur={onBlur(item.mega)}
                >
                  <button
                    ref={(el) => (triggers.current[item.mega] = el)}
                    type="button"
                    aria-expanded={shown === item.mega}
                    aria-controls={item.mega === 'products' ? 'mega-menu' : `${item.mega}-menu`}
                    onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                    onClick={onClick(item.mega)}
                    className={`${link} inline-flex items-center gap-1.5 ${shown === item.mega ? 'text-oxide-deep' : 'hover:text-oxide-deep'}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${shown === item.mega ? 'rotate-180' : ''}`}
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </button>
                  <MegaMenu kind={item.mega} open={shown === item.mega} onClose={closeMenu} />
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `${link} ${underline} flex items-center ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'}`}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="hidden min-h-11 items-center bg-oxide px-5 text-small font-bold text-white transition-colors duration-300 hover:bg-oxide-deep sm:inline-flex"
            >
              Get a Quote
            </button>
            <a href={`tel:${site.phones[0].tel}`} className="inline-flex size-11 items-center justify-center sm:hidden" aria-label={`Call ${site.phones[0].label}`}>
              <Phone className="size-5" strokeWidth={2} />
            </a>
            <button
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
