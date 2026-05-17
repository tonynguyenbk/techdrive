"use client";

import { useRouter } from "@/i18n/navigation";

type Props = {
  locale: string;
  activeBadge: string;
  basePath: string;
};

const tabs = [
  { value: "all", vi: "Tất cả", en: "All" },
  { value: "first_drive", vi: "Lái thử lần đầu", en: "First Drive" },
  { value: "detailed_review", vi: "Đánh giá chi tiết", en: "Detailed" },
  { value: "long_term", vi: "Dài hạn", en: "Long-term" },
  { value: "comparison", vi: "So sánh", en: "Comparison" },
];

export function ReviewFilterBar({ locale, activeBadge, basePath }: Props) {
  const router = useRouter();
  const lang = locale === "en" ? "en" : "vi";

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== "all") params.set("loai", value);
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
            activeBadge === tab.value
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
