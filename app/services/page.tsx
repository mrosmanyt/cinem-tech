import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { CTA } from "@/components/CTA";
import { ArrowLink, Container, Eyebrow, Section } from "@/components/ui";
import { categories, servicesByCategory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Development, AI solutions and growth marketing. Twelve services across engineering, artificial intelligence and demand generation — delivered by one accountable team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Services</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Everything you need to build it, automate it and grow it
            </h1>
            <p className="prose-body mt-6 text-pretty">
              Three practices working from the same brief. Engineering that ships,
              AI that handles real work, and growth teams that turn attention into
              pipeline. Start with one, expand when it makes sense.
            </p>
          </div>
        </Container>
      </section>

      {categories.map((cat, index) => (
        <section
          key={cat.slug}
          className={`py-20 sm:py-28 ${index % 2 === 1 ? "border-y border-line bg-surface" : ""}`}
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon name={cat.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                  {cat.name}
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
                  {cat.intro}
                </p>
                <ArrowLink href={`/services/${cat.slug}`} className="mt-6">
                  {cat.name} overview
                </ArrowLink>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {servicesByCategory(cat.slug).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${cat.slug}/${s.slug}`}
                    className="card-hover group flex flex-col"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold leading-snug transition-colors group-hover:text-brand">
                      {s.name}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                      {s.short}
                    </p>
                    <span className="mt-5 flex items-center gap-2 text-xs text-faint">
                      <Icon name="clock" className="h-3.5 w-3.5" />
                      {s.timeline}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <CTA
        title="Not sure which of these you need?"
        body="That's a normal place to start. Describe the outcome you're after and we'll tell you which services get you there — including the ones you don't need yet."
      />
    </>
  );
}
