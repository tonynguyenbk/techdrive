import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { LoanCalculator } from "@/components/tools/LoanCalculator";

export const metadata: Metadata = {
  title: "Tính trả góp mua xe",
  description:
    "Tính số tiền trả góp hàng tháng khi mua xe ô tô — lãi suất các ngân hàng, lịch trả nợ chi tiết, tổng tiền lãi phải trả.",
  openGraph: {
    title: "Tính trả góp mua xe | TechDrive",
    description: "Công cụ tính trả góp xe ô tô — chọn ngân hàng, thời hạn vay, xem ngay số tiền trả hàng tháng.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function TinhTraGopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";
  const vi = lang === "vi";

  return (
    <main className="flex-1">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 py-6">

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
          <span className="text-text-secondary">{vi ? "Tính trả góp" : "Loan Calculator"}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text-primary mb-1">
            {vi ? "Tính trả góp mua xe" : "Car Loan Calculator"}
          </h1>
          <p className="text-sm text-text-muted">
            {vi
              ? "Nhập giá xe, tỷ lệ trả trước và thời hạn vay để tính số tiền trả góp hàng tháng"
              : "Enter car price, down payment and loan term to calculate your monthly installments"}
          </p>
        </div>

        <LoanCalculator lang={lang} />

        {/* Info cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              titleVi: "Trả trước bao nhiêu là hợp lý?",
              titleEn: "How much should I put down?",
              bodyVi: "Thông thường các ngân hàng yêu cầu trả trước tối thiểu 20–30% giá xe. Trả trước càng nhiều, lãi suất và tổng tiền lãi càng thấp.",
              bodyEn: "Banks typically require 20–30% minimum down payment. A higher down payment means lower interest and total cost.",
            },
            {
              titleVi: "Thời hạn vay nào tốt nhất?",
              titleEn: "What loan term is best?",
              bodyVi: "Vay 36–48 tháng cho tỷ lệ lãi/gốc tốt nhất. Vay dài hơn (60–84 tháng) giảm gánh nặng hàng tháng nhưng tổng lãi cao hơn đáng kể.",
              bodyEn: "36–48 months gives the best interest-to-principal ratio. Longer terms reduce monthly burden but significantly increase total interest.",
            },
            {
              titleVi: "Lưu ý khi vay mua xe",
              titleEn: "Things to watch out for",
              bodyVi: "Hỏi kỹ lãi suất sau ưu đãi, phí trả trước hạn, và bảo hiểm bắt buộc đi kèm. Một số ngân hàng yêu cầu mua bảo hiểm qua họ.",
              bodyEn: "Ask about post-promotional rates, early repayment fees, and mandatory insurance. Some banks require insurance through them.",
            },
          ].map((card) => (
            <div key={card.titleVi} className="p-4 rounded-xl border border-surface-border bg-surface-card">
              <h3 className="text-sm font-bold text-text-primary mb-2">
                {vi ? card.titleVi : card.titleEn}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {vi ? card.bodyVi : card.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
