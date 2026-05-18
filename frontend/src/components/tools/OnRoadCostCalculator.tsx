"use client";

import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";

// --- Static data ---

const PROVINCES = [
  { value: "hanoi",    label: "Hà Nội",             firstRate: 12, subRate: 6, regFee: 1_000_000 },
  { value: "hcm",      label: "TP. Hồ Chí Minh",   firstRate: 10, subRate: 2, regFee: 1_000_000 },
  { value: "danang",   label: "Đà Nẵng",             firstRate: 10, subRate: 2, regFee: 1_000_000 },
  { value: "haiphong", label: "Hải Phòng",           firstRate: 10, subRate: 2, regFee: 500_000  },
  { value: "cantho",   label: "Cần Thơ",             firstRate: 10, subRate: 2, regFee: 500_000  },
  { value: "other",    label: "Tỉnh / thành khác",  firstRate: 10, subRate: 2, regFee: 200_000  },
];

const INSPECTION_FEE = 560_000; // xe <9 chỗ, đăng kiểm lần đầu

const INSURANCE_RATE = { under6: 479_000, "7to9": 679_000 }; // TNDS bắt buộc/năm

const PRICE_PRESETS = [
  { label: "400 triệu", value: 400_000_000 },
  { label: "700 triệu", value: 700_000_000 },
  { label: "1 tỷ",      value: 1_000_000_000 },
  { label: "1.5 tỷ",    value: 1_500_000_000 },
  { label: "2 tỷ",      value: 2_000_000_000 },
];

// --- Helpers ---

function vnd(n: number) {
  return new Intl.NumberFormat("vi-VN").format(Math.round(n)) + " ₫";
}

// --- Sub-components ---

