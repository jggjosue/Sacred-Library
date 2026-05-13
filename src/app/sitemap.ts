import { MetadataRoute } from 'next'
import { DEVOTIONAL_CATALOG } from '@/lib/devotional-catalog'
import { PLAN_READINGS } from '@/lib/plan-readings'

const BASE_URL = 'https://sacredslibrary.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/bible`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/devotions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/library`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/plans`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/scripture`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]

  const devotionalRoutes: MetadataRoute.Sitemap = DEVOTIONAL_CATALOG.map((item) => ({
    url: `${BASE_URL}/library/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const planRoutes: MetadataRoute.Sitemap = Object.keys(PLAN_READINGS).map((planId) => ({
    url: `${BASE_URL}/plans/${planId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...devotionalRoutes, ...planRoutes]
}
