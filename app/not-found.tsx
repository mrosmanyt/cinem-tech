import Link from "next/link";
import { Container } from "@/components/ui";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 blur-3xl"
      />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-mono text-sm font-semibold tracking-[0.3em] text-brand">
          404
        </span>
        <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-tight sm:text-5xl">
          That page doesn't exist
        </h1>
        <p className="prose-body mt-5 max-w-md">
          It may have moved, or the link might be out of date. Try the services
          overview, or tell us what you were looking for.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to home
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/services" className="btn-secondary">
            Browse services
          </Link>
        </div>
      </Container>
    </section>
  );
}
