"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

type Props = {
  url: string;
  title: string;
  lang?: "vi" | "en";
};

const FB_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const X_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ShareButtons({ url, title, lang = "vi" }: Props) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const shares = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      color: "hover:text-[#1877F2] hover:border-[#1877F2]/50",
      icon: FB_ICON,
    },
    {
      label: "X",
      href: `https://x.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      color: "hover:text-text-primary hover:border-text-primary/50",
      icon: X_ICON,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  }

  return (
    <div className="flex items-center flex-wrap gap-3 mt-8 pt-6 border-t border-surface-border">
      <span className="text-xs font-semibold text-text-muted">
        {lang === "vi" ? "Chia sẻ:" : "Share:"}
      </span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chia sẻ lên ${s.label}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border text-text-muted text-xs font-semibold transition-colors ${s.color}`}
        >
          {s.icon}
          {s.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label={lang === "vi" ? "Sao chép link" : "Copy link"}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated border border-surface-border text-text-muted text-xs font-semibold transition-colors hover:text-score-good hover:border-score-good/50"
      >
        {copied ? <Check size={14} className="text-score-good" /> : <Link2 size={14} />}
        {copied
          ? (lang === "vi" ? "Đã sao chép!" : "Copied!")
          : (lang === "vi" ? "Sao chép link" : "Copy link")}
      </button>
    </div>
  );
}
