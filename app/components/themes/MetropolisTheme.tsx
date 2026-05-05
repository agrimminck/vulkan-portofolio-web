"use client";

import Image from "next/image";
import { projects } from "../../lib/projects";
import ThemedPortrait from "../ThemedPortrait";

const PHOTO_URL =
  "https://images.unsplash.com/photo-1629443250630-f43487ca1e80?w=2400&q=80&auto=format&fit=crop";

function Plane({ scale = 1 }: { scale?: number }) {
  return (
    <svg viewBox="0 0 100 30" style={{ width: 70 * scale, height: 21 * scale }} fill="none">
      <path
        d="M5 16 L40 14 L65 6 L78 3 C84 2 90 6 87 12 L80 16 L96 17 L80 18 L87 23 C90 28 84 31 78 30 L65 24 L40 18 L5 17 Z"
        fill="rgba(255,255,255,0.9)"
        stroke="rgba(20,30,55,0.4)"
        strokeWidth={0.4}
      />
      <circle cx="20" cy="16.5" r="1" fill="#67e8f9" className="metro-blink" />
      <circle cx="60" cy="14" r="1" fill="#ff6ec7" className="metro-blink" style={{ animationDelay: "0.5s" }} />
    </svg>
  );
}

function Satellite({ scale = 1 }: { scale?: number }) {
  return (
    <svg viewBox="0 0 60 30" style={{ width: 60 * scale, height: 30 * scale }}>
      <rect x={2} y={11} width={14} height={6} fill="#ddd" stroke="#1e3a5f" strokeWidth="0.4" />
      <rect x={44} y={11} width={14} height={6} fill="#ddd" stroke="#1e3a5f" strokeWidth="0.4" />
      <line x1={16} y1={14} x2={22} y2={14} stroke="#777" strokeWidth="0.6" />
      <line x1={38} y1={14} x2={44} y2={14} stroke="#777" strokeWidth="0.6" />
      <rect x={22} y={9} width={16} height={10} fill="#f3f4f6" stroke="#1e3a5f" strokeWidth="0.5" />
      <rect x={28} y={5} width={4} height={4} fill="#ffd84d" />
      <line x1={30} y1={5} x2={30} y2={1} stroke="#777" strokeWidth="0.4" />
      <circle cx={30} cy={14} r={1} fill="#ff6ec7" className="metro-blink" />
    </svg>
  );
}

