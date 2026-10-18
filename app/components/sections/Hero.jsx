import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';
import { SketchStage } from './Sketchbook';
import { sketches } from './sketches';
import { site } from '../../data/site';
import { lineBySlug } from '../../data/lines';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { useReducedMotion } from '../../motion/useReducedMotion';

const SLIDE_MS = 6500;

/**
 * Home hero (SITE-V4-PLAN.md §3.1), graphite: the headline block on the left, and on the right one line drawing
 * per product line (the same drawings as the Sketchbook band). The first drawing is already complete in the
 * prerendered page, so nothing that has painted is rubbed out; each next one draws itself line by line, every
 * 6.5 s. A ruled strip of 01–05 tabs switches the line. Pausable; under reduced motion it never advances by itself.
 */
export function Hero() {
  const { hero } = site;
  const slides = sketches.map((s) => ({ ...s, line: lineBySlug[s.line] }));
  const [index, setIndex] = useState(0);
  const [userPaused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const paused = userPaused || reduced;
  const { open } = useEnquiry();
  const active = slides[index];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  return (
    <section aria-roledescription="carousel" aria-label="Our five product lines" className="flex flex-col bg-dark text-chalk lg:block">
      {/* Phones: headline, drawing, then the strip. From 1024px: headline | drawing, strip below. */}
      <div className="contents lg:grid lg:min-h-[calc(100svh-var(--header-h)-6rem)] lg:grid-cols-[minmax(2rem,1fr)_minmax(0,32.5rem)_minmax(0,46rem)_minmax(2rem,1fr)]">
        {/* Headline block */}
        <div className="flex flex-col justify-between gap-10 px-4 pt-10 pb-4 md:px-8 lg:col-[2/3] lg:px-0 lg:pt-14 lg:pr-12 lg:pb-12">
          <div className="flex flex-col gap-6">
            <Eyebrow tone="dark">Sculptures · Planters · GRC · FRP</Eyebrow>
            <h1 className="text-[clamp(2.5rem,1.4rem+3vw,4.25rem)] leading-[0.9] text-chalk">{hero.title}</h1>
            <p className="max-w-md text-lead font-medium text-chalk-muted">{site.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <Button to="/products" arrow>
                Explore products
              </Button>
              <Button variant="onDark" onClick={() => open()}>
                Get a Quote
              </Button>
            </div>
          </div>

          {/* The line on show (announced politely when it changes by hand) */}
          <div aria-live={paused ? 'polite' : 'off'} className="hidden flex-col gap-2 border-t-2 border-chalk pt-4 lg:flex">
            <p className="caps-label text-oxide-bright">
              {active.line.num} / 0{slides.length} · Sketch
            </p>
            <p className="condensed text-[2rem] leading-none">{active.line.name}</p>
            <p className="text-small text-chalk-muted">{active.line.tagline}</p>
            <Link
              to={`/${active.line.slug}`}
              className="group mt-1 inline-flex items-center gap-2 self-start text-small font-bold uppercase tracking-label text-chalk hover:text-oxide-bright"
            >
              Explore {active.line.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* The drawing: stands on the strip's rule from 1024px */}
        <div className="px-4 pt-6 pb-2 md:px-8 lg:col-[3/4] lg:self-end lg:px-0 lg:pt-12 lg:pb-0 lg:pl-8">
          <SketchStage scenes={slides} index={index} drawn />
        </div>
      </div>

      {/* Ruled strip of 01–05 tabs */}
      <div className="container-site">
        <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] border-t-2 border-chalk">
          {slides.map((s, i) => {
            const on = i === index;
            return (
              <button
                key={s.line.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.line.num} ${s.line.name}`}
                aria-current={on}
                className={`group relative flex flex-col items-start gap-1 border-r border-chalk/15 py-4 pr-3 pl-3 text-left first:pl-0 ${on ? 'text-chalk' : 'text-chalk-muted hover:text-chalk'}`}
              >
                {/* progress: fills over the slide's time while playing */}
                <span className="absolute inset-x-0 -top-0.5 h-0.5 overflow-hidden" aria-hidden="true">
                  <span
                    key={`${index}-${paused}`}
                    className={`block h-full bg-oxide-bright ${on ? (paused ? 'w-full' : 'animate-[progress_6500ms_linear_forwards]') : 'w-0'}`}
                  />
                </span>
                <span className={`condensed text-[1.75rem] leading-none sm:text-[2.25rem] ${on ? 'text-oxide-bright' : ''}`}>
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
              className="grid place-items-center px-3 text-chalk-muted hover:text-chalk sm:px-4"
            >
              {paused ? <Play className="size-4" strokeWidth={2.25} /> : <Pause className="size-4" strokeWidth={2.25} />}
            </button>
          )}
        </div>
        {/* Phones: one line naming the line on show (the full caption is in the headline block from 1024px) */}
        <p className="caps-label pb-4 text-oxide-bright lg:hidden">
          {active.line.num} / 0{slides.length} · {active.line.name} · <span className="text-chalk-muted">{active.line.tagline}</span>
        </p>
      </div>
    </section>
  );
}
