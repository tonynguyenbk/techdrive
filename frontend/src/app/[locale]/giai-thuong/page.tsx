import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Trophy, Star, ChevronRight } from "lucide-react";
import { getArticleBySlug } from "@/lib/api/articles";
import { ArticleBadge } from "@/components/articles/ArticleBadge";
import { ScoreBadge } from "@/components/articles/ScoreBadge";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "TechDrive Car of the Year 2026 — Xe tốt nhất năm",
  description:
    "Giải thưởng Xe của Năm 2026 từ TechDrive: những chiếc xe tốt nhất trong từng phân khúc theo đánh giá chuyên sâu của đội ngũ biên tập.",
  openGraph: {
    title: "TechDrive Car of the Year 2026",
    description: "Những chiếc xe tốt nhất năm 2026 theo đánh giá chuyên sâu của TechDrive.",
    type: "website",
  },
};

// Each category maps to a winner slug + optional runner-up slugs
const AWARDS: {
  category: string;
  categoryEn: string;
  icon: string;
  winner: string;
  runnersUp?: string[];
}[] = [
  {
    category: "SUV/Crossover tốt nhất",
    categoryEn: "Best SUV/Crossover",
    icon: "🏆",
    winner: "danh-gia-hyundai-santa-fe-hybrid-2026-suv-gia-dinh-dang-can-nhac",
    runnersUp: ["mazda-cx5-2024-danh-gia", "so-sanh-cx5-tucson-crv-suv-tam-trung"],
  },
  {
    category: "Xe điện tốt nhất",
    categoryEn: "Best Electric Vehicle",
    icon: "⚡",
    winner: "vinfast-vf9-2026-danh-gia",
    runnersUp: ["vinfast-vf8-the-he-moi-2026"],
  },
  {
    category: "Xe gia đình tốt nhất",
    categoryEn: "Best Family Car",
    icon: "👨‍👩‍👧",
    winner: "kia-carnival-2024-danh-gia",
    runnersUp: ["so-sanh-veloz-xpander-carnival-mpv-gia-dinh"],
  },
  {
    category: "Bán tải tốt nhất",
    categoryEn: "Best Pickup Truck",
    icon: "🛻",
    winner: "ford-ranger-2024-danh-gia",
    runnersUp: [],
  },
];

type Params = { locale: string };

