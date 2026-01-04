import type { Metadata } from 'next';

const BASE_URL = 'https://jtlhydraulic.techhousesoft.com';

export const siteConfig = {
  name: 'JTL Hydraulic',
  description: 'จำหน่ายแคลมป์ท่อ แคลมป์ไฮดรอลิก คุณภาพสูง มาตรฐาน DIN 3015',
  url: BASE_URL,
  ogImage: `${BASE_URL}/og-image.jpg`,
  links: {
    line: 'https://line.me/R/ti/p/@934bnkrg',
    shopee: 'https://shopee.co.th/jtl.hydraulic',
    lazada: 'https://www.lazada.co.th/shop/jtl-hydraulic/',
  },
};

export const metadata: Metadata = {
  // Basic
  title: {
    default: 'JTL Hydraulic - แคลมป์ท่อ ไฮดรอลิก คุณภาพสูง มาตรฐานเยอรมัน',
    template: '%s | JTL Hydraulic',
  },
  description:
    'จำหน่ายแคลมป์ท่อ แคลมป์ไฮดรอลิก Pipe Clamp คุณภาพสูง มาตรฐาน DIN 3015 ทั้งพลาสติกและอลูมิเนียม รุ่น Standard และ Heavy ครบทุกขนาด ราคาโรงงาน จัดส่งทั่วประเทศ',
  keywords: [
    'แคลมป์ท่อ',
    'แคลมป์ไฮดรอลิก',
    'pipe clamp',
    'hydraulic clamp',
    'DIN 3015',
    'แคลมป์พลาสติก',
    'แคลมป์อลูมิเนียม',
    'clamp ท่อ',
    'ที่รัดท่อ',
    'อุปกรณ์ไฮดรอลิก',
    'JTL Hydraulic',
    'แคลมป์ราคาถูก',
    'แคลมป์คุณภาพ',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (Facebook, LINE)
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'JTL Hydraulic - แคลมป์ท่อ ไฮดรอลิก คุณภาพสูง',
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'JTL Hydraulic - แคลมป์ท่อไฮดรอลิก',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'JTL Hydraulic - แคลมป์ท่อ ไฮดรอลิก คุณภาพสูง',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // Verification (เพิ่มหลังจาก verify กับ Google)
  // verification: {
  //   google: 'your-google-verification-code',
  // },

  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
  },

  // Category
  category: 'Industrial Equipment',
};
