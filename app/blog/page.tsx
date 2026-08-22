import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { CTA } from "@/components/CTA";
import { Badge, Container, Eyebrow } from "@/components/ui";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical writing on web development, AI deployment, agency strategy and growth marketing from the CINEM team.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Insights</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Notes from the work
            </h1>
            <p className="prose-body mt-6 text-pretty">
              What we've learned building software and running growth programmes —
              written for the people making the decisions, not for search engines.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          {featured ? (
            <Link
              href={`/blog/${featured.slug}`}
              className="card-hover group grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:!p-0 overflow-hidden"
            >
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-xs text-faint">
                  <Badge>{featured.category}</Badge>
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readingTime} read</span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold leading-snug transition-colors group-hover:text-brand sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="prose-body mt-4 text-pretty">{featured.excerpt}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-brand">
                  Read article →
                </span>
              </div>
              <div className="relative hidden h-72 overflow-hidden rounded-r-3xl border-l border-line bg-surface lg:block lg:h-full lg:min-h-[300px]">
                <Image
                  src={`/images/blog/${featured.slug}.webp`}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Link>
          ) : null}

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-hover group flex flex-col overflow-hidden !p-0"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
                  <Image
                    src={`/images/blog/${p.slug}.webp`}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-faint">
                    <Badge>{p.category}</Badge>
                    <span>{p.readingTime} read</span>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {p.excerpt}
                  </p>
                  <span className="mt-6 text-xs text-faint">
                    {formatDate(p.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Want this kind of thinking applied to your business?"
        body="The articles are free. The version tailored to your situation takes a thirty-minute call."
      />
    </>
  );
}
