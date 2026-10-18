import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { breadcrumbs } from '../data/seo';
import { site } from '../data/site';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Get a Quote | Invent Fine Art"
        description="Send an enquiry, call or WhatsApp Invent Fine Art. Office in Kandivali East, Mumbai; factory in Nalasopara West."
        jsonLd={breadcrumbs([{ name: 'Contact', path: '/contact' }])}
      />
      <PageStub
        crumbs={[{ name: 'Contact' }]}
        eyebrow="Get a quote"
        title="Tell us about your space"
        sections={[
          ['Header', '', 'Phase 7'],
          ['Inline form + direct lines', 'Pre-filled from ?service= / ?code=; 3 phones, 2 emails, WhatsApp', 'Phase 7'],
          ['Addresses', 'Office and factory with directions', 'Phase 7'],
          ['Map', 'Loads on click', 'Phase 7'],
        ]}
      >
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {[site.office, site.factory].map((a) => (
            <address key={a.label} className="not-italic">
              <span className="caps-label text-oxide-deep">{a.label}</span>
              {a.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          ))}
        </div>
      </PageStub>
    </>
  );
}
