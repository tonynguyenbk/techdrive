import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { auth } from "@/auth";
import { SettingsView } from "@/components/settings/SettingsView";

export const metadata: Metadata = {
  title: "Cài đặt",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function SettingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <main className="flex-1">
      <div className="max-w-[1332px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-5">
          <Link href="/" className="hover:text-text-secondary transition-colors">
            {lang === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">
            {lang === "vi" ? "Cài đặt" : "Settings"}
          </span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            ⚙️ {lang === "vi" ? "Cài đặt tài khoản" : "Account settings"}
          </h1>
        </div>

        <SettingsView user={session.user} lang={lang} />
      </div>
    </main>
  );
}
