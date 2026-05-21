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

            {/* Social links */}
            <div className="mt-5">
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">
                Theo dõi chúng tôi
              </p>
              <div className="flex items-center flex-wrap gap-2">
                <a
                  href="https://www.facebook.com/techdriveauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên Facebook"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@TechDriveAuto"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên YouTube"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#FF0000] hover:border-[#FF0000]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/techdrivevn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên Instagram"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#E1306C] hover:border-[#E1306C]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/techdriveauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên X"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-text-primary/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://reddit.com/r/techdrivevn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên Reddit"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#FF4500] hover:border-[#FF4500]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@techdriveauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên TikTok"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#FF0050] hover:border-[#FF0050]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/techdrivevn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên LinkedIn"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://shopee.vn/techdrivevn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TechDrive trên Shopee"
                  className="w-9 h-9 rounded-lg bg-surface-elevated border border-surface-border flex items-center justify-center text-text-muted hover:text-[#EE4D2D] hover:border-[#EE4D2D]/50 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M12.004.004C5.377.004.004 5.377.004 12.004c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.374-12-12-12zm0 4.65a2.354 2.354 0 110 4.708 2.354 2.354 0 010-4.708zm5.816 12.81c0 .633-.492 1.145-1.099 1.145H7.282c-.607 0-1.099-.512-1.099-1.144l1.147-8.017c0-.633.491-1.145 1.098-1.145h7.151c.607 0 1.099.512 1.099 1.145l1.142 8.017z"/>
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-xs text-text-muted mt-5">
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
