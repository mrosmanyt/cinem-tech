import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getContract, updateContract } from "@/lib/contracts";
import { listEnquiries } from "@/lib/enquiries";
import { isSameOrigin } from "@/lib/rate-limit";

const fields = ["projectTitle", "scope", "deliverables", "milestones", "timeline", "clientResponsibilities"] as const;

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const contract = getContract((await params).id);
  if (!contract) return NextResponse.json({ error: "Contract not found." }, { status: 404 });
  const enquiry = contract.enquiryId ? listEnquiries().find((item) => item.id === contract.enquiryId) : null;
  let generated: Partial<Record<(typeof fields)[number], string>> | null = null;
  let usedAi = false;
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.OPENAI_PROPOSAL_MODEL || "gpt-5.4",
          store: false,
          instructions: "You structure software-agency enquiries into precise commercial proposals. Never invent prices, guarantees, legal claims, integrations or requirements. Mark unclear items as assumptions. Use concise client-ready English.",
          input: JSON.stringify({ enquiry, currentDraft: contract.data }),
          text: { format: { type: "json_schema", name: "proposal", strict: true, schema: { type: "object", additionalProperties: false, properties: Object.fromEntries(fields.map((field) => [field, { type: "string" }])), required: [...fields] } } },
        }),
      });
      if (!response.ok) throw new Error(`OpenAI request failed (${response.status})`);
      const result = await response.json() as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
      const text = result.output?.flatMap((item) => item.content || []).find((part) => part.type === "output_text")?.text;
      if (text) { generated = JSON.parse(text); usedAi = true; }
    } catch (error) {
      console.error("[CINEM] AI proposal fallback:", error);
    }
  }

  if (!generated) {
    const services = enquiry?.services.length ? enquiry.services.join("\n") : contract.data.deliverables;
    generated = {
      projectTitle: contract.data.projectTitle,
      scope: `${enquiry?.message || contract.data.scope}\n\nAssumptions: Final integrations, content volume and acceptance criteria will be confirmed during kickoff.`,
      deliverables: services,
      milestones: "Discovery, requirements and acceptance criteria\nDesign / working prototype approval\nDevelopment and integrations\nQuality assurance and client review\nLaunch, documentation and handover",
      timeline: enquiry?.timeline || contract.data.timeline,
      clientResponsibilities: "Provide one authorized decision-maker, required content and credentials, and consolidated milestone feedback within five business days.",
    };
  }

  const updated = updateContract(contract.id, { data: { ...contract.data, ...generated }, status: "draft" });
  return NextResponse.json({ contract: updated, usedAi, message: usedAi ? "AI proposal generated." : "Smart proposal generated. Add OPENAI_API_KEY to enable AI refinement." });
}
