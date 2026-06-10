import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ArticleCategory, ReviewBadge } from "@/types/article";

export type SavedArticle = {
  id: string;
  title_vi: string;
  title_en: string;
  slug_vi: string;
  slug_en: string;
  featured_image: string;
  category: ArticleCategory;
  review_badge: ReviewBadge | null;
  score: number | null;
  savedAt: number;
};

interface BookmarkStore {
  items: SavedArticle[];
  isSaved: (id: string) => boolean;
  toggle: (article: Omit<SavedArticle, "savedAt">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      items: [],
      isSaved: (id) => get().items.some((a) => a.id === id),
      toggle: (article) =>
        set((state) => {
          const exists = state.items.some((a) => a.id === article.id);
          return {
            items: exists
              ? state.items.filter((a) => a.id !== article.id)
              : [{ ...article, savedAt: Date.now() }, ...state.items],
          };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((a) => a.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "techdrive-saved-articles" }
  )
);
