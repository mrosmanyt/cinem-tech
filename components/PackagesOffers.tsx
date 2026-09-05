import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Section, SectionHeader, Badge } from "@/components/ui";

const packages = [
  {
    id: "packages-build",
    interest: "build",
    badge: "Build",
    title: "One-time projects",
    blurb:
      "Fixed-scope engagements for marketing sites, web apps, and mobile — clear deliverables, clear price.",
    items: [
      { label: "Marketing site", price: "from $8,000" },
      { label: "Web app / SaaS MVP", price: "from $15,000" },
      { label: "Mobile app", price: "from $18,000" },
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
        price: "$5,000 setup + $1,500/mo",
      },
      {
        label: "Calling agent",
        price: "$8,000 setup + $2,500/mo",
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
        price: "$2,000/mo — uptime, backups, bug fixes 4h, monthly report",
      },
      {
        label: "Growth",
        price:
          "$4,000/mo — Basic + small features 12h + 8 content pieces OR chatbot tune",
      },
      {
        label: "Scale",
        price:
          "$7,000/mo — Growth + priority SLA + AI agent monitoring + weekly sync",
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
        description="Clear packages for Build, AI Solutions, and Care — with starting prices so you know what to expect before we talk."
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
    </Section>
  );
}
