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
import { caseStudies, getCaseStudy } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const others = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 right-0 h-96 w-[38rem] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="grid-lines pointer-events-none absolute inset-0 opacity-25"
        />
        <Container className="relative py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <nav className="mb-8 flex items-center gap-2 text-sm text-faint">
                <Link href="/work" className="transition-colors hover:text-ink">
                  Work
                </Link>
                <span>/</span>
                <span className="text-muted">{c.industry}</span>
              </nav>

              <Eyebrow>
                {c.client} · {c.region} · {c.year}
              </Eyebrow>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl">
                {c.title}
              </h1>
              <p className="prose-body mt-6 text-pretty">{c.summary}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {c.services.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line bg-surface lg:aspect-[4/3]">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
          </div>

          <dl className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {c.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {r.value}
                </dd>
                <dd className="mt-2 text-sm text-muted">{r.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader eyebrow="The challenge" title="Where they started" />
          </div>
          <p className="prose-body text-pretty">{c.challenge}</p>
        </div>
      </Section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader eyebrow="Our approach" title="What we did" />
            </div>
            <ul className="space-y-5">
              {c.approach.map((a) => (
                <Bullet key={a}>{a}</Bullet>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader eyebrow="The outcome" title="What changed" />
          </div>
          <div>
            <p className="prose-body text-pretty">{c.outcome}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {c.results.map((r) => (
                <div key={r.label} className="card">
                  <div className="font-display text-2xl font-semibold text-brand">
                    {r.value}
                  </div>
                  <div className="mt-2 text-sm text-muted">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeader eyebrow="More work" title="Other projects" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/work/${o.slug}`} className="card-hover group">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
                  {o.industry}
                </span>
                <h3 className="mt-4 text-base font-semibold leading-snug transition-colors group-hover:text-brand">
                  {o.title}
                </h3>
                <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand">
                  Read case study
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
