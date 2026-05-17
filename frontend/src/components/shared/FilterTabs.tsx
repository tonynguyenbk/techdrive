"use client";

import { cn } from "@/lib/utils/cn";

export type FilterTab<T extends string = string> = {
  value: T;
  label: string;
  count?: number;
};

type Props<T extends string = string> = {
  tabs: FilterTab<T>[];
  active: T;
  onChange: (value: T) => void;
  className?: string;
};

export function FilterTabs<T extends string = string>({ tabs, active, onChange, className }: Props<T>) {
  return (
    <div className={cn("flex items-center gap-1 flex-wrap", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
            active === tab.value
              ? "bg-primary text-white"
              : "bg-surface-elevated text-text-muted hover:text-text-secondary hover:bg-surface-card border border-surface-border"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn("ml-1.5 text-[10px]", active === tab.value ? "opacity-80" : "opacity-50")}>
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
