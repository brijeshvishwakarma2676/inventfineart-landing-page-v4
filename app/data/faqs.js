// FAQ answers. PROVISIONAL – confirm with client (CONTENT-GAPS.md row 16).
// Each answer restates the old site (../old data/raw_html) or the brief (../new-design.md), or describes how this
// website's enquiry works. No prices, lead times, warranties, weather or material claims that the sources don't make.
import { site } from './site';
import { lines, inSentence } from './lines';

const lineNames = lines.map((l) => inSentence(l.name)).join(', ').replace(/, ([^,]*)$/, ' and $1');

const ITEMS = {
  'what-we-do': {
    q: 'What does Invent Fine Art do?',
    a: `We design, make, supply and fix art work for indoor and outdoor spaces: ${lineNames}, as well as murals, water fountains, rockery, pergolas and gazebos.`,
  },
  who: {
    q: 'Who do you work with?',
    a: 'Homeowners, designers and architects, on homes, villas, malls, hotels, gardens and façades. Our clients include developers, banks, hotels, design studios and the Indian Navy and Army.',
    link: { to: '/clients', label: 'See our clients' },
  },
  where: {
    q: 'Where are you based?',
    a: `Our office is in ${site.office.short}, and our factory is in ${site.factory.short}.`,
    link: { to: '/contact', label: 'Addresses and directions' },
  },
  iso: {
    q: 'Are you ISO certified?',
    a: `Yes. Invent Fine Art is ${site.certification.replace('Certified', 'certified')}.`,
  },
  outside: {
    q: 'Do you work outside Mumbai?',
    a: 'Yes. Our clients are in Mumbai, Navi Mumbai, Nagpur, Hyderabad, Coimbatore, New Delhi and elsewhere, and we supply and export our work. Tell us your location when you enquire.',
  },
  custom: {
    q: 'Can you make something to our own design?',
    a: 'Yes. We make products as per your design and requirement, in numerous sizes, specifications and dimensions, from the first concept to the complete execution.',
  },
  materials: {
    q: 'What materials do you work in?',
    a: 'Our GRC products and grilles are made in Glassfibre Reinforced Concrete (GRC), and our planters in GRC and FRP. FRP (Fibre-Reinforced Plastic) is used for decorative, architectural and project-specific pieces. For a sculpture, tell us the look you want and we will suggest the material.',
  },
  outdoor: {
    q: 'Do you make pieces for outdoor sites?',
    a: 'Yes. We make art work for indoor and outdoor sites, including sculptures for homes and gardens and planters for porches, gardens and other outdoor spaces. Tell us where the piece will be placed.',
  },
  install: {
    q: 'Do you deliver and install?',
    a: 'Yes. Every piece is delivered in premium quality packing, and we fix it on site where required.',
  },
  quote: {
    q: 'How do I get a quote?',
    a: 'Use Get a Quote on any page, or send your drawing or photos on WhatsApp. Every design on this site has a code (for example IFA-SC-012): include it so we know which piece you mean.',
    link: { to: '/contact', label: 'Get a quote' },
  },
  details: {
    q: 'What should I include in an enquiry?',
    a: 'Where the piece will go (indoors or outdoors), the approximate size and quantity, a drawing or reference photo, and the finish you have in mind.',
  },
  price: {
    q: 'Can I see prices?',
    a: 'Each piece is made to your design, size, material and finish, so we quote for each enquiry. Send the details and we will reply with a quote.',
  },
};

const pick = (ids) => ids.map((id) => ({ id, ...ITEMS[id] }));

// /faq, in three groups.
export const faqGroups = [
  { slug: 'studio', name: 'The studio', items: pick(['what-we-do', 'who', 'where', 'iso', 'outside']) },
  { slug: 'products', name: 'Products', items: pick(['custom', 'materials', 'outdoor', 'install']) },
  { slug: 'enquiries', name: 'Enquiries', items: pick(['quote', 'details', 'price']) },
];

// Home: five questions.
export const homeFaqs = pick(['what-we-do', 'custom', 'materials', 'install', 'quote']);

// Product pages: 1–2 questions specific to the line, then two common ones.
const common = pick(['install', 'quote']);
export const lineFaqs = {
  sculptures: [
    { id: 'sc-outdoor', q: 'Do you make sculptures for outdoor sites?', a: 'Yes. Our sculptures are suitable for residences, gardens, hotels, commercial spaces and architectural projects, indoors and outdoors. Tell us where the piece will stand.' },
    { id: 'sc-concept', q: 'Can you make a sculpture from my concept?', a: 'Yes. From decorative sculptures to custom-designed statement pieces, we work to bring creative concepts to life. Share a sketch or a reference to start.' },
    ...common,
  ],
  'designer-planters': [
    { id: 'pl-material', q: 'Which materials are your planters made in?', a: 'GRC and FRP.' },
    // PROVISIONAL – confirm with client (sizes, CONTENT-GAPS.md row 9)
    { id: 'pl-sizes', q: 'What sizes are available?', a: 'Small (12–18 in), medium (18–30 in) and large (30–48 in), and custom sizes to your drawing.' },
    ...common,
  ],
  'grc-products': [
    { id: 'grc-what', q: 'What is GRC?', a: 'Glassfibre Reinforced Concrete. It is used for decorative and architectural applications, including façade elements, ornamental features, cornices, columns, mouldings, cladding elements and customized architectural components.' },
    { id: 'grc-projects', q: 'What kind of projects is GRC used on?', a: 'Residential, commercial and large-scale projects.' },
    ...common,
  ],
  'grc-grilles': [
    { id: 'grl-pattern', q: 'Can you make a grille to my own pattern?', a: 'Yes. Patterns range from traditional ornamental to contemporary geometric, and we can develop one as per your design and requirement.' },
    { id: 'grl-where', q: 'Where are GRC grilles used?', a: 'On building façades, balconies, partitions and other architectural spaces.' },
    ...common,
  ],
  'frp-products': [
    { id: 'frp-what', q: 'What is FRP?', a: 'Fibre-Reinforced Plastic. It offers versatility for a variety of decorative, architectural and project-specific applications.' },
    { id: 'frp-start', q: 'What do you need from me to start?', a: 'The intended use, the design or a reference, the dimensions and the finish you have in mind.' },
    ...common,
  ],
};

/** FAQPage JSON-LD for a list of questions. */
export const faqJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
