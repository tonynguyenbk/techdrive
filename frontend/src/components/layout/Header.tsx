import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mainNav } from "@/config/navigation";
import { auth } from "@/auth";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { NavItems } from "./NavItems";
import { LoginButton } from "@/components/auth/LoginButton";
import { UserMenu } from "@/components/auth/UserMenu";
import { NotificationBell } from "./NotificationBell";

export async function Header() {
  const t = await getTranslations("nav");
  const session = await auth();

  const navItems = mainNav.map(({ key, href }) => ({
    label: t(key),
    href,
  }));

  return (
    <header className="border-b border-surface-border bg-surface-card/95 backdrop-blur-md">
      <div className="max-w-[1332px] mx-auto px-4 h-24 md:h-30 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 select-none">
          <Logo className="h-16 md:h-21 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <NavItems items={navItems} />

        {/* Right controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <SearchDialog />
          <NotificationBell />
          <ThemeToggle />
          <div className="hidden md:block w-px h-4 mx-1 bg-surface-border" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <LoginButton />
          )}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
