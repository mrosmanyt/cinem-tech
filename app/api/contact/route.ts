import { NextResponse } from "next/server";
import { createEnquiry } from "@/lib/enquiries";
import { checkRateLimit, requestIdentity } from "@/lib/rate-limit";
import { services as availableServices } from "@/lib/services";

/** Validates and stores website enquiries in the encrypted SQLite database. */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  phone?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  services?: string[];
  startType?: "demo" | "direct" | "question" | string;
  companyWebsite?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const START_TYPES = new Set(["demo", "direct", "question"]);
const SERVICE_NAMES = new Set(availableServices.map((service) => service.name));

function cleanOptional(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, maxLength) : null;
}

function validWebsite(value: string | null) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const identity = requestIdentity(request);
  const rate = checkRateLimit(`contact:${identity}`, 5, 10 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let data: Payload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  // Hidden honeypot: bots fill this, humans never see it.
  if (data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 120 || email.length > 254) {
    return NextResponse.json({ error: "Name or email is too long." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const website = cleanOptional(data.website, 500);
  if (!validWebsite(website)) {
    return NextResponse.json(
      { error: "Website must be a valid http:// or https:// address." },
      { status: 400 },
    );
  }

  const enquiry = {
    startType: START_TYPES.has(data.startType || "") ? data.startType! : "direct",
    name,
    email,
    company: cleanOptional(data.company, 160),
    website,
    phone: cleanOptional(data.phone, 50),
    budget: cleanOptional(data.budget, 80),
    timeline: cleanOptional(data.timeline, 80),
    services: Array.isArray(data.services)
      ? [...new Set(data.services.filter((service): service is string =>
          typeof service === "string" && SERVICE_NAMES.has(service),
        ))]
      : [],
    message,
  };

  try {
    const id = createEnquiry(enquiry, identity);
    return NextResponse.json({ ok: true, reference: id });
  } catch (error) {
    console.error("[CINEM] Failed to store enquiry:", error);
    return NextResponse.json(
      { error: "We could not securely store your enquiry. Please try again." },
      { status: 503 },
    );
  }
}
