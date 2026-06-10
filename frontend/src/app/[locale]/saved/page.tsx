import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { SavedArticlesView } from "@/components/saved/SavedArticlesView";

export const metadata: Metadata = {
  title: "Bài viết đã lưu",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function SavedPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

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
            {lang === "vi" ? "Bài đã lưu" : "Saved articles"}
          </span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            🔖 {lang === "vi" ? "Bài viết đã lưu" : "Saved articles"}
          </h1>
          <p className="text-sm text-text-muted">
            {lang === "vi"
              ? "Các bài viết bạn đã lưu để đọc lại sau."
              : "Articles you've saved to read later."}
          </p>
        </div>

        <SavedArticlesView lang={lang} />
      </div>
    </main>
  );
}
