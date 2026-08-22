import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { Badge, Container, Section, SectionHeader } from "@/components/ui";
import { getPost, posts } from "@/lib/blog";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      publishedTime: p.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <section className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden="true"
            className="glow pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 blur-3xl"
          />
          <Container className="relative py-16 sm:py-24">
            <nav className="mb-8 flex items-center gap-2 text-sm text-faint">
              <Link href="/blog" className="transition-colors hover:text-ink">
                Insights
              </Link>
              <span>/</span>
              <span className="text-muted">{post.category}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs text-faint">
                <Badge>{post.category}</Badge>
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readingTime} read</span>
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.12] sm:text-5xl">
                {post.title}
              </h1>
              <p className="prose-body mt-6 text-pretty">{post.excerpt}</p>
              <p className="mt-8 text-sm text-faint">By {post.author}</p>
            </div>
          </Container>
        </section>

        <Container className="pt-12 sm:pt-16">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-line bg-surface">
            <Image
              src={`/images/blog/${post.slug}.webp`}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </Container>

        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl space-y-6">
            {post.body.map((block, i) =>
              block.startsWith("## ") ? (
                <h2
                  key={i}
                  className="!mt-14 text-2xl font-semibold leading-snug sm:text-[1.75rem]"
                >
                  {block.replace("## ", "")}
                </h2>
              ) : (
                <p
                  key={i}
                  className="text-[1.05rem] leading-[1.8] text-muted text-pretty"
                >
                  {block}
                </p>
              ),
            )}
          </div>
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="border-y border-line bg-surface py-16 sm:py-20">
          <Container>
            <SectionHeader eyebrow="Keep reading" title="More insights" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card-hover group">
                  <Badge>{p.category}</Badge>
                  <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTA />
    </>
  );
}
