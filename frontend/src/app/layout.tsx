import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TechDrive",
    default: "TechDrive — Tin tức & Đánh giá ô tô hàng đầu Việt Nam",
  },
  description:
    "Tin tức, đánh giá xe, bảng giá và công cụ so sánh ô tô tại Việt Nam. Thông tin xe chính xác, đánh giá chuyên sâu.",
  metadataBase: new URL("https://techdrive.vn"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${beVietnamPro.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-surface text-text-primary">
        {children}
      </body>
    </html>
  );
}
