"use client";

import { projects } from "../../lib/projects";

/* ===========================================================
   Building generator — varied skyline w/ procedurally-lit windows
   =========================================================== */

type Building = {
  x: number;
  width: number;
  height: number;
  topShape: "flat" | "antenna" | "step" | "dome";
  windowSeed: number;
};

function genSkyline(count: number, seed: number, layer: "back" | "front"): Building[] {
  const rng = (n: number) => ((Math.sin(n * 9137 + seed) + 1) / 2);
  const out: Building[] = [];
  let x = -3;
  for (let i = 0; i < count; i++) {
    const minH = layer === "back" ? 30 : 45;
    const maxH = layer === "back" ? 65 : 95;
    const w = 4 + rng(i + 1) * 6;
    const h = minH + rng(i + 7) * (maxH - minH);
    const shapes: Building["topShape"][] = ["flat", "flat", "flat", "antenna", "step", "dome"];
    out.push({
      x,
      width: w,
      height: h,
      topShape: shapes[Math.floor(rng(i + 13) * shapes.length)],
      windowSeed: i + seed,
    });
    x += w + 0.2 + rng(i + 23) * 0.6;
  }
  return out;
}

function BuildingShape({ b, fill, layer }: { b: Building; fill: string; layer: "back" | "front" }) {
  const cellSize = layer === "front" ? 2 : 1.6;
  const padding = 0.3;
  const cols = Math.max(2, Math.floor(b.width / cellSize));
  const rows = Math.max(4, Math.floor(b.height / cellSize));
  const cellW = (b.width - padding * 2) / cols;
  const cellH = (b.height - padding * 2) / rows;
  const rng = (n: number) => ((Math.sin(n * 1217.31 + b.windowSeed * 73.2) + 1) / 2);

  const windows: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = r * cols + c;
      const lit = rng(seed) > (layer === "front" ? 0.55 : 0.7);
      if (!lit) continue;
      const variant = rng(seed + 17);
      const color =
        variant > 0.85
          ? "rgba(255,110,199,0.95)"
          : variant > 0.55
            ? "rgba(255,216,77,0.95)"
            : "rgba(103,232,249,0.95)";
      const flicker = rng(seed + 91) > 0.92;
      windows.push(
        <rect
          key={seed}
          x={padding + c * cellW + cellW * 0.15}
          y={padding + r * cellH + cellH * 0.18}
          width={cellW * 0.65}
          height={cellH * 0.55}
          fill={color}
          className={flicker ? "metro-window-flicker" : ""}
        />,
      );
    }
  }

  let topElement: React.ReactNode = null;
  if (b.topShape === "antenna") {
    topElement = (
      <>
        <line x1={b.width / 2} y1={0} x2={b.width / 2} y2={-7} stroke={fill} strokeWidth={0.25} />
        <circle cx={b.width / 2} cy={-7.2} r={0.5} fill="rgba(255,90,90,0.95)" className="metro-blink" />
      </>
    );
  } else if (b.topShape === "step") {
    topElement = (
      <rect x={b.width * 0.2} y={-3.5} width={b.width * 0.6} height={3.5} fill={fill} />
    );
  } else if (b.topShape === "dome") {
    topElement = (
      <ellipse cx={b.width / 2} cy={0} rx={b.width / 2.2} ry={2.4} fill={fill} />
    );
  }

  return (
    <g transform={`translate(${b.x}, 0)`}>
      <rect x={0} y={0} width={b.width} height={b.height} fill={fill} />
      {topElement && <g transform={`translate(0, 0)`}>{topElement}</g>}
      <g transform={`translate(0, 0)`}>{windows}</g>
    </g>
  );
}

function Skyline({ layer, opacity = 1 }: { layer: "back" | "front"; opacity?: number }) {
  const buildings = genSkyline(layer === "back" ? 22 : 14, layer === "back" ? 13 : 71, layer);
  const totalWidth = 130;
  const maxHeight = layer === "back" ? 70 : 100;
  const fill = layer === "back" ? "#04061f" : "#020314";
  return (
    <svg
      viewBox={`-3 ${-maxHeight} ${totalWidth} ${maxHeight + 5}`}
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 w-full"
      style={{
        height: layer === "back" ? "55%" : "42%",
        opacity,
        zIndex: layer === "back" ? 2 : 4,
      }}
    >
      <g transform={`translate(0, 0) scale(1, -1)`}>
        {buildings.map((b, i) => (
          <BuildingShape key={i} b={b} fill={fill} layer={layer} />
        ))}
      </g>
    </svg>
  );
}

/* ===========================================================
   Plane / Satellite / Car SVGs
   =========================================================== */

