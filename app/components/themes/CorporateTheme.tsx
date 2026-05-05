"use client";

import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";

function PlaneSilhouette({ className, scale = 1 }: { className?: string; scale?: number }) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={className}
      style={{ width: 120 * scale, height: 48 * scale }}
      fill="none"
    >
      <path
        d="M10 40 L80 38 L130 20 L150 12 C160 10 170 18 165 28 L155 38 L185 40 L155 44 L165 54 C170 64 160 72 150 70 L130 62 L80 44 L10 42 Z"
        fill="rgba(10, 37, 64, 0.85)"
      />
      <line x1="40" y1="40" x2="190" y2="38" stroke="rgba(10, 37, 64, 0.25)" strokeWidth="1" strokeDasharray="2 4" />
    </svg>
  );
}

function Contrail({ x, y, w }: { x: string; y: string; w: number }) {
  return (
    <div
      className="absolute h-px"
      style={{
        left: x,
        top: y,
        width: `${w}vw`,
        background: "linear-gradient(90deg, transparent, rgba(10,37,64,0.3), transparent)",
      }}
    />
  );
}

export default function CorporateTheme() {
  return (
    <div className="t-corporate min-h-screen relative overflow-hidden">
      {/* Cloud-like radial wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 30% 20%, rgba(255,255,255,0.6), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(176,138,62,0.18), transparent 60%)",
        }}
      />

      {/* Static contrails */}
      <Contrail x="10vw" y="20vh" w={40} />
      <Contrail x="50vw" y="35vh" w={50} />
      <Contrail x="20vw" y="65vh" w={60} />
      <Contrail x="40vw" y="80vh" w={35} />

      {/* Flying planes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute plane-1"><PlaneSilhouette scale={0.9} /></div>
        <div className="absolute plane-2"><PlaneSilhouette scale={0.6} /></div>
        <div className="absolute plane-3"><PlaneSilhouette scale={1.1} /></div>
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,37,64,1) 1px, transparent 1px), linear-gradient(90deg, rgba(10,37,64,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-12 py-16">
        {/* Letterhead */}
        <header className="flex items-start justify-between border-b-2 border-[var(--ink)] pb-8 mb-16">
          <div>
            <div className="text-[11px] tracking-[0.4em] uppercase opacity-60 mb-2">
              Established · 2026 · Santiago, Chile
            </div>
            <h1 className="text-7xl md:text-8xl font-black leading-[0.9]" style={{ fontFamily: "var(--font-display-corporate)" }}>
              Idyllic
              <span className="italic font-normal opacity-60"> & Co.</span>
            </h1>
            <div className="mt-2 text-base italic opacity-70" style={{ fontFamily: "var(--font-display-corporate)" }}>
              software · games · infrastructure
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end text-right text-xs uppercase tracking-[0.25em] opacity-70 leading-relaxed">
              <span>Reg. №&nbsp;CL-2026-MMXXVI</span>
              <span>Volume I · Folio 01</span>
              <span>Annual Report</span>
              <span className="mt-2 italic opacity-80" style={{ fontFamily: "var(--font-display-corporate)" }}>
                Principal —
              </span>
            </div>
            <ThemedPortrait variant="corporate" size={120} shape="circle" />
          </div>
        </header>

        {/* Hero pull-quote */}
        <section className="grid md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-7">
            <p className="text-3xl md:text-4xl leading-snug italic" style={{ fontFamily: "var(--font-display-corporate)" }}>
              "A boutique studio building MMOs from first principles, alongside a small portfolio of
              public-facing software products serving Latin America."
            </p>
            <div className="gold-rule mt-8 mb-2" />
            <div className="text-xs uppercase tracking-[0.3em] opacity-60">— Statement of Intent</div>
          </div>
          <aside className="md:col-span-4 md:col-start-9 border-l border-[var(--rule)] pl-6 text-sm leading-relaxed">
            <div className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-3">Index</div>
            <ol className="space-y-2 text-base">
              <li className="flex justify-between"><span>I. Flagship Project</span><span className="opacity-60">01</span></li>
              <li className="flex justify-between"><span>II. Public Portfolio</span><span className="opacity-60">02</span></li>
              <li className="flex justify-between"><span>III. Open Source</span><span className="opacity-60">03</span></li>
              <li className="flex justify-between"><span>IV. Correspondence</span><span className="opacity-60">04</span></li>
            </ol>
          </aside>
        </section>

        {/* Projects grid */}
        <section>
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-4xl font-bold">Portfolio</h2>
            <span className="text-xs uppercase tracking-[0.3em] opacity-60">{projects.length} entries</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <a
                key={p.id}
                href={p.url ?? "#"}
                target={p.url ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative bg-[var(--bg-deep)] border border-[var(--rule)] p-6 transition-all hover:border-[var(--ink)] hover:shadow-[8px_8px_0_var(--ink)] hover:-translate-x-1 hover:-translate-y-1"
                style={{ minHeight: 200 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">
                    №&nbsp;{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] px-2 py-0.5 border border-current opacity-70">
                    {p.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
                <p className="text-sm italic mb-4 opacity-80" style={{ fontFamily: "var(--font-display-corporate)" }}>
                  {p.tagline}
                </p>
                <div className="gold-rule mb-3" />
                <p className="text-sm opacity-80 leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[var(--rule)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-24 pt-8 border-t-2 border-[var(--ink)] flex justify-between text-xs uppercase tracking-[0.3em] opacity-60">
          <span>Idyllic Entertainment · MMXXVI</span>
          <span>Crafted in Santiago · Latin America</span>
        </footer>
      </div>
    </div>
  );
}
