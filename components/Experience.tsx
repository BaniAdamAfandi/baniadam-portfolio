"use client";

import { GraduationCap, Briefcase, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { experiences, education } from "@/lib/data";
import { useI18n } from "@/lib/i18n-provider";

export function Experience() {
  const { t } = useI18n();

  return (
    <section
      id="pengalaman"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24"
    >
      <SectionHeader
        eyebrow={t("exp.eyebrow")}
        title={t("exp.title")}
        sub={t("exp.sub")}
      />

      <div className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Briefcase size={16} className="text-accent" />
        <span>{t("exp.workHeader")}</span>
      </div>

      <div className="relative space-y-6 border-l border-line pl-6">
        {experiences.map((exp, i) => (
          <Reveal key={exp.role + exp.company} delay={i * 0.06}>
            <div className="relative rounded-2xl border border-line bg-card p-6">
              <span className="absolute -left-[27px] top-7 h-2 w-2 rounded-full bg-accent" />
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <span className="text-sm text-accent">{exp.company}</span>
                <span className="text-xs text-muted">· {t(exp.type)}</span>
              </div>
              <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <span>{t(exp.period)}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {t(exp.location)}
                </span>
              </div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                {exp.bullets.map((b) => (
                  <li key={b}>{t(b)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 mb-6 flex items-center gap-2 text-sm text-muted">
        <GraduationCap size={16} className="text-accent" />
        <span>{t("exp.eduHeader")}</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.08}>
            <div className="rounded-2xl border border-line bg-card p-6">
              <h3 className="text-lg font-semibold">{edu.school}</h3>
              <p className="mt-1 text-sm text-accent">{t(edu.degree)}</p>
              <p className="mt-1 text-xs text-muted">{edu.period}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t(edu.focus)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {edu.orgs.map((org) => (
                  <span
                    key={org}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}