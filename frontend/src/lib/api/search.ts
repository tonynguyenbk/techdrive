import { fetchStrapi, mediaUrl, type StrapiListResponse, type StrapiMedia } from "./strapi";

interface StrapiSearchArticle {
  id: number;
  title_vi: string;
  title_en?: string;
  slug_vi: string;
  category: string;
  excerpt_vi?: string;
  featured_image?: StrapiMedia | null;
  publishedAt?: string | null;
}

interface StrapiSearchCar {
  id: number;
  name: string;
  slug: string;
  segment: string;
  price_from?: number;
  brand?: { name_vi: string; name_en: string; slug: string } | null;
  gallery?: StrapiMedia[] | null;
}

export interface ArticleHit {
  id: string;
  title_vi: string;
  title_en: string;
  slug_vi: string;
  category: string;
  excerpt_vi: string;
  featured_image: string;
}

export interface CarHit {
  id: string;
  name: string;
  slug: string;
  brand_slug: string;
  brand_name_vi: string;
  segment: string;
  price_from: number;
  thumbnail_url: string;
}

export interface SearchResults {
  articles: ArticleHit[];
  cars: CarHit[];
}

const ARTICLE_POPULATE =
  "populate[featured_image][fields][0]=url&populate[author][fields][0]=name&fields[0]=title_vi&fields[1]=title_en&fields[2]=slug_vi&fields[3]=category&fields[4]=excerpt_vi&fields[5]=publishedAt";

const CAR_POPULATE =
  "populate[brand][fields][0]=name_vi&populate[brand][fields][1]=name_en&populate[brand][fields][2]=slug&populate[gallery][fields][0]=url&fields[0]=name&fields[1]=slug&fields[2]=segment&fields[3]=price_from";

export async function searchContent(q: string, limit = 5): Promise<SearchResults> {
  const encoded = encodeURIComponent(q);

  const [articlesRes, carsRes] = await Promise.allSettled([
    fetchStrapi<StrapiListResponse<StrapiSearchArticle>>(
      `/articles?_q=${encoded}&filters[publishedAt][$notNull]=true&pagination[limit]=${limit}&${ARTICLE_POPULATE}`,
      { next: { revalidate: 30 } }
    ),
    fetchStrapi<StrapiListResponse<StrapiSearchCar>>(
      `/car-models?_q=${encoded}&pagination[limit]=${limit}&${CAR_POPULATE}`,
      { next: { revalidate: 30 } }
    ),
  ]);

  const articles =
    articlesRes.status === "fulfilled"
      ? articlesRes.value.data.map((a) => ({
          id: String(a.id),
          title_vi: a.title_vi,
          title_en: a.title_en ?? a.title_vi,
          slug_vi: a.slug_vi,
          category: a.category,
          excerpt_vi: a.excerpt_vi ?? "",
          featured_image: mediaUrl(a.featured_image),
        }))
      : [];

  const cars =
    carsRes.status === "fulfilled"
      ? carsRes.value.data.map((c) => ({
          id: String(c.id),
          name: c.name,
          slug: c.slug,
          brand_slug: c.brand?.slug ?? "",
          brand_name_vi: c.brand?.name_vi ?? "",
          segment: c.segment,
          price_from: c.price_from ?? 0,
          thumbnail_url: c.gallery?.[0] ? mediaUrl(c.gallery[0]) : "",
        }))
      : [];

  return { articles, cars };
}
