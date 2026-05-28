import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { getArticles, getFeaturedArticles, getMostViewed, getReviews } from "@/lib/api/articles";
import { getPriceBrands } from "@/lib/api/cars";
import { HeroCarousel } from "@/components/articles/HeroCarousel";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MostViewedSidebar } from "@/components/articles/MostViewedSidebar";
import { PriceCard } from "@/components/cars/PriceCard";
import { CompareWidget } from "@/components/tools/CompareWidget";
import { ToolCard } from "@/components/tools/ToolCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params as { locale: string };
  setRequestLocale(locale);

  const t = await getTranslations("home");

  const lang = locale === "en" ? "en" : "vi";
  const now = new Date();

  const [{ articles: latestNews }, { articles: latestReviews }, featuredArticles, mostViewed, priceBrands] = await Promise.all([
    getArticles({ pageSize: 4, category: "news" }),
    getReviews({ pageSize: 3 }),
    getFeaturedArticles(5),
    getMostViewed(5),
    getPriceBrands(8),
  ]);

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6 flex flex-col gap-10">

        {/* ① HERO CAROUSEL */}
        {(featuredArticles.length > 0 || mostViewed.length > 0) && (
          <section>
            <HeroCarousel articles={featuredArticles.length > 0 ? featuredArticles : mostViewed} locale={locale} />
          </section>
        )}

        {/* ② NEWS GRID + MOST VIEWED SIDEBAR */}
        <section>
          <SectionHeader
            title={t("latest_news")}
            viewAllHref="/tin-tuc"
            viewAllLabel={t("view_all")}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
            {/* 2×2 news grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestNews.map((article) => (
                <ArticleCard key={article.id} article={article} locale={locale} />
              ))}
            </div>
            {/* Sidebar */}
            <MostViewedSidebar items={mostViewed} locale={locale} />
          </div>
        </section>

        {/* ③ REVIEWS GRID */}
        <section>
          <SectionHeader
            title={`⭐ ${t("latest_reviews")}`}
            viewAllHref="/danh-gia"
            viewAllLabel={t("view_all")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestReviews.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                locale={locale}
                variant="tall"
              />
            ))}
          </div>
        </section>

        {/* ④ PRICE TABLE */}
        <section>
          <div
            className="rounded-xl border border-surface-border p-5"
            style={{ background: "#111111" }}
          >
            <SectionHeader
              title={`💰 ${t("monthly_prices", { month: String(now.getMonth() + 1), year: String(now.getFullYear()) })}`}
              viewAllHref="/bang-gia"
              viewAllLabel={lang === "vi" ? "Xem tất cả hãng →" : "View all brands →"}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {priceBrands.map((brand) => (
                <PriceCard key={brand.slug} brand={brand} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ⑤ COMPARE TOOL */}
        <section>
          <CompareWidget
            title={t("compare_title")}
            description={t("compare_desc")}
            ctaLabel={t("compare_cta")}
            advancedLabel={lang === "vi" ? "So sánh nâng cao" : "Advanced compare"}
          />
        </section>

        {/* ⑥ USEFUL TOOLS */}
        <section>
          <SectionHeader title={`🛠️ ${t("useful_tools")}`} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ToolCard
              icon="📊"
              title={t("tool_valuation")}
              description={t("tool_valuation_desc")}
              href="/tu-van"
              accentColor="hover:border-score-good"
            />
            <ToolCard
              icon="🧮"
              title={t("tool_onroad")}
              description={t("tool_onroad_desc")}
              href="/tu-van"
              accentColor="hover:border-badge-news"
            />
            <ToolCard
              icon="🏆"
              title={t("tool_finder")}
              description={t("tool_finder_desc")}
              href="/tim-xe"
              accentColor="hover:border-badge-compare"
            />
          </div>
        </section>

      </div>
    </main>
  );
}
