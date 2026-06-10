import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật và quyền riêng tư của TechDrive.",
  robots: { index: true, follow: true },
};

type Props = { params: Promise<{ locale: string }> };

const LAST_UPDATED = "10/06/2026";
const LAST_UPDATED_EN = "June 10, 2026";

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale === "en" ? "en" : "vi";

  const sections: { titleVi: string; titleEn: string; bodyVi: React.ReactNode; bodyEn: React.ReactNode }[] = [
    {
      titleVi: "1. Thông tin chúng tôi thu thập",
      titleEn: "1. Information we collect",
      bodyVi: (
        <ul className="list-disc list-inside space-y-1.5">
          <li>Email khi bạn đăng ký nhận bản tin (newsletter).</li>
          <li>Tên, email và ảnh đại diện khi bạn đăng nhập bằng tài khoản Google.</li>
          <li>Bài viết bạn đã lưu — lưu cục bộ trên trình duyệt (localStorage), không gửi về máy chủ.</li>
          <li>Dữ liệu sử dụng ẩn danh (số lượt xem trang, thiết bị, trình duyệt) thông qua công cụ phân tích.</li>
        </ul>
      ),
      bodyEn: (
        <ul className="list-disc list-inside space-y-1.5">
          <li>Your email address when you subscribe to our newsletter.</li>
          <li>Your name, email and avatar when you sign in with Google.</li>
          <li>Articles you save — stored locally in your browser (localStorage), not sent to our servers.</li>
          <li>Anonymous usage data (page views, device, browser) via our analytics tool.</li>
        </ul>
      ),
    },
    {
      titleVi: "2. Cách chúng tôi sử dụng thông tin",
      titleEn: "2. How we use your information",
      bodyVi: (
        <p>
          Chúng tôi sử dụng email của bạn để gửi bản tin và thông báo bạn đã đăng ký. Thông tin tài khoản Google
          được dùng để xác thực đăng nhập và hiển thị tên/ảnh đại diện trên website. Dữ liệu sử dụng ẩn danh giúp
          chúng tôi cải thiện nội dung và trải nghiệm trang. Chúng tôi không bán hoặc cho thuê thông tin cá nhân
          của bạn cho bên thứ ba.
        </p>
      ),
      bodyEn: (
        <p>
          We use your email to send the newsletter and notifications you subscribed to. Your Google account
          information is used for authentication and to display your name/avatar on the site. Anonymous usage
          data helps us improve content and site experience. We do not sell or rent your personal information
          to third parties.
        </p>
      ),
    },
    {
      titleVi: "3. Cookie & công cụ phân tích",
      titleEn: "3. Cookies & analytics",
      bodyVi: (
        <p>
          Website sử dụng cookie cần thiết cho đăng nhập và ghi nhớ giao diện (sáng/tối). Chúng tôi dùng
          Vercel Analytics để thống kê lượt truy cập một cách ẩn danh, không theo dõi danh tính cá nhân giữa
          các trang web khác nhau.
        </p>
      ),
      bodyEn: (
        <p>
          The site uses cookies necessary for sign-in and remembering your theme preference (light/dark).
          We use Vercel Analytics to measure traffic anonymously; it does not track your identity across
          other websites.
        </p>
      ),
    },
    {
      titleVi: "4. Dịch vụ bên thứ ba",
      titleEn: "4. Third-party services",
      bodyVi: (
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Google</strong> — đăng nhập tài khoản (OAuth).</li>
          <li><strong>Resend</strong> — gửi email bản tin và xác nhận đăng ký.</li>
          <li><strong>OneSignal</strong> — gửi thông báo đẩy (push notification) nếu bạn đồng ý nhận.</li>
          <li><strong>Vercel</strong> — lưu trữ website và phân tích lượt truy cập.</li>
        </ul>
      ),
      bodyEn: (
        <ul className="list-disc list-inside space-y-1.5">
          <li><strong>Google</strong> — account sign-in (OAuth).</li>
          <li><strong>Resend</strong> — sending newsletter and confirmation emails.</li>
          <li><strong>OneSignal</strong> — push notifications, if you opt in.</li>
          <li><strong>Vercel</strong> — website hosting and traffic analytics.</li>
        </ul>
      ),
    },
    {
      titleVi: "5. Quyền của bạn",
      titleEn: "5. Your rights",
      bodyVi: (
        <p>
          Bạn có thể hủy đăng ký nhận bản tin bất cứ lúc nào qua đường link trong email. Bạn có thể xóa bài
          viết đã lưu hoặc đăng xuất tài khoản tại trang{" "}
          <Link href="/settings" className="text-primary hover:underline">Cài đặt</Link>. Để yêu cầu xóa toàn
          bộ dữ liệu tài khoản, vui lòng liên hệ chúng tôi theo thông tin bên dưới.
        </p>
      ),
      bodyEn: (
        <p>
          You can unsubscribe from the newsletter at any time via the link in the email. You can clear saved
          articles or sign out from the{" "}
          <Link href="/settings" className="text-primary hover:underline">Settings</Link> page. To request
          deletion of your account data entirely, please contact us using the details below.
        </p>
      ),
    },
    {
      titleVi: "6. Liên hệ",
      titleEn: "6. Contact",
      bodyVi: (
        <p>
          Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ{" "}
          <a href="mailto:hello@techdrive.vn" className="text-primary hover:underline">hello@techdrive.vn</a>.
        </p>
      ),
      bodyEn: (
        <p>
          For any questions about this privacy policy, please contact{" "}
          <a href="mailto:hello@techdrive.vn" className="text-primary hover:underline">hello@techdrive.vn</a>.
        </p>
      ),
    },
  ];

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
            {lang === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}
          </span>
        </nav>

        <div className="mb-8 max-w-2xl">
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            {lang === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}
          </h1>
          <p className="text-xs text-text-muted">
            {lang === "vi" ? `Cập nhật lần cuối: ${LAST_UPDATED}` : `Last updated: ${LAST_UPDATED_EN}`}
          </p>
        </div>

        <div className="max-w-2xl flex flex-col gap-6">
          {sections.map(({ titleVi, titleEn, bodyVi, bodyEn }) => (
            <div key={titleVi}>
              <h2 className="font-bold text-text-primary mb-2">
                {lang === "vi" ? titleVi : titleEn}
              </h2>
              <div className="text-sm text-text-secondary leading-relaxed">
                {lang === "vi" ? bodyVi : bodyEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
