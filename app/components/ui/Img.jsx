import { images } from '../../data/images.generated';

const widthsOf = (m) => Object.keys(m.files).map(Number).sort((a, b) => a - b);
const url = (m, w) => `/img/${m.files[w]}`;

/**
 * Responsive image from the generated manifest (scripts/images.mjs).
 * `id` is the media-src path without extension, e.g. "gallery/sculptures/15".
 * File names are content-hashed, so they are read from the manifest, never built by hand.
 * The dominant colour fills the box while the file loads.
 */
export function Img({ id, alt, sizes = '100vw', priority = false, className = '', style, ...rest }) {
  const m = images[id];
  if (!m) {
    if (import.meta.env.DEV) throw new Error(`Img: unknown image id "${id}"`);
    return null;
  }
  const widths = widthsOf(m);
  const fallback = widths.find((w) => w >= 1200) ?? widths.at(-1);
  return (
    <img
      src={url(m, fallback)}
      srcSet={widths.map((w) => `${url(m, w)} ${w}w`).join(', ')}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={{ backgroundColor: m.color, ...style }}
      {...rest}
    />
  );
}

/** URL of the smallest built width ≥ target (or the largest), for OG images, JSON-LD and preloads. */
export function imageSrc(id, target = 1200) {
  const m = images[id];
  if (!m) return '';
  const widths = widthsOf(m);
  return url(m, widths.find((w) => w >= target) ?? widths.at(-1));
}

/** srcSet string for an id (used by preloads and the lightbox). */
export function imageSrcSet(id) {
  const m = images[id];
  if (!m) return '';
  return widthsOf(m)
    .map((w) => `${url(m, w)} ${w}w`)
    .join(', ');
}
