import type { Article, ArticleCard } from "@/types/article";
import type { Author } from "@/types/author";
import { fetchStrapi, mediaUrl, type StrapiListResponse, type StrapiSingleResponse, type StrapiMedia } from "./strapi";

// ── Strapi raw shapes ────────────────────────────────────────────────────────

interface StrapiAuthor {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  avatar?: StrapiMedia | null;
  bio_vi?: string;
  bio_en?: string;
  role: "editor" | "journalist" | "contributor";
  facebook?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
}

interface StrapiArticle {
  id: number;
  documentId: string;
  title_vi: string;
  title_en?: string;
  slug_vi: string;
  slug_en?: string;
  excerpt_vi?: string;
  excerpt_en?: string;
  content_vi?: string;
  content_en?: string;
  featured_image?: StrapiMedia | null;
  gallery?: StrapiMedia[] | null;
  category: "news" | "review" | "comparison" | "advice" | "video";
  subcategory?: string | null;
  tags?: string[] | null;
  author?: StrapiAuthor | null;
  score?: number | null;
  score_design?: number | null;
  score_performance?: number | null;
  score_comfort?: number | null;
  score_tech?: number | null;
  score_value?: number | null;
  pros?: string[] | null;
  cons?: string[] | null;
  verdict_vi?: string | null;
  verdict_en?: string | null;
  review_badge?: "first_drive" | "detailed_review" | "long_term" | "comparison" | null;
  is_featured?: boolean;
  reading_time_minutes?: number;
  view_count?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: StrapiMedia | null;
  publishedAt?: string | null;
  updatedAt?: string;
}

// ── Transformers ─────────────────────────────────────────────────────────────

function toAuthor(raw: StrapiAuthor): Author {
  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    avatar: mediaUrl(raw.avatar) || null,
    bio_vi: raw.bio_vi ?? "",
    bio_en: raw.bio_en ?? "",
    role: raw.role,
    social_links: {
      ...(raw.facebook ? { facebook: raw.facebook } : {}),
      ...(raw.twitter ? { twitter: raw.twitter } : {}),
      ...(raw.linkedin ? { linkedin: raw.linkedin } : {}),
    },
  };
}

function toArticleCard(raw: StrapiArticle): ArticleCard {
  return {
    id: String(raw.id),
    title_vi: raw.title_vi,
    title_en: raw.title_en ?? raw.title_vi,
    slug_vi: raw.slug_vi,
    slug_en: raw.slug_en ?? raw.slug_vi,
    excerpt_vi: raw.excerpt_vi ?? "",
    excerpt_en: raw.excerpt_en ?? "",
    featured_image: mediaUrl(raw.featured_image),
    category: raw.category,
    author: raw.author ? toAuthor(raw.author) : fallbackAuthor,
    score: raw.score ?? null,
    published_at: raw.publishedAt ?? raw.updatedAt ?? new Date().toISOString(),
    reading_time_minutes: raw.reading_time_minutes ?? 5,
    is_featured: raw.is_featured ?? false,
    review_badge: raw.review_badge ?? null,
    view_count: raw.view_count ?? 0,
  };
}

function toArticle(raw: StrapiArticle): Article {
  return {
    ...toArticleCard(raw),
    content_vi: raw.content_vi ?? "",
    content_en: raw.content_en ?? "",
    gallery: (raw.gallery ?? []).map(mediaUrl),
    subcategory: raw.subcategory ?? null,
    tags: raw.tags ?? [],
    related_cars: [],
    score_design: raw.score_design ?? null,
    score_performance: raw.score_performance ?? null,
    score_comfort: raw.score_comfort ?? null,
    score_tech: raw.score_tech ?? null,
    score_value: raw.score_value ?? null,
    pros: raw.pros ?? [],
    cons: raw.cons ?? [],
    verdict_vi: raw.verdict_vi ?? null,
    verdict_en: raw.verdict_en ?? null,
    status: raw.publishedAt ? "published" : "draft",
    updated_at: raw.updatedAt ?? raw.publishedAt ?? new Date().toISOString(),
    seo: {
      meta_title: raw.meta_title ?? null,
      meta_description: raw.meta_description ?? null,
      og_image: mediaUrl(raw.og_image) || null,
    },
  };
}

const fallbackAuthor: Author = {
  id: "0",
  name: "TechDrive",
  slug: "techdrive",
  avatar: null,
  bio_vi: "",
  bio_en: "",
  role: "editor",
  social_links: {},
};

