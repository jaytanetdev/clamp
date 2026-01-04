import { siteConfig } from './seo';

// Organization Schema
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo/logo.webp`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Thai', 'English'],
  },
  sameAs: [siteConfig.links.line, siteConfig.links.shopee, siteConfig.links.lazada],
};

// Product Schema
export const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'แคลมป์ท่อไฮดรอลิก Pipe Clamp',
  description: 'แคลมป์ท่อคุณภาพสูง มาตรฐาน DIN 3015 มีทั้งพลาสติกและอลูมิเนียม',
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'THB',
    lowPrice: '70',
    highPrice: '9000',
    availability: 'https://schema.org/InStock',
  },
};
