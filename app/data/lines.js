// The five product lines, numbered 01–05 everywhere (SITE-V4-PLAN.md §2.5, §3).
// `tagline` and `intro` are VERBATIM from ../new-design.md; `suitableFor` uses only the brief's own words.
// Materials: only GRC and FRP are named in the sources; anything else is PROVISIONAL.

export const lines = [
  {
    slug: 'sculptures',
    code: 'SC',
    num: '01',
    name: 'Sculptures',
    tagline: 'Art That Gives Your Space a Distinctive Identity',
    intro: [
      'Discover sculptural creations that bring character, elegance, and artistic expression to your surroundings. From decorative sculptures to custom-designed statement pieces, we work to bring creative concepts to life.',
      'Suitable for residences, gardens, hotels, commercial spaces, and architectural projects.',
    ],
    suitableFor: ['Residences', 'Gardens', 'Hotels', 'Commercial spaces', 'Architectural projects'],
    materials: ['Fibre', 'Metal', 'Stone'], // PROVISIONAL – confirm with client (archive notes only, not the old site)
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/sculptures/15', position: '50% 18%' },
    seo: {
      title: 'Sculptures for Homes, Gardens & Hotels | Invent Fine Art',
      description:
        'Decorative and custom statement sculptures for residences, gardens, hotels and commercial spaces, by Invent Fine Art, Mumbai.',
    },
  },
  {
    slug: 'designer-planters',
    code: 'PL',
    num: '02',
    name: 'Designer Planters',
    tagline: 'Where Nature Meets Design',
    intro: [
      'Enhance your surroundings with decorative planters designed to complement contemporary and traditional environments. Our range can suit residential landscapes, balconies, gardens, hospitality spaces, and commercial properties.',
      'Explore different styles, shapes, sizes, and customization options to find the right fit for your space.',
    ],
    suitableFor: ['Residential landscapes', 'Balconies', 'Gardens', 'Hospitality spaces', 'Commercial properties'],
    materials: ['GRC', 'FRP'], // old services.html: "planters … made in GRC & FRP material"
    sizes: 'Small 12–18 in · Medium 18–30 in · Large 30–48 in · Custom', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/planters/3', position: '50% 45%' },
    seo: {
      title: 'Designer Planters for Homes, Hotels & Landscapes | Invent Fine Art',
      description:
        'Decorative designer planters in contemporary and traditional styles for gardens, balconies, hotels and commercial properties. Custom sizes and finishes.',
    },
  },
  {
    slug: 'grc-products',
    code: 'GRC',
    num: '03',
    name: 'GRC Products',
    tagline: 'Architectural Creativity Meets Modern Craftsmanship',
    intro: [
      'Discover Glassfibre Reinforced Concrete (GRC) products designed to add character, detail, and visual appeal to architectural spaces.',
      'GRC offers versatility for decorative and architectural applications, including façade elements, ornamental features, cornices, columns, mouldings, cladding elements, and customized architectural components, depending on the product range.',
      'Our focus is on bringing together design, functionality, and architectural aesthetics to meet the requirements of residential, commercial, and large-scale projects.',
    ],
    suitableFor: ['Façades', 'Residential projects', 'Commercial projects', 'Large-scale projects'],
    materials: ['GRC'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/grc_products/1', position: '50% 55%' },
    seo: {
      title: 'GRC Façade Elements & Architectural Products | Invent Fine Art',
      description:
        'Glassfibre Reinforced Concrete (GRC) façade elements, cornices, columns, mouldings and cladding for residential, commercial and large-scale projects.',
    },
  },
  {
    slug: 'grc-grilles',
    code: 'GRL',
    num: '04',
    name: 'GRC Grilles',
    tagline: 'Distinctive Patterns. Timeless Architectural Appeal.',
    intro: [
      'Enhance building façades, balconies, partitions, and other architectural spaces with decorative GRC grilles.',
      'Available design possibilities can range from traditional ornamental patterns to contemporary geometric styles, helping create visually distinctive architectural features while addressing project-specific requirements.',
    ],
    suitableFor: ['Building façades', 'Balconies', 'Partitions', 'Architectural spaces'],
    materials: ['GRC'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/wall_murals/13', position: '50% 50%' }, // PROVISIONAL – confirm with client (jali gate filed under murals)
    seo: {
      title: 'GRC Jali & Grilles Manufacturer in Mumbai | Invent Fine Art',
      description:
        'Decorative GRC jali and grilles for façades, balconies and partitions, from traditional ornamental to contemporary geometric patterns.',
    },
  },
  {
    slug: 'frp-products',
    code: 'FRP',
    num: '05',
    name: 'FRP Products',
    tagline: 'Creative Solutions. Customized to Your Requirements.',
    intro: [
      'Fibre-Reinforced Plastic (FRP) offers versatility for a variety of decorative, architectural, and project-specific applications.',
      'We develop product solutions based on the intended use, design, dimensions, finish, and project requirements, helping clients explore suitable options for their spaces.',
      'Share your concept with us to discuss the most appropriate design and finish.',
    ],
    suitableFor: ['Decorative applications', 'Architectural applications', 'Project-specific applications'],
    materials: ['FRP'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    banner: { image: 'gallery/other_products/11', position: '50% 50%' }, // PROVISIONAL – confirm with client (no FRP photos yet)
    seo: {
      title: 'FRP Products, Custom Made | Invent Fine Art',
      description:
        'Custom Fibre-Reinforced Plastic (FRP) products for decorative, architectural and project-specific applications, made to your design, size and finish.',
    },
  },
];

// PROVISIONAL – confirm with client (swatch photos still needed; tiles are flat token colours)
export const finishes = [
  { name: 'Natural concrete grey', tone: 'surface-2' },
  { name: 'Sandstone texture', tone: 'surface' },
  { name: 'Matte colour', tone: 'ink-muted' },
  { name: 'Metallic bronze', tone: 'oxide-deep' },
  { name: 'Custom colour', tone: 'line' },
];

// Typology tiles on each product page (SITE-V4-PLAN.md §3.2). Names and text use only the brief's own words;
// each image is a real photo from that line.
export const typologies = {
  sculptures: [
    { name: 'Decorative sculptures', text: 'Sculptural creations that bring character, elegance, and artistic expression to your surroundings.', image: 'gallery/sculptures/84' },
    { name: 'Custom statement pieces', text: 'Custom-designed statement pieces that bring creative concepts to life.', image: 'gallery/sculptures/80' },
  ],
  'designer-planters': [
    { name: 'Contemporary', text: 'Planters designed to complement contemporary environments.', image: 'gallery/planters/1' },
    { name: 'Traditional', text: 'Planters designed to complement traditional environments.', image: 'gallery/planters/3' },
    { name: 'Custom sizes & finishes', text: 'Different styles, shapes, sizes, and customization options.', image: 'gallery/planters/4' },
  ],
  'grc-products': [
    { name: 'Façade elements', text: 'Façade elements that add character, detail, and visual appeal.', image: 'gallery/grc_products/1' },
    { name: 'Ornamental features', text: 'Ornamental features for decorative applications.', image: 'gallery/grc_products/13' },
    { name: 'Cornices, columns & mouldings', text: 'Cornices, columns and mouldings for architectural spaces.', image: 'gallery/grc_products/11' },
    { name: 'Cladding & custom components', text: 'Cladding elements and customized architectural components.', image: 'gallery/grc_products/7' },
  ],
  'grc-grilles': [
    { name: 'Traditional ornamental', text: 'Traditional ornamental patterns.', image: 'gallery/wall_murals/13' },
    { name: 'Contemporary geometric', text: 'Contemporary geometric styles.', image: 'gallery/grc_products/5' },
  ],
  'frp-products': [
    { name: 'Decorative', text: 'FRP for decorative applications.', image: 'gallery/other_products/3' },
    { name: 'Architectural', text: 'FRP for architectural applications.', image: 'gallery/other_products/11' },
    { name: 'Project-specific', text: 'Solutions based on the intended use, design, dimensions, and finish.', image: 'gallery/other_products/6' },
  ],
};

export const lineBySlug = Object.fromEntries(lines.map((l) => [l.slug, l]));
/** A line name inside a sentence: lower case, but acronyms stay ("GRC products", "designer planters"). */
export const inSentence = (name) => name.split(' ').map((w) => (/^[A-Z]{2,}$/.test(w) ? w : w.toLowerCase())).join(' ');
export const lineSlugs = lines.map((l) => l.slug);
