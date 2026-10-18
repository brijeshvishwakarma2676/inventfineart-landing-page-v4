import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';

export default function ThankYou() {
  return (
    <>
      <Seo title="Thank you | Invent Fine Art" description="Your enquiry has been sent." noindex />
      <PageStub
        eyebrow="Enquiry sent"
        title="Thank you"
        sections={[['Name and next steps', 'Name read from location.state after hydration', 'Phase 7']]}
      />
    </>
  );
}
