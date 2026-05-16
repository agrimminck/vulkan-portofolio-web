"use client";

import { useLang } from "../../lib/lang-context";
import { useNextTheme } from "../../lib/next-theme-context";
import { projects } from "../../lib/projects";
import { NETFLIX_T, SHARED, PROJECT_ES } from "../../lib/i18n";
import type { Project } from "../../lib/projects";

// ── Helpers ───────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

function statusBadge(status: Project["status"], sh: { live: string; wip: string; standby: string }): string {
  if (status === "live") return sh.live;
  if (status === "wip") return sh.wip;
  return sh.standby;
}

function statusColor(status: Project["status"]): string {
  if (status === "live") return "#46d369";
  if (status === "wip") return "#e50914";
  return "#777";
}

// ── GitHub SVG ────────────────────────────────────────────────────────────────

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────

type CardProps = {
  project: Project;
  index: number;
  lang: "en" | "es";
  sh: typeof SHARED["en"];
};

function ProjectCard({ project: p, index, lang, sh }: CardProps) {
  const tagline = lang === "es" ? (PROJECT_ES[p.id]?.tagline ?? p.tagline) : p.tagline;
  const description =
    lang === "es" ? (PROJECT_ES[p.id]?.description ?? p.description) : p.description;

  return (
    <div
      className="nf-card nf-card-enter group relative flex-shrink-0"
      style={{
        width: 320,
        height: 180,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Thumbnail background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${p.accent}22 0%, ${p.accent}44 50%, #111 100%)`,
        }}
      />

      {/* Ken-burns layer — subtle texture */}
      <div
        className="nf-kenburns absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 40%, ${p.accent}88 0%, transparent 60%)`,
        }}
      />

      {/* Big initials watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontSize: "7rem",
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "0.02em",
          color: p.accent,
          opacity: 0.12,
        }}
      >
        {initials(p.name)}
      </div>

      {/* Top row: name + icon links */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3 z-10">
        <span
          className="nf-display text-white text-sm font-semibold uppercase tracking-wide leading-tight max-w-[65%]"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
        >
          {p.name}
        </span>
        <div className="flex items-center gap-1.5">
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
              title="Visit"
            >
              <LinkIcon size={13} />
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
              title="GitHub"
            >
              <GithubIcon size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom: year + status badge */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-3 z-10">
        <span className="text-[10px] text-white/40 font-mono">MMXXVI</span>
        <span
          className="text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-sm"
          style={{
            background: `${statusColor(p.status)}22`,
            color: statusColor(p.status),
            border: `1px solid ${statusColor(p.status)}55`,
          }}
        >
          {statusBadge(p.status, sh)}
        </span>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 z-20"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)" }}
      >
        <p
          className="text-white/70 text-[11px] leading-snug mb-3 line-clamp-2"
          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          {description}
        </p>
        <p className="text-white/50 text-[10px] italic mb-3 leading-snug">{tagline}</p>
        <div className="flex items-center gap-2">
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-sm text-white transition-all hover:brightness-110"
              style={{ background: "#e50914" }}
            >
              <PlayIcon size={10} />
              Play
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-sm text-white transition-all hover:bg-white/20"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              <GithubIcon size={10} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function NetflixTheme() {
  const { lang } = useLang();
  const { onNext, nextLabel } = useNextTheme();
  const t = NETFLIX_T[lang];
  const sh = SHARED[lang];

  const idyllic = projects.find((p) => p.id === "idyllic-mmo");
  const others = projects.filter((p) => p.id !== "idyllic-mmo");

  const idyllicTagline =
    lang === "es"
      ? (PROJECT_ES["idyllic-mmo"]?.tagline ?? idyllic?.tagline ?? "")
      : (idyllic?.tagline ?? "");

  return (
    <div className="t-netflix min-h-screen relative">
      {/* Cinema bars */}
      <div className="nf-cinema-bar" style={{ top: 0 }} />
      <div className="nf-cinema-bar" style={{ bottom: 0 }} />

      {/* ── Top nav ──────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-[18px] left-0 right-0 z-30 flex items-center justify-between px-8 md:px-16 py-3"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)",
        }}
      >
        <div
          className="nf-billboard nf-pulse text-3xl select-none"
          style={{ letterSpacing: "0.03em" }}
        >
          <span style={{ color: "#fff" }}>AGRIM</span>
          <span style={{ color: "#e50914" }}>FLIX</span>
        </div>
        <span
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "#777", fontFamily: "Inter, system-ui, sans-serif" }}
        >
          {t.topNav}
        </span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center"
        style={{
          minHeight: "80vh",
          paddingTop: "18px",
          background: "linear-gradient(135deg, #1a0000 0%, #2d0000 30%, #0b0b0b 70%, #000 100%)",
        }}
      >
        {/* Giant N watermark */}
        <div
          className="nf-bigN absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden"
          style={{ zIndex: 0 }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "min(60vw, 700px)",
              lineHeight: 1,
              color: "#e50914",
              opacity: 0.04,
              letterSpacing: "-0.04em",
              paddingRight: "2vw",
              userSelect: "none",
            }}
          >
            N
          </span>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "30%",
            background:
              "linear-gradient(to bottom, transparent, #0b0b0b)",
            zIndex: 2,
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center gap-12 py-24 md:py-32">
          {/* Left: text */}
          <div className="flex-1 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-4 font-semibold"
              style={{ color: "#e50914", fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {t.heroTag}
            </p>
            <h1
              className="nf-billboard leading-none mb-6"
              style={{
                fontSize: "clamp(5rem, 12vw, 10rem)",
                letterSpacing: "-0.01em",
                color: "#fff",
                textShadow: "0 4px 40px rgba(229,9,20,0.3)",
              }}
            >
              {t.heroTitle}
            </h1>
            <p
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-4 max-w-xl"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {t.heroDesc}
            </p>
            <p
              className="text-white/50 text-sm italic mb-8"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {idyllicTagline}
            </p>
            <div className="flex items-center flex-wrap gap-3">
              {idyllic?.url && (
                <a
                  href={idyllic.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-sm text-white transition-all hover:brightness-110 active:scale-95"
                  style={{ background: "#e50914", minWidth: 120 }}
                >
                  <PlayIcon size={14} />
                  {t.heroPlay}
                </a>
              )}
              {idyllic?.github && (
                <a
                  href={idyllic.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-sm text-white transition-all hover:bg-white/20 active:scale-95"
                  style={{
                    background: "rgba(109,109,110,0.7)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <GithubIcon size={14} />
                  {t.heroGithub}
                </a>
              )}
            </div>
          </div>

          {/* Right: movie poster art */}
          <div
            className="flex-shrink-0 hidden md:flex items-center justify-center"
            style={{ width: 300, height: 420 }}
          >
            <div
              className="relative w-full h-full rounded-lg overflow-hidden"
              style={{
                background: `linear-gradient(160deg, #1a0000 0%, #3d0000 30%, #c8a86b22 70%, #000 100%)`,
                border: "1px solid rgba(229,9,20,0.3)",
                boxShadow:
                  "0 0 0 1px rgba(229,9,20,0.15), 0 40px 80px -20px rgba(229,9,20,0.4), 0 0 120px -30px rgba(229,9,20,0.25)",
              }}
            >
              {/* Ken-burns glow inside poster */}
              <div
                className="nf-kenburns absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 30%, rgba(200,168,107,0.25) 0%, rgba(229,9,20,0.15) 40%, transparent 70%)",
                }}
              />
              {/* Shimmer sweep */}
              <div className="nf-shimmer absolute inset-0" />
              {/* Portrait photo */}
              <img
                src="/api/portrait/netflix"
                alt="Portrait"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/me.jpg"; }}
              />
              {/* Idyllic helm logo */}
              <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
                <img
                  src="/idyllic-helm.png"
                  alt="Idyllic"
                  style={{
                    height: 56,
                    width: "auto",
                    filter: "drop-shadow(0 0 12px rgba(229,9,20,0.9)) drop-shadow(0 0 30px rgba(229,9,20,0.5))",
                    opacity: 0.92,
                  }}
                />
              </div>
              {/* Poster label bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)",
                }}
              >
                <div
                  className="nf-billboard text-4xl text-white mb-1"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Idyllic
                </div>
                <div
                  className="text-[10px] tracking-[0.35em] uppercase"
                  style={{ color: "#e50914", fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  MMXXVI · WIP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
          style={{ color: "#777" }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {lang === "es" ? "Proyectos" : "Projects"}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17l-7-7h14z" />
          </svg>
        </div>
      </section>

      {/* ── Rows ─────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 pb-32"
        style={{ background: "linear-gradient(to bottom, #0b0b0b 0%, #000 100%)" }}
      >
        {/* Row: All Projects */}
        <section className="pt-10 pb-6">
          <div className="px-8 md:px-16 mb-4">
            <h2
              className="nf-display text-white text-xl uppercase tracking-widest"
              style={{ fontWeight: 600 }}
            >
              {t.rowAll}
            </h2>
          </div>
          <div
            className="flex gap-4 overflow-x-auto px-8 md:px-16 pb-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(229,9,20,0.3) transparent" }}
          >
            {others.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} lang={lang} sh={sh} />
            ))}
          </div>
        </section>

        {/* Catalogue count */}
        <div className="px-8 md:px-16 pt-4 pb-2">
          <p
            className="text-[12px] tracking-widest uppercase"
            style={{ color: "#555", fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {projects.length} {t.totalLabel}
          </p>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="text-center py-10 pb-12"
        style={{
          color: "#555",
          fontSize: "11px",
          letterSpacing: "0.08em",
          fontFamily: "Inter, system-ui, sans-serif",
          background: "#000",
        }}
      >
        {t.footer}
      </footer>

      {/* ── Next theme — "Up Next" panel ─────────────────────────────────── */}
      <button
        type="button"
        onClick={(e) => onNext(e.clientX, e.clientY)}
        className="fixed bottom-10 right-6 z-40 group flex items-center gap-3 rounded-sm overflow-hidden transition-all hover:scale-105 active:scale-95"
        style={{
          background: "#181818",
          border: "1px solid rgba(229,9,20,0.35)",
          boxShadow: "0 8px 32px -8px rgba(229,9,20,0.4)",
          minWidth: 220,
        }}
        aria-label={`Switch to ${nextLabel} theme`}
      >
        {/* Left: red play arrow */}
        <div
          className="flex items-center justify-center flex-shrink-0 w-10 h-full self-stretch"
          style={{ background: "#e50914" }}
        >
          <PlayIcon size={16} />
        </div>
        {/* Right: text + progress bar */}
        <div className="flex flex-col items-start py-2.5 pr-4 gap-0.5 min-w-0">
          <span
            className="text-[9px] tracking-[0.25em] uppercase"
            style={{ color: "#777", fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {lang === "es" ? "A continuación" : "Up Next"}
          </span>
          <span
            className="text-white text-xs font-semibold truncate max-w-[160px]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            {nextLabel}
          </span>
          {/* Red progress bar at bottom of button */}
          <div
            className="w-full mt-1.5 rounded-full overflow-hidden"
            style={{ height: 2, background: "rgba(229,9,20,0.2)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: "100%",
                background: "#e50914",
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
