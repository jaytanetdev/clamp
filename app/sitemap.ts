import { MetadataRoute } from 'next';
import { siteConfig } from './utils/seo';
import { catalog } from './data/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...catalog.map(({ slug }) => ({ url: `${siteConfig.url}/products/${slug}` })),
  ];
}
