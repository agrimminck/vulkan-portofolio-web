"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { ThemeId } from "../lib/projects";

// ─── Layer color palette per skin ───────────────────────────────────────────
type LayerColors = {
  player: string;
  auth: string;
  game: string;
  web: string;
  global: string;
  data: string;
};

// ─── Skin definition ─────────────────────────────────────────────────────────
type Skin = {
  sectionClass: string;
  sectionStyle: CSSProperties;
  eyebrow: string;
  title: string;
  subtitle?: string;
  titleStyle: CSSProperties;
  eyebrowStyle: CSSProperties;
  svgBg: string;
  layerColors: LayerColors;
  boxFill: string;
  boxStroke?: string;
  boxText: string;
  boxSubText?: string;
  bgDecor?: ReactNode;
  fontFamily?: string;
  monoFont?: string;
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function Box({
  x,
  y,
  label,
  sub,
  color,
  w = 155,
  h = 52,
  godot = false,
  fill,
  textColor,
  subTextColor,
  stroke,
}: {
  x: number;
  y: number;
  label: string;
  sub?: string;
  color: string;
  w?: number;
  h?: number;
  godot?: boolean;
  fill: string;
  textColor: string;
  subTextColor?: string;
  stroke?: string;
}) {
  const borderColor = stroke ?? color;
  const subColor = subTextColor ?? color;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={8}
        fill={fill}
        stroke={borderColor}
        strokeWidth={1.5}
      />
      {godot && (
        <text
          x={x + w / 2 - 6}
          y={y - h / 2 + 10}
          textAnchor="end"
          fill={color}
          fontSize={7.5}
          fontFamily="monospace"
          opacity={0.85}
        >
          GD◆
        </text>
      )}
      <text
        x={x}
        y={sub ? y - 5 : y + 5}
        textAnchor="middle"
        fill={textColor}
        fontSize={13}
        fontFamily="system-ui,sans-serif"
        fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x}
          y={y + 11}
          textAnchor="middle"
          fill={subColor}
          fontSize={10}
          fontFamily="monospace"
          opacity={0.85}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function DB({
  x,
  y,
  label,
  w = 138,
  fill,
  stroke,
  textColor,
}: {
  x: number;
  y: number;
  label: string;
  w?: number;
  fill: string;
  stroke: string;
  textColor: string;
}) {
  const h = 40,
    ry = 9;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={4}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <ellipse
        cx={x}
        cy={y - h / 2}
        rx={w / 2}
        ry={ry}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill={textColor}
        fontSize={9}
        fontFamily="monospace"
      >
        {label}
      </text>
    </g>
  );
}

function Badge({
  x,
  y,
  text,
  color,
  fill,
}: {
  x: number;
  y: number;
  text: string;
  color: string;
  fill: string;
}) {
  const pad = 10,
    h = 18,
    fw = 6.2;
  const w = text.length * fw + pad * 2;
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={9}
        fill={fill}
        stroke={color}
        strokeWidth={1}
        opacity={0.9}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={color}
        fontSize={8}
        fontFamily="monospace"
      >
        {text}
      </text>
    </g>
  );
}

function ALbl({
  x,
  y,
  text,
  color = "rgba(255,255,255,0.38)",
}: {
  x: number;
  y: number;
  text: string;
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={color}
      fontSize={8.5}
      fontFamily="monospace"
    >
      {text}
    </text>
  );
}

function Arr({
  d,
  color,
  id,
  dashed = false,
  opacity = 0.72,
}: {
  d: string;
  color: string;
  id: string;
  dashed?: boolean;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      markerEnd={`url(#${id})`}
      opacity={opacity}
      strokeDasharray={dashed ? "5 3" : undefined}
    />
  );
}

