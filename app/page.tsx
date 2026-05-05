"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { type ThemeId } from "./lib/projects";
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
  const [theme, setTheme] = useState<ThemeId>("refined");
  const [revealing, setRevealing] = useState<{ theme: ThemeId; x: number; y: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
  );
}
