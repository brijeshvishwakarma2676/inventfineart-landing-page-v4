// Copy used across pages. Every statement restates the old site (../old data/raw_html: index.html,
// about-us.html, services.html) or the brief (../new-design.md). Don't add claims here that aren't in those sources.
import { site } from './site';

// Home trust band (index.html: "a community of artists, committed to bring outstanding art to the commercial world").
export const intro = {
  eyebrow: `Since ${site.foundedYear}`,
  title: 'A community of artists, bringing outstanding art to the commercial world.',
  body: [
    'We are a team of sculptors, painters and designers, working in all areas of interior and architectural design, at indoor as well as outdoor sites.',
    'Our own facility handles every stage, from the first concept to fixing on site.',
  ],
};

// How we work (about-us.html: "start to end solutions from conceptualizations to the complete execution";
// "as per design and requirement"; latest tools, technology and machinery; examined on numerous factors;
// premium quality packing; supplying and fixing).
export const process = [
  { title: 'Concept', text: 'Share your idea: a sketch, a reference photo or a drawing, with the size and the site.' },
  { title: 'Design', text: 'Our artisans and product designers develop the piece as per your design and requirement.' },
  { title: 'Manufacture', text: 'Made in our manufacturing unit, with the latest tools, technology and machinery.' },
  { title: 'Quality check', text: 'Each piece is examined on numerous factors by our quality control unit before delivery.' },
  { title: 'Packing & fixing', text: 'Delivered in premium quality packing, and fixed on site where required.' },
];

// Why choose us (Home): each point restates the old site. index.html: "enables us to do turnkey projects";
// about-us.html: "trading, manufacturing, supplying and fixing", "premium quality packing", "stringently examined on
// numerous factors", "start to end solutions from conceptualizations to the complete execution", "as per design and
// requirement". `icon` names a lucide icon (mapped in WhyUs.jsx).
export const reasons = [
  { icon: 'factory', title: 'Our own manufacturing unit', text: 'Designed and made in our own facility, with the latest tools, technology and machinery.' },
  { icon: 'ruler', title: 'Made to your design', text: 'Every piece is made as per your design and requirement, in the size you need.' },
  { icon: 'route', title: 'Start to end solutions', text: 'From the first concept to the complete execution, with one team.' },
  { icon: 'building', title: 'Turnkey projects', text: 'For residential, commercial and large-scale projects, indoors and outdoors.' },
  { icon: 'check', title: 'Quality checked', text: 'Every piece is examined on numerous factors before it is delivered.' },
  { icon: 'truck', title: 'Packing and fixing', text: 'Delivered in premium quality packing, then supplied and fixed on site.' },
];

// The four units of the facility (about-us.html).
export const facility = [
  { name: 'Manufacturing unit', text: 'Equipped with the latest tools, technology and machinery.' },
  { name: 'Quality control unit', text: 'Every product is examined on numerous factors before it is delivered.' },
  { name: 'Research & development unit', text: 'Works in close co-operation with the other units, as part of the same facility.' },
  { name: 'Warehousing & packaging unit', text: 'Products leave in premium quality packing and reach your premises as they left us.' },
];

// The two materials named in the sources (new-design.md; services.html: planters "made in GRC & FRP material").
export const materials = [
  {
    name: 'GRC',
    full: 'Glassfibre Reinforced Concrete',
    text: 'GRC offers versatility for decorative and architectural applications, including façade elements, ornamental features, cornices, columns, mouldings, cladding elements, and customized architectural components.',
    lines: ['grc-products', 'grc-grilles', 'designer-planters'],
  },
  {
    name: 'FRP',
    full: 'Fibre-Reinforced Plastic',
    text: 'Fibre-Reinforced Plastic (FRP) offers versatility for a variety of decorative, architectural, and project-specific applications.',
    lines: ['frp-products', 'designer-planters'],
  },
];

// About page (about-us.html and index.html, tidied; same facts only).
export const about = {
  pull: 'We provide start to end solutions, from conceptualization to the complete execution.',
  story: [
    'Invent Fine Art is a team of artisans and product designers. We create products with an artistic inclination for designers and architects and their projects, and translate our clients’ ideas into projects that work both aesthetically and commercially.',
    'We trade in, manufacture, supply and fix art work for indoor and outdoor decor. To suit each client’s needs, our products are offered in numerous sizes, specifications and dimensions.',
    'Every collection is manufactured in line with the quality norms and guidelines laid down by the industry, and is examined on numerous factors before it is delivered to our customers.',
  ],
  // The five product lines, plus the wider range named on the old About and Services pages.
  alsoMake: [
    'Murals',
    'Acoustic wall panels',
    '3D wall façades',
    'Rockery work',
    'Water fountains',
    'GRC railings, pergolas and gazebos',
  ],
};
