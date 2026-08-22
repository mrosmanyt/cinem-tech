import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { Icon } from "@/components/Icon";
import { getAdminSession } from "@/lib/admin-auth";
import { isTotpConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0b0c] py-16 text-white sm:py-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-20" />
      <div className="glow pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[50rem] -translate-x-1/2 blur-3xl" />
      <div className="container-page relative">
        <div className="mx-auto max-w-md overflow-hidden rounded-4xl border border-white/10 bg-white/[0.055] p-7 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-9">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#111] shadow-lg shadow-white/10">
            <Icon name="shield" className="h-6 w-6" />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">Restricted access</p>
          <h1 className="mt-2 text-3xl font-semibold">CINEM Admin</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/55">Encrypted project enquiries, pipeline status and private follow-up notes.</p>
          <AdminLoginForm defaultEmail={process.env.ADMIN_EMAIL || "admin@cinem.tech"} requiresTotp={isTotpConfigured()} />
          <p className="mt-6 flex items-center gap-2 text-xs text-white/40"><Icon name="shield" className="h-3.5 w-3.5" /> 12-hour signed session · HttpOnly cookie</p>
        </div>
      </div>
    </section>
  );
}
