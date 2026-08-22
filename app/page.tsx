import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { CTA } from "@/components/CTA";
import {
  ArrowLink,
  Badge,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  Stat,
} from "@/components/ui";
import { categories, servicesByCategory } from "@/lib/services";
import { posts } from "@/lib/blog";
import { site, stats } from "@/lib/site";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { HeroVisual3D } from "@/components/HeroVisual3D";

export const metadata: Metadata = {
  title: `${site.name} — Web, App & AI Development Agency`,
  description: site.description,
  alternates: { canonical: "/" },
};

const capabilities = [
  "Next.js",
  "React",
  "React Native",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Azure",
  "OpenAI",
  "Anthropic",
  "Twilio",
  "Stripe",
  "HubSpot",
  "Figma",
  "Google Ads",
  "Meta Ads",
];

const differentiators = [
  {
    icon: "layers",
    title: "One partner, the whole stack",
    body: "Most companies stitch together a dev shop, a social agency and a freelance designer, then spend their week translating between them. Every capability here sits under one roof, on one contract, with one point of accountability.",
  },
  {
    icon: "user",
    title: "Named people, not an account layer",
    body: "You work directly with the engineers, designers and managers doing the work. No account executive relaying messages, no rotating team you have to re-brief every quarter.",
  },
  {
    icon: "code",
    title: "You own everything we build",
    body: "Source code, design files, infrastructure accounts, documentation. Everything transfers to you. If you ever want to take it in-house, nothing stops you.",
  },
  {
    icon: "target",
    title: "Reported on outcomes, not activity",
    body: "Hours logged and impressions delivered are diagnostics, not results. Our monthly reports lead with the number you actually care about, and we say plainly when it hasn't moved.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery call",
    body: "Thirty minutes. You describe the problem, we ask the awkward questions and tell you honestly whether we're the right team for it.",
  },
  {
    step: "02",
    title: "Scope and proposal",
    body: "A written proposal with fixed scope, milestones, timeline and price. No hourly ambiguity, no surprises in month three.",
  },
  {
    step: "03",
    title: "Build in sprints",
    body: "Two-week cycles with a working demo at the end of each. You see real progress every fortnight, not a status document.",
  },
  {
    step: "04",
    title: "Launch and support",
    body: "We handle deployment, handover and training — then stay on for the first thirty days, or longer on a retainer.",
  },
];

export default function HomePage() {
  const featuredPosts = posts.slice(0, 3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="grid-lines pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-[38rem] w-[64rem] -translate-x-1/2 animate-pulse-slow blur-3xl"
        />

        <Container className="relative pb-20 pt-16 sm:pb-28 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:text-left text-center">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <Eyebrow>
                {site.yearsActive} years · {site.teamSize} specialists
              </Eyebrow>

              <h1 className="mt-7 text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
                We build the software and{" "}
                <span className="relative whitespace-normal sm:whitespace-nowrap">
                  <span className="relative z-10 text-brand">the audience</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-0 h-2.5 rounded-full bg-brand/15 sm:h-3"
                  />
                </span>{" "}
                behind growing companies
              </h1>

              <p className="prose-body mt-7 text-pretty">
                Websites, web apps, mobile apps and custom software. AI chatbots and
                calling agents that handle real work. Social media, content, PR and
                lead generation that fills your pipeline. One team, one contract,
                one standard.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/contact" className="btn-primary w-full sm:w-auto">
                  Book a discovery call
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/work" className="btn-secondary w-full sm:w-auto">
                  See our work
                </Link>
              </div>

              <p className="mt-6 text-sm text-faint">
                Typically replying within one business day
              </p>
            </div>

            <HeroVisual3D />
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-12 sm:mt-24 lg:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-elevated py-7" aria-label="Technology ecosystems">
        <Container>
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-faint">Technology ecosystems we build with</p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-display text-sm font-semibold text-muted"><span>Microsoft</span><span>Anthropic</span><span>Google</span><span>OpenAI</span></div>
          </div>
        </Container>
      </section>

      {/* ── Capability marquee ───────────────────────────────────────────── */}
      <div className="border-y border-line bg-surface py-6">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...capabilities, ...capabilities].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.18em] text-faint"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Section id="services">
        <SectionHeader
          eyebrow="What we do"
          title="Three practices. Twelve services. One accountable team."
          description="Most clients start with one and expand into the others once they see how much friction disappears when engineering and growth sit in the same room."
        />

        <div className="mt-14 space-y-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="group grid gap-8 rounded-4xl border border-line bg-elevated p-7 transition-colors hover:border-brand/30 sm:p-10 lg:grid-cols-[1fr_1.6fr]"
            >
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <Icon name={cat.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold">{cat.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {cat.short}
                </p>
                <ArrowLink href={`/services/${cat.slug}`} className="mt-5">
                  Explore {cat.name.toLowerCase()}
                </ArrowLink>
              </div>

              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {servicesByCategory(cat.slug).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${cat.slug}/${s.slug}`}
                      className="flex h-full flex-col justify-between gap-2 bg-elevated p-5 transition-colors hover:bg-surface"
                    >
                      <span className="flex items-start gap-2.5">
                        <Icon
                          name={s.icon}
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        />
                        <span className="text-sm font-semibold leading-snug">
                          {s.name}
                        </span>
                      </span>
                      <span className="text-[0.8rem] leading-relaxed text-faint">
                        {s.short}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Why CINEM ────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="Why CINEM"
            title="The reasons clients consolidate with us"
            description="After five years and four hundred projects, these are the four things clients tell us made the difference."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.title} className="card-hover">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon name={d.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{d.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Live portfolio ───────────────────────────────────────────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Built by CINEM"
            title="Live products, platforms and brands"
            description="A selection of websites and digital products our team has designed and built. Open any project to explore the live experience."
          />
          <ArrowLink href="/work">Explore all live projects</ArrowLink>
        </div>
        <div className="mt-14">
          <ProjectShowcase limit={6} />
        </div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="From first call to launched product"
            description="The same four steps whether you're commissioning a website or a twenty-week platform build."
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="bg-elevated p-8">
                <span className="font-mono text-xs font-semibold tracking-widest text-brand">
                  {p.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Insights ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Insights" title="Notes from the work" />
          <ArrowLink href="/blog">Read all articles</ArrowLink>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featuredPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card-hover group overflow-hidden !p-0"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface">
                <Image
                  src={`/images/blog/${p.slug}.webp`}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-xs text-faint">
                  <Badge>{p.category}</Badge>
                  <span>{p.readingTime} read</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
