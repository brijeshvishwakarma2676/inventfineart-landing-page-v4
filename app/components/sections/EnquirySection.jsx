import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { EnquiryForm } from '../../enquiry/EnquiryForm';
import { site, whatsappLink } from '../../data/site';

const WHATSAPP_LABEL = `+${site.whatsapp.slice(0, 2)} ${site.whatsapp.slice(2, 7)} ${site.whatsapp.slice(7)}`;

/**
 * The inline enquiry section (SITE-V4-PLAN.md §3.1-9, §3.2-9): the pitch and direct lines on the left, the form
 * on a paper panel on the right. Routes that end with it export handle { inlineEnquiry: true } so the footer
 * skips its CTA band. `prefill` as for the panel: { category, code, title }.
 */
export function EnquirySection({ prefill = {}, title, id = 'enquiry', tone = 'surface' }) {
  const lines = [
    { icon: MessageCircle, label: `WhatsApp ${WHATSAPP_LABEL}`, href: whatsappLink('Hello Invent Fine Art, I have an enquiry.'), external: true },
    { icon: Phone, label: `Call ${site.phones[0].label}`, href: `tel:${site.phones[0].tel}` },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <Section id={id} tone={tone}>
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            eyebrow="Get a quote"
            title={title ?? <>Tell us about <em>your space</em></>}
            tagline="Share your concept, a drawing or a reference photo, with the size and location. We will suggest the right design, material and finish."
          />
          <ul className="border-t-2 border-line-strong">
            {lines.map(({ icon: Icon, label, href, external }) => (
              <li key={href} className="border-b border-line">
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-3 py-4 font-bold break-all hover:text-oxide-deep"
                >
                  <Icon className="size-5 shrink-0 text-oxide" strokeWidth={2.25} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t-4 border-oxide bg-paper p-6 md:p-10 lg:col-span-7">
          <EnquiryForm prefill={prefill} layout="grid" />
        </div>
      </Container>
    </Section>
  );
}
