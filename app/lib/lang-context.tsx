"use client";

import { createContext, useContext, useState } from "react";
import type { Lang } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; toggle: () => void }>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export function LangProvider({ defaultLang = "en", children }: { defaultLang?: Lang; children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const toggle = () => setLang((l) => (l === "en" ? "es" : "en"));
  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
