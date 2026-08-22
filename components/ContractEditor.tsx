"use client";

import Link from "next/link";
import { useState } from "react";
import type { ContractData, ContractFeedback, ContractRecord, ContractVersion } from "@/lib/contracts";
import { Icon } from "./Icon";

const textFields: Array<{ key: keyof ContractData; label: string; rows?: number; hint?: string }> = [
  { key: "scope", label: "Project scope", rows: 7, hint: "Exact boundaries, features, platforms and integrations." },
  { key: "deliverables", label: "Deliverables", rows: 6, hint: "One deliverable per line." },
  { key: "milestones", label: "Milestones", rows: 6, hint: "One milestone per line." },
  { key: "paymentSchedule", label: "Payment schedule", rows: 5, hint: "One payment trigger per line." },
  { key: "clientResponsibilities", label: "Client responsibilities", rows: 4 },
  { key: "specialTerms", label: "Special terms / approved exceptions", rows: 5 },
];

const inputClass = "w-full rounded-xl border border-line bg-bg px-3.5 py-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

export function ContractEditor({ initialContract, initialVersions, initialFeedback }: { initialContract: ContractRecord; initialVersions: ContractVersion[]; initialFeedback: ContractFeedback[] }) {
  const [contract, setContract] = useState(initialContract);
  const [versions, setVersions] = useState(initialVersions);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  function change(key: keyof ContractData, value: string) {
    setContract((current) => ({ ...current, data: { ...current.data, [key]: value } }));
  }

  async function save(status = contract.status) {
    setSaving(true);
    setNotice("");
    try {
      const response = await fetch(`/api/admin/contracts/${contract.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: contract.data, status }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Save failed.");
      setContract(result.contract);
      if (result.versions) setVersions(result.versions);
      if (result.feedback) setFeedback(result.feedback);
      setNotice(status === "shared" ? "Private review link is live." : "Draft saved securely.");
      return result.contract as ContractRecord;
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Save failed.");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function generateProposal() {
    setSaving(true); setNotice("Structuring the WhatsApp requirements…");
    try {
      const response = await fetch(`/api/admin/contracts/${contract.id}/generate`, { method: "POST" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Proposal generation failed.");
      setContract(result.contract); setNotice(result.message);
      const details = await fetch(`/api/admin/contracts/${contract.id}`).then((r) => r.json());
      if (details.versions) setVersions(details.versions);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Proposal generation failed."); }
    finally { setSaving(false); }
  }

  async function restore(version: number) {
    if (!window.confirm(`Restore version ${version} as a new draft?`)) return;
    const response = await fetch(`/api/admin/contracts/${contract.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ restoreVersion: version }) });
    const result = await response.json().catch(() => ({}));
    if (response.ok) { setContract(result.contract); setVersions(result.versions || versions); setNotice(`Version ${version} restored as a new draft.`); }
    else setNotice(result.error || "Restore failed.");
  }

  async function createInvoice() {
    setSaving(true);
    const response = await fetch("/api/admin/invoices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contractId: contract.id }) });
    const result = await response.json().catch(() => ({}));
    if (response.ok) window.location.href = `/admin/invoices/${result.invoice.id}`;
    else { setNotice(result.error || "Invoice creation failed."); setSaving(false); }
  }

  async function kickoff() {
    setSaving(true);
    const response = await fetch(`/api/admin/contracts/${contract.id}/kickoff`, { method: "POST" });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.kickoff?.id) window.location.href = `/admin/kickoff/${result.kickoff.id}`;
    else { setNotice(result.message || result.error || "Kickoff update failed."); setSaving(false); }
  }

  async function share() {
    const saved = await save("shared");
    if (!saved) return;
    const url = `${window.location.origin}/proposal/${saved.shareToken}`;
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Private review link copied.");
    } catch {
      setNotice(`Review link: ${url}`);
    }
  }

  const shareUrl = `/proposal/${contract.shareToken}`;
  const whatsappHref = typeof window !== "undefined" && contract.data.clientPhone
    ? `https://wa.me/${contract.data.clientPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${contract.data.clientName || ""}, your CINEM project agreement is ready for review: ${window.location.origin}${shareUrl}`)}`
    : "";

  return (
    <div className="min-h-screen bg-surface py-8 sm:py-10">
      <div className="container-page">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div><Link href="/admin/contracts" className="text-sm font-semibold text-brand">← All contracts</Link><h1 className="mt-3 text-2xl font-semibold">Edit agreement</h1><p className="mt-1 text-xs text-faint">Encrypted draft · Updated {new Date(contract.updatedAt).toLocaleString()}</p></div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={generateProposal} disabled={saving} className="btn-primary"><Icon name="spark" className="h-4 w-4" /> AI proposal</button>
            <button type="button" onClick={createInvoice} disabled={saving} className="btn-secondary">Create invoice</button>
            {contract.enquiryId ? <button type="button" onClick={kickoff} disabled={saving} className="btn-secondary">Start kickoff</button> : null}
            {contract.status === "shared" ? <Link href={shareUrl} target="_blank" className="btn-secondary">Preview</Link> : null}
            {contract.status === "shared" && whatsappHref ? <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary">Share on WhatsApp</a> : null}
            {contract.status === "shared" ? <button type="button" onClick={() => save("draft")} disabled={saving} className="btn-secondary">Unpublish</button> : null}
            <button type="button" onClick={() => save()} disabled={saving} className="btn-secondary">{saving ? "Saving…" : contract.status === "shared" ? "Save changes" : "Save draft"}</button>
            <button type="button" onClick={share} disabled={saving} className="btn-primary"><Icon name="arrow" className="h-4 w-4" /> {contract.status === "shared" ? "Copy review link" : "Publish &amp; copy link"}</button>
          </div>
        </div>
        {notice ? <p role="status" className="mt-4 rounded-xl border border-line bg-elevated px-4 py-3 text-sm text-muted">{notice}</p> : null}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <section className="space-y-6 rounded-3xl border border-line bg-elevated p-5 shadow-xl shadow-black/5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Client name" value={contract.data.clientName} onChange={(v) => change("clientName", v)} />
              <Field label="Company" value={contract.data.clientCompany} onChange={(v) => change("clientCompany", v)} />
              <Field label="Client email" type="email" value={contract.data.clientEmail} onChange={(v) => change("clientEmail", v)} />
              <Field label="WhatsApp number" value={contract.data.clientPhone} onChange={(v) => change("clientPhone", v)} />
              <Field label="Client address" value={contract.data.clientAddress} onChange={(v) => change("clientAddress", v)} />
              <div className="sm:col-span-2"><Field label="Agreement / project title" value={contract.data.projectTitle} onChange={(v) => change("projectTitle", v)} /></div>
              <Field label="Effective date" type="date" value={contract.data.effectiveDate} onChange={(v) => change("effectiveDate", v)} />
              <Field label="Proposal valid until" type="date" value={contract.data.validUntil} onChange={(v) => change("validUntil", v)} />
              <Field label="Currency" value={contract.data.currency} onChange={(v) => change("currency", v)} />
              <Field label="Total project fee" value={contract.data.totalFee} onChange={(v) => change("totalFee", v)} placeholder="e.g. 12,500" />
              <Field label="Delivery timeline" value={contract.data.timeline} onChange={(v) => change("timeline", v)} />
              <Field label="Included revisions" value={contract.data.revisions} onChange={(v) => change("revisions", v)} />
              <Field label="Support period" value={contract.data.supportPeriod} onChange={(v) => change("supportPeriod", v)} />
              <Field label="Governing law / forum" value={contract.data.governingLaw} onChange={(v) => change("governingLaw", v)} />
            </div>
            {textFields.map((field) => <label key={field.key} className="block"><span className="text-sm font-semibold">{field.label}</span>{field.hint ? <span className="ml-2 text-xs text-faint">{field.hint}</span> : null}<textarea value={contract.data[field.key]} onChange={(event) => change(field.key, event.target.value)} rows={field.rows || 4} maxLength={10000} className={`${inputClass} mt-2 resize-y`} /></label>)}
          </section>

          <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
            <div className="rounded-3xl border border-brand/20 bg-brand/5 p-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Safe workflow</p><ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted"><li>1. Auto-fill from the enquiry.</li><li>2. Confirm scope, exclusions, fee and jurisdiction.</li><li>3. Save, preview and publish the private link.</li><li>4. Client reviews; export PDF for formal signing.</li></ol></div>
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm leading-relaxed text-muted"><strong className="text-ink">Important:</strong> this builder creates a strong commercial draft, not jurisdiction-specific legal advice or an electronic signature. Have your lawyer approve the master clauses once; project-specific fields can then be reused safely.</div>
            <div className="rounded-3xl border border-line bg-elevated p-6"><h2 className="font-semibold">Version history</h2><div className="mt-4 max-h-56 space-y-2 overflow-y-auto">{versions.map((version) => <div key={version.id} className="flex items-center justify-between gap-3 rounded-xl bg-surface p-3"><div><p className="text-xs font-semibold">Version {version.version}</p><p className="text-[0.68rem] text-faint">{new Date(version.createdAt).toLocaleString()}</p></div><button onClick={() => restore(version.version)} className="text-xs font-semibold text-brand">Restore</button></div>)}{!versions.length ? <p className="text-xs text-faint">History starts with the next save.</p> : null}</div></div>
            <div className="rounded-3xl border border-line bg-elevated p-6"><h2 className="font-semibold">Client responses</h2><div className="mt-4 max-h-64 space-y-3 overflow-y-auto">{feedback.map((item) => <div key={item.id} className="rounded-xl bg-surface p-3"><div className="flex justify-between gap-2"><span className="text-xs font-semibold capitalize">{item.type.replace("_", " ")}</span><span className="text-[0.65rem] text-faint">{new Date(item.createdAt).toLocaleDateString()}</span></div><p className="mt-1 text-xs text-muted">{item.name} · {item.email}</p>{item.signatureName ? <p className="mt-2 text-xs font-semibold text-emerald-600">E-signed by {item.signatureName} · version {item.documentVersion}</p> : null}{item.message ? <p className="mt-2 text-xs leading-5">{item.message}</p> : null}</div>)}{!feedback.length ? <p className="text-xs text-faint">Comments and approvals from the private link appear here.</p> : null}</div></div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string }) {
  return <label className="block"><span className="text-sm font-semibold">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} maxLength={500} className={`${inputClass} mt-2`} /></label>;
}
