import { GROUND, VIEWBOX } from './sketches';

const DRAW_SPREAD = 1.6; // seconds between the first and the last line starting to draw

/**
 * The drawings, stacked (decorative: the caption beside them names what is drawn). `scenes` are `sketches` with
 * their `line`; only `index` shows, and it draws itself when `drawn` turns on. Used by the Home hero.
 */
export function SketchStage({ scenes, index, drawn, className = '' }) {
  return (
    <div className={`relative aspect-[780/310] ${className}`} aria-hidden="true">
      {scenes.map((s, i) => {
        const on = i === index;
        const total = s.objects.reduce((sum, o) => sum + o.d.length, 0);
        const delay = (n) => `${((n / total) * DRAW_SPREAD).toFixed(2)}s`;
        let n = 0;
        return (
          <svg
            key={s.line.slug}
            viewBox={VIEWBOX}
            className={`sketch absolute inset-0 size-full transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`}
            data-drawn={on && drawn ? '' : undefined}
          >
            <path d={`M 20 ${GROUND} L 780 ${GROUND}`} pathLength="1" className="text-oxide-bright" style={{ '--d': '0s' }} />
            {s.objects.map((o, k) => (
              <g key={k} transform={`translate(${o.x} ${GROUND})`} className={o.figure ? 'text-chalk-muted' : 'text-chalk'}>
                {o.d.map((d) => (
                  <path key={d} d={d} pathLength="1" style={{ '--d': delay(n++) }} />
                ))}
              </g>
            ))}
          </svg>
        );
      })}
    </div>
  );
}
