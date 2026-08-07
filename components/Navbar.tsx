"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { site } from "@/lib/data";
import { useI18n } from "@/lib/i18n-provider";
import type { MsgKey } from "@/lib/i18n";

const NAV_LINKS: { href: string; key: MsgKey }[] = [
  { href: "#tentang", key: "nav.about" },
  { href: "#keahlian", key: "nav.skills" },
  { href: "#pengalaman", key: "nav.experience" },
  { href: "#proyek", key: "nav.projects" },
  { href: "#layanan", key: "nav.services" },
  { href: "#kontak", key: "nav.contact" },
];

function LangSwitch({
  locale,
  setLocale,
  t,
}: {
  locale: "id" | "en";
  setLocale: (l: "id" | "en") => void;
  t: (k: MsgKey) => string;
}) {
  const codes = ["id", "en"] as const;
  return (
    <div
      role="group"
      aria-label={t("lang.toggle")}
      className="inline-flex items-center gap-0.5 rounded-full border border-line p-0.5"
    >
      <Languages size={14} aria-hidden className="ml-1.5 text-muted" />
      {codes.map((c) => {
        const active = locale === c;
        return (
          <button
            key={c}
            onClick={() => setLocale(c)}
            aria-pressed={active}
            aria-label={t("lang.current") + ": " + c.toUpperCase()}
            className={
              active
                ? "rounded-full bg-accent px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#06281c]"
                : "rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted transition hover:text-fg"
            }
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a
            href="#"
            className="text-sm font-semibold tracking-tight text-accent"
          >
            ba<span className="text-fg">.</span>afandi
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {t(l.key)}
              </a>
            ))}
            <LangSwitch locale={locale} setLocale={setLocale} t={t} />
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#06281c] transition hover:brightness-110"
            >
              {t("cta.contact")}
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LangSwitch locale={locale} setLocale={setLocale} t={t} />
            <button
              className="p-2 text-fg"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-b border-line bg-background md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-sm text-muted hover:bg-card hover:text-fg"
                >
                  {t(l.key)}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="mt-2 rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-[#06281c]"
              >
                {t("cta.contact")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
