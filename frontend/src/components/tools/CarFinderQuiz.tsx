"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight, RotateCcw, Star, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";
import type { CarModel } from "@/types/car";

type Lang = "vi" | "en";

// ── Quiz data ─────────────────────────────────────────────────────────────────

type OptionKey = string;

type Question = {
  id: string;
  questionVi: string;
  questionEn: string;
  options: { key: OptionKey; labelVi: string; labelEn: string; emoji: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "budget",
    questionVi: "Ngân sách của bạn là bao nhiêu?",
    questionEn: "What is your budget?",
    options: [
      { key: "a", emoji: "💰", labelVi: "Dưới 500 triệu", labelEn: "Under 500M VND" },
      { key: "b", emoji: "💵", labelVi: "500 – 800 triệu", labelEn: "500 – 800M VND" },
      { key: "c", emoji: "💎", labelVi: "800 triệu – 1.2 tỷ", labelEn: "800M – 1.2B VND" },
      { key: "d", emoji: "👑", labelVi: "Trên 1.2 tỷ", labelEn: "Over 1.2B VND" },
    ],
  },
  {
    id: "family",
    questionVi: "Gia đình bạn có bao nhiêu người?",
    questionEn: "How many people in your family?",
    options: [
      { key: "a", emoji: "🧍", labelVi: "1–2 người", labelEn: "1–2 people" },
      { key: "b", emoji: "👨‍👩‍👦", labelVi: "3–4 người", labelEn: "3–4 people" },
      { key: "c", emoji: "👨‍👩‍👧‍👦", labelVi: "5–7 người", labelEn: "5–7 people" },
      { key: "d", emoji: "🏘️", labelVi: "7 người trở lên", labelEn: "7+ people" },
    ],
  },
  {
    id: "usage",
    questionVi: "Bạn chủ yếu dùng xe để làm gì?",
    questionEn: "What will you mainly use the car for?",
    options: [
      { key: "a", emoji: "🏙️", labelVi: "Đi lại trong thành phố", labelEn: "City commuting" },
      { key: "b", emoji: "🛣️", labelVi: "Đường trường, xa lộ", labelEn: "Highway & long trips" },
      { key: "c", emoji: "🗺️", labelVi: "Cả hai đều dùng", labelEn: "Both city & highway" },
      { key: "d", emoji: "⛰️", labelVi: "Địa hình, off-road", labelEn: "Off-road & rough terrain" },
    ],
  },
  {
    id: "priority",
    questionVi: "Điều bạn ưu tiên nhất ở một chiếc xe?",
    questionEn: "What do you value most in a car?",
    options: [
      { key: "a", emoji: "⛽", labelVi: "Tiết kiệm nhiên liệu", labelEn: "Fuel efficiency" },
      { key: "b", emoji: "📦", labelVi: "Không gian rộng rãi", labelEn: "Spacious cabin" },
      { key: "c", emoji: "📱", labelVi: "Công nghệ & tiện nghi", labelEn: "Technology & comfort" },
      { key: "d", emoji: "🏎️", labelVi: "Hiệu suất mạnh mẽ", labelEn: "Performance & power" },
    ],
  },
  {
    id: "bodyType",
    questionVi: "Bạn thích kiểu dáng xe nào?",
    questionEn: "Do you have a preferred body style?",
    options: [
      { key: "any", emoji: "🎯", labelVi: "Không quan trọng", labelEn: "No preference" },
      { key: "sedan", emoji: "🚗", labelVi: "Sedan – lịch sự, tiết kiệm", labelEn: "Sedan – elegant, efficient" },
      { key: "suv", emoji: "🚙", labelVi: "SUV – đa năng, cao ráo", labelEn: "SUV – versatile, elevated" },
      { key: "mpv", emoji: "🚌", labelVi: "MPV / 7 chỗ – rộng rãi nhất", labelEn: "MPV – maximum space" },
    ],
  },
];

// ── Scoring logic ─────────────────────────────────────────────────────────────

type Answers = Record<string, OptionKey>;

