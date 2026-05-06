"use client";

import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";
import { useLang } from "../../lib/lang-context";
import { REFINED_T, PROJECT_ES, SHARED } from "../../lib/i18n";
import { useNextTheme } from "../../lib/next-theme-context";

export default function RefinedTheme() {
  const { lang } = useLang();
  const t = REFINED_T[lang];
  const sh = SHARED[lang];
  const { onNext, nextLabel } = useNextTheme();

  return (
    <div className="t-refined min-h-screen relative overflow-hidden">
      {/* Subtle floating orbs (refined, very low opacity) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[8%] left-[12%] w-96 h-96 rounded-full refined-orb"
          style={{
            background: "radial-gradient(circle, rgba(30,58,95,0.06), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-[55%] right-[8%] w-[28rem] h-[28rem] rounded-full refined-orb"
          style={{
            background: "radial-gradient(circle, rgba(176,138,62,0.07), transparent 70%)",
            filter: "blur(50px)",
            animationDelay: "6s",
          }}
        />
        <div
          className="absolute bottom-[5%] left-[35%] w-80 h-80 rounded-full refined-orb"
          style={{
            background: "radial-gradient(circle, rgba(30,58,95,0.05), transparent 70%)",
            filter: "blur(45px)",
            animationDelay: "12s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1180px] mx-auto px-8 md:px-12 py-16 md:py-24">
        {/* Header band */}
        <div className="flex items-center justify-between mb-20 refined-rise" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--ink-muted)]">
              {t.eyebrow}
            </span>
          </div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--ink-muted)] hidden md:inline">
            {t.location}
          </span>
        </div>

        {/* Hero — portrait + intro */}
        <section className="grid md:grid-cols-12 gap-10 md:gap-16 mb-28 items-center">
          <div className="md:col-span-3 flex md:justify-start refined-rise" style={{ animationDelay: "0.1s" }}>
            <ThemedPortrait variant="refined" size={200} />
          </div>
          <div className="md:col-span-9 refined-rise" style={{ animationDelay: "0.25s" }}>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-6">
              <span style={{ fontStyle: "italic" }}>{t.headline}</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--ink-soft)] max-w-2xl leading-relaxed">
              {t.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--ink-muted)]">
              <span>
                <span className="text-[var(--ink)] font-medium">{projects.length}</span> {t.statTotal}
              </span>
            </div>
          </div>
        </section>

        <div className="refined-divider mb-20" />

        {/* Projects */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-12 refined-rise">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-[var(--ink-muted)] mb-2">
                {t.sectionTitle}
              </div>
              <h2 className="text-3xl md:text-5xl">{t.colophon}</h2>
            </div>
            <span className="text-sm text-[var(--ink-muted)] italic hidden md:inline">
              {t.updated}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="refined-card group relative p-7 md:p-8 refined-rise overflow-hidden"
                style={{ animationDelay: `${0.35 + i * 0.06}s` }}
              >
                {/* Accent stripe */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500 group-hover:w-[5px]"
                  style={{ background: p.accent }}
                />
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--ink-muted)]">
                    {String(i + 1).padStart(2, "0")} &nbsp;·&nbsp;{" "}
                    {p.category === "idyllic"
                      ? sh.studio
                      : p.category === "social"
                        ? sh.openSource
                        : sh.product}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl mb-2" style={{ fontFamily: "var(--font-display-refined)" }}>
                  {p.name}
                </h3>
                <p
                  className="italic text-[var(--ink-soft)] mb-5"
                  style={{ fontFamily: "var(--font-display-refined)", fontSize: "1.1rem" }}
                >
                  {lang === "es" ? (PROJECT_ES[p.id]?.tagline ?? p.tagline) : p.tagline}
                </p>
                <p className="text-[15px] leading-relaxed text-[var(--ink-soft)] mb-6">
                  {lang === "es" ? (PROJECT_ES[p.id]?.description ?? p.description) : p.description}
                </p>
                <div className="flex items-end justify-between">
                  <div className="text-xs text-[var(--ink-muted)] tracking-wide flex flex-wrap gap-x-2 gap-y-1">
                    {p.tags.map((tag, j) => (
                      <span key={tag}>
                        {tag}
                        {j < p.tags.length - 1 && <span className="ml-2 opacity-40">·</span>}
                      </span>
                    ))}
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-opacity hover:opacity-80"
                        style={{
                          fontFamily: "var(--font-body-refined)",
                          background: "var(--ink)",
                          color: "var(--bg)",
                          borderRadius: "5px",
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
                        className="inline-flex items-center px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-opacity hover:opacity-80"
                        style={{
                          fontFamily: "var(--font-body-refined)",
                          background: "transparent",
                          color: "var(--ink)",
                          borderRadius: "5px",
                          border: "1px solid var(--ink-muted)",
                        }}
                      >
                        {sh.github}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="refined-divider mb-12" />

        {/* Next design — typographic arrow */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[var(--ink-muted)] mb-3"
            style={{ fontFamily: "var(--font-body-refined)" }}
          >
            {sh.next}
          </span>
          <button
            aria-label={`Switch to ${nextLabel} theme`}
            onClick={(e) => onNext(e.clientX, e.clientY)}
            className="group flex flex-col items-center cursor-pointer bg-transparent border-none p-0"
            style={{ fontFamily: "var(--font-display-refined)" }}
          >
            <h2
              className="text-4xl md:text-6xl italic transition-transform duration-500 group-hover:translate-x-3"
              style={{ color: "var(--ink)" }}
            >
              {nextLabel} &rarr;
            </h2>
            <span
              className="block mt-3 w-16 h-px transition-all duration-500 group-hover:w-28"
              style={{ background: "var(--ink)", opacity: 0.35 }}
            />
          </button>
          <span
            className="mt-3 text-[11px] tracking-[0.25em] uppercase text-[var(--ink-muted)] opacity-60"
            style={{ fontFamily: "var(--font-body-refined)" }}
          >
            {sh.nextHint}
          </span>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--ink-muted)]">
          <span>{t.footer}</span>
          <span className="italic" style={{ fontFamily: "var(--font-display-refined)" }}>
            {t.tagline}
          </span>
        </footer>
      </div>
    </div>
  );
}
