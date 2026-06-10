"use client";

import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { useBookmarkStore, type SavedArticle } from "@/store/bookmarkStore";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils/cn";

type Props = {
  article: Omit<SavedArticle, "savedAt">;
  lang?: "vi" | "en";
  className?: string;
};

export function BookmarkButton({ article, lang = "vi", className }: Props) {
  const { data: session } = useSession();
  const { isSaved, toggle } = useBookmarkStore();
  const { openDialog } = useAuthStore();
  const saved = isSaved(article.id);

  function handleClick() {
    if (!session) {
      openDialog();
      return;
    }
    toggle(article);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer",
        saved ? "text-primary" : "text-text-muted hover:text-text-primary",
        className
      )}
      aria-label={
        saved
          ? (lang === "vi" ? "Bỏ lưu bài viết" : "Remove bookmark")
          : (lang === "vi" ? "Lưu bài viết" : "Save article")
      }
    >
      <Bookmark size={13} className={saved ? "fill-current" : ""} />
      {saved ? (lang === "vi" ? "Đã lưu" : "Saved") : (lang === "vi" ? "Lưu" : "Save")}
    </button>
  );
}
