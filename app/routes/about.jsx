import { Link } from 'react-router';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Section, Container } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SplitHeader } from '../components/sections/PageHeader';
import { Process } from '../components/sections/Process';
import { ClientMarquee } from '../components/sections/ClientMarquee';
import { about, facility } from '../data/content';
import { lines } from '../data/lines';
import { site } from '../data/site';
import { breadcrumbs } from '../data/seo';

const SUBNAV = [
  ['story', 'Story'],
  ['make', 'What we make'],
  ['process', 'Process'],
  ['facility', 'Facility'],
  ['visit', 'Visit'],
];

/**
 * About (SITE-V4-PLAN.md §3.3): the old About page, tidied but with the same facts. A sticky sub-nav sits right
 * under the header (it reads --header-h, so v2's 36px gap can't happen).
 */
export default function About() {
  const stats = [
    { value: `Since ${site.foundedYear}`, label: 'Established' },
    { value: 'ISO 9001', label: 'Certified' },
    ...site.stats.slice(1).map((s) => ({ value: `${s.value}${s.suffix}`, label: s.label })),
  ];
  return (
    <>
      <Seo
        title="About Invent Fine Art | Artisans and Product Designers, Mumbai"
        description="A team of artisans and product designers in Mumbai, providing start-to-end solutions from concept to complete execution."
        image="gallery/sculptures/2"
        jsonLd={breadcrumbs([{ name: 'About', path: '/about' }])}
      />
      <SplitHeader
        crumbs={[{ name: 'About' }]}
        eyebrow="About us"
        title={<>Artisans and <em>product designers</em></>}
        lead={about.pull}
        image="gallery/sculptures/2"
        position="50% 30%"
        alt="Saraswati with veena, a sculpture by Invent Fine Art"
      />

      {/* Stats strip (PROVISIONAL values, see CONTENT-GAPS.md) */}
      <div className="bg-dark text-chalk">
        <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse justify-end gap-1 border-chalk/15 py-6 ${i % 2 ? 'border-l pl-5' : ''} lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0`}>
              <dt className="caps-label text-chalk-muted">{s.label}</dt>
              <dd className="condensed text-[clamp(1.8rem,1.2rem+1.6vw,2.75rem)] leading-none text-oxide-bright">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Sticky sub-nav */}
      <nav aria-label="On this page" className="sticky top-(--header-h) z-30 border-b-2 border-line-strong bg-bg/95 backdrop-blur-md">
        <div className="container-site flex gap-6 overflow-x-auto">
          {SUBNAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 py-4 text-small font-bold uppercase tracking-label text-ink-muted hover:text-oxide-deep">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <Section id="story" className="scroll-mt-[calc(var(--header-h)+3.5rem)]">
        <Container className="grid gap-10 lg:grid-cols-12">
          <SectionHeading eyebrow="Our story" title={<>A community <em>of artists</em></>} className="lg:col-span-5" />
          <div className="flex flex-col gap-5 text-lead lg:col-span-7" data-reveal="up">
            {about.story.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="make" tone="surface" className="scroll-mt-[calc(var(--header-h)+3.5rem)]">
        <Container className="grid gap-10 lg:grid-cols-12">
          <SectionHeading eyebrow="What we make" title={<>Four services, <em>and more</em></>} className="lg:col-span-5" />
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <ul className="border-t-2 border-line-strong">
              {lines.map((l) => (
                <li key={l.slug} className="border-b border-line">
                  <Link to={`/${l.slug}`} className="group flex items-center justify-between gap-3 py-3 font-bold hover:text-oxide-deep">
                    <span>
                      <span className="caps-label mr-3 text-oxide-deep">{l.num}</span>
                      {l.name}
                    </span>
                    <ArrowRight className="size-4 text-oxide transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="caps-label mb-3">Also</p>
              <ul className="border-t-2 border-line-strong">
                {about.alsoMake.map((m) => (
                  <li key={m} className="border-b border-line py-3 text-ink-muted">
                    {m}
                  </li>
                ))}
              </ul>
              <Link to="/gallery" className="mt-4 inline-flex items-center gap-2 text-small font-bold uppercase tracking-label text-oxide-deep hover:text-ink">
                View the gallery
                <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <div id="process" className="scroll-mt-[calc(var(--header-h)+3.5rem)]">
        <Process tone="bg" cta={false} />
      </div>

      <Section id="facility" tone="dark" className="scroll-mt-[calc(var(--header-h)+3.5rem)]">
        <Container>
          <SectionHeading tone="dark" eyebrow="Our facility" title={<>Four units, <em>working together</em></>} tagline="Well equipped with the latest tools, technology and machinery." />
          <ul className="mt-12 grid border-t border-chalk/15 sm:grid-cols-2 lg:grid-cols-4">
            {facility.map((f, i) => (
              <li key={f.name} className="flex flex-col gap-3 border-b border-chalk/15 py-6 sm:px-6 sm:odd:pl-0 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
                <span className="condensed text-[2rem] leading-none text-oxide-bright">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-bold text-chalk">{f.name}</p>
                <p className="text-small text-chalk-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ClientMarquee />

      <Section id="visit" tone="surface" className="scroll-mt-[calc(var(--header-h)+3.5rem)]">
        <Container>
          <SectionHeading eyebrow="Visit us" title={<>Office <em>and factory</em></>} className="mb-12" />
          <div className="grid border-t-2 border-line-strong md:grid-cols-2">
            {[site.office, site.factory].map((a, i) => (
              <address key={a.label} className={`flex flex-col gap-3 py-8 not-italic ${i ? 'border-t border-line md:border-t-0 md:border-l md:pl-8' : 'md:pr-8'}`}>
                <p className="caps-label text-oxide-deep">{a.label}</p>
                <p className="text-lead font-bold">
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
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-small">
            <Phone className="size-4 text-oxide" strokeWidth={2.25} aria-hidden="true" />
            {site.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="font-bold hover:text-oxide-deep">
                {p.label}
              </a>
            ))}
          </p>
        </Container>
      </Section>
    </>
  );
}
