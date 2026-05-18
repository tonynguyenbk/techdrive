"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Plus, X, ChevronDown, ChevronUp, Check, Minus } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import type { CarModel } from "@/types/car";

// ── Label maps ─────────────────────────────────────────────────────────────────

const SEG: Record<string, { vi: string; en: string }> = {
  sedan: { vi: "Sedan", en: "Sedan" }, suv: { vi: "SUV", en: "SUV" },
  mpv: { vi: "MPV", en: "MPV" }, hatchback: { vi: "Hatchback", en: "Hatchback" },
  pickup: { vi: "Bán tải", en: "Pickup" }, coupe: { vi: "Coupe", en: "Coupe" },
  van: { vi: "Van", en: "Van" }, truck: { vi: "Xe tải", en: "Truck" },
};
const FUEL: Record<string, { vi: string; en: string }> = {
  gasoline: { vi: "Xăng", en: "Gasoline" }, diesel: { vi: "Dầu diesel", en: "Diesel" },
  electric: { vi: "Điện", en: "Electric" }, hybrid: { vi: "Hybrid", en: "Hybrid" },
  phev: { vi: "PHEV", en: "PHEV" },
};
const TRANS: Record<string, { vi: string; en: string }> = {
  manual: { vi: "Số sàn", en: "Manual" }, automatic: { vi: "Số tự động", en: "Automatic" },
  cvt: { vi: "CVT", en: "CVT" }, dct: { vi: "Ly hợp kép (DCT)", en: "Dual-clutch (DCT)" },
};
const DRIVE: Record<string, { vi: string; en: string }> = {
  fwd: { vi: "Cầu trước (FWD)", en: "FWD" }, rwd: { vi: "Cầu sau (RWD)", en: "RWD" },
  awd: { vi: "AWD", en: "AWD" }, four_wd: { vi: "4WD", en: "4WD" },
};

// ── Spec row types ─────────────────────────────────────────────────────────────

type Lang = "vi" | "en";

type SpecRow = {
  key: string;
  labelVi: string;
  labelEn: string;
  betterWhen?: "higher" | "lower";
  getValue: (car: CarModel, lang: Lang) => string;
  numericValue?: (car: CarModel) => number | null;
};

type SpecGroup = {
  key: string;
  titleVi: string;
  titleEn: string;
  rows: SpecRow[];
};

const v1 = (car: CarModel) => car.variants?.[0];

