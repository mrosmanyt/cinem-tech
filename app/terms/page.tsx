import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing use of the ${site.name} website and engagement of our services.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

/**
 * TEMPLATE ONLY — not legal advice.
 * Have a qualified lawyer review and adapt this before publishing.
 */
const sections = [
  {
    title: "Use of this website",
    body: [
      "By accessing this website you agree to these terms. If you do not agree, please do not use the site.",
      "You may not use the site in any way that is unlawful, or that could damage, disable or impair it.",
    ],
  },
  {
    title: "Service engagements",
    body: [
      "Nothing on this website constitutes a binding offer. Services are provided only under a separate signed agreement or accepted proposal that sets out scope, deliverables, timeline and fees.",
      "Where a conflict arises between this page and a signed agreement, the signed agreement prevails.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      `All content on this website — text, design, code and graphics — is owned by ${site.name} unless stated otherwise, and may not be reproduced without permission.`,
      "Ownership of work produced for clients transfers as set out in the relevant engagement agreement.",
    ],
  },
  {
    title: "Confidentiality",
    body: [
      "Information exchanged during enquiries and engagements is treated as confidential. We will sign a mutual non-disclosure agreement on request.",
    ],
  },
  {
    title: "Third-party links and services",
    body: [
      "This site may link to third-party websites and our work may integrate third-party services. We are not responsible for the content, availability or practices of those third parties.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "This website is provided on an 'as is' basis. To the fullest extent permitted by law we exclude liability for any loss arising from use of this website.",
      "Liability in relation to services provided is governed by the applicable engagement agreement.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The current version is always the one published on this page.",
    ],
  },
  {
    title: "Contact",
    body: [`Questions about these terms can be sent to ${site.email}.`],
  },
];

export default function TermsPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-faint">
            Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
            <strong className="text-ink">Template notice —</strong> these terms
            are a starting template. Have them reviewed by a qualified lawyer
            before launch, then delete this notice.
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[0.98rem] leading-[1.75] text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
