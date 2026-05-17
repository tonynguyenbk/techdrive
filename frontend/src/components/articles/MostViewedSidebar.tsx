import { Link } from "@/i18n/navigation";
import { formatNumber } from "@/lib/utils/format";
import { Eye } from "lucide-react";

type Item = {
  id: string;
  title_vi: string;
  title_en: string;
  slug_vi: string;
  view_count: number;
};

type Props = {
  items: Item[];
  locale?: string;
  title?: string;
};

export function MostViewedSidebar({ items, locale = "vi", title }: Props) {
  const lang = locale === "en" ? "en" : "vi";
  const sectionTitle = title ?? (lang === "vi" ? "🔥 Xem nhiều nhất" : "🔥 Most Viewed");

  return (
    <div>
      <p className="text-sm font-bold text-primary mb-3">{sectionTitle}</p>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <Link
            key={item.id}
            href={`/tin-tuc/${item.slug_vi}` as "/"}
            className="group flex gap-3 items-start bg-surface-card rounded-lg p-3 border border-surface-border hover:border-surface-border-hover transition-all"
          >
            <span className="text-2xl font-black text-primary min-w-[28px] leading-none mt-0.5">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-text-secondary leading-snug line-clamp-2 group-hover:text-text-primary transition-colors">
                {lang === "vi" ? item.title_vi : item.title_en}
              </p>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-text-muted">
                <Eye size={10} />
                <span>{formatNumber(item.view_count)} lượt xem</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
