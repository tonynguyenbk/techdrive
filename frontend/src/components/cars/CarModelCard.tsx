import { Link } from "@/i18n/navigation";
import type { CarModel } from "@/types/car";
import { formatPrice } from "@/lib/utils/format";

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

const segmentColors: Record<string, string> = {
  sedan:    "bg-blue-500/20 text-blue-400 border-blue-500/30",
  suv:      "bg-green-500/20 text-green-400 border-green-500/30",
  mpv:      "bg-purple-500/20 text-purple-400 border-purple-500/30",
  hatchback:"bg-orange-500/20 text-orange-400 border-orange-500/30",
  pickup:   "bg-amber-500/20 text-amber-400 border-amber-500/30",
  coupe:    "bg-red-500/20 text-red-400 border-red-500/30",
  van:      "bg-teal-500/20 text-teal-400 border-teal-500/30",
  truck:    "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

type Props = {
  model: CarModel;
  locale?: string;
};

export function CarModelCard({ model, locale = "vi" }: Props) {
  const lang = locale === "en" ? "en" : "vi";
  const brandName = lang === "en" ? model.brand.name_en : model.brand.name_vi;
  const segment = segmentLabels[model.segment] ?? { vi: model.segment, en: model.segment };
  const segColor = segmentColors[model.segment] ?? segmentColors.sedan;
  const priceFrom = formatPrice(model.price_from);
  const priceTo = formatPrice(model.price_to);
  const brandDisplay = model.brand.flag_emoji ?? model.brand.logo_url;
  const isBrandEmoji = brandDisplay && !brandDisplay.startsWith("http") && !brandDisplay.startsWith("/");

  return (
    <Link href={`/tim-xe/${model.brand.slug}/${model.slug}` as "/"}>
      <div className="group bg-surface-elevated rounded-xl border border-surface-border hover:border-primary transition-all duration-200 overflow-hidden cursor-pointer">
        {/* Thumbnail */}
        <div className="relative h-44 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
          {model.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={model.thumbnail_url}
              alt={model.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center opacity-40">
                <div className="text-5xl mb-1">🚗</div>
                <div className="text-xs text-white/40">{model.name}</div>
              </div>
            </div>
          )}
          {/* Segment badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${segColor}`}>
              {segment[lang]}
            </span>
          </div>
          {/* Rating */}
          {model.our_rating !== null && (
            <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/60 backdrop-blur border border-white/10 flex flex-col items-center justify-center">
              <span className="text-sm font-black text-white leading-none">{model.our_rating}</span>
              <span className="text-[8px] text-white/50">/10</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            {isBrandEmoji ? (
              <span className="text-sm">{brandDisplay}</span>
            ) : brandDisplay ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brandDisplay} alt={brandName} className="h-4 object-contain" />
            ) : null}
            <span className="text-xs text-text-muted">{brandName}</span>
          </div>

          <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors leading-snug mb-3">
            {model.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-text-muted mb-0.5">
                {lang === "vi" ? "Giá từ" : "From"}
              </div>
              <div className="text-sm font-bold text-primary">
                {priceFrom}
                {model.price_to > model.price_from && (
                  <span className="text-text-muted font-normal"> – {priceTo}</span>
                )}
              </div>
            </div>
            <div className="text-xs text-text-muted text-right">
              {model.year_from}
              {model.year_to ? `–${model.year_to}` : "+"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
