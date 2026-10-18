import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Section, Container } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { lineBySlug } from '../../data/lines';
import { useReducedMotion } from '../../motion/useReducedMotion';
import { sketches, GROUND, VIEWBOX } from './sketches';

const SCENE_MS = 7000;
const DRAW_SPREAD = 1.6; // seconds between the first and the last line starting to draw

/**
 * The drawings, stacked (decorative: the caption beside them names what is drawn). `scenes` are `sketches` with
 * their `line`; only `index` shows, and it draws itself when `drawn` turns on. Also used by the Home hero.
 */
export function SketchStage({ scenes, index, drawn, className = '' }) {
  return (
    <div className={`relative aspect-[780/310] ${className}`} aria-hidden="true">
      {scenes.map((s, i) => {
        const on = i === index;
        const total = s.objects.reduce((sum, o) => sum + o.d.length, 0);
        const delay = (n) => `${((n / total) * DRAW_SPREAD).toFixed(2)}s`;
        let n = 0;
        return (
          <svg
            key={s.line.slug}
            viewBox={VIEWBOX}
            className={`sketch absolute inset-0 size-full transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`}
            data-drawn={on && drawn ? '' : undefined}
          >
            <path d={`M 20 ${GROUND} L 780 ${GROUND}`} pathLength="1" className="text-oxide-bright" style={{ '--d': '0s' }} />
            {s.objects.map((o, k) => (
              <g key={k} transform={`translate(${o.x} ${GROUND})`} className={o.figure ? 'text-chalk-muted' : 'text-chalk'}>
                {o.d.map((d) => (
                  <path key={d} d={d} pathLength="1" style={{ '--d': delay(n++) }} />
                ))}
              </g>
            ))}
          </svg>
        );
      })}
    </div>
  );
}

/**
 * Sketchbook (graphite band on Home): one line drawing per product line, each drawn from designs in the catalogue.
 * A drawing draws itself line by line (CSS: pathLength="1" dashes, `.sketch` in global.css), holds, then gives way
 * to the next line's. It starts when the band scrolls into view and rubs out when it leaves, so it draws again on
 * return. The prerendered page shows the first drawing complete. Pausable; under reduced motion nothing draws or
 * advances by itself, and the 01–05 buttons switch drawings at once.
 */
export function Sketchbook() {
  const scenes = sketches.map((s) => ({ ...s, line: lineBySlug[s.line] }));
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(null); // null until the observer reports (prerendered: drawn)
  const [userPaused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const band = useRef(null);
  const drawn = reduced || visible !== false;
  const running = !reduced && !userPaused && visible === true;
  const active = scenes[index];

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.35) setVisible(true);
        else if (!e.isIntersecting) setVisible(false);
      },
      { threshold: [0, 0.35] },
    );
    io.observe(band.current);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % scenes.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [index, running, scenes.length]);

  return (
    <Section tone="dark" ref={band} aria-roledescription="carousel" aria-label="Sketches of our five product lines">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Sketchbook"
          title={<>We can turn your ideas and imagination <span className="text-oxide-bright">into reality</span></>}
          tagline="Send us a concept, a drawing or a reference photo. We make it as per your design and requirement."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <SketchStage scenes={scenes} index={index} drawn={drawn} className="lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:self-end" />

          <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:row-start-1">
            {/* The line on show (announced politely when it changes by hand) */}
            <div aria-live={running ? 'off' : 'polite'} className="flex flex-col gap-3">
              <p className="caps-label text-oxide-bright">
                {active.line.num} / 0{scenes.length} · Sketch
              </p>
              <p className="condensed text-[2.5rem] leading-none text-chalk">{active.line.name}</p>
              <p className="text-small text-chalk-muted">{active.line.tagline}</p>
              <p className="caps-label text-chalk-muted">
                Drawn from{' '}
                {active.codes.map((code, i) => (
                  <span key={code}>
                    {i > 0 && ' · '}
                    <Link to={`/${active.line.slug}?design=${code}`} className="text-chalk underline decoration-oxide-bright underline-offset-4 hover:text-oxide-bright">
                      {code}
                    </Link>
                  </span>
                ))}
              </p>
              <Link
                to={`/${active.line.slug}`}
                className="group mt-1 inline-flex items-center gap-2 self-start text-small font-bold uppercase tracking-label text-chalk hover:text-oxide-bright"
              >
                Explore {active.line.name}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </div>

            {/* 01–05: a row on phones, a ruled list from 1024px */}
            <div className="grid grid-cols-[repeat(5,minmax(0,1fr))_auto] border-t-2 border-chalk lg:grid-cols-1">
              {scenes.map((s, i) => {
                const on = i === index;
                return (
                  <button
                    key={s.line.slug}
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setVisible(true);
                    }}
                    aria-label={`Show the ${s.line.name} sketch`}
                    aria-current={on}
                    className={`relative flex items-baseline gap-3 border-r border-chalk/15 py-3 pl-2 text-left first:pl-0 lg:border-r-0 lg:border-b lg:pl-0 ${on ? 'text-chalk' : 'text-chalk-muted hover:text-chalk'}`}
                  >
                    <span className={`condensed text-[1.75rem] leading-none ${on ? 'text-oxide-bright' : ''}`}>{s.line.num}</span>
                    <span className="caps-label hidden lg:inline">{s.line.name}</span>
                    {/* progress: fills over the drawing's time while playing */}
                    <span className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden" aria-hidden="true">
                      <span
                        key={`${index}-${running}`}
                        className={`block h-full bg-oxide-bright ${on ? (running ? 'animate-[progress_7000ms_linear_forwards]' : 'w-full') : 'w-0'}`}
                      />
                    </span>
                  </button>
                );
              })}
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={userPaused ? 'Play sketches' : 'Pause sketches'}
                  className="grid place-items-center px-3 text-chalk-muted hover:text-chalk lg:justify-start lg:px-0 lg:py-3"
                >
                  {userPaused ? <Play className="size-4" strokeWidth={2.25} /> : <Pause className="size-4" strokeWidth={2.25} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