// ── Public API ────────────────────────────────────────────────────────────────

const POPULATE = "populate[author][fields][0]=name&populate[author][fields][1]=slug&populate[author][fields][2]=role&populate[featured_image][fields][0]=url&populate[featured_image][fields][1]=alternativeText";
const POPULATE_FULL = [
  "populate[author][fields][0]=name",
  "populate[author][fields][1]=slug",
  "populate[author][fields][2]=bio_vi",
  "populate[author][fields][3]=bio_en",
  "populate[author][fields][4]=role",
  "populate[author][populate][avatar][fields][0]=url",
  "populate[author][populate][avatar][fields][1]=alternativeText",
  "populate[featured_image][fields][0]=url",
  "populate[featured_image][fields][1]=alternativeText",
  "populate[gallery][fields][0]=url",
  "populate[gallery][fields][1]=alternativeText",
  "populate[og_image][fields][0]=url",
].join("&");

export async function getFeaturedArticle(): Promise<ArticleCard | null> {
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiArticle>>(
      `/articles?filters[is_featured][$eq]=true&filters[publishedAt][$notNull]=true&sort=publishedAt:desc&pagination[limit]=1&${POPULATE}`
    );
    const raw = res.data[0];
    return raw ? toArticleCard(raw) : null;
  } catch {
    return null;
  }
}

export async function getArticles(options: {
  page?: number;
  pageSize?: number;
  category?: string;
  excludeId?: string;
  sort?: string;
} = {}): Promise<{ articles: ArticleCard[]; total: number; pageCount: number }> {
  const { page = 1, pageSize = 8, category, excludeId, sort = "publishedAt:desc" } = options;

  const filters: string[] = ["filters[publishedAt][$notNull]=true"];
  if (category && category !== "all") {
    filters.push(`filters[category][$eq]=${category}`);
  }
  if (excludeId) {
    filters.push(`filters[id][$ne]=${excludeId}`);
  }

  const qs = [
    ...filters,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    `sort=${sort}`,
    POPULATE,
  ].join("&");

  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiArticle>>(`/articles?${qs}`);
    return {
      articles: res.data.map(toArticleCard),
      total: res.meta.pagination.total,
      pageCount: res.meta.pagination.pageCount,
    };
  } catch {
    return { articles: [], total: 0, pageCount: 0 };
  }
}

export async function getArticleBySlug(slug: string, locale: "vi" | "en" = "vi"): Promise<Article | null> {
  const field = locale === "en" ? "slug_en" : "slug_vi";
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiArticle>>(
      `/articles?filters[${field}][$eq]=${encodeURIComponent(slug)}&${POPULATE_FULL}&pagination[limit]=1`
    );
    const raw = res.data[0];
    return raw ? toArticle(raw) : null;
  } catch {
    return null;
  }
}

export async function getReviews(options: {
  page?: number;
  pageSize?: number;
  badge?: string;
} = {}): Promise<{ articles: ArticleCard[]; total: number; pageCount: number }> {
  const { page = 1, pageSize = 9, badge } = options;
  const filters = [
    "filters[publishedAt][$notNull]=true",
    "filters[category][$eq]=review",
  ];
  if (badge && badge !== "all") {
    filters.push(`filters[review_badge][$eq]=${badge}`);
  }
  const qs = [...filters, `pagination[page]=${page}`, `pagination[pageSize]=${pageSize}`, "sort=publishedAt:desc", POPULATE].join("&");
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiArticle>>(`/articles?${qs}`);
    return {
      articles: res.data.map(toArticleCard),
      total: res.meta.pagination.total,
      pageCount: res.meta.pagination.pageCount,
    };
  } catch {
    return { articles: [], total: 0, pageCount: 0 };
  }
}

export async function getMostViewed(limit = 5): Promise<ArticleCard[]> {
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiArticle>>(
      `/articles?filters[publishedAt][$notNull]=true&sort=view_count:desc&pagination[limit]=${limit}&${POPULATE}`
    );
    return res.data.map(toArticleCard);
  } catch {
    return [];
  }
}

export async function getRelatedArticles(category: string, excludeId: string, limit = 3): Promise<ArticleCard[]> {
  const { articles } = await getArticles({ category, excludeId, pageSize: limit });
  return articles;
}
