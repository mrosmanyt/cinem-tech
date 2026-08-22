"use client";

import Image from "next/image";
import { Icon } from "./Icon";
import { liveProjects } from "@/lib/projects";

export function ProjectShowcase({ limit }: { limit?: number }) {
  const projects = limit
    ? [...liveProjects]
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
        .slice(0, limit)
    : liveProjects;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.url}
          className="project-3d"
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            const rect = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            event.currentTarget.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
            event.currentTarget.style.setProperty("--rx", `${(y - 0.5) * -6}deg`);
            event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
            event.currentTarget.style.setProperty("--my", `${y * 100}%`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--rx", "0deg");
            event.currentTarget.style.setProperty("--ry", "0deg");
          }}
        >
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-3d-inner card-hover group relative flex min-h-full flex-col overflow-hidden !p-0" aria-label={`Visit ${project.name} live website`}>
          <div className="project-3d-shine pointer-events-none absolute inset-0 z-20" />
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
            <Image
              src={project.image}
              alt={`${project.name} live website homepage`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
              Live project
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand">
                  {project.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
                  {project.name}
                </h3>
              </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all group-hover:border-brand/40 group-hover:bg-brand group-hover:text-bg">
                <Icon name="arrow" className="h-4 w-4 -rotate-45" />
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <span className="mt-5 text-xs font-medium text-faint">{project.domain}</span>
          </div>
          </a>
        </div>
      ))}
    </div>
  );
}
