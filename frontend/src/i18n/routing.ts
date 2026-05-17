import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"] as const,
  defaultLocale: "vi",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/tin-tuc": { vi: "/tin-tuc", en: "/news" },
    "/tin-tuc/[slug]": { vi: "/tin-tuc/[slug]", en: "/news/[slug]" },
    "/danh-gia": { vi: "/danh-gia", en: "/reviews" },
    "/danh-gia/[slug]": { vi: "/danh-gia/[slug]", en: "/reviews/[slug]" },
    "/tim-xe": { vi: "/tim-xe", en: "/cars" },
    "/tim-xe/[brand]": { vi: "/tim-xe/[brand]", en: "/cars/[brand]" },
    "/tim-xe/[brand]/[model]": {
      vi: "/tim-xe/[brand]/[model]",
      en: "/cars/[brand]/[model]",
    },
    "/so-sanh": { vi: "/so-sanh", en: "/compare" },
    "/bang-gia": { vi: "/bang-gia", en: "/prices" },
    "/tu-van": { vi: "/tu-van", en: "/advice" },
    "/video": "/video",
    "/giai-thuong": { vi: "/giai-thuong", en: "/awards" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
