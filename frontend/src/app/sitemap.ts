import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/api/articles";

const BASE = "https://techdrive.vn";

const STATIC_ROUTES = [
  { url: BASE, priority: 1.0, changeFrequency: "daily" as const },
  { url: `${BASE}/tin-tuc`, priority: 0.9, changeFrequency: "daily" as const },
  { url: `${BASE}/danh-gia`, priority: 0.9, changeFrequency: "daily" as const },
  { url: `${BASE}/so-sanh`, priority: 0.8, changeFrequency: "weekly" as const },
  { url: `${BASE}/tim-xe`, priority: 0.8, changeFrequency: "weekly" as const },
  { url: `${BASE}/bang-gia`, priority: 0.8, changeFrequency: "daily" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articleEntries: MetadataRoute.Sitemap = [];

  try {
    const { articles } = await getArticles({ pageSize: 100, sort: "publishedAt:desc" });
    articleEntries = articles.map((a) => ({
      url: `${BASE}/danh-gia/${a.slug_vi}`,
      lastModified: a.published_at,
      changeFrequency: "monthly" as const,
      priority: a.is_featured ? 0.9 : 0.7,
    }));
  } catch {
    // Strapi offline (Render cold start) — return static routes only
  }

  return [...STATIC_ROUTES, ...articleEntries];
}
