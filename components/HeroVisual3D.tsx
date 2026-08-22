"use client";

import Image from "next/image";
import { Icon } from "./Icon";

export function HeroVisual3D() {
  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--hero-ry", `${x * 8}deg`);
    event.currentTarget.style.setProperty("--hero-rx", `${y * -7}deg`);
  }

  function reset(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--hero-ry", "0deg");
    event.currentTarget.style.setProperty("--hero-rx", "0deg");
  }

  return (
    <div onPointerMove={move} onPointerLeave={reset} className="hero-3d-stage relative mx-auto w-full max-w-2xl py-5 lg:py-10">
      <div className="hero-3d-frame relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0e]">
        <Image src="/images/hero/hero-right.webp" alt="CINEM digital product, AI and growth command centre" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/5" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      <div className="hero-3d-chip glass-panel absolute -left-3 top-1/3 hidden items-center gap-2 rounded-2xl border border-line/70 px-4 py-3 text-xs font-semibold text-ink sm:flex lg:-left-8">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-bg"><Icon name="code" className="h-3.5 w-3.5" /></span>
        Product engineering
      </div>
      <div className="hero-3d-chip glass-panel absolute -right-3 top-16 hidden items-center gap-2 rounded-2xl border border-line/70 px-4 py-3 text-xs font-semibold text-ink sm:flex lg:-right-7">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-bg"><Icon name="spark" className="h-3.5 w-3.5" /></span>
        AI systems
      </div>
      <div className="hero-3d-chip glass-panel absolute -bottom-1 right-10 hidden items-center gap-2 rounded-2xl border border-line/70 px-4 py-3 text-xs font-semibold text-ink sm:flex">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-bg"><Icon name="growth" className="h-3.5 w-3.5" /></span>
        Growth engine
      </div>
    </div>
  );
}
