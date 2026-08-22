/**
 * ─────────────────────────────────────────────────────────────────────────────
 * IMPORTANT — PLACEHOLDER CONTENT
 *
 * These case studies are STRUCTURAL PLACEHOLDERS written to show the right
 * shape and level of detail. They describe anonymised, generic projects.
 *
 * Before you launch, replace every entry below with a real CINEM project:
 * real client (with their written permission to be named), real numbers you
 * can evidence, real screenshots. Do not publish invented results.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  region: string;
  year: string;
  title: string;
  summary: string;
  services: string[];
  challenge: string;
  approach: string[];
  results: { value: string; label: string }[];
  outcome: string;
  accent: string;
  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "logistics-operations-platform",
    client: "Regional logistics operator",
    industry: "Logistics",
    region: "Middle East",
    year: "2025",
    title: "Replacing fourteen spreadsheets with one operations platform",
    summary:
      "A freight operator running dispatch, fleet and billing across disconnected spreadsheets moved to a single custom platform built around how their team already worked.",
    services: ["Custom Software Development", "API & Systems Integration"],
    challenge:
      "Dispatch ran on shared spreadsheets, fleet maintenance lived in a separate system, and invoices were assembled manually at month end. Errors surfaced weeks after the fact, and no one could answer basic questions about margin per route without a two-day export exercise.",
    approach: [
      "Two weeks embedded with the dispatch and finance teams to map every real step, including the undocumented ones",
      "Designed a data model around routes and jobs rather than around the old spreadsheet layout",
      "Built and rolled out module by module — dispatch first, then fleet, then billing",
      "Migrated three years of historical data and ran both systems in parallel for a month",
    ],
    results: [
      { value: "14 → 1", label: "Systems in daily use" },
      { value: "3 days → 2 hrs", label: "Month-end invoicing" },
      { value: "Real time", label: "Route margin visibility" },
    ],
    outcome:
      "Month-end close dropped from three days to under two hours, and route-level margin became visible the same day rather than the following month.",
    accent: "from-zinc-500/20 to-neutral-400/10",
    image: "/images/work/logistics-operations-platform.webp",
  },
  {
    slug: "ecommerce-ai-support",
    client: "Direct-to-consumer retail brand",
    industry: "E-commerce",
    region: "Europe",
    year: "2025",
    title: "An AI support layer that handles the night shift",
    summary:
      "A retail brand selling across six European markets deployed a multilingual AI chatbot trained on their own catalogue, policies and two years of support tickets.",
    services: ["AI Chatbots", "API & Systems Integration"],
    challenge:
      "Support volume spiked outside the team's working hours and across languages they didn't staff. Response times stretched past 24 hours during promotions, and pre-purchase questions went unanswered long enough for the sale to be lost.",
    approach: [
      "Ingested product catalogue, shipping and returns policies, and two years of resolved tickets",
      "Tuned the bot to answer from source content and escalate honestly when confidence was low",
      "Deployed on the storefront, WhatsApp and Instagram with a single shared conversation history",
      "Wired human handover into the existing help desk with full context attached",
    ],
    results: [
      { value: "24/7", label: "Coverage across six markets" },
      { value: "< 30s", label: "First response time" },
      { value: "6", label: "Languages supported" },
    ],
    outcome:
      "First response time fell from hours to seconds, and the human support team's queue now contains only conversations that genuinely need a person.",
    accent: "from-neutral-500/20 to-zinc-400/10",
    image: "/images/work/ecommerce-ai-support.webp",
  },
  {
    slug: "b2b-inbound-calling-agent",
    client: "B2B services firm",
    industry: "Professional services",
    region: "North America",
    year: "2026",
    title: "Never missing an inbound lead again",
    summary:
      "An AI voice agent now answers every inbound enquiry on the first ring, qualifies it against the firm's criteria and books straight into the sales team's calendars.",
    services: ["AI Calling Agents", "Marketing & Lead Generation"],
    challenge:
      "Paid campaigns drove strong call volume, but calls arriving outside office hours or during busy periods went to voicemail. Analysis of the call logs showed a meaningful share of missed calls never rang back.",
    approach: [
      "Built the qualification script from recordings of the firm's highest-performing salesperson",
      "Tuned voice, pacing and interruption handling until it held a natural conversation",
      "Integrated with the existing calendar and CRM so bookings appeared where the team already worked",
      "Reviewed real recordings weekly for the first month and tightened the script from evidence",
    ],
    results: [
      { value: "100%", label: "Inbound calls answered" },
      { value: "1 ring", label: "Average pickup" },
      { value: "Auto", label: "CRM logging and summaries" },
    ],
    outcome:
      "Every inbound call is now answered and logged, and the sales team starts each morning with qualified meetings already on the calendar.",
    accent: "from-zinc-600/20 to-neutral-500/10",
    image: "/images/work/b2b-inbound-calling-agent.webp",
  },
  {
    slug: "fintech-web-platform",
    client: "Financial technology startup",
    industry: "Fintech",
    region: "United Kingdom",
    year: "2025",
    title: "From investor deck to production platform in nineteen weeks",
    summary:
      "A funded fintech startup needed a customer-facing platform with real auth, permissions and audit trails — built to a standard that would survive due diligence.",
    services: ["Web Application Development", "Website Development"],
    challenge:
      "The team had a validated concept and a funding round, but no engineering capacity. They needed a production platform and a marketing site fast, without the technical debt that usually comes with moving fast.",
    approach: [
      "Defined the data model and permission matrix before writing application code",
      "Shipped a clickable prototype of core flows so stakeholders could disagree on paper",
      "Two-week sprints with a working demo at the end of each",
      "Security review, load testing and monitoring in place before launch",
    ],
    results: [
      { value: "19 weeks", label: "Concept to production" },
      { value: "98", label: "Lighthouse performance" },
      { value: "Full", label: "Audit logging from day one" },
    ],
    outcome:
      "The platform went live on schedule with automated test coverage on every critical path and documentation their in-house hires could pick up immediately.",
    accent: "from-neutral-400/20 to-zinc-500/10",
    image: "/images/work/fintech-web-platform.webp",
  },
  {
    slug: "hospitality-social-growth",
    client: "Hospitality group",
    industry: "Hospitality",
    region: "Asia Pacific",
    year: "2025",
    title: "A dedicated social manager for a multi-venue group",
    summary:
      "One named CINEM manager took ownership of a hospitality group's social presence across five venues, backed by our video and design teams.",
    services: ["Dedicated Social Media Manager", "On-Demand Content Creation"],
    challenge:
      "Each venue posted independently and inconsistently. Brand voice varied wildly, reactive content never happened in time, and nobody owned the result.",
    approach: [
      "Assigned a single manager with hospitality experience, interviewed and chosen by the client",
      "Two weeks embedded across all five venues to learn the brand and the teams",
      "Built one master calendar with venue-level flexibility for reactive posts",
      "Brought in our video team for a monthly shoot day covering all venues at once",
    ],
    results: [
      { value: "5", label: "Venues on one calendar" },
      { value: "Daily", label: "Publishing cadence" },
      { value: "Same day", label: "Reactive content turnaround" },
    ],
    outcome:
      "Publishing became consistent across every venue, and the group gained a single accountable owner who knows the business from the inside.",
    accent: "from-zinc-500/20 to-stone-400/10",
    image: "/images/work/hospitality-social-growth.webp",
  },
  {
    slug: "saas-mobile-launch",
    client: "SaaS platform",
    industry: "Software",
    region: "North America",
    year: "2026",
    title: "Taking an established web product to iOS and Android",
    summary:
      "A web-first SaaS platform launched on both app stores from a single React Native codebase, with offline support and push notifications.",
    services: ["Mobile App Development", "API & Systems Integration"],
    challenge:
      "Users increasingly worked from the field, where the web app was awkward and connectivity was unreliable. A native experience with offline capability had been requested for two years running.",
    approach: [
      "Cut the feature list to what earned a v1 release and roadmapped the rest",
      "Platform-correct UI for iOS and Android rather than one design forced onto both",
      "Offline-first data layer with conflict resolution on reconnect",
      "Handled store submission, review correspondence and a staged rollout",
    ],
    results: [
      { value: "1", label: "Codebase, two stores" },
      { value: "Offline", label: "Full field capability" },
      { value: "First pass", label: "Store approval" },
    ],
    outcome:
      "Both apps were approved on first submission and field users can now work through connectivity gaps without losing data.",
    accent: "from-stone-500/20 to-neutral-400/10",
    image: "/images/work/saas-mobile-launch.webp",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/**
 * TESTIMONIALS — intentionally empty.
 *
 * The testimonial section only renders when this array has entries, so nothing
 * fake ships by accident. Add real, attributed quotes you have permission to
 * publish. Never invent one.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [];
