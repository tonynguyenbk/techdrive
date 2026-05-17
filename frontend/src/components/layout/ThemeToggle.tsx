"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

const THEMES = [
  { value: "system", label: "Hệ thống", icon: Monitor },
  { value: "dark",   label: "Tối",      icon: Moon   },
  { value: "light",  label: "Sáng",     icon: Sun    },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  const current = THEMES.find((t) => t.value === theme) ?? THEMES[1];
  const Icon = resolvedTheme === "light" ? Sun : Moon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors cursor-pointer"
        aria-label="Chọn theme"
        title={`Theme: ${current.label}`}
      >
        <Icon size={17} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 min-w-[120px] rounded-xl border border-surface-border bg-surface-card shadow-xl overflow-hidden">
          {THEMES.map(({ value, label, icon: ItemIcon }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                theme === value
                  ? "text-primary bg-surface-elevated font-semibold"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-elevated"
              }`}
            >
              <ItemIcon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
