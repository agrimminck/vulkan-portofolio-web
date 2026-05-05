"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; toggle: () => void }>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export function LangProvider({ defaultLang = "en", children }: { defaultLang?: Lang; children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [userOverride, setUserOverride] = useState(false);

  // Sync when defaultLang arrives from DB, but only if user hasn't manually toggled
  useEffect(() => {
    if (!userOverride) setLang(defaultLang);
  }, [defaultLang, userOverride]);

  const toggle = () => {
    setUserOverride(true);
    setLang((l) => (l === "en" ? "es" : "en"));
  };

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