// ─── SKINS ───────────────────────────────────────────────────────────────────
function buildSkins(): Record<ThemeId, Skin> {
  return {
    // ── METROPOLIS ────────────────────────────────────────────────────────────
    metropolis: {
      sectionClass: "",
      sectionStyle: {
        background: "linear-gradient(180deg, #0b1320 0%, #050c1a 100%)",
        position: "relative",
      },
      eyebrow: "// Idyllic Entertainment · 2026",
      title: "IDYLLIC SYSTEM BLUEPRINT",
      titleStyle: {
        fontFamily: "var(--font-display-metro)",
        color: "rgba(255,255,255,0.92)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        textShadow:
          "0 0 28px rgba(103,232,249,0.45), 0 0 60px rgba(103,232,249,0.2)",
      },
      eyebrowStyle: {
        fontFamily: "var(--font-body-metro)",
        color: "rgba(103,232,249,0.55)",
        letterSpacing: "0.5em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "rgba(11,19,32,0.45)",
      layerColors: {
        player: "#cbd5e1",
        auth: "#a78bfa",
        game: "#67e8f9",
        web: "#4ade80",
        global: "#fbbf24",
        data: "#64748b",
      },
      boxFill: "rgba(255,255,255,0.07)",
      boxText: "rgba(255,255,255,0.93)",
      fontFamily: "var(--font-display-metro)",
      monoFont: "var(--font-body-metro)",
      bgDecor: (
        <>
          {/* City-lights radial pinpoints */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: [
                "radial-gradient(ellipse 40% 20% at 15% 80%, rgba(103,232,249,0.08), transparent 60%)",
                "radial-gradient(ellipse 30% 15% at 85% 70%, rgba(255,110,199,0.07), transparent 60%)",
                "radial-gradient(ellipse 60% 30% at 50% 100%, rgba(91,26,138,0.12), transparent 50%)",
              ].join(","),
            }}
          />
          {/* Frosted glass overlay strip */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(103,232,249,0.25) 30%, rgba(103,232,249,0.25) 70%, transparent)",
            }}
          />
        </>
      ),
    },

    // ── ICE CITADEL ───────────────────────────────────────────────────────────
    "ice-citadel": {
      sectionClass: "t-ice-citadel ig-bg-obsidian ig-bg-noise ig-bg-cracks",
      sectionStyle: { position: "relative" },
      eyebrow: "✦ Codex ✦",
      title: "ARQUITECTURA PROYECTO IDYLLIC",
      titleStyle: {
        fontFamily: '"Cinzel Decorative", serif',
        color: "#b8e6ff",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textShadow:
          "0 0 4px rgba(184,230,255,0.8), 0 0 16px rgba(111,195,255,0.6), 0 0 32px rgba(74,144,217,0.5)",
      },
      eyebrowStyle: {
        fontFamily: '"Cinzel", serif',
        color: "#6fc3ff",
        letterSpacing: "0.5em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "transparent",
      layerColors: {
        player: "#4a90d9",
        auth: "#6fc3ff",
        game: "#b8e6ff",
        web: "#7ab8f5",
        global: "#c8a256",
        data: "#4a90d9",
      },
      boxFill: "rgba(8,26,54,0.85)",
      boxStroke: "rgba(111,195,255,0.4)",
      boxText: "#e8f4ff",
      boxSubText: "#6fc3ff",
      fontFamily: '"Cinzel Decorative", serif',
      monoFont: '"Cinzel", serif',
      bgDecor: (
        <>
          <div className="ig-aurora-layer" />
          <div className="ig-vignette" />
        </>
      ),
    },

    // ── TRON ──────────────────────────────────────────────────────────────────
    tron: {
      sectionClass: "t-tron",
      sectionStyle: { position: "relative", background: "#000" },
      eyebrow: "[ IDYLLIC/GRID v.MMXXVI ]",
      title: "ARQUITECTURA PROYECTO IDYLLIC",
      titleStyle: {
        fontFamily: '"Orbitron", sans-serif',
        color: "#e8feff",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textShadow:
          "0 0 4px rgba(232,254,255,0.9), 0 0 14px rgba(0,240,255,0.8), 0 0 32px rgba(0,240,255,0.5)",
      },
      eyebrowStyle: {
        fontFamily: '"Share Tech Mono", monospace',
        color: "#00f0ff",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "rgba(0,0,0,0.4)",
      layerColors: {
        player: "rgba(168,232,239,0.85)",
        auth: "#00f0ff",
        game: "#00f0ff",
        web: "#ff8a3d",
        global: "#ff8a3d",
        data: "#7fa8b3",
      },
      boxFill: "rgba(3,16,26,0.92)",
      boxText: "#e8feff",
      boxSubText: "#00f0ff",
      fontFamily: '"Orbitron", sans-serif',
      monoFont: '"Share Tech Mono", monospace',
      bgDecor: (
        <>
          <div className="tn-bg-grid absolute inset-0 pointer-events-none" />
          <div className="tn-bg-haze absolute inset-0 pointer-events-none" />
          <div className="tn-vignette absolute inset-0 pointer-events-none" />
          <div className="tn-hbeam tn-hbeam-1 absolute left-0 right-0 pointer-events-none" />
          <div className="tn-hbeam tn-hbeam-2 absolute left-0 right-0 pointer-events-none" />
          <div className="tn-hbeam tn-hbeam-3 absolute left-0 right-0 pointer-events-none" />
        </>
      ),
    },

    // ── NETFLIX ───────────────────────────────────────────────────────────────
    netflix: {
      sectionClass: "t-netflix",
      sectionStyle: { background: "#0b0b0b", position: "relative" },
      eyebrow: "BACKGROUND · IDYLLIC INFRASTRUCTURE",
      title: "THE IDYLLIC STACK",
      subtitle: "A faithful diagram of the complete Idyllic system.",
      titleStyle: {
        fontFamily: '"Bebas Neue", sans-serif',
        color: "#ffffff",
        letterSpacing: "0.04em",
      },
      eyebrowStyle: {
        fontFamily: '"Inter", system-ui, sans-serif',
        color: "#b3b3b3",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "rgba(20,20,20,0.5)",
      layerColors: {
        player: "#ffffff",
        auth: "#b3b3b3",
        game: "#e50914",
        web: "#46d369",
        global: "#ff1a25",
        data: "#777777",
      },
      boxFill: "#181818",
      boxStroke: "rgba(255,255,255,0.12)",
      boxText: "#ffffff",
      boxSubText: "#b3b3b3",
      fontFamily: '"Bebas Neue", sans-serif',
      monoFont: '"Inter", system-ui, sans-serif',
      bgDecor: (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      ),
    },

    // ── CYBERPUNK ─────────────────────────────────────────────────────────────
    cyberpunk: {
      sectionClass: "t-cyber",
      sectionStyle: { position: "relative" },
      eyebrow: "// IDYLLIC_SYS_ARCH.EXE",
      title: "IDYLLIC/CORE",
      titleStyle: {
        fontFamily: '"VT323", monospace',
        color: "#00f0ff",
        letterSpacing: "0.04em",
        textShadow:
          "0 0 12px rgba(0,240,255,0.8), 0 0 30px rgba(0,240,255,0.4)",
      },
      eyebrowStyle: {
        fontFamily: '"JetBrains Mono", monospace',
        color: "#ff007a",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "rgba(5,0,16,0.5)",
      layerColors: {
        player: "rgba(255,255,255,0.9)",
        auth: "#ff007a",
        game: "#00f0ff",
        web: "#b300ff",
        global: "#00f0ff",
        data: "#b300ff",
      },
      boxFill: "rgba(0,0,0,0.6)",
      boxText: "#e0fbff",
      fontFamily: '"VT323", monospace',
      monoFont: '"JetBrains Mono", monospace',
      bgDecor: (
        <>
          <div className="cyber-grid absolute inset-0 pointer-events-none opacity-60" />
          <div className="scanlines absolute inset-0 pointer-events-none mix-blend-overlay opacity-40" />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: [
                "radial-gradient(ellipse 50% 40% at 20% 90%, rgba(255,0,122,0.22), transparent 60%)",
                "radial-gradient(ellipse 50% 40% at 80% 10%, rgba(0,240,255,0.18), transparent 60%)",
              ].join(","),
            }}
          />
        </>
      ),
    },

    // ── HOLOGRAPHIC ──────────────────────────────────────────────────────────
    holographic: {
      sectionClass: "t-holo holo-mesh",
      sectionStyle: { position: "relative" },
      eyebrow: "// IDYLLIC · IRIDESCENT INFRASTRUCTURE",
      title: "idyllic system",
      titleStyle: {
        fontFamily: '"DM Serif Display", serif',
        color: "#f8f6ff",
        letterSpacing: "-0.01em",
      },
      eyebrowStyle: {
        fontFamily: '"Space Mono", monospace',
        color: "rgba(255,255,255,0.55)",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "rgba(10,6,18,0.45)",
      layerColors: {
        player: "rgba(255,255,255,0.7)",
        auth: "#c084fc",
        game: "#67e8f9",
        web: "#fef08a",
        global: "#ff6ec7",
        data: "#94a3b8",
      },
      boxFill: "rgba(255,255,255,0.06)",
      boxStroke: "rgba(255,255,255,0.18)",
      boxText: "rgba(255,255,255,0.92)",
      boxSubText: "#c084fc",
      fontFamily: '"DM Serif Display", serif',
      monoFont: '"Space Mono", monospace',
      bgDecor: (
        <>
          <div
            className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full orb-1 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(160,20,90,0.35), transparent 70%)",
              filter: "blur(55px)",
            }}
          />
          <div
            className="absolute top-[50%] right-[8%] w-80 h-80 rounded-full orb-2 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,70,130,0.35), transparent 70%)",
              filter: "blur(65px)",
            }}
          />
          <div
            className="absolute bottom-[5%] left-[40%] w-72 h-72 rounded-full orb-3 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(80,20,140,0.35), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }}
          />
        </>
      ),
    },

    // ── REFINED ───────────────────────────────────────────────────────────────
    refined: {
      sectionClass: "t-refined",
      sectionStyle: { position: "relative" },
      eyebrow: "I.   Idyllic · System Architecture",
      title: "Underneath, a quiet system.",
      titleStyle: {
        fontFamily: '"EB Garamond", serif',
        color: "#18181b",
        fontStyle: "italic",
        fontWeight: 400,
        letterSpacing: "-0.02em",
      },
      eyebrowStyle: {
        fontFamily: '"Manrope", sans-serif',
        color: "#71717a",
        letterSpacing: "0.3em",
        fontVariant: "small-caps",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "#ffffff",
      layerColors: {
        player: "#71717a",
        auth: "#1e3a5f",
        game: "#b08a3e",
        web: "#3f3f46",
        global: "#1e3a5f",
        data: "#71717a",
      },
      boxFill: "#ffffff",
      boxStroke: "#e4e4e7",
      boxText: "#18181b",
      boxSubText: "#71717a",
      fontFamily: '"EB Garamond", serif',
      monoFont: '"Manrope", sans-serif',
      bgDecor: (
        <>
          {/* thin gold rule top */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #b08a3e 20%, #b08a3e 80%, transparent)",
            }}
          />
          {/* very low opacity orbs */}
          <div
            className="refined-orb absolute pointer-events-none"
            style={{
              top: "20%",
              left: "10%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(176,138,62,0.06), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="refined-orb absolute pointer-events-none"
            style={{
              bottom: "15%",
              right: "12%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(30,58,95,0.06), transparent 70%)",
              filter: "blur(40px)",
              animationDelay: "4s",
            }}
          />
        </>
      ),
    },

    // ── CORPORATE ────────────────────────────────────────────────────────────
    corporate: {
      sectionClass: "t-corporate",
      sectionStyle: { position: "relative" },
      eyebrow: "VOLUME II · IDYLLIC APPENDIX A",
      title: "Idyllic Engineering Schematic",
      subtitle: "— a faithful diagram of the working system —",
      titleStyle: {
        fontFamily: '"Playfair Display", serif',
        color: "#0a2540",
        fontStyle: "italic",
        letterSpacing: "0.01em",
      },
      eyebrowStyle: {
        fontFamily: '"Cormorant Garamond", serif',
        color: "#b08a3e",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "#f5f0e6",
      layerColors: {
        player: "#455570",
        auth: "#b08a3e",
        game: "#0a2540",
        web: "#b08a3e",
        global: "#b08a3e",
        data: "#455570",
      },
      boxFill: "rgba(255,255,255,0.75)",
      boxStroke: "#c2b59b",
      boxText: "#0a2540",
      boxSubText: "#b08a3e",
      fontFamily: '"Playfair Display", serif',
      monoFont: '"Cormorant Garamond", serif',
      bgDecor: (
        <>
          {/* gold rule */}
          <div
            className="gold-rule"
            style={{ position: "absolute", top: 0, left: 0, right: 0 }}
          />
          {/* subtle dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "radial-gradient(circle, rgba(176,138,62,0.15) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              opacity: 0.5,
            }}
          />
        </>
      ),
    },

    // ── EDITORIAL ────────────────────────────────────────────────────────────
    editorial: {
      sectionClass: "t-editorial grain",
      sectionStyle: { position: "relative" },
      eyebrow: "★ Section IV · Idyllic Infrastructure ★",
      title: "Idyllic — How it hangs together.",
      titleStyle: {
        fontFamily: '"Fraunces", serif',
        color: "#0c0c0c",
        fontWeight: 900,
        letterSpacing: "-0.02em",
      },
      eyebrowStyle: {
        fontFamily: '"Instrument Serif", serif',
        color: "#c8281e",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        fontSize: 10,
      },
      svgBg: "#f1ece1",
      layerColors: {
        player: "#0c0c0c",
        auth: "#0c0c0c",
        game: "#c8281e",
        web: "#0c0c0c",
        global: "#c8281e",
        data: "#0c0c0c",
      },
      boxFill: "#ffffff",
      boxStroke: "#0c0c0c",
      boxText: "#0c0c0c",
      boxSubText: "#c8281e",
      fontFamily: '"Fraunces", serif',
      monoFont: '"Instrument Serif", serif',
    },

    // ── ORGANIC ───────────────────────────────────────────────────────────────
    organic: {
      sectionClass: "t-organic grain",
      sectionStyle: { position: "relative" },
      eyebrow: "✿ how idyllic grows together ✿",
      title: "the idyllic roots.",
      titleStyle: {
        fontFamily: '"Bricolage Grotesque", sans-serif',
        color: "#2b1d12",
        fontWeight: 900,
        letterSpacing: "-0.03em",
      },
      eyebrowStyle: {
        fontFamily: '"Caveat", cursive',
        color: "#6b3a5b",
        letterSpacing: "0.05em",
        fontSize: 14,
      },
      svgBg: "rgba(244,234,213,0.6)",
      layerColors: {
        player: "#2b1d12",
        auth: "#6b3a5b",
        game: "#d97757",
        web: "#506b3d",
        global: "#a85a8c",
        data: "#2b1d12",
      },
      boxFill: "#fdf6ea",
      boxStroke: "#2b1d12",
      boxText: "#2b1d12",
      boxSubText: "#6b3a5b",
      fontFamily: '"Bricolage Grotesque", sans-serif',
      monoFont: '"Caveat", cursive',
      bgDecor: (
        <>
          {/* Organic blobs */}
          <div
            className="blob-1 absolute pointer-events-none"
            style={{
              top: "8%",
              left: "5%",
              width: 280,
              height: 280,
              borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
              background:
                "radial-gradient(circle, rgba(217,119,87,0.22), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="blob-2 absolute pointer-events-none"
            style={{
              bottom: "10%",
              right: "8%",
              width: 240,
              height: 240,
              borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%",
              background:
                "radial-gradient(circle, rgba(107,58,91,0.18), transparent 70%)",
              filter: "blur(45px)",
            }}
          />
          <div
            className="blob-1 absolute pointer-events-none"
            style={{
              top: "45%",
              left: "50%",
              width: 200,
              height: 200,
              borderRadius: "50% 50% 40% 60% / 40% 60% 50% 50%",
              background:
                "radial-gradient(circle, rgba(80,107,61,0.15), transparent 70%)",
              filter: "blur(35px)",
              animationDelay: "7s",
            }}
          />
        </>
      ),
    },
  };
}

// ─── Diagram marker IDs (one per layer color key, scoped to theme) ────────────
type MarkerKey =
  | "player"
  | "auth"
  | "game"
  | "web"
  | "global"
  | "data"
  | "muted";

// ─── Main component ───────────────────────────────────────────────────────────
export default function ArchitectureDiagram({ theme }: { theme: ThemeId }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.04 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const SKINS = buildSkins();
  const skin = SKINS[theme];
  const C = skin.layerColors;
  const muted = "rgba(255,255,255,0.22)";

  // Marker IDs per theme to avoid cross-SVG pollution
  const mid = (k: MarkerKey) => `arr-${theme}-${k}`;

  // For editorial/refined/corporate/organic the muted arrow should be dark
  const isDark = ["editorial", "refined", "corporate", "organic"].includes(
    theme,
  );
  const mutedArrow = isDark ? "rgba(0,0,0,0.3)" : muted;

  // Box render helpers that use skin values
  const box = (
    x: number,
    y: number,
    label: string,
    color: string,
    opts?: {
      sub?: string;
      w?: number;
      h?: number;
      godot?: boolean;
      stroke?: string;
    },
  ) => (
    <Box
      x={x}
      y={y}
      label={label}
      color={color}
      fill={skin.boxFill}
      textColor={skin.boxText}
      subTextColor={skin.boxSubText}
      stroke={opts?.stroke ?? skin.boxStroke}
      sub={opts?.sub}
      w={opts?.w}
      h={opts?.h}
      godot={opts?.godot}
    />
  );

  const db = (x: number, y: number, label: string, w?: number) => (
    <DB
      x={x}
      y={y}
      label={label}
      w={w}
      fill={isDark ? skin.svgBg : skin.boxFill}
      stroke={skin.boxStroke ?? C.data}
      textColor={skin.boxSubText ?? C.data}
    />
  );

  const badge = (x: number, y: number, text: string, color: string) => (
    <Badge
      x={x}
      y={y}
      text={text}
      color={color}
      fill={isDark ? skin.svgBg : skin.boxFill}
    />
  );

  // ── Determine SVG bg approach
  const svgBgFill = skin.svgBg === "transparent" ? "none" : skin.svgBg;

  // ── Layer band fill — use layer color at very low opacity
  const bandFill = (color: string) => {
    if (isDark) return `${color}06`;
    return `${color}09`;
  };
  const bandStroke = (color: string) => `${color}15`;

  return (
    <section
      ref={sectionRef}
      className={skin.sectionClass}
      style={{ ...skin.sectionStyle, paddingBottom: 96 }}
    >
      {/* Background decorations */}
      {skin.bgDecor}

      {/* ── Section header ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
          paddingTop: 80,
          paddingBottom: 72,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        {/* Thin top rule — theme-sensitive */}
        {theme === "editorial" && (
          <div
            style={{
              height: 4,
              background: "#0c0c0c",
              marginBottom: 40,
            }}
          />
        )}
        {theme === "corporate" && (
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #b08a3e 30%, #b08a3e 70%, transparent)",
              marginBottom: 40,
            }}
          />
        )}
        {!["editorial", "corporate"].includes(theme) && (
          <div
            style={{
              height: 1,
              background: isDark
                ? `linear-gradient(90deg, transparent, ${C.game}20 30%, ${C.game}20 70%, transparent)`
                : `linear-gradient(90deg, transparent, ${C.auth}30 30%, ${C.auth}30 70%, transparent)`,
              marginBottom: 40,
            }}
          />
        )}

        {/* Header content */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          {/* Eyebrow */}
          <div style={{ marginBottom: 14, ...skin.eyebrowStyle }}>
            {skin.eyebrow}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              lineHeight: 1.1,
              ...skin.titleStyle,
            }}
          >
            {/* Holographic gets iridescent first word */}
            {theme === "holographic" ? (
              <>
                <span className="iridescent">system</span> architecture
              </>
            ) : (
              skin.title
            )}
          </div>

          {/* Subtitle */}
          {skin.subtitle && (
            <div
              style={{
                marginTop: 10,
                fontSize: "clamp(12px, 1.5vw, 16px)",
                color:
                  theme === "corporate"
                    ? "#b08a3e"
                    : theme === "netflix"
                      ? "#e50914"
                      : "inherit",
                fontFamily: skin.monoFont,
                fontStyle: theme === "corporate" ? "italic" : undefined,
                opacity: 0.8,
              }}
            >
              {skin.subtitle}
            </div>
          )}

          {/* Tech tags */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            {["NestJS", "Godot", "PostgreSQL", "Redis"].map((t, i) => (
              <span
                key={t}
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontFamily: skin.monoFont ?? "monospace",
                  color: isDark ? `${C.data}` : "rgba(255,255,255,0.25)",
                  opacity: visible ? 0.7 : 0,
                  transition: `opacity 0.6s ease ${0.3 + i * 0.1}s`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        {theme === "editorial" && (
          <div style={{ height: 4, background: "#0c0c0c", marginTop: 40 }} />
        )}
        {theme === "corporate" && (
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #b08a3e 30%, #b08a3e 70%, transparent)",
              marginTop: 40,
            }}
          />
        )}
        {!["editorial", "corporate"].includes(theme) && (
          <div
            style={{
              height: 1,
              background: isDark
                ? `linear-gradient(90deg, transparent, ${C.game}20 30%, ${C.game}20 70%, transparent)`
                : `linear-gradient(90deg, transparent, ${C.auth}30 30%, ${C.auth}30 70%, transparent)`,
              marginTop: 40,
            }}
          />
        )}
      </div>

      {/* ── SVG diagram ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1240,
          margin: "0 auto",
          paddingLeft: 24,
          paddingRight: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
        }}
      >
        <svg viewBox="0 0 1360 710" style={{ width: "100%", display: "block" }}>
          <defs>
            {/* Arrow markers per layer */}
            {(["player", "auth", "game", "web", "global", "data"] as const).map(
              (k) => (
                <marker
                  key={k}
                  id={mid(k)}
                  markerWidth={7}
                  markerHeight={7}
                  refX={5.5}
                  refY={3.5}
                  orient="auto"
                >
                  <path d="M0,0 L0,7 L7,3.5 z" fill={C[k]} />
                </marker>
              ),
            )}
            <marker
              id={mid("muted")}
              markerWidth={7}
              markerHeight={7}
              refX={5.5}
              refY={3.5}
              orient="auto"
            >
              <path d="M0,0 L0,7 L7,3.5 z" fill={mutedArrow} />
            </marker>
            {/* Dot pattern for dark themes */}
            {!isDark && (
              <pattern
                id={`pts-${theme}`}
                width={24}
                height={24}
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx={0.5}
                  cy={0.5}
                  r={0.7}
                  fill="rgba(255,255,255,0.04)"
                />
              </pattern>
            )}
          </defs>

          {/* SVG background */}
          <rect
            width={1360}
            height={710}
            fill={svgBgFill === "none" ? "transparent" : svgBgFill}
          />
          {!isDark && svgBgFill !== "none" && (
            <rect width={1200} height={710} fill={`url(#pts-${theme})`} />
          )}

          {/* Layer bands */}
          {[
            { y: 42, h: 68, c: C.player },
            { y: 160, h: 68, c: C.auth },
            { y: 278, h: 80, c: C.game },
            { y: 408, h: 66, c: C.web },
            { y: 524, h: 66, c: C.global },
            { y: 614, h: 66, c: C.data },
          ].map((b, i) => (
            <rect
              key={i}
              x={84}
              y={b.y}
              width={1268}
              height={b.h}
              rx={8}
              fill={bandFill(b.c)}
              stroke={bandStroke(b.c)}
              strokeWidth={1}
            />
          ))}

          {/* Layer labels */}
          {[
            { t: "PLAYER", y: 76, c: C.player },
            { t: "AUTH", y: 194, c: C.auth },
            { t: "GAME", y: 318, c: C.game },
            { t: "WEB", y: 441, c: C.web },
            { t: "GLOBAL", y: 557, c: C.global },
            { t: "DATA", y: 647, c: C.data },
          ].map((l) => (
            <text
              key={l.t}
              x={80}
              y={l.y}
              textAnchor="end"
              fill={l.c}
              fontSize={9}
              fontFamily="monospace"
              letterSpacing={2}
              opacity={0.82}
            >
              {l.t}
            </text>
          ))}

          {/* ── CONNECTIONS ── */}
          {/* Launcher → Launcher BE */}
          <Arr id={mid("auth")} color={C.auth} d="M220,101 L220,160" />
          {/* Game Client → Game Auth BE */}
          <Arr id={mid("auth")} color={C.auth} d="M655,101 L795,160" />
          {/* Game Client WS → Edge Gateway (dashed) */}
          <Arr
            id={mid("muted")}
            color={mutedArrow}
            dashed
            opacity={0.55}
            d="M660,101 C700,195 960,205 990,289"
          />
          {/* Browser → Web Frontend */}
          <Arr
            id={mid("web")}
            color={C.web}
            opacity={0.5}
            d="M1040,101 C1040,290 1205,370 993,415"
          />
          {/* Launcher BE → Auth BE */}
          <Arr
            id={mid("auth")}
            color={C.auth}
            dashed
            opacity={0.6}
            d="M298,194 L412,194"
          />
          {/* Game Auth BE → Auth BE */}
          <Arr
            id={mid("auth")}
            color={C.auth}
            dashed
            opacity={0.6}
            d="M718,194 L569,194"
          />
          {/* Game Client HTTP Bearer → Gateway */}
          <Arr
            id={mid("game")}
            color={C.game}
            opacity={0.6}
            d="M645,101 C680,325 410,218 240,288"
          />
          {/* Gateway → MMO Central */}
          <Arr id={mid("game")} color={C.game} d="M243,318 L345,318" />
          {/* Gateway → Central BE global */}
          <Arr
            id={mid("global")}
            color={C.global}
            opacity={0.58}
            d="M160,348 C158,490 390,490 415,524"
          />
          {/* World Manager ↔ Game Server heartbeat (arc over Edge Gateway) */}
          <Arr
            id={mid("game")}
            color={C.game}
            opacity={0.78}
            d="M790,308 C870,270 1090,270 1153,308"
          />
          <Arr
            id={mid("game")}
            color={C.game}
            opacity={0.78}
            d="M1153,328 C1090,358 870,358 790,328"
          />
          {/* Game Server → MMO Central save/load (arc) */}
          <Arr
            id={mid("game")}
            color={C.game}
            dashed
            opacity={0.42}
            d="M1113,348 C1160,445 490,445 470,352"
          />
          {/* Edge Gateway ↔ Game Server */}
          <Arr
            id={mid("game")}
            color={C.game}
            opacity={0.75}
            d="M1066,313 L1097,313"
          />
          <Arr
            id={mid("game")}
            color={C.game}
            opacity={0.75}
            d="M1097,323 L1066,323"
          />
          {/* Web Frontend → Web Backend */}
          <Arr
            id={mid("web")}
            color={C.web}
            opacity={0.75}
            d="M997,441 L1025,441"
          />
          {/* Web Backend → Central BE */}
          <Arr
            id={mid("web")}
            color={C.web}
            opacity={0.42}
            d="M1080,468 C1080,512 510,512 455,524"
          />

          {/* DB connections (thin) */}
          {[
            [220, 226, 178, 614],
            [490, 226, 368, 614],
            [795, 226, 558, 614],
            [490, 348, 755, 614],
            [710, 348, 968, 614],
            [707, 348, 1175, 614],
            [992, 348, 1175, 614],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={C.data}
              strokeWidth={0.8}
              markerEnd={`url(#${mid("data")})`}
              opacity={0.28}
            />
          ))}

          {/* ── ARROW LABELS ── */}
          <ALbl
            x={755}
            y={192}
            text="WS"
            color={isDark ? `${C.player}88` : "rgba(255,255,255,0.28)"}
          />
          <ALbl x={340} y={260} text="HTTP Bearer" color={C.game} />
          <ALbl x={970} y={262} text="heartbeat" color={C.game} />
          <ALbl x={725} y={440} text="save / load" color={C.game} />
          <ALbl x={140} y={478} text="global" color={C.global} />

          {/* ── BOXES ── */}
          {/* Player */}
          {box(220, 76, "Launcher", C.player, {
            sub: "Godot app",
            godot: true,
          })}
          {box(650, 76, "Game Client", C.player, {
            sub: "Godot · ENet",
            w: 162,
            godot: true,
          })}
          {box(1040, 76, "Browser", C.player)}
          {/* Auth */}
          {box(220, 194, "Launcher BE", C.auth, { sub: ":4008" })}
          {box(490, 194, "Auth BE", C.auth, { sub: ":4001", w: 148 })}
          {box(800, 194, "Game Auth BE", C.auth, { sub: ":4004", w: 162 })}
          {/* Game */}
          {box(165, 318, "Gateway", C.game, { sub: ":4005", h: 58 })}
          {box(430, 318, "MMO Central", C.game, { sub: ":4006", h: 58 })}
          {box(707, 318, "World Manager", C.game, {
            sub: ":4009",
            w: 162,
            h: 58,
          })}
          {box(992, 318, "Edge Gateway", C.game, {
            sub: ":8080 · Go",
            w: 148,
            h: 58,
          })}
          {box(1175, 318, "Game Server", C.game, {
            sub: "UDP:8000+",
            h: 58,
            godot: true,
          })}
          {/* Web */}
          {box(920, 441, "Web Frontend", C.web, { sub: ":6001", w: 148 })}
          {box(1100, 441, "Web Backend", C.web, { sub: ":4007", w: 148 })}
          {/* Global */}
          {box(430, 557, "Central BE", C.global, { sub: ":4000" })}
          {/* DBs */}
          {db(178, 647, "launcher-db")}
          {db(368, 647, "auth-db")}
          {db(558, 647, "game-auth-db")}
          {db(755, 647, "mmo1-central-db", 148)}
          {db(968, 647, "world-manager-db", 155)}
          {db(1175, 647, "redis", 105)}

          {/* ── BADGES ── */}
          {badge(965, 194, "JWT · 5 roles", C.auth)}
          {badge(1175, 395, "server meshing", C.game)}
          {badge(490, 395, "Grist pipeline", C.game)}
          {badge(920, 478, "idyllic-web.vercel.app", C.web)}

          {/* Legend */}
          <g transform="translate(88,696)">
            {[
              { t: "◆GD  Godot", x: 0 },
              { t: "■  NestJS", x: 85 },
              { t: "▶  Go", x: 162 },
              { t: "──→  HTTP", x: 210 },
              { t: "- -→  WS/ENet", x: 285 },
            ].map((l) => (
              <text
                key={l.t}
                x={l.x}
                y={0}
                fill={isDark ? `${C.data}99` : "rgba(255,255,255,0.22)"}
                fontSize={8}
                fontFamily="monospace"
              >
                {l.t}
              </text>
            ))}
          </g>

          {/* Watermark */}
          <text
            x={1345}
            y={704}
            textAnchor="end"
            fill={isDark ? `${C.data}55` : "rgba(255,255,255,0.12)"}
            fontSize={8}
            fontFamily="monospace"
            letterSpacing={2}
          >
            IDYLLIC ENTERTAINMENT
          </text>
        </svg>
      </div>
    </section>
  );
}
