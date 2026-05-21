"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type NavItem = { label: string; href: string };

export function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const drawer = (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[9998] transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(0,0,0,0.75)" }}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[9999] w-72 border-l border-white/10 transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
        style={{ background: "#111111" }}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/10">
          <span className="text-lg font-black">
            <span className="text-primary">Tech</span>
            <span className="text-white">Drive</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white cursor-pointer"
            aria-label="Đóng menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col px-5 py-6 gap-1">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href as "/"}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors font-medium text-sm"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex items-center justify-center w-8 h-8 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
