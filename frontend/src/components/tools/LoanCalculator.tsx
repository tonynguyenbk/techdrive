"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Lang = "vi" | "en";

// ── Bank presets ──────────────────────────────────────────────────────────────

const BANKS = [
  { id: "vpbank",     label: "VPBank",      rate: 8.5  },
  { id: "techcom",   label: "Techcombank",  rate: 8.9  },
  { id: "vietinbank",label: "VietinBank",   rate: 7.8  },
  { id: "bidv",      label: "BIDV",         rate: 7.5  },
  { id: "agribank",  label: "Agribank",     rate: 7.2  },
  { id: "hdbank",    label: "HD Bank Auto", rate: 9.5  },
];

const TERMS = [12, 24, 36, 48, 60, 72, 84];

// ── Math ──────────────────────────────────────────────────────────────────────

function calcEMI(principal: number, annualRatePct: number, months: number) {
  if (principal <= 0 || months <= 0) return { monthly: 0, totalInterest: 0, total: 0 };
  const r = annualRatePct / 100 / 12;
  if (r === 0) {
    const monthly = principal / months;
    return { monthly, totalInterest: 0, total: principal };
  }
  const factor = Math.pow(1 + r, months);
  const monthly = (principal * r * factor) / (factor - 1);
  const total = monthly * months;
  return { monthly, totalInterest: total - principal, total };
}

type ScheduleRow = { month: number; payment: number; principal: number; interest: number; balance: number };

function buildSchedule(principal: number, annualRatePct: number, months: number, emi: number): ScheduleRow[] {
  const r = annualRatePct / 100 / 12;
  let balance = principal;
  const rows: ScheduleRow[] = [];
  for (let m = 1; m <= months; m++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    rows.push({ month: m, payment: emi, principal: principalPaid, interest, balance });
  }
  return rows;
}

// ── Formatters ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("vi-VN").format(Math.round(n));
}

function fmtShort(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")} tỷ`;
  if (n >= 1_000_000) return `${Math.round(n / 1_000_000)} triệu`;
  return fmt(n);
}

