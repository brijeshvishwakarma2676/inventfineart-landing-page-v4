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
  { name: 'Metallic bronze', tone: 'bronze' },
  { name: 'Custom colour', tone: 'line' },
];

export const lineBySlug = Object.fromEntries(lines.map((l) => [l.slug, l]));
export const lineSlugs = lines.map((l) => l.slug);
