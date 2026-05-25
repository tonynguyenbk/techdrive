import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Calculator } from "lucide-react";
import { OnRoadCostCalculator } from "@/components/tools/OnRoadCostCalculator";

export const metadata: Metadata = {
  title: "Tính chi phí lăn bánh",
  description:
    "Công cụ tính chi phí lăn bánh xe ô tô tại Việt Nam: thuế trước bạ, phí đăng ký, đăng kiểm, bảo hiểm — tra theo từng tỉnh thành.",
  openGraph: {
    title: "Tính chi phí lăn bánh | TechDrive",
    description:
      "Ước tính tổng chi phí thực tế khi mua xe mới: thuế trước bạ, phí đăng ký, đăng kiểm và bảo hiểm.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function TinhLanBanhPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";
  const vi = lang === "vi";

  return (
    <main className="flex-1">
      <div className="max-w-screen-2xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {vi ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <Link href="/tu-van" className="hover:text-text-secondary transition-colors">
            {vi ? "Tư vấn" : "Advice"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">
            {vi ? "Tính chi phí lăn bánh" : "On-road Cost Calculator"}
          </span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Calculator size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary leading-tight">
              {vi ? "Tính chi phí lăn bánh" : "On-road Cost Calculator"}
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              {vi
                ? "Ước tính tổng chi phí thực tế khi mua xe mới tại Việt Nam"
                : "Estimate the true cost of buying a new car in Vietnam"}
            </p>
          </div>
        </div>

        <OnRoadCostCalculator lang={lang} />

        {/* Explainer */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              titleVi: "Lệ phí trước bạ",
              titleEn: "Registration tax",
              descVi: "Hà Nội 12%, TP.HCM và các tỉnh thành còn lại 10% (lần đầu). Lần tiếp theo giảm còn 2–6%.",
              descEn: "Hanoi 12%, HCM and other provinces 10% (first time). Subsequent registrations are 2–6%.",
            },
            {
              titleVi: "Phí đăng ký xe",
              titleEn: "Registration fee",
              descVi: "Bao gồm phí cấp biển số và thủ tục đăng ký tại Phòng CSGT. Dao động từ 200.000 – 1.000.000 ₫.",
              descEn: "Includes license plate and DMV registration paperwork. Ranges from 200K to 1M VND.",
            },
            {
              titleVi: "Đăng kiểm lần đầu",
              titleEn: "First inspection",
              descVi: "Xe mới xuất xưởng được miễn đăng kiểm lần đầu trong 30 tháng. Phí khoảng 560.000 ₫.",
              descEn: "New cars are exempt from the first inspection for 30 months. Fee approx. 560,000 VND.",
            },
            {
              titleVi: "Bảo hiểm bắt buộc",
              titleEn: "Compulsory insurance",
              descVi: "TNDS bắt buộc theo Nghị định 03/2021. Xe dưới 6 chỗ: 479.000 ₫/năm. 7–9 chỗ: 679.000 ₫/năm.",
              descEn: "Mandatory civil liability (Decree 03/2021). Under 6 seats: 479K VND/yr. 7–9 seats: 679K VND/yr.",
            },
          ].map((item) => (
            <div key={item.titleVi} className="p-4 rounded-xl bg-surface-card border border-surface-border">
              <p className="text-xs font-bold text-primary mb-1.5">{vi ? item.titleVi : item.titleEn}</p>
              <p className="text-xs text-text-muted leading-relaxed">{vi ? item.descVi : item.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
