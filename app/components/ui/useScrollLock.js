import { useEffect } from 'react';
import { useMotion } from '../../motion/motion';

/** Stops page scrolling while `locked` is true: Lenis when it has loaded, native scrolling always. */
export function useScrollLock(locked) {
  const motion = useMotion();
  useEffect(() => {
    if (!locked) return;
    motion?.lenis.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      motion?.lenis.start();
      document.documentElement.style.overflow = prev;
    };
  }, [locked, motion]);
}