const GROUPS: SpecGroup[] = [
  {
    key: "overview", titleVi: "Tổng quan", titleEn: "Overview",
    rows: [
      { key: "brand", labelVi: "Hãng xe", labelEn: "Brand",
        getValue: (c, lang) => lang === "vi" ? c.brand.name_vi : c.brand.name_en },
      { key: "segment", labelVi: "Phân khúc", labelEn: "Segment",
        getValue: (c, lang) => (SEG[c.segment] ?? { vi: c.segment, en: c.segment })[lang] },
      { key: "year", labelVi: "Năm sản xuất", labelEn: "Model year",
        getValue: (c) => c.year_from ? String(c.year_from) : "—" },
      { key: "price_from", labelVi: "Giá từ", labelEn: "Starting price",
        betterWhen: "lower",
        getValue: (c) => c.price_from ? formatPrice(c.price_from) : "—",
        numericValue: (c) => c.price_from || null },
      { key: "price_to", labelVi: "Giá cao nhất", labelEn: "Top price",
        getValue: (c) => c.price_to > c.price_from ? formatPrice(c.price_to) : "—" },
      { key: "rating", labelVi: "Điểm TechDrive", labelEn: "TechDrive score",
        betterWhen: "higher",
        getValue: (c) => c.our_rating !== null ? `${c.our_rating} / 10` : "—",
        numericValue: (c) => c.our_rating },
    ],
  },
  {
    key: "engine", titleVi: "Động cơ", titleEn: "Engine",
    rows: [
      { key: "fuel", labelVi: "Nhiên liệu", labelEn: "Fuel type",
        getValue: (c, lang) => { const t = v1(c)?.engine.fuel_type; return t ? (FUEL[t] ?? { vi: t, en: t })[lang] : "—"; } },
      { key: "displacement", labelVi: "Dung tích xy-lanh", labelEn: "Displacement",
        getValue: (c) => { const d = v1(c)?.engine.displacement_cc; return d ? `${(d / 1000).toFixed(1)} L` : "—"; } },
      { key: "hp", labelVi: "Công suất", labelEn: "Horsepower",
        betterWhen: "higher",
        getValue: (c) => { const hp = v1(c)?.engine.horsepower; return hp ? `${hp} mã lực` : "—"; },
        numericValue: (c) => v1(c)?.engine.horsepower ?? null },
      { key: "torque", labelVi: "Mô-men xoắn", labelEn: "Torque",
        betterWhen: "higher",
        getValue: (c) => { const t = v1(c)?.engine.torque_nm; return t ? `${t} Nm` : "—"; },
        numericValue: (c) => v1(c)?.engine.torque_nm ?? null },
      { key: "trans", labelVi: "Hộp số", labelEn: "Transmission",
        getValue: (c, lang) => { const t = v1(c)?.engine.transmission; return t ? (TRANS[t] ?? { vi: t, en: t })[lang] : "—"; } },
      { key: "drive", labelVi: "Dẫn động", labelEn: "Drivetrain",
        getValue: (c, lang) => { const d = v1(c)?.engine.drivetrain; return d ? (DRIVE[d] ?? { vi: d, en: d })[lang] : "—"; } },
      { key: "fuel_cons", labelVi: "Tiêu hao nhiên liệu", labelEn: "Fuel consumption",
        betterWhen: "lower",
        getValue: (c) => { const f = v1(c)?.engine.fuel_consumption_combined; return f ? `${f} L/100km` : "—"; },
        numericValue: (c) => v1(c)?.engine.fuel_consumption_combined ?? null },
      { key: "accel", labelVi: "Tăng tốc 0–100 km/h", labelEn: "0–100 km/h",
        betterWhen: "lower",
        getValue: (c) => { const a = v1(c)?.engine.acceleration_0_100; return a ? `${a} giây` : "—"; },
        numericValue: (c) => v1(c)?.engine.acceleration_0_100 ?? null },
      { key: "topspeed", labelVi: "Tốc độ tối đa", labelEn: "Top speed",
        betterWhen: "higher",
        getValue: (c) => { const s = v1(c)?.engine.top_speed_kmh; return s ? `${s} km/h` : "—"; },
        numericValue: (c) => v1(c)?.engine.top_speed_kmh ?? null },
    ],
  },
  {
    key: "dimensions", titleVi: "Kích thước & Trọng lượng", titleEn: "Dimensions & Weight",
    rows: [
      { key: "len", labelVi: "Chiều dài", labelEn: "Length",
        getValue: (c) => { const v = v1(c)?.dimensions.length_mm; return v ? `${v.toLocaleString("vi-VN")} mm` : "—"; } },
      { key: "wid", labelVi: "Chiều rộng", labelEn: "Width",
        getValue: (c) => { const v = v1(c)?.dimensions.width_mm; return v ? `${v.toLocaleString("vi-VN")} mm` : "—"; } },
      { key: "hei", labelVi: "Chiều cao", labelEn: "Height",
        getValue: (c) => { const v = v1(c)?.dimensions.height_mm; return v ? `${v.toLocaleString("vi-VN")} mm` : "—"; } },
      { key: "wb", labelVi: "Chiều dài cơ sở", labelEn: "Wheelbase",
        betterWhen: "higher",
        getValue: (c) => { const v = v1(c)?.dimensions.wheelbase_mm; return v ? `${v.toLocaleString("vi-VN")} mm` : "—"; },
        numericValue: (c) => v1(c)?.dimensions.wheelbase_mm ?? null },
      { key: "gc", labelVi: "Khoảng sáng gầm", labelEn: "Ground clearance",
        betterWhen: "higher",
        getValue: (c) => { const v = v1(c)?.dimensions.ground_clearance_mm; return v ? `${v} mm` : "—"; },
        numericValue: (c) => v1(c)?.dimensions.ground_clearance_mm ?? null },
      { key: "trunk", labelVi: "Khoang hành lý", labelEn: "Trunk volume",
        betterWhen: "higher",
        getValue: (c) => { const v = v1(c)?.dimensions.trunk_volume_liters; return v ? `${v} L` : "—"; },
        numericValue: (c) => v1(c)?.dimensions.trunk_volume_liters ?? null },
      { key: "tank", labelVi: "Dung tích bình xăng", labelEn: "Fuel tank",
        betterWhen: "higher",
        getValue: (c) => { const v = v1(c)?.dimensions.fuel_tank_liters; return v ? `${v} L` : "—"; },
        numericValue: (c) => v1(c)?.dimensions.fuel_tank_liters ?? null },
      { key: "weight", labelVi: "Khối lượng không tải", labelEn: "Curb weight",
        betterWhen: "lower",
        getValue: (c) => { const v = v1(c)?.dimensions.curb_weight_kg; return v ? `${v.toLocaleString("vi-VN")} kg` : "—"; },
        numericValue: (c) => v1(c)?.dimensions.curb_weight_kg ?? null },
      { key: "seats", labelVi: "Số chỗ ngồi", labelEn: "Seating",
        getValue: (c) => { const v = v1(c)?.dimensions.seating_capacity; return v ? `${v} chỗ` : "—"; } },
    ],
  },
];

