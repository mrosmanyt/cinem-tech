import Link from "next/link";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Icon } from "@/components/Icon";
import {
  Bullet,
  Container,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/ui";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import { ContractActions } from "@/components/ContractActions";

export const metadata: Metadata = {
  title: "Contract & Engagement Terms",
  description:
    "How a project with CINEM actually runs: the free demo, the four-step process, the payment schedule, and delivery timelines — all before you sign anything.",
  alternates: { canonical: "/contract" },
};

const engagementSteps = [
  {
    step: "01",
    title: "Free demo",
    body: "For website, web app and app projects, we build a working demo first — no payment, no signed contract. You see real work before deciding anything.",
    icon: "browser",
  },
  {
    step: "02",
    title: "Scope & agreement",
    body: "You approve the demo, we agree the final scope, price and delivery date in writing. This is the point a project formally starts.",
    icon: "check",
  },
  {
    step: "03",
    title: "Development",
    body: "We build to the agreed scope. You get progress updates and can review work in motion, not just at the end.",
    icon: "code",
  },
  {
    step: "04",
    title: "Handover",
    body: "Final delivery, source files, credentials and a walkthrough. Support windows are listed on each service's page.",
    icon: "target",
  },
];

const paymentMilestones = [
  {
    label: "Milestone 1",
    trigger: "When the project reaches 50% completion",
    amount: "50%",
    detail:
      "Once the build is verifiably halfway through the agreed scope, we invoice the first half of the total project fee. Work continues once this is settled.",
  },
  {
    label: "Milestone 2",
    trigger: "When the project reaches 100% completion",
    amount: "50%",
    detail:
      "The remaining half is invoiced at full completion. Final source files, production deployment and account handover follow once this is settled.",
  },
];

const commercialTerms = [
  {
    number: "1",
    title: "Scope, deliverables and assumptions",
    body: "The signed proposal defines the product, pages, features, integrations, deliverables, exclusions and acceptance criteria. Anything not written into that scope is not included by implication. Estimates assume the client supplies required content, access and feedback on time.",
  },
  {
    number: "2",
    title: "Change control",
    body: "A request that changes an approved flow, adds a feature, introduces a new integration or materially expands content is a scope change. CINEM will describe the impact on price and timeline in writing. No additional charge is incurred until the client approves that change.",
  },
  {
    number: "3",
    title: "Reviews and acceptance",
    body: "Each milestone is presented for review against the written acceptance criteria. The client has five business days to provide one consolidated response. A deliverable is accepted when approved in writing, used in production, or no material scope-based defect is reported within that review period.",
  },
  {
    number: "4",
    title: "Client responsibilities",
    body: "The client must provide accurate copy, brand assets, legal text, credentials, third-party approvals and a decision-maker with authority to approve work. Delays in these items move the delivery date by the same period and may require a revised production slot.",
  },
  {
    number: "5",
    title: "Intellectual property and portfolio use",
    body: "After final cleared payment, custom source code, approved design files and project-specific assets transfer to the client. CINEM retains ownership of pre-existing tools, reusable libraries and internal methods while granting the client a perpetual licence to any such elements embedded in the deliverable. Unless the proposal says otherwise, CINEM may identify the completed public project in its portfolio without disclosing confidential information.",
  },
  {
    number: "6",
    title: "Confidentiality and data",
    body: "Both parties must protect non-public business, technical and customer information using reasonable safeguards and disclose it only to people who need it for delivery. Credentials must be shared through an agreed secure channel. Each party remains responsible for its own privacy, employment and regulatory obligations.",
  },
  {
    number: "7",
    title: "Third-party services",
    body: "Hosting, domains, app stores, payment processors, AI models, stock assets and external APIs are governed by their providers. Their fees are excluded unless expressly listed. CINEM is not responsible for a provider outage, policy change or account suspension, but will reasonably assist with mitigation under the agreed support scope.",
  },
  {
    number: "8",
    title: "Warranty and support",
    body: "For thirty days after launch, CINEM will correct reproducible defects that cause the delivered product to differ materially from the approved scope, at no extra charge. New features, content changes, third-party changes and problems caused by client edits fall outside this warranty and are quoted separately or handled under a support plan.",
  },
  {
    number: "9",
    title: "Suspension and termination",
    body: "Either party may terminate for a material breach that remains uncured for ten business days after written notice. CINEM may pause work for an overdue undisputed invoice or missing client dependency. On termination, the client pays only for approved work completed and committed non-cancellable costs; completed paid work is handed over in its current state.",
  },
  {
    number: "10",
    title: "Liability, force majeure and disputes",
    body: "Neither party is liable for indirect, special or consequential losses. Except for fraud, deliberate misconduct, confidentiality breaches or unpaid fees, each party's aggregate liability is limited to fees paid under the relevant project. Neither party is responsible for delay caused by events reasonably outside its control. The signed proposal states the governing law and dispute forum for the client's jurisdiction.",
  },
];

const invoiceRules = [
  "Milestone invoices are due within seven calendar days unless the signed proposal states another period.",
  "Milestone 1 becomes payable only when the agreed scope is demonstrably 50% complete and available for review.",
  "Milestone 2 becomes payable when the full agreed scope is complete and ready for production handover.",
  "Work may pause while an undisputed invoice is overdue; the delivery date moves by the length of that pause.",
  "Taxes, bank charges and third-party platform fees are paid by the party identified in the proposal.",
  "Final production credentials, transferable source files and ownership handover occur after the final cleared payment.",
];

const timelineServices = [
  "website-development",
  "custom-software",
  "mobile-app-development",
].map((slug) => getService(slug)!);

export default function ContractPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="glow pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>Contract &amp; Engagement Terms</Eyebrow>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
              How a project with us actually runs — before you sign anything
            </h1>
            <p className="prose-body mt-6 text-pretty">
              This page exists so nothing about working with {site.name} is a
              surprise: how the free demo works, what happens at each stage, when
              payments are due, and how long each type of project typically takes.
              Read this before you enquire, not after.
            </p>
            <div className="mt-8"><ContractActions /></div>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            <strong className="text-ink">Template notice —</strong> the terms on
            this page describe our standard engagement model in plain language.
            The binding version of these terms lives in the signed proposal for
            your specific project. Have a lawyer review your jurisdiction's
            requirements before treating this page as a legal contract.
          </div>
        </Container>
      </section>

      {/* ── Free demo ────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="Before anything else"
              title="You see the work before you pay for it"
            />
          </div>
          <div>
            <p className="prose-body text-pretty">
              If you're considering a website, web app or mobile app, the first
              step is not a contract — it's a demo. We build a working preview
              of what your project could look like, and you review it against
              your own standards before deciding whether to move forward.
            </p>
            <ul className="mt-7 space-y-4">
              <Bullet>No payment or signature required to see the demo.</Bullet>
              <Bullet>
                You evaluate the actual quality of our work, not a portfolio of
                someone else's.
              </Bullet>
              <Bullet>
                If it's not right, you walk away — nothing owed, no pressure.
              </Bullet>
              <Bullet>
                If you approve it, we move to a written scope and the payment
                schedule below.
              </Bullet>
            </ul>
          </div>
        </div>
      </Section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader eyebrow="Invoice rules" title="The 50 / 50 model in detail" description="The commercial trigger is completed work, not an arbitrary date. These rules apply unless the signed proposal deliberately replaces one of them." />
            </div>
            <ol className="space-y-4">
              {invoiceRules.map((rule, index) => (
                <li key={rule} className="card flex gap-4 !rounded-2xl !p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-bg">{index + 1}</span>
                  <p className="text-sm leading-7 text-muted">{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── Process ──────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="The process"
            title="Four steps, start to finish"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((s) => (
              <div key={s.step} className="bg-elevated p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-widest text-brand">
                    {s.step}
                  </span>
                  <Icon name={s.icon} className="h-4 w-4 text-faint" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="Standard legal terms" title="Clear responsibilities on both sides" description="These clauses are the standard baseline. The signed proposal records the client name, project scope, governing law and any negotiated changes, and takes priority if there is a conflict." />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {commercialTerms.map((term) => (
            <article key={term.number} className="card-hover relative overflow-hidden">
              <span className="absolute right-5 top-4 font-display text-5xl font-bold text-brand/8">{term.number.padStart(2, "0")}</span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Clause {term.number}</p>
              <h3 className="mt-3 pr-10 text-lg font-semibold">{term.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{term.body}</p>
            </article>
          ))}
        </div>
        <div className="no-print mt-10 rounded-3xl border border-brand/20 bg-brand/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div><h3 className="text-lg font-semibold">Need a project-specific agreement?</h3><p className="mt-2 text-sm leading-relaxed text-muted">Your signed proposal will insert the parties, exact scope, price, dates, jurisdiction and approved exceptions.</p></div>
          <div className="mt-5 shrink-0 sm:mt-0"><ContractActions /></div>
        </div>
      </Section>

      {/* ── Payment schedule ─────────────────────────────────────────────── */}
      <Section>
        <SectionHeader
          eyebrow="Payment schedule"
          title="Two payments, tied to real progress"
          description="We don't invoice on a calendar — we invoice on completion. Half when the work is verifiably half done, the rest when it's finished. Nothing is due before the demo, and nothing is due until there's something to show for it."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {paymentMilestones.map((m, i) => (
            <div key={m.label} className="card relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 font-display text-8xl font-bold text-brand/5"
              >
                {m.amount}
              </div>
              <span className="eyebrow relative">{m.label}</span>
              <div className="relative mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-brand">
                  {m.amount}
                </span>
                <span className="text-sm text-muted">of total project fee</span>
              </div>
              <p className="relative mt-4 text-sm font-semibold text-ink">
                {m.trigger}
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {m.detail}
              </p>
              {i === 0 ? (
                <div className="relative mt-6 flex items-center gap-2 text-xs text-faint">
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                  Work continues once this is settled
                </div>
              ) : (
                <div className="relative mt-6 flex items-center gap-2 text-xs text-faint">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  Source files and handover follow this payment
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          "Completion" at each milestone is defined against the written scope
          agreed in step two of the process above — not a subjective estimate.
          For retainer-based services (social media, marketing, PR), this
          milestone structure doesn't apply; those run on a standard monthly
          billing cycle instead, detailed in the proposal.
        </p>
      </Section>

      {/* ── Timelines ────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="Delivery timelines"
            title="How long each project type takes"
            description="These are typical timelines for a well-scoped project once step two — scope and agreement — is signed off. Larger or more complex builds are quoted individually during that step."
          />

          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl border border-line text-left">
              <thead>
                <tr className="bg-surface">
                  <th className="border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                    Service
                  </th>
                  <th className="border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                    Typical timeline
                  </th>
                  <th className="border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {timelineServices.map((s) => (
                  <tr key={s.slug} className="bg-elevated">
                    <td className="border-b border-line px-6 py-5 text-sm font-semibold">
                      <Link
                        href={`/services/${s.category}/${s.slug}`}
                        className="hover:text-brand"
                      >
                        {s.name}
                      </Link>
                    </td>
                    <td className="border-b border-line px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                        <Icon name="clock" className="h-3.5 w-3.5" />
                        {s.timeline}
                      </span>
                    </td>
                    <td className="border-b border-line px-6 py-5 text-sm leading-relaxed text-muted">
                      {s.short}
                    </td>
                  </tr>
                ))}
                <tr className="bg-elevated">
                  <td className="px-6 py-5 text-sm font-semibold">
                    Everything else
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-sm font-semibold text-muted">
                      Varies by scope
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm leading-relaxed text-muted">
                    Web applications, integrations, AI systems and retainer
                    services are timed individually — see each{" "}
                    <Link href="/services" className="text-brand hover:underline">
                      service page
                    </Link>{" "}
                    for its typical range.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ── Ownership, revisions, cancellation ──────────────────────────── */}
      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon name="code" className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">Ownership</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Once the final payment clears, all source code, design files and
              assets produced for your project transfer to you outright. There
              are no ongoing licence fees.
            </p>
          </div>
          <div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon name="chat" className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">Revisions</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Feedback rounds are built into the development stage against the
              agreed scope. Changes outside that scope are quoted separately
              rather than absorbed silently — you'll always see the number
              before agreeing to it.
            </p>
          </div>
          <div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon name="clock" className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">Delays &amp; cancellation</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Timelines assume timely feedback on our end and yours. If a
              project is cancelled after Milestone 1 is paid, work completed to
              that point remains delivered and billable; nothing is charged for
              work not yet done.
            </p>
          </div>
        </div>
      </Section>

      <CTA
        title="Start with the free demo — no commitment either way"
        body="Tell us what you're building. If it's a website, web app or app, we'll come back with a working preview before asking you to sign or pay anything."
        primaryLabel="Request a free demo"
      />
    </>
  );
}
