import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
};

export function Pagination({ currentPage, totalPages, basePath, className }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  const prevHref = currentPage > 1 ? `${basePath}?trang=${currentPage - 1}` : null;
  const nextHref = currentPage < totalPages ? `${basePath}?trang=${currentPage + 1}` : null;

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {prevHref ? (
        <Link
          href={prevHref as "/"}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-surface-border text-text-muted hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} />
        </Link>
      ) : (
        <span className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted/30 cursor-not-allowed">
          <ChevronLeft size={16} />
        </span>
      )}

      {visiblePages.map((page, idx) => {
        const prev = visiblePages[idx - 1];
        const showEllipsis = prev && page - prev > 1;

        return (
          <span key={page} className="flex items-center gap-1">
            {showEllipsis && (
              <span className="text-text-muted text-sm px-1">…</span>
            )}
            <Link
              href={`${basePath}?trang=${page}` as "/"}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold transition-colors",
                page === currentPage
                  ? "bg-primary text-white"
                  : "border border-surface-border text-text-muted hover:border-primary hover:text-primary"
              )}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {nextHref ? (
        <Link
          href={nextHref as "/"}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-surface-border text-text-muted hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted/30 cursor-not-allowed">
          <ChevronRight size={16} />
        </span>
      )}
    </div>
  );
}
