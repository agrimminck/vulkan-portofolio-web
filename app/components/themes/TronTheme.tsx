"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../../lib/projects";
import type { Project } from "../../lib/projects";
import { useLang } from "../../lib/lang-context";
import { useNextTheme } from "../../lib/next-theme-context";
import { TRON_T, PROJECT_ES, SHARED } from "../../lib/i18n";

// ─── MatrixRain (ported verbatim from basilisk-hub/themes/tron/MatrixRain.tsx) ─

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ#$%&*+=<>{}[]/\\|01";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const fontSize = 14;
    let columns: { y: number; speed: number; alpha: number }[] = [];

    const setup = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const colCount = Math.floor(vw / fontSize);
      columns = Array.from({ length: colCount }).map(() => ({
        y: Math.random() * vh,
        speed: 0.6 + Math.random() * 1.4,
        alpha: 0.3 + Math.random() * 0.7,
      }));
    };
    setup();

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    let raf = 0;
    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, vw, vh);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const x = i * fontSize;
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        // head bright
        ctx.fillStyle = `rgba(180, 250, 255, ${0.18 * col.alpha})`;
        ctx.fillText(ch, x, col.y);
        // body
        ctx.fillStyle = `rgba(0, 240, 255, ${0.06 * col.alpha})`;
        ctx.fillText(ch, x, col.y - fontSize);
        col.y += col.speed;
        if (col.y > vh + 20) {
          col.y = -Math.random() * 200;
          col.speed = 0.6 + Math.random() * 1.6;
          col.alpha = 0.3 + Math.random() * 0.7;
        }
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1, opacity: 0.55, mixBlendMode: "screen" }}
    />
  );
}

// ─── PerspectiveGrid (ported from basilisk-hub) ───────────────────────────────

function PerspectiveGrid() {
  return (
    <svg
      viewBox="0 0 1200 600"
      className="tn-grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="tn-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
          <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g stroke="url(#tn-grid-fade)" strokeWidth="0.6" fill="none">
        {Array.from({ length: 16 }).map((_, i) => {
          const y = 80 + i * i * 2.2;
          return <line key={`h-${i}`} x1="0" y1={y} x2="1200" y2={y} />;
        })}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = i * 50;
          return <line key={`v-${i}`} x1={x} y1="80" x2={600 + (x - 600) * 4} y2="600" />;
        })}
      </g>
    </svg>
  );
}

// ─── Hexagon ──────────────────────────────────────────────────────────────────

function Hexagon({ className, stroke = "#00f0ff" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke={stroke} strokeWidth="1">
      <path d="M20,3 L35,12 L35,28 L20,37 L5,28 L5,12 Z" />
      <path d="M20,11 L27,15 L27,25 L20,29 L13,25 L13,15 Z" opacity="0.5" />
      <circle cx="20" cy="20" r="2" fill={stroke} />
    </svg>
  );
}

// ─── CornerBracket ────────────────────────────────────────────────────────────

function CornerBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const positions: Record<string, string> = {
    tl: "left-0 top-0",
    tr: "right-0 top-0 scale-x-[-1]",
    bl: "left-0 bottom-0 scale-y-[-1]",
    br: "right-0 bottom-0 scale-[-1]",
  };
  return (
    <svg
      viewBox="0 0 60 60"
      className={`pointer-events-none absolute h-8 w-8 ${positions[corner]}`}
      fill="none"
    >
      <path d="M2,30 L2,2 L30,2" stroke="#00f0ff" strokeWidth="1.5" />
      <path d="M8,30 L8,8 L30,8" stroke="#00f0ff" strokeWidth="0.6" opacity="0.5" />
      <circle cx="2" cy="2" r="1.5" fill="#00f0ff" />
    </svg>
  );
}

// ─── MiniGraph ────────────────────────────────────────────────────────────────