// ── Winner detection ───────────────────────────────────────────────────────────

function getWinnerIndex(row: SpecRow, cars: CarModel[]): number | null {
  if (!row.betterWhen || !row.numericValue) return null;
  const vals = cars.map((c) => row.numericValue!(c));
  if (vals.some((v) => v === null)) return null;
  const best = row.betterWhen === "higher"
    ? Math.max(...(vals as number[]))
    : Math.min(...(vals as number[]));
  const indices = vals.map((v, i) => (v === best ? i : -1)).filter((i) => i >= 0);
  return indices.length === 1 ? indices[0] : null; // no tie
}

function isRowSame(row: SpecRow, cars: CarModel[], lang: Lang): boolean {
  if (cars.length < 2) return false;
  const vals = cars.map((c) => row.getValue(c, lang));
  const meaningful = vals.filter((v) => v !== "—");
  if (meaningful.length < 2) return false;
  return meaningful.every((v) => v === meaningful[0]);
}

// ── Car picker dropdown ────────────────────────────────────────────────────────

function CarPicker({
  allModels, selectedSlugs, onSelect, lang,
}: {
  allModels: CarModel[];
  selectedSlugs: string[];
  onSelect: (slug: string) => void;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = allModels
    .filter((m) => !selectedSlugs.includes(m.slug))
    .filter((m) =>
      !query ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.brand.name_vi.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 40);

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => { setOpen(!open); setQuery(""); }}
        className="w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-surface-border hover:border-primary hover:bg-primary/5 transition-colors text-text-muted hover:text-primary"
      >
        <Plus size={24} />
        <span className="text-sm font-semibold">{lang === "vi" ? "Thêm xe" : "Add car"}</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 w-72 mt-2 rounded-xl border border-surface-border bg-surface-card shadow-2xl overflow-hidden">
          <div className="p-3 border-b border-surface-border">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "vi" ? "Tìm tên xe, hãng..." : "Search model or brand..."}
              className="w-full px-3 py-2 text-sm rounded-lg bg-surface-elevated border border-surface-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-xs text-text-muted text-center py-6">
                {lang === "vi" ? "Không tìm thấy xe" : "No cars found"}
              </p>
            ) : (
              filtered.map((m) => (
                <button
                  key={m.slug}
                  onClick={() => { onSelect(m.slug); setOpen(false); setQuery(""); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-elevated text-left transition-colors"
                >
                  {m.thumbnail_url ? (
                    <Image src={m.thumbnail_url} alt={m.name} width={40} height={28} className="object-cover rounded flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-7 rounded bg-surface-elevated flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">{m.name}</p>
                    <p className="text-xs text-text-muted">{lang === "vi" ? m.brand.name_vi : m.brand.name_en}</p>
                  </div>
                  {m.price_from > 0 && (
                    <span className="ml-auto text-xs font-bold text-primary flex-shrink-0">{formatPrice(m.price_from)}</span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Feature comparison table ───────────────────────────────────────────────────

function FeatureGroup({
  titleVi, titleEn, featureKey, cars, lang, highlightDiff,
}: {
  titleVi: string; titleEn: string;
  featureKey: "safety_features" | "comfort_features" | "tech_features";
  cars: CarModel[]; lang: Lang; highlightDiff: boolean;
}) {
  const [open, setOpen] = useState(true);

  const allFeatures = [...new Set(
    cars.flatMap((c) => v1(c)?.features[featureKey] ?? [])
  )].sort();

  if (allFeatures.length === 0) return null;

  const rows = allFeatures.filter((feat) => {
    if (!highlightDiff) return true;
    const has = cars.map((c) => (v1(c)?.features[featureKey] ?? []).includes(feat));
    return !has.every((v) => v === has[0]); // only show if not all same
  });

  if (rows.length === 0) return null;

  return (
    <div className="border border-surface-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface-elevated hover:bg-surface-border/30 transition-colors"
      >
        <span className="text-sm font-bold text-text-primary">
          {lang === "vi" ? titleVi : titleEn}
        </span>
        {open ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
      </button>
      {open && (
        <div>
          {rows.map((feat, i) => {
            const has = cars.map((c) => (v1(c)?.features[featureKey] ?? []).includes(feat));
            return (
              <div key={feat} className={`flex border-t border-surface-border ${i % 2 === 0 ? "" : "bg-surface-elevated/30"}`}>
                <div className="w-[180px] md:w-[200px] flex-shrink-0 px-4 py-2.5 text-xs text-text-secondary">{feat}</div>
                {cars.map((car, ci) => (
                  <div key={car.id} className="flex-1 flex items-center justify-center py-2.5 border-l border-surface-border">
                    {has[ci]
                      ? <Check size={16} className="text-green-500" />
                      : <Minus size={14} className="text-text-muted opacity-30" />}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Spec group ─────────────────────────────────────────────────────────────────

function SpecGroupBlock({
  group, cars, lang, highlightDiff,
}: {
  group: SpecGroup; cars: CarModel[]; lang: Lang; highlightDiff: boolean;
}) {
  const [open, setOpen] = useState(true);

  const visibleRows = group.rows.filter((row) => {
    if (!highlightDiff) return true;
    return !isRowSame(row, cars, lang);
  });

  if (visibleRows.length === 0) return null;

  return (
    <div className="border border-surface-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface-elevated hover:bg-surface-border/30 transition-colors"
      >
        <span className="text-sm font-bold text-text-primary">
          {lang === "vi" ? group.titleVi : group.titleEn}
        </span>
        {open ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
      </button>
      {open && (
        <div>
          {visibleRows.map((row, i) => {
            const winnerIdx = getWinnerIndex(row, cars);
            return (
              <div key={row.key} className={`flex border-t border-surface-border ${i % 2 === 0 ? "" : "bg-surface-elevated/30"}`}>
                <div className="w-[180px] md:w-[200px] flex-shrink-0 px-4 py-2.5 text-xs text-text-secondary leading-snug">
                  {lang === "vi" ? row.labelVi : row.labelEn}
                </div>
                {cars.map((car, ci) => {
                  const val = row.getValue(car, lang);
                  const isWinner = winnerIdx === ci;
                  return (
                    <div
                      key={car.id}
                      className={`flex-1 flex items-center justify-center px-2 py-2.5 border-l border-surface-border text-sm font-semibold text-center ${
                        isWinner ? "text-green-500 bg-green-500/5" : "text-text-primary"
                      }`}
                    >
                      <span>{val}</span>
                      {isWinner && row.betterWhen && (
                        <span className="ml-1 text-[10px] font-bold text-green-500">
                          {row.betterWhen === "higher" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

const MAX_CARS = 3;

export function CarCompareView({
  selectedCars,
  allModels,
  lang,
}: {
  selectedCars: CarModel[];
  allModels: CarModel[];
  lang: Lang;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [highlightDiff, setHighlightDiff] = useState(false);

  const vi = lang === "vi";
  const selectedSlugs = selectedCars.map((c) => c.slug);

  function updateUrl(slugs: string[]) {
    if (slugs.length === 0) router.push(pathname);
    else router.push(`${pathname}?cars=${slugs.join(",")}`);
  }

  function addCar(slug: string) {
    updateUrl([...selectedSlugs, slug]);
  }

  function removeCar(slug: string) {
    updateUrl(selectedSlugs.filter((s) => s !== slug));
  }

  const hasVariants = selectedCars.some((c) => c.variants?.length);

  // ── Empty state ──

  if (selectedCars.length === 0) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1].map((i) => (
            <CarPicker key={i} allModels={allModels} selectedSlugs={[]} onSelect={addCar} lang={lang} />
          ))}
          <div className="hidden lg:flex items-center justify-center rounded-xl border-2 border-dashed border-surface-border/40 text-text-muted text-xs min-h-[160px]">
            {vi ? "Thêm xe thứ 3 (tuỳ chọn)" : "Add 3rd car (optional)"}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-sm font-semibold text-text-primary">{vi ? "Chọn ít nhất 2 xe để bắt đầu so sánh" : "Select at least 2 cars to compare"}</p>
          <p className="text-xs text-text-muted max-w-sm">
            {vi ? "So sánh thông số kỹ thuật, giá bán và trang bị của các mẫu xe cùng phân khúc" : "Compare specs, pricing and features of cars in the same segment"}
          </p>
        </div>
      </div>
    );
  }

  // ── Car slots header ──

  const colClass = selectedCars.length === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="space-y-4">

      {/* Car slots */}
      <div className={`grid ${colClass} gap-3`}>
        {selectedCars.map((car) => (
          <div key={car.slug} className="relative rounded-xl border border-surface-border bg-surface-card overflow-hidden">
            {/* Remove button */}
            <button
              onClick={() => removeCar(car.slug)}
              className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-surface-elevated/90 border border-surface-border flex items-center justify-center text-text-muted hover:text-red-500 hover:border-red-500/50 transition-colors"
              aria-label={`${vi ? "Xóa" : "Remove"} ${car.name}`}
            >
              <X size={12} />
            </button>
            {/* Image */}
            <div className="relative h-28 sm:h-36 bg-surface-elevated">
              {car.thumbnail_url ? (
                <Image src={car.thumbnail_url} alt={car.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">No image</div>
              )}
            </div>
            {/* Info */}
            <div className="p-3">
              <p className="text-[11px] text-text-muted">{lang === "vi" ? car.brand.name_vi : car.brand.name_en}</p>
              <p className="text-sm font-bold text-text-primary leading-tight">{car.name}</p>
              {car.our_rating !== null && (
                <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                  <span className="text-xs font-black text-primary">{car.our_rating}</span>
                  <span className="text-[10px] text-primary/70">/10</span>
                </div>
              )}
              {car.price_from > 0 && (
                <p className="mt-1 text-xs font-semibold text-primary">{vi ? "Từ " : "From "}{formatPrice(car.price_from)}</p>
              )}
              <Link
                href={`/tim-xe/${car.brand.slug}/${car.slug}` as "/"}
                className="mt-2 block text-[10px] text-text-muted hover:text-primary transition-colors"
              >
                {vi ? "Xem chi tiết →" : "Full specs →"}
              </Link>
            </div>
          </div>
        ))}
        {/* Add slot */}
        {selectedCars.length < MAX_CARS && (
          <CarPicker allModels={allModels} selectedSlugs={selectedSlugs} onSelect={addCar} lang={lang} />
        )}
      </div>

      {/* Controls */}
      {selectedCars.length >= 2 && (
        <div className="flex items-center justify-between py-2">
          <p className="text-xs text-text-muted">
            {vi ? `So sánh ${selectedCars.length} xe` : `Comparing ${selectedCars.length} cars`}
            {!hasVariants && (
              <span className="ml-2 text-amber-500">— {vi ? "chưa có thông số kỹ thuật" : "no technical specs yet"}</span>
            )}
          </p>
          <button
            onClick={() => setHighlightDiff(!highlightDiff)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              highlightDiff
                ? "bg-primary text-white border-primary"
                : "bg-surface-elevated border-surface-border text-text-secondary hover:border-primary"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${highlightDiff ? "bg-white/20 border-white/40" : "border-current"}`}>
              {highlightDiff && <Check size={9} strokeWidth={3} />}
            </span>
            {vi ? "Chỉ hiện khác biệt" : "Show differences only"}
          </button>
        </div>
      )}

      {/* Spec table */}
      {selectedCars.length >= 2 && (
        <div className="space-y-3">
          {GROUPS.map((group) => (
            <SpecGroupBlock key={group.key} group={group} cars={selectedCars} lang={lang} highlightDiff={highlightDiff} />
          ))}

          <FeatureGroup titleVi="Trang bị an toàn" titleEn="Safety features"
            featureKey="safety_features" cars={selectedCars} lang={lang} highlightDiff={highlightDiff} />
          <FeatureGroup titleVi="Tiện nghi" titleEn="Comfort features"
            featureKey="comfort_features" cars={selectedCars} lang={lang} highlightDiff={highlightDiff} />
          <FeatureGroup titleVi="Công nghệ" titleEn="Technology"
            featureKey="tech_features" cars={selectedCars} lang={lang} highlightDiff={highlightDiff} />
        </div>
      )}
    </div>
  );
}
