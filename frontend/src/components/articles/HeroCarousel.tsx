"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/utils/format";
import type { ArticleCard } from "@/types/article";
import { ArticleBadge } from "./ArticleBadge";
import { ScoreBadge } from "./ScoreBadge";

const INTERVAL_MS = 5000;

type Props = {
  articles: ArticleCard[];
  locale?: string;
};

export function HeroCarousel({ articles, locale = "vi" }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const dirRef = useRef<1 | -1>(1); // 1 = forward, -1 = backward
  const touchStartX = useRef<number | null>(null);
  const lang = locale === "en" ? "en" : "vi";
  const count = articles.length;

  const go = useCallback((index: number) => {
    setCurrent(((index % count) + count) % count);
  }, [count]);

  const next = useCallback(() => go(current + 1), [go, current]);
  const prev = useCallback(() => go(current - 1), [go, current]);

  const advance = useCallback(() => {
    setCurrent(c => {
      const next = c + dirRef.current;
      if (next >= count - 1) dirRef.current = -1;
      if (next <= 0) dirRef.current = 1;
      return Math.min(Math.max(next, 0), count - 1);
    });
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(t);
  }, [advance, paused, count]);

  if (!articles.length) return null;

  return (
    <div
      className="relative h-[480px] md:h-[520px] rounded-xl overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
        style={{ width: `${count * 100}%`, transform: `translateX(-${(current * 100) / count}%)` }}
      >
        {articles.map((article, i) => {
          const title = lang === "vi" ? article.title_vi : article.title_en;
          const excerpt = lang === "vi" ? article.excerpt_vi : article.excerpt_en;
          const slug = lang === "vi" ? article.slug_vi : article.slug_en;
          const href = article.category === "review" ? `/danh-gia/${slug}` : `/tin-tuc/${slug}`;
          const imageSrc = article.featured_image ||
            `https://picsum.photos/seed/${encodeURIComponent(article.slug_vi)}/1200/675`;

          return (
            <div
              key={article.id}
              className="relative flex-shrink-0 h-full"
              style={{ width: `${100 / count}%` }}
            >
              <Link href={href as "/"} className="group block h-full" tabIndex={i === current ? 0 : -1}>
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-5 left-5 right-16 z-10 flex items-start justify-between">
                  <ArticleBadge
                    category={article.category}
                    reviewBadge={article.review_badge}
                    locale={locale}
                    size="md"
                  />
                  {article.score !== null && <ScoreBadge score={article.score} size="lg" />}
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 pb-14 md:pb-16">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                    {lang === "vi" ? "Bài viết nổi bật" : "Featured"}
                  </p>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight max-w-2xl group-hover:text-primary/90 transition-colors line-clamp-3 md:line-clamp-2">
                    {title}
                  </h1>
                  <p className="mt-2 text-sm text-white/70 max-w-xl line-clamp-2 hidden md:block">
                    {excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
                    <span>{article.author.name}</span>
                    <span>·</span>
                    <span>{formatDate(article.published_at, locale === "en" ? "en-US" : "vi-VN")}</span>
                    <span>·</span>
                    <span>{article.reading_time_minutes} phút đọc</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Arrow buttons */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary text-white transition-colors"
            aria-label="Bài trước"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary text-white transition-colors"
            aria-label="Bài tiếp theo"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dot indicators + progress bar */}
      {count > 1 && (
        <div className="absolute bottom-5 left-6 z-20 flex items-center gap-2">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Đến bài ${i + 1}`}
              className={[
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                i === current
                  ? "bg-primary w-8"
                  : "bg-white/40 w-1.5 hover:bg-white/70",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
