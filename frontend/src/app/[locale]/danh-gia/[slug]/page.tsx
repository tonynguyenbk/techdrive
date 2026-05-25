import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatDate, formatNumber } from "@/lib/utils/format";
import { getArticleBySlug, getMostViewed, getReviews } from "@/lib/api/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MostViewedSidebar } from "@/components/articles/MostViewedSidebar";
import { ArticleBadge } from "@/components/articles/ArticleBadge";
import { ScoreBreakdown } from "@/components/articles/ScoreBreakdown";
import { ProsCons } from "@/components/articles/ProsCons";
import { Eye, Clock, ChevronRight } from "lucide-react";

type Params = { locale: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale === "en" ? "en" : "vi";
  const article = await getArticleBySlug(slug, lang);
  if (!article) return { title: "Đánh giá không tồn tại" };

  const title = (lang === "vi" ? article.seo?.meta_title || article.title_vi : article.title_en) ?? article.title_vi;
  const description = (lang === "vi" ? article.seo?.meta_description || article.excerpt_vi : article.excerpt_en) ?? article.excerpt_vi;
  const image = article.seo?.og_image || article.featured_image;
  const scoreStr = article.score !== null ? ` — ${article.score}/10` : "";

  return {
    title: `${title}${scoreStr}`,
    description,
    openGraph: {
      title: `${title}${scoreStr}`,
      description,
      type: "article",
      publishedTime: article.published_at,
      images: image ? [{ url: image, width: 1200, height: 675, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}${scoreStr}`,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ReviewDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";
  const [article, mostViewed, { articles: relatedReviews }] = await Promise.all([
    getArticleBySlug(slug, lang),
    getMostViewed(5),
    getReviews({ pageSize: 4 }),
  ]);
  if (!article) notFound();

  const title = lang === "vi" ? article.title_vi : article.title_en;
  const excerpt = lang === "vi" ? article.excerpt_vi : article.excerpt_en;
  const content = lang === "vi" ? article.content_vi : article.content_en;
  const verdict = lang === "vi" ? article.verdict_vi : article.verdict_en;

  const scoreItems = [
    { label: lang === "vi" ? "Thiết kế" : "Design", score: article.score_design ?? 0 },
    { label: lang === "vi" ? "Vận hành" : "Performance", score: article.score_performance ?? 0 },
    { label: lang === "vi" ? "Tiện nghi" : "Comfort", score: article.score_comfort ?? 0 },
    { label: lang === "vi" ? "Công nghệ" : "Technology", score: article.score_tech ?? 0 },
    { label: lang === "vi" ? "Giá trị" : "Value", score: article.score_value ?? 0 },
  ].filter((item) => item.score > 0);

  const filteredRelated = relatedReviews.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <Link href="/danh-gia" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Đánh giá" : "Reviews"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary line-clamp-1">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Review content */}
          <article>
            {/* Hero */}
            <div className="relative h-[420px] rounded-xl overflow-hidden mb-6">
              <Image
                src={article.featured_image || `https://picsum.photos/seed/${encodeURIComponent(article.slug_vi)}/1200/675`}
                alt={title}
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <ArticleBadge
                  category={article.category}
                  reviewBadge={article.review_badge}
                  locale={locale}
                  size="md"
                />
              </div>
              {article.score !== null && (
                <div className="absolute top-4 right-4 flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-black/60 backdrop-blur border border-white/10">
                  <span className="text-2xl font-black text-white leading-none">{article.score}</span>
                  <span className="text-[9px] text-white/60 mt-0.5">/10</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-3 mb-5 pb-4 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center text-xs font-bold text-primary">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-secondary">{article.author.name}</p>
                  <p className="text-[10px] text-text-muted capitalize">{article.author.role}</p>
                </div>
              </div>
              <span className="text-surface-border">|</span>
              <span className="text-xs text-text-muted">
                {formatDate(article.published_at, locale === "en" ? "en-US" : "vi-VN")}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={12} />
                {article.reading_time_minutes} {lang === "vi" ? "phút đọc" : "min read"}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Eye size={12} />
                {formatNumber(article.view_count)}
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-base text-text-secondary leading-relaxed mb-6 font-medium italic border-l-2 border-primary pl-4">
              {excerpt}
            </p>

            {/* Score breakdown (review only) */}
            {article.score !== null && scoreItems.length > 0 && (
              <div className="mb-6">
                <ScoreBreakdown
                  overallScore={article.score}
                  items={scoreItems}
                  verdict={verdict}
                  locale={locale}
                />
              </div>
            )}

            {/* Pros / Cons */}
            {(article.pros.length > 0 || article.cons.length > 0) && (
              <div className="mb-6">
                <ProsCons pros={article.pros} cons={article.cons} locale={locale} />
              </div>
            )}

            {/* Article body */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-8 pt-6 border-t border-surface-border">
                <span className="text-xs text-text-muted">Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-full bg-surface-elevated border border-surface-border text-text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author bio */}
            <div className="mt-8 p-5 rounded-xl bg-surface-card border border-surface-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center text-lg font-black text-primary flex-shrink-0">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{article.author.name}</p>
                  <p className="text-xs text-text-muted capitalize mb-2">{article.author.role}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {lang === "vi" ? article.author.bio_vi : article.author.bio_en}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6">
            <MostViewedSidebar items={mostViewed} locale={locale} />

            {/* More reviews */}
            {filteredRelated.length > 0 && (
              <div>
                <p className="text-sm font-bold text-primary mb-3">
                  {lang === "vi" ? "⭐ Đánh giá khác" : "⭐ More Reviews"}
                </p>
                <div className="flex flex-col gap-3">
                  {filteredRelated.map((a) => (
                    <ArticleCard
                      key={a.id}
                      article={a}
                      locale={locale}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
