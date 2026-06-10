"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Trash2 } from "lucide-react";
import { useBookmarkStore } from "@/store/bookmarkStore";

type Props = {
  user: { name?: string | null; email?: string | null; image?: string | null };
  lang: "vi" | "en";
};

export function SettingsView({ user, lang }: Props) {
  const { items, clear } = useBookmarkStore();
  const [cleared, setCleared] = useState(false);

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      {/* Profile card */}
      <div className="flex items-center gap-4 p-5 rounded-xl bg-surface-card border border-surface-border">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User"}
            width={56}
            height={56}
            className="rounded-full"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold select-none">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
        <div>
          <p className="font-bold text-text-primary">{user.name}</p>
          <p className="text-sm text-text-muted">{user.email}</p>
        </div>
      </div>

      {/* Saved articles management */}
      <div className="p-5 rounded-xl bg-surface-card border border-surface-border">
        <h2 className="font-bold text-text-primary mb-1">
          {lang === "vi" ? "Bài viết đã lưu" : "Saved articles"}
        </h2>
        <p className="text-sm text-text-muted mb-4">
          {lang === "vi"
            ? `Bạn đang lưu ${items.length} bài viết trên thiết bị này.`
            : `You have ${items.length} articles saved on this device.`}
        </p>
        <button
          onClick={() => {
            clear();
            setCleared(true);
          }}
          disabled={items.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-surface-border text-sm font-semibold text-text-muted hover:text-score-bad hover:border-score-bad/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Trash2 size={14} />
          {lang === "vi" ? "Xóa tất cả bài đã lưu" : "Clear all saved articles"}
        </button>
        {cleared && (
          <p className="text-xs text-score-good mt-2">
            {lang === "vi" ? "Đã xóa toàn bộ bài đã lưu." : "All saved articles cleared."}
          </p>
        )}
      </div>

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface-card border border-surface-border text-sm font-semibold text-text-secondary hover:text-primary hover:border-primary/40 transition-colors cursor-pointer"
      >
        <LogOut size={14} />
        {lang === "vi" ? "Đăng xuất" : "Sign out"}
      </button>
    </div>
  );
}
