import { NextResponse } from "next/server";
import { addContractFeedback, getSharedContract } from "@/lib/contracts";
import { checkRateLimit, requestIdentity } from "@/lib/rate-limit";
import { updateEnquiry } from "@/lib/enquiries";

export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const rate = checkRateLimit(`proposal-feedback:${requestIdentity(request)}`, 10, 60 * 60 * 1000);
  if (!rate.allowed) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const contract = getSharedContract((await params).token);
  if (!contract) return NextResponse.json({ error: "Agreement not found." }, { status: 404 });
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const type = body.type;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const signatureName = typeof body.signatureName === "string" ? body.signatureName.trim() : "";
  if (!["comment", "changes_requested", "approved"].includes(String(type)) || !name || !email) return NextResponse.json({ error: "Name, email and response type are required." }, { status: 400 });
  if (type === "approved" && (!signatureName || body.accepted !== true)) return NextResponse.json({ error: "Typed signature and agreement consent are required to approve." }, { status: 400 });
  addContractFeedback(contract.id, { type: type as "comment" | "changes_requested" | "approved", name, email, message, signatureName, identity: requestIdentity(request), userAgent: request.headers.get("user-agent") || "" });
  if (contract.enquiryId && type === "approved") updateEnquiry(contract.enquiryId, { pipelineStage: "won", status: "won" });
  if (contract.enquiryId && type === "changes_requested") updateEnquiry(contract.enquiryId, { pipelineStage: "contract_review", status: "qualified" });
  return NextResponse.json({ ok: true });
}
