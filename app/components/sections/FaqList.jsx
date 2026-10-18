import { Link } from 'react-router';
import { ArrowRight, Plus } from 'lucide-react';

/** Questions as ruled rows (native <details>, so they work before and without JavaScript). */
export function FaqList({ items, className = '' }) {
  return (
    <div className={`border-t-2 border-line-strong ${className}`}>
      {items.map((f) => (
        <details key={f.id ?? f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lead font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="mt-1 size-5 shrink-0 text-oxide transition-transform duration-300 group-open:rotate-45" strokeWidth={2.5} aria-hidden="true" />
          </summary>
          <div className="flex max-w-[68ch] flex-col items-start gap-3 pb-6 text-ink-muted">
            <p>{f.a}</p>
            {f.link && (
              <Link to={f.link.to} className="group/link inline-flex items-center gap-2 text-small font-bold uppercase tracking-label text-oxide-deep hover:text-ink">
                {f.link.label}
                <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
