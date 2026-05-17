"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: next });
  }

  return (
    <div className="flex gap-0.5 bg-surface-card rounded-full p-1 border border-surface-border">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={cn(
            "px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase transition-colors cursor-pointer",
            locale === l
              ? "bg-primary text-white"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
