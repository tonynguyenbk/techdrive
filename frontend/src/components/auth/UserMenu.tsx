"use client";

import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { LogOut, Bookmark, Settings } from "lucide-react";
import Image from "next/image";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center cursor-pointer"
        aria-label="Tài khoản"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User"}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-primary/40"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold select-none">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 z-50 min-w-[180px] rounded-xl shadow-xl overflow-hidden"
          style={{
            background: "var(--color-surface-card)",
            border: "1px solid var(--color-surface-border)",
          }}
        >
          <div
            className="px-3 py-2.5"
            style={{ borderBottom: "1px solid var(--color-surface-border)" }}
          >
            <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
            <p className="text-xs text-text-muted truncate">{user.email}</p>
          </div>
          <div className="py-1">
            {[
              { icon: Bookmark, label: "Bài đã lưu", href: "/saved" },
              { icon: Settings, label: "Cài đặt", href: "/settings" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-text-muted hover:text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
