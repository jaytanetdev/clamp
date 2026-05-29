import { MetadataRoute } from 'next';
import { siteConfig } from './utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // หมายเหตุ: Google ไม่ถือว่า URL ที่มี #fragment เป็นหน้าแยก
  // จึงใส่เฉพาะหน้าจริง (homepage) เท่านั้น
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
