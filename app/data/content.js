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
  // The miniature: meeting 2026-10-24, L2228–2240 (the owner prints a 3D miniature for the client's approval).
  { title: 'Design', text: 'Our artisans and product designers develop the piece as per your design and requirement, with a 3D-printed miniature for your approval.' },
  { title: 'Manufacture', text: 'Made in our manufacturing unit, with the latest tools, technology and machinery.' },
  { title: 'Quality check', text: 'Each piece is examined on numerous factors by our quality control unit before delivery.' },
  { title: 'Packing & fixing', text: 'Delivered in premium quality packing, and fixed on site where required.' },
];

// Why choose us (Home, at the end: meeting L124–126). Each point restates the owner's own words or the old site:
// own factory running 24×7 (meeting L410); 3D-printed miniature for approval (L2228–2240); "as per design and
// requirement", "start to end solutions from conceptualizations to the complete execution", "stringently examined on
// numerous factors", "premium quality packing", "supplying and fixing" (about-us.html); "turnkey projects" (index.html).
export const reasons = [
  { icon: 'factory', title: 'Our own factory, 24×7', text: 'Every piece is made in our own manufacturing unit, which runs round the clock.' },
  { icon: 'ruler', title: 'Made to your design', text: 'Each piece is made as per your design and requirement, in the size you need.' },
  { icon: 'cube', title: 'A miniature first', text: 'We 3D-print a miniature of the design for your approval before we make the full piece.' },
  { icon: 'route', title: 'Start to end', text: 'From the first concept to the complete execution, with one team.' },
  { icon: 'building', title: 'Turnkey projects', text: 'For residential, commercial and large-scale projects, indoors and outdoors.' },
  { icon: 'check', title: 'Checked, packed, fixed', text: 'Every piece is examined before delivery, packed with care, and fixed on site.' },
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
    lines: ['customised-products', 'planters'],
    // Meeting L732–760: under GRC and under FRP, three product groups only.
    groups: ['Jaali', 'Pots & planters', 'Building products'],
    photos: ['gallery/grc_products/1', 'gallery/grc_products/5', 'gallery/grc_products/11'],
    // Meeting L714–716: GRC gets two blocks, "Advantages" and "Why GRC". Written in our own words on the topics of
    // the competitor reference (yogigrc.com), no text copied. PROVISIONAL – confirm with client (CONTENT-GAPS.md).
    advantages: [
      'Lighter than solid concrete or stone of the same shape',
      'Takes fine detail from the mould: jaali, carving and relief',
      'Stands up to sun and rain on façades and outdoors',
      'Coloured and finished to match your design',
    ],
    why: 'Where a building needs detail without the weight of solid concrete or stone, GRC does the job: façades, jaali, columns, arches and planters.',
  },
  {
    name: 'FRP',
    full: 'Fibre-Reinforced Plastic',
    text: 'Fibre-Reinforced Plastic (FRP) offers versatility for a variety of decorative, architectural, and project-specific applications.',
    lines: ['customised-products', 'planters'],
    groups: ['Jaali', 'Pots & planters', 'Building products'],
    photos: ['gallery/other_products/8', 'gallery/other_products/6', 'gallery/other_products/11'],
    // Meeting L736–752, the owner's own words: a substitute for RCC that looks right, is made faster, is lighter,
    // and stays strong and durable.
    advantages: [
      'A substitute for RCC in building elements, which would cost far more in RCC',
      'Looks right',
      'Made faster',
      'Light, yet strong and durable',
    ],
  },
];

// The other materials (meeting L874), mainly for sculptures and murals.
export const otherMaterials = 'We also work in stainless steel, stone and bronze, mainly for sculptures.';

// About page (about-us.html and index.html, tidied; same facts only).
export const about = {
  pull: 'We provide start to end solutions, from conceptualization to the complete execution.',
  story: [
    'Invent Fine Art is a team of artisans and product designers. We create products with an artistic inclination for designers and architects and their projects, and translate our clients’ ideas into projects that work both aesthetically and commercially.',
    'We trade in, manufacture, supply and fix art work for indoor and outdoor decor. To suit each client’s needs, our products are offered in numerous sizes, specifications and dimensions.',
    'Every collection is manufactured in line with the quality norms and guidelines laid down by the industry, and is examined on numerous factors before it is delivered to our customers.',
  ],
  // The four services, plus the wider range named on the old About and Services pages (murals are now a service).
  alsoMake: [
    'Acoustic wall panels',
    '3D wall façades',
    'Rockery work',
    'Water fountains',
    'GRC railings, pergolas and gazebos',
  ],
};
