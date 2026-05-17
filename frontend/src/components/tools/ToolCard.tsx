import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type Props = {
  icon: string;
  title: string;
  description: string;
  href: string;
  accentColor?: string;
};

export function ToolCard({ icon, title, description, href, accentColor = "hover:border-badge-compare" }: Props) {
  return (
    <Link href={href as "/"}>
      <div
        className={cn(
          "group bg-surface-card rounded-card border border-surface-border p-5 text-center",
          "hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full",
          accentColor
        )}
      >
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-text-muted mt-2 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
