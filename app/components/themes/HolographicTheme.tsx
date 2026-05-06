"use client";

import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";
import { useLang } from "../../lib/lang-context";
import { HOLOGRAPHIC_T, PROJECT_ES, SHARED } from "../../lib/i18n";
import { useNextTheme } from "../../lib/next-theme-context";

export default function HolographicTheme() {
  const { lang } = useLang();
  const t = HOLOGRAPHIC_T[lang];
  const sh = SHARED[lang];
  const { onNext, nextLabel } = useNextTheme();

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
                          className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono font-bold transition-opacity hover:opacity-80"
                          style={{
                            background: "rgba(255,255,255,0.18)",
                            color: "rgba(255,255,255,0.95)",
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

        {/* Next design — orb portal glass card */}
        <div className="mt-20 mb-10 flex justify-center">
          <button
            aria-label={`Switch to ${nextLabel} theme`}
            onClick={(e) => onNext(e.clientX, e.clientY)}
            className="group cursor-pointer bg-transparent border-none p-0"
          >
            <div
              className="glass-card relative rounded-3xl px-12 py-8 flex flex-col items-center overflow-hidden transition-all duration-500"
              style={{ minWidth: 280 }}
              onMouseEnter={(e) => {
                const orb = e.currentTarget.querySelector<HTMLDivElement>(".holo-portal-orb");
                if (orb) orb.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                const orb = e.currentTarget.querySelector<HTMLDivElement>(".holo-portal-orb");
                if (orb) orb.style.opacity = "0.45";
              }}
            >
              {/* Decorative floating orb inside the card */}
              <div
                className="holo-portal-orb absolute -top-10 -right-10 w-40 h-40 rounded-full transition-opacity duration-500"
                style={{
                  opacity: 0.45,
                  background:
                    "radial-gradient(circle at 35% 35%, rgba(200,80,200,0.7), rgba(0,100,200,0.5) 50%, transparent 75%)",
                  filter: "blur(25px)",
                  animation: "orb-float-1 8s ease-in-out infinite",
                }}
              />
              <div
                className="relative text-[9px] tracking-[0.5em] uppercase mb-3 opacity-60 font-mono"
              >
                // PORTAL.OPEN
              </div>
              <div
                className="relative text-4xl md:text-5xl font-normal iridescent mb-2 transition-all duration-400 group-hover:tracking-wider"
                style={{ fontFamily: "var(--font-display-holo)" }}
              >
                <em>{nextLabel}</em>
              </div>
              {/* Chrome arrow SVG with hue-rotate */}
              <svg
                viewBox="0 0 48 24"
                width="48"
                height="24"
                className="mt-2 transition-transform duration-400 group-hover:translate-x-2"
                style={{ filter: "hue-rotate(0deg)", animation: "hue-rotate 6s linear infinite" }}
              >
                <defs>
                  <linearGradient id="holo-arrow-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(160,80,220,0.9)" />
                    <stop offset="50%" stopColor="rgba(0,180,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(220,80,160,0.9)" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 12 L36 12 M30 5 L42 12 L30 19"
                  stroke="url(#holo-arrow-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="relative mt-3 text-[10px] tracking-[0.3em] uppercase opacity-50 font-mono">
                {sh.nextHint}
              </div>
            </div>
          </button>
        </div>

        <footer className="glass-card rounded-2xl p-6 flex justify-between items-center">
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
