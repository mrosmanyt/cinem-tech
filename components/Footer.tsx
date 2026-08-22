import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { categories, servicesByCategory } from "@/lib/services";
import { site } from "@/lib/site";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "Our work", href: "/work" },
  { label: "Insights", href: "/blog" },
  { label: "Contract & terms", href: "/contract" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const hasPhone = !site.phone.includes("000");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {site.shortDescription}
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <Icon name="mail" className="h-4 w-4 text-brand" />
                {site.email}
              </a>
              {hasPhone ? <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <Icon name="phone-call" className="h-4 w-4 text-brand" />
                {site.phone}
              </a> : null}
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat.slug}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                {cat.name}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {servicesByCategory(cat.slug).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${cat.slug}/${s.slug}`}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