function scoreModel(model: CarModel, answers: Answers): number {
  let score = 0;
  const priceM = (model.price_from ?? 0) / 1_000_000;
  const seg = model.segment;

  // Budget — hard filter with overlap zones
  const budget = answers.budget;
  if (budget === "a") {
    if (priceM < 500) score += 4;
    else if (priceM < 650) score += 1;
    else score -= 6;
  } else if (budget === "b") {
    if (priceM >= 450 && priceM < 850) score += 4;
    else if (priceM < 450 || (priceM >= 850 && priceM < 1000)) score += 1;
    else score -= 4;
  } else if (budget === "c") {
    if (priceM >= 750 && priceM < 1300) score += 4;
    else if (priceM >= 600 && priceM < 750) score += 1;
    else score -= 3;
  } else if (budget === "d") {
    if (priceM >= 1100) score += 4;
    else if (priceM >= 900) score += 2;
    else score -= 2;
  }

  // Family size → preferred segment
  const family = answers.family;
  if (family === "a") {
    if (["sedan", "hatchback", "coupe"].includes(seg)) score += 3;
    else if (seg === "suv") score += 1;
  } else if (family === "b") {
    if (["sedan", "suv"].includes(seg)) score += 3;
    if (seg === "hatchback") score += 2;
  } else if (family === "c") {
    if (["suv", "mpv"].includes(seg)) score += 3;
    else if (seg === "sedan") score += 1;
  } else if (family === "d") {
    if (seg === "mpv") score += 4;
    else if (seg === "suv") score += 2;
    else score -= 1;
  }

  // Usage
  const usage = answers.usage;
  if (usage === "a") {
    if (["hatchback", "sedan"].includes(seg)) score += 2;
    else if (seg === "mpv") score += 1;
  } else if (usage === "b") {
    if (["sedan", "suv"].includes(seg)) score += 2;
  } else if (usage === "c") {
    if (["suv", "sedan"].includes(seg)) score += 2;
    if (seg === "mpv") score += 1;
  } else if (usage === "d") {
    if (["suv", "pickup", "truck"].includes(seg)) score += 3;
    else score -= 1;
  }

  // Priority
  const priority = answers.priority;
  if (priority === "a") {
    if (["hatchback", "sedan"].includes(seg)) score += 1;
    if (priceM < 700) score += 1;
  } else if (priority === "b") {
    if (seg === "mpv") score += 2;
    else if (seg === "suv") score += 1;
  } else if (priority === "c") {
    if (model.our_rating && model.our_rating >= 8) score += 2;
  } else if (priority === "d") {
    if (priceM > 800) score += 1;
    if (["suv", "sedan"].includes(seg) && priceM > 600) score += 1;
  }

  // Body type preference
  const bodyType = answers.bodyType;
  if (bodyType !== "any" && bodyType === seg) score += 4;

  // TechDrive rating bonus (up to +2)
  if (model.our_rating) score += model.our_rating * 0.2;

  return score;
}

function getReason(model: CarModel, answers: Answers, lang: Lang): string {
  const vi = lang === "vi";
  const seg = model.segment;
  const reasons: string[] = [];

  const budget = answers.budget;
  const budgetLabel: Record<string, { vi: string; en: string }> = {
    a: { vi: "dưới 500 triệu", en: "under 500M" },
    b: { vi: "500–800 triệu", en: "500–800M" },
    c: { vi: "800 triệu–1.2 tỷ", en: "800M–1.2B" },
    d: { vi: "trên 1.2 tỷ", en: "over 1.2B" },
  };
  reasons.push(vi
    ? `Phù hợp ngân sách ${budgetLabel[budget]?.vi}`
    : `Fits your ${budgetLabel[budget]?.en} budget`
  );

  if (["suv", "mpv"].includes(seg) && ["c", "d"].includes(answers.family)) {
    reasons.push(vi ? "Đủ chỗ cho gia đình lớn" : "Enough room for your family");
  }
  if (answers.usage === "d" && ["suv", "pickup"].includes(seg)) {
    reasons.push(vi ? "Phù hợp địa hình khó" : "Built for rough terrain");
  }
  if (answers.usage === "a" && ["sedan", "hatchback"].includes(seg)) {
    reasons.push(vi ? "Nhỏ gọn, dễ di chuyển nội đô" : "Nimble in city traffic");
  }
  if (answers.priority === "b" && seg === "mpv") {
    reasons.push(vi ? "Không gian nội thất rộng nhất phân khúc" : "Best-in-class cabin space");
  }
  if (model.our_rating && model.our_rating >= 8.5) {
    reasons.push(vi ? `Đánh giá cao: ${model.our_rating}/10` : `Top-rated: ${model.our_rating}/10`);
  }

  return reasons.slice(0, 2).join(" · ");
}

