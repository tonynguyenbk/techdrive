import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { getCarModels } from "@/lib/api/cars";
import { CarFinderQuiz } from "@/components/tools/CarFinderQuiz";

export const metadata: Metadata = {
  title: "Tư vấn chọn xe",
  description:
    "Trả lời 5 câu hỏi đơn giản để nhận gợi ý mẫu xe phù hợp nhất với ngân sách, nhu cầu và sở thích của bạn.",
  openGraph: {
    title: "Tư vấn chọn xe | TechDrive",
    description: "Công cụ gợi ý xe thông minh — chỉ 5 câu hỏi, nhận ngay top xe phù hợp nhất.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function ChonXePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";
  const vi = lang === "vi";

  const { models: allModels } = await getCarModels({ pageSize: 100, status: "on_sale" });

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">

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
          <span className="text-text-secondary">{vi ? "Tư vấn chọn xe" : "Car Finder"}</span>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            {vi ? "Tư vấn chọn xe" : "Find Your Perfect Car"}
          </h1>
          <p className="text-sm text-text-muted">
            {vi
              ? "Trả lời 5 câu hỏi ngắn để nhận gợi ý mẫu xe phù hợp nhất với bạn"
              : "Answer 5 quick questions and get personalized car recommendations"}
          </p>
        </div>

        <CarFinderQuiz allModels={allModels} lang={lang} />
      </div>
    </main>
  );
}
