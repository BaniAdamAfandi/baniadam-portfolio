"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translate, type Locale, type MsgKey } from "./i18n";

const STORAGE_KEY = "baniadam.locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // localStorage unavailable — fall through to navigator
  }
  try {
    return window.navigator.language.toLowerCase().startsWith("en") ? "en" : "id";
  } catch {
    return "id";
  }
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: MsgKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // First render is always Indonesian — never read navigator/localStorage
  // during render (hydration mismatch). Persisted choice is applied in effect.
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore storage failures
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: MsgKey, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}