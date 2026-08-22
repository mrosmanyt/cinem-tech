"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { categories, servicesByCategory } from "@/lib/services";
import { navigation } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/services")
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              Services
              <svg
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>

            {servicesOpen ? (
              <div className="absolute left-1/2 top-full w-[46rem] -translate-x-1/2 pt-3">
                <div className="animate-fade-up rounded-3xl border border-line bg-elevated p-3 shadow-2xl shadow-black/10 dark:shadow-black/50">
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <div key={cat.slug} className="rounded-2xl p-3">
                        <Link
                          href={`/services/${cat.slug}`}
                          className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
                        >
                          <Icon name={cat.icon} className="h-4 w-4 text-brand" />
                          {cat.name}
                        </Link>
                        <ul className="mt-3 space-y-1">
                          {servicesByCategory(cat.slug).map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${cat.slug}/${s.slug}`}
                                className="block rounded-lg px-2 py-1.5 text-[0.82rem] leading-snug text-muted transition-colors hover:bg-surface hover:text-ink"
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {navigation
            .filter((n) => n.href !== "/services" && n.href !== "/contact")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden lg:inline-flex">
            Book a call
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated text-ink lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-line bg-bg lg:hidden">
          <div className="container-page py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              Services
            </p>
            <div className="mt-4 space-y-6">
              {categories.map((cat) => (
                <div key={cat.slug}>
                  <Link
                    href={`/services/${cat.slug}`}
                    className="flex items-center gap-2 text-base font-semibold"
                  >
                    <Icon name={cat.icon} className="h-4 w-4 text-brand" />
                    {cat.name}
                  </Link>
                  <ul className="mt-2 space-y-0.5 border-l border-line pl-4">
                    {servicesByCategory(cat.slug).map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${cat.slug}/${s.slug}`}
                          className="block py-1.5 text-sm text-muted"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-1 border-t border-line pt-6">
              {navigation
                .filter((n) => n.href !== "/services")
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-base font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>

            <Link href="/contact" className="btn-primary mt-8 w-full">
              Book a call
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
