import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "cinem_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

type SessionPayload = {
  sub: "cinem-admin";
  email: string;
  exp: number;
};

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return value;
}

function digest(value: string) {
  return createHmac("sha256", secret()).update(value).digest();
}

function safeEqual(left: string, right: string) {
  return timingSafeEqual(digest(left), digest(right));
}

export function verifyAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL || "admin@cinem.tech";
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return false;
  return safeEqual(email.trim().toLowerCase(), configuredEmail.toLowerCase()) &&
    safeEqual(password, configuredPassword);
}

export function isTotpConfigured() { return Boolean(process.env.ADMIN_TOTP_SECRET?.trim()); }

function decodeBase32(value: string) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const char of value.toUpperCase().replace(/=|\s|-/g, "")) {
    const index = alphabet.indexOf(char); if (index < 0) throw new Error("Invalid TOTP secret."); bits += index.toString(2).padStart(5, "0");
  }
  const bytes: number[] = []; for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2)); return Buffer.from(bytes);
}

export function verifyAdminTotp(code: string) {
  const configured = process.env.ADMIN_TOTP_SECRET?.trim(); if (!configured) return true;
  if (!/^\d{6}$/.test(code)) return false;
  const key = decodeBase32(configured); const counter = Math.floor(Date.now() / 1000 / 30);
  for (let offset = -1; offset <= 1; offset++) {
    const buffer = Buffer.alloc(8); buffer.writeBigUInt64BE(BigInt(counter + offset)); const digest = createHmac("sha1", key).update(buffer).digest(); const position = digest[digest.length - 1] & 15; const value = ((digest.readUInt32BE(position) & 0x7fffffff) % 1_000_000).toString().padStart(6, "0"); if (safeEqual(code, value)) return true;
  }
  return false;
}

export function createAdminSession(email: string) {
  const payload: SessionPayload = {
    sub: "cinem-admin",
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyAdminSession(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = createHmac("sha256", secret()).update(encoded).digest("base64url");
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (payload.sub !== "cinem-admin" || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.ADMIN_COOKIE_SECURE !== "false",
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}
