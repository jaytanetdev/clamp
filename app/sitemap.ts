import { MetadataRoute } from 'next';
import { siteConfig } from './utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
  ];
}
