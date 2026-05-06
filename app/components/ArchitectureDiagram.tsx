"use client";

const C = {
  player: "#cbd5e1",
  auth: "#a78bfa",
  game: "#67e8f9",
  web: "#4ade80",
  global: "#fbbf24",
  data: "#64748b",
  muted: "rgba(255,255,255,0.22)",
};

function Box({
  x, y, label, sub, color, w = 155, h = 52, godot = false,
}: {
  x: number; y: number; label: string; sub?: string;
  color: string; w?: number; h?: number; godot?: boolean;
}) {
  return (
    <g>
      <rect
        x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8}
        fill="rgba(4,10,22,0.93)" stroke={color} strokeWidth={1.5}
      />
      {godot && (
        <text
          x={x + w / 2 - 6} y={y - h / 2 + 10}
          textAnchor="end" fill={color} fontSize={7.5}
          fontFamily="monospace" opacity={0.85}
        >GD◆</text>
      )}
      <text
        x={x} y={sub ? y - 5 : y + 5}
        textAnchor="middle" fill="rgba(255,255,255,0.93)"
        fontSize={13} fontFamily="system-ui,sans-serif" fontWeight="600"
      >{label}</text>
      {sub && (
        <text
          x={x} y={y + 11} textAnchor="middle"
          fill={color} fontSize={10} fontFamily="monospace" opacity={0.85}
        >{sub}</text>
      )}
    </g>
  );
}

function DB({ x, y, label, w = 138 }: { x: number; y: number; label: string; w?: number }) {
  const h = 40, ry = 9;
  const color = C.data;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={4}
        fill="rgba(10,18,35,0.92)" stroke={color} strokeWidth={1} />
      <ellipse cx={x} cy={y - h / 2} rx={w / 2} ry={ry}
        fill="rgba(20,32,55,0.95)" stroke={color} strokeWidth={1} />
      <text x={x} y={y + 5} textAnchor="middle"
        fill={color} fontSize={9} fontFamily="monospace">{label}</text>
    </g>
  );
}

function Badge({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  const pad = 10, h = 18, fw = 6.2;
  const w = text.length * fw + pad * 2;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={9}
        fill="rgba(4,10,22,0.95)" stroke={color} strokeWidth={1} opacity={0.9} />
      <text x={x} y={y + 4} textAnchor="middle"
        fill={color} fontSize={8} fontFamily="monospace">{text}</text>
    </g>
  );
}

function ALbl({ x, y, text, color = "rgba(255,255,255,0.38)" }: {
  x: number; y: number; text: string; color?: string;
}) {
  return (
    <text x={x} y={y} textAnchor="middle"
      fill={color} fontSize={8.5} fontFamily="monospace">{text}</text>
  );
}

function Arr({ d, color, id, dashed = false, opacity = 0.72 }: {
  d: string; color: string; id: string; dashed?: boolean; opacity?: number;
}) {
  return (
    <path d={d} stroke={color} strokeWidth={1.5} fill="none"
      markerEnd={`url(#${id})`} opacity={opacity}
      strokeDasharray={dashed ? "5 3" : undefined} />
  );
}

