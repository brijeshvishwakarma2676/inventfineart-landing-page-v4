import { useState } from 'react';
import { Img } from '../ui/Img';

/**
 * A card's second view, shown on hover (mouse) or keyboard focus: the next photo of the same piece or project
 * (`next` in designs.js and projects.js). Touch screens have no hover, so phones keep the single photo.
 * The card element takes the handlers and the `group` class; the second photo is only mounted (so only
 * downloaded) on the first hover or focus.
 */
export function useHoverView() {
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);
  return [armed, { onPointerEnter: (e) => e.pointerType !== 'touch' && arm(), onFocus: arm }];
}

/** The layer over the photo box (place it inside a `relative overflow-hidden` box). */
export function HoverView({ item, armed, sizes }) {
  if (!item.next || !armed) return null;
  return (
    <Img
      id={item.next}
      alt=""
      sizes={sizes}
      className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 ease-out-soft group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
    />
  );
}

/** A short hint under the card on devices that can hover, when there is a second view. */
export function HoverHint({ item, className = '' }) {
  if (!item.next) return null;
  return <span className={`caps-label hidden text-ink-muted [@media(hover:hover)]:inline ${className}`}>Hover: second view</span>;
}
