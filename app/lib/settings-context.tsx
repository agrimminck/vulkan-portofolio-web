"use client";

import { createContext, useContext } from "react";
import type { PortfolioSettings } from "./settings";
import { DEFAULT_SETTINGS } from "./settings";

export const SettingsContext = createContext<PortfolioSettings>(DEFAULT_SETTINGS);

export function useSettings() {
  return useContext(SettingsContext);
}
