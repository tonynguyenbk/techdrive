import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils/format";
import { getArticleBySlug, getMostViewed, getRelatedArticles } from "@/lib/api/articles";
import { getArticleImage } from "@/lib/utils/article-images";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { MostViewedSidebar } from "@/components/articles/MostViewedSidebar";
import { ArticleBadge } from "@/components/articles/ArticleBadge";
import { GalleryGrid } from "@/components/ui/Lightbox";
import { Eye, Clock, ChevronRight } from "lucide-react";
import { formatNumber } from "@/lib/utils/format";

type Params = { locale: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale === "en" ? "en" : "vi";
  const article = await getArticleBySlug(slug, lang);
  if (!article) return { title: "Bài viết không tồn tại" };

  const title = (lang === "vi" ? article.seo?.meta_title || article.title_vi : article.title_en) ?? article.title_vi;
  const description = (lang === "vi" ? article.seo?.meta_description || article.excerpt_vi : article.excerpt_en) ?? article.excerpt_vi;
  const image = article.seo?.og_image || article.featured_image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at,
      images: image ? [{ url: image, width: 1200, height: 675, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.category === "review" ? "Review" : "NewsArticle",
    "headline": title,
    "description": excerpt,
    "image": article.featured_image ? [article.featured_image] : [],
    "datePublished": article.published_at,
    "dateModified": article.updated_at,
    "author": {
      "@type": "Person",
      "name": article.author?.name ?? "TechDrive",
      "jobTitle": article.author?.role === "editor" ? "Tổng biên tập" : "Nhà báo",
    },
    "publisher": {
      "@type": "Organization",
      "name": "TechDrive",
      "url": "https://techdrive.vn",
      "logo": { "@type": "ImageObject", "url": "https://techdrive.vn/logo.png" },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://techdrive.vn/danh-gia/${article.slug_vi}` },
    ...(article.score ? { "reviewRating": { "@type": "Rating", "ratingValue": article.score, "bestRating": 10 } } : {}),
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-[1332px] mx-auto px-4 py-6">

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
            {/* Hero image */}
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
              <Image
                src={article.featured_image || getArticleImage(article.slug_vi) || `https://picsum.photos/seed/${encodeURIComponent(article.slug_vi)}/1200/675`}
                alt={title}
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
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

            {/* Gallery */}
            {article.gallery && article.gallery.filter(Boolean).length > 0 && (
              <GalleryGrid
                images={article.gallery.filter(Boolean) as string[]}
                title={title ?? ""}
                label={lang === "vi" ? "Ảnh trong bài" : "Photo Gallery"}
              />
            )}

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

            {/* Share buttons */}
            {(() => {
              const canonicalUrl = `https://techdrive.vn${locale === "en" ? "/en" : ""}/tin-tuc/${article.slug_vi}`;
              const encodedUrl = encodeURIComponent(canonicalUrl);
              const encodedTitle = encodeURIComponent(title ?? "");
              const shares = [
                {
                  label: "Facebook",
                  href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                  color: "hover:text-[#1877F2] hover:border-[#1877F2]/50",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
                {
                  label: "X",
                  href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
                  color: "hover:text-text-primary hover:border-text-primary/50",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  label: "Reddit",
                  href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
                  color: "hover:text-[#FF4500] hover:border-[#FF4500]/50",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
                  color: "hover:text-[#25D366] hover:border-[#25D366]/50",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                },
              ];
              return (
                <div className="flex items-center flex-wrap gap-3 mt-8 pt-6 border-t border-surface-border">
                  <span className="text-xs font-semibold text-text-muted">
                    {lang === "vi" ? "Chia sẻ:" : "Share:"}
                  </span>
                  {shares.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chia sẻ lên ${s.label}`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border text-text-muted text-xs font-semibold transition-colors ${s.color}`}
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  ))}
                </div>
              );
            })()}

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
