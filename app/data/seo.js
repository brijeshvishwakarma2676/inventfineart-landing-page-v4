import { SITE_URL, site } from './site';
import { lines } from './lines';
import { imageSrc } from '../components/ui/Img';

const place = (p, name) => ({
  '@type': 'Place',
  name,
  address: { '@type': 'PostalAddress', ...p.postal, addressRegion: 'Maharashtra', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: p.geo.lat, longitude: p.geo.lng },
});

// LocalBusiness: the office is the business address; the factory is a second location, each with its own geo.
export const organization = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: site.name,
  slogan: site.tagline,
  url: SITE_URL,
  description: site.pitch,
  email: site.email,
  telephone: site.phones.map((p) => p.tel),
  foundingDate: String(site.foundedYear),
  image: SITE_URL + imageSrc('gallery/grc_products/1', 1600),
  address: { '@type': 'PostalAddress', ...site.office.postal, addressRegion: 'Maharashtra', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: site.office.geo.lat, longitude: site.office.geo.lng },
  location: [place(site.office, `${site.name} office`), place(site.factory, `${site.name} factory`)],
  makesOffer: lines.map((l) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Product', name: l.name, url: `${SITE_URL}/${l.slug}` },
  })),
};

export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path,
    })),
  };
}
