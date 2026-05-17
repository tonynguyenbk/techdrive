import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils/format";
import type { ArticleCard } from "@/types/article";
import { ArticleBadge } from "./ArticleBadge";
import { ScoreBadge } from "./ScoreBadge";

type Props = {
  article: ArticleCard;
  locale?: string;
};

export function ArticleHero({ article, locale = "vi" }: Props) {
  const lang = locale === "en" ? "en" : "vi";
  const title = lang === "vi" ? article.title_vi : article.title_en;
  const excerpt = lang === "vi" ? article.excerpt_vi : article.excerpt_en;
  const slug = lang === "vi" ? article.slug_vi : article.slug_en;
  const href = article.category === "review" ? `/danh-gia/${slug}` : `/tin-tuc/${slug}`;

  const imageSrc = article.featured_image ||
    `https://picsum.photos/seed/${encodeURIComponent(article.slug_vi)}/1200/675`;

  return (
    <Link href={href as "/"} className="group block">
      <div className="relative h-[480px] md:h-[520px] rounded-xl overflow-hidden">
        {/* Background */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Top controls */}
        <div className="absolute top-5 left-5 right-5 z-10 flex items-start justify-between">
          <ArticleBadge
            category={article.category}
            reviewBadge={article.review_badge}
            locale={locale}
            size="md"
          />
          {article.score !== null && (
            <ScoreBadge score={article.score} size="lg" />
          )}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            {lang === "vi" ? "Bài viết nổi bật" : "Featured"}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight max-w-2xl group-hover:text-primary/90 transition-colors">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white/70 max-w-xl line-clamp-2 hidden md:block">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{formatDate(article.published_at, locale === "en" ? "en-US" : "vi-VN")}</span>
            <span>·</span>
            <span>{article.reading_time_minutes} phút đọc</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
