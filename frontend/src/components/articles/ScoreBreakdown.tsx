import { cn } from "@/lib/utils/cn";

type ScoreItem = {
  label: string;
  score: number;
};

type Props = {
  overallScore: number;
  items: ScoreItem[];
  verdict?: string | null;
  locale?: string;
};

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 9 ? "bg-score-excellent" :
    score >= 7 ? "bg-score-good" :
    score >= 5 ? "bg-score-average" :
    "bg-score-bad";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-text-primary w-6 text-right">{score}</span>
    </div>
  );
}

export function ScoreBreakdown({ overallScore, items, verdict, locale = "vi" }: Props) {
  const scoreColor =
    overallScore >= 9 ? "text-score-excellent" :
    overallScore >= 7 ? "text-score-good" :
    overallScore >= 5 ? "text-score-average" :
    "text-score-bad";

  const bgColor =
    overallScore >= 9 ? "border-score-excellent/30 bg-score-excellent/5" :
    overallScore >= 7 ? "border-score-good/30 bg-score-good/5" :
    overallScore >= 5 ? "border-score-average/30 bg-score-average/5" :
    "border-score-bad/30 bg-score-bad/5";

  return (
    <div className={cn("rounded-xl border p-5", bgColor)}>
      <div className="flex items-start gap-5 mb-4">
        <div className="text-center">
          <div className={cn("text-5xl font-black leading-none", scoreColor)}>
            {overallScore}
          </div>
          <div className="text-[10px] text-text-muted mt-1">/ 10</div>
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2.5">
            {locale === "en" ? "Rating Breakdown" : "Chi tiết điểm số"}
          </p>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.label} className="grid grid-cols-[1fr_auto] items-center gap-3">
                <div>
                  <p className="text-xs text-text-secondary mb-1">{item.label}</p>
                  <ScoreBar score={item.score} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {verdict && (
        <div className="border-t border-surface-border pt-4">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
            {locale === "en" ? "Verdict" : "Kết luận"}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed italic">"{verdict}"</p>
        </div>
      )}
    </div>
  );
}
