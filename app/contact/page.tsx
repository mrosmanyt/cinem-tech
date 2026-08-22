import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to ${site.name} about your web, app, software, AI or growth project. We reply within one business day.`,
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    q: "What happens after I send this?",
    a: "A delivery lead reads it — not a bot — and replies within one business day with either a few clarifying questions or a proposed call time.",
  },
  {
    q: "Do I have to pay anything to see a demo?",
    a: "No. For website, web app and app projects, the demo comes first and it's free. See our full engagement process and payment schedule on the contract page.",
  },
  {
    q: "Do you work with clients in other timezones?",
    a: "Constantly. Our clients are spread across four continents and our teams overlap with European, Gulf and North American working hours.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes, before any detailed discussion if you'd prefer. Send yours or ask for ours.",
  },
  {
    q: "Do you take on small projects?",
    a: "Sometimes. We'll tell you honestly on the first call if your project is better served by a smaller team or a different approach.",
  },
];

export default function ContactPage() {
  const hasPhone = !site.phone.includes("000");
  const hasAddress = !site.address.line1.startsWith("Add ");

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 blur-3xl"
        />
        <Container className="relative py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              Tell us what you're building
            </h1>
            <p className="prose-body mt-6 text-pretty">
              One paragraph is enough to start. We'll come back within one
              business day with an honest view of scope, timeline and whether
              we're the right team for it. Not sure yet? Ask for a free demo
              first — see our work before you decide anything.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <ContactForm />

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="card">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
                  Direct contact
                </h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-start gap-3 text-muted transition-colors hover:text-ink"
                    >
                      <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>
                        <span className="block font-medium text-ink">General</span>
                        {site.email}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.salesEmail}`}
                      className="flex items-start gap-3 text-muted transition-colors hover:text-ink"
                    >
                      <Icon name="target" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>
                        <span className="block font-medium text-ink">New projects</span>
                        {site.salesEmail}
                      </span>
                    </a>
                  </li>
                  {hasPhone ? <li>
                    <a
                      href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                      className="flex items-start gap-3 text-muted transition-colors hover:text-ink"
                    >
                      <Icon
                        name="phone-call"
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      />
                      <span>
                        <span className="block font-medium text-ink">Phone</span>
                        {site.phone}
                      </span>
                    </a>
                  </li> : null}
                  {hasAddress ? <li className="flex items-start gap-3 text-muted">
                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="block font-medium text-ink">Office</span>
                      {site.address.line1}
                      <br />
                      {site.address.city}, {site.address.country}
                    </span>
                  </li> : null}
                </ul>
              </div>

              <div className="card">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-faint">
                  Good to know
                </h2>
                <dl className="mt-5 space-y-5">
                  {faqs.map((f) => (
                    <div key={f.q}>
                      <dt className="text-sm font-semibold">{f.q}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
