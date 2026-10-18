import { useEffect } from 'react';
import { useMotion } from './motion';

/**
 * Scroll reveals for every [data-reveal] element inside `scopeRef` (SITE-V4-PLAN.md §2.4).
 *   data-reveal="up"       fade up 24px, 0.8s, power3.out
 *   data-reveal="stagger"  the element's children fade up one after another (0.08s apart)
 *   data-reveal="clip"     image wipe upwards; the <img> inside settles from scale 1.08 to 1
 * Elements already on screen when motion starts are left as painted, so nothing disappears after the first
 * paint. Re-runs when `key` changes (route change). Does nothing until motion has loaded, or under reduced motion.
 * Opacity only, never `visibility` (autoAlpha): hidden-visibility headings drop out of the accessibility tree.
 */
export function useReveal(scopeRef, key) {
  const motion = useMotion();

  useEffect(() => {
    const root = scopeRef.current;
    if (!motion || !root) return;
    const { gsap, ScrollTrigger } = motion;
    const below = (el) => el.getBoundingClientRect().top > window.innerHeight;
    const trigger = (el) => ({ trigger: el, start: 'top 86%', once: true });

    const ctx = gsap.context(() => {
      root.querySelectorAll('[data-reveal="up"]').forEach((el) => {
        if (below(el)) gsap.from(el, { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: trigger(el) });
      });
      root.querySelectorAll('[data-reveal="stagger"]').forEach((el) => {
        if (!below(el)) return;
        gsap.from(el.children, { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: trigger(el) });
      });
      root.querySelectorAll('[data-reveal="clip"]').forEach((el) => {
        if (!below(el)) return;
        const img = el.querySelector('img');
        const tl = gsap.timeline({ scrollTrigger: trigger(el) });
        tl.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' });
        if (img) tl.from(img, { scale: 1.08, duration: 1.4, ease: 'power3.out' }, 0);
      });
    }, root);

    // Images load after layout and move the trigger points; recompute once they do.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const timer = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [motion, key, scopeRef]);
}
