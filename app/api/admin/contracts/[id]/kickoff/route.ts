import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getContract } from "@/lib/contracts";
import { updateEnquiry } from "@/lib/enquiries";
import { isSameOrigin } from "@/lib/rate-limit";
import { createKickoff } from "@/lib/kickoffs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const contract = getContract((await params).id);
  if (!contract?.enquiryId) return NextResponse.json({ error: "This contract is not linked to an enquiry." }, { status: 400 });
  const enquiry = updateEnquiry(contract.enquiryId, { pipelineStage: "kickoff", status: "won" });
  const kickoff = createKickoff(contract.enquiryId, contract.id);
  return NextResponse.json({ enquiry, kickoff, message: "Project kickoff created in the pipeline." });
}
