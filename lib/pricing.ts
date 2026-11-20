/**
 * Published packages — approved by the owner 2026-11-20.
 * Every service has three tiers: Basic / Standard / Premium.
 * Standard is the intended main seller and is marked "Most popular".
 * Premium anchors at or near the previous single published price.
 * Do not change a number here without the owner's approval — the blog,
 * llms.txt and PackagesOffers all quote from this same ladder.
 */

export type PricingTier = {
  name: "Basic" | "Standard" | "Premium";
  price: string;
  unit: string;
  includes: string[];
  limits?: string;
  popular?: boolean;
};

export type PricedService = {
  slug: string;
  category: string;
  name: string;
  href: string;
  summary: string;
  tiers: PricingTier[];
  note?: string;
};

export const servicePricing: PricedService[] = [
  {
    slug: "website-development",
    category: "development",
    name: "Website Development",
    href: "/services/development/website-development",
    summary:
      "Custom marketing sites and corporate websites, engineered from scratch for speed and search.",
    tiers: [
      {
        name: "Basic",
        price: "$1,499",
        unit: "one-time",
        includes: [
          "Up to 5 pages",
          "Mobile-first design on CINEM's proven framework",
          "Contact + WhatsApp enquiry buttons and forms",
          "Basic on-page SEO (titles, meta, sitemap)",
          "Google Business Profile + Analytics/Search Console setup",
          "Launch in 2–3 weeks",
        ],
        limits:
          "You supply text and images · 1 revision round · No ecommerce or custom code · Hosting/domain on your account · 30 days launch support",
      },
      {
        name: "Standard",
        price: "$3,999",
        unit: "one-time",
        popular: true,
        includes: [
          "Up to 10 pages, fully custom design",
          "CMS your team can edit",
          "Copy structure and editing included",
          "Blog setup and booking or enquiry flow",
          "Full technical SEO setup (schema, speed optimisation)",
          "Social and WhatsApp integration",
        ],
        limits:
          "2 revision rounds · Ecommerce up to 20 products available as an add-on · 60 days support",
      },
      {
        name: "Premium",
        price: "from $8,000",
        unit: "one-time",
        includes: [
          "Bespoke hand-coded build (e.g. Next.js)",
          "Ecommerce, portals, integrations, multilingual — as scoped",
          "Conversion copywriting included",
          "Performance budget guaranteed in contract",
        ],
        limits: "Scoped per project · 3 revision rounds · 90 days priority support",
      },
    ],
  },
  {
    slug: "web-applications",
    category: "development",
    name: "Web Application Development",
    href: "/services/development/web-applications",
    summary:
      "Dashboards, portals, SaaS products and internal tools built for real usage at scale.",
    tiers: [
      {
        name: "Basic",
        price: "$4,999",
        unit: "one-time",
        includes: [
          "Validation build or internal tool: 1 core workflow",
          "User login with 1 user role",
          "Simple dashboard and admin view",
          "1 standard integration (e.g. Stripe or email)",
          "Delivered in 4–6 weeks",
        ],
        limits:
          "Single workflow only · No payments beyond one standard gateway · No mobile app · 30-day bug-fix window",
      },
      {
        name: "Standard",
        price: "$9,999",
        unit: "one-time",
        popular: true,
        includes: [
          "SaaS MVP with multi-role access",
          "Subscription billing and admin panel",
          "2–3 integrations",
          "Email and notification system",
          "Analytics built in",
          "Prototype first, sprint demos every 2 weeks · 6–10 weeks",
        ],
        limits:
          "One product, one market · AI features and marketplaces are Premium · 60-day bug-fix window",
      },
      {
        name: "Premium",
        price: "from $15,000",
        unit: "one-time",
        includes: [
          "Multi-tenant SaaS, marketplace or AI-feature builds",
          "Complex integrations",
          "Audit trail and compliance-ready architecture",
          "Dedicated team option",
        ],
        limits: "Scoped per project · 90 days priority support",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    category: "development",
    name: "Mobile App Development",
    href: "/services/development/mobile-app-development",
    summary:
      "Native and cross-platform iOS and Android apps, from concept to store approval.",
    tiers: [
      {
        name: "Basic",
        price: "$4,999",
        unit: "one-time",
        includes: [
          "Companion, catalogue or booking-lite app",
          "Cross-platform, up to 8 screens",
          "Content fed from your existing site or CMS",
          "Push notifications",
          "Published under your own store accounts · 4–6 weeks",
        ],
        limits: "No custom backend · No payments · Simple login only",
      },
      {
        name: "Standard",
        price: "$9,999",
        unit: "one-time",
        popular: true,
        includes: [
          "iOS + Android from one codebase",
          "User accounts with custom backend and admin panel",
          "Payments built in",
          "Push and email notifications",
          "1–2 integrations",
          "Store approval handled · 8–12 weeks",
        ],
        limits: "One product scope · Real-time/chat excluded · 60-day bug-fix window",
      },
      {
        name: "Premium",
        price: "from $18,000",
        unit: "one-time",
        includes: [
          "Native or complex cross-platform build",
          "Multiple user roles and real-time features",
          "Offline support and deep device features",
          "Heavy integrations",
        ],
        limits: "Scoped per project · 90 days priority support",
      },
    ],
  },
  {
    slug: "custom-software",
    category: "development",
    name: "Custom Software Development",
    href: "/services/development/custom-software",
    summary:
      "Bespoke systems for operations that off-the-shelf software cannot handle.",
    tiers: [
      {
        name: "Basic",
        price: "$2,999",
        unit: "one-time",
        includes: [
          "Single-purpose internal tool — one process (invoicing, stock, reporting)",
          "One system, up to 5 users",
          "Fixed scope, agreed in writing",
          "Documentation and handover included",
        ],
        limits:
          "No integrations beyond file import/export · No multi-branch · 30 days support",
      },
      {
        name: "Standard",
        price: "$7,999",
        unit: "one-time",
        popular: true,
        includes: [
          "Department system with multi-user roles and permissions",
          "Database design",
          "Reports and dashboards",
          "1–2 integrations",
          "Staff training session",
        ],
        limits: "One department or process area · 60 days support",
      },
      {
        name: "Premium",
        price: "from $15,000",
        unit: "one-time",
        includes: [
          "Company-wide platform across systems",
          "Audit trails",
          "Dedicated team or phased roadmap option",
        ],
        limits: "Scoped per project · Priority support",
      },
    ],
  },
  {
    slug: "integrations",
    category: "development",
    name: "API & Systems Integration",
    href: "/services/development/integrations",
    summary:
      "Connecting the tools you already pay for so data moves without a human copying it.",
    tiers: [
      {
        name: "Basic",
        price: "$499",
        unit: "per integration",
        includes: [
          "One standard connection between two known systems",
          "e.g. website form → CRM, payment gateway hookup, shop → accounting",
          "Tested before handover",
          "Short handover document",
        ],
        limits:
          "Prebuilt/standard connectors only · No custom API development · You provide API access",
      },
      {
        name: "Standard",
        price: "$1,499",
        unit: "per project",
        popular: true,
        includes: [
          "Up to 2 integrations",
          "Custom field mapping",
          "Error handling and retry logic",
          "Failure alerts",
          "30 days of monitoring",
        ],
        limits:
          "Systems must expose an API · Legacy/no-API systems quoted separately",
      },
      {
        name: "Premium",
        price: "from $3,999",
        unit: "per project",
        includes: [
          "Integration layer across 3+ systems",
          "Custom API and webhook development",
          "Sync dashboards",
          "SLA-backed support option",
        ],
        limits: "Scoped per project",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    category: "ai-solutions",
    name: "AI Chatbots",
    href: "/services/ai-solutions/ai-chatbots",
    summary:
      "Support and sales chatbots trained on your own content, deployed on web, WhatsApp and social.",
    tiers: [
      {
        name: "Basic",
        price: "$999",
        unit: "setup + $299/mo",
        includes: [
          "1 channel — your website or WhatsApp",
          "Knowledge base built from your own content (FAQs, prices, policies)",
          "Lead capture to email or CRM sheet",
          "Human handover when it doesn't know",
          "Monthly tuning from real conversations",
        ],
        limits:
          "Fair-use cap 1,000 conversations/mo · Meta message fees on your account · No booking/CRM live integration · English + 1 language",
      },
      {
        name: "Standard",
        price: "$2,499",
        unit: "setup + $599/mo",
        popular: true,
        includes: [
          "Website + WhatsApp + 1 social channel",
          "Booking or CRM integration",
          "Escalation rules configured for your team",
          "Multilingual — up to 3 languages",
          "Monthly tuning and performance report",
        ],
        limits: "Fair-use cap 3,000 conversations/mo · Ecommerce order lookup excluded",
      },
      {
        name: "Premium",
        price: "$4,999",
        unit: "setup + $1,499/mo",
        includes: [
          "All channels, including ecommerce and order lookups",
          "Multiple locations and numbers",
          "Custom integrations",
          "Quarterly strategy review",
          "Priority support",
        ],
        limits:
          "Fair-use cap 10,000 conversations/mo · Beyond that, per-conversation pricing agreed in writing",
      },
    ],
  },
  {
    slug: "ai-calling-agents",
    category: "ai-solutions",
    name: "AI Calling Agents",
    href: "/services/ai-solutions/ai-calling-agents",
    summary:
      "Voice agents that answer inbound calls, qualify leads and book meetings automatically.",
    tiers: [
      {
        name: "Basic",
        price: "$1,499",
        unit: "setup + $399/mo",
        includes: [
          "AI receptionist on 1 number — answers, FAQs, books into your calendar",
          "Call summary and transcript to email or CRM",
          "300 included minutes per month",
        ],
        limits:
          "Inbound only · 1 language/voice · Extra minutes billed at the published per-minute rate · Telephony account in your name",
      },
      {
        name: "Standard",
        price: "$3,499",
        unit: "setup + $899/mo",
        popular: true,
        includes: [
          "Inbound plus outbound reminders and confirmations",
          "CRM integration and custom voice",
          "DNC and compliance configuration",
          "1,000 included minutes per month",
          "Monthly call-quality review",
        ],
        limits: "Outbound campaigns to cold lists excluded · 2 languages",
      },
      {
        name: "Premium",
        price: "$7,999",
        unit: "setup + $2,499/mo",
        includes: [
          "Outbound campaign capability",
          "Multi-location and multi-number",
          "Custom integrations",
          "Dedicated monitoring",
          "3,000 included minutes per month",
        ],
        limits: "Minutes above the bundle at an agreed rate · Scoped compliance review included",
      },
    ],
  },
  {
    slug: "automation",
    category: "ai-solutions",
    name: "Workflow Automation",
    href: "/services/ai-solutions/automation",
    summary:
      "AI-assisted automations that remove repetitive work from your team's day.",
    tiers: [
      {
        name: "Basic",
        price: "$599",
        unit: "per workflow",
        includes: [
          "1 production workflow (e.g. form → CRM → team notification)",
          "Built in your own Zapier, Make or n8n account",
          "Video runbook so your team can follow it",
        ],
        limits:
          "Standard apps only · No custom code · Tool subscriptions on your account · 1 revision pass within 7 days",
      },
      {
        name: "Standard",
        price: "$1,499",
        unit: "per project",
        popular: true,
        includes: [
          "Up to 3 workflows",
          "Error alerts, so failures don't break silently",
          "Written documentation",
          "Team training call",
        ],
        limits:
          "AI steps limited to standard models · Data migration excluded · 30-day fix window",
      },
      {
        name: "Premium",
        price: "from $3,999",
        unit: "per project",
        includes: [
          "Automation system: 5+ connected workflows",
          "AI steps — lead scoring, drafting, classification",
          "Custom code where the no-code tools run out",
          "Optional monitoring retainer at $249/mo",
        ],
        limits: "Scoped per project",
      },
    ],
  },
  {
    slug: "social-media-management",
    category: "growth-marketing",
    name: "Social Media Management",
    href: "/services/growth-marketing/social-media-management",
    summary:
      "Full-service management of your brand's social presence across every platform.",
    tiers: [
      {
        name: "Basic",
        price: "$499",
        unit: "/mo",
        includes: [
          "2 platforms",
          "12 posts per month — design, captions and scheduling",
          "Hashtag and SEO basics",
          "Monthly performance report",
        ],
        limits:
          "No video · Comments and DMs answered by you · You supply brand assets and photos",
      },
      {
        name: "Standard",
        price: "$999",
        unit: "/mo",
        popular: true,
        includes: [
          "3 platforms",
          "20 posts per month, including 4 short videos/Reels",
          "Weekday community management",
          "Monthly content calendar and report",
        ],
        limits: "Ad management excluded · Shoots on your premises excluded",
      },
      {
        name: "Premium",
        price: "$1,999",
        unit: "/mo",
        includes: [
          "4 platforms",
          "30 posts per month, including 8 videos",
          "Daily community management",
          "Meta Ads management for 1 campaign set included (ad spend extra)",
          "Quarterly strategy session",
        ],
        limits: "Ad spend always separate · Influencer outreach quoted separately",
      },
    ],
  },
  {
    slug: "dedicated-social-media-manager",
    category: "growth-marketing",
    name: "Dedicated Social Media Manager",
    href: "/services/growth-marketing/dedicated-social-media-manager",
    summary:
      "One named specialist working on your brand — an in-house hire without the overhead.",
    tiers: [
      {
        name: "Basic",
        price: "$899",
        unit: "/mo",
        includes: [
          "Named part-time manager (20 hrs/week)",
          "Content calendar",
          "Posting and reply handling on 2 platforms",
          "Weekly summary",
        ],
        limits:
          "Shared with at most 2 other clients — stated honestly · No video production",
      },
      {
        name: "Standard",
        price: "$1,499",
        unit: "/mo",
        popular: true,
        includes: [
          "Named full-time dedicated manager",
          "Daily posting and engagement on up to 3 platforms",
          "Monthly report and strategy call",
        ],
        limits:
          "Design/video support from the CINEM team at Content Creation rates (included in Premium)",
      },
      {
        name: "Premium",
        price: "$2,499",
        unit: "/mo",
        includes: [
          "Full-time manager plus designer/video-editor support hours",
          "Ads coordination",
          "Monthly strategy led by a CINEM lead",
          "Still roughly half the cost of one US in-house hire",
        ],
      },
    ],
  },
  {
    slug: "content-creation",
    category: "growth-marketing",
    name: "On-Demand Content Creation",
    href: "/services/growth-marketing/content-creation",
    summary:
      "Video, design, photography and copy produced on request, at the volume you need. 1 credit = 1 static graphic or carousel · 1 short video = 3 credits · 1 blog/article = 2 credits.",
    tiers: [
      {
        name: "Basic",
        price: "$399",
        unit: "/mo · 10 credits",
        includes: [
          "Graphics, carousels and captions from your brand kit",
          "5-working-day turnaround",
        ],
        limits: "Video costs 3 credits within the allowance · 1 revision per piece",
      },
      {
        name: "Standard",
        price: "$799",
        unit: "/mo · 25 credits",
        popular: true,
        includes: [
          "Everything in Basic, plus short videos and Reels",
          "Brand template system built for you",
          "3-day turnaround",
        ],
        limits: "Credits expire monthly · Shoots excluded",
      },
      {
        name: "Premium",
        price: "$1,599",
        unit: "/mo · 60 credits",
        includes: [
          "Priority 48-hour turnaround",
          "Monthly content strategy",
          "Formats extended to blogs, email graphics and ad creative",
        ],
        limits: "Dedicated manager not included",
      },
    ],
  },
  {
    slug: "marketing-lead-generation",
    category: "growth-marketing",
    name: "Marketing & Lead Generation",
    href: "/services/growth-marketing/marketing-lead-generation",
    summary:
      "Paid media, SEO, email and outbound built around one number: qualified pipeline. Ad spend is always extra and paid by you directly to the platform.",
    tiers: [
      {
        name: "Basic",
        price: "$599",
        unit: "/mo + ad spend",
        includes: [
          "Meta Ads management for ad spend up to $2,500/mo",
          "1 campaign structure (prospecting + retargeting)",
          "Landing-page review with a fix list",
          "Monthly report",
        ],
        limits:
          "Ad spend paid by you directly to Meta (recommended minimum $800/mo) · Creative from your assets · Landing page rebuilds quoted separately",
      },
      {
        name: "Standard",
        price: "$1,199",
        unit: "/mo + ad spend",
        popular: true,
        includes: [
          "Ad spend up to $10,000/mo",
          "Meta plus one more channel (Google or TikTok)",
          "2 creative refreshes per month from our content team",
          "Pixel/CRM lead-tracking setup",
          "Bi-weekly reporting",
        ],
        limits: "CRO limited to recommendations plus 1 test page per month",
      },
      {
        name: "Premium",
        price: "$2,499",
        unit: "/mo or 15% of spend, whichever is greater",
        includes: [
          "Ad spend $10,000+/mo",
          "Full-funnel campaign structure",
          "2 ad videos per month, produced for you",
          "Weekly reporting and strategy call",
          "Landing page testing programme",
        ],
      },
    ],
  },
  {
    slug: "pr-brand-communications",
    category: "growth-marketing",
    name: "PR & Brand Communications",
    href: "/services/growth-marketing/pr-brand-communications",
    summary:
      "Media relations, founder positioning and the messaging that holds it all together.",
    tiers: [
      {
        name: "Basic",
        price: "$999",
        unit: "/mo",
        includes: [
          "1 press release written and distributed to online outlets per month",
          "Founder profile positioning (LinkedIn + bio assets)",
          "Media list for one niche",
          "Monthly coverage report",
        ],
        limits:
          "No guaranteed placements — stated in writing · No journalist relationship pitching (that's Standard)",
      },
      {
        name: "Standard",
        price: "$1,999",
        unit: "/mo",
        popular: true,
        includes: [
          "Everything in Basic",
          "Proactive pitching to niche publications and podcasts",
          "1 thought-leadership article per month",
          "Personal-branding content plan for the founder",
        ],
        limits:
          "Placement depends on story quality — reported transparently · 3-month minimum",
      },
      {
        name: "Premium",
        price: "$4,999",
        unit: "/mo",
        includes: [
          "Multi-market pitching",
          "Launch campaign management",
          "Speaker and award submissions",
          "Crisis-support line",
          "Quarterly brand strategy",
        ],
        limits: "Project launch campaigns also available from $4,999 one-time",
      },
    ],
  },
];

export const carePricing: PricedService = {
  slug: "care",
  category: "care",
  name: "CINEM Care — ongoing partnership",
  href: "/contact?interest=care",
  summary:
    "Retainer plans that keep the products we build healthy — from uptime and fixes to features, content and AI monitoring. Existing Care clients keep their current plan until a migration is agreed; nobody is silently repriced.",
  tiers: [
    {
      name: "Basic",
      price: "$499",
      unit: "/mo",
      includes: [
        "Uptime monitoring",
        "Backups and security updates",
        "2h of bug fixes per month",
        "Monthly report",
      ],
    },
    {
      name: "Standard",
      price: "$1,499",
      unit: "/mo",
      popular: true,
      includes: [
        "Everything in Basic",
        "8h of small features or content changes — or chatbot tuning",
        "Quarterly performance review",
      ],
    },
    {
      name: "Premium",
      price: "$3,999",
      unit: "/mo",
      includes: [
        "Everything in Standard",
        "16h of feature time per month",
        "Priority SLA",
        "AI agent monitoring",
        "Weekly sync call",
      ],
    },
  ],
  note: "Need more than Premium? Scale — custom, from $7,000/mo — covers multi-product or dedicated-team care and is available on request.",
};

export function pricingByCategory(categorySlug: string) {
  return servicePricing.filter((s) => s.category === categorySlug);
}
