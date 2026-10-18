// Colour pairs the design allows (SITE-V4-PLAN.md §2.1, "Concrete & Oxide"), with the minimum WCAG contrast each
// must meet. Used by scripts/check-contrast.mjs (run in `npm run check`) and shown on /styleguide.
//   4.5 = normal text · 3 = large text (≥ 24px regular / 18.5px bold) or UI boundaries (fields, buttons)

export const PAIRS = [
  // [foreground, background, minimum, where it's used]
  ['ink', 'bg', 4.5, 'body text on concrete'],
  ['ink', 'surface', 4.5, 'body text on cement bands'],
  ['ink', 'paper', 4.5, 'text in forms, panel, tables'],
  ['ink', 'surface-2', 4.5, 'text on image placeholders'],
  ['ink-muted', 'bg', 4.5, 'secondary text'],
  ['ink-muted', 'surface', 4.5, 'secondary text on cement'],
  ['ink-muted', 'paper', 4.5, 'secondary text on paper'],
  ['ink-muted', 'white', 4.5, 'placeholders in form fields'],
  ['oxide-deep', 'bg', 4.5, 'small accent text: links, eyebrows, codes'],
  ['oxide-deep', 'surface', 4.5, 'small accent text on cement'],
  ['oxide-deep', 'paper', 4.5, 'small accent text on paper'],
  ['oxide', 'bg', 3, 'accent headline words, big numbers (large only)'],
  ['oxide', 'surface', 3, 'accent headline words on cement (large only)'],
  ['white', 'oxide', 4.5, 'primary button label; text on the oxide band'],
  ['white', 'oxide-deep', 4.5, 'primary button label, hover'],
  ['chalk', 'ink', 4.5, 'secondary button label, hover'],
  ['ink', 'chalk', 4.5, 'on-dark button label, hover'],
  ['chalk', 'dark', 4.5, 'text on graphite'],
  ['chalk', 'dark-2', 4.5, 'text on raised graphite'],
  ['chalk-muted', 'dark', 4.5, 'secondary text on graphite'],
  ['chalk-muted', 'dark-2', 4.5, 'secondary text on raised graphite'],
  ['oxide-bright', 'dark', 4.5, 'accent text, numbers and eyebrows on graphite'],
  ['error', 'bg', 4.5, 'form errors'],
  ['error', 'surface', 4.5, 'form errors on cement'],
  ['error', 'paper', 4.5, 'form errors on paper'],
  ['field', 'white', 3, 'form field borders'],
  ['field', 'paper', 3, 'form field borders on paper'],
  ['oxide', 'bg', 3, 'primary button against the page'],
  ['ink', 'bg', 3, 'secondary button border'],
];

// Pairs that fail and are therefore banned (kept here so the reason is visible next to the rules).
export const BANNED_PAIRS = [
  ['oxide', 'paper', 'small text: use oxide-deep'],
  ['oxide-bright', 'bg', 'oxide-bright is for graphite only'],
  ['oxide-deep', 'dark', 'use oxide-bright on graphite'],
  ['ink', 'oxide', 'labels on oxide are white'],
  ['chalk', 'oxide', 'text on oxide is pure white'],
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
