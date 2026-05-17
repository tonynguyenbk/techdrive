import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, GitCompare } from "lucide-react";

export const metadata: Metadata = {
  title: "So sánh",
  description: "So sánh xe ô tô cùng phân khúc, đối chiếu thông số kỹ thuật, giá bán và đánh giá chuyên sâu.",
  openGraph: {
    title: "So sánh xe | TechDrive",
    description: "So sánh xe ô tô cùng phân khúc — thông số, giá bán, điểm đánh giá.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function SoSanhPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{lang === "vi" ? "So sánh xe" : "Compare Cars"}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            {lang === "vi" ? "So sánh xe ô tô" : "Compare Cars"}
          </h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? "Đối chiếu thông số kỹ thuật, giá bán và đánh giá giữa các mẫu xe cùng phân khúc"
              : "Side-by-side specs, pricing and reviews for cars in the same segment"}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-elevated border border-surface-border flex items-center justify-center">
            <GitCompare size={28} className="text-primary" />
          </div>
          <p className="text-lg font-bold text-text-primary">
            {lang === "vi" ? "Tính năng đang phát triển" : "Coming Soon"}
          </p>
          <p className="text-sm text-text-muted max-w-sm">
            {lang === "vi"
              ? "Công cụ so sánh xe sẽ ra mắt trong thời gian tới. Trong lúc đó, bạn có thể xem bảng giá và đánh giá xe."
              : "The car comparison tool is coming soon. Meanwhile, check out our price guide and reviews."}
          </p>
          <div className="flex gap-3 mt-2">
            <Link href="/danh-gia" className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
              {lang === "vi" ? "Xem đánh giá" : "See Reviews"}
            </Link>
            <Link href="/bang-gia" className="px-4 py-2 rounded-lg bg-surface-elevated border border-surface-border text-sm font-semibold text-text-secondary hover:border-primary transition-colors">
              {lang === "vi" ? "Bảng giá xe" : "Price Guide"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