export default function ArchitectureDiagram() {
  return (
    <section style={{
      background: "#050c1a",
      padding: "72px 24px 80px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
          <div style={{ width: 28, height: 1.5, background: "#67e8f9", opacity: 0.5 }} />
          <span style={{
            color: "rgba(255,255,255,0.45)", fontSize: 10,
            letterSpacing: "0.4em", textTransform: "uppercase",
            fontFamily: "monospace",
          }}>
            Idyllic Entertainment — System Architecture
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, fontFamily: "monospace" }}>
            NestJS · Godot · Postgres
          </span>
        </div>

        <svg viewBox="0 0 1200 710" style={{ width: "100%", display: "block" }}>
          <defs>
            {(["c", "v", "g", "a", "m", "d"] as const).map((k, i) => {
              const fills = [C.game, C.auth, C.web, C.global, C.muted, C.data];
              return (
                <marker key={k} id={`arr-${k}`}
                  markerWidth={7} markerHeight={7} refX={5.5} refY={3.5} orient="auto">
                  <path d="M0,0 L0,7 L7,3.5 z" fill={fills[i]} />
                </marker>
              );
            })}
            <pattern id="pts" width={24} height={24} patternUnits="userSpaceOnUse">
              <circle cx={0.5} cy={0.5} r={0.7} fill="rgba(255,255,255,0.055)" />
            </pattern>
          </defs>

          {/* BG */}
          <rect width={1200} height={710} fill="#050c1a" />
          <rect width={1200} height={710} fill="url(#pts)" />

          {/* Layer bands */}
          {[
            { y: 42, h: 68, c: C.player },
            { y: 160, h: 68, c: C.auth },
            { y: 278, h: 80, c: C.game },
            { y: 408, h: 66, c: C.web },
            { y: 524, h: 66, c: C.global },
            { y: 614, h: 66, c: C.data },
          ].map((b, i) => (
            <rect key={i} x={84} y={b.y} width={1108} height={b.h} rx={8}
              fill={`${b.c}09`} stroke={`${b.c}13`} strokeWidth={1} />
          ))}

          {/* Layer labels */}
          {[
            { t: "PLAYER", y: 76, c: C.player },
            { t: "AUTH", y: 194, c: C.auth },
            { t: "GAME", y: 318, c: C.game },
            { t: "WEB", y: 441, c: C.web },
            { t: "GLOBAL", y: 557, c: C.global },
            { t: "DATA", y: 647, c: C.data },
          ].map(l => (
            <text key={l.t} x={80} y={l.y} textAnchor="end"
              fill={l.c} fontSize={9} fontFamily="monospace"
              letterSpacing={2} opacity={0.82}>{l.t}</text>
          ))}

          {/* ── CONNECTIONS ── */}
          {/* Launcher → Launcher BE */}
          <Arr id="arr-v" color={C.auth}
            d="M220,101 L220,160" />
          {/* Game Client → Game Auth BE */}
          <Arr id="arr-v" color={C.auth}
            d="M655,101 L795,160" />
          {/* Game Client ENet UDP → Game Server (dashed) */}
          <Arr id="arr-m" color={C.muted} dashed opacity={0.55}
            d="M660,101 C700,195 960,205 990,279" />
          {/* Browser → Web Frontend */}
          <Arr id="arr-g" color={C.web} opacity={0.5}
            d="M1040,101 C1040,290 925,370 920,408" />
          {/* Launcher BE → Auth BE */}
          <Arr id="arr-v" color={C.auth} dashed opacity={0.6}
            d="M298,194 L412,194" />
          {/* Game Auth BE → Auth BE */}
          <Arr id="arr-v" color={C.auth} dashed opacity={0.6}
            d="M718,194 L569,194" />
          {/* Game Client HTTP Bearer → Gateway */}
          <Arr id="arr-c" color={C.game} opacity={0.6}
            d="M645,101 C610,215 210,218 210,278" />
          {/* Gateway → MMO Central */}
          <Arr id="arr-c" color={C.game}
            d="M243,318 L345,318" />
          {/* Gateway → Central BE global */}
          <Arr id="arr-a" color={C.global} opacity={0.58}
            d="M160,358 C158,490 390,490 415,524" />
          {/* World Manager ↔ Game Server heartbeat */}
          <Arr id="arr-c" color={C.game} opacity={0.78}
            d="M790,308 L912,308" />
          <Arr id="arr-c" color={C.game} opacity={0.78}
            d="M912,328 L790,328" />
          {/* Game Server → MMO Central save/load (arc) */}
          <Arr id="arr-c" color={C.game} dashed opacity={0.42}
            d="M990,358 C990,445 490,445 490,358" />
          {/* Web Frontend → Web Backend */}
          <Arr id="arr-g" color={C.web} opacity={0.75}
            d="M997,441 L1025,441" />
          {/* Web Backend → Central BE */}
          <Arr id="arr-g" color={C.web} opacity={0.42}
            d="M1080,474 C1080,512 510,512 455,524" />

          {/* DB connections (thin muted) */}
          {[
            [220, 226, 178, 614],
            [490, 226, 368, 614],
            [795, 226, 558, 614],
            [490, 358, 755, 614],
            [710, 358, 968, 614],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={C.data} strokeWidth={0.8}
              markerEnd="url(#arr-d)" opacity={0.28} />
          ))}

          {/* ── ARROW LABELS ── */}
          <ALbl x={755} y={192} text="ENet UDP" color="rgba(255,255,255,0.28)" />
          <ALbl x={340} y={264} text="HTTP Bearer" color={C.game} />
          <ALbl x={850} y={302} text="heartbeat" color={C.game} />
          <ALbl x={745} y={450} text="save / load" color={C.game} />
          <ALbl x={140} y={478} text="global" color={C.global} />

          {/* ── BOXES ── */}
          {/* Player */}
          <Box x={220} y={76} label="Launcher" sub="Godot app" color={C.player} godot />
          <Box x={650} y={76} label="Game Client" sub="Godot · ENet" color={C.player} w={162} godot />
          <Box x={1040} y={76} label="Browser" color={C.player} />
          {/* Auth */}
          <Box x={220} y={194} label="Launcher BE" sub=":4008" color={C.auth} />
          <Box x={490} y={194} label="Auth BE" sub=":4001" color={C.auth} w={148} />
          <Box x={800} y={194} label="Game Auth BE" sub=":4004" color={C.auth} w={162} />
          {/* Game */}
          <Box x={165} y={318} label="Gateway" sub=":4005" color={C.game} h={58} />
          <Box x={490} y={318} label="MMO Central" sub=":4006" color={C.game} h={58} />
          <Box x={770} y={318} label="World Manager" sub=":4009" color={C.game} w={162} h={58} />
          <Box x={1000} y={318} label="Game Server" sub="UDP:8000+" color={C.game} h={58} godot />
          {/* Web */}
          <Box x={920} y={441} label="Web Frontend" sub=":6001" color={C.web} w={148} />
          <Box x={1100} y={441} label="Web Backend" sub=":4007" color={C.web} w={148} />
          {/* Global */}
          <Box x={430} y={557} label="Central BE" sub=":4000" color={C.global} />
          {/* DBs */}
          <DB x={178} y={647} label="launcher-db" />
          <DB x={368} y={647} label="auth-db" />
          <DB x={558} y={647} label="game-auth-db" />
          <DB x={755} y={647} label="mmo1-central-db" w={148} />
          <DB x={968} y={647} label="world-manager-db" w={155} />

          {/* ── BADGES ── */}
          <Badge x={705} y={318} text="🔑 JWT · 5 roles" color={C.auth} />
          <Badge x={1000} y={280} text="⚡ server meshing" color={C.game} />
          <Badge x={490} y={395} text="📦 Grist pipeline" color={C.game} />
          <Badge x={920} y={405} text="🌐 idyllic-web.vercel.app" color={C.web} />

          {/* Legend */}
          <g transform="translate(88,696)">
            {[
              { t: "◆GD  Godot", x: 0 },
              { t: "■  NestJS", x: 85 },
              { t: "──→  HTTP", x: 162 },
              { t: "- -→  UDP/ENet", x: 238 },
            ].map(l => (
              <text key={l.t} x={l.x} y={0} fill="rgba(255,255,255,0.22)"
                fontSize={8} fontFamily="monospace">{l.t}</text>
            ))}
          </g>

          {/* Watermark */}
          <text x={1185} y={704} textAnchor="end"
            fill="rgba(255,255,255,0.12)" fontSize={8}
            fontFamily="monospace" letterSpacing={2}>IDYLLIC ENTERTAINMENT</text>
        </svg>
      </div>
    </section>
  );
}
