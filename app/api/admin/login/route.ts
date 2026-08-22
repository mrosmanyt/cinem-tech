import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminSession,
  verifyAdminCredentials,
  verifyAdminTotp,
} from "@/lib/admin-auth";
import { recordAudit } from "@/lib/audit";
import { checkRateLimit, isSameOrigin, requestIdentity } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const identity = requestIdentity(request);
  const rate = checkRateLimit(`admin-login:${identity}`, 5, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let data: { email?: string; password?: string; otp?: string };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = data.email?.trim() || "";
  const password = data.password || "";
  if (!verifyAdminCredentials(email, password) || !verifyAdminTotp(data.otp || "")) {
    recordAudit({ action: "admin.login", actor: email || "unknown", success: false, identity });
    return NextResponse.json({ error: "Credentials or authenticator code is incorrect." }, { status: 401 });
  }

  recordAudit({ action: "admin.login", actor: email, success: true, identity });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSession(email), adminCookieOptions());
  return response;
}