function parsePriceInput(raw: string): number {
  return Number(raw.replace(/\D/g, "")) || 0;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SliderRow({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-text-secondary">{label}</span>
        <span className="text-sm font-bold text-text-primary">{format(value)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="relative w-full h-1.5 rounded-full bg-surface-border">
            <div className="absolute left-0 top-0 h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full opacity-0 h-5 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-[10px] text-text-muted mt-0.5">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function LoanCalculator({ lang, initialPrice }: { lang: Lang; initialPrice?: number }) {
  const vi = lang === "vi";

  const [carPrice, setCarPrice] = useState(initialPrice ?? 800_000_000);
  const [carPriceRaw, setCarPriceRaw] = useState(String(initialPrice ?? 800_000_000));
  const [downPct, setDownPct] = useState(30);
  const [termMonths, setTermMonths] = useState(60);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [selectedBank, setSelectedBank] = useState("vpbank");
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleRows, setScheduleRows] = useState(6);

  const downAmount = carPrice * (downPct / 100);
  const principal = carPrice - downAmount;

  const { monthly, totalInterest, total } = useMemo(
    () => calcEMI(principal, annualRate, termMonths),
    [principal, annualRate, termMonths]
  );

  const schedule = useMemo(
    () => (showSchedule ? buildSchedule(principal, annualRate, termMonths, monthly) : []),
    [showSchedule, principal, annualRate, termMonths, monthly]
  );

  function selectBank(bank: typeof BANKS[0]) {
    setSelectedBank(bank.id);
    setAnnualRate(bank.rate);
  }

  function handlePriceChange(raw: string) {
    setCarPriceRaw(raw);
    const n = parsePriceInput(raw);
    if (n > 0) setCarPrice(n);
  }

  const interestPct = total > 0 ? (totalInterest / total) * 100 : 0;
  const principalPct = 100 - interestPct;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

      {/* ── Left: Inputs ── */}
      <div className="lg:col-span-3 space-y-6">

        {/* Car price */}
        <div className="p-5 rounded-xl border border-surface-border bg-surface-card space-y-5">
          <h2 className="text-sm font-bold text-text-primary">
            {vi ? "Thông tin vay" : "Loan details"}
          </h2>

          <div>
            <label className="block text-xs text-text-secondary mb-1.5">
              {vi ? "Giá xe (VND)" : "Car price (VND)"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={carPriceRaw}
                onChange={(e) => handlePriceChange(e.target.value)}
                onBlur={() => setCarPriceRaw(fmt(carPrice))}
                onFocus={() => setCarPriceRaw(String(carPrice))}
                className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface-elevated text-text-primary font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="800000000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-semibold">
                {fmtShort(carPrice)}
              </span>
            </div>
            {/* Quick presets */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[400, 600, 800, 1000, 1500, 2000].map((m) => (
                <button
                  key={m}
                  onClick={() => { setCarPrice(m * 1_000_000); setCarPriceRaw(fmt(m * 1_000_000)); }}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
                    carPrice === m * 1_000_000
                      ? "bg-primary text-white border-primary"
                      : "border-surface-border text-text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {m >= 1000 ? `${m / 1000} tỷ` : `${m}tr`}
                </button>
              ))}
            </div>
          </div>

          <SliderRow
            label={vi ? `Trả trước (${downPct}% — ${fmtShort(downAmount)})` : `Down payment (${downPct}% — ${fmtShort(downAmount)})`}
            value={downPct} min={10} max={70} step={5}
            format={(v) => `${v}%`}
            onChange={setDownPct}
          />

          <div>
            <p className="text-xs text-text-secondary mb-2">{vi ? "Thời hạn vay" : "Loan term"}</p>
            <div className="flex flex-wrap gap-2">
              {TERMS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTermMonths(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    termMonths === t
                      ? "bg-primary text-white border-primary"
                      : "border-surface-border text-text-secondary hover:border-primary"
                  }`}
                >
                  {t} {vi ? "tháng" : "mo"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bank & rate */}
        <div className="p-5 rounded-xl border border-surface-border bg-surface-card space-y-4">
          <h2 className="text-sm font-bold text-text-primary">
            {vi ? "Lãi suất" : "Interest rate"}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BANKS.map((b) => (
              <button
                key={b.id}
                onClick={() => selectBank(b)}
                className={`flex flex-col items-start px-3 py-2.5 rounded-lg border text-left transition-colors ${
                  selectedBank === b.id
                    ? "border-primary bg-primary/5"
                    : "border-surface-border hover:border-primary/50"
                }`}
              >
                <span className={`text-xs font-bold ${selectedBank === b.id ? "text-primary" : "text-text-primary"}`}>
                  {b.label}
                </span>
                <span className="text-[11px] text-text-muted">{b.rate}%/năm</span>
              </button>
            ))}
          </div>

          <SliderRow
            label={vi ? "Lãi suất hàng năm" : "Annual interest rate"}
            value={annualRate} min={5} max={20} step={0.1}
            format={(v) => `${v.toFixed(1)}%`}
            onChange={(v) => { setAnnualRate(v); setSelectedBank(""); }}
          />

          <p className="text-[11px] text-text-muted leading-relaxed">
            {vi
              ? "Lãi suất tham khảo — có thể thay đổi theo hồ sơ tín dụng và thời điểm vay. Tính theo phương pháp dư nợ giảm dần (annuity)."
              : "Reference rates — may vary by credit profile and timing. Calculated using reducing-balance (annuity) method."}
          </p>
        </div>
      </div>

      {/* ── Right: Results ── */}
      <div className="lg:col-span-2 space-y-4">

        {/* Monthly payment hero */}
        <div className="p-5 rounded-xl border border-primary bg-primary/5 text-center">
          <p className="text-xs font-semibold text-primary mb-1">
            {vi ? "Trả hàng tháng" : "Monthly payment"}
          </p>
          <p className="text-4xl font-black text-primary leading-none">
            {fmtShort(monthly)}
          </p>
          <p className="text-[11px] text-primary/70 mt-1">
            {vi ? `trong ${termMonths} tháng` : `for ${termMonths} months`}
          </p>
        </div>

        {/* Breakdown */}
        <div className="p-5 rounded-xl border border-surface-border bg-surface-card space-y-3">
          <h3 className="text-xs font-bold text-text-primary">{vi ? "Chi tiết khoản vay" : "Loan breakdown"}</h3>

          <div className="space-y-2 text-sm">
            {[
              { labelVi: "Giá xe", labelEn: "Car price",       val: carPrice,      cls: "text-text-primary" },
              { labelVi: "Trả trước", labelEn: "Down payment",    val: downAmount,    cls: "text-text-secondary" },
              { labelVi: "Số tiền vay", labelEn: "Loan principal",  val: principal,     cls: "font-bold text-text-primary" },
              { labelVi: "Tổng tiền lãi", labelEn: "Total interest",  val: totalInterest, cls: "text-amber-500" },
              { labelVi: "Tổng phải trả", labelEn: "Total payment",   val: total,         cls: "font-bold text-text-primary" },
            ].map(({ labelVi, labelEn, val, cls }) => (
              <div key={labelVi} className="flex justify-between items-baseline gap-2">
                <span className="text-xs text-text-muted shrink-0">{vi ? labelVi : labelEn}</span>
                <span className={`text-right tabular-nums text-xs ${cls}`}>{fmt(Math.round(val))} ₫</span>
              </div>
            ))}
          </div>

          {/* Visual bar */}
          <div className="mt-3">
            <div className="flex h-2 rounded-full overflow-hidden">
              <div className="bg-primary transition-all" style={{ width: `${principalPct}%` }} />
              <div className="bg-amber-400 transition-all" style={{ width: `${interestPct}%` }} />
            </div>
            <div className="flex gap-4 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-text-muted">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                {vi ? "Gốc" : "Principal"} {principalPct.toFixed(0)}%
              </span>
              <span className="flex items-center gap-1 text-[10px] text-text-muted">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                {vi ? "Lãi" : "Interest"} {interestPct.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Link to on-road cost */}
        <Link
          href="/tu-van/tinh-lan-banh"
          className="flex items-center gap-2 p-3 rounded-xl border border-surface-border bg-surface-card hover:border-primary transition-colors group"
        >
          <LinkIcon size={14} className="text-text-muted group-hover:text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-primary group-hover:text-primary transition-colors">
              {vi ? "Tính chi phí lăn bánh" : "On-road cost calculator"}
            </p>
            <p className="text-[10px] text-text-muted truncate">
              {vi ? "Phí trước bạ, đăng ký, bảo hiểm..." : "Registration tax, insurance..."}
            </p>
          </div>
        </Link>

        {/* Amortization toggle */}
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-surface-border bg-surface-card hover:border-primary transition-colors text-sm font-semibold text-text-secondary hover:text-primary"
        >
          <span>{vi ? "Xem lịch trả nợ" : "Amortization schedule"}</span>
          {showSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* ── Amortization table ── */}
      {showSchedule && (
        <div className="lg:col-span-5 rounded-xl border border-surface-border bg-surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface-elevated border-b border-surface-border">
                  {[
                    vi ? "Tháng" : "Month",
                    vi ? "Trả hàng tháng" : "Payment",
                    vi ? "Trả gốc" : "Principal",
                    vi ? "Trả lãi" : "Interest",
                    vi ? "Dư nợ còn lại" : "Balance",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-text-secondary whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, scheduleRows).map((row, i) => (
                  <tr key={row.month} className={i % 2 === 0 ? "" : "bg-surface-elevated/40"}>
                    <td className="px-4 py-2.5 font-semibold text-text-primary">{row.month}</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-primary">{fmt(row.payment)} ₫</td>
                    <td className="px-4 py-2.5 tabular-nums text-primary">{fmt(row.principal)} ₫</td>
                    <td className="px-4 py-2.5 tabular-nums text-amber-500">{fmt(row.interest)} ₫</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-secondary">{fmt(row.balance)} ₫</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {scheduleRows < termMonths && (
            <div className="border-t border-surface-border p-3 text-center">
              <button
                onClick={() => setScheduleRows(Math.min(scheduleRows + 12, termMonths))}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {vi ? `Xem thêm (còn ${termMonths - scheduleRows} tháng)` : `Show more (${termMonths - scheduleRows} remaining)`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
