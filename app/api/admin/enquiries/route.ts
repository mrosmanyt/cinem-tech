import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import {
  enquiryStatuses,
  enquirySummary,
  listEnquiries,
  updateEnquiry,
  type EnquiryStatus,
} from "@/lib/enquiries";
import { isSameOrigin } from "@/lib/rate-limit";
import { pipelineStages, type PipelineStage } from "@/lib/enquiry-types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const enquiries = listEnquiries();
  return NextResponse.json({ enquiries, summary: enquirySummary(enquiries) });
}

export async function PATCH(request: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let data: { id?: string; status?: string; notes?: string; pipelineStage?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!data.id || (data.status && !enquiryStatuses.includes(data.status as EnquiryStatus)) || (data.pipelineStage && !pipelineStages.includes(data.pipelineStage as PipelineStage))) {
    return NextResponse.json({ error: "Invalid enquiry update." }, { status: 400 });
  }

  const enquiry = updateEnquiry(data.id, {
    status: data.status as EnquiryStatus | undefined,
    notes: typeof data.notes === "string" ? data.notes : undefined,
    pipelineStage: data.pipelineStage as PipelineStage | undefined,
  });
  if (!enquiry) {
    return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
  }
  return NextResponse.json({ enquiry });
}
