import { Link } from 'react-router';
import { Img } from '../ui/Img';
import { Plate } from '../ui/Plate';

/** A row of project photos with spec tags, each opening Projects on its group (related projects, etc.). */
export function ProjectTiles({ items }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-3" data-reveal="stagger">
      {items.map((p) => (
        <li key={p.image}>
          <Link to={`/projects?type=${p.group}`} className="group flex flex-col gap-3">
            <span className="block aspect-[4/3] overflow-hidden bg-surface-2">
              <Img id={p.image} alt={p.alt} sizes="(min-width: 640px) 33vw, 100vw" className="size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105" />
            </span>
            <Plate code={p.groupName} title={p.title} as="h3" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
