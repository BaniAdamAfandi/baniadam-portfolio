"use client";

import { Gauge, TrendingUp, Code2, LineChart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/lib/data";
import { useI18n } from "@/lib/i18n-provider";

const icons = [Gauge, TrendingUp, Code2, LineChart];

export function Services() {
  const { t } = useI18n();
  return (
    <section id="layanan" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeader
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        sub={t("services.sub")}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div className="group flex h-full gap-4 rounded-2xl border border-line bg-card p-6 transition hover:border-accent/50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t(s.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {t(s.desc)}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}