function MiniGraph({ color }: { color: string }) {
  const bars = useRef<number[]>([]);
  const [, force] = useState(0);
  useEffect(() => {
    bars.current = Array.from({ length: 8 }).map(() => 0.2 + Math.random() * 0.8);
    const id = setInterval(() => {
      bars.current = bars.current.map((v) =>
        Math.max(0.15, Math.min(1, v + (Math.random() - 0.5) * 0.4))
      );
      force((n) => n + 1);
    }, 480);
    return () => clearInterval(id);
  }, []);
  return (
    <svg viewBox="0 0 32 12" className="ml-1 h-2.5 w-7" preserveAspectRatio="none">
      {bars.current.map((v, i) => (
        <rect
          key={i}
          x={i * 4}
          y={12 - v * 11}
          width="2.4"
          height={v * 11}
          fill={color}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────

type PortfolioStatus = "live" | "wip" | "standby";

function StatusBadge({ status }: { status: PortfolioStatus }) {
  const cfg: Record<PortfolioStatus, { label: string; color: string; bg: string }> = {
    live:    { label: "ONLINE", color: "#00f0ff", bg: "rgba(0,240,255,0.08)" },
    wip:     { label: "ONLINE", color: "#00f0ff", bg: "rgba(0,240,255,0.08)" },
    standby: { label: "ONLINE", color: "#00f0ff", bg: "rgba(0,240,255,0.08)" },
  };
  const c = cfg[status];
  return (
    <span
      className="tn-badge inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold tracking-[0.25em]"
      style={{
        background: c.bg,
        border: `1px solid ${c.color}`,
        color: c.color,
        boxShadow: `0 0 8px ${c.color}40, inset 0 0 8px ${c.color}20`,
      }}
    >
      <span
        className="tn-led inline-block h-1.5 w-1.5"
        style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }}
      />
      {c.label}
      <MiniGraph color={c.color} />
    </span>
  );
}

// ─── GlitchTitle ──────────────────────────────────────────────────────────────

function GlitchTitle({ children }: { children: string }) {
  return (
    <h2
      className="tn-font-display tn-glow tn-glitch mb-1 text-xl font-bold uppercase tracking-[0.15em]"
      data-text={children}
    >
      {children}
    </h2>
  );
}

// ─── LogoFX — stylized "AG" letterform replacing basilisk logo image ──────────

function LogoFX() {
  return (
    <div className="relative mx-auto mb-8 flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
      {/* outer ring slow */}
      <svg
        viewBox="0 0 220 220"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "tn-spin 60s linear infinite" }}
      >
        <circle cx="110" cy="110" r="105" fill="none" stroke="#00f0ff" strokeWidth="0.6" opacity="0.5" />
        <circle cx="110" cy="110" r="98" fill="none" stroke="#00f0ff" strokeWidth="0.4" strokeDasharray="3 6" opacity="0.4" />
        {Array.from({ length: 6 }).map((_, i) => {
          const ang = (i * Math.PI * 2) / 6;
          return (
            <line
              key={i}
              x1={110 + Math.cos(ang) * 88}
              y1={110 + Math.sin(ang) * 88}
              x2={110 + Math.cos(ang) * 102}
              y2={110 + Math.sin(ang) * 102}
              stroke="#00f0ff"
              strokeWidth="1.2"
            />
          );
        })}
      </svg>

      {/* hex ring reverse */}
      <svg
        viewBox="0 0 220 220"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "tn-spin-rev 90s linear infinite" }}
      >
        <polygon points="110,30 175,70 175,150 110,190 45,150 45,70" fill="none" stroke="#00f0ff" strokeWidth="0.8" opacity="0.6" />
        <polygon points="110,50 158,80 158,140 110,170 62,140 62,80" fill="none" stroke="#00f0ff" strokeWidth="0.4" opacity="0.4" />
      </svg>

      {/* extra fast inner ring with arc */}
      <svg
        viewBox="0 0 220 220"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "tn-spin 14s linear infinite" }}
      >
        <circle cx="110" cy="110" r="80" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="60 200" opacity="0.7" />
        <circle cx="110" cy="110" r="72" fill="none" stroke="#00f0ff" strokeWidth="0.4" strokeDasharray="20 12" opacity="0.4" />
      </svg>

      {/* tick marks ring */}
      <svg
        viewBox="0 0 220 220"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "tn-spin-rev 30s linear infinite" }}
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const ang = (i * Math.PI * 2) / 36;
          const inner = i % 4 === 0 ? 90 : 95;
          return (
            <line
              key={i}
              x1={110 + Math.cos(ang) * inner}
              y1={110 + Math.sin(ang) * inner}
              x2={110 + Math.cos(ang) * 100}
              y2={110 + Math.sin(ang) * 100}
              stroke="#00f0ff"
              strokeWidth={i % 4 === 0 ? 1 : 0.4}
              opacity={i % 4 === 0 ? 0.8 : 0.5}
            />
          );
        })}
      </svg>

      {/* vertical scan bar */}
      <div className="tn-logo-scanbar pointer-events-none absolute inset-0" />

      {/* Portrait photo — centered in ring with tron glow */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: "1.5px solid #00f0ff",
          boxShadow: "0 0 0 1px rgba(0,240,255,0.3), 0 0 20px rgba(0,240,255,0.6), 0 0 60px rgba(0,240,255,0.2)",
          filter: "drop-shadow(0 0 8px rgba(0,240,255,0.8))",
        }}
      >
        <img
          src="/api/portrait/tron"
          alt="Portrait"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
          onError={(e) => { (e.target as HTMLImageElement).src = "/me.jpg"; }}
        />
      </div>
    </div>
  );
}