function Plane({ scale = 1 }: { scale?: number }) {
  return (
    <svg viewBox="0 0 100 30" style={{ width: 70 * scale, height: 21 * scale }} fill="none">
      <path
        d="M5 16 L40 14 L65 6 L78 3 C84 2 90 6 87 12 L80 16 L96 17 L80 18 L87 23 C90 28 84 31 78 30 L65 24 L40 18 L5 17 Z"
        fill="rgba(255,255,255,0.85)"
      />
      <circle cx="20" cy="16.5" r="1" fill="#67e8f9" className="metro-blink" />
      <circle cx="60" cy="14" r="1" fill="#ff6ec7" className="metro-blink" style={{ animationDelay: "0.5s" }} />
    </svg>
  );
}

function Satellite({ scale = 1 }: { scale?: number }) {
  return (
    <svg viewBox="0 0 60 30" style={{ width: 60 * scale, height: 30 * scale }}>
      <rect x={2} y={11} width={14} height={6} fill="#888" stroke="#67e8f9" strokeWidth="0.4" />
      <rect x={44} y={11} width={14} height={6} fill="#888" stroke="#67e8f9" strokeWidth="0.4" />
      <line x1={16} y1={14} x2={22} y2={14} stroke="#aaa" strokeWidth="0.6" />
      <line x1={38} y1={14} x2={44} y2={14} stroke="#aaa" strokeWidth="0.6" />
      <rect x={22} y={9} width={16} height={10} fill="#ccc" stroke="#67e8f9" strokeWidth="0.5" />
      <rect x={28} y={5} width={4} height={4} fill="#ffd84d" />
      <line x1={30} y1={5} x2={30} y2={1} stroke="#ccc" strokeWidth="0.4" />
      <circle cx={30} cy={14} r={1} fill="#ff6ec7" className="metro-blink" />
    </svg>
  );
}

function Car({ color = "#67e8f9", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 40 14" style={{ width: 40, height: 14, transform: flip ? "scaleX(-1)" : "none" }}>
      <path d="M2 10 L6 4 L28 4 L34 10 L38 10 L38 13 L2 13 Z" fill="#1a1a2e" />
      <rect x={6} y={5} width={8} height={4} fill="rgba(103,232,249,0.45)" />
      <rect x={16} y={5} width={10} height={4} fill="rgba(103,232,249,0.45)" />
      <circle cx={9} cy={13} r={1.5} fill="#0a0a18" />
      <circle cx={31} cy={13} r={1.5} fill="#0a0a18" />
      <ellipse cx={38} cy={10} rx={3} ry={1} fill={color} opacity="0.95" />
      <rect x={0} y={9.5} width={2.5} height={1.5} fill="#ff3a3a" opacity="0.9" />
    </svg>
  );
}

/* ===========================================================
   Page
   =========================================================== */

