import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Search, ChevronRight, FileText, Car } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { searchContent } from "@/lib/api/search";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Tìm kiếm",
  description: "Tìm kiếm xe ô tô, tin tức, đánh giá và bài viết tư vấn trên TechDrive.",
};

const CATEGORY_LABELS: Record<string, { vi: string }> = {
  news: { vi: "Tin tức" },
  review: { vi: "Đánh giá" },
  advice: { vi: "Tư vấn" },
  comparison: { vi: "So sánh" },
  video: { vi: "Video" },
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);

  const query = q?.trim() ?? "";
  const lang = locale === "en" ? "en" : "vi";

  const results = query.length >= 2 ? await searchContent(query, 12) : null;
  const totalHits = (results?.articles.length ?? 0) + (results?.cars.length ?? 0);

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">
            {lang === "vi" ? "Tìm kiếm" : "Search"}
          </span>
        </nav>

        {/* Search form */}
        <form action="/tim-kiem" method="GET" className="mb-8">
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-3 bg-surface-elevated border border-surface-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
              <Search size={18} className="text-text-muted flex-shrink-0" />
              <input
                name="q"
                defaultValue={query}
                placeholder={lang === "vi" ? "Tìm xe, tin tức, đánh giá..." : "Search cars, news, reviews..."}
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-sm outline-none"
                autoFocus={!query}
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {lang === "vi" ? "Tìm" : "Search"}
            </button>
          </div>
        </form>

        {/* Results */}
        {!query && (
          <div className="text-center py-16 text-text-muted">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">{lang === "vi" ? "Nhập từ khoá để tìm kiếm" : "Enter a keyword to search"}</p>
          </div>
        )}

        {query && query.length < 2 && (
          <div className="text-center py-16 text-text-muted text-sm">
            {lang === "vi" ? "Vui lòng nhập ít nhất 2 ký tự" : "Please enter at least 2 characters"}
          </div>
        )}

        {results && query.length >= 2 && (
          <>
            <p className="text-sm text-text-muted mb-6">
              {lang === "vi"
                ? `Tìm thấy ${totalHits} kết quả cho "${query}"`
                : `${totalHits} results for "${query}"`}
            </p>

            {totalHits === 0 && (
              <div className="text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-text-secondary font-semibold mb-2">
                  {lang === "vi" ? "Không tìm thấy kết quả" : "No results found"}
                </p>
                <p className="text-sm text-text-muted">
                  {lang === "vi"
                    ? "Hãy thử từ khoá khác hoặc kiểm tra lại chính tả"
                    : "Try a different keyword or check the spelling"}
                </p>
              </div>
            )}

            <div className="space-y-10">
              {/* Articles */}
              {results.articles.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-base font-bold text-text-primary mb-4">
                    <FileText size={18} className="text-primary" />
                    {lang === "vi" ? "Bài viết" : "Articles"}
                    <span className="text-xs font-normal text-text-muted">
                      ({results.articles.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/tin-tuc/${article.slug_vi}` as "/"}
                        className="group flex flex-col gap-3 p-4 rounded-xl border border-surface-border bg-surface-elevated hover:border-primary transition-colors"
                      >
                        {article.featured_image && (
                          <div className="aspect-video rounded-lg overflow-hidden bg-surface-card">
                            <img
                              src={article.featured_image}
                              alt={article.title_vi}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {CATEGORY_LABELS[article.category]?.vi ?? article.category}
                          </span>
                          <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors mt-1 line-clamp-2">
                            {lang === "vi" ? article.title_vi : article.title_en}
                          </h3>
                          {article.excerpt_vi && (
                            <p className="text-xs text-text-muted mt-1 line-clamp-2">
                              {article.excerpt_vi}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Cars */}
              {results.cars.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-base font-bold text-text-primary mb-4">
                    <Car size={18} className="text-primary" />
                    {lang === "vi" ? "Xe ô tô" : "Cars"}
                    <span className="text-xs font-normal text-text-muted">
                      ({results.cars.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.cars.map((car) => (
                      <Link
                        key={car.id}
                        href={`/tim-xe/${car.brand_slug}/${car.slug}` as "/"}
                        className="group flex flex-col gap-2 p-3 rounded-xl border border-surface-border bg-surface-elevated hover:border-primary transition-colors"
                      >
                        <div className="aspect-video rounded-lg overflow-hidden bg-surface-card">
                          {car.thumbnail_url ? (
                            <img
                              src={car.thumbnail_url}
                              alt={car.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted">
                              <Car size={24} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-text-muted uppercase">{car.brand_name_vi}</p>
                          <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                            {car.name}
                          </h3>
                          {car.price_from > 0 && (
                            <p className="text-xs font-bold text-primary mt-0.5">
                              {lang === "vi" ? "Từ" : "From"} {formatPrice(car.price_from)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
