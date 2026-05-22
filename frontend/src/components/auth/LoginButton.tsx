"use client";

import { useAuthStore } from "@/store/authStore";

export function LoginButton() {
  const { openDialog } = useAuthStore();

  return (
    <button
      onClick={openDialog}
      className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
      style={{
        border: "1px solid var(--color-surface-border)",
        color: "var(--color-text-secondary)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)";
        (e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-secondary)";
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      Đăng nhập
    </button>
  );
}
