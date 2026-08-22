import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, getAdminSession } from "@/lib/admin-auth";
import { isSameOrigin, requestIdentity } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/audit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const session = await getAdminSession();
  if (session) recordAudit({ action: "admin.logout", actor: session.email, success: true, identity: requestIdentity(request) });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...adminCookieOptions(), maxAge: 0 });
  return response;
}
