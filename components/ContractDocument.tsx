import type { ContractRecord } from "@/lib/contracts";
import { providerDetails } from "@/lib/contracts";

function Lines({ value }: { value: string }) {
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.length > 1 ? <ul className="mt-3 list-disc space-y-2 pl-5">{lines.map((line, index) => <li key={`${line}-${index}`}>{line}</li>)}</ul> : <p className="mt-3 whitespace-pre-wrap">{value || "To be confirmed in writing."}</p>;
}

const standardClauses = [
  ["Change control", "Work outside the written scope requires a written change request stating its effect on fee and timeline. No additional charge applies until the client approves it."],
  ["Review and acceptance", "The client will provide one consolidated response within five business days of each milestone review. A deliverable is accepted when approved in writing, used in production, or when no material scope-based defect is reported during that review period."],
  ["Intellectual property", "After final cleared payment, project-specific source code and approved design files transfer to the client. CINEM retains pre-existing tools and reusable libraries while granting the client a perpetual licence to embedded elements required to use the deliverable."],
  ["Confidentiality", "Both parties will protect non-public business, technical and customer information with reasonable safeguards and disclose it only to people who need it for delivery."],
  ["Third-party services", "Hosting, domains, app stores, payment processors, AI models and external APIs remain subject to their providers' fees, availability and terms unless expressly included above."],
  ["Suspension and termination", "Either party may terminate for a material breach not cured within ten business days after written notice. CINEM may pause work for an overdue undisputed invoice or missing client dependency."],
  ["Liability", "Neither party is liable for indirect or consequential loss. Except for fraud, deliberate misconduct, confidentiality breaches or unpaid fees, aggregate liability is limited to fees paid under this project."],
];

export function ContractDocument({ contract }: { contract: ContractRecord }) {
  const d = contract.data;
  return (
    <article className="contract-paper mx-auto max-w-4xl bg-white px-6 py-10 text-slate-900 shadow-2xl shadow-black/10 sm:px-12 sm:py-14 lg:px-16">
      <header className="border-b-2 border-slate-900 pb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
<div><p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-700">CINEM · Project Agreement</p><h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">{d.projectTitle}</h1></div>
          <div className="text-sm leading-6 text-slate-600 sm:text-right"><strong className="block text-slate-950">{providerDetails.name}</strong><a href={providerDetails.website}>{providerDetails.website}</a><br /><a href={`mailto:${providerDetails.email}`}>{providerDetails.email}</a></div>
        </div>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
          <div><dt className="font-semibold text-slate-500">Prepared for</dt><dd className="mt-1 font-semibold">{d.clientCompany || d.clientName || "Client"}</dd><dd>{d.clientName}</dd><dd>{d.clientEmail}</dd><dd>{d.clientPhone}</dd><dd>{d.clientAddress}</dd></div>
          <div className="sm:text-right"><dt className="font-semibold text-slate-500">Agreement details</dt><dd className="mt-1">Effective: {d.effectiveDate || "To be confirmed"}</dd><dd>Offer valid until: {d.validUntil || "To be confirmed"}</dd><dd>Reference: {contract.id}</dd></div>
        </dl>
      </header>

      <div className="space-y-9 py-9 text-[0.93rem] leading-7 text-slate-700">
        <Section number="1" title="Purpose and scope"><Lines value={d.scope} /></Section>
        <Section number="2" title="Deliverables"><Lines value={d.deliverables} /></Section>
        <Section number="3" title="Milestones and delivery"><p className="mt-3"><strong>Target timeline:</strong> {d.timeline || "To be confirmed"}</p><Lines value={d.milestones} /></Section>
        <Section number="4" title="Fees and payment"><p className="mt-3"><strong>Total project fee:</strong> {d.totalFee ? `${d.currency} ${d.totalFee}` : "To be confirmed"}</p><Lines value={d.paymentSchedule} /></Section>
        <Section number="5" title="Revisions, support and client inputs"><p className="mt-3"><strong>Included revisions:</strong> {d.revisions}</p><p className="mt-2"><strong>Post-launch support:</strong> {d.supportPeriod}</p><p className="mt-2"><strong>Client responsibilities:</strong> {d.clientResponsibilities}</p></Section>
        <Section number="6" title="Standard commercial clauses"><div className="mt-4 space-y-5">{standardClauses.map(([title, body]) => <div key={title}><h3 className="font-semibold text-slate-950">{title}</h3><p className="mt-1">{body}</p></div>)}</div></Section>
        {d.specialTerms ? <Section number="7" title="Special terms and approved exceptions"><Lines value={d.specialTerms} /></Section> : null}
        <Section number={d.specialTerms ? "8" : "7"} title="Governing law and complete agreement"><p className="mt-3">Governing law / dispute forum: <strong>{d.governingLaw}</strong>.</p><p className="mt-2">This agreement, its approved attachments and written change orders form the complete project agreement and replace earlier discussions about the same scope.</p></Section>
      </div>

      <footer className="grid gap-10 border-t border-slate-300 pt-10 text-sm sm:grid-cols-2">
        <Signature label="For CINEM" name={providerDetails.name} />
        <Signature label="For the client" name={d.clientCompany || d.clientName} />
      </footer>
      <p className="mt-10 text-center text-[0.68rem] leading-5 text-slate-400">Private commercial draft generated through the CINEM Deal Desk. Signature and jurisdiction-specific legal review remain the parties' responsibility.</p>
    </article>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
return <section><p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">Clause {number}</p><h2 className="mt-1 text-xl font-semibold text-slate-950">{title}</h2>{children}</section>;
}

function Signature({ label, name }: { label: string; name: string }) {
  return <div><p className="font-semibold text-slate-950">{label}</p><p className="mt-8 border-b border-slate-400 pb-2">Signature</p><p className="mt-3 border-b border-slate-400 pb-2">Name: {name}</p><p className="mt-3 border-b border-slate-400 pb-2">Date:</p></div>;
}
