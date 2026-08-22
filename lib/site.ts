export const site = {
  name: "CINEM",
  legalName: "CINEM",
  domain: "cinem.tech",
  url: "https://cinem.tech",
  tagline: "Build. Automate. Grow.",
  description:
    "CINEM is a full-service technology and growth partner. We build websites, web apps, mobile apps and custom software, deploy AI chatbots and calling agents, and run social media, content and lead generation for brands worldwide.",
  shortDescription:
    "Engineering, AI and growth under one roof — a focused 25-person team delivering digital products for clients worldwide.",
  founded: 2021,
  yearsActive: 5,
  teamSize: 25,
  email: "hello@cinem.tech",
  salesEmail: "sales@cinem.tech",
  careersEmail: "careers@cinem.tech",
  phone: "+971 55 527 5368",
  whatsapp: "+971555275368",
  address: {
    line1: "Add your street address",
    city: "Add city",
    country: "Add country",
  },
  social: {},
} as const;

export const stats = [
  { value: "25", label: "People on the team" },
  { value: "5", suffix: " yrs", label: "Building for clients" },
  { value: "39", suffix: "+", label: "Projects delivered" },
  { value: "Global", label: "Remote delivery" },
] as const;

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
