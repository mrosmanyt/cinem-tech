"use client";
export function PrintInvoiceButton() { return <button onClick={() => window.print()} className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">Print / Save PDF</button>; }
