export type ServiceCategory = {
  slug: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  icon: string;
};

export type Service = {
  slug: string;
  category: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  icon: string;
  outcomes: string[];
  deliverables: string[];
  process: { title: string; body: string }[];
  stack: string[];
  faqs: { q: string; a: string }[];
  timeline: string;
  startingAt: string;
};

export const categories: ServiceCategory[] = [
  {
    slug: "development",
    name: "Development",
    short: "Websites, web apps, mobile apps, custom software and integrations.",
    headline: "Software that ships, scales and survives your growth",
    intro:
      "Everything we build starts from scratch — no recycled templates, no page builders bolted onto a business that outgrew them. Our engineering teams write production code your own developers can pick up and extend on day one.",
    icon: "code",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    short: "Chatbots, AI calling agents and automation that handle real work.",
    headline: "AI that answers, qualifies and books — around the clock",
    intro:
      "We deploy AI that does a job, not AI that does a demo. Chatbots that resolve support tickets, calling agents that pick up every lead within seconds, and automations that remove the manual steps between your tools.",
    icon: "spark",
  },
  {
    slug: "growth-marketing",
    name: "Growth & Marketing",
    short: "Social media, content, PR and lead generation.",
    headline: "Attention you can measure, pipeline you can forecast",
    intro:
      "Our growth teams run the day-to-day: publishing, community, creative, campaigns and outreach. You get a named team, a public content calendar and a monthly report that ties spend to pipeline.",
    icon: "growth",
  },
];

