export const enquiryStatuses = ["new", "contacted", "qualified", "won", "closed", "archived"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export const pipelineStages = ["whatsapp_lead", "contacted", "qualified", "proposal", "contract_review", "won", "invoiced", "kickoff", "active", "completed", "lost"] as const;
export type PipelineStage = (typeof pipelineStages)[number];

export type EnquiryPayload = {
  startType: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  phone: string | null;
  budget: string | null;
  timeline: string | null;
  services: string[];
  message: string;
  notes: string;
  pipelineStage: PipelineStage;
};

export type EnquiryRecord = EnquiryPayload & {
  id: string;
  receivedAt: string;
  updatedAt: string;
  status: EnquiryStatus;
  source: string;
};
