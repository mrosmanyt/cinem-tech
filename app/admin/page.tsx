import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getAdminSession } from "@/lib/admin-auth";
import { listEnquiries } from "@/lib/enquiries";

export const metadata: Metadata = {
  title: "Enquiry Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <AdminDashboard initialEnquiries={listEnquiries()} adminEmail={session.email} />;
}
