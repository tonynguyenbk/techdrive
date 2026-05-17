import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ChevronRight, Star, Gauge, Zap, Fuel, Users, Ruler } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCarModelBySlug, getCarModels } from "@/lib/api/cars";
import { getArticles } from "@/lib/api/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { formatPrice } from "@/lib/utils/format";
import type { CarVariant } from "@/types/car";

type Props = {
  params: Promise<{ locale: string; brand: string; slug: string }>;
};

const segmentLabels: Record<string, { vi: string; en: string }> = {
  sedan:    { vi: "Sedan",    en: "Sedan" },
  suv:      { vi: "SUV",      en: "SUV" },
  mpv:      { vi: "MPV",      en: "MPV" },
  hatchback:{ vi: "Hatchback",en: "Hatchback" },
  pickup:   { vi: "Bán tải",  en: "Pickup" },
  coupe:    { vi: "Coupe",    en: "Coupe" },
  van:      { vi: "Van",      en: "Van" },
  truck:    { vi: "Xe tải",   en: "Truck" },
};

const fuelLabels: Record<string, { vi: string; en: string }> = {
  gasoline: { vi: "Xăng",     en: "Petrol" },
  diesel:   { vi: "Dầu",      en: "Diesel" },
  electric: { vi: "Điện",     en: "Electric" },
  hybrid:   { vi: "Hybrid",   en: "Hybrid" },
  phev:     { vi: "Plug-in",  en: "PHEV" },
};

const transmissionLabels: Record<string, { vi: string; en: string }> = {
  manual:    { vi: "Số sàn",   en: "Manual" },
  automatic: { vi: "Số tự động",en: "Automatic" },
  cvt:       { vi: "CVT",      en: "CVT" },
  dct:       { vi: "DCT",      en: "DCT" },
};

const drivetrainLabels: Record<string, { vi: string; en: string }> = {
  fwd:     { vi: "Cầu trước", en: "FWD" },
  rwd:     { vi: "Cầu sau",   en: "RWD" },
  awd:     { vi: "4 bánh",    en: "AWD" },
  four_wd: { vi: "4WD",       en: "4WD" },
};

function SpecRow({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-surface-border last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary text-right">{value}</span>
    </div>
  );
}

type Lang = "vi" | "en";

function label(map: Record<string, { vi: string; en: string }>, key: string, fallback: string, lang: Lang): string {
  return (map[key] ?? { vi: fallback, en: fallback })[lang];
}

function VariantCard({ variant, lang }: { variant: CarVariant; lang: Lang }) {
  const fuel = label(fuelLabels, variant.engine.fuel_type, variant.engine.fuel_type, lang);
  const trans = label(transmissionLabels, variant.engine.transmission, variant.engine.transmission, lang);

  return (
    <div className="bg-surface-elevated rounded-xl border border-surface-border p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-bold text-text-primary text-sm leading-tight">{variant.name}</h3>
        <span className="text-primary font-black text-base flex-shrink-0">{formatPrice(variant.price)}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 text-[11px]">
        <span className="px-2 py-0.5 rounded-md bg-surface-card border border-surface-border text-text-secondary">{fuel}</span>
        <span className="px-2 py-0.5 rounded-md bg-surface-card border border-surface-border text-text-secondary">{trans}</span>
        <span className="px-2 py-0.5 rounded-md bg-surface-card border border-surface-border text-text-secondary">
          {variant.engine.horsepower} {lang === "vi" ? "mã lực" : "hp"}
        </span>
        {variant.engine.displacement_cc && (
          <span className="px-2 py-0.5 rounded-md bg-surface-card border border-surface-border text-text-secondary">
            {(variant.engine.displacement_cc / 1000).toFixed(1)}L
          </span>
        )}
      </div>
    </div>
  );
}

