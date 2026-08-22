import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { CTA } from "@/components/CTA";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  Stat,
} from "@/components/ui";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a ${site.teamSize}-person technology and growth agency. Five years building websites, apps, custom software, AI systems and demand generation programmes for clients worldwide.`,
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: "check",
    title: "We say no",
    body: "If a project isn't a fit — wrong budget, wrong timeline, wrong problem for our team — we say so on the first call. Taking work we can't do well costs everyone more than turning it down.",
  },
  {
    icon: "target",
    title: "We quote what it costs",
    body: "Fixed scope, fixed price, written down. If scope changes we re-quote transparently before anything is built. No hourly creep, no surprise invoice in month three.",
  },
  {
    icon: "user",
    title: "You meet the people doing the work",
    body: "The engineers and managers on your project are the ones in your calls. Nothing is relayed through an account layer that has to check and get back to you.",
  },
  {
    icon: "code",
    title: "We build to be handed over",
    body: "Documented, tested and structured so another team could pick it up. That's a strange thing for an agency to optimise for, and it's exactly why clients stay.",
  },
];

const departments = [
  {
    name: "Engineering",
    count: "10",
    detail:
      "Front-end, back-end, mobile and DevOps engineers across web, native and cloud infrastructure.",
  },
  {
    name: "AI & Automation",
    count: "4",
    detail:
      "Conversational AI, voice agents, retrieval systems and workflow automation specialists.",
  },
  {
    name: "Design & Content",
    count: "4",
    detail:
      "Product designers, brand designers, motion artists, videographers and writers.",
  },
  {
    name: "Growth & PR",
    count: "4",
    detail:
      "Social media managers, paid media buyers, SEO specialists and communications leads.",
  },
  {
    name: "Delivery & Support",
    count: "3",
    detail:
      "Delivery leads and client support keeping projects on schedule and communication clear.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Founded as a development studio",
    body: "Started with a small engineering team building custom websites and web applications for regional clients.",
  },
  {
    year: "2022",
    title: "Growth services added",
    body: "Clients kept asking who would run the marketing on what we'd built. So we built that team too.",
  },
  {
    year: "2024",
    title: "AI practice launched",
    body: "Conversational AI and voice agents became a standalone practice as demand moved from experiments to production deployments.",
  },
  {
    year: "2026",
    title: `${site.teamSize} specialists, clients on four continents`,
    body: "Engineering, AI and growth operating as one delivery organisation with a shared standard.",
  },
];

export default function AboutPage() {
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
            <Eyebrow>About {site.name}</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              A technology team and a growth team that actually talk to each
              other
            </h1>
            <p className="prose-body mt-6 text-pretty">
              {site.name} started in {site.founded} as a small engineering studio.
              Clients kept asking who would market the products we'd built for
              them, so we built that team too. Five years on, {site.teamSize}{" "}
              specialists work across engineering, artificial intelligence and
              growth — one organisation, one standard, one point of
              accountability.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-12 lg:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow="How we operate"
          title="Four commitments we don't negotiate on"
          description="These cost us work sometimes. They're also why our clients tend to stay for years rather than projects."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="card-hover">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon name={v.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="The team"
            title={`${site.teamSize} people, five disciplines`}
            description="Big enough to staff a twenty-week platform build and a monthly content programme at the same time. Small enough that the founders still read every proposal."
          />

          <div className="relative mt-12 mb-12 aspect-[21/9] w-full overflow-hidden rounded-3xl border border-line bg-surface">
            <Image
              src="/images/team/studio-workspace.webp"
              alt="A premium collaborative digital product studio with engineering and design workspaces"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {departments.map((d) => (
              <div key={d.name} className="bg-elevated p-7">
                <div className="font-display text-3xl font-semibold text-brand">
                  {d.count}
                </div>
                <h3 className="mt-3 text-base font-semibold">{d.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {d.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-faint">
            Headcount across full-time staff and long-term contract specialists.
          </p>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="History" title="How we got here" />
        <div className="mt-14 space-y-px overflow-hidden rounded-3xl border border-line bg-line">
          {timeline.map((t) => (
            <div
              key={t.year}
              className="grid gap-4 bg-elevated p-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
            >
              <span className="font-mono text-sm font-semibold tracking-widest text-brand">
                {t.year}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeader
              eyebrow="Careers"
              title="We're usually hiring"
              description="Engineers, designers, social managers and AI specialists. Remote-first, project variety that keeps the work interesting, and clients who care about craft."
            />
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a href={`mailto:${site.careersEmail}`} className="btn-primary">
                Send us your work
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <Link href="/contact" className="btn-secondary">
                Talk to us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
