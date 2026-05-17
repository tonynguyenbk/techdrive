"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Brand } from "@/types/car";

const SEGMENTS = [
  { value: "", labelVi: "Tất cả", labelEn: "All" },
  { value: "sedan",    labelVi: "Sedan",    labelEn: "Sedan" },
  { value: "suv",      labelVi: "SUV",      labelEn: "SUV" },
  { value: "mpv",      labelVi: "MPV",      labelEn: "MPV" },
  { value: "hatchback",labelVi: "Hatchback",labelEn: "Hatchback" },
  { value: "pickup",   labelVi: "Bán tải",  labelEn: "Pickup" },
];

const PRICE_RANGES = [
  { value: "",            labelVi: "Mọi mức giá",    labelEn: "All prices" },
  { value: "0-500",       labelVi: "Dưới 500 triệu", labelEn: "Under 500M" },
  { value: "500-800",     labelVi: "500 – 800 triệu",labelEn: "500–800M" },
  { value: "800-1200",    labelVi: "800tr – 1,2 tỷ", labelEn: "800M–1.2B" },
  { value: "1200-99999",  labelVi: "Trên 1,2 tỷ",    labelEn: "Over 1.2B" },
];

type Props = {
  brands: Brand[];
  locale: string;
};

export function CarFilter({ brands, locale }: Props) {
  const lang = locale === "en" ? "en" : "vi";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const brand   = searchParams.get("brand")    ?? "";
  const segment = searchParams.get("segment")  ?? "";
  const price   = searchParams.get("price")    ?? "";

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // reset to page 1 on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="bg-surface-elevated rounded-xl border border-surface-border p-4 space-y-4">
      {/* Brand */}
      <div>
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
          {lang === "vi" ? "Thương hiệu" : "Brand"}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("brand", "")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              brand === ""
                ? "bg-primary text-white"
                : "bg-surface-card text-text-secondary border border-surface-border hover:border-primary"
            }`}
          >
            {lang === "vi" ? "Tất cả" : "All"}
          </button>
          {brands.map((b) => (
            <button
              key={b.slug}
              onClick={() => updateFilter("brand", b.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                brand === b.slug
                  ? "bg-primary text-white"
                  : "bg-surface-card text-text-secondary border border-surface-border hover:border-primary"
              }`}
            >
              {b.flag_emoji && <span>{b.flag_emoji}</span>}
              {lang === "en" ? b.name_en : b.name_vi}
            </button>
          ))}
        </div>
      </div>

      {/* Segment */}
      <div>
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
          {lang === "vi" ? "Phân khúc" : "Segment"}
        </p>
        <div className="flex flex-wrap gap-2">
          {SEGMENTS.map((s) => (
            <button
              key={s.value}
              onClick={() => updateFilter("segment", s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                segment === s.value
                  ? "bg-primary text-white"
                  : "bg-surface-card text-text-secondary border border-surface-border hover:border-primary"
              }`}
            >
              {lang === "vi" ? s.labelVi : s.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
          {lang === "vi" ? "Mức giá" : "Price range"}
        </p>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((p) => (
            <button
              key={p.value}
              onClick={() => updateFilter("price", p.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                price === p.value
                  ? "bg-primary text-white"
                  : "bg-surface-card text-text-secondary border border-surface-border hover:border-primary"
              }`}
            >
              {lang === "vi" ? p.labelVi : p.labelEn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
