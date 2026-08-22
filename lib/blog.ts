/**
 * Blog posts. These are real, publishable articles written for CINEM's audience.
 * Add new entries here, or swap this file for a CMS query when you connect one.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  author: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "one-website-or-many",
    title: "One website or several? A decision framework for multi-service agencies",
    excerpt:
      "Splitting each service onto its own domain feels like focus. Usually it's six half-maintained websites and six SEO efforts starting from zero.",
    date: "2026-08-12",
    readingTime: "6 min",
    category: "Strategy",
    author: "CINEM Team",
    body: [
      "Every multi-service company eventually asks the same question: should each service line get its own website, or should everything live under one roof? The instinct to split is understandable. A dedicated domain feels focused. It feels like it will rank better. It feels easier to sell.",
      "In practice, splitting early is one of the most expensive mistakes a growing company can make — and it's expensive in a way that doesn't show up for about nine months.",
      "## What you lose when you split",
      "Search authority is earned per domain. Five years of accumulated trust, backlinks and brand searches attach to one domain name. Split into six and you don't divide that authority — you abandon most of it and start five new sites at zero. Every one of them needs its own content programme, its own link building and its own patience.",
      "Cross-selling breaks silently. A client who arrives for a website build is the single warmest possible lead for social media management. On one site, they see it in the navigation. Across six sites, that path doesn't exist unless you build it deliberately, and almost nobody does.",
      "Maintenance compounds. Six sites means six dependency stacks, six SSL renewals, six analytics setups, six content calendars. Within a year, three of them are visibly stale. A prospect who finds the stale one judges your whole company by it.",
      "## What actually solves the problem",
      "The instinct behind splitting is usually correct — you want each service to have depth, its own keywords and its own conversion path. You just don't need separate domains to get that.",
      "Build one domain with genuinely substantial service pages. Not a paragraph and a stock icon: a full page per service with the process, the deliverables, the pricing model, real case studies and an FAQ built from what your sales team gets asked. A page like that ranks. It converts. And it inherits every bit of authority your domain already has.",
      "Group services into three or four categories so the navigation stays readable. Give each category a hub page. Give each individual service its own child page. That structure scales to twenty services without the menu becoming unusable.",
      "## When a separate site genuinely makes sense",
      "There are real exceptions. Split when a service line has its own brand identity, its own distinct audience and its own dedicated marketing budget — most commonly when you productise something into standalone software. A SaaS product with its own pricing page, its own signup flow and its own competitors deserves its own domain.",
      "Split when the buyers genuinely do not overlap. If one service sells to enterprise procurement teams and another sells to individual consumers, a shared site serves neither well.",
      "Everything short of that is better served by a landing page on your main domain. Campaign landing pages, region-specific pages and offer pages can all live at yourdomain.com/lp/whatever and still feed the same domain authority.",
      "## The practical test",
      "Ask one question: if this service line disappeared tomorrow, would the brand around it still mean anything on its own? If yes, it's a separate business and deserves a separate site. If no, it's a service — and services belong on the service page of the company that provides them.",
    ],
  },
  {
    slug: "ai-chatbot-vs-calling-agent",
    title: "Chatbot or calling agent? Choosing the right AI front door",
    excerpt:
      "They solve overlapping problems in very different ways. The right choice depends on how your buyers behave, not on which is newer.",
    date: "2026-07-28",
    readingTime: "5 min",
    category: "AI",
    author: "CINEM Team",
    body: [
      "Businesses deploying AI for the first time usually ask for a chatbot, because that's the familiar shape. Often a voice agent would serve them better. Sometimes the answer is both, in a specific order. Here's how we work it out.",
      "## Start with how the enquiry arrives",
      "If your inbound volume is dominated by form fills, live chat and social DMs, a chatbot meets people where they already are. If your phone rings and voicemail is where leads go to die, a calling agent addresses the actual leak.",
      "This sounds obvious, and it's still the step most often skipped. Pull ninety days of enquiry data before choosing anything.",
      "## Consider the complexity of a typical question",
      "Chatbots excel at questions with a documented answer — shipping policy, product specifications, pricing tiers, order status. They retrieve from your knowledge base and respond in seconds, in any language, at any volume.",
      "Voice agents excel at qualification. A conversation where you need to ask five questions, adapt based on the answers, handle an objection and book a meeting is a voice conversation. Compressing that into chat loses people halfway through.",
      "## Consider the cost of a slow response",
      "In high-intent, high-value categories — professional services, home improvement, B2B software, healthcare — the business that responds first usually wins, and the gap is measured in minutes. If your category works that way, voice is where the return is.",
      "In lower-value, higher-volume categories, response speed matters less than availability across timezones and languages. That's chatbot territory.",
      "## The honest limitations of both",
      "Neither should pretend to be human. Disclosure is legally required in most markets and, in our experience, doesn't hurt performance. People mind being deceived far more than they mind talking to a machine.",
      "Neither should guess. The single most damaging failure mode is a confident wrong answer. Both should be configured to escalate when confidence is low, and both need a human path that always works.",
      "Neither is finished at launch. The first month of real conversations teaches you more than any amount of pre-launch testing. Budget for that review cycle, or you've bought a demo rather than a system.",
      "## The order we usually recommend",
      "For most businesses: chatbot first, because it's faster to deploy, cheaper to run and immediately reduces support load. Then a voice agent on inbound sales once the chatbot's transcripts have shown you exactly what your buyers ask and how they phrase it.",
      "That sequence has a hidden benefit. The knowledge base you build for the chatbot becomes the foundation the voice agent works from. Doing it the other way round means building it twice.",
    ],
  },
  {
    slug: "what-makes-agency-website-convert",
    title: "Why most agency websites don't convert — and what fixes them",
    excerpt:
      "The problem is almost never the design. It's that the site describes what the agency does instead of proving they've done it.",
    date: "2026-07-09",
    readingTime: "5 min",
    category: "Growth",
    author: "CINEM Team",
    body: [
      "Agency websites tend to look good and perform badly. Beautiful typography, considered whitespace, a hero line about partnership and transformation — and an enquiry rate that doesn't justify the build.",
      "The gap is almost never visual. It's evidential.",
      "## Buyers arrive already assuming you can do the work",
      "Nobody reaches an agency site wondering whether agencies can build websites. They arrive wondering whether *you* can build *theirs*, on time, at a price they can defend internally. Your services list answers a question they didn't ask.",
      "What they're actually scanning for: have you done this before, for someone like me, and what happened?",
      "## Case studies are the site",
      "A proper case study has four parts: the situation before, what you did, what changed, and a number you can evidence. Most agency case studies have one — a screenshot and an adjective.",
      "Write them long. Name the constraints. Include the part that was hard. A case study that admits a difficulty and explains how it was handled is more persuasive than three that claim everything went perfectly.",
      "If you can't name the client, anonymise the client but keep the specifics. 'A logistics operator in the Gulf' with real numbers beats a named client with vague claims.",
      "## Show the work, not just the outcome",
      "If you sell chatbots, put one on your site. If you sell AI calling agents, publish a number people can ring. If you sell design, the site itself is the argument. Demonstrable capability outperforms described capability by a wide margin, and almost no agency does it.",
      "## Make pricing legible",
      "You don't have to publish rates. You do have to signal a range, a model and a starting point. A buyer who can't tell whether you're a $5,000 shop or a $500,000 shop won't enquire to find out — they'll assume the wrong one and leave.",
      "'Projects typically start at X' filters out the mismatches before they cost anyone a call. That's a feature.",
      "## Cut the distance between interest and contact",
      "A form that promises someone will be in touch is a dead end from the buyer's point of view. Booking a specific slot on a specific calendar is a commitment. Add the calendar. Add a direct WhatsApp or phone route for markets that prefer it.",
      "## The rebuild that actually works",
      "In order: write the case studies first, build a working demo of your own services second, decide on pricing transparency third. Then design the site around that material.",
      "Do it the other way round — design first, content later — and you get a beautiful site with nothing in it. That's the site most agencies have.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
