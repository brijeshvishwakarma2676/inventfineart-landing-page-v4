import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { dots } from '../components/ui/format';
import { PlainHeader } from '../components/sections/PageHeader';
import { lines, lineBySlug } from '../data/lines';
import { applications } from '../data/applications';
import { breadcrumbs } from '../data/seo';
import { useEnquiry } from '../enquiry/EnquiryContext';

/**
 * Products hub (SITE-V4-PLAN.md §3.3): a sticky 01–04 index beside one block per service, then browse by
 * application (each space links only to the lines whose brief names it).
 */
export default function Products() {
  const { open } = useEnquiry();
  return (
    <>
      <Seo
        title="Products: Sculptures, Planters, Murals, FRP & GRC | Invent Fine Art"
        description="Four services by Invent Fine Art: sculptures, planters and pots, murals and wall features, and customised designer products in FRP and GRC, each made to your design."
        jsonLd={breadcrumbs([{ name: 'Products', path: '/products' }])}
      />
      <PlainHeader
        crumbs={[{ name: 'Products' }]}
        eyebrow="Four services"
        title={<>Our <em>products</em></>}
        lead="Sculptures, planters and pots, murals and wall features, and customised designer products in FRP and GRC, each made as per your design and requirement."
      />

      <Section className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-12">
          {/* Sticky index (desktop) */}
          <nav aria-label="Services" className="hidden lg:col-span-3 lg:block">
            <ol className="sticky top-[calc(var(--header-h)+2rem)] border-t-2 border-line-strong">
              {lines.map((l) => (
                <li key={l.slug} className="border-b border-line">
                  <a href={`#${l.slug}`} className="group flex items-baseline gap-3 py-3 hover:text-oxide-deep">
                    <span className="condensed text-[1.6rem] leading-none text-oxide">{l.num}</span>
                    <span className="text-small font-bold uppercase tracking-label">{l.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-16 lg:col-span-9">
            {lines.map((l) => (
              <article key={l.slug} id={l.slug} className="grid scroll-mt-(--header-h) gap-6 border-t-2 border-line-strong pt-6 md:grid-cols-2 md:gap-8" data-reveal="up">
                <Link to={`/${l.slug}`} className="group block aspect-[4/3] overflow-hidden bg-surface-2" tabIndex={-1} aria-hidden="true">
                  <Img id={l.banner.image} alt="" sizes="(min-width: 1024px) 36vw, (min-width: 768px) 50vw, 100vw" className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" style={{ objectPosition: l.banner.position }} />
                </Link>
                <div className="flex flex-col gap-4">
                  <span className="condensed text-number text-oxide">{l.num}</span>
                  <h2 className="text-[clamp(2rem,1.5rem+1.6vw,3rem)] leading-[0.92]">
                    <Link to={`/${l.slug}`} className="hover:text-oxide-deep">
                      {l.name}
                    </Link>
                  </h2>
                  <p className="font-medium text-ink-muted">{l.tagline}</p>
                  <p className="text-ink-muted">{l.intro[0]}</p>
                  <p className="text-small">
                    <span className="caps-label mr-2">Suitable for</span>
                    <span className="text-ink-muted">{dots(l.suitableFor)}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <Button to={`/${l.slug}`} arrow>
                      Explore
                    </Button>
                    <Button variant="secondary" onClick={() => open({ category: l.slug })}>
                      Enquire
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Browse by application */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Browse by application" title={<>Made for <em>your kind of space</em></>} className="mb-12" />
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {applications.map((a) => (
              <li key={a.slug} className="flex flex-col gap-3">
                <div className="aspect-[4/3] overflow-hidden bg-surface-2">
                  <Img id={a.image} alt={a.name} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="size-full object-cover" />
                </div>
                <h3 className="condensed border-t-2 border-line-strong pt-3 text-[1.6rem] leading-none">{a.name}</h3>
                <ul className="flex flex-col">
                  {a.lines.map((slug) => (
                    <li key={slug}>
                      <Link to={`/${slug}`} className="group flex items-center justify-between gap-3 border-b border-line py-2 text-small font-bold hover:text-oxide-deep">
                        <span>
                          <span className="caps-label mr-2 text-oxide-deep">{lineBySlug[slug].num}</span>
                          {lineBySlug[slug].name}
                        </span>
                        <ArrowRight className="size-4 text-oxide transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
