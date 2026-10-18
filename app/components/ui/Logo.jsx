/**
 * Wordmark drawn from the client's pebble logo (stacked stones + INVENT + "Fine Art"), in the v4 voice:
 * condensed capitals. Colour follows the text colour.
 * PROVISIONAL – confirm with client: the only logo file on hand is a 120px PNG; replace with their vector logo.
 */
export function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 28 32" aria-hidden="true" className="h-8 w-7 shrink-0">
        <ellipse cx="14" cy="27" rx="13" ry="4.6" fill="currentColor" />
        <ellipse cx="14" cy="18.4" rx="9.4" ry="3.9" fill="currentColor" opacity="0.85" />
        <ellipse cx="14" cy="10.6" rx="6.4" ry="3.3" fill="currentColor" opacity="0.7" />
        <ellipse cx="14" cy="4.2" rx="3.6" ry="2.6" fill="currentColor" opacity="0.55" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="condensed text-[1.65rem] tracking-[0.02em]">Invent</span>
        <span className="caps-label -mt-0.5 text-[0.62rem] tracking-[0.32em] opacity-80">Fine Art</span>
      </span>
    </span>
  );
}
