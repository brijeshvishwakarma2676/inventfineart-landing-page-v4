// The four services, numbered 01–04 everywhere (client meeting 2026-10-24: ../decision.txt, L220–234 for the order,
// L794 for the final four; SITE-V4-DEV-DECISIONS-PLAN.md §1.3). Was five lines: GRC Products, GRC Grilles and FRP
// Products are now one service, "Customised FRP & GRC Products"; Murals & wall features is new.
// Copy: the brief's own words (../new-design.md) where it has them, otherwise the owner's words from the meeting.
// `segments`: what the service covers, from the meeting. A design's `segment` (designs.js) files it under one.
// `legacy`: old line URLs that now redirect here (vercel.json); the enquiry form maps old ?service= values with it.

export const lines = [
  {
    slug: 'sculptures',
    code: 'SC',
    num: '01',
    name: 'Sculptures',
    tagline: 'Art That Gives Your Space a Distinctive Identity',
    intro: [
      'Discover sculptural creations that bring character, elegance, and artistic expression to your surroundings. From decorative sculptures to custom-designed statement pieces, we work to bring creative concepts to life.',
      // Meeting L794, L874. "RSJ" left out until the client explains it (TASKS.md 0.7).
      'We make sculptures in stainless steel, stone, bronze and FRP.',
      'Suitable for residences, gardens, hotels, commercial spaces, and architectural projects.',
    ],
    suitableFor: ['Residences', 'Gardens', 'Hotels', 'Commercial spaces', 'Architectural projects'],
    materials: ['Stainless steel', 'Stone', 'Bronze', 'FRP'], // meeting L794, L874
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    // Sculpture segments are materials; the existing photos aren't labelled by material yet, so the page lists them
    // and keeps the subject filter (designs.js sculptureGroups) until labelled photos arrive.
    segments: [
      { slug: 'stainless-steel', name: 'Stainless steel sculptures' },
      { slug: 'stone', name: 'Stone sculptures' },
      { slug: 'bronze', name: 'Bronze sculptures' },
      { slug: 'frp', name: 'FRP sculptures' },
    ],
    segmentsAreMaterials: true,
    // Home services card: 4 photos (meeting L32–34). Stand-ins until the client's photos arrive (TASKS.md B4).
    photos: ['gallery/sculptures/15', 'gallery/sculptures/20', 'gallery/sculptures/84', 'gallery/sculptures/80'],
    banner: { image: 'gallery/sculptures/15', position: '50% 18%' },
    seo: {
      title: 'Sculptures in Steel, Stone, Bronze & FRP | Invent Fine Art',
      description:
        'Decorative and custom statement sculptures in stainless steel, stone, bronze and FRP for residences, gardens, hotels and commercial spaces, by Invent Fine Art, Mumbai.',
    },
    legacy: [],
  },
  {
    slug: 'planters',
    code: 'PL',
    num: '02',
    name: 'Planters',
    tagline: 'Where Nature Meets Design',
    intro: [
      'Enhance your surroundings with decorative planters designed to complement contemporary and traditional environments. Our range can suit residential landscapes, balconies, gardens, hospitality spaces, and commercial properties.',
      // Meeting L794: FRP and GRC planters, and three of the owner's own designs.
      'We make planters in FRP and GRC, including our own designs: removable planters on wheels, partition creeper planters that grow into a natural green partition, and FRP tray flower beds.',
      'Explore different styles, shapes, sizes, and customization options to find the right fit for your space.',
    ],
    suitableFor: ['Residential landscapes', 'Balconies', 'Gardens', 'Hospitality spaces', 'Commercial properties'],
    materials: ['FRP', 'GRC'], // old services.html: "planters … made in GRC & FRP material"; meeting L794
    sizes: 'Small 12–18 in · Medium 18–30 in · Large 30–48 in · Custom', // PROVISIONAL – confirm with client
    segments: [
      { slug: 'frp-planters', name: 'FRP pots & planters', text: 'Pots and planters in fibre (FRP).' },
      { slug: 'grc-planters', name: 'GRC pots & planters', text: 'Pots and planters in GRC.' },
      { slug: 'removable', name: 'Removable planters', text: 'Planters on wheels, so even a heavy, fully planted pot can be moved.' },
      { slug: 'partition-creeper', name: 'Partition creeper planters', text: 'A planter with a trellis: creepers climb it and grow into a natural partition.' },
      { slug: 'tray-flower-beds', name: 'Tray flower beds', text: 'Large, shallow FRP trays for flowering plants, easy to move.' },
    ],
    // Home services card: 4 photos (meeting L32–34). Stand-ins until the client's photos arrive (TASKS.md B4).
    photos: ['gallery/planters/3', 'gallery/planters/1', 'gallery/planters/2', 'gallery/planters/4'],
    banner: { image: 'gallery/planters/3', position: '50% 45%' },
    seo: {
      title: 'FRP & GRC Planters, Removable & Creeper Planters | Invent Fine Art',
      description:
        'Designer planters in FRP and GRC: pots, removable planters on wheels, partition creeper planters and tray flower beds for homes, hotels and commercial spaces.',
    },
    legacy: ['designer-planters'],
  },
  {
    slug: 'murals-wall-features',
    code: 'MU',
    num: '03',
    name: 'Murals & Wall Features',
    tagline: 'Art for Your Walls',
    intro: [
      // Meeting L258–274: what a mural and a wall feature are, in the owner's words.
      'A mural is artwork raised in relief on a wall: a figure, a scene or a pattern. A wall feature is a set of decorative panels that covers a wall and gives it character.',
      'We make both to your design, in steel and in mixed media, for homes, lobbies and commercial spaces.', // meeting L794
    ],
    suitableFor: ['Residences', 'Lobbies', 'Hotels', 'Commercial spaces'], // PROVISIONAL – confirm with client
    materials: ['Steel', 'Mixed media'], // meeting L794 ("RSJ" left out until confirmed)
    sizes: 'Made to your wall and drawing', // PROVISIONAL – confirm with client
    segments: [
      { slug: 'murals', name: 'Murals', text: 'Relief artwork on a wall, such as a figure or a scene.' },
      { slug: 'wall-features', name: 'Wall features', text: 'Decorative panels that cover a wall.' },
    ],
    // Home services card: 4 photos (meeting L32–34). Stand-ins until the client's photos arrive (TASKS.md B4).
    photos: ['gallery/wall_murals/32', 'gallery/wall_murals/33', 'gallery/wall_murals/5', 'gallery/wall_murals/14'],
    banner: { image: 'gallery/wall_murals/32', position: '50% 50%' },
    seo: {
      title: 'Wall Murals & Wall Features in Mumbai | Invent Fine Art',
      description:
        'Relief wall murals and decorative wall features in steel and mixed media, made to your design for homes, lobbies, hotels and commercial spaces.',
    },
    legacy: [],
  },
  {
    slug: 'customised-products',
    code: 'CP',
    num: '04',
    name: 'Customised FRP & GRC Products', // PROVISIONAL – confirm with client (short name, meeting L1918)
    tagline: 'Creative Solutions. Customized to Your Requirements.',
    intro: [
      'Fibre-Reinforced Plastic (FRP) offers versatility for a variety of decorative, architectural, and project-specific applications.',
      'Discover Glassfibre Reinforced Concrete (GRC) products designed to add character, detail, and visual appeal to architectural spaces.',
      // Meeting L794–938: the customised range, in the owner's words.
      'We make reception and console tables, garden benches, fins that hide ducting, jaali and screens, chhajjas, columns, pillars and arches, and façade elements in FRP and GRC, as per your design and requirement.',
      // Meeting L736–752: why FRP and GRC for building elements.
      'In building elements FRP and GRC replace RCC: they look right, are made faster, are lighter, and stay strong and durable.',
    ],
    suitableFor: ['Residential projects', 'Commercial projects', 'Large-scale projects'],
    materials: ['FRP', 'GRC'],
    sizes: 'Made to your size and drawing', // PROVISIONAL – confirm with client
    segments: [
      { slug: 'reception-tables', name: 'Reception tables' },
      { slug: 'console-tables', name: 'Console tables' },
      { slug: 'utility', name: 'Utility products' },
      { slug: 'garden-benches', name: 'Garden benches' },
      { slug: 'fins', name: 'Fins', text: 'FRP fins that hide ducting and pipes, or work as fencing.' },
      { slug: 'jaali-screens', name: 'Jaali & screens' },
      { slug: 'chhajja', name: 'Chhajja', text: 'Chhajjas in FRP and GRC, as per your requirement.' },
      { slug: 'columns-arches', name: 'Columns, pillars & arches' },
      { slug: 'facades', name: 'Façades' },
      { slug: 'gates', name: 'Gates' },
    ],
    // Home services card: 4 photos (meeting L32–34). Stand-ins until the client's photos arrive (TASKS.md B4).
    photos: ['gallery/grc_products/1', 'gallery/grc_products/5', 'gallery/grc_products/11', 'gallery/other_products/8'],
    banner: { image: 'gallery/grc_products/1', position: '50% 55%' },
    seo: {
      title: 'Custom FRP & GRC Products: Jaali, Façades, Chhajja | Invent Fine Art',
      description:
        'Custom FRP and GRC products: jaali and screens, façade elements, chhajjas, columns and arches, fins, garden benches and reception tables, made to your design.',
    },
    legacy: ['grc-products', 'grc-grilles', 'frp-products'],
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

export const lineBySlug = Object.fromEntries(lines.map((l) => [l.slug, l]));
/** A line name inside a sentence: lower case, but acronyms stay ("GRC products", "designer planters"). */
export const inSentence = (name) => name.split(' ').map((w) => (/^[A-Z]{2,}$/.test(w) ? w : w.toLowerCase())).join(' ');
export const lineSlugs = lines.map((l) => l.slug);
/** The current service for a slug, including the old line slugs (designer-planters, grc-products…). */
export const serviceFor = (slug) => lineBySlug[slug] ?? lines.find((l) => l.legacy.includes(slug));
