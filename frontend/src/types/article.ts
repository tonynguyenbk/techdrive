import type { Author } from "./author";
import type { CarModel } from "./car";

export type ArticleCategory =
  | "news"
  | "review"
  | "comparison"
  | "advice"
  | "video";

export type ArticleStatus = "draft" | "review" | "published" | "archived";

export type ReviewBadge =
  | "first_drive"
  | "detailed_review"
  | "long_term"
  | "comparison";

export type Article = {
  id: string;
  title_vi: string;
  title_en: string;
  slug_vi: string;
  slug_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  featured_image: string;
  gallery: string[];
  category: ArticleCategory;
  subcategory: string | null;
  tags: string[];
  author: Author;
  related_cars: CarModel[];
  score: number | null;
  score_design: number | null;
  score_performance: number | null;
  score_comfort: number | null;
  score_tech: number | null;
  score_value: number | null;
  pros: string[];
  cons: string[];
  verdict_vi: string | null;
  verdict_en: string | null;
  status: ArticleStatus;
  published_at: string;
  updated_at: string;
  reading_time_minutes: number;
  is_featured: boolean;
  review_badge: ReviewBadge | null;
  seo: {
    meta_title: string | null;
    meta_description: string | null;
    og_image: string | null;
  };
  view_count: number;
};

export type ArticleCard = Pick<
  Article,
  | "id"
  | "title_vi"
  | "title_en"
  | "slug_vi"
  | "slug_en"
  | "excerpt_vi"
  | "excerpt_en"
  | "featured_image"
  | "category"
  | "author"
  | "score"
  | "published_at"
  | "reading_time_minutes"
  | "is_featured"
  | "review_badge"
  | "view_count"
>;
