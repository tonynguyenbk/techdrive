import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/config/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export async function Header() {
  const t = await getTranslations("nav");

  const navItems = mainNav.map(({ key, href }) => ({
    label: t(key),
    href,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border"
      style={{ background: "rgba(17,17,17,0.97)", backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 select-none">
          <span className="text-xl font-black tracking-tight">
            <span className="text-text-primary">Tech</span>
            <span className="text-primary">Drive</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href as "/"}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-card transition-colors cursor-pointer"
            aria-label={t("search_placeholder")}
          >
            <Search size={17} />
          </button>

          <LanguageSwitcher />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
