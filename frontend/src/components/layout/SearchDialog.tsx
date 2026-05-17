"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, FileText, Car, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { SearchResults } from "@/lib/api/search";

const CATEGORY_LABELS: Record<string, string> = {
  news: "Tin tức",
  review: "Đánh giá",
  advice: "Tư vấn",
  comparison: "So sánh",
  video: "Video",
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fetch suggestions
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults(null);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json())
      .then((data: SearchResults) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [debouncedQuery]);

  const close = useCallback(() => setOpen(false), []);

  const totalHits = (results?.articles.length ?? 0) + (results?.cars.length ?? 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    window.location.href = `/tim-kiem?q=${encodeURIComponent(query.trim())}`;
    close();
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors cursor-pointer"
        aria-label="Tìm kiếm (Ctrl+K)"
        title="Tìm kiếm (Ctrl+K)"
      >
        <Search size={17} />
      </button>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={close}
      />

      {/* Dialog */}
      <div
        className={cn(
          "fixed left-1/2 z-[70] w-full max-w-xl -translate-x-1/2 transition-all duration-200",
          open
            ? "top-[10vh] opacity-100 scale-100"
            : "top-[8vh] opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="mx-4 rounded-2xl border border-surface-border bg-surface-elevated shadow-2xl overflow-hidden">

          {/* Search input */}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border">
              <Search size={18} className="text-text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm xe, tin tức, đánh giá..."
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted text-sm outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setResults(null); inputRef.current?.focus(); }}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border border-surface-border text-text-muted">
                Esc
              </kbd>
            </div>
          </form>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-8 text-text-muted text-sm">
                <span className="animate-pulse">Đang tìm...</span>
              </div>
            )}

            {!loading && results && totalHits === 0 && (
              <div className="py-10 text-center text-text-muted text-sm">
                Không tìm thấy kết quả cho &ldquo;{query}&rdquo;
              </div>
            )}

            {!loading && results && totalHits > 0 && (
              <div className="py-2">
                {/* Articles section */}
                {results.articles.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Bài viết
                    </div>
                    {results.articles.map((article) => (
                      <a
                        key={article.id}
                        href={`/tin-tuc/${article.slug_vi}`}
                        onClick={close}
                        className="flex items-start gap-3 px-4 py-2.5 hover:bg-surface-card transition-colors group"
                      >
                        <FileText size={15} className="mt-0.5 text-text-muted flex-shrink-0 group-hover:text-primary transition-colors" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                            {article.title_vi}
                          </p>
                          <p className="text-xs text-text-muted mt-0.5">
                            {CATEGORY_LABELS[article.category] ?? article.category}
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Cars section */}
                {results.cars.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      Xe ô tô
                    </div>
                    {results.cars.map((car) => (
                      <a
                        key={car.id}
                        href={`/tim-xe/${car.brand_slug}/${car.slug}`}
                        onClick={close}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-card transition-colors group"
                      >
                        <Car size={15} className="text-text-muted flex-shrink-0 group-hover:text-primary transition-colors" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                            {car.brand_name_vi} {car.name}
                          </p>
                          <p className="text-xs text-text-muted mt-0.5 uppercase">{car.segment}</p>
                        </div>
                        <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                )}

                {/* See all results */}
                <div className="px-4 py-2 border-t border-surface-border mt-1">
                  <a
                    href={`/tim-kiem?q=${encodeURIComponent(query)}`}
                    onClick={close}
                    className="flex items-center gap-2 text-xs text-primary hover:underline font-semibold"
                  >
                    <Search size={12} />
                    Xem tất cả kết quả cho &ldquo;{query}&rdquo;
                  </a>
                </div>
              </div>
            )}

            {/* Empty state — no query yet */}
            {!loading && !results && (
              <div className="px-4 py-6 text-xs text-text-muted space-y-1">
                <p className="font-semibold text-text-secondary mb-2">Tìm kiếm nhanh</p>
                {["VinFast VF8", "Toyota Camry 2026", "Xe hybrid tốt nhất"].map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => setQuery(hint)}
                    className="block w-full text-left px-3 py-1.5 rounded-lg hover:bg-surface-card transition-colors text-text-secondary"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