export default function MetropolisTheme() {
  return (
    <div className="t-metropolis min-h-screen relative overflow-hidden">
      {/* SCENE: full-viewport sticky background */}
      <div className="absolute inset-0 pointer-events-none" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0 metro-sky" />
        <div className="absolute inset-0 metro-stars" />

        {/* Shooting stars */}
        <div className="absolute top-[10%] left-[5%] metro-shooting" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[25%] left-[40%] metro-shooting" style={{ animationDelay: "5s", animationDuration: "8s" }} />

        {/* Satellites */}
        <div className="absolute top-[8%] left-[12%] metro-sat-1">
          <Satellite scale={0.9} />
        </div>
        <div className="absolute top-[14%] right-[18%] metro-sat-2">
          <Satellite scale={1.2} />
        </div>
        <div className="absolute top-[5%] right-[40%] metro-sat-3">
          <Satellite scale={0.7} />
        </div>

        {/* Planes */}
        <div className="absolute top-[28%] metro-plane-a">
          <Plane scale={1} />
        </div>
        <div className="absolute top-[40%] metro-plane-b" style={{ animationDelay: "8s" }}>
          <Plane scale={0.7} />
        </div>
        <div className="absolute top-[18%] metro-plane-a" style={{ animationDelay: "15s", animationDuration: "48s" }}>
          <Plane scale={0.5} />
        </div>

        {/* Atmospheric haze along horizon */}
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: "12%",
            height: "30%",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,110,199,0.18) 40%, rgba(103,232,249,0.22) 75%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Skyline back */}
        <Skyline layer="back" opacity={0.85} />
        {/* Skyline front */}
        <Skyline layer="front" opacity={1} />

        {/* Street + cars */}
        <div className="absolute bottom-0 left-0 right-0 z-[5]" style={{ height: "10vh" }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,16,0.6) 0%, var(--street) 40%, #000 100%)",
            }}
          />
          {/* Lane markings */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "55%",
              height: "1px",
              background:
                "repeating-linear-gradient(90deg, rgba(255,216,77,0.6) 0 18px, transparent 18px 38px)",
            }}
          />
          {/* Cars */}
          <div className="absolute metro-car-1" style={{ top: "35%" }}>
            <Car color="#67e8f9" />
          </div>
          <div className="absolute metro-car-2" style={{ top: "65%" }}>
            <Car color="#ff6ec7" flip />
          </div>
          <div className="absolute metro-car-3" style={{ top: "30%", animationDelay: "3s" }}>
            <Car color="#ffd84d" />
          </div>
          <div className="absolute metro-car-4" style={{ top: "70%", animationDelay: "5s" }}>
            <Car color="#7df9a4" flip />
          </div>
          <div className="absolute metro-car-5" style={{ top: "40%", animationDelay: "1s" }}>
            <Car color="#ff8855" />
          </div>
        </div>

        {/* Ground glow */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[6]"
          style={{
            height: "20vh",
            background:
              "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(103,232,249,0.18) 0%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-16">
        {/* Hero */}
        <header className="mb-20 grid md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] metro-pulse" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[var(--neon-cyan)]">
                ORBIT.STATION // 51.4°N · 0.0°E · LIVE FEED
              </span>
            </div>
            <h1
              className="text-7xl md:text-[9rem] leading-[0.85] uppercase font-black"
              style={{ fontFamily: "var(--font-display-metro)" }}
            >
              <span style={{ color: "var(--neon-cyan)" }}>From the</span>
              <br />
              <span className="italic font-normal" style={{ color: "var(--ink)" }}>
                ground floor
              </span>
              <br />
              <span style={{ color: "var(--neon-magenta)" }}>to orbit.</span>
            </h1>
            <p
              className="mt-6 text-xl max-w-2xl opacity-80"
              style={{ fontFamily: "var(--font-body-metro)", fontWeight: 300 }}
            >
              Software shipped from a small studio in Santiago. An MMORPG with its own custom
              backend mesh. A handful of public products serving Latin America. One engineer,
              several time zones, lights on.
            </p>
          </div>
          <aside className="md:col-span-4 metro-hud metro-hud-corner relative p-5">
            <div className="text-[10px] tracking-[0.4em] uppercase opacity-60 mb-3">
              [SYS] Status report
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Active deploys</span>
                <span className="text-[var(--neon-cyan)]">
                  {projects.filter((p) => p.status === "live").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">In production</span>
                <span className="text-[var(--neon-magenta)]">
                  {projects.filter((p) => p.status === "wip").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Standing by</span>
                <span className="text-[var(--neon-amber)]">
                  {projects.filter((p) => p.status === "standby").length}
                </span>
              </div>
              <div className="h-px bg-[var(--neon-cyan)]/30 my-2" />
              <div className="flex justify-between">
                <span className="opacity-70">Total payload</span>
                <span className="text-[var(--ink)] font-bold">{projects.length} units</span>
              </div>
            </div>
          </aside>
        </header>

        {/* Cards */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-4xl uppercase tracking-wider">
              <span className="opacity-60">//</span>{" "}
              <span style={{ color: "var(--neon-cyan)" }}>PAYLOADS</span>
            </h2>
            <span className="text-xs tracking-[0.3em] uppercase opacity-60">
              SCROLL TO MANIFEST
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <a
                key={p.id}
                href={p.url ?? "#"}
                target={p.url ? "_blank" : undefined}
                rel="noreferrer"
                className="group metro-hud metro-hud-corner relative p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ minHeight: 280 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.accent;
                  e.currentTarget.style.boxShadow = `0 0 30px ${p.accent}88`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  className="absolute -top-2 left-4 px-2 text-[9px] tracking-[0.3em] uppercase"
                  style={{ background: "var(--bg-deep-space)", color: p.accent }}
                >
                  ID-{String(i + 1).padStart(3, "0")}
                </div>
                <div className="flex items-center justify-between mb-4 mt-1">
                  <span
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: p.accent }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}` }}
                    />
                    {p.category}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-widest px-2 py-0.5"
                    style={{
                      background:
                        p.status === "live"
                          ? "var(--neon-cyan)"
                          : p.status === "wip"
                            ? "var(--neon-magenta)"
                            : "transparent",
                      color: p.status === "standby" ? "var(--neon-amber)" : "#000",
                      border: p.status === "standby" ? "1px solid var(--neon-amber)" : "none",
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <h3
                  className="text-2xl font-black mb-1 uppercase tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-display-metro)" }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-sm mb-4 opacity-90"
                  style={{ color: p.accent, fontFamily: "var(--font-body-metro)", fontWeight: 500 }}
                >
                  ▸ {p.tagline}
                </p>
                <p className="text-sm opacity-70 leading-relaxed mb-5" style={{ fontWeight: 300 }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 uppercase tracking-wider font-mono"
                      style={{
                        border: "1px solid rgba(103,232,249,0.3)",
                        color: "var(--ink-dim)",
                        fontFamily: "var(--font-body-metro)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="metro-hud metro-hud-corner relative p-5 flex justify-between items-center text-xs uppercase tracking-[0.3em]">
          <span className="opacity-60">// SIGNAL.STABLE · TX 24/7 · MMXXVI</span>
          <span style={{ color: "var(--neon-cyan)" }}>END_OF_FEED ✦</span>
        </footer>
      </div>
    </div>
  );
}
