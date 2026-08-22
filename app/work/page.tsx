import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Container, Eyebrow } from "@/components/ui";
import { liveProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore live websites, SaaS products, AI platforms, e-commerce experiences and healthcare projects designed and built by CINEM.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Our work</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Work you can open, use and judge for yourself
            </h1>
            <p className="prose-body mt-6 text-pretty">
              These are real, live products and websites delivered by our team
              across AI, SaaS, commerce, education, hospitality and healthcare.
              No concept mockups and no invented performance numbers — click any
              project to experience the finished work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full border border-line bg-elevated px-4 py-2">
                {liveProjects.length} live projects
              </span>
              <span className="rounded-full border border-line bg-elevated px-4 py-2">
                6 industries
              </span>
              <span className="rounded-full border border-line bg-elevated px-4 py-2">
                Product + growth delivery
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <ProjectShowcase />
        </Container>
      </section>

      <CTA
        title="Let's build the next one together"
        body="Share the problem, the audience and the result you need. We'll turn it into a clear product plan and show you what the first release should look like."
      />
    </>
  );
}
