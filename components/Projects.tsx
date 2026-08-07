"use client";

import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/lib/data";
import { useI18n } from "@/lib/i18n-provider";

export function Projects() {
  const { t } = useI18n();
  return (
    <section id="proyek" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeader
        eyebrow={t("proj.eyebrow")}
        title={t("proj.title")}
        sub={t("proj.sub")}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <a
              href={p.url ?? "#proyek"}
              {...(p.url
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_30px_-10px_rgba(110,231,183,0.25)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {t(p.tag)}
                </span>
                <span className="text-xs text-muted">{p.year}</span>
              </div>
              <h3 className="flex items-center gap-2 text-lg font-semibold transition group-hover:text-accent">
                {p.title}
                {p.url && (
                  <ExternalLink
                    size={14}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(p.desc)}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}