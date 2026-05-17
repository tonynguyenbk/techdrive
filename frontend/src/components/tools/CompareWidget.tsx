"use client";

import { Plus } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  description: string;
  ctaLabel: string;
  advancedLabel: string;
};

export function CompareWidget({ title, description, ctaLabel, advancedLabel }: Props) {
  const router = useRouter();

  return (
    <div
      className="rounded-xl border border-surface-border p-6"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #111111 100%)" }}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-extrabold text-text-primary">⚔️ {title}</h2>
        <button
          onClick={() => router.push("/so-sanh")}
          className="text-xs font-semibold text-primary hover:text-primary-light transition-colors cursor-pointer"
        >
          {advancedLabel} →
        </button>
      </div>
      <p className="text-sm text-text-muted mb-5">{description}</p>

      <div className="flex items-center gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="contents">
            {n > 1 && (
              <span className="text-xl font-black text-primary flex-shrink-0">VS</span>
            )}
            <button
              onClick={() => router.push("/so-sanh")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1.5 py-6",
                "rounded-xl border-2 border-dashed border-surface-border",
                "hover:border-primary transition-colors duration-200 cursor-pointer",
                "text-text-muted hover:text-text-secondary"
              )}
            >
              <Plus size={24} className="opacity-50" />
              <span className="text-xs">Chọn xe thứ {n}</span>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/so-sanh")}
        className="mt-4 w-full py-3 rounded-button bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors cursor-pointer"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
