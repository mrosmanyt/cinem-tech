import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ContractEditor } from "@/components/ContractEditor";
import { getAdminSession } from "@/lib/admin-auth";
import { getContract, listContractFeedback, listContractVersions } from "@/lib/contracts";

export const metadata: Metadata = { title: "Edit Contract", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function EditContractPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) redirect("/admin/login");
  const contract = getContract((await params).id);
  if (!contract) notFound();
  return <ContractEditor initialContract={contract} initialVersions={listContractVersions(contract.id)} initialFeedback={listContractFeedback(contract.id)} />;
}
