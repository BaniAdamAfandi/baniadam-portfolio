"use client";

import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useI18n } from "@/lib/i18n-provider";

const BIO_KEYS = [
  "about.bio.1",
  "about.bio.2",
  "about.bio.3",
  "about.bio.4",
] as const;

const STATS = [
  { value: "5+", key: "about.stat.1" },
  { value: "20+", key: "about.stat.2" },
  { value: "3", key: "about.stat.3" },
  { value: "2+", key: "about.stat.4" },
] as const;

export function About() {
  const { t } = useI18n();

  return (
    <section id="tentang" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeader eyebrow={t("about.eyebrow")} title={t("about.title")} />
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="space-y-4 text-muted">
            {BIO_KEYS.map((k, i) => (
              <p key={i}>{t(k)}</p>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-3xl font-semibold text-accent">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{t(s.key)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}