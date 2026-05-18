import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { getCarModels, getCarModelsBySlug } from "@/lib/api/cars";
import { CarCompareView } from "@/components/tools/CarCompareView";

export const metadata: Metadata = {
  title: "So sánh xe",
  description:
    "So sánh thông số kỹ thuật, giá bán và trang bị của các mẫu xe ô tô cùng phân khúc tại Việt Nam — động cơ, kích thước, an toàn, tiện nghi.",
  openGraph: {
    title: "So sánh xe ô tô | TechDrive",
    description: "So sánh side-by-side thông số kỹ thuật, giá và trang bị các mẫu xe tại Việt Nam.",
    type: "website",
  },
};

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cars?: string }>;
};

export default async function SoSanhPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { cars: carsParam } = await searchParams;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";
  const vi = lang === "vi";

  const selectedSlugs = carsParam
    ? carsParam.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3)
    : [];

  const [{ models: allModels }, selectedCars] = await Promise.all([
    getCarModels({ pageSize: 100, status: "" }),
    getCarModelsBySlug(selectedSlugs),
  ]);

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {vi ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{vi ? "So sánh xe" : "Compare Cars"}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text-primary mb-1">
            {vi ? "So sánh xe ô tô" : "Compare Cars"}
          </h1>
          <p className="text-sm text-text-muted">
            {vi
              ? "Chọn 2–3 mẫu xe để so sánh thông số kỹ thuật, giá và trang bị chi tiết"
              : "Pick 2–3 cars to compare specs, pricing and features side by side"}
          </p>
        </div>

        <CarCompareView
          selectedCars={selectedCars}
          allModels={allModels}
          lang={lang}
        />
      </div>
    </main>
  );
}
