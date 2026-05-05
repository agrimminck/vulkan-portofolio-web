"use client";

import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";
import { useLang } from "../../lib/lang-context";
import { HOLOGRAPHIC_T, PROJECT_ES, SHARED } from "../../lib/i18n";

export default function HolographicTheme() {
  const { lang } = useLang();
  const t = HOLOGRAPHIC_T[lang];
  const sh = SHARED[lang];

  return (
    <div className="t-holo holo-mesh min-h-screen relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full orb-1"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(160,20,90,0.45), transparent 70%)",
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[10%] w-96 h-96 rounded-full orb-2"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0,70,130,0.45), transparent 70%)",
            filter: "blur(65px)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[40%] w-80 h-80 rounded-full orb-3"
          style={{
            background: "radial-gradient(circle at 60% 40%, rgba(80,20,140,0.45), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-10 py-16">
        <header className="mb-20 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-9">
            <div className="text-[10px] tracking-[0.5em] uppercase opacity-70 mb-4 iridescent inline-block">
              {t.title}
            </div>
            <h1
              className="text-7xl md:text-[9rem] leading-[0.9] font-normal"
              style={{ fontFamily: "var(--font-display-holo)" }}
            >
              <span className="iridescent">Soft</span>ware
              <br />
              from <span className="italic iridescent">a parallel</span>
              <br />
              <span className="iridescent">timeline</span>.
            </h1>
            <p
              className="mt-6 text-lg max-w-2xl opacity-80 leading-relaxed font-mono"
              style={{ fontFamily: "var(--font-body-holo)" }}
            >
              {t.body(projects.length)}
            </p>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <ThemedPortrait variant="holographic" size={200} />
          </div>
        </header>

        {/* Stats holo */}
        <div className="mb-16">
          <div className="glass-card rounded-2xl p-5 inline-block">
            <div className="text-[10px] tracking-[0.3em] opacity-60 mb-1 font-mono">{t.sProjects}</div>
            <div
              className="text-5xl font-normal iridescent"
              style={{ fontFamily: "var(--font-display-holo)" }}
            >
              {projects.length}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const tagline = lang === "es" ? (PROJECT_ES[p.id]?.tagline ?? p.tagline) : p.tagline;
            const description = lang === "es" ? (PROJECT_ES[p.id]?.description ?? p.description) : p.description;
            return (
              <div
                key={p.id}
                className="group glass-card rounded-3xl p-6 relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                style={{ minHeight: 300 }}
              >
                {/* Per-card gradient blob */}
                <div
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${p.accent}, transparent 70%)`,
                    filter: "blur(30px)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.3em] opacity-60 font-mono">
                      №{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className="text-3xl mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-display-holo)" }}
                  >
                    <span className="iridescent">{p.name}</span>
                  </h3>
                  <p
                    className="text-sm italic mb-4 opacity-90"
                    style={{ fontFamily: "var(--font-display-holo)", color: p.accent }}
                  >
                    {tagline}
                  </p>
                  <p className="text-sm leading-relaxed opacity-75 mb-5 font-mono">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        {tag}
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
                          className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono font-bold iridescent transition-opacity hover:opacity-80"
                          style={{
                            background: "rgba(255,255,255,0.18)",
                            border: "1px solid rgba(255,255,255,0.45)",
                            borderRadius: "8px",
                            backdropFilter: "blur(8px)",
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
                            color: "rgba(255,255,255,0.7)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            borderRadius: "8px",
                          }}
                        >
                          {sh.github}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-24 glass-card rounded-2xl p-6 flex justify-between items-center">
          <span className="text-xs tracking-[0.3em] uppercase opacity-70 font-mono">
            {t.footer}
          </span>
          <span className="iridescent text-2xl" style={{ fontFamily: "var(--font-display-holo)" }}>
            ✦
          </span>
        </footer>
      </div>
    </div>
  );
}
