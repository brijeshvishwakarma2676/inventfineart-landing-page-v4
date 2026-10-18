import { useSyncExternalStore } from 'react';

// Motion loader (SITE-V4-PLAN.md §2.4). GSAP, ScrollTrigger and Lenis are imported only once the browser is
// idle after hydration, and never under reduced motion, so they stay out of the initial bundle and can't
// delay the first paint. Until they arrive (or if they never do), the site works with native scrolling.

const QUERY = '(prefers-reduced-motion: reduce)';
let state = null; // { gsap, ScrollTrigger, lenis } once loaded
let generation = 0; // bumps on stop, so a load that finishes after a stop is discarded
let started = false;
let tick = null;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches;
export const reducedMotionQuery = QUERY;

const whenIdle = (fn) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 2000 }) : window.setTimeout(fn, 200);

/** The header height in px, from the --header-h custom property the header keeps up to date. */
function headerOffset() {
  const css = getComputedStyle(document.documentElement);
  const value = css.getPropertyValue('--header-h').trim();
  const n = parseFloat(value) || 0;
  return value.endsWith('rem') ? n * parseFloat(css.fontSize) : n;
}

export function startMotion() {
  if (started || typeof window === 'undefined' || prefersReducedMotion()) return;
  started = true;
  const gen = generation;
  whenIdle(async () => {
    const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]);
    if (gen !== generation) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: { offset: -headerOffset() } });
    lenis.on('scroll', ScrollTrigger.update);
    tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    state = { gsap, ScrollTrigger, lenis };
    emit();
  });
}

/** Called when the visitor switches to reduced motion: back to native scrolling, reveals revert. */
export function stopMotion() {
  generation++;
  started = false;
  if (!state) return;
  state.gsap.ticker.remove(tick);
  state.lenis.destroy();
  state = null;
  emit();
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** { gsap, ScrollTrigger, lenis } once motion has loaded, otherwise null (always null in prerendered HTML). */
export function useMotion() {
  return useSyncExternalStore(subscribe, () => state, () => null);
}
