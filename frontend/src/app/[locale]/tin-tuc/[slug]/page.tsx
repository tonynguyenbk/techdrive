import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils/format";
import { getArticleBySlug, getMostViewed, getRelatedArticles } from "@/lib/api/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MostViewedSidebar } from "@/components/articles/MostViewedSidebar";
import { ArticleBadge } from "@/components/articles/ArticleBadge";
import { Eye, Clock, ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/utils/format";

type Params = { locale: string; slug: string };

export default async function ArticleDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const lang = locale === "en" ? "en" : "vi";
  const [article, mostViewed] = await Promise.all([
    getArticleBySlug(slug, lang),
    getMostViewed(5),
  ]);
  if (!article) notFound();

  const title = lang === "vi" ? article.title_vi : article.title_en;
  const excerpt = lang === "vi" ? article.excerpt_vi : article.excerpt_en;
  const content = lang === "vi" ? article.content_vi : article.content_en;

  const relatedArticles = await getRelatedArticles(article.category, article.id, 3);

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <Link href="/tin-tuc" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Tin tức" : "News"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary line-clamp-1">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Article content */}
          <article>
            {/* Hero image placeholder */}
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <ArticleBadge
                  category={article.category}
                  reviewBadge={article.review_badge}
                  locale={locale}
                  size="md"
                />
              </div>
              {/* Article title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-3 mb-4 pb-4 border-b border-surface-border">
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

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-8 pt-6 border-t border-surface-border">
                <span className="text-xs text-text-muted">{lang === "vi" ? "Tags:" : "Tags:"}</span>
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

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div>
                <p className="text-sm font-bold text-primary mb-3">
                  {lang === "vi" ? "📖 Bài viết liên quan" : "📖 Related Articles"}
                </p>
                <div className="flex flex-col gap-3">
                  {relatedArticles.map((a) => (
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
