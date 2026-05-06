"use client";

import { themes, visibleThemes, type ThemeId } from "../lib/projects";
import { useState } from "react";

type Props = {
  current: ThemeId;
  onChange: (id: ThemeId, x: number, y: number) => void;
};

export default function ThemeSwitcher({ current, onChange }: Props) {
  const [hovered, setHovered] = useState<ThemeId | null>(null);
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const currentColor = themes.find((t) => t.id === current)?.color ?? "#fff";

  const expanded = hovering || open;

  return (
    <div
      className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ fontFamily: "system-ui, sans-serif" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch design theme"
        className="relative flex items-center gap-2 rounded-full transition-all duration-300 ease-out overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.72)",
          color: "#fff",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: `1px solid ${expanded ? "rgba(255,255,255,0.35)" : `${currentColor}66`}`,
          letterSpacing: "0.18em",
          padding: expanded ? "10px 18px 10px 14px" : "10px",
          minHeight: 40,
          width: expanded ? 168 : 40,
          boxShadow: expanded
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : `0 0 16px ${currentColor}44`,
        }}
      >
        <span
          className="relative inline-flex items-center justify-center rounded-full"
          style={{
            width: 14,
            height: 14,
            flexShrink: 0,
          }}
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: currentColor,
              boxShadow: `0 0 12px ${currentColor}, 0 0 24px ${currentColor}66`,
              animation: "ts-pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            className="absolute rounded-full"
            style={{
              inset: -3,
              border: `1px solid ${currentColor}88`,
              animation: "ts-pulse-ring 2s ease-out infinite",
            }}
          />
        </span>
        <span
          className="whitespace-nowrap overflow-hidden text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{
            opacity: expanded ? 1 : 0,
            maxWidth: expanded ? 200 : 0,
            transition: "opacity 0.25s ease 0.05s, max-width 0.3s ease",
            color: "#fff",
          }}
        >
          {open ? "Close" : "Switch World"}
        </span>
      </button>

      <div
        className="flex flex-col gap-2"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {visibleThemes.map((t, i) => {
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
                transitionDelay: `${i * 25}ms`,
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

      <style jsx>{`
        @keyframes ts-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(0.92); }
        }
        @keyframes ts-pulse-ring {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.8); }
        }
      `}</style>
    </div>
  );
}
