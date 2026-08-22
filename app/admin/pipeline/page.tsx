import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SalesPipeline } from "@/components/SalesPipeline";
import { getAdminSession } from "@/lib/admin-auth";
import { listEnquiries } from "@/lib/enquiries";

export const metadata: Metadata = { title: "Sales Pipeline", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function PipelinePage() { if (!(await getAdminSession())) redirect("/admin/login"); return <SalesPipeline initialLeads={listEnquiries()} />; }
