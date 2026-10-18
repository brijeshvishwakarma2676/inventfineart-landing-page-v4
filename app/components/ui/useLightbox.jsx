import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { images } from '../../data/images.generated';

const LightboxImpl = lazy(() => import('./LightboxImpl'));
const widthsOf = (m) => Object.keys(m.files).map(Number).sort((a, b) => a - b);

/**
 * Full-screen photo viewer for a list of { image, alt, title?, code? }. File names come from the manifest
 * (content-hashed). Returns open(index) and the element to render; the viewer's code loads on first open.
 * `onEnquire(item)`, when given, adds an Enquire button to the toolbar for the photo on show.
 */
export function useLightbox(items, { onEnquire } = {}) {
  const [index, setIndex] = useState(-1);
  const slides = useMemo(
    () =>
      items.map((it) => {
        const m = images[it.image];
        const widths = widthsOf(m);
        const top = widths.at(-1);
        return {
          src: `/img/${m.files[top]}`,
          width: top,
          height: Math.round((m.h * top) / m.w),
          alt: it.alt,
          title: it.title,
          description: it.code,
          srcSet: widths.map((w) => ({ src: `/img/${m.files[w]}`, width: w, height: Math.round((m.h * w) / m.w) })),
        };
      }),
    [items],
  );
  const open = useCallback((i) => setIndex(i), []);
  const close = useCallback(() => setIndex(-1), []);
  const enquire = onEnquire
    ? (current) => {
        setIndex(-1);
        onEnquire(items[current]);
      }
    : undefined;
  const element =
    index >= 0 ? (
      <Suspense fallback={null}>
        <LightboxImpl open index={index} close={close} slides={slides} onEnquire={enquire} />
      </Suspense>
    ) : null;
  return { open, element };
}
