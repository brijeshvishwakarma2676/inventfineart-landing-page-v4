import { Link } from 'react-router';
import { site } from '../../data/site';
import { lines } from '../../data/lines';

const company = [
  { label: 'All products', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

// PHASE 0 PLACEHOLDER layout with the final facts (SITE-V4-PLAN.md §4.2). Phase 3 adds the CTA band and styling.
export function Footer() {
  const col = 'flex flex-col gap-2 text-small';
  return (
    <footer className="bg-dark text-cream">
      <div className="container-site grid gap-10 py-section md:grid-cols-2 lg:grid-cols-4">
        <div className={col}>
          <p className="font-display text-h3">
            Invent <em>Fine Art</em>
          </p>
          <p className="text-cream-muted">{site.tagline}</p>
          <p className="text-cream-muted">{site.certification}</p>
        </div>
        <div className={col}>
          <p className="caps-label text-cream-muted">Products</p>
          {lines.map((l) => (
            <Link key={l.slug} to={`/${l.slug}`} className="hover:underline">
              <span className="caps-label mr-2 text-cream-muted">{l.num}</span>
              {l.name}
            </Link>
          ))}
        </div>
        <div className={col}>
          <p className="caps-label text-cream-muted">Company</p>
          {company.map((c) => (
            <Link key={c.to} to={c.to} className="hover:underline">
              {c.label}
            </Link>
          ))}
        </div>
        <div className={col}>
          <p className="caps-label text-cream-muted">Get in touch</p>
          {site.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="hover:underline">
              {p.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
          <a href={`mailto:${site.emailAlt}`} className="hover:underline">
            {site.emailAlt}
          </a>
          {[site.office, site.factory].map((a) => (
            <address key={a.label} className="mt-3 not-italic text-cream-muted">
              <span className="text-cream">{a.label}</span>
              {a.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ))}
        </div>
      </div>
      <div className="container-site flex flex-wrap justify-between gap-4 border-t border-dark-2 py-6 text-small text-cream-muted">
        <p>
          © {site.name} · {site.credit.label}{' '}
          <a href={site.credit.url} target="_blank" rel="noopener" className="text-cream hover:underline">
            {site.credit.name}
          </a>
        </p>
        <Link to="/privacy" className="hover:underline">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
