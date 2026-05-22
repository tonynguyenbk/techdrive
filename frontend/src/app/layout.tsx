import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthDialog } from "@/components/auth/AuthDialog";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
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
        <ThemeProvider>
          <AuthProvider>
            {children}
            <AuthDialog />
          </AuthProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TechDrive",
              url: "https://techdrive.vn",
              logo: "https://techdrive.vn/logo.png",
              description: "Trang tin tức & đánh giá ô tô hàng đầu Việt Nam. Độc lập, khách quan, đáng tin cậy.",
              sameAs: [
                "https://facebook.com/techdrivevn",
                "https://youtube.com/@techdrivevn",
                "https://instagram.com/techdrivevn",
                "https://x.com/techdrivevn",
                "https://reddit.com/r/techdrivevn",
                "https://tiktok.com/@techdrivevn",
                "https://linkedin.com/company/techdrivevn",
                "https://shopee.vn/techdrivevn",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
