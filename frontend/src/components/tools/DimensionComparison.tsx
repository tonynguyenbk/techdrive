"use client";

import type { CarModel } from "@/types/car";

type Lang = "vi" | "en";

const v1 = (car: CarModel) => car.variants?.[0];

// ── SVG car silhouettes (normalized 0–100 x, 0–60 y) ─────────────────────────

const COLORS = ["#DC2626", "#2563EB", "#16A34A"]; // up to 3 cars

function getBodyPath(segment: string): {
  body: string;
  cabin: string;
  wheelFront: [number, number];
  wheelRear: [number, number];
  wheelR: number;
} {
  switch (segment) {
    case "suv":
    case "crossover":
      return {
        body:       "M 4,46 L 4,32 Q 6,28 10,26 L 10,18 Q 14,10 20,8 L 80,8 Q 86,8 90,18 L 90,26 Q 94,28 96,32 L 96,46 Z",
        cabin:      "",
        wheelFront: [21, 46],
        wheelRear:  [79, 46],
        wheelR:     10,
      };
    case "hatchback":
      return {
        body:       "M 5,46 L 5,33 Q 8,28 14,22 L 22,12 Q 28,8 36,8 L 68,8 L 74,10 L 78,20 Q 84,28 88,33 L 88,46 Z",
        cabin:      "",
        wheelFront: [20, 46],
        wheelRear:  [75, 46],
        wheelR:     9,
      };
    case "mpv":
    case "van":
      return {
        body:       "M 4,46 L 4,30 Q 6,22 14,14 L 22,8 L 85,8 Q 92,8 95,18 L 96,30 L 96,46 Z",
        cabin:      "",
        wheelFront: [18, 46],
        wheelRear:  [80, 46],
        wheelR:     10,
      };
    case "pickup":
      return {
        body:       "M 4,46 L 4,32 Q 6,26 12,20 L 20,10 L 52,10 L 52,26 L 96,26 L 96,46 Z",
        cabin:      "",
        wheelFront: [18, 46],
        wheelRear:  [80, 46],
        wheelR:     10,
      };
    case "coupe":
      return {
        body:       "M 6,46 L 6,34 Q 10,28 18,20 L 28,10 Q 36,7 48,7 L 62,7 Q 74,8 82,14 L 90,26 Q 93,30 94,34 L 94,46 Z",
        cabin:      "",
        wheelFront: [20, 46],
        wheelRear:  [78, 46],
        wheelR:     9,
      };
    default: // sedan
      return {
        body:       "M 5,46 L 5,34 Q 8,28 14,22 L 24,12 Q 32,7 42,7 L 60,7 Q 70,8 76,14 L 86,24 Q 92,30 95,36 L 95,46 Z",
        cabin:      "",
        wheelFront: [19, 46],
        wheelRear:  [80, 46],
        wheelR:     9,
      };
  }
}

// ── Single car SVG ────────────────────────────────────────────────────────────

