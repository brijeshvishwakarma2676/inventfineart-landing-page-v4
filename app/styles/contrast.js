// Colour pairs the design allows (SITE-V4-PLAN.md §2.1), with the minimum WCAG contrast each must meet.
// Used by scripts/check-contrast.mjs (run in `npm run check`) and shown on /styleguide.
//   4.5 = normal text · 3 = large text (≥ 18px regular / 14px bold) or UI boundaries (fields, buttons)

export const PAIRS = [
  // [foreground, background, minimum, where it's used]
  ['ink', 'bg', 4.5, 'body text'],
  ['ink', 'surface', 4.5, 'body text on alternate sections'],
  ['ink', 'surface-2', 4.5, 'text on placeholders and swatches'],
  ['ink-muted', 'bg', 4.5, 'secondary text'],
  ['ink-muted', 'surface', 4.5, 'secondary text on alternate sections'],
  ['bronze-deep', 'bg', 4.5, 'small bronze text: links, eyebrows, codes'],
  ['bronze-deep', 'surface', 4.5, 'small bronze text on alternate sections'],
  ['bronze', 'bg', 3, 'bronze text ≥ 18px only'],
  ['bronze', 'surface', 3, 'bronze text ≥ 18px only'],
  ['white', 'bronze', 4.5, 'primary button label'],
  ['white', 'bronze-deep', 4.5, 'primary button label, hover'],
  ['cream', 'ink', 4.5, 'secondary button label, hover'],
  ['ink', 'cream', 4.5, 'on-dark button label, hover'],
  ['cream', 'dark', 4.5, 'text on dark bands'],
  ['cream', 'dark-2', 4.5, 'text on raised dark surfaces'],
  ['cream-muted', 'dark', 4.5, 'secondary text, eyebrows, links on dark'],
  ['cream-muted', 'dark-2', 4.5, 'secondary text on raised dark surfaces'],
  ['error', 'bg', 4.5, 'form errors'],
  ['error', 'surface', 4.5, 'form errors on alternate sections'],
  ['field', 'bg', 3, 'form field borders'],
  ['field', 'surface', 3, 'form field borders on alternate sections'],
  ['bronze', 'bg', 3, 'primary button against the page'],
  ['ink', 'bg', 3, 'secondary button border'],
];

// Pairs that fail and are therefore banned (kept here so the reason is visible next to the rules).
export const BANNED_PAIRS = [
  ['ink-muted', 'surface-2', 'use ink on surface-2'],
  ['bronze', 'dark', 'use cream-muted on dark'],
  ['bronze-deep', 'dark', 'use cream-muted on dark'],
  ['ink', 'bronze', 'button labels on bronze are white'],
];

const channel = (v) => {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};

/** WCAG contrast ratio between two #rrggbb colours. */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
