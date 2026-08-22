import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center ${className}`}
    >
      <img src="/brand/cinem-logo-final.svg" alt={`${site.name} — Your Web Partner`} width="197" height="50" className="h-[46px] w-auto transition-transform duration-300 group-hover:scale-[1.015]" />
    </Link>
  );
}
