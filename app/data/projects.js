// Past work that is not one of the five product lines: murals, water features and rockery, pergolas and gazebos
// (all named on the old site: services.html and about-us.html). Shown under /projects only.
import { images } from './images.generated';

const num = (id) => parseInt(id.split('/').pop(), 10);
const fromFolder = (folder, keep = () => true) =>
  Object.keys(images)
    .filter((id) => id.startsWith(`gallery/${folder}/`) && keep(num(id)))
    .sort((a, b) => num(a) - num(b));

const OUTDOOR_STRUCTURES = [1, 2, 4, 5, 7, 15, 16, 17]; // pergolas, gazebos and a rockery entrance (other_products)
const MURALS_EXCLUDE = [1, 12, 13]; // 1 is a drawing; 12–13 are jali gates, shown under GRC Grilles

// Slugs match the old-URL redirects in vercel.json (/projects?type=…).
export const projectGroups = [
  { slug: 'wall-murals', name: 'Murals & relief art' },
  { slug: 'water-features', name: 'Water features & rockery' },
  { slug: 'outdoor-structures', name: 'Pergolas & gazebos' },
];
const groupName = Object.fromEntries(projectGroups.map((g) => [g.slug, g.name]));

// Titles for the photos shown with a caption (Home "Selected works", related projects); the rest use their group name.
const TITLES = {
  'gallery/wall_murals/9': 'Metal leaf wall installation',
  'gallery/wall_murals/21': 'Metal eagle wall art',
  'gallery/wall_murals/32': 'Carved relief wall',
  'gallery/wall_murals/35': 'Illuminated leaf wall lights',
  'gallery/water_fountains/20': 'Rock waterfall',
  'gallery/other_products/16': 'Garden pergola',
  // related-project picks (descriptive, from the photos)
  'gallery/wall_murals/10': 'Wall installation, living room',
  'gallery/wall_murals/17': 'Relief wall panels',
  'gallery/wall_murals/33': 'Dancers relief, lobby wall',
  'gallery/wall_murals/34': 'Carved relief wall, full length',
  'gallery/water_fountains/15': 'Water wall',
  'gallery/water_fountains/16': 'Sphere fountain',
  'gallery/other_products/2': 'Garden gazebo',
  'gallery/other_products/5': 'Gazebo with lattice screens',
  'gallery/other_products/17': 'Lattice pergola',
};

// Two photos of the same project (judged from the photos); each shows the other on hover.
const SAME_PROJECT = [
  ['gallery/wall_murals/32', 'gallery/wall_murals/34'],
  ['gallery/water_fountains/3', 'gallery/water_fountains/5'],
  ['gallery/water_fountains/12', 'gallery/water_fountains/13'],
  ['gallery/water_fountains/16', 'gallery/water_fountains/17'],
];
const otherView = Object.fromEntries(SAME_PROJECT.flatMap(([a, b]) => [[a, b], [b, a]]));

const make = (group) => (image) => {
  const title = TITLES[image] ?? groupName[group];
  return { image, group, groupName: groupName[group], title, alt: `${title} by Invent Fine Art`, next: otherView[image] ?? null };
};

export const projects = [
  ...fromFolder('wall_murals', (n) => !MURALS_EXCLUDE.includes(n)).map(make('wall-murals')),
  ...fromFolder('water_fountains').map(make('water-features')),
  ...fromFolder('other_products', (n) => OUTDOOR_STRUCTURES.includes(n)).map(make('outdoor-structures')),
];
const byImage = Object.fromEntries(projects.map((p) => [p.image, p]));

// Home "Selected works", in display order (all ≥ 1,200 px wide).
export const featuredProjects = [
  'gallery/wall_murals/9',
  'gallery/wall_murals/32',
  'gallery/water_fountains/20',
  'gallery/wall_murals/35',
  'gallery/other_products/16',
  'gallery/wall_murals/21',
].map((image) => byImage[image]);

// Product page "Related projects": three per line, ≥ 1,300 px wide.
const related = {
  sculptures: ['gallery/wall_murals/21', 'gallery/wall_murals/33', 'gallery/water_fountains/16'],
  'designer-planters': ['gallery/other_products/16', 'gallery/other_products/17', 'gallery/water_fountains/15'],
  'grc-products': ['gallery/wall_murals/32', 'gallery/wall_murals/34', 'gallery/wall_murals/17'],
  'grc-grilles': ['gallery/other_products/17', 'gallery/other_products/2', 'gallery/other_products/5'],
  'frp-products': ['gallery/wall_murals/35', 'gallery/wall_murals/10', 'gallery/wall_murals/9'],
};
export const relatedProjects = (slug) => (related[slug] ?? []).map((image) => byImage[image]).filter(Boolean);
