import { useState } from 'react';
import { Img } from '../ui/Img';
import { drawings } from './sketches';

const DRAW_SPREAD = 1.1; // seconds between the first and the last line starting to draw

/**
 * A card's second view, shown on hover (mouse) or keyboard focus: the line drawing of the piece where one exists
 * (sections/sketches.js), otherwise the next photo of the same piece or project (`next` in designs.js and
 * projects.js). Touch screens have no hover, so phones keep the single photo.
 * The card element takes the handlers and the `group sketch-trigger` classes; the second photo is only mounted
 * (so only downloaded) on the first hover or focus.
 */
export function useHoverView() {
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);
  return [armed, { onPointerEnter: (e) => e.pointerType !== 'touch' && arm(), onFocus: arm }];
}

/** A short hint under the card (shown only on devices that can hover), or null when there is no second view. */
export const hoverHint = (item) => (item.code && drawings[item.code] ? 'Hover: drawing' : item.next ? 'Hover: second view' : null);

/** The layer over the photo box (place it inside a `relative overflow-hidden` box). `aspect` = box width / height. */
export function HoverView({ item, armed, sizes, aspect = 4 / 5 }) {
  const show = 'opacity-0 transition-opacity duration-500 ease-out-soft group-hover:opacity-100 group-has-[:focus-visible]:opacity-100';
  const d = item.code && drawings[item.code];
  if (d) return <Drawing drawing={d} aspect={aspect} className={`absolute inset-0 bg-dark ${show}`} />;
  if (item.next && armed) {
    return <Img id={item.next} alt="" sizes={sizes} className={`absolute inset-0 size-full object-cover ${show}`} />;
  }
  return null;
}

/** One drawing, fitted to the box with a margin and stood on an oxide ground line; it draws itself on hover. */
function Drawing({ drawing, aspect, className }) {
  const [x0, y0, x1, y1] = drawing.box;
  const pad = 0.16 * Math.max(x1 - x0, y1 - y0);
  let w = x1 - x0 + 2 * pad;
  let h = y1 - y0 + 2 * pad;
  if (w / h > aspect) h = w / aspect;
  else w = h * aspect;
  const vx = (x0 + x1) / 2 - w / 2;
  const vy = (y0 + y1) / 2 - h / 2 + pad * 0.4; // a little more room above than below the ground
  const total = drawing.objects.reduce((n, o) => n + o.d.length, 0);
  let n = 0;
  return (
    <span aria-hidden="true" className={className}>
      <svg viewBox={`${vx.toFixed(1)} ${vy.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`} className="sketch size-full" style={{ '--sw': (w / 230).toFixed(2) }}>
        <path d={`M ${(vx + pad * 0.5).toFixed(1)} 0 L ${(vx + w - pad * 0.5).toFixed(1)} 0`} pathLength="1" className="text-oxide-bright" style={{ '--d': '0s' }} />
        {drawing.objects.map((o, k) => (
          <g key={k} transform={`translate(${o.x} 0)`} className="text-chalk">
            {o.d.map((path) => (
              <path key={path} d={path} pathLength="1" style={{ '--d': `${((n++ / total) * DRAW_SPREAD).toFixed(2)}s` }} />
            ))}
          </g>
        ))}
      </svg>
    </span>
  );
}

/** The hint as an element: muted capitals, hidden on touch screens. */
export function HoverHint({ item, className = '' }) {
  const text = hoverHint(item);
  if (!text) return null;
  return <span className={`caps-label hidden text-ink-muted [@media(hover:hover)]:inline ${className}`}>{text}</span>;
}
