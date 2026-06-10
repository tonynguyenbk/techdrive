import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Lightbulb, Calculator, MapPin, Search, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Tư vấn",
  description: "Tư vấn mua xe, tính chi phí lăn bánh, tìm đại lý và giải đáp mọi thắc mắc về ô tô.",
  openGraph: {
    title: "Tư vấn xe | TechDrive",
    description: "Tư vấn mua xe, tính chi phí lăn bánh, tìm đại lý — giải đáp mọi thắc mắc về ô tô.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

const tools = [
  {
    icon: CreditCard,
    titleVi: "Tính trả góp",
    titleEn: "Loan Calculator",
    descVi: "Tính số tiền trả góp hàng tháng, tổng lãi suất và lịch trả nợ chi tiết theo từng ngân hàng.",
    descEn: "Calculate monthly installments, total interest and full amortization schedule by bank.",
    href: "/tu-van/tinh-tra-gop",
    soon: false,
  },
  {
    icon: Calculator,
    titleVi: "Tính chi phí lăn bánh",
    titleEn: "On-road Cost Calculator",
    descVi: "Tính toán chi phí thực tế khi mua xe gồm thuế, phí trước bạ, bảo hiểm, đăng ký.",
    descEn: "Calculate the true cost of buying a car including taxes, registration, and insurance.",
    href: "/tu-van/tinh-lan-banh",
    soon: false,
  },
  {
    icon: Search,
    titleVi: "Tư vấn chọn xe",
    titleEn: "Car Finder Quiz",
    descVi: "Trả lời vài câu hỏi và nhận gợi ý mẫu xe phù hợp nhất với nhu cầu của bạn.",
    descEn: "Answer a few questions and get personalized car recommendations.",
    href: "/tu-van/chon-xe",
    soon: false,
  },
  {
    icon: MapPin,
    titleVi: "Tìm đại lý",
    titleEn: "Find a Dealer",
    descVi: "Tìm đại lý chính hãng gần bạn nhất theo thương hiệu và khu vực.",
    descEn: "Find the nearest authorized dealer by brand and location.",
    href: "/dai-ly",
    soon: false,
  },
  {
    icon: Lightbulb,
    titleVi: "Cẩm nang mua xe",
    titleEn: "Car Buying Guide",
    descVi: "Hướng dẫn từng bước quy trình mua xe mới, những điều cần lưu ý khi chọn xe.",
    descEn: "Step-by-step guide to buying a new car and what to look out for.",
    href: "/tin-tuc",
    soon: false,
  },
];

export default async function TuVanPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{lang === "vi" ? "Tư vấn" : "Advice"}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            {lang === "vi" ? "Tư vấn mua xe" : "Car Buying Advice"}
          </h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? "Công cụ và hướng dẫn giúp bạn đưa ra quyết định mua xe đúng đắn nhất"
              : "Tools and guides to help you make the right car buying decision"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.titleVi}
                href={tool.href as "/"}
                className="group relative p-6 rounded-xl border border-surface-border bg-surface-card hover:border-primary transition-colors"
              >
                {tool.soon && (
                  <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-surface-elevated border border-surface-border text-text-muted font-semibold">
                    {lang === "vi" ? "Sắp ra mắt" : "Coming soon"}
                  </span>
                )}
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h2 className="font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                  {lang === "vi" ? tool.titleVi : tool.titleEn}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed">
                  {lang === "vi" ? tool.descVi : tool.descEn}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
