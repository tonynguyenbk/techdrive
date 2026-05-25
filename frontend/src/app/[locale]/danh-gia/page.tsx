import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getReviews, getMostViewed } from "@/lib/api/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MostViewedSidebar } from "@/components/articles/MostViewedSidebar";
import { ReviewFilterBar } from "@/components/articles/ReviewFilterBar";

export const metadata: Metadata = {
  title: "Đánh giá",
  description: "Đánh giá xe chuyên sâu, lái thử thực tế, chấm điểm từng hạng mục — giúp bạn chọn xe đúng nhất.",
  openGraph: {
    title: "Đánh giá xe | TechDrive",
    description: "Đánh giá xe chuyên sâu, lái thử thực tế, chấm điểm từng hạng mục — giúp bạn chọn xe đúng nhất.",
    type: "website",
  },
};

const ITEMS_PER_PAGE = 9;

const BADGES = ["all", "first_drive", "detailed_review", "long_term", "comparison"] as const;
type BadgeFilter = (typeof BADGES)[number];

export default async function ReviewsPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params as { locale: string };
  setRequestLocale(locale);

  const resolvedSearch = await searchParams;
  const pageParam = Array.isArray(resolvedSearch.trang) ? resolvedSearch.trang[0] : resolvedSearch.trang;
  const loaiParam = Array.isArray(resolvedSearch.loai) ? resolvedSearch.loai[0] : resolvedSearch.loai;
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const badge = (BADGES.includes(loaiParam as BadgeFilter)
    ? loaiParam
    : "all") as BadgeFilter;

  const lang = locale === "en" ? "en" : "vi";

  const apiBadge = badge === "all" ? undefined : badge;
  const [{ articles: paginated, pageCount: totalPages }, mostViewed] = await Promise.all([
    getReviews({ page, pageSize: ITEMS_PER_PAGE, badge: apiBadge }),
    getMostViewed(5),
  ]);

  const topReview = [...paginated].filter(a => a.score !== null).sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text-primary">
            ⭐ {lang === "vi" ? "Đánh giá xe" : "Car Reviews"}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {lang === "vi"
              ? "Đánh giá xe chi tiết, khách quan từ đội ngũ chuyên gia TechDrive"
              : "Detailed, objective car reviews from TechDrive's expert team"}
          </p>
        </div>

        {/* Filter bar */}
        <ReviewFilterBar locale={locale} activeBadge={badge} basePath="/danh-gia" />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-6">
          {/* Main: review grid */}
          <div>
            {paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginated.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      locale={locale}
                      variant="tall"
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <a
                        key={p}
                        href={`/danh-gia?trang=${p}${badge !== "all" ? `&loai=${badge}` : ""}`}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                          p === page
                            ? "bg-primary text-white"
                            : "border border-surface-border text-text-muted hover:border-primary hover:text-primary"
                        }`}
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-text-muted">
                {lang === "vi" ? "Không có bài đánh giá nào." : "No reviews found."}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Top rated */}
            {topReview && (
              <div
                className="rounded-xl border border-surface-border p-4"
                style={{ background: "linear-gradient(135deg, #1a2e1a 0%, #111111 100%)" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-score-good mb-3">
                  {lang === "vi" ? "🏆 Điểm cao nhất" : "🏆 Top Rated"}
                </p>
                <p className="text-sm font-bold text-text-primary leading-snug line-clamp-2">
                  {lang === "vi" ? topReview.title_vi : topReview.title_en}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-2xl font-black text-score-good">{topReview.score}</span>
                  <span className="text-xs text-text-muted">/10</span>
                  <span className="text-xs text-text-muted ml-1">— {topReview.author.name}</span>
                </div>
              </div>
            )}

            <MostViewedSidebar
              items={mostViewed}
              locale={locale}
              title={lang === "vi" ? "🔥 Đánh giá xem nhiều nhất" : "🔥 Most Viewed Reviews"}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
