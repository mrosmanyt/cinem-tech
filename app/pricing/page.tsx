import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { CTA } from "@/components/CTA";
import {
  ArrowLink,
  Badge,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui";
import { categories } from "@/lib/services";
import {
  carePricing,
  pricingByCategory,
  type PricedService,
  type PricingTier,
} from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Published packages for every ${site.name} service — websites from $1,499, web apps and mobile apps from $4,999, AI chatbots from $999 setup + $299/mo, Care retainers from $499/mo. Basic, Standard and Premium tiers, in writing.`,
  alternates: { canonical: "/pricing" },
};

const principles = [
  {
    title: "Fixed scope, in writing",
    body: "Every tier lists what is included and what is not. Anything outside the list is a paid add-on or an upgrade — never quietly absorbed, never a surprise invoice.",
  },
  {
    title: "Third-party costs stay yours",
    body: "Hosting, domains, platform subscriptions, message fees and ad spend sit on your own accounts, at cost. You keep the assets and the accounts whatever happens.",
  },
  {
    title: "Simple payment terms",
    body: "50% in advance on one-time work. Monthly plans are billed in advance, month-to-month after an initial three-month minimum on managed services.",
  },
];

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      className={`flex flex-col rounded-4xl border p-7 sm:p-8 ${
        tier.popular
          ? "border-brand/50 bg-elevated ring-1 ring-brand/25"
          : "border-line bg-elevated"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
          {tier.name}
        </h4>
        {tier.popular ? <Badge>Most popular</Badge> : null}
      </div>
      <div className="mt-4">
        <span className="font-display text-3xl font-semibold tracking-tight">
          {tier.price}
        </span>{" "}
        <span className="text-sm text-muted">{tier.unit}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-snug">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {tier.limits ? (
        <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-faint">
          {tier.limits}
        </p>
      ) : null}
    </article>
  );
}

function ServicePricingBlock({ service }: { service: PricedService }) {
  return (
    <div className="mt-16 first:mt-0">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold tracking-tight">
            {service.name}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
            {service.summary}
          </p>
        </div>
        <ArrowLink href={service.href}>
          {service.slug === "care" ? "Talk about Care" : "About this service"}
        </ArrowLink>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {service.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
      {service.note ? (
        <p className="mt-6 text-sm text-muted">{service.note}</p>
      ) : null}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-lines pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Every service, three tiers, prices in writing
            </h1>
            <p className="prose-body mt-6 text-pretty">
              No &ldquo;book a call to find out&rdquo;. Every {site.name} service
              has a Basic tier that opens the door, a Standard tier most clients
              choose, and a Premium tier for bespoke scope — so you can tell
              what fits your budget before we ever talk.
            </p>
          </div>

          <div className="mt-16 grid gap-6 border-t border-line pt-12 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title}>
                <h2 className="text-base font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {categories.map((category, i) => (
        <Section
          key={category.slug}
          className={i % 2 === 1 ? "border-y border-line bg-surface" : ""}
        >
          <SectionHeader
            eyebrow={category.name}
            title={category.headline}
            description={category.intro}
          />
          <div className="mt-6">
            {pricingByCategory(category.slug).map((service) => (
              <ServicePricingBlock key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      ))}

      <Section className="border-t border-line bg-surface">
        <SectionHeader
          eyebrow="Care"
          title="Ongoing partnership, after the launch"
          description="Build and AI projects land better with a team watching them. Care is the retainer that keeps sites, apps and agents healthy month after month."
        />
        <div className="mt-6">
          <ServicePricingBlock service={carePricing} />
        </div>
      </Section>

      <CTA
        title="Not sure which tier fits?"
        body="Tell us what you're building in a paragraph. We'll reply within one business day with the tier we'd honestly recommend — including if that's a smaller one, or not us at all."
        primaryLabel="Get a recommendation"
      />
    </>
  );
}
