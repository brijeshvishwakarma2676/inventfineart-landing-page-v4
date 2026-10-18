import { Link } from 'react-router';
import { preload } from 'react-dom';
import { Img, imageSrc, imageSrcSet } from '../ui/Img';
import { Eyebrow } from '../ui/SectionHeading';

/** Breadcrumb trail (Home first). The last item is the current page. */
export function Breadcrumbs({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="caps-label text-ink-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.name} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {c.to ? (
              <Link to={c.to} className="hover:text-ink">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const HEADER_SIZES = '(min-width: 1024px) 60vw, 100vw';

/**
 * Page header with a photo, split like the Home hero: the headline block beside the photo (no text on photos),
 * the photo bleeding to the right edge from 1024px; on phones the photo comes first.
 */
export function SplitHeader({ crumbs, eyebrow, title, lead, image, position, alt = '', children }) {
  // The photo is the page's largest paint: let the browser fetch it while it parses the head.
  preload(imageSrc(image, 1600), { as: 'image', fetchPriority: 'high', imageSrcSet: imageSrcSet(image), imageSizes: HEADER_SIZES });
  return (
    <header className="flex flex-col bg-bg lg:grid lg:min-h-[min(44rem,calc(100svh-var(--header-h)))] lg:grid-cols-[minmax(2rem,1fr)_minmax(0,32.5rem)_minmax(0,46rem)_minmax(2rem,1fr)]">
      <div className="order-2 flex flex-col justify-end gap-6 px-4 pt-8 pb-12 md:px-8 lg:order-none lg:col-[2/3] lg:px-0 lg:py-14 lg:pr-12">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-h1">{title}</h1>
        {lead && <p className="max-w-md text-lead font-medium text-ink-muted">{lead}</p>}
        {children}
      </div>
      <div className="relative order-1 aspect-[4/3] overflow-hidden bg-surface-2 lg:order-none lg:col-[3/5] lg:aspect-auto">
        <Img id={image} alt={alt} priority sizes={HEADER_SIZES} className="size-full object-cover" style={{ objectPosition: position }} />
      </div>
    </header>
  );
}

/** Page header without a photo: breadcrumbs, eyebrow, condensed H1, lead, above a black rule. */
export function PlainHeader({ crumbs, eyebrow, title, lead, children }) {
  return (
    <header className="bg-bg">
      <div className="container-site flex flex-col gap-6 pt-12 pb-12 md:pt-16">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-5xl text-h1">{title}</h1>
        {lead && <p className="max-w-2xl text-lead font-medium text-ink-muted">{lead}</p>}
        {children}
        <span aria-hidden="true" className="mt-4 block h-0.5 w-full bg-line-strong" />
      </div>
    </header>
  );
}
