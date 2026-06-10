import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getArticles, getFeaturedArticle, getMostViewed } from "@/lib/api/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleHero } from "@/components/articles/ArticleHero";
import { MostViewedSidebar } from "@/components/articles/MostViewedSidebar";
import { NewsFilterBar } from "@/components/articles/NewsFilterBar";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Cập nhật tin tức xe hơi, ra mắt xe mới, thị trường ô tô Việt Nam và thế giới mỗi ngày.",
  openGraph: {
    title: "Tin tức ô tô | TechDrive",
    description: "Cập nhật tin tức xe hơi, ra mắt xe mới, thị trường ô tô Việt Nam và thế giới mỗi ngày.",
    type: "website",
  },
};

const ITEMS_PER_PAGE = 8;

const CATEGORIES = ["all", "news", "advice", "video"] as const;
type Category = (typeof CATEGORIES)[number];

export default async function NewsPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params as { locale: string };
  setRequestLocale(locale);

  const resolvedSearch = await searchParams;
  const pageParam = Array.isArray(resolvedSearch.trang) ? resolvedSearch.trang[0] : resolvedSearch.trang;
  const categoryParam = Array.isArray(resolvedSearch.danh_muc) ? resolvedSearch.danh_muc[0] : resolvedSearch.danh_muc;
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const category = (CATEGORIES.includes(categoryParam as Category)
    ? categoryParam
    : "all") as Category;

  const lang = locale === "en" ? "en" : "vi";

  const apiCategory = category === "all" ? undefined : category;
  const [{ articles: paginated, pageCount: totalPages }, featuredArticle, mostViewed] = await Promise.all([
    getArticles({ page, pageSize: ITEMS_PER_PAGE, category: apiCategory }),
    page === 1 && category === "all" ? getFeaturedArticle() : Promise.resolve(null),
    getMostViewed(5),
  ]);

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text-primary">
            📰 {lang === "vi" ? "Tin tức ô tô" : "Automotive News"}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            {lang === "vi"
              ? "Cập nhật tin tức xe hơi mới nhất tại Việt Nam và thế giới"
              : "Latest automotive news from Vietnam and around the world"}
          </p>
        </div>

        {/* Filter bar */}
        <NewsFilterBar
          locale={locale}
          activeCategory={category}
          basePath="/tin-tuc"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mt-6">
          {/* Main content */}
          <div>
            {/* Hero (page 1 only, no filter) */}
            {featuredArticle && (
              <div className="mb-6">
                <ArticleHero article={featuredArticle} locale={locale} />
              </div>
            )}

            {/* Article grid */}
            {paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paginated.map((article) => (
                    <ArticleCard key={article.id} article={article} locale={locale} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <a
                        key={p}
                        href={`/tin-tuc?trang=${p}${category !== "all" ? `&danh_muc=${category}` : ""}`}
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
                {lang === "vi" ? "Không có bài viết nào." : "No articles found."}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <MostViewedSidebar items={mostViewed} locale={locale} />

            {/* Newsletter CTA */}
            <div
              className="rounded-xl border border-surface-border p-5 text-center"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #111111 100%)" }}
            >
              <div className="text-2xl mb-2">📬</div>
              <h3 className="text-sm font-bold text-text-primary mb-1">
                {lang === "vi" ? "Nhận tin mỗi tuần" : "Weekly Newsletter"}
              </h3>
              <p className="text-xs text-text-muted mb-3">
                {lang === "vi"
                  ? "Tổng hợp tin tức xe hơi nổi bật nhất tuần"
                  : "Top automotive news of the week"}
              </p>
              <NewsletterForm lang={lang} variant="inline" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
