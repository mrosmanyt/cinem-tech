import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { createContract, listContracts } from "@/lib/contracts";
import { listEnquiries, updateEnquiry } from "@/lib/enquiries";
import { isSameOrigin } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return NextResponse.json({ contracts: listContracts() });
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { enquiryId?: string };
  const enquiry = body.enquiryId ? listEnquiries().find((item) => item.id === body.enquiryId) : null;
  if (body.enquiryId && !enquiry) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  const contract = createContract(enquiry?.id ?? null, enquiry ? {
    clientName: enquiry.name,
    clientCompany: enquiry.company || "",
    clientEmail: enquiry.email,
    clientPhone: enquiry.phone || "",
    projectTitle: `${enquiry.company || enquiry.name} — Project Agreement`,
    timeline: enquiry.timeline || "To be agreed after kickoff",
    scope: enquiry.message,
    deliverables: enquiry.services.length ? enquiry.services.join("\n") : undefined,
  } : {});
  if (enquiry) updateEnquiry(enquiry.id, { pipelineStage: "proposal", status: "qualified" });
  return NextResponse.json({ contract }, { status: 201 });
}
