import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { preload } from 'react-dom';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Img, imageSrc, imageSrcSet } from '../ui/Img';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';
import { site } from '../../data/site';
import { lineBySlug } from '../../data/lines';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { useHydrated, useReducedMotion } from '../../motion/useReducedMotion';

const SLIDE_MS = 6500;
const PHOTO_SIZES = '(min-width: 1024px) 60vw, 100vw';

/**
 * Home hero (SITE-V4-PLAN.md §3.1): split, so no text and no overlay ever sit on the photo.
 * Headline block on the left; the photo bleeds to the right edge of the window (grid tracks, not 100vw, so no
 * horizontal scroll). One slide per product line, crossfading every 6.5 s with a gentle zoom (≤ 1.06); a ruled
 * strip of 01–05 tabs switches the line. Pausable; under reduced motion it never advances by itself.
 */
export function Hero() {
  const { hero } = site;
  const slides = hero.slides.map((s) => ({ ...s, line: lineBySlug[s.line] }));
  const [index, setIndex] = useState(0);
  const [userPaused, setPaused] = useState(false);
  const mounted = useHydrated();
  const reduced = useReducedMotion();
  const paused = userPaused || reduced;
  const { open } = useEnquiry();
  const active = slides[index];

  // Let the browser start fetching the first photo while it parses the page.
  preload(imageSrc(slides[0].image, 1600), {
    as: 'image',
    fetchPriority: 'high',
    imageSrcSet: imageSrcSet(slides[0].image),
    imageSizes: PHOTO_SIZES,
  });

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      if (document.visibilityState === 'visible') setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  return (
    <section aria-roledescription="carousel" aria-label="Our five product lines" className="flex flex-col bg-bg lg:block">
      {/* Phones: photo, then the strip, then the headline. From 1024px: headline | photo, strip below. */}
      <div className="contents lg:grid lg:min-h-[calc(100svh-var(--header-h)-6rem)] lg:grid-cols-[minmax(2rem,1fr)_minmax(0,32.5rem)_minmax(0,46rem)_minmax(2rem,1fr)]">
        {/* Headline block */}
        <div className="order-3 flex flex-col justify-between gap-10 px-4 pt-8 pb-12 md:px-8 lg:order-none lg:col-[2/3] lg:px-0 lg:pt-14 lg:pr-12 lg:pb-12">
          <div className="flex flex-col gap-6">
            <Eyebrow>Sculptures · Planters · GRC · FRP</Eyebrow>
            <h1 className="text-[clamp(2.5rem,1.4rem+3vw,4.25rem)] leading-[0.9]">{hero.title}</h1>
            <p className="max-w-md text-lead font-medium text-ink-muted">{site.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <Button to="/products" arrow>
                Explore products
              </Button>
              <Button variant="secondary" onClick={() => open()}>
                Get a Quote
              </Button>
            </div>
          </div>

          {/* The line on show (announced politely when it changes) */}
          <div aria-live={paused ? 'polite' : 'off'} className="hidden flex-col gap-2 border-t-2 border-line-strong pt-4 lg:flex">
            <p className="caps-label text-oxide-deep">
              {active.line.num} / 0{slides.length} · Pictured: {active.caption}
            </p>
            <p className="condensed text-[2rem] leading-none">{active.line.name}</p>
            <p className="text-small text-ink-muted">{active.line.tagline}</p>
            <Link
              to={`/${active.line.slug}`}
              className="group mt-1 inline-flex items-center gap-2 self-start text-small font-bold uppercase tracking-label text-oxide-deep hover:text-ink"
            >
              Explore {active.line.name}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Photo: bleeds to the right edge from 1024px */}
        <div className="relative order-1 aspect-[4/3] overflow-hidden bg-surface-2 lg:order-none lg:col-[3/5] lg:aspect-auto">
          {slides.map((s, i) => {
            const on = i === index;
            return (
              <div
                key={s.image}
                className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${on ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={!on}
              >
                <Img
                  id={s.image}
                  alt={`${s.caption}: ${s.line.name.toLowerCase()} by Invent Fine Art`}
                  priority={i === 0}
                  sizes={PHOTO_SIZES}
                  className={`size-full object-cover ${
                    on && mounted && !reduced
                      ? 'scale-[1.06] transition-transform duration-[9000ms] ease-out'
                      : 'scale-100 transition-transform delay-[1200ms] duration-0'
                  }`}
                  style={{ objectPosition: s.position }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Ruled strip of 01–05 tabs */}
      <div className="container-site order-2 lg:order-none">
        <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] border-t-2 border-line-strong">
          {slides.map((s, i) => {
            const on = i === index;
            return (
              <button
                key={s.image}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.line.num} ${s.line.name}`}
                aria-current={on}
                className={`group relative flex flex-col items-start gap-1 border-r border-line py-4 pr-3 pl-3 text-left first:pl-0 ${on ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}
              >
                {/* progress: fills over the slide's time while playing */}
                <span className="absolute inset-x-0 -top-0.5 h-0.5 overflow-hidden" aria-hidden="true">
                  <span
                    key={`${index}-${paused}`}
                    className={`block h-full bg-oxide ${on ? (paused ? 'w-full' : 'animate-[progress_6500ms_linear_forwards]') : 'w-0'}`}
                  />
                </span>
                <span className={`condensed text-[1.75rem] leading-none sm:text-[2.25rem] ${on ? 'text-oxide' : ''}`}>
                  {s.line.num}
                </span>
                <span className="caps-label hidden sm:block">{s.line.name}</span>
              </button>
            );
          })}
          {/* Under reduced motion nothing plays, so there is nothing to pause */}
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="grid place-items-center px-3 text-ink-muted hover:text-ink sm:px-4"
            >
              {paused ? <Play className="size-4" strokeWidth={2.25} /> : <Pause className="size-4" strokeWidth={2.25} />}
            </button>
          )}
        </div>
        {/* Phones: one line naming the line on show (the full caption is in the headline block from 1024px) */}
        <p className="caps-label border-b border-line pb-3 text-oxide-deep lg:hidden">
          {active.line.num} / 0{slides.length} · {active.line.name} · <span className="text-ink-muted">{active.caption}</span>
        </p>
      </div>
    </section>
  );
}