// ─── HeaderCircuits ───────────────────────────────────────────────────────────

function HeaderCircuits() {
  return (
    <svg
      className="tn-header-circuits pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
    >
      <g stroke="#00f0ff" strokeWidth="0.8" fill="none" opacity="0.6">
        <path className="tn-circuit-trace" d="M40,60 L160,60 L180,80 L320,80 L340,100" strokeDasharray="600" strokeDashoffset="600" />
        <path className="tn-circuit-trace" d="M1160,80 L1020,80 L1000,60 L880,60 L860,40" strokeDasharray="600" strokeDashoffset="600" style={{ animationDelay: "0.6s" }} />
        <path className="tn-circuit-trace" d="M40,340 L240,340 L260,360 L520,360" strokeDasharray="800" strokeDashoffset="800" style={{ animationDelay: "1.2s" }} />
        <path className="tn-circuit-trace" d="M1160,340 L900,340 L880,320 L640,320" strokeDasharray="800" strokeDashoffset="800" style={{ animationDelay: "1.6s" }} />
      </g>
      <g fill="#00f0ff">
        <circle className="tn-circuit-dot" cx="40" cy="60" r="2" />
        <circle className="tn-circuit-dot" cx="340" cy="100" r="2" style={{ animationDelay: "0.3s" }} />
        <circle className="tn-circuit-dot" cx="860" cy="40" r="2" style={{ animationDelay: "0.9s" }} />
        <circle className="tn-circuit-dot" cx="1160" cy="340" r="2" style={{ animationDelay: "1.5s" }} />
      </g>
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deriveCodename(p: Project, index: number): string {
  const prefix = p.id.slice(0, 3).toUpperCase().replace(/-/g, "X");
  return `${prefix}-${String(index + 1).padStart(3, "0")}`;
}

function deriveVector(p: Project): string {
  // map category + status to a tron-flavored vector label
  if (p.category === "idyllic") return "Nodo Flagship del Grid";
  if (p.status === "standby") return "Subrutina en Buffer Latente";
  if (p.status === "wip") return "Compilando en Tiempo Real";
  return "Vector Activo del Ecosistema";
}

function accentForStatus(status: PortfolioStatus): string {
  if (status === "live") return "#00f0ff";
  if (status === "wip") return "#ff8a3d";
  return "#7fa8b3";
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index, lang }: { project: Project; index: number; lang: "en" | "es" }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const t = TRON_T[lang];
  const sh = SHARED[lang];
  const accent = accentForStatus(project.status as PortfolioStatus);
  const codename = deriveCodename(project, index);
  const vector = deriveVector(project);
  const translation = PROJECT_ES[project.id];
  const description = lang === "es" && translation ? translation.description : project.description;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "tn-ripple";
    ripple.style.cssText = `position:absolute;left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;width:4px;height:4px;border-radius:50%;background:${accent};opacity:0.9;transform:scale(0);animation:tn-ripple-anim 0.6s ease-out forwards;pointer-events:none;`;
    el.appendChild(ripple);
    el.classList.add("tn-shake");
    setTimeout(() => {
      ripple.remove();
      el.classList.remove("tn-shake");
    }, 600);
  };

  return (
    <a
      ref={cardRef}
      href={project.url ?? project.github ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="tn-card tn-reveal tn-boot group relative flex flex-col p-6"
      style={{ animationDelay: `${0.15 + index * 0.08}s`, ["--tn-accent" as string]: accent }}
    >
      {/* perimeter laser stroke */}
      <svg className="tn-perimeter pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke={accent} strokeWidth="1" />
      </svg>

      <CornerBracket corner="tl" />
      <CornerBracket corner="tr" />
      <CornerBracket corner="bl" />
      <CornerBracket corner="br" />

      {/* internal perspective grid revealed on hover */}
      <svg className="tn-card-grid pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="none">
        <g stroke={accent} strokeWidth="0.3" opacity="0.5" fill="none">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`g-h-${i}`} x1="0" y1={i * 40} x2="200" y2={i * 40} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`g-v-${i}`} x1={100 + (i - 3.5) * 30} y1="0" x2={100 + (i - 3.5) * 80} y2="200" />
          ))}
        </g>
      </svg>

      <span className="tn-scanline" />

      {/* top row: hex icon + status badge + codename */}
      <div className="relative mb-4 flex items-start justify-between">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <Hexagon className="absolute inset-0 h-full w-full" stroke={accent} />
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={project.status as PortfolioStatus} />
          <span className="tn-mono text-[9px] tracking-[0.3em] text-[#00f0ff]/60">
            {codename}
          </span>
        </div>
      </div>

      <GlitchTitle>{project.name}</GlitchTitle>
      <span className="tn-mono mb-3 text-[10px] tracking-[0.3em] text-[#00f0ff]/70 relative">
        &gt; {vector}
      </span>

      <div className="tn-divider mb-3 h-px w-full" />

      <p className="tn-font-body mb-5 flex-1 text-sm leading-relaxed text-[#a8e8ef]/85 relative">
        {description}
      </p>

      {/* loading-program hover indicator */}
      <div className="tn-load-bar relative mb-3 h-[2px] w-full overflow-hidden">
        <div className="tn-load-fill absolute inset-y-0 left-0" style={{ background: accent }} />
      </div>

      {/* action buttons */}
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {project.url && (
            <span
              className="tn-mono text-[9px] tracking-[0.2em] px-3 py-1.5 font-bold"
              style={{
                background: accent,
                color: "#000",
                clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
              }}
            >
              {sh.visit.replace(" →", "")}
            </span>
          )}
          {project.github && (
            <span
              className="tn-mono text-[9px] tracking-[0.2em] px-3 py-1.5 font-bold"
              style={{
                border: `1px solid ${accent}`,
                color: accent,
                clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
              }}
            >
              {sh.github.replace(" →", "")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="tn-mono tn-btn-text text-[10px] tracking-[0.3em] text-[#00f0ff]/80 transition-all group-hover:text-[#e8feff]">
            {t.enterGrid}
          </span>
          <svg viewBox="0 0 40 12" className="h-3 w-10 text-[#00f0ff] transition-transform group-hover:translate-x-1">
            <path d="M0,6 L32,6 M28,2 L34,6 L28,10" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>
    </a>
  );
}

// ─── NextThemeButton ──────────────────────────────────────────────────────────

function NextThemeButton() {
  const { nextLabel, onNext } = useNextTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onNext(e.clientX, e.clientY);
  };

  return (
    <button
      onClick={handleClick}
      className="tn-card group relative flex w-full items-center justify-between p-6 cursor-pointer text-left"
      style={{ ["--tn-accent" as string]: "#00f0ff" }}
    >
      <CornerBracket corner="tl" />
      <CornerBracket corner="tr" />
      <CornerBracket corner="bl" />
      <CornerBracket corner="br" />

      <svg className="tn-perimeter pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" fill="none" stroke="#00f0ff" strokeWidth="1" />
      </svg>

      <div className="flex items-center gap-4">
        <Hexagon className="h-10 w-10" />
        <div>
          <div className="tn-font-display text-base font-bold uppercase tracking-[0.2em] text-[#a8e8ef] group-hover:text-[#e8feff] transition-colors">
            PROGRAM_TRANSFER
          </div>
          <div className="tn-mono text-[10px] tracking-[0.3em] text-[#00f0ff]/70">
            &gt; JUMP_NODE // {nextLabel}
          </div>
        </div>
      </div>

      <svg viewBox="0 0 40 12" className="h-3 w-10 text-[#00f0ff] transition-transform group-hover:translate-x-1 flex-shrink-0">
        <path d="M0,6 L32,6 M28,2 L34,6 L28,10" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </button>
  );
}

