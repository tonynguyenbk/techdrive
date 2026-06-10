import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Mail, Megaphone, Briefcase, Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ tòa soạn TechDrive — góp ý nội dung, hợp tác quảng cáo và tuyển dụng.",
  openGraph: {
    title: "Liên hệ | TechDrive",
    description: "Liên hệ tòa soạn TechDrive — góp ý nội dung, hợp tác quảng cáo và tuyển dụng.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  const sections = [
    {
      id: "toa-soan",
      icon: Newspaper,
      titleVi: "Liên hệ tòa soạn",
      titleEn: "Editorial contact",
      descVi: "Góp ý nội dung, báo lỗi thông tin, hoặc gửi thông cáo báo chí.",
      descEn: "Content feedback, factual corrections, or press releases.",
    },
    {
      id: "quang-cao",
      icon: Megaphone,
      titleVi: "Hợp tác quảng cáo",
      titleEn: "Advertising",
      descVi: "Đặt banner, bài tài trợ, hoặc các hình thức hợp tác thương mại khác.",
      descEn: "Banner placements, sponsored content, or other commercial partnerships.",
    },
    {
      id: "tuyen-dung",
      icon: Briefcase,
      titleVi: "Tuyển dụng",
      titleEn: "Careers",
      descVi: "TechDrive luôn tìm kiếm biên tập viên, nhà báo và lập trình viên đam mê ô tô. Gửi CV và portfolio của bạn cho chúng tôi.",
      descEn: "TechDrive is always looking for editors, journalists and developers who love cars. Send us your CV and portfolio.",
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
            {lang === "vi" ? "Liên hệ" : "Contact"}
          </span>
        </nav>

        <div className="mb-8 max-w-2xl">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            {lang === "vi" ? "Liên hệ" : "Contact us"}
          </h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? "Chọn đúng đầu mối bên dưới để chúng tôi phản hồi nhanh nhất."
              : "Pick the right contact below for the fastest response."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {sections.map(({ id, icon: Icon, titleVi, titleEn, descVi, descEn }) => (
            <div
              key={id}
              id={id}
              className="p-5 rounded-xl border border-surface-border bg-surface-card scroll-mt-24"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h2 className="font-bold text-text-primary mb-1">
                {lang === "vi" ? titleVi : titleEn}
              </h2>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {lang === "vi" ? descVi : descEn}
              </p>
              <a
                href="mailto:hello@techdrive.vn"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <Mail size={14} />
                hello@techdrive.vn
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
