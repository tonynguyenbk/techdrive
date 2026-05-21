import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <>
      {/* Light mode logo — hidden in dark */}
      <img
        src="/logo.png"
        alt="TechDrive"
        className={cn("w-auto object-contain dark:hidden", className)}
      />
      {/* Dark mode logo — hidden in light */}
      <img
        src="/logo-dark.png"
        alt=""
        aria-hidden="true"
        className={cn("w-auto object-contain hidden dark:block", className)}
      />
    </>
  );
}
