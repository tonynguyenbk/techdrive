"use client";

import { useAuthStore } from "@/store/authStore";

export function LoginButton() {
  const { openDialog } = useAuthStore();

  return (
    <button
      onClick={openDialog}
      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
    >
      Đăng nhập
    </button>
  );
}
