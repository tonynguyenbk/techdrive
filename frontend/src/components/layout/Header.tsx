import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/config/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { NavItems } from "./NavItems";

export async function Header() {
  const t = await getTranslations("nav");

  const navItems = mainNav.map(({ key, href }) => ({
    label: t(key),
    href,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface-card/95 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-5 h-20 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 select-none">
          <Logo className="h-14 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <NavItems items={navItems} />

        {/* Right controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <SearchDialog />
          <ThemeToggle />
          <LanguageSwitcher />
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
