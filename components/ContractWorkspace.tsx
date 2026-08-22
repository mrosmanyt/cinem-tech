"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContractRecord } from "@/lib/contracts";
import type { EnquiryRecord } from "@/lib/enquiry-types";
import { Icon } from "./Icon";

export function ContractWorkspace({ contracts, enquiries, initialEnquiryId = "" }: {
  contracts: ContractRecord[];
  enquiries: EnquiryRecord[];
  initialEnquiryId?: string;
}) {
  const router = useRouter();
  const [enquiryId, setEnquiryId] = useState(initialEnquiryId);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function create() {
    setCreating(true);
    setError("");
    try {
      const response = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enquiryId: enquiryId || undefined }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not create the contract.");
      router.push(`/admin/contracts/${result.contract.id}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not create the contract.");
      setCreating(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface py-8 sm:py-12">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/admin" className="text-sm font-semibold text-brand">← Enquiry dashboard</Link>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">Deal desk</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Contracts &amp; proposals</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">Start from an enquiry, tailor the commercial details, then publish a private review link or save a PDF.</p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-line bg-elevated p-5 shadow-xl shadow-black/5 sm:p-7">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <label htmlFor="contract-enquiry" className="text-sm font-semibold">Start a new agreement</label>
              <select id="contract-enquiry" value={enquiryId} onChange={(event) => setEnquiryId(event.target.value)} className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none focus:border-brand">
                <option value="">Blank CINEM template</option>
                {enquiries.map((enquiry) => <option key={enquiry.id} value={enquiry.id}>{enquiry.name}{enquiry.company ? ` — ${enquiry.company}` : ""}</option>)}
              </select>
            </div>
            <button type="button" onClick={create} disabled={creating} className="btn-primary">
              <Icon name="spark" className="h-4 w-4" /> {creating ? "Preparing…" : "Create draft"}
            </button>
          </div>
          {error ? <p role="alert" className="mt-4 text-sm text-red-600">{error}</p> : null}
        </section>

        <section className="mt-7">
          <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">Saved agreements</h2><span className="text-sm text-faint">{contracts.length} total</span></div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {contracts.map((contract) => (
              <Link key={contract.id} href={`/admin/contracts/${contract.id}`} className="card-hover !rounded-2xl !p-5">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="text-sm font-semibold">{contract.data.projectTitle}</p><p className="mt-1 text-sm text-muted">{contract.data.clientCompany || contract.data.clientName || "Client details pending"}</p></div>
                  <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${contract.status === "shared" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}>{contract.status}</span>
                </div>
                <p className="mt-4 text-xs text-faint">Updated {new Date(contract.updatedAt).toLocaleString()}</p>
              </Link>
            ))}
            {!contracts.length ? <div className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">No contracts yet. Choose an enquiry above to create the first draft.</div> : null}
          </div>
        </section>
      </div>
    </div>
  );
}
