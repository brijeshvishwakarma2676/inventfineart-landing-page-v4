import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { reducedMotionQuery, startMotion, stopMotion, useMotion } from './motion';

/** Starts the motion loader after hydration and follows the visitor's reduced-motion setting. */
export function MotionProvider({ children }) {
  const { pathname, hash } = useLocation();
  const motion = useMotion();
  const lastPath = useRef(pathname);

  useEffect(() => {
    startMotion();
    const mq = window.matchMedia(reducedMotionQuery);
    const onChange = () => (mq.matches ? stopMotion() : startMotion());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lenis keeps its own scroll target, so jump to the top on a page change (native scrolling is handled by
  // ScrollRestoration). Only on a real change: not when motion first arrives after the visitor has scrolled.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (!hash) motion?.lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, hash, motion]);

  return children;
}
