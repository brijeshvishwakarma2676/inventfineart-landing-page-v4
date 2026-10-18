import { Seo } from '../components/ui/Seo';
import { PageStub } from '../components/sections/PageStub';
import { breadcrumbs } from '../data/seo';

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQ | Invent Fine Art"
        description="Answers about Invent Fine Art's products, custom designs, enquiries and quotes."
        jsonLd={breadcrumbs([{ name: 'FAQ', path: '/faq' }])}
      />
      <PageStub
        crumbs={[{ name: 'FAQ' }]}
        eyebrow="FAQ"
        title="Questions, answered"
        sections={[
          ['Header', '', 'Phase 7'],
          ['Three groups', 'The studio · Products · Enquiries, FAQPage JSON-LD', 'Phase 7'],
        ]}
      />
    </>
  );
}
