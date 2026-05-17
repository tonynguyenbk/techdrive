import { cn } from "@/lib/utils/cn";
import type { ArticleCategory, ReviewBadge } from "@/types/article";

const categoryColors: Record<ArticleCategory, string> = {
  news: "bg-badge-news",
  review: "bg-badge-review",
  comparison: "bg-badge-compare",
  advice: "bg-primary",
  video: "bg-badge-compare",
};

const badgeLabels: Record<ReviewBadge, { vi: string; en: string }> = {
  first_drive: { vi: "Lái thử lần đầu", en: "First Drive" },
  detailed_review: { vi: "Đánh giá chi tiết", en: "Detailed Review" },
  long_term: { vi: "Dài hạn", en: "Long-term" },
  comparison: { vi: "So sánh", en: "Comparison" },
};

const categoryLabels: Record<ArticleCategory, { vi: string; en: string }> = {
  news: { vi: "Tin tức", en: "News" },
  review: { vi: "Đánh giá", en: "Review" },
  comparison: { vi: "So sánh", en: "Comparison" },
  advice: { vi: "Tư vấn", en: "Advice" },
  video: { vi: "Video", en: "Video" },
};

type Props = {
  category: ArticleCategory;
  reviewBadge?: ReviewBadge | null;
  locale?: string;
  size?: "sm" | "md";
};

export function ArticleBadge({ category, reviewBadge, locale = "vi", size = "sm" }: Props) {
  const lang = locale === "en" ? "en" : "vi";
  const label = reviewBadge
    ? badgeLabels[reviewBadge][lang]
    : categoryLabels[category][lang];
  const color = categoryColors[category];

  return (
    <span
      className={cn(
        "inline-block font-bold uppercase tracking-wider text-white rounded",
        color,
        size === "sm" ? "text-[10px] px-2.5 py-1" : "text-[11px] px-3 py-1.5"
      )}
    >
      {label}
    </span>
  );
}
