import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';
const subscribe = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/** True when the visitor asks for reduced motion. Prerendered HTML assumes true (no motion until hydrated). */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => true);
}

const noop = () => () => {};
/** False in prerendered HTML and during hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
