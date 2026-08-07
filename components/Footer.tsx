"use client";

import { site } from "@/lib/data";
import { useI18n } from "@/lib/i18n-provider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="text-xs">{t("footer.tagline")}</p>
      </div>
    </footer>
  );
}