function ResultRow({
  label, value, sub, dimmed,
}: {
  label: string; value: string; sub?: string; dimmed?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between py-3 border-b border-surface-border last:border-0 gap-4 ${dimmed ? "opacity-50" : ""}`}>
      <div className="min-w-0">
        <p className="text-sm text-text-secondary leading-snug">{label}</p>
        {sub && <p className="text-[11px] text-text-muted mt-0.5">{sub}</p>}
      </div>
      <p className="text-sm font-bold text-text-primary tabular-nums whitespace-nowrap">{value}</p>
    </div>
  );
}

function ToggleGroup({
  options, value, onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-surface-border">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            value === opt.value
              ? "bg-primary text-white"
              : "bg-surface-elevated text-text-secondary hover:bg-surface-border/40"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// --- Main component ---

export function OnRoadCostCalculator({ lang }: { lang: "vi" | "en" }) {
  const [carPrice, setCarPrice] = useState(800_000_000);
  const [priceText, setPriceText] = useState("800.000.000");
  const [provinceKey, setProvinceKey] = useState("hanoi");
  const [isFirst, setIsFirst] = useState(true);
  const [seats, setSeats] = useState<"under6" | "7to9">("under6");
  const [hasComprehensive, setHasComprehensive] = useState(false);
  const [compRate, setCompRate] = useState(1.0);

  const province = PROVINCES.find((p) => p.value === provinceKey) ?? PROVINCES[0];
  const truocBaRate = isFirst ? province.firstRate : province.subRate;
  const truocBa = Math.round((carPrice * truocBaRate) / 100);
  const regFee = province.regFee;
  const mandatoryIns = INSURANCE_RATE[seats];
  const comprehensiveIns = hasComprehensive ? Math.round((carPrice * compRate) / 100) : 0;
  const extras = truocBa + regFee + INSPECTION_FEE + mandatoryIns + comprehensiveIns;
  const total = carPrice + extras;

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    const num = parseInt(raw) || 0;
    setCarPrice(num);
    setPriceText(num.toLocaleString("vi-VN"));
  }

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const num = parseInt(e.target.value);
    setCarPrice(num);
    setPriceText(num.toLocaleString("vi-VN"));
  }

  const vi = lang === "vi";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">

      {/* ── Input panel ── */}
      <div className="space-y-6">

        {/* Giá xe */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2.5">
            {vi ? "Giá xe" : "Car price"}
          </label>
          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-3">
            {PRICE_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => { setCarPrice(p.value); setPriceText(p.value.toLocaleString("vi-VN")); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  carPrice === p.value
                    ? "bg-primary text-white border-primary"
                    : "bg-surface-elevated border-surface-border text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {/* Text input */}
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={priceText}
              onChange={handlePriceChange}
              className="w-full px-4 py-3 pr-8 rounded-xl bg-surface-elevated border border-surface-border text-text-primary font-bold text-right text-lg focus:outline-none focus:border-primary transition-colors"
              placeholder="800.000.000"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-semibold">₫</span>
          </div>
          {/* Slider */}
          <input
            type="range"
            min={200_000_000}
            max={5_000_000_000}
            step={50_000_000}
            value={Math.min(Math.max(carPrice, 200_000_000), 5_000_000_000)}
            onChange={handleSlider}
            className="w-full mt-3 accent-primary h-1.5"
          />
          <div className="flex justify-between text-[10px] text-text-muted mt-0.5">
            <span>200 triệu</span>
            <span>5 tỷ</span>
          </div>
        </div>

        {/* Tỉnh / thành */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2.5">
            {vi ? "Tỉnh / thành phố đăng ký" : "Registration province"}
          </label>
          <div className="relative">
            <select
              value={provinceKey}
              onChange={(e) => setProvinceKey(e.target.value)}
              className="w-full appearance-none px-4 py-3 rounded-xl bg-surface-elevated border border-surface-border text-text-primary font-semibold focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {PROVINCES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Lần đăng ký */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2.5">
            {vi ? "Lần đăng ký" : "Registration"}
          </label>
          <ToggleGroup
            value={isFirst ? "first" : "sub"}
            onChange={(v) => setIsFirst(v === "first")}
            options={[
              { value: "first", label: vi ? "Lần đầu" : "First time" },
              { value: "sub",   label: vi ? "Lần tiếp theo" : "Subsequent" },
            ]}
          />
        </div>

        {/* Số chỗ */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2.5">
            {vi ? "Số chỗ ngồi" : "Seating capacity"}
          </label>
          <ToggleGroup
            value={seats}
            onChange={(v) => setSeats(v as "under6" | "7to9")}
            options={[
              { value: "under6", label: vi ? "Dưới 6 chỗ" : "Under 6 seats" },
              { value: "7to9",   label: vi ? "7 – 9 chỗ"  : "7 – 9 seats"  },
            ]}
          />
        </div>

        {/* Bảo hiểm thân vỏ */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2.5">
            {vi ? "Bảo hiểm thân vỏ (tùy chọn)" : "Comprehensive insurance (optional)"}
          </label>
          <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-4">
            <button
              role="checkbox"
              aria-checked={hasComprehensive}
              onClick={() => setHasComprehensive(!hasComprehensive)}
              className="flex items-center gap-3 w-full text-left"
            >
              <span className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                hasComprehensive ? "bg-primary border-primary" : "border-surface-border bg-surface"
              }`}>
                {hasComprehensive && (
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-text-secondary font-medium">
                {vi ? "Thêm bảo hiểm thân vỏ vào tính toán" : "Include comprehensive insurance"}
              </span>
            </button>

            {hasComprehensive && (
              <div>
                <p className="text-xs text-text-muted mb-2">
                  {vi ? "Tỷ lệ phí bảo hiểm / năm" : "Annual insurance rate"}
                </p>
                <div className="flex gap-2">
                  {[0.8, 1.0, 1.2, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setCompRate(rate)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                        compRate === rate
                          ? "bg-primary text-white border-primary"
                          : "border-surface-border text-text-secondary hover:border-primary hover:text-primary"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Result panel ── */}
      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-surface-border bg-surface-elevated">
            <p className="text-[11px] font-bold text-primary uppercase tracking-widest">
              {vi ? "Ước tính chi phí lăn bánh" : "Estimated on-road cost"}
            </p>
          </div>

          <div className="px-5">
            <ResultRow label={vi ? "Giá xe" : "Car price"} value={vnd(carPrice)} dimmed />
            <ResultRow
              label={vi ? "Lệ phí trước bạ" : "Registration tax"}
              value={vnd(truocBa)}
              sub={`${truocBaRate}% · ${province.label}`}
            />
            <ResultRow
              label={vi ? "Phí đăng ký + biển số" : "Registration + plate fee"}
              value={vnd(regFee)}
            />
            <ResultRow
              label={vi ? "Đăng kiểm lần đầu" : "First inspection"}
              value={vnd(INSPECTION_FEE)}
            />
            <ResultRow
              label={vi ? "Bảo hiểm TNDS bắt buộc (1 năm)" : "Compulsory insurance (1yr)"}
              value={vnd(mandatoryIns)}
            />
            {hasComprehensive && (
              <ResultRow
                label={vi ? `Bảo hiểm thân vỏ (${compRate}% / năm)` : `Comprehensive (${compRate}% / yr)`}
                value={vnd(comprehensiveIns)}
              />
            )}
          </div>

          {/* Total */}
          <div className="m-5 p-4 rounded-xl bg-primary/10 border border-primary/30">
            <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1">
              {vi ? "Tổng chi phí lăn bánh" : "Total on-road cost"}
            </p>
            <p className="text-2xl font-black text-primary leading-tight">{vnd(total)}</p>
            <p className="text-xs text-text-muted mt-1.5">
              {vi ? "Chi phí phát sinh: " : "Extra costs: "}
              <span className="font-semibold text-text-secondary">
                +{vnd(extras)}
              </span>
              {" "}
              <span className="text-primary font-bold">
                (+{((extras / carPrice) * 100).toFixed(1)}%)
              </span>
            </p>
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 mx-5 mb-5 text-[11px] text-text-muted leading-relaxed">
            <Info size={12} className="mt-0.5 flex-shrink-0 text-text-muted" />
            <span>
              {vi
                ? "Số liệu mang tính tham khảo. Phí thực tế có thể thay đổi tùy thời điểm và quy định địa phương."
                : "Estimates only. Actual costs may vary by time and local regulations."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
