import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DealerMap } from "@/components/dealers/DealerMap";

export const metadata: Metadata = {
  title: "Hệ thống đại lý xe ô tô | TechDrive",
  description:
    "Bản đồ toàn bộ showroom & đại lý ô tô chính hãng tại Việt Nam — Toyota, Honda, Hyundai, Kia, Mazda, VinFast, Ford, Mercedes-Benz, BMW và nhiều hãng khác.",
  openGraph: {
    title: "Hệ thống đại lý xe ô tô | TechDrive",
    description: "Tìm showroom & đại lý ô tô gần bạn — xem Street View, gọi điện, chỉ đường ngay.",
    type: "website",
  },
};

type Props = { params: Promise<{ locale: string }> };

export default async function DaiLyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <DealerMap />
    </main>
  );
}
