"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/proposal") || pathname.startsWith("/invoice")) return null;
  const message = `Hello CINEM, I would like to discuss a project. I am viewing ${site.url}${pathname}`;
  return <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with CINEM on WhatsApp" className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-900/25 transition hover:-translate-y-0.5"><span aria-hidden="true">◉</span><span className="hidden sm:inline">WhatsApp us</span></a>;
}
