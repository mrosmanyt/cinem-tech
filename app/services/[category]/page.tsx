import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CTA } from "@/components/CTA";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui";
import { categories, getCategory, servicesByCategory } from "@/lib/services";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.short,
    alternates: { canonical: `/services/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const items = servicesByCategory(cat.slug);
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="grid-lines pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_30%_0%,black,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/4 h-96 w-[42rem] blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <nav className="mb-8 flex items-center gap-2 text-sm text-faint">
            <Link href="/services" className="transition-colors hover:text-ink">
              Services
            </Link>
            <span>/</span>
            <span className="text-muted">{cat.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>{cat.name}</Eyebrow>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
                {cat.headline}
              </h1>
              <p className="prose-body mt-6 text-pretty">{cat.intro}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Discuss a project
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/work" className="btn-secondary">
                  Related case studies
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-line bg-surface lg:aspect-[4/3] xl:aspect-[16/10]">
              <Image
                src={`/images/services/${cat.slug}.webp`}
                alt={`${cat.name} practice illustration at CINEM`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader
          eyebrow={`${items.length} services`}
          title={`What's included in ${cat.name}`}
        />

        <div className="mt-14 space-y-5">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${cat.slug}/${s.slug}`}
              className="card-hover group grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold transition-colors group-hover:text-brand">
                  {s.name}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {s.short}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-faint">
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    {s.timeline}
                  </span>
                  <span>{s.startingAt}</span>
                </div>
              </div>
              <Icon
                name="arrow"
                className="hidden h-5 w-5 text-faint transition-all group-hover:translate-x-1 group-hover:text-brand md:block"
              />
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
