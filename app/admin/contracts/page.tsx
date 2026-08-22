import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ContractWorkspace } from "@/components/ContractWorkspace";
import { getAdminSession } from "@/lib/admin-auth";
import { listContracts } from "@/lib/contracts";
import { listEnquiries } from "@/lib/enquiries";

export const metadata: Metadata = { title: "Contract Builder", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function ContractsPage({ searchParams }: { searchParams: Promise<{ enquiry?: string }> }) {
  if (!(await getAdminSession())) redirect("/admin/login");
  const { enquiry = "" } = await searchParams;
  return <ContractWorkspace contracts={listContracts()} enquiries={listEnquiries()} initialEnquiryId={enquiry} />;
}
