import { setRequestLocale } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCarModels, getBrands } from "@/lib/api/cars";
import { CarModelCard } from "@/components/cars/CarModelCard";
import { CarFilter } from "./CarFilter";
import { CarPagination } from "./CarPagination";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ brand?: string; segment?: string; price?: string; page?: string }>;
};

function parsePriceRange(price?: string): { minPrice?: number; maxPrice?: number } {
  if (!price) return {};
  const [min, max] = price.split("-").map(Number);
  return {
    minPrice: min > 0 ? min * 1_000_000 : undefined,
    maxPrice: max < 99999 ? max * 1_000_000 : undefined,
  };
}

export default async function TimXePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { brand, segment, price, page: pageStr } = await searchParams;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";
  const page = Number(pageStr ?? 1);
  const { minPrice, maxPrice } = parsePriceRange(price);

  const [{ models, total, pageCount }, brands] = await Promise.all([
    getCarModels({ page, pageSize: 12, brandSlug: brand, segment, minPrice, maxPrice }),
    getBrands(20),
  ]);

  const hasFilters = !!(brand || segment || price);

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{lang === "vi" ? "Tìm xe" : "Find a Car"}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text-primary mb-1">
            {lang === "vi" ? "Tìm xe theo nhu cầu" : "Find Your Perfect Car"}
          </h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? `${total} mẫu xe đang bán tại Việt Nam`
              : `${total} models currently on sale in Vietnam`}
          </p>
        </div>

        {/* Filters */}
        <CarFilter brands={brands} locale={locale} />

        {/* Results header */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <p className="text-sm text-text-secondary">
            {hasFilters
              ? lang === "vi"
                ? `Tìm thấy ${total} xe`
                : `${total} cars found`
              : lang === "vi"
                ? `Tất cả ${total} mẫu xe`
                : `All ${total} models`}
          </p>
          {hasFilters && (
            <Link
              href="/tim-xe"
              className="text-xs text-primary hover:underline"
            >
              {lang === "vi" ? "Xóa bộ lọc" : "Clear filters"}
            </Link>
          )}
        </div>

        {/* Car grid */}
        {models.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {models.map((model) => (
                <CarModelCard key={model.id} model={model} locale={locale} />
              ))}
            </div>
            {pageCount > 1 && (
              <div className="mt-8">
                <CarPagination currentPage={page} totalPages={pageCount} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-text-secondary font-semibold mb-2">
              {lang === "vi" ? "Không tìm thấy xe phù hợp" : "No matching cars found"}
            </p>
            <p className="text-sm text-text-muted mb-4">
              {lang === "vi" ? "Hãy thử thay đổi bộ lọc" : "Try adjusting your filters"}
            </p>
            <Link href="/tim-xe" className="text-primary text-sm hover:underline">
              {lang === "vi" ? "Xem tất cả xe" : "View all cars"}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
