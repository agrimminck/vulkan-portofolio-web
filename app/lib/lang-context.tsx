"use client";

import { createContext, useContext } from "react";
import type { Lang } from "./i18n";

export const LangContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "en",
  toggle: () => {},
});

export function useLang() {
  return useContext(LangContext);
}
