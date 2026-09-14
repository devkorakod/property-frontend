import type { MetadataRoute } from 'next';
import { listProperties, listProjects } from '@/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/properties`, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/projects`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const properties: any[] = [];
  for (let page = 1; page <= 10; page++) {
    const { items, meta } = await listProperties({ limit: 50, page }).catch(() => ({ items: [] as any[], meta: undefined }));
    properties.push(...items);
    if (!meta || page >= meta.totalPages) break;
  }
  const projects = await listProjects().catch(() => [] as any[]);

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p: any) => ({
    url: `${SITE_URL}/properties/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p: any) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes];
}
