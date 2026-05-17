import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { footerNav } from "@/config/navigation";

export async function Footer() {
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("home");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border mt-auto"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-10">

          {/* Brand column */}
          <div>
            <div className="text-xl font-black tracking-tight mb-3">
              <span className="text-text-primary">Tech</span>
              <span className="text-primary">Drive</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Trang tin tức & đánh giá ô tô hàng đầu Việt Nam.
              Độc lập, khách quan, đáng tin cậy.
            </p>
            <p className="text-xs text-text-muted mt-4">
              © {currentYear} TechDrive. All rights reserved.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 border-l-2 border-primary pl-2.5">
              Chuyên mục
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerNav.categories.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href as "/"}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {tNav(key as Parameters<typeof tNav>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 border-l-2 border-primary pl-2.5">
              Công cụ
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerNav.tools.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href as "/"}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {tHome(key as Parameters<typeof tHome>[0])}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/so-sanh"
                  className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                >
                  {tNav("compare")}
                </Link>
              </li>
              <li>
                <Link
                  href="/giai-thuong"
                  className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                >
                  {tNav("awards")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 border-l-2 border-primary pl-2.5">
              Liên hệ
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Quảng cáo", href: "/quang-cao" },
                { label: "Tuyển dụng", href: "/tuyen-dung" },
                { label: "Liên hệ tòa soạn", href: "/lien-he" },
                { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
                { label: "Giới thiệu", href: "/gioi-thieu" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href as "/"}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Popular brands */}
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 mt-6 border-l-2 border-primary pl-2.5">
              Hãng xe
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {footerNav.brands.map(({ name, slug }) => (
                <Link
                  key={slug}
                  href={`/tim-xe/${slug}` as "/"}
                  className="text-xs text-text-muted hover:text-primary transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <span>Giấy phép TTĐT: Đang xin cấp phép</span>
          <span>🇻🇳 techdrive.vn</span>
        </div>
      </div>
    </footer>
  );
}
