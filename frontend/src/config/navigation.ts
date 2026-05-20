export const mainNav = [
  { key: "news", href: "/tin-tuc" as const },
  { key: "reviews", href: "/danh-gia" as const },
  { key: "cars", href: "/tim-xe" as const },
  { key: "prices", href: "/bang-gia" as const },
  { key: "compare", href: "/so-sanh" as const },
  { key: "advice", href: "/tu-van" as const },
  { key: "video", href: "/video" as const },
  { key: "dealers", href: "/dai-ly" as const },
] as const;

export const footerNav = {
  brands: [
    { name: "Toyota", slug: "toyota" },
    { name: "Honda", slug: "honda" },
    { name: "Hyundai", slug: "hyundai" },
    { name: "Kia", slug: "kia" },
    { name: "Mazda", slug: "mazda" },
    { name: "VinFast", slug: "vinfast" },
    { name: "Ford", slug: "ford" },
    { name: "Mitsubishi", slug: "mitsubishi" },
  ],
  categories: [
    { key: "news", href: "/tin-tuc" },
    { key: "reviews", href: "/danh-gia" },
    { key: "prices", href: "/bang-gia" },
    { key: "compare", href: "/so-sanh" },
    { key: "advice", href: "/tu-van" },
    { key: "awards", href: "/giai-thuong" },
  ],
  tools: [
    { key: "tool_valuation", href: "/tu-van" },
    { key: "tool_onroad", href: "/tu-van" },
    { key: "tool_finder", href: "/tim-xe" },
  ],
} as const;
