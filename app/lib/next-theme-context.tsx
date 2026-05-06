"use client";

import { createContext, useContext } from "react";
import type { ThemeId } from "./projects";

type NextThemeContextValue = {
  nextThemeId: ThemeId;
  nextLabel: string;
  onNext: (x: number, y: number) => void;
};

export const NextThemeContext = createContext<NextThemeContextValue>({
  nextThemeId: "metropolis",
  nextLabel: "Next",
  onNext: () => {},
});

export function useNextTheme() {
  return useContext(NextThemeContext);
}
