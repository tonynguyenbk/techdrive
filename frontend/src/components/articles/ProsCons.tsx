import { Check, X } from "lucide-react";

type Props = {
  pros: string[];
  cons: string[];
  locale?: string;
};

export function ProsCons({ pros, cons, locale = "vi" }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-score-good/30 bg-score-good/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-score-good mb-3">
          {locale === "en" ? "Pros" : "Ưu điểm"}
        </p>
        <ul className="flex flex-col gap-2">
          {pros.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <Check size={14} className="text-score-good flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-score-bad/30 bg-score-bad/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-score-bad mb-3">
          {locale === "en" ? "Cons" : "Nhược điểm"}
        </p>
        <ul className="flex flex-col gap-2">
          {cons.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <X size={14} className="text-score-bad flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
