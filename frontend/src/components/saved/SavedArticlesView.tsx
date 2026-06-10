"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Bookmark, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useAuthStore } from "@/store/authStore";
import { ArticleBadge } from "@/components/articles/ArticleBadge";
import { ScoreBadge } from "@/components/articles/ScoreBadge";
import { getArticleImage } from "@/lib/utils/article-images";

export function SavedArticlesView({ lang }: { lang: "vi" | "en" }) {
  const { data: session, status } = useSession();
  const { items, remove } = useBookmarkStore();
  const { openDialog } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (status === "loading" || !mounted) {
    return null;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Bookmark size={36} className="mb-4 text-text-muted opacity-40" />
        <p className="font-bold text-text-primary mb-2">
          {lang === "vi" ? "Đăng nhập để xem bài đã lưu" : "Sign in to view saved articles"}
        </p>
        <p className="text-sm text-text-muted max-w-sm mb-5">
          {lang === "vi"
            ? "Bài viết bạn lưu sẽ xuất hiện ở đây để đọc lại bất cứ lúc nào."
            : "Articles you save will appear here so you can read them later."}
        </p>
        <button
          onClick={openDialog}
          className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors cursor-pointer"
        >
          {lang === "vi" ? "Đăng nhập" : "Sign in"}
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Bookmark size={36} className="mb-4 text-text-muted opacity-40" />
        <p className="font-bold text-text-primary mb-2">
          {lang === "vi" ? "Chưa có bài viết nào được lưu" : "No saved articles yet"}
        </p>
        <p className="text-sm text-text-muted max-w-sm">
          {lang === "vi"
            ? "Bấm vào biểu tượng 🔖 trên bài viết để lưu lại đọc sau."
            : "Tap the 🔖 icon on any article to save it for later."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((a) => {
        const title = lang === "vi" ? a.title_vi : a.title_en;
        const slug = lang === "vi" ? a.slug_vi : a.slug_en;
        const href = a.category === "review" ? `/danh-gia/${slug}` : `/tin-tuc/${slug}`;
        const imageSrc =
          a.featured_image ||
          getArticleImage(a.slug_vi) ||
          `https://picsum.photos/seed/${encodeURIComponent(a.slug_vi)}/800/450`;

        return (
          <div
            key={a.id}
            className="group relative bg-surface-card rounded-card border border-surface-border overflow-hidden"
          >
            <button
              onClick={() => remove(a.id)}
              aria-label={lang === "vi" ? "Bỏ lưu" : "Remove"}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
            <Link href={href as "/"} className="block">
              <div className="relative h-40">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-2 left-2">
                  <ArticleBadge category={a.category} reviewBadge={a.review_badge} locale={lang} />
                </div>
                {a.score !== null && (
                  <div className="absolute bottom-2 right-2">
                    <ScoreBadge score={a.score} />
                  </div>
                )}
              </div>
              <div className="p-3.5">
                <h3 className="text-sm font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
