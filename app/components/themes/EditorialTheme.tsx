"use client";

import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";
import { useLang } from "../../lib/lang-context";
import { EDITORIAL_T, PROJECT_ES, SHARED } from "../../lib/i18n";

export default function EditorialTheme() {
  const { lang } = useLang();
  const t = EDITORIAL_T[lang];
  const sh = SHARED[lang];

  return (
    <div className="t-editorial min-h-screen relative overflow-hidden grain">
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(0,0,0,0.05), transparent 30%), radial-gradient(circle at 100% 100%, rgba(0,0,0,0.05), transparent 30%)",
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-10 py-12">
        {/* Masthead */}
        <header className="border-y-[3px] border-[var(--ink)] py-4 mb-12 flex items-center justify-between">
          <span className="text-xs tracking-widest uppercase">{t.vol}</span>
          <h1
            className="text-3xl font-black uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-display-editorial)" }}
          >
            The Idyllic Review
          </h1>
          <span className="text-xs tracking-widest uppercase">{t.date}</span>
        </header>

        {/* Front-page splash */}
        <section className="grid md:grid-cols-12 gap-8 mb-20 border-b-2 border-[var(--ink)] pb-16">
          <div className="md:col-span-8">
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3 text-[var(--red)]">
              ★ Lead Story · Portfolio Issue ★
            </div>
            <h2
              className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.85] mb-6 uppercase"
              style={{ fontFamily: "var(--font-display-editorial)" }}
            >
              <span className="italic font-normal">A solo</span>
              <br />
              studio
              <br />
              <span className="underline-rough">building</span>
              <br />
              <span className="italic font-normal">eleven</span> things
              <br />
              at once.
            </h2>
            <div className="flex items-center gap-3 text-sm">
              <span className="block w-12 h-px bg-[var(--ink)]" />
              <span className="uppercase tracking-[0.25em] text-xs">{t.byline}</span>
            </div>
          </div>
          <aside
            className="md:col-span-4 border-l-2 border-[var(--ink)] pl-6 text-base leading-relaxed columns-1"
            style={{ fontFamily: "var(--font-display-editorial)" }}
          >
            <div className="mb-4">
              <ThemedPortrait variant="editorial" size={150} />
              <div className="mt-2 text-[10px] tracking-[0.3em] uppercase font-bold" style={{ fontFamily: "var(--font-body-editorial)", color: "var(--red)" }}>
                {t.photoCaption}
              </div>
            </div>
            <p className="mb-4 first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:leading-[0.85] first-letter:text-[var(--red)]">
              {t.body1}
            </p>
            <p className="italic">
              {t.body2}
            </p>
          </aside>
        </section>

        {/* Projects */}
        <section>
          <div className="border-b-[3px] border-[var(--ink)] pb-2 mb-8 flex items-baseline justify-between">
            <h3
              className="text-3xl uppercase font-black tracking-tight"
              style={{ fontFamily: "var(--font-display-editorial)" }}
            >
              {t.catalogTitle}
            </h3>
            <span className="text-xs tracking-[0.3em] uppercase">{t.continued}</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {projects.map((p, i) => {
              const sizes = ["lg:col-span-2", "", "", "", "lg:col-span-2", "", "", "", "", "", ""];
              const tagline = lang === "es" ? (PROJECT_ES[p.id]?.tagline ?? p.tagline) : p.tagline;
              const description = lang === "es" ? (PROJECT_ES[p.id]?.description ?? p.description) : p.description;
              return (
                <article
                  key={p.id}
                  className={`relative ${sizes[i] ?? ""} border-t-2 border-[var(--ink)] pt-4`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <span
                      className="text-[10px] tracking-[0.35em] uppercase"
                      style={{ fontFamily: "var(--font-body-editorial)" }}
                    >
                      Section {String.fromCharCode(65 + (i % 5))} · No. {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <a
                    href={p.url ?? "#"}
                    target={p.url ? "_blank" : undefined}
                    rel="noreferrer"
                    className="block group"
                  >
                    <h4
                      className={`font-black leading-[0.9] mb-3 ${i === 0 ? "text-7xl" : i === 4 ? "text-6xl italic" : "text-4xl"}`}
                      style={{ fontFamily: "var(--font-display-editorial)" }}
                    >
                      <span className="group-hover:underline-rough">{p.name}</span>
                    </h4>
                    <p
                      className="italic text-lg mb-4 opacity-80"
                      style={{ fontFamily: "var(--font-display-editorial)" }}
                    >
                      {tagline}
                    </p>
                    <p
                      className={`text-base leading-relaxed mb-4 ${i % 3 === 1 ? "columns-2 gap-4" : ""}`}
                      style={{ fontFamily: "var(--font-body-editorial)" }}
                    >
                      <span className="font-bold uppercase tracking-wider mr-1">
                        {p.category === "idyllic" ? "Santiago —" : p.category === "social" ? "Worldwide —" : "Chile —"}
                      </span>
                      {description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] opacity-70">
                      {p.tags.map((tag, j) => (
                        <span key={tag}>
                          {tag}
                          {j < p.tags.length - 1 && <span className="ml-3 opacity-50">·</span>}
                        </span>
                      ))}
                    </div>
                  </a>
                  {p.github && (
                    <div className="flex items-center gap-4 mt-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] uppercase tracking-[0.25em] opacity-70 hover:opacity-100 transition-opacity"
                        style={{ fontFamily: "var(--font-body-editorial)" }}
                      >
                        {sh.github}
                      </a>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <footer className="mt-24 pt-6 border-t-[3px] border-[var(--ink)] flex justify-between text-xs uppercase tracking-[0.3em]">
          <span>{t.footer}</span>
          <span className="italic">{t.end}</span>
        </footer>
      </div>
    </div>
  );
}
