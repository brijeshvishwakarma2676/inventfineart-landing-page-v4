import { Maximize2 } from 'lucide-react';
import { Img } from '../ui/Img';
import { Plate } from '../ui/Plate';
import { useEnquiry } from '../../enquiry/EnquiryContext';
import { HoverView, HoverHint, useHoverView } from './HoverView';

/**
 * One design: a 4:5 photo (opens the lightbox), its spec tag (code, title, detail) and Enquire, which opens the
 * panel with the line and code filled in. Enquire is always visible: no text is ever laid over the photo.
 * On hover, the piece's line drawing or another photo of it (HoverView).
 */
export function DesignCard({ design, onOpen, sizes = '(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw', headingLevel = 3 }) {
  const { open } = useEnquiry();
  const enquire = () => open({ category: design.line, code: design.code, title: design.title });
  const [armed, hoverHandlers] = useHoverView();
  return (
    <article className="group sketch-trigger flex h-full flex-col gap-3" {...hoverHandlers}>
      <button
        type="button"
        onClick={onOpen}
        className="relative block aspect-[4/5] cursor-zoom-in overflow-hidden bg-surface-2"
        aria-label={`View larger: ${design.title}, ${design.code}`}
      >
        <Img id={design.image} alt={design.alt} sizes={sizes} className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
        <HoverView item={design} armed={armed} sizes={sizes} />
        <span aria-hidden="true" className="absolute right-0 bottom-0 grid size-9 place-items-center bg-dark text-chalk opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 className="size-4" strokeWidth={2.25} />
        </span>
      </button>
      <Plate code={design.code} title={design.title} detail={[design.detail, design.location].filter(Boolean).join(' · ') || undefined} as={`h${headingLevel}`} className="flex-1" />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={enquire}
          className="text-small font-bold uppercase tracking-label text-oxide-deep underline decoration-2 underline-offset-4 hover:text-ink"
          aria-label={`Enquire about ${design.title}, ${design.code}`}
        >
          Enquire
        </button>
        <HoverHint item={design} />
      </div>
    </article>
  );
}
