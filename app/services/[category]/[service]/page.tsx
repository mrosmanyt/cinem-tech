import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CTA } from "@/components/CTA";
import {
  Badge,
  Bullet,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui";
import {
  getCategory,
  getService,
  services,
  servicesByCategory,
} from "@/lib/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ category: string; service: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ category: s.category, service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service } = await params;
  const s = getService(service);
  if (!s || s.category !== category) return {};
  return {
    title: s.name,
    description: s.short,
    alternates: { canonical: `/services/${category}/${s.slug}` },
    openGraph: { title: `${s.name} | ${site.name}`, description: s.short },
  };
}

export default async function ServicePage({ params }: Props) {
  const { category, service } = await params;
  const s = getService(service);
  const cat = getCategory(category);
  if (!s || !cat || s.category !== category) notFound();

  const siblings = servicesByCategory(category).filter((x) => x.slug !== s.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 right-0 h-96 w-[38rem] blur-3xl"
        />
        <Container className="relative py-16 sm:py-24">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-faint">
            <Link href="/services" className="transition-colors hover:text-ink">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/services/${cat.slug}`}
              className="transition-colors hover:text-ink"
            >
              {cat.name}
            </Link>
            <span>/</span>
            <span className="text-muted">{s.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <Eyebrow>{cat.name}</Eyebrow>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl">
                {s.headline}
              </h1>
              <p className="prose-body mt-6 text-pretty">{s.intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Start a conversation
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <a href={`mailto:${site.email}`} className="btn-secondary">
                  Email us
                </a>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 space-y-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src={`/images/services/${s.slug}.webp`}
                  alt={`${s.name} dashboard or user interface concept at CINEM`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>

              <div className="card">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
                  At a glance
                </h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-muted">Typical timeline</dt>
                    <dd className="text-right font-semibold">{s.timeline}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-t border-line pt-4">
                    <dt className="text-muted">Engagement</dt>
                    <dd className="text-right font-semibold">{s.startingAt}</dd>
                  </div>
                  <div className="border-t border-line pt-4">
                    <dt className="text-muted">Tools &amp; platforms</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {s.stack.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Outcomes ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Outcomes" title="What you get out of it" />
            <ul className="mt-8 space-y-4">
              {s.outcomes.map((o) => (
                <Bullet key={o}>{o}</Bullet>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Deliverables" title="What's in the box" />
            <ul className="mt-8 space-y-4">
              {s.deliverables.map((d) => (
                <Bullet key={d}>{d}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader eyebrow="Process" title={`How we deliver ${s.name.toLowerCase()}`} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <div key={p.title} className="bg-elevated p-8">
                <span className="font-mono text-xs font-semibold tracking-widest text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader
            eyebrow="Questions"
            title="What clients ask before starting"
          />
          <div className="divide-y divide-line border-y border-line">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-semibold marker:hidden">
                  {f.q}
                  <span className="mt-1 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Siblings ─────────────────────────────────────────────────────── */}
      {siblings.length > 0 ? (
        <section className="border-t border-line bg-surface py-20 sm:py-24">
          <Container>
            <SectionHeader eyebrow="Also in this practice" title={`More ${cat.name}`} />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {siblings.map((x) => (
                <Link
                  key={x.slug}
                  href={`/services/${cat.slug}/${x.slug}`}
                  className="card-hover group"
                >
                  <Icon name={x.icon} className="h-5 w-5 text-brand" />
                  <h3 className="mt-4 text-sm font-semibold leading-snug transition-colors group-hover:text-brand">
                    {x.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{x.short}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTA
        title={`Ready to talk about ${s.name.toLowerCase()}?`}
        body="Send us the brief, the rough budget range and the deadline you're working to. We'll tell you honestly whether it's realistic before you commit to anything."
      />
    </>
  );
}
