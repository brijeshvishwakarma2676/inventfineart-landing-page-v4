import { useEffect, useState } from 'react';
import { preload } from 'react-dom';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Img, imageSrc, imageSrcSet } from '../ui/Img';
import { Button } from '../ui/Button';
import { site } from '../../data/site';
import { about } from '../../data/content';
import { lineBySlug } from '../../data/lines';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { useHydrated, useReducedMotion } from '../../motion/useReducedMotion';

const SLIDE_MS = 6500;

/**
 * Home hero (SITE-V4-PLAN.md §3.1): full-width photos, one per product line (≥ 2,400 px), crossfading every 6.5 s
 * with a slow zoom. The headline, the old site's "start to end solutions" line and the two buttons sit centred on
 * a dark scrim. Below them: what the photo shows, and the controls (one bar per slide, previous, pause, next).
 * Under reduced motion it never advances by itself.
 */
export function Hero() {
  const slides = site.hero.slides.map((s) => ({ ...s, line: lineBySlug[s.line] }));
  const [index, setIndex] = useState(0);
  const [userPaused, setPaused] = useState(false);
  const mounted = useHydrated();
  const reduced = useReducedMotion();
  const paused = userPaused || reduced;
  const { open } = useEnquiry();
  const active = slides[index];
  const go = (step) => setIndex((i) => (i + step + slides.length) % slides.length);

  // Let the browser start fetching the first photo while it parses the page.
  preload(imageSrc(slides[0].image, 1600), { as: 'image', fetchPriority: 'high', imageSrcSet: imageSrcSet(slides[0].image), imageSizes: '100vw' });

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  const control = 'grid size-11 place-items-center border border-white/50 text-white hover:bg-white hover:text-ink';
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our five product lines"
      className="relative isolate flex min-h-[34rem] flex-col overflow-hidden bg-dark text-white lg:max-h-[56rem] lg:min-h-[calc(100svh-var(--header-h))]"
    >
      {slides.map((s, i) => {
        const on = i === index;
        return (
          <div
            key={s.image}
            className={`absolute inset-0 -z-20 transition-opacity duration-[1200ms] ease-in-out ${on ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!on}
          >
            <Img
              id={s.image}
              alt={`${s.caption}: ${s.line.name.toLowerCase()} by Invent Fine Art`}
              priority={i === 0}
              sizes="100vw"
              className={`size-full object-cover ${
                on && mounted && !reduced ? 'scale-[1.06] transition-transform duration-[9000ms] ease-out' : 'scale-100 transition-transform delay-[1200ms] duration-0'
              }`}
              style={{ objectPosition: s.position }}
            />
          </div>
        );
      })}
      {/* One scrim, darkest behind the text */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-scrim" />

      <div className="container-site flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center">
        <p className="caps-label text-white">Sculptures · Planters · GRC · FRP</p>
        <h1 className="max-w-4xl text-display text-white">{site.hero.title}</h1>
        <p className="max-w-2xl text-lead font-medium text-white">{about.pull}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button to="/products" arrow>
            Explore products
          </Button>
          <Button variant="onDark" onClick={() => open()}>
            Get a Quote
          </Button>
        </div>
      </div>

      <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-5">
        {/* What the photo shows (announced politely when it changes by hand) */}
        <p aria-live={paused ? 'polite' : 'off'} className="text-small font-bold text-white">
          {active.line.name} <span className="font-medium">· {active.caption}</span>
        </p>
        <div className="flex items-center gap-2">
          <ul className="mr-2 flex gap-1.5">
            {slides.map((s, i) => {
              const on = i === index;
              return (
                <li key={s.image}>
                  <button type="button" onClick={() => setIndex(i)} aria-label={`Show ${s.line.name}`} aria-current={on} className="group flex h-11 items-center">
                    <span className="relative block h-1 w-7 overflow-hidden bg-white/35 sm:w-12">
                      <span
                        key={`${index}-${paused}`}
                        className={`absolute inset-y-0 left-0 bg-white ${on ? (paused ? 'w-full' : 'animate-[progress_6500ms_linear_forwards]') : 'w-0'}`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={control}>
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          {/* Under reduced motion nothing plays, so there is nothing to pause */}
          {!reduced && (
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} className={control}>
              {paused ? <Play className="size-4" strokeWidth={2.25} /> : <Pause className="size-4" strokeWidth={2.25} />}
            </button>
          )}
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={control}>
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
