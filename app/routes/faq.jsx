import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { PlainHeader } from '../components/sections/PageHeader';
import { FaqList } from '../components/sections/FaqList';
import { faqGroups, faqJsonLd } from '../data/faqs';
import { breadcrumbs } from '../data/seo';

/** FAQ (SITE-V4-PLAN.md §3.3): three groups, each title sticky beside its questions, plus FAQPage JSON-LD. */
export default function Faq() {
  return (
    <>
      <Seo
        title="FAQ | Invent Fine Art"
        description="Answers about Invent Fine Art's products, custom designs, enquiries and quotes."
        jsonLd={[breadcrumbs([{ name: 'FAQ', path: '/faq' }]), faqJsonLd(faqGroups.flatMap((g) => g.items))]}
      />
      <PlainHeader crumbs={[{ name: 'FAQ' }]} eyebrow="FAQ" title={<>Questions, <em>answered</em></>} />
      <Section className="pt-0">
        <Container className="flex flex-col gap-16">
          {faqGroups.map((g, i) => (
            <section key={g.slug} aria-labelledby={`faq-${g.slug}`} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <div className="flex items-baseline gap-4 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                  <span className="headline text-[3rem] leading-none text-oxide">{String(i + 1).padStart(2, '0')}</span>
                  <h2 id={`faq-${g.slug}`} className="text-[clamp(1.9rem,1.5rem+1.2vw,2.75rem)] leading-none">
                    {g.name}
                  </h2>
                </div>
              </div>
              <FaqList items={g.items} className="lg:col-span-8" />
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
