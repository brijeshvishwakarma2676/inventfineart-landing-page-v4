import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** While `active`, keeps Tab focus inside `ref`, focuses its first control, calls `onEscape` on Esc,
 *  and returns focus to the previously focused element when released. */
export function useFocusTrap(ref, active, onEscape) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const previous = document.activeElement;
    const items = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    items()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onEscape?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('keydown', onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [ref, active, onEscape]);
}
