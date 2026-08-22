import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContractDocument } from "@/components/ContractDocument";
import { ProposalActions } from "@/components/ProposalActions";
import { getSharedContract } from "@/lib/contracts";

export const metadata: Metadata = { title: "Private Project Agreement", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ProposalPage({ params }: { params: Promise<{ token: string }> }) {
  const contract = getSharedContract((await params).token);
  if (!contract) notFound();
  return <div className="min-h-screen bg-slate-100 pb-12"><ProposalActions email={contract.data.clientEmail} token={contract.shareToken} /><div className="px-3 py-6 sm:px-6 sm:py-10"><ContractDocument contract={contract} /></div></div>;
}
