import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

export function SectionHeader({ title, viewAllHref, viewAllLabel = "Xem tất cả", className }: Props) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-xl font-extrabold text-text-primary">{title}</h2>
      {viewAllHref && (
        <Link
          href={viewAllHref as "/"}
          className="text-xs font-semibold text-primary hover:text-primary-light transition-colors"
        >
          {viewAllLabel} →
        </Link>
      )}
    </div>
  );
}