export default function MetropolisTheme() {
  return (
    <div className="t-metropolis min-h-screen relative overflow-hidden" style={{ background: "#0b1320" }}>
      {/* PHOTO BACKGROUND — fixed sticky illusion via large image */}
      <div className="absolute inset-0 pointer-events-none" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0">
          <Image
            src={PHOTO_URL}
            alt="Singapore Marina Bay daytime skyline"
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        </div>
        {/* Soft daylight wash */}
        <div className="absolute inset-0 metro-photo-overlay" />

        {/* Aircraft + satellites overlays */}
        <div className="absolute top-[10%] left-[8%] metro-sat-1">
          <Satellite scale={0.85} />
        </div>
        <div className="absolute top-[6%] right-[14%] metro-sat-2">
          <Satellite scale={1} />
        </div>

        <div className="absolute top-[18%] metro-plane-a">
          <Plane scale={0.9} />
        </div>
        <div className="absolute top-[28%] metro-plane-b" style={{ animationDelay: "8s" }}>
          <Plane scale={0.65} />
        </div>
        <div className="absolute top-[12%] metro-plane-a" style={{ animationDelay: "20s", animationDuration: "55s" }}>
          <Plane scale={0.45} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-8 md:px-12 py-16 md:py-24">
        {/* Hero */}
        <section className="grid md:grid-cols-12 gap-10 mb-20 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2 h-2 rounded-full bg-white metro-pulse" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase text-white/90"
                style={{ fontFamily: "var(--font-body-metro)" }}
              >
                Live broadcast · 12.34°N · 103.84°E
              </span>
            </div>
            <h1
              className="text-6xl md:text-[8rem] leading-[0.85] uppercase font-black text-white"
              style={{
                fontFamily: "var(--font-display-metro)",
                textShadow: "0 4px 30px rgba(10,20,40,0.35)",
              }}
            >
              From the
              <br />
              <span className="italic font-normal" style={{ color: "#67e8f9" }}>
                ground floor
              </span>
              <br />
              to orbit.
            </h1>
            <p
              className="mt-6 text-xl text-white/90 max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-body-metro)", fontWeight: 300, textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
            >
              Software shipped from a small studio in Santiago — an MMORPG with its own custom
              backend mesh, alongside a handful of public products serving Latin America.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <ThemedPortrait variant="metropolis" size={210} shape="circle" />
          </div>
        </section>

        {/* Frosted info panel */}
        <div
          className="backdrop-blur-xl rounded-2xl p-6 md:p-7 mb-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 24px 60px -20px rgba(10,20,40,0.4)",
          }}
        >
          {[
            { k: "Active deploys", v: projects.filter((p) => p.status === "live").length },
            { k: "In progress", v: projects.filter((p) => p.status === "wip").length },
            { k: "Standing by", v: projects.filter((p) => p.status === "standby").length },
            { k: "Total payload", v: projects.length },
          ].map((s) => (
            <div key={s.k}>
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-1"
                style={{ color: "#1e3a5f", fontFamily: "var(--font-body-metro)" }}
              >
                {s.k}
              </div>
              <div
                className="text-4xl font-black"
                style={{ fontFamily: "var(--font-display-metro)", color: "#0b1320" }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <h2
              className="text-3xl md:text-5xl uppercase tracking-tight text-white"
              style={{ fontFamily: "var(--font-display-metro)", textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
            >
              Selected Work
            </h2>
            <span className="text-xs tracking-[0.3em] uppercase text-white/80">
              Manifest · {projects.length} entries
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <a
                key={p.id}
                href={p.url ?? "#"}
                target={p.url ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(20px) saturate(140%)",
                  WebkitBackdropFilter: "blur(20px) saturate(140%)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow:
                    "0 16px 40px -16px rgba(10,20,40,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
                  minHeight: 280,
                  color: "#0b1320",
                }}
              >
                {/* Accent corner gradient */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, ${p.accent}, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase font-mono"
                      style={{ color: "#71717a" }}
                    >
                      {String(i + 1).padStart(2, "0")} ·{" "}
                      {p.category === "idyllic" ? "Studio" : p.category === "social" ? "Open Source" : "Product"}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: `${p.accent}22`,
                        color: p.accent,
                        border: `1px solid ${p.accent}55`,
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3
                    className="text-3xl mb-1 leading-tight font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-display-metro)" }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-base mb-4 italic"
                    style={{ color: p.accent, fontFamily: "var(--font-body-metro)", fontWeight: 500 }}
                  >
                    {p.tagline}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#3f3f46", fontWeight: 400 }}>
                    {p.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs flex flex-wrap gap-x-2 gap-y-1" style={{ color: "#71717a" }}>
                      {p.tags.slice(0, 4).map((tag, j) => (
                        <span key={tag}>
                          {tag}
                          {j < Math.min(p.tags.length, 4) - 1 && <span className="ml-2 opacity-50">·</span>}
                        </span>
                      ))}
                    </div>
                    {p.url && (
                      <span
                        className="text-xs tracking-[0.2em] uppercase font-medium transition-transform group-hover:translate-x-1"
                        style={{ color: p.accent }}
                      >
                        Visit →
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-white/80">
          <span>// SIGNAL.STABLE · TX 24/7 · MMXXVI</span>
          <span style={{ color: "#67e8f9" }}>END_OF_FEED ✦</span>
        </footer>
      </div>
    </div>
  );
}
