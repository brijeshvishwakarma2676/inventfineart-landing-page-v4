import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { nav, site } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

/**
 * The graphite header bar (SITE-V4-PLAN.md §2–3): logo · Products ▾ · Projects · About · Clients · Contact ·
 * phone · [GET A QUOTE] as an oxide block the full height of the bar. Always solid (no photo runs under it);
 * it hides while scrolling down and comes back on scroll up.
 */
export function Header() {
  const { open: openEnquiry } = useEnquiry();
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const hoverTimer = useRef(null);
  const lastPointer = useRef('');
  const megaRoot = useRef(null);
  const megaTrigger = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > 480 && y > lastY.current + 2;
      setHidden(hide);
      if (hide) setMegaOpen(false);
      if (y < lastY.current - 2 || y <= 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const megaVisible = megaOpen && !hidden;

  // Products menu. Trigger and panel share one wrapper (the panel is its DOM child), so moving the
  // pointer from the button down into the panel never counts as leaving. Hover only for a real mouse;
  // touch and keyboard use the click toggle.
  const onMegaEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(true), 80);
  };
  const onMegaLeave = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };
  const onMegaClick = () => {
    clearTimeout(hoverTimer.current);
    // A mouse click while hovering keeps it open (hover already opened it); touch/keyboard toggle.
    // Read the ref now: the state updater runs later, after it has been reset.
    const byMouse = lastPointer.current === 'mouse';
    lastPointer.current = '';
    setMegaOpen((o) => (byMouse ? true : !o));
  };
  const onMegaBlur = (e) => {
    if (!megaRoot.current?.contains(e.relatedTarget)) setMegaOpen(false);
  };
  const closeMega = () => {
    clearTimeout(hoverTimer.current);
    if (megaRoot.current?.contains(document.activeElement)) megaTrigger.current?.focus();
    setMegaOpen(false);
  };

  const link = 'relative px-3 py-2 text-small font-bold uppercase tracking-label xl:px-4';
  const underline =
    'after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-oxide-bright after:transition-transform after:duration-300 hover:after:scale-x-100 xl:after:inset-x-4';
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-chalk/10 bg-dark text-chalk transition-transform duration-500 ease-out-soft ${
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container-site flex h-full items-stretch justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Invent Fine Art, home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-stretch lg:flex">
            {nav.map((item) =>
              item.mega ? (
                // Full bar height, and not positioned: the panel anchors to the whole header bar.
                <div
                  key={item.to}
                  ref={megaRoot}
                  data-mega-root
                  className="flex items-center"
                  onPointerEnter={onMegaEnter}
                  onPointerLeave={onMegaLeave}
                  onBlur={onMegaBlur}
                >
                  <button
                    ref={megaTrigger}
                    type="button"
                    aria-expanded={megaVisible}
                    aria-controls="mega-menu"
                    onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                    onClick={onMegaClick}
                    className={`${link} inline-flex items-center gap-1.5 ${megaVisible ? 'text-oxide-bright' : ''}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 transition-transform duration-300 ${megaVisible ? 'rotate-180' : ''}`}
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </button>
                  <MegaMenu open={megaVisible} onClose={closeMega} />
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

          <div className="flex items-stretch">
            <a
              href={`tel:${site.phones[0].tel}`}
              className="hidden items-center gap-2 px-5 text-small font-bold tracking-label text-chalk-muted hover:text-chalk xl:inline-flex"
            >
              <Phone className="size-4" strokeWidth={2} aria-hidden="true" />
              {site.phones[0].label}
            </a>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="hidden items-center bg-oxide px-6 text-small font-bold uppercase tracking-label text-white transition-colors duration-300 hover:bg-oxide-deep sm:inline-flex"
            >
              Get a Quote
            </button>
            <a href={`tel:${site.phones[0].tel}`} className="inline-flex items-center px-2.5 sm:hidden" aria-label={`Call ${site.phones[0].label}`}>
              <Phone className="size-5" strokeWidth={2} />
            </a>
            <button
              type="button"
              className="-mr-2 inline-flex items-center px-2.5 lg:hidden"
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
