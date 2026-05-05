"use client";

import { projects } from "../../lib/projects";
import { useEffect, useState } from "react";
import ThemedPortrait from "../ThemedPortrait";
import { useLang } from "../../lib/lang-context";
import { CYBERPUNK_T, PROJECT_ES, SHARED } from "../../lib/i18n";

function GlitchText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="glitch">{children}</span>
    </span>
  );
}

function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const seq = [
      "> establishing uplink ········· OK",
      "> auth idyllic@core ··········· OK",
      "> loading manifest.dat ········ 11/11",
      "> rendering portfolio ········· DONE",
      "> ",
    ];
    let i = 0;
    const t = setInterval(() => {
      setLines((l) => [...l, seq[i]]);
      i++;
      if (i >= seq.length) clearInterval(t);
    }, 350);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="font-mono text-xs leading-relaxed text-[var(--neon-cyan)] opacity-80">
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      <span className="inline-block w-2 h-3 bg-[var(--neon-cyan)] animate-pulse" />
    </div>
  );
}

export default function CyberpunkTheme() {
  const { lang } = useLang();
  const t = CYBERPUNK_T[lang];
  const sh = SHARED[lang];

  return (
    <div className="t-cyber min-h-screen relative overflow-hidden">
      {/* Vapor + grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-70" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 100%, rgba(255,0,122,0.35), transparent 50%), radial-gradient(ellipse at 80% 0%, rgba(0,240,255,0.25), transparent 50%)",
        }}
      />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none mix-blend-overlay opacity-50" />
      <div
        className="absolute left-0 right-0 h-32 pointer-events-none opacity-30 z-30"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(0,240,255,0.12), transparent)",
          animation: "scan 7s linear infinite",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-12 flicker">
        <header className="border border-[var(--neon-pink)] p-6 mb-12 relative" style={{ boxShadow: "0 0 30px rgba(255,0,122,0.4), inset 0 0 30px rgba(255,0,122,0.05)" }}>
          <div className="absolute -top-3 left-6 px-2 bg-[var(--bg)] text-[10px] tracking-[0.3em] text-[var(--neon-pink)]">
            // SYS_HELLO.EXE
          </div>
          <div className="grid md:grid-cols-4 gap-6 items-end">
            <div className="md:col-span-2">
              <div className="text-[10px] tracking-[0.4em] text-[var(--neon-cyan)] mb-2">
                {t.nodeTag}
              </div>
              <h1
                className="text-7xl md:text-9xl font-normal leading-[0.85] uppercase"
                style={{ fontFamily: "var(--font-display-cyber)" }}
              >
                <GlitchText>IDYLLIC</GlitchText>
                <br />
                <span className="text-[var(--neon-pink)]">
                  <GlitchText>./WORLDS</GlitchText>
                </span>
              </h1>
            </div>
            <div className="border-l border-[var(--neon-cyan)] pl-4">
              <Terminal />
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <ThemedPortrait variant="cyberpunk" size={140} />
              <span className="text-[10px] tracking-[0.3em] text-[var(--neon-pink)] font-mono">
                ID:0xAGRM·LIVE
              </span>
            </div>
          </div>
        </header>

        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-4 mb-12" style={{ maxWidth: 480 }}>
          {[
            { k: t.sProjects, v: projects.length, c: "var(--neon-cyan)" },
            { k: t.sStandby, v: "99.9%", c: "var(--neon-cyan)" },
          ].map((s) => (
            <div
              key={s.k}
              className="border p-4 relative"
              style={{ borderColor: s.c, boxShadow: `0 0 20px ${s.c}66, inset 0 0 20px ${s.c}11` }}
            >
              <div className="text-[10px] tracking-[0.3em] opacity-60">{s.k}</div>
              <div className="text-3xl font-bold" style={{ color: s.c, fontFamily: "var(--font-display-cyber)" }}>
                {s.v}
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-4xl uppercase tracking-wider" style={{ fontFamily: "var(--font-display-cyber)" }}>
            <span className="text-[var(--neon-pink)]">[</span> {t.manifest} <span className="text-[var(--neon-pink)]">]</span>
          </h2>
          <span className="text-xs text-[var(--neon-cyan)] opacity-60">
            ls -la /portfolio | wc -l = {projects.length}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="group relative border border-[var(--neon-pink)]/40 hover:border-[var(--neon-cyan)] p-5 transition-all duration-300"
              style={{
                background: "rgba(0,0,0,0.5)",
                boxShadow: "0 0 0 transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(0,240,255,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 transparent";
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,240,255,0.06) 2px 3px)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between text-[10px] tracking-[0.25em] mb-3">
                  <span className="text-[var(--neon-cyan)]">/{String(i + 1).padStart(3, "0")}</span>
                </div>
                <h3
                  className="text-2xl mb-1 uppercase"
                  style={{ fontFamily: "var(--font-display-cyber)", color: "var(--neon-cyan)" }}
                >
                  {p.name}
                </h3>
                <div className="text-xs text-[var(--neon-pink)] mb-3 font-mono">
                  // {lang === "es" ? (PROJECT_ES[p.id]?.tagline ?? p.tagline) : p.tagline}
                </div>
                <p className="text-sm opacity-80 leading-relaxed mb-4 font-mono">
                  {lang === "es" ? (PROJECT_ES[p.id]?.description ?? p.description) : p.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-1.5 py-0.5 font-mono"
                      style={{ border: "1px solid var(--neon-violet)", color: "var(--neon-violet)" }}
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
                {(p.url || p.github) && (
                  <div className="flex items-center gap-2 mt-4">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono font-bold transition-opacity hover:opacity-80"
                        style={{
                          background: "var(--neon-cyan)",
                          color: "#000",
                        }}
                      >
                        {sh.visit}
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono font-bold transition-opacity hover:opacity-80"
                        style={{
                          background: "transparent",
                          color: "var(--neon-pink)",
                          border: "1px solid var(--neon-pink)",
                        }}
                      >
                        {sh.github}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-16 border-t border-[var(--neon-pink)]/40 pt-6 flex justify-between text-xs font-mono opacity-60">
          <span>{t.eof}</span>
          <span className="text-[var(--neon-cyan)]">^C to disconnect</span>
        </footer>
      </div>
    </div>
  );
}
