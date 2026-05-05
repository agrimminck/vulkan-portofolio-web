"use client";

import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";
import { useLang } from "../../lib/lang-context";
import { ORGANIC_T, PROJECT_ES, SHARED } from "../../lib/i18n";

function Blob({
  className,
  fill,
  d,
}: {
  className?: string;
  fill: string;
  d: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute ${className ?? ""}`} preserveAspectRatio="none">
      <path d={d} fill={fill} style={{ mixBlendMode: "multiply" }} />
    </svg>
  );
}

const palettes = [
  { bg: "#fde7c6", ink: "#2b1d12", accent: "#d97757" },
  { bg: "#dde7c7", ink: "#2b1d12", accent: "#506b3d" },
  { bg: "#f5cfd5", ink: "#2b1d12", accent: "#6b3a5b" },
  { bg: "#cfe1e8", ink: "#1a2a30", accent: "#3d6b6b" },
  { bg: "#f4d39e", ink: "#2b1d12", accent: "#a65b30" },
  { bg: "#e8d5e1", ink: "#2b1d12", accent: "#a85a8c" },
];

export default function OrganicTheme() {
  const { lang } = useLang();
  const t = ORGANIC_T[lang];
  const sh = SHARED[lang];

  const tags = [t.tag1, t.tag2, t.tag3, t.tag4, t.tag5];

  return (
    <div className="t-organic min-h-screen relative overflow-hidden grain">
      {/* Floating blobs background */}
      <div className="absolute inset-0 pointer-events-none">
        <Blob
          className="blob-1 -top-32 -left-20 w-[500px] h-[500px]"
          fill="rgba(217,119,87,0.55)"
          d="M44.5,-58.4C56.4,-50.4,64.5,-35.6,68.4,-19.7C72.4,-3.9,72.1,13,65.7,27.3C59.3,41.7,46.7,53.5,32.1,60.5C17.5,67.5,0.9,69.7,-15.1,66.5C-31.1,63.3,-46.5,54.7,-56.5,42C-66.5,29.3,-71.2,12.5,-69.6,-3.3C-68,-19.1,-60.2,-33.9,-48.6,-42.5C-37,-51,-21.7,-53.3,-5.3,-47.2C11.1,-41.1,32.6,-66.4,44.5,-58.4Z"
        />
        <Blob
          className="blob-2 top-40 -right-32 w-[600px] h-[600px]"
          fill="rgba(80,107,61,0.35)"
          d="M40.6,-58.4C53.5,-49.6,65.6,-39.5,71.4,-26.3C77.2,-13.1,76.8,3.2,71.5,17.5C66.3,31.8,56.2,44.1,43.5,53.6C30.8,63.1,15.4,69.8,0.6,69C-14.2,68.2,-28.4,59.9,-40.6,49.5C-52.7,39,-62.8,26.4,-67.7,11.4C-72.6,-3.6,-72.4,-21,-65.1,-34.3C-57.7,-47.6,-43.3,-56.8,-29.1,-65.1C-15,-73.4,-1.2,-80.7,9.5,-78.1C20.2,-75.5,27.7,-67.2,40.6,-58.4Z"
        />
        <Blob
          className="blob-1 bottom-0 left-1/3 w-[450px] h-[450px]"
          fill="rgba(107,58,91,0.3)"
          d="M37.4,-50.7C49.2,-42,59.7,-30.6,64.7,-16.7C69.7,-2.8,69.1,13.7,62.1,26.7C55.1,39.7,41.6,49.3,27,55.4C12.4,61.5,-3.4,64.1,-18.6,60.5C-33.7,56.9,-48.3,47.1,-56.5,33.5C-64.8,19.9,-66.6,2.5,-62.1,-12.5C-57.5,-27.6,-46.5,-40.3,-33.4,-49.6C-20.4,-58.9,-5.3,-64.7,7.7,-65C20.7,-65.3,25.5,-59.4,37.4,-50.7Z"
        />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-10 py-16">
        {/* Sticker hero */}
        <header className="mb-16 relative">
          <div className="absolute top-0 right-0 hidden md:block" style={{ transform: "rotate(4deg)" }}>
            <ThemedPortrait variant="organic" size={170} />
            <div
              className="mt-2 text-center text-lg italic"
              style={{ fontFamily: "var(--font-body-organic)", color: "var(--terra)" }}
            >
              {t.role}
            </div>
          </div>
          <div className="inline-block transform -rotate-2 mb-6">
            <span
              className="inline-block px-5 py-1.5 text-xs uppercase tracking-[0.3em] font-bold"
              style={{
                background: "var(--terra)",
                color: "var(--bg)",
                borderRadius: "999px",
                border: "2px solid var(--ink)",
              }}
            >
              {t.title}
            </span>
          </div>
          <h1
            className="text-7xl md:text-[10rem] leading-[0.9] mb-6 font-black"
            style={{ fontFamily: "var(--font-display-organic)" }}
          >
            grown
            <br />
            <span style={{ color: "var(--terra)" }} className="italic">slowly,</span>
            <br />
            with hands.
          </h1>
          <p
            className="text-3xl max-w-2xl"
            style={{ fontFamily: "var(--font-body-organic)", color: "var(--moss)" }}
          >
            {t.body}
          </p>
        </header>

        {/* Big sticker decorations */}
        <div className="flex flex-wrap gap-3 mb-12 items-center">
          {tags.map((s, i) => (
            <span
              key={s}
              className="inline-block px-4 py-2 text-sm font-bold border-2 border-[var(--ink)]"
              style={{
                background: ["var(--bg)", "var(--terra)", "var(--moss)", "var(--plum)", "var(--bg)"][i],
                color: i === 0 || i === 4 ? "var(--ink)" : "var(--bg)",
                borderRadius: "999px",
                transform: `rotate(${[-2, 1, -1, 2, -1.5][i]}deg)`,
                fontFamily: "var(--font-display-organic)",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Projects as polaroids/stickers */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => {
            const pal = palettes[i % palettes.length];
            const rot = [-2, 1.5, -1, 2, -1.5, 1, -2, 1, -1, 2, 0][i];
            const tagline = lang === "es" ? (PROJECT_ES[p.id]?.tagline ?? p.tagline) : p.tagline;
            const description = lang === "es" ? (PROJECT_ES[p.id]?.description ?? p.description) : p.description;
            return (
              <div
                key={p.id}
                className="block relative transition-transform duration-300 hover:scale-105"
                style={{
                  background: pal.bg,
                  color: pal.ink,
                  border: "3px solid var(--ink)",
                  borderRadius: "32px 12px 32px 12px",
                  padding: "1.75rem 1.5rem",
                  transform: `rotate(${rot}deg)`,
                  boxShadow: `8px 8px 0 var(--ink)`,
                  minHeight: 280,
                }}
              >
                {/* Tape */}
                <div
                  className="absolute top-0 left-1/2 w-20 h-6 -translate-x-1/2 -translate-y-3 opacity-60"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    borderLeft: "1px dashed rgba(0,0,0,0.2)",
                    borderRight: "1px dashed rgba(0,0,0,0.2)",
                    transform: `translateX(-50%) translateY(-12px) rotate(${-rot * 2}deg)`,
                  }}
                />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs opacity-60 font-bold">·{String(i + 1).padStart(2, "0")}·</span>
                </div>
                <h3
                  className="text-3xl font-black leading-tight mb-1"
                  style={{ fontFamily: "var(--font-display-organic)" }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-xl mb-4"
                  style={{
                    fontFamily: "var(--font-body-organic)",
                    color: pal.accent,
                  }}
                >
                  ✿ {tagline}
                </p>
                <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "system-ui" }}>
                  {description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider"
                      style={{
                        background: "transparent",
                        border: `1.5px dashed ${pal.ink}`,
                        borderRadius: "999px",
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
                        className="inline-flex items-center px-4 py-2 text-[11px] font-black uppercase tracking-wider hover:opacity-80 transition-opacity"
                        style={{
                          background: pal.ink,
                          color: pal.bg,
                          borderRadius: "999px",
                          fontFamily: "var(--font-display-organic)",
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
                        className="inline-flex items-center px-4 py-2 text-[11px] font-black uppercase tracking-wider hover:opacity-80 transition-opacity"
                        style={{
                          background: "transparent",
                          color: pal.ink,
                          borderRadius: "999px",
                          border: `2px solid ${pal.ink}`,
                          fontFamily: "var(--font-display-organic)",
                        }}
                      >
                        {sh.github}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <footer className="mt-24 text-center">
          <p
            className="text-2xl"
            style={{ fontFamily: "var(--font-body-organic)", color: "var(--moss)" }}
          >
            {t.footer}
          </p>
        </footer>
      </div>
    </div>
  );
}
