import { useLocation } from 'react-router';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { PlainHeader } from '../components/sections/PageHeader';
import { whatsappLink } from '../data/site';
import { useHydrated } from '../motion/useReducedMotion';

/** After a sent enquiry. The visitor's first name comes from navigation state, read only after hydration (#418). */
export default function ThankYou() {
  const { state } = useLocation();
  const hydrated = useHydrated();
  const name = hydrated && typeof state?.name === 'string' ? state.name.slice(0, 40) : '';
  return (
    <>
      <Seo title="Thank you | Invent Fine Art" description="Your enquiry has been sent." noindex />
      <PlainHeader
        eyebrow="Enquiry sent"
        title={<>Thank you{name ? <>, <em>{name}</em></> : ''}.</>}
        lead="We have received your enquiry and our team will get back to you shortly. If you gave an email address, a copy of the confirmation is on its way."
      />
      <Section className="pt-0">
        <Container className="flex flex-wrap gap-3">
          <Button to="/products" arrow>
            Keep exploring
          </Button>
          <Button variant="secondary" href={whatsappLink('Hello Invent Fine Art, I just sent an enquiry and would like to add photos.')} target="_blank" rel="noopener noreferrer">
            Send photos on WhatsApp
          </Button>
        </Container>
      </Section>
    </>
  );
}
