"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { skills } from "@/lib/data";
import { useI18n } from "@/lib/i18n-provider";

function SkillCard({
  title,
  items,
  delay,
}: (typeof skills)[number] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="rounded-2xl border border-line bg-card p-6"
    >
      <h3 className="mb-6 text-lg font-semibold">{title}</h3>
      <div className="space-y-4">
        {items.map((s) => (
          <div key={s.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span>{s.name}</span>
              <span className="text-xs text-muted">{s.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: delay + 0.2,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-accent"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="keahlian" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeader
        eyebrow={t("skills.eyebrow")}
        title={t("skills.title")}
        sub={t("skills.sub")}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {skills.map((cat, i) => (
          <SkillCard key={cat.title} {...cat} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}