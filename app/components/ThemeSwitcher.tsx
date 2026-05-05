"use client";

import { themes, type ThemeId } from "../lib/projects";
import { useState } from "react";

type Props = {
  current: ThemeId;
  onChange: (id: ThemeId, x: number, y: number) => void;
};

export default function ThemeSwitcher({ current, onChange }: Props) {
  const [hovered, setHovered] = useState<ThemeId | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all"
        style={{
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.25)",
          letterSpacing: "0.18em",
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: themes.find((t) => t.id === current)?.color }}
        />
        <span>{open ? "Close" : "Switch World"}</span>
      </button>

      <div
        className="flex flex-col gap-2 transition-all duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        {themes.map((t, i) => {
          const isCurrent = t.id === current;
          const isHover = hovered === t.id;
          return (
            <button
              key={t.id}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                if (isCurrent) return;
                onChange(t.id, e.clientX, e.clientY);
                setOpen(false);
              }}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-full text-left transition-all duration-300"
              style={{
                background: isHover || isCurrent ? t.color : "rgba(0,0,0,0.7)",
                color: isHover || isCurrent ? "#fff" : "#eee",
                border: `1px solid ${isCurrent ? "#fff" : "rgba(255,255,255,0.2)"}`,
                backdropFilter: "blur(20px)",
                transitionDelay: `${i * 30}ms`,
                transform: isHover ? "translateX(-8px) scale(1.04)" : "translateX(0) scale(1)",
                boxShadow: isHover ? `0 8px 30px ${t.color}99` : "none",
              }}
            >
              <span
                className="w-3 h-3 rounded-full transition-transform"
                style={{
                  background: t.color,
                  boxShadow: `0 0 12px ${t.color}`,
                  transform: isHover ? "scale(1.3)" : "scale(1)",
                }}
              />
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-black uppercase tracking-[0.18em]">{t.label}</span>
                <span className="text-[10px] opacity-70 tracking-wider">{t.subtitle}</span>
              </span>
              {isCurrent && (
                <span className="text-[10px] opacity-80 ml-2 uppercase tracking-widest">●</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
