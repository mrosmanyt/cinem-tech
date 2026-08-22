import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";

/**
 * Fonts are loaded from Google Fonts via <link> in <head> below, so the project
 * builds in any environment (including offline / firewalled CI).
 *
 * OPTIONAL PERFORMANCE UPGRADE — once you're building somewhere with network
 * access, switch to next/font for self-hosted fonts and zero layout shift:
 *
 *   import { Inter, Sora } from "next/font/google";
 *   const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
 *   const sora  = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
 *
 * ...then put `${inter.variable} ${sora.variable}` on <html> and remove the
 * three font <link> tags from <head>.
 */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web, App & AI Development Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web development agency",
    "custom software development",
    "AI chatbot development",
    "AI calling agents",
    "mobile app development",
    "social media management agency",
    "lead generation agency",
    "PR agency",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Web, App & AI Development Agency`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web, App & AI Development Agency`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('cinem-theme');
    var theme = (stored === 'light' || stored === 'dark' || stored === 'aurora')
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    if (theme !== 'light') document.documentElement.classList.add('dark');
    if (theme === 'aurora') document.documentElement.classList.add('theme-aurora');
  } catch (e) {}
})();
`;

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  numberOfEmployees: { "@type": "QuantitativeValue", value: site.teamSize },
  sameAs: Object.values(site.social),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_HREF} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
