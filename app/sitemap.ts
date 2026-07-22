import type { MetadataRoute } from 'next';
import { brand } from '@/lib/site';
import { tours } from '@/lib/tours';
import { destinations } from '@/lib/destinations';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.url;
  const now = new Date();

  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/tours', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/destinations', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/fleet', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/gallery', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
    { url: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  const tourRoutes = tours.map((t) => ({
    url: `/tours/${t.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const destRoutes = destinations.map((d) => ({
    url: `/destinations/${d.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...tourRoutes, ...destRoutes].map((r) => ({
    url: `${base}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