function CarSilhouette({
  car,
  color,
  svgW,
  svgH,
}: {
  car: CarModel;
  color: string;
  svgW: number;
  svgH: number;
}) {
  const { body, wheelFront, wheelRear, wheelR } = getBodyPath(car.segment);

  return (
    <svg
      viewBox="0 0 100 60"
      width={svgW}
      height={svgH}
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Shadow */}
      <ellipse cx="50" cy="57" rx="44" ry="3" fill={color} opacity={0.12} />

      {/* Car body */}
      <path
        d={body}
        fill={color}
        opacity={0.85}
        stroke={color}
        strokeWidth="0.5"
      />

      {/* Windows — simple polygon overlay */}
      <path
        d={body}
        fill="none"
        stroke="white"
        strokeWidth="0.4"
        opacity={0.4}
      />

      {/* Wheel wells */}
      <circle cx={wheelFront[0]} cy={wheelFront[1]} r={wheelR + 1} fill="#1a1a2e" />
      <circle cx={wheelRear[0]}  cy={wheelRear[1]}  r={wheelR + 1} fill="#1a1a2e" />

      {/* Tyres */}
      <circle cx={wheelFront[0]} cy={wheelFront[1]} r={wheelR} fill="#374151" />
      <circle cx={wheelRear[0]}  cy={wheelRear[1]}  r={wheelR} fill="#374151" />

      {/* Hubcaps */}
      <circle cx={wheelFront[0]} cy={wheelFront[1]} r={wheelR * 0.5} fill="#9CA3AF" opacity={0.6} />
      <circle cx={wheelRear[0]}  cy={wheelRear[1]}  r={wheelR * 0.5} fill="#9CA3AF" opacity={0.6} />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function DimensionComparison({
  cars,
  lang,
}: {
  cars: CarModel[];
  lang: Lang;
}) {
  const vi = lang === "vi";

  if (cars.length < 2) return null;

  const dims = cars.map((c) => ({
    car: c,
    length: v1(c)?.dimensions.length_mm ?? null,
    height: v1(c)?.dimensions.height_mm ?? null,
    width:  v1(c)?.dimensions.width_mm  ?? null,
    wb:     v1(c)?.dimensions.wheelbase_mm ?? null,
  }));

  const hasAnyDim = dims.some((d) => d.length && d.height);
  if (!hasAnyDim) return null;

  const maxLength = Math.max(...dims.map((d) => d.length ?? 0));
  const maxHeight = Math.max(...dims.map((d) => d.height ?? 0));

  // Max silhouette size in pixels
  const MAX_W = 280;
  const MAX_H = 110;

  return (
    <div className="border border-surface-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-surface-elevated border-b border-surface-border">
        <h3 className="text-sm font-bold text-text-primary">
          {vi ? "So sánh kích thước" : "Size Comparison"}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          {vi ? "Tỉ lệ theo kích thước thực tế" : "Scaled to actual dimensions"}
        </p>
      </div>

      {/* Silhouettes */}
      <div className="p-4 bg-surface-card">
        <div
          className={`grid gap-6 ${
            cars.length === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {dims.map(({ car, length, height, width, wb }, i) => {
            const color = COLORS[i] ?? "#666";
            const hasData = length && height;

            // Scale this car proportionally to MAX_W/MAX_H
            const scaleW = length ? (length / maxLength) * MAX_W : MAX_W;
            const scaleH = height ? (height / maxHeight) * MAX_H : MAX_H;

            return (
              <div key={car.id} className="flex flex-col items-center gap-3">
                {/* Label */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs font-bold text-text-primary truncate">
                    {car.name}
                  </span>
                </div>

                {/* Silhouette */}
                {hasData ? (
                  <div className="flex flex-col items-center gap-1">
                    {/* Height annotation line (left) */}
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col items-center" style={{ height: scaleH }}>
                        <div className="w-px flex-1" style={{ backgroundColor: color, opacity: 0.4 }} />
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <CarSilhouette car={car} color={color} svgW={scaleW} svgH={scaleH} />

                        {/* Length annotation */}
                        <div className="flex items-center gap-1" style={{ width: scaleW }}>
                          <div className="h-px flex-1" style={{ backgroundColor: color, opacity: 0.5 }} />
                          <span className="text-[10px] font-bold whitespace-nowrap" style={{ color }}>
                            {length.toLocaleString("vi-VN")} mm
                          </span>
                          <div className="h-px flex-1" style={{ backgroundColor: color, opacity: 0.5 }} />
                        </div>
                      </div>
                    </div>

                    {/* Height label */}
                    <span className="text-[10px] font-semibold" style={{ color }}>
                      ↕ {height.toLocaleString("vi-VN")} mm
                    </span>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center rounded-lg bg-surface-hover text-xs text-text-muted"
                    style={{ width: MAX_W, height: MAX_H }}
                  >
                    {vi ? "Chưa có dữ liệu" : "No data"}
                  </div>
                )}

                {/* Dimension stats */}
                <div className="w-full grid grid-cols-2 gap-1.5 mt-1">
                  {[
                    { labelVi: "Dài", labelEn: "L", val: length, unit: "mm" },
                    { labelVi: "Cao", labelEn: "H", val: height, unit: "mm" },
                    { labelVi: "Rộng", labelEn: "W", val: width, unit: "mm" },
                    { labelVi: "Cơ sở", labelEn: "WB", val: wb, unit: "mm" },
                  ].map(({ labelVi, labelEn, val, unit }) => (
                    <div
                      key={labelVi}
                      className="rounded-lg px-2 py-1.5 text-center"
                      style={{ backgroundColor: `${color}10`, border: `1px solid ${color}25` }}
                    >
                      <p className="text-[9px] text-text-muted uppercase tracking-wide">
                        {vi ? labelVi : labelEn}
                      </p>
                      <p className="text-xs font-bold" style={{ color }}>
                        {val ? val.toLocaleString("vi-VN") : "—"}
                        {val && <span className="text-[9px] font-normal ml-0.5">{unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Overlay comparison note */}
        {dims.every((d) => d.length && d.height) && (
          <div className="mt-4 pt-3 border-t border-surface-border">
            <p className="text-xs text-text-muted text-center mb-3">
              {vi ? "Chênh lệch kích thước" : "Size difference"}
            </p>
            <div className="space-y-2">
              {[
                { labelVi: "Chiều dài", labelEn: "Length", key: "length" as const },
                { labelVi: "Chiều cao", labelEn: "Height", key: "height" as const },
                { labelVi: "Chiều rộng", labelEn: "Width",  key: "width"  as const },
                { labelVi: "Chiều dài cơ sở", labelEn: "Wheelbase", key: "wb" as const },
              ].map(({ labelVi, labelEn, key }) => {
                const vals = dims.map((d) => d[key]);
                if (vals.some((v) => !v)) return null;
                const maxVal = Math.max(...(vals as number[]));
                const minVal = Math.min(...(vals as number[]));
                const diff = maxVal - minVal;
                if (diff === 0) return null;

                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-xs text-text-muted w-28 shrink-0">
                      {vi ? labelVi : labelEn}
                    </span>
                    <div className="flex-1 flex items-center gap-1">
                      {vals.map((val, i) => {
                        const pct = ((val as number) / maxVal) * 100;
                        return (
                          <div key={i} className="flex-1">
                            <div className="flex items-center gap-1 mb-0.5">
                              <span className="text-[10px] font-semibold" style={{ color: COLORS[i] }}>
                                {(val as number).toLocaleString("vi-VN")}
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${pct}%`, backgroundColor: COLORS[i], opacity: 0.8 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-text-muted shrink-0 w-14 text-right">
                      Δ {diff.toLocaleString("vi-VN")} mm
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
