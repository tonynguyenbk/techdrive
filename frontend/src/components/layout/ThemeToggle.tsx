"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

const CYCLE = ["light", "dark", "system"] as const;
type Theme = (typeof CYCLE)[number];

const ICONS: Record<Theme, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  const current = (CYCLE.includes(theme as Theme) ? theme : "system") as Theme;
  const Icon = ICONS[current];

  function cycle() {
    const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
    setTheme(next);
  }

  const labels: Record<Theme, string> = { light: "Sáng", dark: "Tối", system: "Hệ thống" };

  return (
    <button
      onClick={cycle}
      className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors cursor-pointer"
      aria-label={`Theme: ${labels[current]} — click để đổi`}
      title={`${labels[current]} → ${labels[CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length]]}`}
    >
      <Icon size={17} />
    </button>
  );
}
