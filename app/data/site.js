// Company facts (SITE-V4-PLAN.md §4.2). Source of truth: ../old data/raw_html/*.html and ../new-design.md.
// The archive's own notes (old data/pages/*.md) are NOT a source. Every value marked PROVISIONAL is listed
// in CONTENT-GAPS.md and must be confirmed by the client before launch.

export const SITE_URL = 'https://www.inventfineart.com';

const foundedYear = 2008; // PROVISIONAL – confirm with client (old Home says "SINCE 2008", old About says 2009)

export const site = {
  name: 'Invent Fine Art',
  tagline: 'Reinventing spaces through Innovations in Art', // old Home hero
  pitch: 'Sculptures, designer planters, GRC products, GRC grilles and FRP products, made to your design.',
  foundedYear,
  certification: 'ISO 9001 Certified', // PROVISIONAL – confirm with client (old site: ISO 9001:2008, withdrawn in 2018)

  phones: [
    { label: '+91 93232 10327', tel: '+919323210327' },
    { label: '+91 96196 60089', tel: '+919619660089' },
    { label: '+91 89767 77123', tel: '+918976777123' },
  ],
  email: 'inventfineart.mum@gmail.com', // PROVISIONAL – confirm with client (enquiry inbox)
  emailAlt: 'inventfineart@gmail.com', // PROVISIONAL – confirm with client (still in use? old contact page only)
  whatsapp: '919323210327', // PROVISIONAL – confirm with client (which number has WhatsApp)

  // old data/raw_html/contact-us.html:243-251
  office: {
    label: 'Office address',
    lines: ['No. 14, Jay Bharat Zip Sangh', 'Vadar Pada, Kandivali East', 'Mumbai 400101, Maharashtra, India'],
    short: 'Kandivali East, Mumbai',
    geo: { lat: 19.1982543, lng: 72.8644545 },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=19.1982543,72.8644545',
    postal: { streetAddress: 'No. 14, Jay Bharat Zip Sangh, Vadar Pada, Kandivali East', addressLocality: 'Mumbai', postalCode: '400101' },
  },
  // old data/raw_html/contact-us.html:256-261 ("Nalasopra" in the source; spelling fixed)
  factory: {
    label: 'Factory address',
    // PROVISIONAL – confirm with client (the source says Thane; Nalasopara is now in Palghar district)
    lines: ['Opp. Jag Mata Mandir, Wagholi Road', 'Nalasopara West', 'Thane 401203, Maharashtra, India'],
    short: 'Nalasopara West',
    geo: { lat: 19.4196725, lng: 72.7856904 },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=19.4196725,72.7856904',
    postal: { streetAddress: 'Opp. Jag Mata Mandir, Wagholi Road, Nalasopara West', addressLocality: 'Thane', postalCode: '401203' },
  },

  hero: {
    // PROVISIONAL – confirm with client (headline; the alternative is v3's "Art that gives your space an identity.")
    title: 'Sculptures, designer planters, GRC and FRP, made to your design.',
    video: null, // PROVISIONAL – confirm with client (no hero video yet; the slider is used)
    // One slide per product line, photos ≥ 2,400 px. Candidates; final picks and phone crops are made by eye in Phase 4.
    slides: [
      { line: 'sculptures', image: 'gallery/sculptures/20', caption: 'Giant garden chess set', position: '50% 60%' },
      { line: 'designer-planters', image: 'gallery/planters/3', caption: 'Elephant planter', position: '50% 45%' },
      { line: 'grc-products', image: 'gallery/grc_products/1', caption: 'GRC 3D façade panels', position: '50% 55%' },
      { line: 'grc-grilles', image: 'gallery/wall_murals/13', caption: 'Jali boundary screen', position: '50% 50%' },
      { line: 'frp-products', image: 'gallery/other_products/11', caption: 'Curved interior installation', position: '50% 50%' },
    ],
  },

  // PROVISIONAL – confirm with client. Years is computed from foundedYear.
  stats: [
    { value: new Date().getFullYear() - foundedYear, suffix: '+', label: 'Years of craft' },
    { value: 160, suffix: '+', label: 'Designs crafted' },
    { value: 30, suffix: '+', label: 'Corporate clients' },
  ],

  catalogueUrl: null, // PROVISIONAL – confirm with client (no catalogue PDF yet)

  // Developer credit in the footer bottom bar (kept from v2).
  credit: { label: 'Crafted by', name: 'Brijesh Vishwakarma', url: 'https://brijesh-dev-portfolio.vercel.app/' },
};

export const nav = [
  { label: 'Products', to: '/products', mega: true },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Clients', to: '/clients' },
  { label: 'Contact', to: '/contact' },
];

export function whatsappLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
