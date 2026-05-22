"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";
import { X, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/store/authStore";

export function AuthDialog() {
  const { dialogOpen, closeDialog } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = dialogOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [dialogOpen]);

  const handleGoogle = async () => {
    setLoading("google");
    await signIn("google", { callbackUrl: window.location.href });
  };

  const dialog = (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[9998] transition-opacity duration-200",
          dialogOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={closeDialog}
      />

      {/* Modal (desktop) / Bottom sheet (mobile) */}
      <div
        className={cn(
          "fixed z-[9999] transition-all duration-300",
          // Desktop: centered modal
          "md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[420px] md:rounded-2xl",
          // Mobile: bottom sheet
          "max-md:inset-x-0 max-md:bottom-0 max-md:rounded-t-2xl",
          dialogOpen
            ? "md:opacity-100 md:scale-100 max-md:translate-y-0"
            : "md:opacity-0 md:scale-95 max-md:translate-y-full pointer-events-none"
        )}
        style={{
          background: "var(--color-surface-card)",
          border: "1px solid var(--color-surface-border)",
        }}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 rounded-full bg-white/20" />
        </div>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                Đăng nhập <span className="text-primary">TechDrive</span>
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Lưu bài viết, theo dõi giá xe yêu thích
              </p>
            </div>
            <button
              onClick={closeDialog}
              className="text-text-muted hover:text-text-primary transition-colors p-1 -mt-1 -mr-1 cursor-pointer"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { icon: "🔖", label: "Lưu bài viết" },
              { icon: "📊", label: "So sánh xe" },
              { icon: "🔔", label: "Theo dõi giá" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="text-center py-3 px-2 rounded-xl"
                style={{ background: "var(--color-surface-elevated)" }}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xs text-text-muted leading-tight">{label}</div>
              </div>
            ))}
          </div>

          {/* Google sign-in */}
          <button
            onClick={handleGoogle}
            disabled={!!loading}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl font-medium text-text-primary transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              border: "1px solid var(--color-surface-border)",
              background: "var(--color-surface-elevated)",
            }}
          >
            {loading === "google" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Tiếp tục với Google
          </button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: "1px solid var(--color-surface-border)" }} />
            </div>
            <div className="relative flex justify-center">
              <span
                className="px-3 text-xs text-text-muted"
                style={{ background: "var(--color-surface-card)" }}
              >
                hoặc
              </span>
            </div>
          </div>

          {/* Email (coming soon) */}
          <button
            disabled
            className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl text-sm text-text-muted opacity-50 cursor-not-allowed"
            style={{ border: "1px solid var(--color-surface-border)" }}
          >
            <Mail size={16} />
            Đăng nhập bằng email
            <span className="text-xs opacity-70">(sắp ra mắt)</span>
          </button>

          <p className="text-center text-xs text-text-muted mt-5">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a href="/chinh-sach-bao-mat" className="text-primary hover:underline">
              chính sách bảo mật
            </a>
          </p>
        </div>
      </div>
    </>
  );

  return mounted ? createPortal(dialog, document.body) : null;
}
