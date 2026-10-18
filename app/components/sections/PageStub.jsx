import { Link } from 'react-router';

// PHASE 0 PLACEHOLDER: shows a page's H1 and the section order planned for it (SITE-V4-PLAN.md §3).
// Each route replaces this with its real sections in the phase noted per row.
export function PageStub({ eyebrow, title, lead, crumbs, sections = [], children }) {
  return (
    <div className="container-site py-section">
      {crumbs && (
        <nav aria-label="Breadcrumb" className="caps-label mb-8 text-ink-muted">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.name}>
              <span className="mx-2">/</span>
              {c.to ? (
                <Link to={c.to} className="hover:text-ink">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {eyebrow && <p className="caps-label text-oxide-deep">{eyebrow}</p>}
      <h1 className="mt-4 max-w-4xl text-h1">{title}</h1>
      {lead && <p className="mt-6 max-w-[68ch] text-lead text-ink-muted">{lead}</p>}
      {children}
      {sections.length > 0 && (
        <ol className="mt-14 border-t border-line-strong">
          {sections.map(([name, note, phase], i) => (
            <li key={name} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[4rem_1fr_auto] sm:gap-6">
              <span className="caps-label text-oxide-deep">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span className="font-semibold">{name}</span>
                {note && <span className="block text-small text-ink-muted">{note}</span>}
              </span>
              <span className="caps-label text-ink-muted">{phase}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
