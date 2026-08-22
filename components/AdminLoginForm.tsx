"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";

export function AdminLoginForm({ defaultEmail, requiresTotp }: { defaultEmail: string; requiresTotp: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password"), otp: form.get("otp") }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Login failed.");
      router.replace("/admin");
      router.refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Login failed. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={login} className="mt-8 space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold">Admin email</label>
        <input id="admin-email" name="email" type="email" required defaultValue={defaultEmail} autoComplete="username" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition focus:border-zinc-300 focus:ring-4 focus:ring-white/10" />
      </div>
      {requiresTotp ? <div><label htmlFor="admin-otp" className="mb-2 block text-sm font-semibold">Authenticator code</label><input id="admin-otp" name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required autoComplete="one-time-code" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm tracking-[0.35em] text-white outline-none transition focus:border-zinc-300" /></div> : null}
      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold">Password</label>
        <input id="admin-password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition focus:border-zinc-300 focus:ring-4 focus:ring-white/10" />
      </div>
      {error ? <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Verifying…" : "Open secure dashboard"}
        {status === "sending" ? null : <Icon name="arrow" className="h-4 w-4" />}
      </button>
    </form>
  );
}
