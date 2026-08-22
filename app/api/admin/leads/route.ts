import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { createEnquiry, listEnquiries } from "@/lib/enquiries";
import { isSameOrigin } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 50) : "";
  if (!name || !phone) return NextResponse.json({ error: "Client name and WhatsApp number are required." }, { status: 400 });
  const email = typeof body.email === "string" && body.email.trim() ? body.email.trim().slice(0, 254) : `whatsapp-${phone.replace(/\D/g, "")}@lead.cinem.tech`;
  const id = createEnquiry({
    startType: "whatsapp", name, email, phone,
    company: typeof body.company === "string" ? body.company.trim().slice(0, 160) || null : null,
    website: null,
    budget: typeof body.budget === "string" ? body.budget.trim().slice(0, 80) || null : null,
    timeline: typeof body.timeline === "string" ? body.timeline.trim().slice(0, 80) || null : null,
    services: [],
    message: typeof body.requirements === "string" ? body.requirements.trim().slice(0, 5000) || "Requirements to be confirmed on WhatsApp." : "Requirements to be confirmed on WhatsApp.",
    pipelineStage: "whatsapp_lead",
  }, "admin", "whatsapp");
  return NextResponse.json({ enquiry: listEnquiries().find((item) => item.id === id) }, { status: 201 });
}
