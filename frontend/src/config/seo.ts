export const seoDefaults = {
  siteName: "TechDrive",
  siteUrl: "https://techdrive.vn",
  defaultTitle: "TechDrive — Tin tức & Đánh giá ô tô hàng đầu Việt Nam",
  defaultDescription:
    "Tin tức, đánh giá xe, bảng giá và công cụ so sánh ô tô tại Việt Nam. Thông tin xe chính xác, đánh giá chuyên sâu.",
  defaultOgImage: "https://techdrive.vn/og-default.jpg",
  twitterHandle: "@TechDriveVN",
} as const;

export function buildTitle(pageTitle: string): string {
  return `${pageTitle} | ${seoDefaults.siteName}`;
}
