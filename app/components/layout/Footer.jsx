import { Link, useMatches } from 'react-router';
import { ShieldCheck } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { lines } from '../../data/lines';
import { site, whatsappLink } from '../../data/site';
import { useEnquiry } from '../../enquiry/EnquiryContext';

const YEAR = new Date().getFullYear();

const company = [
  { label: 'All products', to: '/products' },
  { label: 'Projects', to: '/projects' },
  { label: 'About us', to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

function Col({ title, className = '', children }) {
  return (
    <div className={`flex flex-col gap-4 border-t border-chalk/10 py-10 first:border-t-0 lg:border-t-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 ${className}`}>
      {title && <p className="caps-label text-oxide-bright">{title}</p>}
      {children}
    </div>
  );
}

/**
 * Footer: the oxide CTA band (the old site's own line), then a ruled graphite grid of links, contact and both
 * addresses. Routes that already end in the inline enquiry form export handle { inlineEnquiry: true } and skip the band.
 */
export function Footer() {
  const { open } = useEnquiry();
  const hasInlineForm = useMatches().some((m) => m.handle?.inlineEnquiry);
  return (
    <footer>
      {!hasInlineForm && (
        <div className="bg-oxide text-white">
          <div className="container-site flex flex-col items-start justify-between gap-10 py-section lg:flex-row lg:items-end" data-reveal="up">
            <h2 className="max-w-4xl text-h1 text-white">We can turn your ideas and imagination into reality.</h2>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button variant="dark" onClick={() => open()} arrow>
                Get a Quote
              </Button>
              <Button variant="onOxide" href={whatsappLink('Hello Invent Fine Art, I have an enquiry.')} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-dark text-small text-chalk-muted">
        <div className="container-site grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
          <Col className="sm:col-span-2 lg:col-span-4">
            <Logo className="text-chalk" />
            <p className="max-w-xs text-lead font-medium text-chalk">{site.tagline}</p>
            <p className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4" strokeWidth={2} aria-hidden="true" />
              {site.certification}
            </p>
          </Col>
          <Col title="Products" className="lg:col-span-3">
            <ul className="flex flex-col gap-2.5">
              {lines.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`} className="group inline-flex items-baseline gap-3 text-chalk">
                    <span className="caps-label text-oxide-bright">{l.num}</span>
                    <span className="group-hover:underline">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col title="Company" className="lg:col-span-2">
            <ul className="flex flex-col gap-2.5">
              {company.map((c) => (
                <li key={c.to}>
                  <Link to={c.to} className="text-chalk hover:underline">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col title="Get in touch" className="sm:col-span-2 lg:col-span-3">
            <div className="flex flex-col gap-2.5 text-chalk">
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="hover:underline">
                  {p.label}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className="break-all hover:underline">
                {site.email}
              </a>
              <a href={`mailto:${site.emailAlt}`} className="break-all hover:underline">
                {site.emailAlt}
              </a>
            </div>
            {[site.office, site.factory].map((a) => (
              <address key={a.label} className="not-italic">
                <span className="block font-bold text-chalk">{a.label}</span>
                {a.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            ))}
          </Col>
        </div>
        <div className="border-t border-chalk/10">
          <div className="container-site flex flex-col gap-2 py-5 text-micro sm:flex-row sm:justify-between">
            <p>
              © {YEAR} {site.name} · {site.credit.label}{' '}
              <a href={site.credit.url} target="_blank" rel="noopener" className="text-chalk hover:underline">
                {site.credit.name}
              </a>
            </p>
            <Link to="/privacy" className="hover:text-chalk">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
