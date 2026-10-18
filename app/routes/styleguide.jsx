import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';

export default function Styleguide() {
  return (
    <>
      <Seo title="Style guide | Invent Fine Art" description="Design tokens and components." noindex />
      <PageStub
        eyebrow="Internal"
        title="Style guide"
        sections={[['Tokens, type, buttons, plates, motion', '', 'Phase 1']]}
      />
    </>
  );
}
