"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type NavItem = { label: string; href: string };

export function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden flex items-center justify-center w-8 h-8 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      />

      {/* Drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface-elevated border-l border-surface-border transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-surface-border">
          <span className="text-lg font-black">
            <span className="text-text-primary">Tech</span>
            <span className="text-primary">Drive</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-text-muted hover:text-text-primary cursor-pointer"
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
              className="py-3 px-4 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-card transition-colors font-medium text-sm"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
