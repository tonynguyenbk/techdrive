import { Link } from "@/i18n/navigation";
import type { Brand } from "@/types/car";

type Props = {
  brand: Brand;
  locale?: string;
};

export function PriceCard({ brand, locale = "vi" }: Props) {
  const name = locale === "en" ? brand.name_en : brand.name_vi;
  const display = brand.flag_emoji ?? brand.logo_url ?? "🚗";
  const isEmoji = !display.startsWith("http") && !display.startsWith("/");

  return (
    <Link href={`/tim-xe/${brand.slug}` as "/"}>
      <div className="group bg-surface-elevated rounded-lg p-4 text-center border border-surface-border hover:border-primary transition-all duration-200 cursor-pointer">
        {isEmoji ? (
          <div className="text-3xl mb-2">{display}</div>
        ) : (
          <div className="h-8 mb-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={display} alt={name} className="h-8 object-contain" />
          </div>
        )}
        <div className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
          {name}
        </div>
        <div className="text-xs text-text-muted mt-1">{brand.country_of_origin}</div>
      </div>
    </Link>
  );
}
