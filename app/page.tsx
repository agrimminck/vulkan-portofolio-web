"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { visibleThemes, type ThemeId } from "./lib/projects";
import type { PortfolioSettings } from "./lib/settings";
import { DEFAULT_SETTINGS } from "./lib/settings";
import { LangContext } from "./lib/lang-context";
import { SettingsContext } from "./lib/settings-context";
import { NextThemeContext } from "./lib/next-theme-context";
import LangToggle from "./components/LangToggle";
import type { Lang } from "./lib/i18n";
import ThemeSwitcher from "./components/ThemeSwitcher";
import RefinedTheme from "./components/themes/RefinedTheme";
import MetropolisTheme from "./components/themes/MetropolisTheme";
import CorporateTheme from "./components/themes/CorporateTheme";
import CyberpunkTheme from "./components/themes/CyberpunkTheme";
import EditorialTheme from "./components/themes/EditorialTheme";
import OrganicTheme from "./components/themes/OrganicTheme";
import HolographicTheme from "./components/themes/HolographicTheme";
import NetflixTheme from "./components/themes/NetflixTheme";
import IceCitadelTheme from "./components/themes/IceCitadelTheme";
import TronTheme from "./components/themes/TronTheme";
import ArchitectureDiagram from "./components/ArchitectureDiagram";


const THEMES_MAP: Record<ThemeId, React.ComponentType> = {
  refined: RefinedTheme,
  metropolis: MetropolisTheme,
  corporate: CorporateTheme,
  cyberpunk: CyberpunkTheme,
  editorial: EditorialTheme,
  organic: OrganicTheme,
  holographic: HolographicTheme,
  netflix: NetflixTheme,
  "ice-citadel": IceCitadelTheme,
  tron: TronTheme,
};

export default function Home() {
  const [settings, setSettings] = useState<PortfolioSettings>(DEFAULT_SETTINGS);
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<ThemeId>("metropolis");
  const [revealing, setRevealing] = useState<{ theme: ThemeId; x: number; y: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: Partial<PortfolioSettings>) => {
        const merged = { ...DEFAULT_SETTINGS, ...d };
        setSettings(merged);
        if (merged.default_theme) setTheme(merged.default_theme as ThemeId);
        if (merged.default_lang) setLang(merged.default_lang as Lang);
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

  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"));

  // compute next theme in cycle (only visible themes — WIP hidden in prod)
  const themeIds = visibleThemes.map((t) => t.id);
  const currentIdx = themeIds.indexOf(theme);
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;
  const nextThemeId = themeIds[(safeIdx + 1) % themeIds.length] as ThemeId;
  const nextLabel = visibleThemes.find((t) => t.id === nextThemeId)?.label ?? "";
  const onNext = useCallback(
    (x: number, y: number) => handleThemeChange(nextThemeId, x, y),
    [nextThemeId, handleThemeChange],
  );

  return (
    <LangContext.Provider value={{ lang, toggle: toggleLang }}>
      <SettingsContext.Provider value={settings}>
        <NextThemeContext.Provider value={{ nextThemeId, nextLabel, onNext }}>
          <LangToggle />
          <main className="relative min-h-screen overflow-x-hidden">
            <div className="relative z-0">
              <Current />
              <ArchitectureDiagram theme={theme} />
            </div>
            {Next && (
              <div
                ref={overlayRef}
                className="fixed inset-0 z-40 theme-revealing overflow-y-auto"
                style={{
                  ["--reveal-x" as string]: `${revealing!.x}px`,
                  ["--reveal-y" as string]: `${revealing!.y}px`,
                } as React.CSSProperties}
              >
                <Next />
                <ArchitectureDiagram theme={revealing!.theme} />
              </div>
            )}
            <ThemeSwitcher current={revealing?.theme ?? theme} onChange={handleThemeChange} />
          </main>
        </NextThemeContext.Provider>
      </SettingsContext.Provider>
    </LangContext.Provider>
  );
}