export default async function AwardsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  // Fetch all article data in parallel
  const allSlugs = AWARDS.flatMap((a) => [a.winner, ...(a.runnersUp ?? [])]);
  const articles = await Promise.all(
    allSlugs.map((slug) => getArticleBySlug(slug, lang).catch(() => null))
  );
  const bySlug = Object.fromEntries(
    allSlugs.map((slug, i) => [slug, articles[i]])
  );

  return (
    <main className="flex-1">
      {/* Hero */}
      <div className="bg-gradient-to-b from-surface-card to-surface border-b border-surface-border">
        <div className="max-w-[1332px] mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <Trophy size={13} />
            {lang === "vi" ? "Giải thưởng thường niên" : "Annual Awards"}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary leading-tight tracking-tight mb-4">
            TechDrive<br />
            <span className="text-primary">Car of the Year</span>{" "}
            <span className="text-text-muted">2026</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto text-base leading-relaxed">
            {lang === "vi"
              ? "Những chiếc xe tốt nhất trong từng phân khúc, được lựa chọn bởi đội ngũ biên tập TechDrive sau hàng trăm giờ lái thử và đánh giá thực tế."
              : "The best cars in each segment, selected by TechDrive's editorial team after hundreds of hours of real-world testing."}
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-xs text-text-muted">
            <span className="flex items-center gap-1.5"><Star size={12} className="text-score-average fill-current" /> {lang === "vi" ? "Đánh giá độc lập" : "Independent review"}</span>
            <span>·</span>
            <span>{lang === "vi" ? "Không quảng cáo" : "No sponsorship"}</span>
            <span>·</span>
            <span>{lang === "vi" ? "Lái thử thực tế" : "Real-world tested"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1332px] mx-auto px-4 py-12 flex flex-col gap-16">
        {AWARDS.map((award) => {
          const winner = bySlug[award.winner];
          const runners = (award.runnersUp ?? [])
            .map((s) => bySlug[s])
            .filter(Boolean);

          if (!winner) return null;

          const winnerTitle = lang === "vi" ? winner.title_vi : winner.title_en;
          const winnerSlug = lang === "vi" ? winner.slug_vi : winner.slug_en;
          const winnerHref = winner.category === "review"
            ? `/danh-gia/${winnerSlug}`
            : `/tin-tuc/${winnerSlug}`;
          const winnerImage = winner.featured_image ||
            `https://picsum.photos/seed/${encodeURIComponent(winner.slug_vi)}/1200/675`;

          return (
            <section key={award.winner}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{award.icon}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {lang === "vi" ? "Hạng mục" : "Category"}
                  </p>
                  <h2 className="text-xl font-extrabold text-text-primary leading-tight">
                    {lang === "vi" ? award.category : award.categoryEn}
                  </h2>
                </div>
                <div className="ml-auto h-px flex-1 bg-surface-border" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
                {/* Winner card */}
                <Link href={winnerHref as "/"} className="group block relative rounded-xl overflow-hidden h-[380px]">
                  <Image
                    src={winnerImage}
                    alt={winnerTitle}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                  {/* Winner badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-score-average text-black text-xs font-black uppercase tracking-wide">
                      <Trophy size={11} />
                      {lang === "vi" ? "Người chiến thắng" : "Winner"}
                    </span>
                    {winner.score !== null && <ScoreBadge score={winner.score} size="lg" />}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <ArticleBadge
                      category={winner.category}
                      reviewBadge={winner.review_badge}
                      locale={locale}
                      size="sm"
                    />
                    <h3 className="text-xl font-extrabold text-white mt-2 leading-tight group-hover:text-primary/90 transition-colors line-clamp-2">
                      {winnerTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                      <span>{winner.author.name}</span>
                      <span>·</span>
                      <span>{formatDate(winner.published_at, locale === "en" ? "en-US" : "vi-VN")}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                      {lang === "vi" ? "Đọc đánh giá đầy đủ" : "Read full review"}
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>

                {/* Runners up */}
                {runners.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
                      {lang === "vi" ? "Đề cử khác" : "Also nominated"}
                    </p>
                    {runners.map((r) => {
                      if (!r) return null;
                      const rTitle = lang === "vi" ? r.title_vi : r.title_en;
                      const rSlug = lang === "vi" ? r.slug_vi : r.slug_en;
                      const rHref = r.category === "review" ? `/danh-gia/${rSlug}` : `/tin-tuc/${rSlug}`;
                      const rImage = r.featured_image ||
                        `https://picsum.photos/seed/${encodeURIComponent(r.slug_vi)}/600/400`;
                      return (
                        <Link key={r.id} href={rHref as "/"} className="group flex gap-3 p-3 rounded-xl bg-surface-card border border-surface-border hover:border-primary/40 transition-colors">
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={rImage} alt={rTitle} fill className="object-cover" sizes="80px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-text-primary line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                              {rTitle}
                            </p>
                            {r.score !== null && (
                              <p className="text-xs text-text-muted mt-1">{lang === "vi" ? "Điểm:" : "Score:"} <span className="font-bold text-text-secondary">{r.score}/10</span></p>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Editorial note */}
        <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center">
          <Star size={20} className="mx-auto mb-3 text-score-average fill-current" />
          <p className="text-sm font-bold text-text-primary mb-2">
            {lang === "vi" ? "Về quy trình chọn giải" : "About our selection process"}
          </p>
          <p className="text-xs text-text-muted max-w-lg mx-auto leading-relaxed">
            {lang === "vi"
              ? "Tất cả xe được lái thử và đánh giá độc lập bởi đội ngũ biên tập TechDrive. Không có nhà sản xuất hay đại lý nào tài trợ hoặc ảnh hưởng đến kết quả. Tiêu chí gồm: hiệu suất vận hành, độ tiện nghi, công nghệ, giá trị tổng thể và phù hợp với điều kiện đường Việt Nam."
              : "All vehicles were independently test-driven and reviewed by TechDrive's editorial team. No manufacturer or dealer sponsorship influenced the results. Criteria include driving performance, comfort, technology, overall value and suitability for Vietnamese road conditions."}
          </p>
        </div>
      </div>
    </main>
  );
}
