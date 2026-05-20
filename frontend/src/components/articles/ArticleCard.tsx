import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";
import type { ArticleCard as ArticleCardType } from "@/types/article";
import { getArticleImage } from "@/lib/utils/article-images";
import { ArticleBadge } from "./ArticleBadge";
import { ScoreBadge } from "./ScoreBadge";

type Props = {
  article: ArticleCardType;
  locale?: string;
  variant?: "default" | "compact" | "tall";
  className?: string;
};

export function ArticleCard({ article, locale = "vi", variant = "default", className }: Props) {
  const lang = locale === "en" ? "en" : "vi";
  const title = lang === "vi" ? article.title_vi : article.title_en;
  const slug = lang === "vi" ? article.slug_vi : article.slug_en;
  const href = article.category === "review" ? `/danh-gia/${slug}` : `/tin-tuc/${slug}`;
  const imgHeight = variant === "tall" ? "h-56" : "h-44";
  const imageSrc = article.featured_image || getArticleImage(article.slug_vi) || `https://picsum.photos/seed/${encodeURIComponent(article.slug_vi)}/800/450`;

  return (
    <Link href={href as "/"} className={cn("group block", className)}>
      <article className="h-full bg-surface-card rounded-card border border-surface-border hover:border-surface-border-hover transition-all duration-200 hover:-translate-y-0.5 overflow-hidden">
        {/* Image */}
        <div className={cn("relative overflow-hidden", imgHeight)}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <ArticleBadge
              category={article.category}
              reviewBadge={article.review_badge}
              locale={locale}
            />
          </div>

          {/* Score */}
          {article.score !== null && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <ScoreBadge score={article.score} />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-3.5">
          <h3 className="text-sm font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-2.5 text-[11px] text-text-muted">
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{formatDate(article.published_at, locale === "en" ? "en-US" : "vi-VN")}</span>
            {article.reading_time_minutes > 0 && (
              <>
                <span>·</span>
                <span>{article.reading_time_minutes} phút</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
