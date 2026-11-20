import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ArrowLink, Section, SectionHeader, Badge } from "@/components/ui";

const packages = [
  {
    id: "packages-build",
    interest: "build",
    badge: "Build",
    title: "One-time projects",
    blurb:
      "Fixed-scope engagements for marketing sites, web apps, and mobile — clear deliverables, clear price.",
    items: [
      { label: "Marketing site", price: "from $1,499" },
      { label: "Web app / SaaS MVP", price: "from $4,999" },
      { label: "Mobile app", price: "from $4,999" },
    ],
    cta: "Start a Build project",
    ctaClass: "btn-primary",
  },
  {
    id: "packages-ai",
    interest: "ai",
    badge: "AI Solutions",
    title: "AI agents that work for you",
    blurb:
      "Setup plus ongoing operation for chat and calling agents — so automation stays sharp after launch.",
    items: [
      {
        label: "WhatsApp / web chatbot",
        price: "from $999 setup + $299/mo",
      },
      {
        label: "Calling agent",
        price: "from $1,499 setup + $399/mo",
      },
    ],
    cta: "Explore AI Solutions",
    ctaClass: "btn-primary",
  },
  {
    id: "packages-care",
    interest: "care",
    badge: "Care",
    title: "Ongoing partnership",
    blurb:
      "Retainer plans that keep products healthy — from uptime and fixes to features, content, and AI monitoring.",
    items: [
      {
        label: "Basic",
        price:
          "$499/mo — uptime monitoring, backups, security updates, 2h bug fixes, monthly report",
      },
      {
        label: "Standard",
        price:
          "$1,499/mo — Basic + 8h small features or content changes, quarterly review",
      },
      {
        label: "Premium",
        price:
          "$3,999/mo — Standard + 16h feature time + priority SLA + AI agent monitoring + weekly sync",
      },
    ],
    cta: "Talk about Care",
    ctaClass: "btn-secondary",
  },
] as const;

export function PackagesQuickLinks() {
  return (
    <nav
      aria-label="Package quick links"
      className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
    >
      <Link
        href="#packages-build"
        className="font-semibold text-brand transition-colors hover:text-ink"
      >
        Build
      </Link>
      <span className="text-faint" aria-hidden>
        ·
      </span>
      <Link
        href="#packages-ai"
        className="font-semibold text-brand transition-colors hover:text-ink"
      >
        AI
      </Link>
      <span className="text-faint" aria-hidden>
        ·
      </span>
      <Link
        href="#packages-care"
        className="font-semibold text-brand transition-colors hover:text-ink"
      >
        Care
      </Link>
    </nav>
  );
}

export default function PackagesOffers() {
  return (
    <Section id="packages">
      <SectionHeader
        eyebrow="Engagements"
        title="Three ways to work with us"
        description="Clear packages for Build, AI Solutions, and Care. Every service now has Basic, Standard and Premium tiers — with published prices so you know what to expect before we talk."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            id={pkg.id}
            className="flex flex-col rounded-4xl border border-line bg-elevated p-7 transition-colors hover:border-brand/30 sm:p-8"
          >
            <Badge>{pkg.badge}</Badge>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {pkg.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.blurb}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {pkg.items.map((item) => (
                <li key={item.label} className="flex gap-3 text-sm leading-snug">
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  />
                  <span>
                    <span className="font-medium">{item.label}</span>
                    <span className="text-muted"> — {item.price}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={`/contact?interest=${pkg.interest}`}
              className={`${pkg.ctaClass} mt-8 w-full justify-center`}
            >
              {pkg.cta}
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <ArrowLink href="/pricing">
          See full pricing — all 13 services, every tier
        </ArrowLink>
      </div>
    </Section>
  );
}
