"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import {
  enquiryStatuses,
  type EnquiryRecord,
  type EnquiryStatus,
} from "@/lib/enquiry-types";

const statusLabel: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  won: "Won",
  closed: "Closed",
  archived: "Archived",
};

const statusStyle: Record<EnquiryStatus, string> = {
  new: "bg-zinc-500/12 text-zinc-700 dark:text-zinc-300",
  contacted: "bg-zinc-500/12 text-zinc-600 dark:text-zinc-300",
  qualified: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  won: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  closed: "bg-slate-500/12 text-slate-600 dark:text-slate-300",
  archived: "bg-slate-500/8 text-faint",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminDashboard({
  initialEnquiries,
  adminEmail,
}: {
  initialEnquiries: EnquiryRecord[];
  adminEmail: string;
}) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [selectedId, setSelectedId] = useState(initialEnquiries[0]?.id || "");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return enquiries.filter((item) => {
      const matchesStatus = filter === "all" || item.status === filter;
      const haystack = [item.name, item.email, item.company, item.message, item.services.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesStatus && (!needle || haystack.includes(needle));
    });
  }, [enquiries, filter, query]);

  const selected = filtered.find((item) => item.id === selectedId) || filtered[0];
  const summary = {
    total: enquiries.length,
    new: enquiries.filter((item) => item.status === "new").length,
    active: enquiries.filter((item) => !["closed", "archived"].includes(item.status)).length,
    won: enquiries.filter((item) => item.status === "won").length,
  };

  async function update(data: { status?: EnquiryStatus; notes?: string }) {
    if (!selected) return;
    setSaving(true);
    setNotice("");
    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, ...data }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      if (!response.ok) throw new Error(result.error || "Update failed");
      setEnquiries((current) => current.map((item) => item.id === selected.id ? result.enquiry : item));
      setNotice("Saved securely");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-surface py-8 sm:py-12">
      <div className="container-page">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Secure operations</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Enquiry command centre</h1>
            <p className="mt-2 text-sm text-muted">Signed in as {adminEmail}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/admin/pipeline" className="btn-primary"><Icon name="growth" className="h-4 w-4" /> Pipeline</a>
            <a href="/admin/security" className="btn-secondary"><Icon name="shield" className="h-4 w-4" /> Security</a>
            <a href="/admin/contracts" className="btn-primary"><Icon name="layers" className="h-4 w-4" /> Contracts</a>
            <a href="/api/admin/export" className="btn-secondary"><Icon name="arrow" className="h-4 w-4 rotate-90" /> Export CSV</a>
            <button type="button" onClick={logout} className="btn-secondary">Sign out</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Total enquiries", summary.total, "mail"],
            ["New", summary.new, "spark"],
            ["Active pipeline", summary.active, "growth"],
            ["Won", summary.won, "check"],
          ].map(([label, value, icon]) => (
            <div key={String(label)} className="card flex items-center justify-between !rounded-2xl !p-5">
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-faint">{label}</p><p className="mt-2 font-display text-3xl font-semibold">{value}</p></div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon name={String(icon)} className="h-5 w-5" /></span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid min-h-[42rem] overflow-hidden rounded-3xl border border-line bg-elevated shadow-xl shadow-black/5 lg:grid-cols-[22rem_1fr]">
          <aside className="border-b border-line bg-surface/70 lg:border-b-0 lg:border-r">
            <div className="space-y-3 border-b border-line p-4">
              <div className="relative">
                <Icon name="target" className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-faint" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search enquiries…" className="w-full rounded-xl border border-line bg-elevated py-3 pl-10 pr-3 text-sm outline-none focus:border-brand" />
              </div>
              <select value={filter} onChange={(event) => setFilter(event.target.value as "all" | EnquiryStatus)} className="w-full rounded-xl border border-line bg-elevated px-3 py-2.5 text-sm outline-none focus:border-brand">
                <option value="all">All statuses</option>
                {enquiryStatuses.map((status) => <option key={status} value={status}>{statusLabel[status]}</option>)}
              </select>
            </div>
            <div className="max-h-[34rem] overflow-y-auto lg:max-h-[48rem]">
              {filtered.length ? filtered.map((item) => (
                <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className={`block w-full border-b border-line p-4 text-left transition-colors ${selected?.id === item.id ? "bg-brand/8" : "hover:bg-bg"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0"><p className="truncate text-sm font-semibold">{item.name}</p><p className="mt-1 truncate text-xs text-muted">{item.company || item.email}</p></div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide ${statusStyle[item.status]}`}>{statusLabel[item.status]}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-faint">{item.message}</p>
                  <p className="mt-3 text-[0.68rem] text-faint">{formatDate(item.receivedAt)}</p>
                </button>
              )) : <div className="p-8 text-center text-sm text-muted">No enquiries match this view.</div>}
            </div>
          </aside>

          <main className="p-5 sm:p-8">
            {selected ? (
              <div className="mx-auto max-w-4xl">
                <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{selected.startType === "demo" ? "Free demo request" : selected.startType === "question" ? "Initial question" : "Project enquiry"}</p>
                    <h2 className="mt-2 text-2xl font-semibold">{selected.name}</h2>
                    <p className="mt-1 text-sm text-muted">Received {formatDate(selected.receivedAt)}</p>
                  </div>
                  <select value={selected.status} onChange={(event) => update({ status: event.target.value as EnquiryStatus })} disabled={saving} className={`rounded-full border-0 px-4 py-2 text-sm font-semibold outline-none ring-1 ring-inset ring-line ${statusStyle[selected.status]}`}>
                    {enquiryStatuses.map((status) => <option key={status} value={status}>{statusLabel[status]}</option>)}
                  </select>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["Email", selected.email], ["Phone / WhatsApp", selected.phone],
                    ["Company", selected.company], ["Website", selected.website],
                    ["Budget", selected.budget], ["Timeline", selected.timeline],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-line bg-surface p-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-faint">{label}</p>
                      <p className="mt-2 break-words text-sm font-medium">{value || "Not provided"}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {selected.services.length ? selected.services.map((service) => <span key={service} className="rounded-full border border-brand/20 bg-brand/8 px-3 py-1.5 text-xs font-semibold text-brand">{service}</span>) : <span className="text-sm text-faint">No service selected</span>}
                </div>

                <div className="mt-7 rounded-2xl border border-line bg-bg p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-faint">Project brief</p>
                  <p className="mt-4 whitespace-pre-wrap text-[0.95rem] leading-7 text-muted">{selected.message}</p>
                </div>

                <div className="mt-7">
                  <div className="flex items-end justify-between gap-4"><label htmlFor="admin-notes" className="text-sm font-semibold">Private admin notes</label><span className="text-xs text-faint">Encrypted with enquiry</span></div>
                  <textarea key={`${selected.id}-${selected.updatedAt}`} id="admin-notes" defaultValue={selected.notes} maxLength={5000} rows={6} placeholder="Call notes, next step, proposal reference…" className="mt-3 w-full resize-y rounded-2xl border border-line bg-bg p-4 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-faint">{notice}</p>
                    <button type="button" disabled={saving} onClick={() => update({ notes: (document.getElementById("admin-notes") as HTMLTextAreaElement)?.value || "" })} className="btn-primary">{saving ? "Saving…" : "Save notes"}</button>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
                  <a href={`/admin/contracts?enquiry=${encodeURIComponent(selected.id)}`} className="btn-primary"><Icon name="layers" className="h-4 w-4" /> Create agreement</a>
                  <a href={`mailto:${selected.email}`} className="btn-primary"><Icon name="mail" className="h-4 w-4" /> Reply by email</a>
                  {selected.phone ? <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-secondary"><Icon name="phone-call" className="h-4 w-4" /> WhatsApp</a> : null}
                  {selected.website ? <a href={selected.website} target="_blank" rel="noopener noreferrer" className="btn-secondary">Open website <Icon name="arrow" className="h-4 w-4 -rotate-45" /></a> : null}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-96 flex-col items-center justify-center text-center"><Icon name="mail" className="h-8 w-8 text-faint" /><h2 className="mt-4 text-xl font-semibold">No enquiry selected</h2><p className="mt-2 text-sm text-muted">New website enquiries will appear here automatically.</p></div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
