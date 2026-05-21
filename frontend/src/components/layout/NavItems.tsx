"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

type NavItem = { label: string; href: string };

export function NavItems({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/vi" || pathname === "/en";
    return pathname.includes(href);
  };

  return (
    <nav
      className="hidden md:flex items-center gap-0.5 flex-1"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map(({ label, href }) => {
        const active = isActive(href);
        const showPill = hovered === href || (!hovered && active);

        return (
          <Link
            key={href}
            href={href as "/"}
            onMouseEnter={() => setHovered(href)}
            className="relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 select-none"
            style={{ color: active ? "var(--color-primary)" : hovered === href ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
          >
            {showPill && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-md"
                style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-surface-border)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
