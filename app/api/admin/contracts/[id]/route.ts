import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getContract, listContractFeedback, listContractVersions, restoreContractVersion, updateContract, type ContractData, type ContractStatus } from "@/lib/contracts";
import { isSameOrigin } from "@/lib/rate-limit";
import { updateEnquiry } from "@/lib/enquiries";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const contract = getContract((await params).id);
  return contract ? NextResponse.json({ contract, versions: listContractVersions(contract.id), feedback: listContractFeedback(contract.id) }) : NextResponse.json({ error: "Contract not found." }, { status: 404 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { data?: ContractData; status?: ContractStatus; restoreVersion?: number };
  if (body.status && !["draft", "shared"].includes(body.status)) return NextResponse.json({ error: "Invalid contract status." }, { status: 400 });
  try {
    if (body.restoreVersion) {
      const restored = restoreContractVersion((await params).id, body.restoreVersion);
      return restored ? NextResponse.json({ contract: restored, versions: listContractVersions(restored.id), feedback: listContractFeedback(restored.id) }) : NextResponse.json({ error: "Version not found." }, { status: 404 });
    }
    const contract = updateContract((await params).id, body);
    if (contract?.enquiryId && body.status === "shared") updateEnquiry(contract.enquiryId, { pipelineStage: "contract_review", status: "qualified" });
    return contract ? NextResponse.json({ contract, versions: listContractVersions(contract.id), feedback: listContractFeedback(contract.id) }) : NextResponse.json({ error: "Contract not found." }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid contract update." }, { status: 400 });
  }
}
