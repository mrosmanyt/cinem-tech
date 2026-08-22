import { getAdminSession } from "@/lib/admin-auth";
import { listEnquiries } from "@/lib/enquiries";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  if (!(await getAdminSession())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const headers = [
    "ID", "Received", "Status", "Name", "Email", "Phone", "Company",
    "Website", "Start type", "Budget", "Timeline", "Services", "Message", "Admin notes",
  ];
  const rows = listEnquiries().map((item) => [
    item.id, item.receivedAt, item.status, item.name, item.email, item.phone,
    item.company, item.website, item.startType, item.budget, item.timeline,
    item.services, item.message, item.notes,
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cinem-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
