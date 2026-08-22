"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { categories, services } from "@/lib/services";

const startOptions = [
  { value: "demo", label: "Start with a free demo", body: "See the direction before committing.", icon: "browser" },
  { value: "direct", label: "Scope my project", body: "Get a proposal, milestones and timeline.", icon: "layers" },
  { value: "question", label: "Talk through an idea", body: "Get an honest expert recommendation.", icon: "chat" },
];

const budgets = [
  "Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000",
  "$50,000 – $150,000", "$150,000+", "Monthly retainer", "Not sure yet",
];
const timelines = [
  "As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Just exploring",
];

const fieldClass = "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-sm text-ink placeholder:text-faint transition-all focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10";
const labelClass = "mb-2 block text-sm font-semibold text-ink";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [startType, setStartType] = useState("demo");
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  function toggleService(name: string) {
    setSelected((current) => current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name]);
  }

  function nextStep() {
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
    const fields = Array.from(panel?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select") ?? []);
    const invalid = fields.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return;
    }
    setStep((current) => Math.min(3, current + 1));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startType, services: selected }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We couldn't send this just now.");
      setStatus("sent");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We couldn't send this just now.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="overflow-hidden rounded-4xl border border-brand/25 bg-elevated shadow-2xl shadow-brand/10">
        <div className="grid-lines relative flex min-h-[34rem] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="glow pointer-events-none absolute inset-0 opacity-50 blur-3xl" />
          <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-brand/25 bg-brand text-bg shadow-xl shadow-brand/25">
            <Icon name="check" className="h-8 w-8" strokeWidth={2.2} />
          </span>
          <p className="relative mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-brand">Brief received</p>
          <h3 className="relative mt-3 text-3xl font-semibold">You're in the project desk</h3>
          <p className="prose-body relative mt-4 max-w-lg">
            A delivery lead will review your brief and reply within one business day with the clearest next step — a demo, a scoped proposal or a direct answer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="scroll-mt-28 overflow-hidden rounded-4xl border border-line bg-elevated shadow-2xl shadow-black/5 dark:shadow-black/30">
      <div className="relative overflow-hidden border-b border-line bg-[#111112] px-6 py-7 text-white sm:px-9">
        <div className="glow pointer-events-none absolute -right-20 -top-36 h-72 w-72 opacity-70 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">CINEM Private Project Desk</p>
            <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Let's shape your next release</h2>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur">Step {step} of 3</span>
        </div>
        <div className="relative mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-white via-zinc-300 to-zinc-500 transition-all duration-500" style={{ width: `${Math.round((step / 3) * 100)}%` }} />
        </div>
        <div className="relative mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
          <span className="flex items-center gap-1.5"><Icon name="shield" className="h-3.5 w-3.5 text-zinc-300" /> Private &amp; confidential</span>
          <span className="flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5 text-zinc-300" /> One-business-day reply</span>
        </div>
      </div>

      <div className="p-6 sm:p-9">
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="companyWebsite">Company website verification</label>
          <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </div>
        <section data-step="1" className={step === 1 ? "space-y-9" : "hidden"}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Your preferred start</p>
            <h3 className="mt-2 text-xl font-semibold">How should we begin?</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {startOptions.map((option) => {
                const active = startType === option.value;
                return (
                  <button key={option.value} type="button" onClick={() => setStartType(option.value)} aria-pressed={active} className={`group rounded-2xl border p-4 text-left transition-all ${active ? "border-brand bg-brand/10 shadow-lg shadow-brand/10" : "border-line bg-surface hover:-translate-y-0.5 hover:border-brand/40"}`}>
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-brand text-bg" : "bg-elevated text-muted"}`}><Icon name={option.icon} className="h-4 w-4" /></span>
                    <span className="mt-4 block text-sm font-semibold leading-snug">{option.label}</span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-muted">{option.body}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Capabilities</p><h3 className="mt-2 text-xl font-semibold">What do you need?</h3></div>
              <span className="text-xs text-faint">Select any that apply</span>
            </div>
            <div className="mt-5 space-y-5">
              {categories.map((category) => (
                <fieldset key={category.slug}>
                  <legend className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-faint">{category.name}</legend>
                  <div className="flex flex-wrap gap-2">
                    {services.filter((service) => service.category === category.slug).map((service) => {
                      const active = selected.includes(service.name);
                      return (
                        <button key={service.slug} type="button" onClick={() => toggleService(service.name)} aria-pressed={active} className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${active ? "border-brand bg-brand text-bg shadow-md shadow-brand/20" : "border-line bg-surface text-muted hover:border-brand/40 hover:text-ink"}`}>
                          {active ? "✓ " : "+ "}{service.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
        </section>

        <section data-step="2" className={step === 2 ? "space-y-7" : "hidden"}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Your details</p>
            <h3 className="mt-2 text-xl font-semibold">Who are we building with?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">We use this only to respond to your project enquiry.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="name" className={labelClass}>Full name <span className="text-brand">*</span></label><input id="name" name="name" required maxLength={120} autoComplete="name" placeholder="Jane Cooper" className={fieldClass} /></div>
            <div><label htmlFor="email" className={labelClass}>Work email <span className="text-brand">*</span></label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="jane@company.com" className={fieldClass} /></div>
            <div><label htmlFor="company" className={labelClass}>Company</label><input id="company" name="company" maxLength={160} autoComplete="organization" placeholder="Company name" className={fieldClass} /></div>
            <div><label htmlFor="phone" className={labelClass}>Phone / WhatsApp</label><input id="phone" name="phone" type="tel" maxLength={50} autoComplete="tel" placeholder="+1 555 000 0000" className={fieldClass} /></div>
            <div className="sm:col-span-2"><label htmlFor="website" className={labelClass}>Current website or product URL</label><input id="website" name="website" type="url" maxLength={500} inputMode="url" placeholder="https://" className={fieldClass} /></div>
          </div>
        </section>

        <section data-step="3" className={step === 3 ? "space-y-7" : "hidden"}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">The brief</p>
            <h3 className="mt-2 text-xl font-semibold">What should success look like?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">A few clear sentences are enough. We'll ask sharper questions after reviewing it.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="budget" className={labelClass}>Budget range</label><select id="budget" name="budget" className={fieldClass} defaultValue=""><option value="" disabled>Select a range</option>{budgets.map((budget) => <option key={budget}>{budget}</option>)}</select></div>
            <div><label htmlFor="timeline" className={labelClass}>Target timeline</label><select id="timeline" name="timeline" className={fieldClass} defaultValue=""><option value="" disabled>Select a timeline</option>{timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}</select></div>
            <div className="sm:col-span-2"><label htmlFor="message" className={labelClass}>Project brief <span className="text-brand">*</span></label><textarea id="message" name="message" required minLength={20} maxLength={5000} rows={7} placeholder="What are you building, who is it for, and what result matters most?" className={`${fieldClass} resize-y`} /></div>
          </div>
          <div className="rounded-2xl border border-brand/20 bg-brand/5 p-4 text-sm leading-relaxed text-muted"><strong className="text-ink">What happens next:</strong> a delivery lead reviews the brief, checks feasibility and replies with a recommended first step. No automated sales sequence.</div>
        </section>

        {status === "error" ? <p role="alert" className="mt-6 rounded-2xl border border-red-500/25 bg-red-500/5 px-4 py-3 text-sm text-muted">{error} Please try once more or email us directly.</p> : null}

        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="btn-secondary"><Icon name="arrow" className="h-4 w-4 rotate-180" /> Back</button> : <p className="text-xs leading-relaxed text-faint">No payment or commitment required.</p>}
          {step < 3 ? <button type="button" onClick={nextStep} className="btn-primary">Continue <Icon name="arrow" className="h-4 w-4" /></button> : <button type="submit" disabled={status === "sending"} className="btn-primary">{status === "sending" ? "Sending brief…" : "Send private brief"}{status === "sending" ? null : <Icon name="arrow" className="h-4 w-4" />}</button>}
        </div>
      </div>
    </form>
  );
}
