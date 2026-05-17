import { cn } from "@/lib/utils/cn";

function scoreColor(score: number): string {
  if (score >= 9) return "border-score-excellent text-score-excellent";
  if (score >= 7) return "border-score-good text-score-good";
  if (score >= 5) return "border-score-average text-score-average";
  return "border-score-bad text-score-bad";
}

type Props = {
  score: number;
  size?: "sm" | "lg";
};

export function ScoreBadge({ score, size = "sm" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-2 font-black leading-none",
        "bg-black/60 backdrop-blur-sm",
        scoreColor(score),
        size === "sm" ? "w-9 h-9 text-sm" : "w-14 h-14 text-2xl"
      )}
    >
      {score}
    </div>
  );
}