// ─── TronTheme (main export) ──────────────────────────────────────────────────

export default function TronTheme() {
  const { lang } = useLang();
  const t = TRON_T[lang];

  return (
    <div className="t-tron tn-bg-grid relative min-h-screen overflow-hidden">
      <MatrixRain />
      <div className="tn-bg-haze pointer-events-none absolute inset-0 z-[1]" />
      <div className="tn-heartbeat pointer-events-none absolute inset-0 z-[1]" />
      <div className="tn-hbeam tn-hbeam-1 pointer-events-none absolute inset-x-0 z-[1]" />
      <div className="tn-hbeam tn-hbeam-2 pointer-events-none absolute inset-x-0 z-[1]" />
      <div className="tn-hbeam tn-hbeam-3 pointer-events-none absolute inset-x-0 z-[1]" />
      <PerspectiveGrid />
      <div className="tn-vignette pointer-events-none absolute inset-0 z-[3]" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12">

        {/* ── Header ── */}
        <header className="tn-frame-master tn-reveal relative mb-16 px-6 py-12 sm:px-12 sm:py-16">
          <CornerBracket corner="tl" />
          <CornerBracket corner="tr" />
          <CornerBracket corner="bl" />
          <CornerBracket corner="br" />
          <HeaderCircuits />

          <LogoFX />

          <div className="relative text-center">
            <p className="tn-mono mb-3 text-[10px] tracking-[0.5em] text-[#00f0ff]/70">
              {t.systemTag}
            </p>
            <h1
              className="tn-font-display tn-glow-strong tn-glitch-strong mb-4 text-4xl font-black uppercase tracking-[0.2em] sm:text-6xl md:text-7xl"
              data-text={t.heroTitle}
            >
              {t.heroTitle}
            </h1>
            <p className="tn-mono mb-6 text-xs tracking-[0.4em] text-[#00f0ff]">
              {t.subtitle}
            </p>
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-[#00f0ff]" />
                <span className="tn-mono text-[10px] tracking-[0.3em] text-[#00f0ff]/70">
                  {t.bootLabel}
                </span>
                <div className="h-px w-12 bg-[#00f0ff]" />
              </div>
              <p className="tn-font-body text-base leading-relaxed text-[#a8e8ef]">
                {t.heroBody}
              </p>
            </div>
          </div>
        </header>

        {/* ── Projects section ── */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <Hexagon className="h-6 w-6" />
            <span className="tn-mono text-[11px] tracking-[0.4em] text-[#00f0ff]">
              {t.activePrograms} // {projects.length}_NODES
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00f0ff] to-transparent" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} lang={lang} />
            ))}
          </div>
        </section>

        {/* ── Next theme ── */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <Hexagon className="h-6 w-6" stroke="#7fa8b3" />
            <span className="tn-mono text-[11px] tracking-[0.4em] text-[#7fa8b3]">
              TRANSFER_NODE // JUMP_GRID
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#7fa8b3] to-transparent" />
          </div>
          <NextThemeButton />
        </section>

        {/* ── Footer ── */}
        <footer className="mt-24 mb-8 text-center">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00f0ff]" />
            <Hexagon className="h-5 w-5" />
            <div className="h-px flex-1 bg-gradient-to-r from-[#00f0ff] to-transparent" />
          </div>
          <div className="tn-font-display text-sm uppercase tracking-[0.5em] text-[#00f0ff]">
            AGRIM // PORTFOLIO
          </div>
          <div className="tn-mono mt-3 text-[10px] tracking-[0.4em] text-[#00f0ff]/50">
            {t.totalNodes(projects.length)}
          </div>
          <div className="tn-mono mt-4 text-[10px] tracking-[0.3em] text-[#00f0ff]/40">
            {t.footer}
          </div>
        </footer>
      </main>
    </div>
  );
}
