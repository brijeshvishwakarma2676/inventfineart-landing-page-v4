import { useEffect } from 'react';
import { useMotion } from './motion';

/**
 * Counts every [data-count] number inside `scopeRef` up from 0, once, when it scrolls into view.
 * The prerendered HTML holds the real value; nothing changes until motion has loaded (never under reduced
 * motion), and numbers already on screen when motion starts are left alone.
 */
export function useCountUp(scopeRef) {
  const motion = useMotion();
  useEffect(() => {
    const root = scopeRef.current;
    if (!motion || !root) return;
    const { gsap } = motion;
    const ctx = gsap.context(() => {
      root.querySelectorAll('[data-count]').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const end = Number(el.dataset.count);
        const state = { v: 0 };
        el.textContent = '0';
        gsap.to(state, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = String(Math.round(state.v))),
        });
      });
    }, root);
    return () => {
      ctx.revert();
      root.querySelectorAll('[data-count]').forEach((el) => (el.textContent = el.dataset.count));
    };
  }, [motion, scopeRef]);
}
