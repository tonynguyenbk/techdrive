"use client";

import { useRouter, usePathname } from "@/i18n/navigation";

type Props = {
  locale: string;
  activeCategory: string;
  basePath: string;
};

const tabs = [
  { value: "all", vi: "Tất cả", en: "All" },
  { value: "news", vi: "Tin mới", en: "News" },
  { value: "advice", vi: "Tư vấn", en: "Advice" },
  { value: "video", vi: "Video", en: "Video" },
];

export function NewsFilterBar({ locale, activeCategory, basePath }: Props) {
  const router = useRouter();
  const lang = locale === "en" ? "en" : "vi";

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== "all") params.set("danh_muc", value);
    const query = params.toString();
    router.push((query ? `${basePath}?${query}` : basePath) as "/");
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleChange(tab.value)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            activeCategory === tab.value
              ? "bg-primary text-white"
              : "bg-surface-elevated border border-surface-border text-text-muted hover:text-text-secondary"
          }`}
        >
          {lang === "vi" ? tab.vi : tab.en}
        </button>
      ))}
    </div>
  );
}
