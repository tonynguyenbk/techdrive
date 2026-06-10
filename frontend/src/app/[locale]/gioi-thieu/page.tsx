import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Newspaper, Star, BarChart3, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "TechDrive — trang tin tức & đánh giá ô tô độc lập, khách quan hàng đầu Việt Nam.",
  openGraph: {
    title: "Giới thiệu | TechDrive",
    description: "TechDrive — trang tin tức & đánh giá ô tô độc lập, khách quan hàng đầu Việt Nam.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  const pillars = [
    {
      icon: Newspaper,
      titleVi: "Tin tức",
      titleEn: "News",
      descVi: "Cập nhật nhanh tin tức xe mới, thị trường ô tô Việt Nam và thế giới.",
      descEn: "Fast updates on new car launches and the Vietnamese & global auto market.",
    },
    {
      icon: Star,
      titleVi: "Đánh giá chuyên sâu",
      titleEn: "In-depth Reviews",
      descVi: "Lái thử thực tế, chấm điểm từng hạng mục, không quảng cáo.",
      descEn: "Real-world test drives, scored category by category, no sponsorship.",
    },
    {
      icon: BarChart3,
      titleVi: "Dữ liệu xe",
      titleEn: "Car Data",
      descVi: "Bảng giá, thông số kỹ thuật và so sánh chi tiết từng phiên bản.",
      descEn: "Pricing, specifications and detailed trim-by-trim comparisons.",
    },
    {
      icon: Wrench,
      titleVi: "Công cụ hữu ích",
      titleEn: "Useful Tools",
      descVi: "Tính trả góp, chi phí lăn bánh, tìm xe phù hợp và tìm đại lý.",
      descEn: "Loan calculator, on-road cost, car finder and dealer locator.",
    },
  ];

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">
            {lang === "vi" ? "Giới thiệu" : "About"}
          </span>
        </nav>

        {/* Hero */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-3">
            <span className="text-primary">Tech</span>Drive
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            {lang === "vi"
              ? "TechDrive là trang tin tức & đánh giá ô tô độc lập tại Việt Nam, kết hợp phong cách biên tập của báo chí ô tô quốc tế với hệ thống dữ liệu xe chuyên sâu — giúp người Việt đưa ra quyết định mua xe đúng đắn nhất."
              : "TechDrive is an independent automotive media outlet in Vietnam, combining international automotive editorial style with an in-depth car data system — helping Vietnamese readers make the right car-buying decisions."}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {pillars.map(({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
            <div
              key={titleVi}
              className="p-5 rounded-xl border border-surface-border bg-surface-card"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-text-primary mb-1">
                {lang === "vi" ? titleVi : titleEn}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {lang === "vi" ? descVi : descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Editorial principles */}
        <div className="rounded-xl border border-surface-border bg-surface-card p-6 mb-8 max-w-2xl">
          <h2 className="text-lg font-bold text-text-primary mb-3">
            {lang === "vi" ? "Nguyên tắc biên tập" : "Editorial Principles"}
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {lang === "vi"
              ? "Mọi bài đánh giá tại TechDrive đều được lái thử và viết độc lập bởi đội ngũ biên tập. Không nhà sản xuất hay đại lý nào tài trợ hoặc can thiệp vào kết quả đánh giá."
              : "Every review on TechDrive is independently test-driven and written by our editorial team. No manufacturer or dealer sponsors or influences our review results."}
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {lang === "vi"
              ? "Tiêu chí đánh giá gồm: thiết kế, vận hành, tiện nghi, công nghệ và giá trị tổng thể — luôn đặt trong bối cảnh điều kiện sử dụng thực tế tại Việt Nam."
              : "Our review criteria cover design, performance, comfort, technology and overall value — always considered in the context of real-world conditions in Vietnam."}
          </p>
        </div>

        {/* Contact CTA */}
        <div className="rounded-xl border border-surface-border bg-surface-card p-6 max-w-2xl text-center">
          <p className="text-sm text-text-secondary mb-4">
            {lang === "vi"
              ? "Bạn muốn hợp tác, góp ý hay liên hệ tòa soạn?"
              : "Want to collaborate, give feedback, or reach our editorial team?"}
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors"
          >
            {lang === "vi" ? "Liên hệ với chúng tôi" : "Get in touch"}
          </Link>
        </div>
      </div>
    </main>
  );
}