export const services: Service[] = [
  {
    slug: "website-development",
    category: "development",
    name: "Website Development",
    short:
      "Custom marketing sites and corporate websites, engineered from scratch for speed and search.",
    headline: "Websites built from scratch — not assembled from templates",
    intro:
      "Your website is the first thing an international buyer checks before they reply to your email. We design and engineer it properly: custom design, hand-written code, sub-second load times and a content system your marketing team can actually use without calling a developer.",
    icon: "browser",
    timeline: "7–10 days",
    startingAt: "Project-based",
    outcomes: [
      "Lighthouse performance scores of 95+ on mobile and desktop",
      "Technical SEO foundation that ranks without ongoing plugin fees",
      "A CMS your marketing team can update without touching code",
      "Design system and component library your team owns outright",
    ],
    deliverables: [
      "Discovery workshop and sitemap",
      "Full custom UI design in Figma, desktop and mobile",
      "Responsive front-end build with accessibility baked in",
      "Headless CMS setup with editor training",
      "Analytics, conversion tracking and event instrumentation",
      "30 days of post-launch support",
    ],
    process: [
      {
        title: "Discovery",
        body: "We map your buyers, your competitors and the questions your sales team answers most. That becomes the sitemap.",
      },
      {
        title: "Design",
        body: "Custom UI in Figma — every page, both themes, mobile first. You review and sign off before a line of code is written.",
      },
      {
        title: "Build",
        body: "Component-driven front-end build with a headless CMS, staged on a preview URL you can share internally.",
      },
      {
        title: "Launch",
        body: "Performance and accessibility audit, analytics wiring, DNS cutover, and a handover session with your team.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Sanity", "Vercel"],
    faqs: [
      {
        q: "Do we own the code?",
        a: "Yes. Full source code, design files and repository access transfer to you at launch. No licence fees, no lock-in.",
      },
      {
        q: "Can you work with our existing brand guidelines?",
        a: "We do it constantly. Send the guidelines and we design inside them. If you don't have any, we can build a lightweight visual identity as part of the project.",
      },
      {
        q: "What if we need changes after launch?",
        a: "Thirty days of support is included. After that most clients move to a monthly retainer, or take it in-house with our documentation.",
      },
    ],
  },
  {
    slug: "web-applications",
    category: "development",
    name: "Web Application Development",
    short:
      "Dashboards, portals, SaaS products and internal tools built for real usage at scale.",
    headline: "Web applications your users log into every day",
    intro:
      "Marketing sites get visited. Web applications get lived in. We build the platforms your customers and staff open every morning — dashboards, client portals, booking systems, marketplaces and full SaaS products — with the auth, permissions and audit trails that real businesses require.",
    icon: "layers",
    timeline: "8–20 weeks",
    startingAt: "Project or dedicated team",
    outcomes: [
      "A working product in production, not a prototype",
      "Role-based access control and audit logging from day one",
      "Automated test coverage on critical paths",
      "Infrastructure that scales without a rewrite",
    ],
    deliverables: [
      "Technical architecture document and data model",
      "Interactive prototype before build begins",
      "Front-end and back-end implementation",
      "Authentication, billing and third-party integrations",
      "CI/CD pipeline, staging and production environments",
      "Developer documentation and handover",
    ],
    process: [
      {
        title: "Architecture",
        body: "We define the data model, the permission matrix and the integration surface before writing code — this is where projects are won or lost.",
      },
      {
        title: "Prototype",
        body: "A clickable prototype of the core flows, so stakeholders can disagree on paper instead of in production.",
      },
      {
        title: "Sprints",
        body: "Two-week sprints with a live demo at the end of each. You see working software every fortnight.",
      },
      {
        title: "Hardening",
        body: "Load testing, security review, monitoring and alerting before we hand you the keys.",
      },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "AWS", "Stripe"],
    faqs: [
      {
        q: "Can you take over an existing codebase?",
        a: "Yes. We start with a paid technical audit that tells you honestly what's salvageable and what should be rebuilt, then work from there.",
      },
      {
        q: "How do you handle scope changes mid-project?",
        a: "Sprint-based delivery means scope is reviewed every two weeks. Changes get costed transparently before they enter a sprint.",
      },
      {
        q: "Do you offer a dedicated team model?",
        a: "For projects over three months most clients prefer it — a fixed squad of engineers, designers and a delivery lead billed monthly.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    category: "development",
    name: "Mobile App Development",
    short: "Native and cross-platform iOS and Android apps, from concept to store approval.",
    headline: "Apps that get approved, get downloaded and get used",
    intro:
      "We build for iOS and Android with React Native and Flutter when speed matters, and fully native when performance does. Store submission, review responses and phased rollouts are part of the job, not an afterthought you deal with alone.",
    icon: "phone",
    timeline: "20–30 days",
    startingAt: "Project-based",
    outcomes: [
      "One codebase shipping to both app stores",
      "Push notifications, deep links and offline support",
      "App Store and Play Store approval handled by us",
      "Crash reporting and analytics from the first release",
    ],
    deliverables: [
      "Product definition and user flows",
      "Full UI design for both platforms",
      "Cross-platform or native implementation",
      "Back-end API and admin panel",
      "Store listings, screenshots and submission",
      "Post-launch monitoring and first-month patches",
    ],
    process: [
      {
        title: "Define",
        body: "We cut the feature list down to what earns a v1 release, and park the rest in a roadmap.",
      },
      {
        title: "Design",
        body: "Platform-correct UI — iOS and Android conventions respected, not one design forced onto both.",
      },
      {
        title: "Build",
        body: "Fortnightly TestFlight and internal-track builds so you're testing on a real device throughout.",
      },
      {
        title: "Ship",
        body: "Store submission, review responses, staged rollout and a monitored first month.",
      },
    ],
    stack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    faqs: [
      {
        q: "Native or cross-platform — which do we need?",
        a: "Cross-platform for most business apps: one codebase, roughly 40% less cost. Native when you need heavy graphics, complex camera work or deep OS integration. We'll tell you honestly which case you're in.",
      },
      {
        q: "Who owns the developer accounts?",
        a: "You do. Apps are published under your organisation's Apple and Google accounts, so the listing is always yours.",
      },
      {
        q: "What about app store rejections?",
        a: "We handle the review correspondence and resubmission at no extra cost. It's part of shipping.",
      },
    ],
  },
  {
    slug: "custom-software",
    category: "development",
    name: "Custom Software Development",
    short:
      "Bespoke systems for operations that off-the-shelf software cannot handle.",
    headline: "When the off-the-shelf tool almost fits — and almost is expensive",
    intro:
      "Every growing business hits the point where the spreadsheet, the plugin stack or the generic SaaS starts costing more in workarounds than it saves in licence fees. We build the system that fits your operation exactly: ERPs, inventory and logistics platforms, booking engines, billing systems and internal tools.",
    icon: "cog",
    timeline: "15 days",
    startingAt: "Project or dedicated team",
    outcomes: [
      "Manual workarounds eliminated from daily operations",
      "One source of truth instead of five disconnected tools",
      "Software that matches your process, not the other way around",
      "Predictable running costs with no per-seat licence creep",
    ],
    deliverables: [
      "Operational discovery — we sit with the people doing the work",
      "System architecture and migration plan",
      "Phased build, department by department",
      "Data migration from your existing tools",
      "Admin training and written operating documentation",
      "Ongoing support agreement",
    ],
    process: [
      {
        title: "Observe",
        body: "We map how work actually flows through your business today, including the undocumented steps everyone relies on.",
      },
      {
        title: "Blueprint",
        body: "An architecture and phased rollout plan, so you're never asked to switch everything on one Monday morning.",
      },
      {
        title: "Build in phases",
        body: "The highest-pain module ships first and earns its keep while we build the next.",
      },
      {
        title: "Migrate",
        body: "Data migration, parallel running, training, then decommissioning of the old system.",
      },
    ],
    stack: ["Node.js", ".NET", "Python", "PostgreSQL", "Docker", "Azure", "AWS"],
    faqs: [
      {
        q: "Isn't custom software more expensive than SaaS?",
        a: "Upfront, usually. Over three to five years, rarely — especially past 50 seats or when the SaaS forces process changes that cost staff hours every day. We'll model both before you commit.",
      },
      {
        q: "Can it integrate with the systems we keep?",
        a: "Yes. Most builds sit alongside an existing accounting, CRM or ERP system and integrate rather than replace.",
      },
      {
        q: "What happens if we stop working with you?",
        a: "You hold the source code, the infrastructure accounts and the documentation. Any competent engineering team can take over.",
      },
    ],
  },
  {
    slug: "integrations",
    category: "development",
    name: "API & Systems Integration",
    short:
      "Connecting the tools you already pay for so data moves without a human copying it.",
    headline: "Stop paying people to move data between tabs",
    intro:
      "Your CRM doesn't talk to your accounting system. Your storefront doesn't talk to your warehouse. Somebody exports a CSV every Friday. We build the integrations and middleware that close those gaps permanently, with retries, error alerting and logs you can actually read.",
    icon: "link",
    timeline: "2–8 weeks",
    startingAt: "Per integration",
    outcomes: [
      "Manual data entry between systems eliminated",
      "Real-time sync with automatic retry on failure",
      "Alerting when something breaks — before your customer notices",
      "A documented integration layer, not a fragile private script",
    ],
    deliverables: [
      "Integration audit of your current tool stack",
      "Field mapping and sync-rule specification",
      "Middleware or direct API implementation",
      "Error handling, retry logic and monitoring dashboard",
      "Runbook for your operations team",
    ],
    process: [
      {
        title: "Audit",
        body: "We list every system, every manual handoff and every CSV someone emails on a schedule.",
      },
      {
        title: "Map",
        body: "Field-by-field mapping and conflict rules agreed in writing before build.",
      },
      {
        title: "Connect",
        body: "Implementation against real APIs, with a sandbox environment for testing.",
      },
      {
        title: "Monitor",
        body: "Dashboards and alerts so failures surface immediately instead of silently.",
      },
    ],
    stack: ["REST", "GraphQL", "Webhooks", "n8n", "Zapier", "Make", "Kafka"],
    faqs: [
      {
        q: "What if a tool has no public API?",
        a: "There's almost always a path — a partner API, a database connector, a file-drop workflow or headless automation. We'll tell you which one applies and what it costs to maintain.",
      },
      {
        q: "Do you maintain integrations after launch?",
        a: "Recommended. Third-party APIs change without warning; a small monthly retainer covers monitoring and fixes.",
      },
      {
        q: "How long does a typical integration take?",
        a: "A straightforward two-system sync is usually two to three weeks. Complex multi-system middleware runs six to eight.",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    category: "ai-solutions",
    name: "AI Chatbots",
    short:
      "Support and sales chatbots trained on your own content, deployed on web, WhatsApp and social.",
    headline: "A chatbot that knows your business — not a generic FAQ widget",
    intro:
      "We train conversational AI on your documentation, product catalogue, pricing and past support tickets, then deploy it where your customers already are: your website, WhatsApp, Instagram, Messenger and your help desk. It answers accurately, escalates honestly when it doesn't know, and hands the human agent full context.",
    icon: "chat",
    timeline: "3–6 weeks",
    startingAt: "Setup + monthly",
    outcomes: [
      "First-line support volume reduced significantly",
      "Instant responses in every timezone you sell into",
      "Qualified leads captured outside business hours",
      "Honest escalation instead of confident wrong answers",
    ],
    deliverables: [
      "Knowledge base ingestion and cleaning",
      "Retrieval-augmented bot configuration and tuning",
      "Multi-channel deployment (web, WhatsApp, social, help desk)",
      "Human handover routing with full conversation context",
      "Multilingual support where required",
      "Monthly accuracy review and retraining",
    ],
    process: [
      {
        title: "Ingest",
        body: "We gather your docs, site content, product data and historical tickets, then clean and structure them for retrieval.",
      },
      {
        title: "Tune",
        body: "Tone, guardrails and escalation rules set to your standards, then tested against a hundred real questions.",
      },
      {
        title: "Deploy",
        body: "Live on your chosen channels with a human handover path that never leaves a customer stranded.",
      },
      {
        title: "Improve",
        body: "Monthly review of unanswered and escalated conversations, feeding straight back into the knowledge base.",
      },
    ],
    stack: ["OpenAI", "Anthropic", "Vector search", "WhatsApp Business API", "Twilio"],
    faqs: [
      {
        q: "Will it invent answers?",
        a: "It answers from your content and is instructed to escalate when confidence is low. We test that behaviour explicitly before launch and audit it monthly.",
      },
      {
        q: "Which languages can it handle?",
        a: "Any language your customers use. Multilingual deployments are common for clients selling across regions.",
      },
      {
        q: "Where does our data go?",
        a: "Into infrastructure you control, under a data processing agreement. We can deploy in a specific region if you have residency requirements.",
      },
    ],
  },
  {
    slug: "ai-calling-agents",
    category: "ai-solutions",
    name: "AI Calling Agents",
    short:
      "Voice agents that answer inbound calls, qualify leads and book meetings automatically.",
    headline: "Every call answered in one ring, in any timezone",
    intro:
      "Most inbound leads go to whoever replies first. An AI voice agent picks up immediately, speaks naturally, qualifies against your criteria, books straight into your calendar and writes the summary into your CRM. Outbound agents handle follow-up, reactivation and appointment reminders at a volume no human team can match.",
    icon: "phone-call",
    timeline: "4–8 weeks",
    startingAt: "Setup + per minute",
    outcomes: [
      "Zero missed inbound calls, including nights and weekends",
      "Leads qualified and booked without human involvement",
      "Every call transcribed, summarised and logged in your CRM",
      "Follow-up campaigns that actually get made",
    ],
    deliverables: [
      "Call flow and qualification script design",
      "Voice selection and conversational tuning",
      "Telephony provisioning and number routing",
      "Calendar and CRM integration",
      "Live human transfer path for complex calls",
      "Call recordings, transcripts and performance dashboard",
    ],
    process: [
      {
        title: "Script",
        body: "We design the call flow around what your best salesperson actually asks, including objection handling.",
      },
      {
        title: "Voice",
        body: "Voice, pacing and interruption handling tuned until it sounds like a person, not a phone tree.",
      },
      {
        title: "Integrate",
        body: "Connected to your telephony, calendar and CRM so a booked call appears where your team already works.",
      },
      {
        title: "Optimise",
        body: "We review real call recordings weekly for the first month and tighten the script from evidence.",
      },
    ],
    stack: ["Realtime voice models", "Twilio", "ElevenLabs", "Cal.com", "HubSpot"],
    faqs: [
      {
        q: "Do callers know it's AI?",
        a: "We disclose it, because regulations in most markets require it and because trust converts better. It doesn't hurt booking rates in practice.",
      },
      {
        q: "What if the agent can't handle a call?",
        a: "It transfers to a live person with context, or takes a message and books a callback. There's always a human path.",
      },
      {
        q: "Can we hear it before committing?",
        a: "Yes. We'll set up a demo number you can call yourself, configured for your industry.",
      },
    ],
  },
  {
    slug: "automation",
    category: "ai-solutions",
    name: "Workflow Automation",
    short:
      "AI-assisted automations that remove repetitive work from your team's day.",
    headline: "The work nobody should be doing by hand any more",
    intro:
      "Document processing, invoice extraction, report generation, lead routing, content repurposing, onboarding sequences — the tasks that consume hours and produce no judgement. We identify them, automate them and give you the dashboard that proves the hours came back.",
    icon: "bolt",
    timeline: "2–6 weeks per workflow",
    startingAt: "Per workflow",
    outcomes: [
      "Repetitive tasks removed from skilled people's workload",
      "Faster turnaround with fewer human errors",
      "Documented, monitored automations — not undocumented scripts",
      "Measured hours saved per month",
    ],
    deliverables: [
      "Process audit and automation opportunity ranking",
      "Workflow design with human approval checkpoints",
      "Implementation and integration with your tools",
      "Exception handling and alerting",
      "Team training and documentation",
    ],
    process: [
      {
        title: "Audit",
        body: "We shadow the process and rank candidates by hours saved against build effort.",
      },
      {
        title: "Design",
        body: "Automations get human approval gates wherever a wrong output would be expensive.",
      },
      {
        title: "Build",
        body: "Implemented against your live tools, tested on real historical data.",
      },
      {
        title: "Measure",
        body: "A dashboard tracking runs, exceptions and hours returned to the team.",
      },
    ],
    stack: ["Python", "n8n", "Make", "OpenAI", "Document AI", "Google Workspace"],
    faqs: [
      {
        q: "Where should we start?",
        a: "With the highest-volume, lowest-judgement task in your operation. The audit is designed to find it in about a week.",
      },
      {
        q: "Will this replace staff?",
        a: "In most of our projects it redeploys them. The clients who see the biggest return move people from data entry to customer-facing work.",
      },
      {
        q: "What happens when something goes wrong?",
        a: "Exceptions route to a human queue with the full context and an alert. Nothing fails silently.",
      },
    ],
  },
  {
    slug: "social-media-management",
    category: "growth-marketing",
    name: "Social Media Management",
    short:
      "Full-service management of your brand's social presence across every platform.",
    headline: "A social team that shows up every single day",
    intro:
      "Strategy, calendar, creative, copy, scheduling, community management and reporting — handled end to end by a team that knows your brand. You approve the month's calendar, we run it. No missed days, no last-minute scrambling for something to post.",
    icon: "share",
    timeline: "Monthly retainer",
    startingAt: "Monthly",
    outcomes: [
      "Consistent daily publishing across every active platform",
      "Comments and DMs answered within hours, not days",
      "Creative that fits each platform instead of one post reposted five times",
      "Monthly reporting tied to reach, engagement and inbound enquiries",
    ],
    deliverables: [
      "Channel audit and 90-day social strategy",
      "Monthly content calendar for your approval",
      "Original graphics, carousels, reels and copy",
      "Daily scheduling and publishing",
      "Community management and inbox monitoring",
      "Monthly performance report with next-month recommendations",
    ],
    process: [
      {
        title: "Audit & strategy",
        body: "Where you stand today, where your audience actually is, and what your competitors are getting away with.",
      },
      {
        title: "Calendar",
        body: "A month of content planned and shared for approval before the month begins.",
      },
      {
        title: "Produce & publish",
        body: "Our creative team produces, our community team publishes and responds daily.",
      },
      {
        title: "Report & adjust",
        body: "Monthly report with what worked, what didn't and what we're changing.",
      },
    ],
    stack: ["Instagram", "LinkedIn", "TikTok", "YouTube", "X", "Facebook", "Pinterest"],
    faqs: [
      {
        q: "How many posts per month?",
        a: "Packages typically run from 12 to 60 pieces a month depending on channels and format mix. We'll size it to your goals in the first call.",
      },
      {
        q: "Do you handle paid social too?",
        a: "Yes — organic and paid work far better together. Paid management sits under Marketing & Lead Generation.",
      },
      {
        q: "Who owns the accounts?",
        a: "You do, always. We work inside your accounts with delegated access and hand it back cleanly whenever you ask.",
      },
    ],
  },
  {
    slug: "dedicated-social-media-manager",
    category: "growth-marketing",
    name: "Dedicated Social Media Manager",
    short:
      "One named specialist working on your brand alone — an in-house hire without the overhead.",
    headline: "One person. Your brand. Full time.",
    intro:
      "Some brands need a team. Others need one person who lives inside the business — knows the founder's voice, sits in your Slack, joins your Monday call and owns the channel personally. That's this. A dedicated manager assigned to you alone, backed quietly by our design, video and paid-media specialists when a project needs them.",
    icon: "user",
    timeline: "Monthly retainer",
    startingAt: "Monthly",
    outcomes: [
      "A single accountable owner for your social presence",
      "Someone who learns your voice instead of guessing at it",
      "Same-day turnaround on reactive and timely content",
      "Agency depth behind them without agency distance",
    ],
    deliverables: [
      "A named manager, matched to your industry",
      "Direct access via Slack, Teams or WhatsApp",
      "Weekly planning and monthly strategy sessions",
      "End-to-end content production and publishing",
      "Community management and inbox ownership",
      "Access to our design, video and paid specialists as needed",
    ],
    process: [
      {
        title: "Match",
        body: "We shortlist managers with relevant industry experience and you interview them. You choose.",
      },
      {
        title: "Onboard",
        body: "Two weeks embedded in your business — brand, product, tone, customers, competitors.",
      },
      {
        title: "Own",
        body: "They run the channel day to day and report directly to you, not through an account layer.",
      },
      {
        title: "Scale",
        body: "When a campaign needs a video team or a paid specialist, we bring them in without you hiring anyone.",
      },
    ],
    stack: ["Slack", "Notion", "Figma", "Later", "Meta Business Suite"],
    faqs: [
      {
        q: "Is this really one dedicated person?",
        a: "Yes — assigned to your account and no one else's. You'll know their name, their working hours and how to reach them directly.",
      },
      {
        q: "What if it isn't the right fit?",
        a: "We reassign, at no cost, no questions asked. Fit matters more than continuity in this model.",
      },
      {
        q: "How is this different from hiring in-house?",
        a: "No recruitment, no payroll, no benefits, no gap when they take leave — and a full agency's specialists standing behind them.",
      },
    ],
  },
  {
    slug: "content-creation",
    category: "growth-marketing",
    name: "On-Demand Content Creation",
    short:
      "Video, design, photography and copy produced on request, at the volume you need.",
    headline: "Content on tap, without building a studio",
    intro:
      "Short-form video, product photography, motion graphics, ad creative, blog articles, case studies, email copy, sales decks. Request it, get it back on a fixed turnaround. No per-project negotiation, no chasing three freelancers across two timezones.",
    icon: "camera",
    timeline: "48h–5 days per asset",
    startingAt: "Credit-based or monthly",
    outcomes: [
      "Predictable turnaround instead of freelancer roulette",
      "Consistent brand execution across every asset type",
      "Volume that would take an in-house team months",
      "One invoice, one point of contact, one quality standard",
    ],
    deliverables: [
      "Brand kit and asset templates",
      "Short-form and long-form video editing",
      "Static and motion ad creative",
      "Product and lifestyle photography direction",
      "Long-form written content and case studies",
      "Two rounds of revisions on every asset",
    ],
    process: [
      {
        title: "Brand kit",
        body: "We build the templates and guidelines once, so every later asset is consistent by default.",
      },
      {
        title: "Request",
        body: "You brief through a simple form or your shared board. No meetings needed for routine requests.",
      },
      {
        title: "Produce",
        body: "Fixed turnaround by asset type, tracked publicly so you always know where a request stands.",
      },
      {
        title: "Refine",
        body: "Two revision rounds included on everything, with a feedback trail kept in one place.",
      },
    ],
    stack: ["Adobe Creative Cloud", "After Effects", "Figma", "DaVinci Resolve", "Frame.io"],
    faqs: [
      {
        q: "How does pricing work?",
        a: "Either a monthly credit allowance you spend across asset types, or a flat retainer for a defined output volume. Most clients start with credits.",
      },
      {
        q: "Can you film on location?",
        a: "We coordinate shoots in most major markets through vetted local crews, directed by our team remotely.",
      },
      {
        q: "What's the fastest turnaround?",
        a: "48 hours for social statics and short edits. Larger productions are quoted individually.",
      },
    ],
  },
  {
    slug: "marketing-lead-generation",
    category: "growth-marketing",
    name: "Marketing & Lead Generation",
    short:
      "Paid media, SEO, email and outbound built around one number: qualified pipeline.",
    headline: "Campaigns judged on pipeline, not impressions",
    intro:
      "We run the full acquisition stack — paid search and social, SEO, email marketing, landing pages and outbound — and report on one thing that matters: how many qualified conversations reached your sales team, and what each one cost. Everything else is a diagnostic, not a result.",
    icon: "target",
    timeline: "Monthly retainer",
    startingAt: "Monthly + ad spend",
    outcomes: [
      "A predictable monthly volume of qualified leads",
      "Cost per qualified lead tracked and driven down over time",
      "Landing pages and funnels built and tested by us, not outsourced",
      "Full attribution from first click to closed deal",
    ],
    deliverables: [
      "Acquisition audit and channel strategy",
      "Paid search and paid social campaign management",
      "Technical and content SEO programme",
      "Landing page design, build and A/B testing",
      "Email sequences and marketing automation",
      "CRM setup, lead scoring and attribution reporting",
    ],
    process: [
      {
        title: "Baseline",
        body: "We establish what a qualified lead means to you and what one is currently costing, before touching a campaign.",
      },
      {
        title: "Build",
        body: "Campaigns, landing pages, tracking and CRM wiring set up as one connected system.",
      },
      {
        title: "Test",
        body: "Structured testing on audiences, creative and offers — with enough volume to reach significance.",
      },
      {
        title: "Scale",
        body: "Budget shifts toward what produces pipeline. Monthly review with your sales team, not just your marketing team.",
      },
    ],
    stack: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "HubSpot", "Clay"],
    faqs: [
      {
        q: "What minimum ad budget do you recommend?",
        a: "Enough to reach statistical significance in a reasonable window — usually a few thousand a month per channel. We'll tell you plainly if your budget can't support a channel yet.",
      },
      {
        q: "How quickly do results appear?",
        a: "Paid channels produce data in weeks and stabilise around month three. SEO is a six-to-twelve-month programme. We set that expectation before you sign anything.",
      },
      {
        q: "Do you work on performance-based pricing?",
        a: "Occasionally, once we have three months of baseline data and a clean attribution setup. Not from a cold start.",
      },
    ],
  },
  {
    slug: "pr-brand-communications",
    category: "growth-marketing",
    name: "PR & Brand Communications",
    short:
      "Media relations, founder positioning and the messaging that holds it all together.",
    headline: "Get written about by the publications your buyers read",
    intro:
      "PR earns the credibility advertising has to rent. We build your narrative, place your founders in relevant media, manage announcements properly and prepare you for the day the coverage isn't flattering.",
    icon: "megaphone",
    timeline: "Monthly retainer",
    startingAt: "Monthly",
    outcomes: [
      "Earned coverage in publications your buyers actually read",
      "Founders positioned as credible voices in your category",
      "Announcements that land instead of disappearing",
      "A prepared response before a crisis, not during one",
    ],
    deliverables: [
      "Messaging framework and narrative development",
      "Press kit, boilerplate and executive bios",
      "Journalist and publication targeting",
      "Press releases, pitches and media outreach",
      "Founder thought-leadership and ghostwriting",
      "Crisis communication playbook",
    ],
    process: [
      {
        title: "Narrative",
        body: "We find the angle that makes you newsworthy — most companies lead with the wrong one.",
      },
      {
        title: "Target",
        body: "A researched list of journalists who cover your space, not a bought database blast.",
      },
      {
        title: "Pitch",
        body: "Personalised outreach with follow-up, plus proactive placement around your news cycle.",
      },
      {
        title: "Sustain",
        body: "A steady drumbeat of commentary and thought leadership between announcements.",
      },
    ],
    stack: ["Muck Rack", "Prowly", "LinkedIn", "Substack"],
    faqs: [
      {
        q: "Can you guarantee coverage?",
        a: "No agency honestly can — editorial decisions aren't for sale. We can guarantee the volume and quality of outreach, and we report on every pitch sent.",
      },
      {
        q: "How long before we see placements?",
        a: "First placements typically land in month two or three. PR compounds; the sixth month looks nothing like the first.",
      },
      {
        q: "Do you handle crisis communications?",
        a: "Yes, including retainer clients on standby. The playbook is written before you need it.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function servicesByCategory(categorySlug: string) {
  return services.filter((s) => s.category === categorySlug);
}
