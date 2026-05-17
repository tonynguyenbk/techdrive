"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark logo (site default theme is dark) to avoid flash
  const src = mounted && resolvedTheme === "light" ? "/logo.png" : "/logo-dark.png";

  return (
    <img
      src={src}
      alt="TechDrive"
      className={cn("w-auto object-contain", className)}
    />
  );
}