// ── UI components ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-300 ${
            i < current ? "bg-primary flex-[2]" : i === current ? "bg-primary/50 flex-[2]" : "bg-surface-border flex-1"
          }`}
        />
      ))}
    </div>
  );
}

function ResultCard({ model, reason, rank, lang }: {
  model: CarModel; reason: string; rank: number; lang: Lang;
}) {
  const vi = lang === "vi";
  return (
    <div className={`relative rounded-xl border overflow-hidden transition-colors ${
      rank === 1
        ? "border-primary bg-primary/5"
        : "border-surface-border bg-surface-card"
    }`}>
      {rank === 1 && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">
          <Star size={10} fill="white" />
          {vi ? "Gợi ý hàng đầu" : "Top pick"}
        </div>
      )}
      <div className="relative h-36 bg-surface-elevated">
        {model.thumbnail_url ? (
          <Image src={model.thumbnail_url} alt={model.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">No image</div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-text-muted mb-0.5">{vi ? model.brand.name_vi : model.brand.name_en}</p>
        <h3 className="font-extrabold text-text-primary text-lg leading-tight">{model.name}</h3>
        {model.price_from > 0 && (
          <p className="text-sm font-bold text-primary mt-1">
            {vi ? "Từ " : "From "}{formatPrice(model.price_from)}
          </p>
        )}
        {reason && (
          <p className="text-xs text-text-muted mt-2 leading-relaxed">{reason}</p>
        )}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/tim-xe/${model.brand.slug}/${model.slug}` as "/"}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
          >
            {vi ? "Xem chi tiết" : "View specs"}
            <ArrowRight size={12} />
          </Link>
          <Link
            href={`/so-sanh?cars=${model.slug}` as "/"}
            className="flex items-center justify-center px-3 py-2 rounded-lg border border-surface-border text-xs font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            {vi ? "So sánh" : "Compare"}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function CarFinderQuiz({ allModels, lang }: { allModels: CarModel[]; lang: Lang }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const vi = lang === "vi";
  const totalSteps = QUESTIONS.length;
  const currentQ = QUESTIONS[step];

  function handleAnswer(key: OptionKey) {
    const newAnswers = { ...answers, [currentQ.id]: key };
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  // ── Results ──
  if (done) {
    const scored = allModels
      .filter((m) => m.status === "on_sale" && m.price_from > 0)
      .map((m) => ({ model: m, score: scoreModel(m, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-text-primary">
              {vi ? "Xe phù hợp với bạn" : "Cars recommended for you"}
            </h2>
            <p className="text-sm text-text-muted mt-0.5">
              {vi ? `Tìm thấy ${scored.length} gợi ý dựa trên câu trả lời của bạn` : `${scored.length} picks based on your answers`}
            </p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-border text-xs font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            <RotateCcw size={13} />
            {vi ? "Làm lại" : "Restart"}
          </button>
        </div>

        {/* Answer summary */}
        <div className="flex flex-wrap gap-2 mb-6">
          {QUESTIONS.map((q) => {
            const ans = answers[q.id];
            const opt = q.options.find((o) => o.key === ans);
            if (!opt) return null;
            return (
              <span key={q.id} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated border border-surface-border text-xs text-text-secondary">
                {opt.emoji} {vi ? opt.labelVi : opt.labelEn}
              </span>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scored.map(({ model }, i) => (
            <ResultCard
              key={model.id}
              model={model}
              reason={getReason(model, answers, lang)}
              rank={i + 1}
              lang={lang}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted mb-3">
            {vi ? "Muốn xem thêm lựa chọn?" : "Want more options?"}
          </p>
          <Link
            href="/tim-xe"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border text-sm font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            {vi ? "Duyệt tất cả xe" : "Browse all cars"}
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Quiz steps ──
  return (
    <div className="max-w-xl mx-auto">
      <ProgressBar current={step} total={totalSteps} />

      <div className="mb-2 text-xs font-semibold text-primary">
        {vi ? `Câu ${step + 1} / ${totalSteps}` : `Question ${step + 1} of ${totalSteps}`}
      </div>
      <h2 className="text-xl font-extrabold text-text-primary mb-6 leading-snug">
        {vi ? currentQ.questionVi : currentQ.questionEn}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => handleAnswer(opt.key)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-surface-border bg-surface-card hover:border-primary hover:bg-primary/5 text-left transition-all group"
          >
            <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
            <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
              {vi ? opt.labelVi : opt.labelEn}
            </span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-6 text-xs text-text-muted hover:text-text-secondary transition-colors"
        >
          ← {vi ? "Quay lại" : "Back"}
        </button>
      )}
    </div>
  );
}
