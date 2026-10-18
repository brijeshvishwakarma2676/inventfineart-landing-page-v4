// Clients, from the client's own old site. PROVISIONAL – confirm with client (the list dates from 2017: is it
// current, and may we publish it?).

// Logos: ../old data/media/clients, brand names read from each logo. Files 13 (same as 12) and 29 (a second
// version of 20) are duplicates and are left out, so 28 brands show.
export const clientLogos = [
  [1, 'Bombay Realty'], [2, 'Raymond'], [3, 'Mahindra Lifespaces'], [4, 'Everest'], [5, 'Vikram'], [6, 'Mantri'],
  [7, 'Indian Navy'], [8, 'The Ashoka Hotel'], [9, 'Runwal Group'], [10, 'Kotak Mahindra Bank'], [11, 'Kalpataru'],
  [12, 'Wadhawan Group'], [14, 'Shree Mahalaxmi Developers'], [15, 'Larsen & Toubro'], [16, 'The Wadhwa Group'],
  [17, 'Lokmat'], [18, 'Mahaavir'], [19, 'CRISIL Research'], [20, 'M Moser Associates'], [21, 'Pendse and Associates'],
  [22, 'SSA Architects'], [23, 'Kanakia'], [24, 'Lupin'], [25, 'Chromed Design Studio'], [26, 'HiMedia'],
  [27, 'Allure MedSpa'], [30, 'Kohinoor Square'], [32, 'Shubhangan'],
].map(([file, name]) => ({ image: `clients/${file}`, name, alt: `${name} logo` }));

// Names as listed on the old site (raw_html/our_client.html:219-266), in title case. Spelling follows the brand's
// own logo where one exists (Kalpataru, Bombay Realty, Mahindra Lifespace, M Moser Design Associates, Struct-Mast).
export const clientNames = [
  'Ashoka Restaurant, Nagpur',
  'B.E. Billimoria & Co. Ltd.',
  'Bombay Realty',
  'Chromed Design Studio, New Delhi',
  'CRISIL Risk & Infrastructure Solutions Ltd.',
  'Everest Moscot, Mumbai',
  'HiMedia Laboratories Pvt. Ltd., Mumbai',
  'India Fashion, Mumbai',
  'Indian Army, HQ 54 Inf Div., Hyderabad',
  'Indian Navy, HQ Magna, Porbandar',
  'Jay Associates',
  'Kalpataru, Mumbai',
  'Kotak Mahindra Bank',
  'L&T Finance Limited',
  'Lokmat News Paper Pvt. Ltd.',
  'M Moser Design Associates India Pvt. Ltd.',
  'Mahaavir, Navi Mumbai',
  'Mahindra Lifespace Developers Ltd., Mumbai',
  'Make Well Construction',
  'Mantri Developers',
  'Naik Navare Developers Pvt. Ltd., Mumbai',
  'Pendse & Associates',
  'Raymond Ltd., Mumbai',
  'Runwal Developers Pvt. Ltd.',
  'S.K. Associate, Mumbai',
  'Sanderson Group (India) Pvt. Ltd.',
  'Shree Mahalaxmi Developers, Neral',
  'Struct-Mast Engineers, Mumbai',
  'The Wadhwa Group, Mumbai',
  'Vardan Nursing Home Pvt. Ltd., Mumbai',
  'Vikram Tea Processor Pvt. Ltd., Jalna',
  'Wadhawan Holdings Pvt. Ltd., Mumbai',
  'White Shadow, Coimbatore',
  'Zenith Group, Kamothe',
];

export const architects = []; // PROVISIONAL – confirm with client (no architect logos supplied; section hidden)
