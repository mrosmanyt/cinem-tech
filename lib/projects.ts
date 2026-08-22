export type LiveProject = {
  name: string;
  url: string;
  domain: string;
  category: string;
  description: string;
  image: string;
  featured?: boolean;
};

export const liveProjects: LiveProject[] = [
  {
    name: "MICKEY AI",
    url: "https://mickeyai.site/",
    domain: "mickeyai.site",
    category: "AI product",
    description:
      "A cinematic product and commerce experience for a multi-agent personal cyber assistant.",
    image: "/images/projects/mickeyai.webp",
    featured: true,
  },
  {
    name: "J.A.R.V.I.S",
    url: "https://jarvisai.store/",
    domain: "jarvisai.store",
    category: "AI automation",
    description:
      "A conversion-led launch site for a private personal AI assistant and automation platform.",
    image: "/images/projects/jarvisai.webp",
    featured: true,
  },
  {
    name: "LeadsMaker",
    url: "https://leadsmaker.store/",
    domain: "leadsmaker.store",
    category: "SaaS platform",
    description:
      "A clear, product-first SaaS website for an AI selling machine that turns short inputs into campaigns.",
    image: "/images/projects/leadsmaker.webp",
    featured: true,
  },
  {
    name: "Mental Health Aymen Foundation",
    url: "https://mentalhealthaymenfoundation.site/",
    domain: "mentalhealthaymenfoundation.site",
    category: "Healthcare",
    description:
      "An accessible mental-health platform connecting visitors with services, specialists and educational resources.",
    image: "/images/projects/aymen-foundation.webp",
  },
  {
    name: "NextGen Skills",
    url: "https://nextgenskills.courses/",
    domain: "nextgenskills.courses",
    category: "Education",
    description:
      "A polished learning platform designed to present career-focused courses and drive applications.",
    image: "/images/projects/nextgen-skills.webp",
  },
  {
    name: "Malik Data Centre — Reseller Suite",
    url: "https://malikdatacentre.online/",
    domain: "malikdatacentre.online",
    category: "Operations platform",
    description:
      "A secure reseller management suite for onboarding, approvals, sales and account operations.",
    image: "/images/projects/malik-data-centre-online.webp",
  },
  {
    name: "Malik Data Centre",
    url: "https://www.malikdatacentre.store/",
    domain: "malikdatacentre.store",
    category: "E-commerce",
    description:
      "A high-conversion storefront for premium AI tools, software subscriptions and assisted fulfilment.",
    image: "/images/projects/malik-data-centre-store.webp",
    featured: true,
  },
  {
    name: "Royal Taste",
    url: "https://royaltaste.store/",
    domain: "royaltaste.store",
    category: "Hospitality",
    description:
      "A premium restaurant experience with menu discovery, reservations and direct online ordering.",
    image: "/images/projects/royal-taste.webp",
    featured: true,
  },
  {
    name: "Dr. Aymen",
    url: "https://draymen.online/",
    domain: "draymen.online",
    category: "Digital health",
    description:
      "A calm, trust-focused digital care platform for therapy discovery and appointment booking.",
    image: "/images/projects/dr-aymen.webp",
  },
  {
    name: "CinemAI",
    url: "https://cinem.site/",
    domain: "cinem.site",
    category: "Creator SaaS",
    description:
      "A product-led site for an AI workspace that helps creators plan and produce faceless video content.",
    image: "/images/projects/cinem-site.webp",
    featured: true,
  },
];
