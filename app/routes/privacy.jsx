import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PlainHeader } from '../components/sections/PageHeader';
import { site } from '../data/site';

// Describes only what this site actually does (keep in sync if analytics or new services are added).
export default function Privacy() {
  const h2 = 'mt-10 text-[2rem] text-ink';
  const mail = (
    <a className="font-semibold text-oxide-deep underline underline-offset-4" href={`mailto:${site.email}`}>
      {site.email}
    </a>
  );
  return (
    <>
      <Seo
        title="Privacy Policy | Invent Fine Art"
        description="How Invent Fine Art handles the information you share through this website."
      />
      <PlainHeader crumbs={[{ name: 'Privacy policy' }]} eyebrow="Legal" title="Privacy policy" />
      <Section className="pt-0">
        <Container>
          <div className="max-w-[68ch] text-ink-muted [&_li]:mt-2 [&_p]:mt-4">
            <p>
              This policy explains what information {site.name} collects through this website and how we use it. If you have a
              question, write to us at {mail}.
            </p>
            <h2 className={h2}>What we collect</h2>
            <p>When you send an enquiry, we receive what you enter in the form:</p>
            <ul className="list-disc pl-5">
              <li>Your name, phone number, and (if you give them) your email address and city.</li>
              <li>Details of your project, and any drawing or image you attach.</li>
            </ul>
            <h2 className={h2}>How we use it</h2>
            <p>
              We use these details only to reply to your enquiry and to prepare a quote. The form is delivered to our inbox by an
              email service provider. We do not sell or share your details for marketing.
            </p>
            <h2 className={h2}>WhatsApp, phone and email</h2>
            <p>
              If you contact us on WhatsApp, by phone or by email, that conversation is handled by those services under their own
              privacy terms.
            </p>
            <h2 className={h2}>Cookies and maps</h2>
            <p>
              This website does not use advertising, analytics or tracking cookies. The map on the contact page is provided by
              Google Maps and loads only when you choose to show it.
            </p>
            <h2 className={h2}>Your choices</h2>
            <p>You can ask us to correct or delete the details you sent us at any time by writing to {mail}.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
