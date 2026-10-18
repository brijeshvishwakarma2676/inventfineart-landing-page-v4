import { Link, NavLink } from 'react-router';
import { nav } from '../../data/site';

// PHASE 0 PLACEHOLDER. Phase 3 replaces this with v3's Header + MegaMenu + MobileMenu (SITE-V4-PLAN.md §3).
export function Header() {
  return (
    <header className="border-b border-line bg-bg">
      <div className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link to="/" className="font-display text-h3 leading-none text-ink">
          Invent <em>Fine Art</em>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'text-bronze-deep underline underline-offset-4' : 'text-ink')}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="rounded-button bg-bronze px-4 py-2 font-semibold text-white hover:bg-bronze-deep">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
