import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getBrands, getCarModels } from "@/lib/api/cars";
import { formatPrice } from "@/lib/utils/format";
import type { CarModel } from "@/types/car";

export const metadata: Metadata = {
  title: "Bảng giá",
  description: "Bảng giá xe ô tô mới nhất tại Việt Nam theo từng hãng: Toyota, Honda, Hyundai, VinFast, Mercedes, BMW và nhiều hãng khác.",
  openGraph: {
    title: "Bảng giá xe | TechDrive",
    description: "Bảng giá xe ô tô mới nhất tại Việt Nam cập nhật hàng tháng.",
    type: "website",
  },
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ brand?: string }>;
};

const segmentLabels: Record<string, { vi: string; en: string }> = {
  sedan:     { vi: "Sedan",    en: "Sedan" },
  suv:       { vi: "SUV",      en: "SUV" },
  mpv:       { vi: "MPV",      en: "MPV" },
  hatchback: { vi: "Hatchback",en: "Hatchback" },
  pickup:    { vi: "Bán tải",  en: "Pickup" },
  coupe:     { vi: "Coupe",    en: "Coupe" },
  van:       { vi: "Van",      en: "Van" },
  truck:     { vi: "Xe tải",   en: "Truck" },
};

function StatusBadge({ status, lang }: { status: string; lang: string }) {
  if (status === "discontinued") {
    return (
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-semibold">
        {lang === "vi" ? "Ngừng bán" : "Discontinued"}
      </span>
    );
  }
  if (status === "upcoming") {
    return (
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold">
        {lang === "vi" ? "Sắp ra mắt" : "Upcoming"}
      </span>
    );
  }
  return null;
}

export default async function BangGiaPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { brand: brandSlug } = await searchParams;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";

  const [brands, { models: allModels }] = await Promise.all([
    getBrands(20),
    getCarModels({ pageSize: 100, status: "", brandSlug }),
  ]);

  // Group models by brand
  const modelsByBrand = new Map<string, { brandName: string; flag: string; models: CarModel[] }>();
  for (const model of allModels) {
    const key = model.brand.slug;
    if (!modelsByBrand.has(key)) {
      modelsByBrand.set(key, {
        brandName: lang === "en" ? model.brand.name_en : model.brand.name_vi,
        flag: model.brand.flag_emoji ?? "",
        models: [],
      });
    }
    modelsByBrand.get(key)!.models.push(model);
  }

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{lang === "vi" ? "Bảng giá xe" : "Car Prices"}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text-primary mb-1">
            {lang === "vi" ? "Bảng giá xe ô tô 2026" : "Car Price Guide 2026"}
          </h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? "Giá xe chính hãng, cập nhật mới nhất từ các đại lý tại Việt Nam"
              : "Official dealer prices, latest updates from dealerships across Vietnam"}
          </p>
        </div>

        {/* Brand filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-surface-border">
          <Link
            href="/bang-gia"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !brandSlug
                ? "bg-primary text-white"
                : "bg-surface-elevated text-text-secondary border border-surface-border hover:border-primary"
            }`}
          >
            {lang === "vi" ? "Tất cả" : "All"}
          </Link>
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/bang-gia?brand=${b.slug}` as "/"}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                brandSlug === b.slug
                  ? "bg-primary text-white"
                  : "bg-surface-elevated text-text-secondary border border-surface-border hover:border-primary"
              }`}
            >
              {b.flag_emoji && <span>{b.flag_emoji}</span>}
              {lang === "en" ? b.name_en : b.name_vi}
            </Link>
          ))}
        </div>

        {/* Price tables */}
        {modelsByBrand.size === 0 ? (
          <div className="text-center py-16 text-text-muted">
            {lang === "vi" ? "Chưa có dữ liệu" : "No data available"}
          </div>
        ) : (
          <div className="space-y-8">
            {[...modelsByBrand.entries()].map(([slug, { brandName, flag, models }]) => (
              <div key={slug}>
                {/* Brand heading */}
                <div className="flex items-center gap-2 mb-3">
                  {flag && <span className="text-xl">{flag}</span>}
                  <h2 className="text-lg font-extrabold text-text-primary">{brandName}</h2>
                  <span className="text-xs text-text-muted">({models.length} mẫu)</span>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-surface-border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-elevated border-b border-surface-border">
                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">
                          {lang === "vi" ? "Mẫu xe" : "Model"}
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider hidden md:table-cell">
                          {lang === "vi" ? "Phân khúc" : "Segment"}
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">
                          {lang === "vi" ? "Giá từ" : "From"}
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider hidden sm:table-cell">
                          {lang === "vi" ? "Giá cao nhất" : "Up to"}
                        </th>
                        <th className="text-center px-4 py-3 text-xs font-bold text-text-muted uppercase tracking-wider hidden lg:table-cell">
                          {lang === "vi" ? "Điểm" : "Score"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border">
                      {models
                        .sort((a, b) => a.price_from - b.price_from)
                        .map((model) => (
                          <tr
                            key={model.id}
                            className="hover:bg-surface-elevated/50 transition-colors group"
                          >
                            <td className="px-4 py-3">
                              <Link href={`/tim-xe/${model.brand.slug}/${model.slug}` as "/"}>
                                <div className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                                  {model.name}
                                </div>
                                <div className="text-xs text-text-muted mt-0.5 flex items-center gap-2">
                                  {model.year_from}
                                  {model.year_to ? `–${model.year_to}` : "+"}
                                  <StatusBadge status={model.status} lang={lang} />
                                </div>
                              </Link>
                            </td>
                            <td className="px-4 py-3 hidden md:table-cell">
                              <span className="text-xs text-text-secondary">
                                {(segmentLabels[model.segment] ?? { vi: model.segment, en: model.segment })[lang]}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="font-bold text-primary text-sm">
                                {formatPrice(model.price_from)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right hidden sm:table-cell">
                              <span className="text-text-secondary text-sm">
                                {model.price_to > model.price_from
                                  ? formatPrice(model.price_to)
                                  : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center hidden lg:table-cell">
                              {model.our_rating !== null ? (
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-black border border-primary/20">
                                  {model.our_rating}
                                </span>
                              ) : (
                                <span className="text-text-muted text-xs">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
