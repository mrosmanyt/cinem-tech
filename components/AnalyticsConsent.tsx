"use client";

import { useEffect, useState } from "react";

type Choice = "accepted" | "rejected" | null;

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { setChoice(localStorage.getItem("cinem-cookie-consent") as Choice); setReady(true); }, []);
  useEffect(() => {
    if (choice !== "accepted") return;
    const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    const clarity = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (ga && !document.querySelector(`script[data-cinem-ga]`)) {
      const external = document.createElement("script"); external.async = true; external.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`; external.dataset.cinemGa = "true"; document.head.appendChild(external);
      const win = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }; win.dataLayer = win.dataLayer || []; win.gtag = (...args: unknown[]) => win.dataLayer!.push(args); win.gtag("js", new Date()); win.gtag("config", ga, { anonymize_ip: true });
    }
    if (clarity && !document.querySelector(`script[data-cinem-clarity]`)) {
      const script = document.createElement("script"); script.dataset.cinemClarity = "true"; script.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarity}");`; document.head.appendChild(script);
    }
  }, [choice]);
  function choose(value: Exclude<Choice, null>) { localStorage.setItem("cinem-cookie-consent", value); setChoice(value); }
  if (!ready || choice) return null;
  return <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-elevated p-5 shadow-2xl"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm leading-6 text-muted">We use optional analytics cookies to understand website performance. Essential admin and security cookies always remain active. <a href="/privacy#cookies" className="font-semibold text-brand">Privacy details</a></p><div className="flex shrink-0 gap-2"><button onClick={() => choose("rejected")} className="btn-secondary !px-4 !py-2">Reject</button><button onClick={() => choose("accepted")} className="btn-primary !px-4 !py-2">Accept</button></div></div></div>;
}
