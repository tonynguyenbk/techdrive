import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Video",
  description: "Video đánh giá xe, lái thử thực tế, so sánh và tin tức ô tô mới nhất từ TechDrive.",
  openGraph: {
    title: "Video | TechDrive",
    description: "Video đánh giá xe, lái thử thực tế và tin tức ô tô mới nhất từ TechDrive.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function VideoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  return (
    <main className="flex-1">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">Video</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">Video</h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? "Đánh giá xe, lái thử thực tế và tin tức ô tô qua định dạng video"
              : "Car reviews, real-world test drives and automotive news in video format"}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Play size={28} className="text-red-500" />
          </div>
          <p className="text-lg font-bold text-text-primary">
            {lang === "vi" ? "Kênh video đang chuẩn bị ra mắt" : "Video channel coming soon"}
          </p>
          <p className="text-sm text-text-muted max-w-sm">
            {lang === "vi"
              ? "TechDrive sẽ sớm ra mắt kênh video với các nội dung lái thử, đánh giá và so sánh xe thực tế."
              : "TechDrive will soon launch a video channel featuring test drives, reviews and real-world car comparisons."}
          </p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
          >
            <Play size={16} />
            {lang === "vi" ? "Theo dõi kênh YouTube" : "Subscribe on YouTube"}
          </a>
        </div>
      </div>
    </main>
  );
}
