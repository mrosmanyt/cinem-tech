# CINEM — cinem.tech

Marketing website for CINEM, built with Next.js 16 (App Router), React 19,
TypeScript and Tailwind CSS. Three visual themes, an encrypted enquiry workflow,
an admin dashboard and SEO-ready public pages.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Requires Node 20.9+ (Node 22 recommended).

---

## Project structure

```
app/
  layout.tsx                          root layout, theme script, org schema
  page.tsx                            home
  services/page.tsx                   services hub
  services/[category]/page.tsx        Development / AI Solutions / Growth
  services/[category]/[service]/      12 individual service pages
  work/page.tsx, work/[slug]/         case studies
  about/page.tsx                      about + team + history
  blog/page.tsx, blog/[slug]/         articles
  contact/page.tsx                    enquiry form
  api/contact/route.ts                encrypted enquiry endpoint
  api/admin/                          protected admin APIs + CSV export
  admin/                              private enquiry dashboard
  privacy/, terms/                    legal templates
  sitemap.ts, robots.ts, not-found.tsx, icon.svg

components/   Header, Footer, ThemeToggle, ContactForm, CTA, Icon, ui, Logo
lib/          site.ts, services.ts, work.ts, blog.ts   ← all content lives here
```

Content is data-driven. To add a service, add an object to `lib/services.ts` —
the nav, footer, sitemap, services hub and its own page all pick it up
automatically. Same for case studies (`lib/work.ts`) and posts (`lib/blog.ts`).

---

## Before you launch — checklist

**1. Real contact details** — `lib/site.ts`
Email addresses, phone, WhatsApp number, office address and every social URL are
placeholders. Replace them all.

**2. Real case studies** — `lib/work.ts`
The six case studies are structural placeholders describing anonymised generic
projects. Replace each with a real CINEM project: real client (with written
permission to be named), numbers you can evidence, real screenshots. Do not
publish invented results.

**3. Testimonials** — `lib/work.ts`
The `testimonials` array is deliberately empty so nothing fake ships by accident.
Add only real, attributed quotes you have permission to publish.

**4. Configure secure enquiries and admin**
Copy `.env.example` to `.env.local`, then replace every secret. The dashboard is
available at `/admin`; it stores encrypted form payloads in SQLite and supports
status tracking, private notes and CSV export. Do not commit `.env.local` or the
database.

**5. Legal pages** — `app/privacy/page.tsx`, `app/terms/page.tsx`
Templates only, each showing a visible "template notice" banner. Have a lawyer
review them for your jurisdictions, then delete the banner blocks.

**6. Stats** — `lib/site.ts`
`400+ projects`, `18 countries`, department headcounts in `app/about/page.tsx`
and founding year are placeholders. Use your real figures.

**7. Open Graph image**
Add `app/opengraph-image.png` (1200×630) so links preview properly when shared.

**8. Analytics**
Add GA4 and Microsoft Clarity in `app/layout.tsx`.

---

## Admin dashboard and data persistence

Required production variables are `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`ADMIN_SESSION_SECRET` and `ENQUIRY_ENCRYPTION_KEY`. Leave
`ADMIN_COOKIE_SECURE=true` on an HTTPS deployment. `CINEM_DB_PATH` should point
to an absolute location on a persistent disk, for example
`/var/lib/cinem/cinem.sqlite`.

SQLite is appropriate on a single persistent Node server. A serverless host with
an ephemeral or read-only filesystem is not suitable for this storage layer;
use a persistent-volume host or replace `lib/enquiries.ts` with a managed
database before deploying there. Back up the database regularly, ideally while
the app is stopped or with SQLite's online backup mechanism.

The database payload is encrypted with AES-256-GCM. Keep the encryption key in a
secret manager: losing it makes existing enquiries unreadable, while changing it
without a data migration has the same effect.

## Deploying

Deploy on a Node host with a persistent disk. Run `npm run build && npm start`
behind HTTPS and a reverse proxy, set the production environment variables, and
point `CINEM_DB_PATH` at the mounted data volume. If using a serverless platform,
move enquiry storage to a managed database first.

---

## Optional performance upgrade

Fonts load from Google Fonts via `<link>` so the project builds in any
environment. Once you're building somewhere with network access, switch to
`next/font` for self-hosted fonts and zero layout shift — instructions are in
the comment at the top of `app/layout.tsx`.

---

## Theming

Colours are CSS variables in `app/globals.css`: `:root` for Studio, `.dark` for
Midnight and `.theme-aurora` for Aurora. The theme choice persists in
`localStorage` and is applied before first paint.
