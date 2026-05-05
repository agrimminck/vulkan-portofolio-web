"use client";

import { useState, useCallback, useRef, useEffect, createContext } from "react";
import { type ThemeId } from "./lib/projects";
import type { PortfolioSettings } from "./lib/settings";
import { DEFAULT_SETTINGS } from "./lib/settings";
import { LangProvider } from "./lib/lang-context";
import type { Lang } from "./lib/i18n";

export const SettingsContext = createContext<PortfolioSettings>(DEFAULT_SETTINGS);
import ThemeSwitcher from "./components/ThemeSwitcher";
import RefinedTheme from "./components/themes/RefinedTheme";
import MetropolisTheme from "./components/themes/MetropolisTheme";
import CorporateTheme from "./components/themes/CorporateTheme";
import CyberpunkTheme from "./components/themes/CyberpunkTheme";
import EditorialTheme from "./components/themes/EditorialTheme";
import OrganicTheme from "./components/themes/OrganicTheme";
import HolographicTheme from "./components/themes/HolographicTheme";

const THEMES_MAP: Record<ThemeId, React.ComponentType> = {
  refined: RefinedTheme,
  metropolis: MetropolisTheme,
  corporate: CorporateTheme,
  cyberpunk: CyberpunkTheme,
  editorial: EditorialTheme,
  organic: OrganicTheme,
  holographic: HolographicTheme,
};

export default function Home() {
  const [settings, setSettings] = useState<PortfolioSettings>(DEFAULT_SETTINGS);
  const [defaultLang, setDefaultLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<ThemeId>("metropolis");
  const [revealing, setRevealing] = useState<{ theme: ThemeId; x: number; y: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d: Partial<PortfolioSettings>) => {
        const merged = { ...DEFAULT_SETTINGS, ...d };
        setSettings(merged);
        if (merged.default_theme) setTheme(merged.default_theme as ThemeId);
        if (merged.default_lang) setDefaultLang(merged.default_lang as Lang);
      })
      .catch(() => {});
  }, []);

  const handleThemeChange = useCallback(
    (newTheme: ThemeId, x: number, y: number) => {
      if (newTheme === theme || revealing) return;
      setRevealing({ theme: newTheme, x, y });
    },
    [theme, revealing],
  );

  useEffect(() => {
    if (!revealing) return;
    const t = setTimeout(() => {
      setTheme(revealing.theme);
      setRevealing(null);
    }, 900);
    return () => clearTimeout(t);
  }, [revealing]);

  const Current = THEMES_MAP[theme];
  const Next = revealing ? THEMES_MAP[revealing.theme] : null;

  return (
    <LangProvider defaultLang={defaultLang}>
    <SettingsContext.Provider value={settings}>
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="relative z-0">
        <Current />
      </div>

      {Next && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 theme-revealing"
          style={
            {
              ["--reveal-x" as string]: `${revealing!.x}px`,
              ["--reveal-y" as string]: `${revealing!.y}px`,
            } as React.CSSProperties
          }
        >
          <Next />
        </div>
      )}

      <ThemeSwitcher current={revealing?.theme ?? theme} onChange={handleThemeChange} />
    </main>
    </SettingsContext.Provider>
    </LangProvider>
  );
}
