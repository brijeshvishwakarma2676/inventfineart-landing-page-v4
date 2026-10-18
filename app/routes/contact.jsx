import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PlainHeader } from '../components/sections/PageHeader';
import { EnquiryForm } from '../enquiry/EnquiryForm';
import { site, whatsappLink } from '../data/site';
import { lineBySlug } from '../data/lines';
import { designByCode } from '../data/designs';
import { breadcrumbs } from '../data/seo';
import { useHydrated } from '../motion/useReducedMotion';

// The page has its own form, so the footer skips its CTA band.
export const handle = { inlineEnquiry: true };

const mapEmbed = (p) => `https://www.google.com/maps?q=${p.geo.lat},${p.geo.lng}&z=15&output=embed`;

/** Google Maps loads only when the visitor asks for it (no third-party request or cookie before that). */
function MapOnClick() {
  const [place, setPlace] = useState(null);
  const places = [site.office, site.factory];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {places.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setPlace(p)}
            aria-pressed={place === p}
            className={`min-h-11 border-2 px-4 text-small font-bold uppercase tracking-label ${place === p ? 'border-oxide bg-oxide text-white' : 'border-ink hover:bg-ink hover:text-chalk'}`}
          >
            Show {p.label.toLowerCase().replace(' address', '')} on the map
          </button>
        ))}
      </div>
      <div className="aspect-[16/10] border-2 border-line-strong bg-surface-2">
        {place ? (
          <iframe title={`Map: ${place.label}`} src={mapEmbed(place)} className="size-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <p className="grid size-full place-items-center p-6 text-center text-small text-ink-muted">The map is provided by Google Maps and loads only when you choose to show it.</p>
        )}
      </div>
    </div>
  );
}

/**
 * Contact (SITE-V4-PLAN.md §3.3): the form (pre-filled from ?service=<line>&code=<design>, read after hydration),
 * 3 phones, 2 emails, WhatsApp, both addresses with directions, and a map that loads on click.
 */
export default function Contact() {
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  const service = hydrated ? params.get('service') : null;
  const code = hydrated ? params.get('code')?.toUpperCase() : null;
  const design = code ? designByCode[code] : null;
  const prefill = design
    ? { category: design.line, code: design.code, title: design.title }
    : service && lineBySlug[service]
      ? { category: service }
      : {};

  const direct = [
    ...site.phones.map((p) => ({ icon: Phone, label: p.label, href: `tel:${p.tel}` })),
    { icon: MessageCircle, label: 'WhatsApp', href: whatsappLink('Hello Invent Fine Art, I have an enquiry.'), external: true },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: Mail, label: site.emailAlt, href: `mailto:${site.emailAlt}` },
  ];

  return (
    <>
      <Seo
        title="Contact & Get a Quote | Invent Fine Art"
        description="Send an enquiry, call or WhatsApp Invent Fine Art. Office in Kandivali East, Mumbai; factory in Nalasopara West."
        jsonLd={breadcrumbs([{ name: 'Contact', path: '/contact' }])}
      />
      <PlainHeader
        crumbs={[{ name: 'Contact' }]}
        eyebrow="Get a quote"
        title={<>Tell us about <em>your space</em></>}
        lead="Share your concept, a drawing or a reference photo, with the size and location. We will suggest the right design, material and finish."
      />

      <Section className="pt-0">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="border-t-4 border-oxide bg-paper p-6 md:p-10 lg:col-span-7">
            {/* Remount once the URL pre-fill is known (after hydration) */}
            <EnquiryForm key={`${prefill.category ?? ''}-${prefill.code ?? ''}`} prefill={prefill} layout="grid" />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <p className="caps-label mb-3">Call, write or WhatsApp</p>
              <ul className="border-t-2 border-line-strong">
                {direct.map(({ icon: Icon, label, href, external }) => (
                  <li key={href} className="border-b border-line">
                    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-3 py-3 font-bold break-all hover:text-oxide-deep">
                      <Icon className="size-5 shrink-0 text-oxide" strokeWidth={2.25} aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {[site.office, site.factory].map((a) => (
              <address key={a.label} className="flex flex-col gap-2 border-t-2 border-line-strong pt-4 not-italic">
                <p className="caps-label text-oxide-deep">{a.label}</p>
                <p className="font-bold">
                  {a.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start text-small font-bold uppercase tracking-label text-oxide-deep hover:text-ink">
                  <MapPin className="size-4" strokeWidth={2.25} aria-hidden="true" />
                  Directions
                </a>
              </address>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <MapOnClick />
        </Container>
      </Section>
    </>
  );
}