export default async function CarDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lang: Lang = locale === "en" ? "en" : "vi";

  const model = await getCarModelBySlug(slug);
  if (!model) notFound();

  const brandName = lang === "en" ? model.brand.name_en : model.brand.name_vi;
  const description = lang === "en" ? model.description_en : model.description_vi;
  const segment = label(segmentLabels, model.segment, model.segment, lang);

  const heroImage = model.thumbnail_url ||
    model.gallery_urls[0] ||
    `https://picsum.photos/seed/${encodeURIComponent(model.slug)}/1200/675`;

  const [{ articles: relatedArticles }, { models: similarModels }] = await Promise.all([
    getArticles({ pageSize: 3, category: "review" }),
    getCarModels({ pageSize: 4, segment: model.segment, brandSlug: model.brand.slug }),
  ]);

  const otherModels = similarModels.filter((m) => m.id !== model.id).slice(0, 3);
  const variants = model.variants ?? [];
  const baseVariant = variants[0];

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5 flex-wrap">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <Link href="/tim-xe" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Tìm xe" : "Find a Car"}
          </Link>
          <ChevronRight size={12} />
          <Link href={`/tim-xe?brand=${model.brand.slug}` as "/"} className="hover:text-text-secondary transition-colors">
            {brandName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{model.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main column */}
          <div>
            {/* Hero image */}
            <div className="relative h-[360px] md:h-[440px] rounded-xl overflow-hidden mb-6">
              <Image
                src={heroImage}
                alt={model.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Brand + segment overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {model.brand.flag_emoji && (
                  <span className="text-2xl">{model.brand.flag_emoji}</span>
                )}
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur text-white/90 border border-white/20">
                  {segment}
                </span>
              </div>

              {/* Rating badge */}
              {model.our_rating !== null && (
                <div className="absolute top-4 right-4 w-14 h-14 rounded-xl bg-black/60 backdrop-blur border border-white/10 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white leading-none">{model.our_rating}</span>
                  <span className="text-[9px] text-white/60 mt-0.5">/10</span>
                </div>
              )}

              {/* Name overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs text-white/60 mb-1">{brandName}</p>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  {model.name}
                  <span className="ml-2 text-lg font-normal text-white/60">
                    {model.year_from}{model.year_to ? `–${model.year_to}` : "+"}
                  </span>
                </h1>
              </div>
            </div>

            {/* Key specs bar */}
            {baseVariant && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                {[
                  { icon: <Zap size={16} />, label: lang === "vi" ? "Công suất" : "Power", value: `${baseVariant.engine.horsepower} ${lang === "vi" ? "mã lực" : "hp"}` },
                  { icon: <Gauge size={16} />, label: lang === "vi" ? "Mô-men xoắn" : "Torque", value: `${baseVariant.engine.torque_nm} Nm` },
                  { icon: <Fuel size={16} />, label: lang === "vi" ? "Nhiên liệu" : "Fuel", value: label(fuelLabels, baseVariant.engine.fuel_type, baseVariant.engine.fuel_type, lang) },
                  { icon: <Users size={16} />, label: lang === "vi" ? "Chỗ ngồi" : "Seats", value: `${baseVariant.dimensions.seating_capacity} ${lang === "vi" ? "chỗ" : "seats"}` },
                  { icon: <Ruler size={16} />, label: lang === "vi" ? "Dài (mm)" : "Length", value: `${baseVariant.dimensions.length_mm}` },
                  { icon: <Star size={16} />, label: lang === "vi" ? "Đánh giá" : "Rating", value: model.our_rating ? `${model.our_rating}/10` : "—" },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="bg-surface-elevated rounded-xl border border-surface-border p-3 text-center">
                    <div className="text-text-muted flex justify-center mb-1">{icon}</div>
                    <div className="text-xs text-text-muted mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-text-primary">{value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-text-primary mb-3">
                  {lang === "vi" ? "Tổng quan" : "Overview"}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            )}

            {/* Variants */}
            {variants.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-text-primary mb-3">
                  {lang === "vi" ? `${variants.length} phiên bản` : `${variants.length} Variants`}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {variants.sort((a, b) => a.price - b.price).map((v) => (
                    <VariantCard key={v.id} variant={v} lang={lang} />
                  ))}
                </div>
              </div>
            )}

            {/* Specs table */}
            {baseVariant && (
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-text-primary mb-3">
                  {lang === "vi" ? "Thông số kỹ thuật" : "Specifications"}
                </h2>
                <div className="bg-surface-elevated rounded-xl border border-surface-border overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-surface-border">
                    {/* Engine specs */}
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                        {lang === "vi" ? "Động cơ & Vận hành" : "Engine & Performance"}
                      </p>
                      <SpecRow
                        label={lang === "vi" ? "Dung tích" : "Displacement"}
                        value={baseVariant.engine.displacement_cc ? `${(baseVariant.engine.displacement_cc / 1000).toFixed(1)}L` : null}
                      />
                      <SpecRow
                        label={lang === "vi" ? "Số xi-lanh" : "Cylinders"}
                        value={baseVariant.engine.cylinders}
                      />
                      <SpecRow
                        label={lang === "vi" ? "Công suất" : "Power"}
                        value={`${baseVariant.engine.horsepower} ${lang === "vi" ? "mã lực" : "hp"}`}
                      />
                      <SpecRow
                        label={lang === "vi" ? "Mô-men xoắn" : "Torque"}
                        value={`${baseVariant.engine.torque_nm} Nm`}
                      />
                      <SpecRow
                        label={lang === "vi" ? "Hộp số" : "Gearbox"}
                        value={label(transmissionLabels, baseVariant.engine.transmission, baseVariant.engine.transmission, lang)}
                      />
                      <SpecRow
                        label={lang === "vi" ? "Dẫn động" : "Drivetrain"}
                        value={label(drivetrainLabels, baseVariant.engine.drivetrain, baseVariant.engine.drivetrain, lang)}
                      />
                      {baseVariant.engine.fuel_consumption_combined > 0 && (
                        <SpecRow
                          label={lang === "vi" ? "Mức tiêu thụ nhiên liệu" : "Fuel Consumption"}
                          value={`${baseVariant.engine.fuel_consumption_combined}L/100km`}
                        />
                      )}
                      {baseVariant.engine.acceleration_0_100 && (
                        <SpecRow
                          label="0–100 km/h"
                          value={`${baseVariant.engine.acceleration_0_100}s`}
                        />
                      )}
                    </div>
                    {/* Dimensions */}
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                        {lang === "vi" ? "Kích thước & Tiện nghi" : "Dimensions & Comfort"}
                      </p>
                      <SpecRow label={lang === "vi" ? "Dài (mm)" : "Length (mm)"} value={baseVariant.dimensions.length_mm} />
                      <SpecRow label={lang === "vi" ? "Rộng (mm)" : "Width (mm)"} value={baseVariant.dimensions.width_mm} />
                      <SpecRow label={lang === "vi" ? "Cao (mm)" : "Height (mm)"} value={baseVariant.dimensions.height_mm} />
                      <SpecRow label={lang === "vi" ? "Chiều dài cơ sở (mm)" : "Wheelbase (mm)"} value={baseVariant.dimensions.wheelbase_mm} />
                      {baseVariant.dimensions.ground_clearance_mm && (
                        <SpecRow label={lang === "vi" ? "Gầm xe (mm)" : "Ground Clearance (mm)"} value={baseVariant.dimensions.ground_clearance_mm} />
                      )}
                      <SpecRow label={lang === "vi" ? "Số chỗ ngồi" : "Seating"} value={`${baseVariant.dimensions.seating_capacity} ${lang === "vi" ? "chỗ" : "seats"}`} />
                      <SpecRow label={lang === "vi" ? "Trọng lượng (kg)" : "Curb Weight (kg)"} value={baseVariant.dimensions.curb_weight_kg} />
                      {baseVariant.dimensions.trunk_volume_liters && (
                        <SpecRow label={lang === "vi" ? "Khoang hành lý (L)" : "Trunk Volume (L)"} value={baseVariant.dimensions.trunk_volume_liters} />
                      )}
                      {baseVariant.dimensions.fuel_tank_liters && (
                        <SpecRow label={lang === "vi" ? "Bình xăng (L)" : "Fuel Tank (L)"} value={baseVariant.dimensions.fuel_tank_liters} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            {baseVariant && (baseVariant.features.safety_features.length > 0 || baseVariant.features.comfort_features.length > 0 || baseVariant.features.tech_features.length > 0) && (
              <div className="mb-6">
                <h2 className="text-lg font-extrabold text-text-primary mb-3">
                  {lang === "vi" ? "Trang bị nổi bật" : "Key Features"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: lang === "vi" ? "An toàn" : "Safety", items: baseVariant.features.safety_features },
                    { title: lang === "vi" ? "Tiện nghi" : "Comfort", items: baseVariant.features.comfort_features },
                    { title: lang === "vi" ? "Công nghệ" : "Technology", items: baseVariant.features.tech_features },
                  ].filter(({ items }) => items.length > 0).map(({ title, items }) => (
                    <div key={title} className="bg-surface-elevated rounded-xl border border-surface-border p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">{title}</p>
                      <ul className="space-y-1.5">
                        {items.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-text-secondary">
                            <span className="text-primary mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-lg font-extrabold text-text-primary mb-4">
                  {lang === "vi" ? "Bài đánh giá xe" : "Car Reviews"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedArticles.map((a) => (
                    <ArticleCard key={a.id} article={a} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Price card */}
            <div className="bg-surface-elevated rounded-xl border border-surface-border p-5 sticky top-20">
              <p className="text-xs text-text-muted mb-1">{lang === "vi" ? "Giá niêm yết" : "Listed Price"}</p>
              <div className="text-2xl font-black text-primary mb-0.5">
                {formatPrice(model.price_from)}
              </div>
              {model.price_to > model.price_from && (
                <p className="text-sm text-text-muted mb-4">
                  {lang === "vi" ? "đến" : "up to"} {formatPrice(model.price_to)}
                </p>
              )}

              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-text-muted">{lang === "vi" ? "Phân khúc" : "Segment"}</span>
                  <span className="font-semibold text-text-primary">{segment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">{lang === "vi" ? "Năm sản xuất" : "Model Year"}</span>
                  <span className="font-semibold text-text-primary">
                    {model.year_from}{model.year_to ? `–${model.year_to}` : "+"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">{lang === "vi" ? "Số phiên bản" : "Variants"}</span>
                  <span className="font-semibold text-text-primary">{variants.length || "—"}</span>
                </div>
                {model.our_rating && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">{lang === "vi" ? "Đánh giá TechDrive" : "TechDrive Rating"}</span>
                    <span className="font-black text-primary">{model.our_rating}/10</span>
                  </div>
                )}
              </div>

              <Link
                href="/bang-gia"
                className="block w-full text-center py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                {lang === "vi" ? "Xem bảng giá đầy đủ" : "View Full Price List"}
              </Link>
            </div>

            {/* Other models from same brand */}
            {otherModels.length > 0 && (
              <div className="bg-surface-elevated rounded-xl border border-surface-border p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3">
                  {lang === "vi" ? `Xe ${brandName} khác` : `Other ${brandName} Models`}
                </p>
                <div className="space-y-3">
                  {otherModels.map((m) => (
                    <Link
                      key={m.id}
                      href={`/tim-xe/${m.brand.slug}/${m.slug}` as "/"}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-card">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.thumbnail_url || `https://picsum.photos/seed/${encodeURIComponent(m.slug)}/160/120`}
                          alt={m.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{m.name}</p>
                        <p className="text-xs text-primary font-bold">{formatPrice(m.price_from)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/tim-xe?brand=${model.brand.slug}` as "/"}
                  className="block mt-3 text-xs text-primary hover:underline text-center"
                >
                  {lang === "vi" ? `Xem tất cả xe ${brandName}` : `All ${brandName} Models`}
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
