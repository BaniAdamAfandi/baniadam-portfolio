"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/data";
import { Download } from "lucide-react";
import { useI18n } from "@/lib/i18n-provider";

const Scene = dynamic(
  () => import("@/components/Scene").then((m) => m.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-64 animate-pulse rounded-full bg-card sm:h-80 sm:w-80" />
    ),
  }
);

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-16 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted"
          >
            <MapPin size={12} className="text-accent" />
            {t("hero.location")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl"
          >
            {site.name.split(" ")[0]}{" "}
            <span className="text-accent">{site.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-lg text-muted sm:text-xl"
          >
            {t("hero.headline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-1 text-sm text-muted/70"
          >
            {t("hero.role")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#proyek"
              className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-[#06281c] transition hover:brightness-110"
            >
              {t("hero.ctaProjects")}
            </a>
            <a
              href="#kontak"
              className="rounded-full border border-line px-5 py-3 text-sm font-medium text-fg transition hover:border-accent/60 hover:text-accent"
            >
              {t("hero.ctaContact")}
            </a>
            <a
              href="/CV-Bani-Adam-Afandi.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-5 py-3 text-sm font-medium text-accent transition hover:bg-accent/10"
            >
              <Download size={15} />
              {t("hero.ctaCv")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto"
        >
          <Scene />
        </motion.div>
      </div>
    </section>
  );
}