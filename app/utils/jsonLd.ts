import { siteConfig } from './seo';
import { faqs } from '../modules/Home/components/FaqSection';

// FAQ Schema (มีสิทธิ์แสดงคำถาม-คำตอบใต้ผลค้นหา + ช่วยกินคำค้นแบบคำถาม)
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

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

// WebSite Schema (ช่วยให้ Google เข้าใจชื่อเว็บ + แสดง sitelinks)
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: 'th-TH',
  publisher: { '@id': `${siteConfig.url}/#organization` },
};

// LocalBusiness / Store Schema (สำคัญมากสำหรับการค้นหาแบบ local + แบรนด์)
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  '@id': `${siteConfig.url}/#store`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/product/banner-1.png`,
  logo: `${siteConfig.url}/logo/logo.webp`,
  telephone: TEL,
  priceRange: '฿฿',
  currenciesAccepted: 'THB',
  areaServed: { '@type': 'Country', name: 'Thailand' },
  sameAs: [siteConfig.links.line, siteConfig.links.shopee, siteConfig.links.lazada],
  // TODO: เพิ่ม address + openingHours เมื่อได้ข้อมูลจริง เพื่อปลดล็อก Local rich result เต็มรูปแบบ
};

// Product Schema
export const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'แคลมป์ท่อไฮดรอลิก Pipe Clamp',
  description: 'แคลมป์ท่อคุณภาพสูง มาตรฐาน DIN 3015 มีทั้งพลาสติกและอลูมิเนียม',
  image: `${siteConfig.url}/product/banner-1.png`,
  url: siteConfig.url,
  category: 'Hydraulic Pipe Clamp',
  brand: {
    '@type': 'Brand',
    name: siteConfig.name,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '100',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'THB',
    lowPrice: '70',
    highPrice: '9000',
    availability: 'https://schema.org/InStock',
    url: siteConfig.url,
  },
};
