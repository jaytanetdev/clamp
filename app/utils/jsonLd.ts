import { siteConfig } from './seo';

// เบอร์โทรรูปแบบสากล (E.164) สำหรับ structured data
const TEL = '+66982846992';

// Organization Schema
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo/logo.webp`,
  image: `${siteConfig.url}/product/banner-1.png`,
  telephone: TEL,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: TEL,
    contactType: 'sales',
    availableLanguage: ['Thai', 'English'],
  },
  sameAs: [siteConfig.links.line, siteConfig.links.shopee, siteConfig.links.lazada],
};

// WebSite Schema
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: 'th-TH',
  publisher: { '@id': `${siteConfig.url}/#organization` },
};
