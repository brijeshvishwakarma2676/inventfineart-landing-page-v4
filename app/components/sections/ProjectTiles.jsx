import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { Plate } from '../ui/Plate';
import { HoverView, HoverHint, useHoverView } from './HoverView';

const SIZES = '(min-width: 640px) 33vw, 100vw';

/** A row of project photos with spec tags, each opening Projects on its group (related projects, etc.). */
export function ProjectTiles({ items }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-3" data-reveal="stagger">
      {items.map((p) => (
        <li key={p.image}>
          <Tile p={p} />
        </li>
      ))}
    </ul>
  );
}

/** One tile; a project with a second photo shows it on hover. */
function Tile({ p }) {
  const [armed, hoverHandlers] = useHoverView();
  return (
    <Link to={`/gallery?type=${p.group}`} className="group sketch-trigger flex flex-col gap-3" {...hoverHandlers}>
      <span className="relative block aspect-[4/3] overflow-hidden bg-surface-2">
        <Img id={p.image} alt={p.alt} sizes={SIZES} className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
        <HoverView item={p} armed={armed} sizes={SIZES} />
      </span>
      <Plate code={p.groupName} title={p.title} as="h3">
        <HoverHint item={p} />
      </Plate>
    </Link>
  );
}
