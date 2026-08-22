import { notFound } from "next/navigation";
import { PrintInvoiceButton } from "@/components/PrintInvoiceButton";
import { getSharedInvoice } from "@/lib/invoices";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Private Invoice", robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const invoice = getSharedInvoice((await params).token); if (!invoice) notFound(); const d = invoice.data;
  return <div className="min-h-screen bg-slate-100 py-8 text-slate-900"><div className="no-print mx-auto mb-4 flex max-w-4xl justify-end px-4"><PrintInvoiceButton /></div><article className="contract-paper mx-auto max-w-4xl bg-white p-8 shadow-xl sm:p-14">
<header className="flex justify-between gap-6 border-b-2 border-slate-900 pb-8"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-700">{site.name}</p><h1 className="mt-2 text-4xl font-semibold">Invoice</h1><p className="mt-2 text-sm text-slate-500">{invoice.number}</p></div><div className="text-right text-sm"><strong>{site.legalName}</strong><br />{site.email}<br />{site.url}</div></header>
    <dl className="mt-10 grid gap-6 sm:grid-cols-2"><div><dt className="text-xs font-semibold uppercase text-slate-500">Bill to</dt><dd className="mt-2 font-semibold">{d.clientCompany || d.clientName}</dd><dd>{d.clientName}</dd><dd>{d.clientEmail}</dd></div><div className="sm:text-right"><dt className="text-xs font-semibold uppercase text-slate-500">Dates</dt><dd className="mt-2">Issued: {d.issueDate}</dd><dd>Due: {d.dueDate}</dd><dd className="mt-2 font-semibold uppercase">{invoice.status}</dd></div></dl>
    <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200"><div className="grid grid-cols-[1fr_auto] bg-slate-100 px-5 py-3 text-xs font-semibold uppercase"><span>Description</span><span>Amount</span></div><div className="grid grid-cols-[1fr_auto] gap-5 px-5 py-6"><span>{d.description}</span><strong>{d.currency} {d.amount}</strong></div></div><div className="mt-6 flex justify-end"><div className="w-64 border-t-2 border-slate-900 pt-3 text-lg font-semibold"><div className="flex justify-between"><span>Total</span><span>{d.currency} {d.amount}</span></div></div></div>
    <section className="mt-10 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600"><strong className="text-slate-900">Payment notes</strong><p className="mt-2 whitespace-pre-wrap">{d.notes}</p></section>
  </article></div>;
}
