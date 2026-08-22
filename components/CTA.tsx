import Link from "next/link";
import { Container } from "./ui";
import { Icon } from "./Icon";
import { site } from "@/lib/site";

export function CTA({
  title = "Let's talk about what you're building",
  body = "Tell us the problem in one paragraph. We'll come back within one business day with an honest view of scope, timeline and whether we're the right team for it.",
  primaryLabel = "Book a call",
  primaryHref = "/contact",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-4xl border border-line bg-elevated px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="glow pointer-events-none absolute -top-32 left-1/2 h-80 w-[42rem] -translate-x-1/2 blur-3xl"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="prose-body mx-auto mt-5 max-w-xl text-pretty">{body}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={primaryHref} className="btn-primary w-full sm:w-auto">
                {primaryLabel}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="btn-secondary w-full sm:w-auto"
              >
                {site.email}
              </a>
            </div>
            <p className="mt-6 text-sm text-faint">
              Replies within one business day · NDAs signed on request
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
