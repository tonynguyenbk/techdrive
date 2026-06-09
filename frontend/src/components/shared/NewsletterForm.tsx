"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

type Props = {
  lang?: "vi" | "en";
  variant?: "inline" | "card";
};

export function NewsletterForm({ lang = "vi", variant = "card" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Có lỗi xảy ra");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Không thể kết nối. Thử lại sau.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={variant === "card" ? "p-6 rounded-xl bg-surface-card border border-surface-border text-center" : "text-center"}>
        <CheckCircle className="mx-auto mb-3 text-score-excellent" size={32} />
        <p className="font-bold text-text-primary text-sm">
          {lang === "vi" ? "Đăng ký thành công!" : "Successfully subscribed!"}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {lang === "vi" ? "Kiểm tra hộp thư để xác nhận." : "Check your inbox to confirm."}
        </p>
      </div>
    );
  }

  const inner = (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={lang === "vi" ? "Nhập email của bạn..." : "Enter your email..."}
          disabled={status === "loading"}
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg bg-surface-elevated border border-surface-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary disabled:opacity-60 transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors disabled:opacity-60 whitespace-nowrap cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 size={14} className="animate-spin" />
        ) : null}
        {lang === "vi" ? "Đăng ký" : "Subscribe"}
      </button>
    </form>
  );

  if (variant === "inline") {
    return (
      <div>
        {inner}
        {status === "error" && (
          <p className="text-xs text-score-bad mt-2">{errorMsg}</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-surface-card border border-surface-border">
      <div className="flex items-center gap-2 mb-1">
        <Mail size={16} className="text-primary" />
        <p className="font-bold text-sm text-text-primary">
          {lang === "vi" ? "Nhận bài viết mới qua email" : "Get new articles by email"}
        </p>
      </div>
      <p className="text-xs text-text-muted mb-4">
        {lang === "vi"
          ? "Tin tức & đánh giá xe mới nhất, gửi thẳng vào hộp thư của bạn."
          : "Latest car news & reviews, delivered straight to your inbox."}
      </p>
      {inner}
      {status === "error" && (
        <p className="text-xs text-score-bad mt-2">{errorMsg}</p>
      )}
    </div>
  );
}
