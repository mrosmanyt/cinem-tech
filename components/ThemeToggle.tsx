"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark" | "aurora";

const themes: { value: Theme; label: string; hint: string; icon: string; swatch: string }[] = [
  { value: "light", label: "Studio", hint: "Clean monochrome", icon: "sun", swatch: "bg-white" },
  { value: "dark", label: "Charcoal", hint: "Deep monochrome", icon: "moon", swatch: "bg-[#111111]" },
  { value: "aurora", label: "Graphite", hint: "Soft grey", icon: "spark", swatch: "bg-gradient-to-br from-zinc-300 to-zinc-700" },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme !== "light");
  root.classList.toggle("theme-aurora", theme === "aurora");
  root.dataset.theme = theme;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cinem-theme") as Theme | null;
    const initial = stored === "aurora" || stored === "dark" || stored === "light"
      ? stored
      : document.documentElement.classList.contains("theme-aurora")
        ? "aurora"
        : document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    function close(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("cinem-theme", next);
    setOpen(false);
  }

  const active = themes.find((item) => item.value === theme)!;

  return (
    <div ref={wrapper} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((current) => !current)} aria-label="Choose website theme" aria-expanded={open} className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-elevated px-3 text-muted shadow-sm transition-all hover:border-brand/40 hover:text-ink">
        {mounted ? <Icon name={active.icon} className="h-[17px] w-[17px]" /> : <span className="h-[17px] w-[17px]" />}
        <span className="hidden text-xs font-semibold xl:inline">{mounted ? active.label : "Theme"}</span>
      </button>

      {open ? (
        <div className="animate-fade-up absolute right-0 top-full z-[70] mt-3 w-64 rounded-2xl border border-line bg-elevated p-2 shadow-2xl shadow-black/15 dark:shadow-black/50">
          <p className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-faint">Visual theme</p>
          {themes.map((item) => (
            <button key={item.value} type="button" onClick={() => choose(item.value)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${theme === item.value ? "bg-brand/10" : "hover:bg-surface"}`}>
              <span className={`h-8 w-8 rounded-lg border border-line shadow-inner ${item.swatch}`} />
              <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{item.label}</span><span className="block text-xs text-faint">{item.hint}</span></span>
              {theme === item.value ? <Icon name="check" className="h-4 w-4 text-brand" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
