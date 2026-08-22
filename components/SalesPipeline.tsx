"use client";

import Link from "next/link";
import { useState } from "react";
import { pipelineStages, type EnquiryRecord, type PipelineStage } from "@/lib/enquiry-types";

const labels: Record<PipelineStage, string> = { whatsapp_lead: "WhatsApp leads", contacted: "Contacted", qualified: "Qualified", proposal: "Proposal", contract_review: "Contract review", won: "Won", invoiced: "Invoiced", kickoff: "Kickoff", active: "Active", completed: "Completed", lost: "Lost" };

export function SalesPipeline({ initialLeads }: { initialLeads: EnquiryRecord[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  async function move(id: string, pipelineStage: PipelineStage) {
    const response = await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, pipelineStage }) });
    const result = await response.json().catch(() => ({}));
    if (response.ok) setLeads((current) => current.map((lead) => lead.id === id ? result.enquiry : lead));
    else setNotice(result.error || "Could not update the pipeline.");
  }

  async function addLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/admin/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json().catch(() => ({}));
    if (response.ok) { setLeads((current) => [result.enquiry, ...current]); setShowForm(false); setNotice("WhatsApp lead added."); }
    else setNotice(result.error || "Could not add the lead.");
    setBusy(false);
  }

  return <div className="min-h-screen bg-surface py-8"><div className="container-page">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Link href="/admin" className="text-sm font-semibold text-brand">← Admin dashboard</Link><p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">WhatsApp-first CRM</p><h1 className="mt-2 text-3xl font-semibold">Sales pipeline</h1><p className="mt-2 text-sm text-muted">Capture WhatsApp conversations first, then move every deal through proposal, contract, invoice and kickoff.</p></div><button onClick={() => setShowForm((v) => !v)} className="btn-primary">+ Add WhatsApp lead</button></div>
    {showForm ? <form onSubmit={addLead} className="mt-6 grid gap-3 rounded-3xl border border-line bg-elevated p-5 sm:grid-cols-2 lg:grid-cols-3"><Input name="name" label="Client name *" required /><Input name="phone" label="WhatsApp number *" required /><Input name="company" label="Company" /><Input name="email" label="Email (optional)" type="email" /><Input name="budget" label="Budget discussed" /><Input name="timeline" label="Timeline" /><label className="sm:col-span-2 lg:col-span-3"><span className="text-xs font-semibold">WhatsApp requirements / conversation summary</span><textarea name="requirements" rows={4} className="mt-1.5 w-full rounded-xl border border-line bg-bg p-3 text-sm outline-none focus:border-brand" /></label><button disabled={busy} className="btn-primary sm:col-span-2 lg:col-span-3">{busy ? "Adding…" : "Save WhatsApp lead"}</button></form> : null}
    {notice ? <p className="mt-4 text-sm text-muted">{notice}</p> : null}
    <div className="mt-7 flex gap-4 overflow-x-auto pb-6">{pipelineStages.map((stage) => <section key={stage} className="w-72 shrink-0"><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold">{labels[stage]}</h2><span className="rounded-full bg-elevated px-2 py-1 text-xs text-faint">{leads.filter((lead) => lead.pipelineStage === stage).length}</span></div><div className="space-y-3">{leads.filter((lead) => lead.pipelineStage === stage).map((lead) => <article key={lead.id} className="rounded-2xl border border-line bg-elevated p-4 shadow-sm"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-semibold">{lead.name}</h3><p className="mt-1 text-xs text-muted">{lead.company || lead.phone || lead.email}</p></div>{lead.source === "whatsapp" ? <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[0.6rem] font-bold uppercase text-emerald-700">WA</span> : null}</div><p className="mt-3 line-clamp-3 text-xs leading-5 text-faint">{lead.message}</p><div className="mt-3 flex gap-2">{lead.phone ? <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" className="text-xs font-semibold text-emerald-600">WhatsApp</a> : null}<Link href={`/admin/contracts?enquiry=${lead.id}`} className="text-xs font-semibold text-brand">Proposal</Link></div><select value={lead.pipelineStage} onChange={(event) => move(lead.id, event.target.value as PipelineStage)} className="mt-3 w-full rounded-lg border border-line bg-bg px-2 py-2 text-xs">{pipelineStages.map((value) => <option key={value} value={value}>{labels[value]}</option>)}</select></article>)}{!leads.some((lead) => lead.pipelineStage === stage) ? <div className="rounded-2xl border border-dashed border-line p-5 text-center text-xs text-faint">No deals</div> : null}</div></section>)}</div>
  </div></div>;
}

function Input({ name, label, required, type = "text" }: { name: string; label: string; required?: boolean; type?: string }) { return <label><span className="text-xs font-semibold">{label}</span><input name={name} type={type} required={required} className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-sm outline-none focus:border-brand" /></label>; }
