"use client";

import { useEffect, useRef } from "react";
import { projects } from "../../lib/projects";
import type { Project } from "../../lib/projects";
import { useLang } from "../../lib/lang-context";
import { useNextTheme } from "../../lib/next-theme-context";
import { ICE_CITADEL_T, PROJECT_ES, SHARED } from "../../lib/i18n";

// ─── MagicCanvas (ported verbatim from basilisk-hub/themes/ice-gothic/MagicCanvas.tsx) ──────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  type: "snow" | "trail" | "burst" | "ember" | "shard";
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

function MagicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, down: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const particles: Particle[] = [];
    const stars: Star[] = [];
    const shooting: ShootingStar[] = [];

    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        size: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.002 + 0.0008,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.6 + 0.2,
        life: 1,
        maxLife: 1,
        size: Math.random() * 1.8 + 0.4,
        hue: 200 + Math.random() * 30,
        type: "snow",
      });
    }

    let auroraT = 0;
    let frame = 0;

    const onResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * window.devicePixelRatio;
      canvas.height = vh * window.devicePixelRatio;
      canvas.style.width = vw + "px";
      canvas.style.height = vh + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.min(Math.hypot(dx, dy), 60);
      const count = Math.min(Math.floor(speed / 4) + 1, 8);
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = Math.random() * 0.6 + 0.2;
        particles.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 8,
          y: mouseRef.current.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 0.3,
          life: 1,
          maxLife: 60 + Math.random() * 30,
          size: Math.random() * 2.4 + 0.8,
          hue: 195 + Math.random() * 25,
          type: "trail",
        });
      }
    };

    const ringsRef = { current: [] as { x: number; y: number; r: number; life: number }[] };

    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      ringsRef.current.push({ x: cx, y: cy, r: 0, life: 1 });

      const shardCount = 28;
      for (let i = 0; i < shardCount; i++) {
        const ang = (Math.PI * 2 * i) / shardCount + (Math.random() - 0.5) * 0.3;
        const sp = Math.random() * 6 + 3;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 1,
          maxLife: 50 + Math.random() * 30,
          size: Math.random() * 3 + 1.2,
          hue: 200 + Math.random() * 20,
          type: "shard",
        });
      }
      for (let i = 0; i < 10; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = Math.random() * 3 + 1;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 1.5,
          life: 1,
          maxLife: 80 + Math.random() * 40,
          size: Math.random() * 2 + 0.6,
          hue: 35 + Math.random() * 15,
          type: "ember",
        });
      }
    };

    const onDown = () => { mouseRef.current.down = true; };
    const onUp = () => { mouseRef.current.down = false; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const render = () => {
      frame++;
      auroraT += 0.003;

      ctx.clearRect(0, 0, vw, vh);

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < 3; i++) {
        const off = i * 1.7;
        const grad = ctx.createLinearGradient(0, 0, vw, vh * 0.6);
        const phase1 = Math.sin(auroraT + off) * 0.5 + 0.5;
        const phase2 = Math.sin(auroraT * 1.3 + off + 1) * 0.5 + 0.5;
        grad.addColorStop(0, `rgba(${20 + phase1 * 60}, ${100 + phase1 * 80}, ${180 + phase2 * 60}, 0)`);
        grad.addColorStop(0.4, `rgba(${40 + phase2 * 50}, ${140 + phase1 * 80}, ${220}, ${0.04 + phase1 * 0.05})`);
        grad.addColorStop(0.7, `rgba(${80 + phase1 * 60}, ${180}, ${240}, ${0.03 + phase2 * 0.04})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;

        ctx.beginPath();
        const baseY = vh * 0.2 + i * 60;
        const amp = 40 + i * 20;
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= vw; x += 20) {
          const y = baseY + Math.sin(x * 0.005 + auroraT * 2 + off) * amp + Math.sin(x * 0.012 + auroraT + off) * (amp * 0.5);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(vw, baseY + 200);
        ctx.lineTo(0, baseY + 200);
        ctx.closePath();
        ctx.filter = "blur(40px)";
        ctx.fill();
        ctx.filter = "none";
      }
      ctx.restore();

      for (const s of stars) {
        const tw = Math.sin(frame * s.twinkleSpeed + s.twinkleOffset) * 0.5 + 0.5;
        const a = s.baseAlpha * (0.5 + tw * 0.5);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${200 + tw * 55}, ${230 + tw * 25}, 255, ${a})`;
        ctx.fill();
        if (s.size > 0.9) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 200, 255, ${a * 0.08})`;
          ctx.fill();
        }
      }

      if (Math.random() < 0.003 && shooting.length < 2) {
        shooting.push({
          x: Math.random() * vw,
          y: -20,
          vx: (Math.random() - 0.5) * 6 - 1,
          vy: Math.random() * 4 + 4,
          life: 1,
          maxLife: 80,
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const ss = shooting[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.maxLife--;
        const a = ss.maxLife / 80;
        const tailLen = 40;
        const grad = ctx.createLinearGradient(
          ss.x - ss.vx * tailLen * 0.1,
          ss.y - ss.vy * tailLen * 0.1,
          ss.x,
          ss.y
        );
        grad.addColorStop(0, "rgba(184, 230, 255, 0)");
        grad.addColorStop(1, `rgba(220, 240, 255, ${a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ss.x - ss.vx * tailLen * 0.1, ss.y - ss.vy * tailLen * 0.1);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,240,255,${a})`;
        ctx.fill();
        if (ss.maxLife <= 0 || ss.y > vh + 20) shooting.splice(i, 1);
      }

      for (let i = ringsRef.current.length - 1; i >= 0; i--) {
        const r = ringsRef.current[i];
        r.r += 6;
        r.life -= 0.018;
        if (r.life <= 0) { ringsRef.current.splice(i, 1); continue; }
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184, 230, 255, ${r.life * 0.5})`;
        ctx.lineWidth = 2.5 * r.life;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(111, 195, 255, ${r.life * 0.3})`;
        ctx.lineWidth = 1.5 * r.life;
        ctx.stroke();
        ctx.restore();
      }

      if (mouseRef.current.x > 0) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const auraR = mouseRef.current.down ? 180 : 120;
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, auraR);
        aura.addColorStop(0, mouseRef.current.down ? "rgba(184,230,255,0.35)" : "rgba(111,195,255,0.18)");
        aura.addColorStop(0.4, "rgba(74,144,217,0.08)");
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = aura;
        ctx.fillRect(mx - auraR, my - auraR, auraR * 2, auraR * 2);
        ctx.restore();

        const orbitN = 3;
        for (let i = 0; i < orbitN; i++) {
          const ang = (frame * 0.02) + (i * (Math.PI * 2)) / orbitN;
          const rad = 30 + Math.sin(frame * 0.05 + i) * 4;
          const ox = mx + Math.cos(ang) * rad;
          const oy = my + Math.sin(ang) * rad;
          ctx.beginPath();
          ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(184, 230, 255, 0.85)";
          ctx.shadowColor = "rgba(111,195,255,0.9)";
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (frame % 6 === 0) {
          particles.push({
            x: mx + (Math.random() - 0.5) * 30,
            y: my + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.6 - 0.1,
            life: 1,
            maxLife: 50 + Math.random() * 40,
            size: Math.random() * 1.8 + 0.4,
            hue: 200,
            type: "trail",
          });
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === "snow") {
          p.x += p.vx + Math.sin(frame * 0.01 + p.y * 0.01) * 0.15;
          p.y += p.vy;
          if (p.y > vh + 5) { p.y = -5; p.x = Math.random() * vw; }
          if (p.x < -5) p.x = vw + 5;
          if (p.x > vw + 5) p.x = -5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 240, 255, 0.7)`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 200, 255, 0.08)`;
          ctx.fill();
        } else if (p.type === "trail") {
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.01;
          p.life -= 1 / p.maxLife;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const a = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 230, 255, ${a * 0.85})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4 * a, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(111, 195, 255, ${a * 0.12})`;
          ctx.fill();
        } else if (p.type === "shard") {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08;
          p.vx *= 0.985;
          p.life -= 1 / p.maxLife;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const a = p.life;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.atan2(p.vy, p.vx));
          ctx.beginPath();
          ctx.moveTo(p.size * 2, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 2, 0);
          ctx.lineTo(0, -p.size);
          ctx.closePath();
          ctx.fillStyle = `rgba(220, 240, 255, ${a * 0.9})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(111, 195, 255, ${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.restore();
        } else if (p.type === "ember") {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04;
          p.vx *= 0.98;
          p.life -= 1 / p.maxLife;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          const a = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 120, ${a})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4 * a, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 140, 60, ${a * 0.15})`;
          ctx.fill();
        }
      }
      ctx.restore();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ─── Sub-components (ported from basilisk-hub Page.tsx) ───────────────────────

function useClickFlash() {
  return (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget.querySelector(".ig-click-flash") as HTMLElement | null;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
    el.classList.remove("active");
    void el.offsetWidth;
    el.classList.add("active");
  };
}

function CornerOrnament({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const transforms = { tl: "", tr: "scale(-1, 1)", bl: "scale(1, -1)", br: "scale(-1, -1)" };
  const positions = {
    tl: "top-0 left-0", tr: "top-0 right-0",
    bl: "bottom-0 left-0", br: "bottom-0 right-0",
  };
  return (
    <div className={`pointer-events-none absolute ${positions[corner]} h-24 w-24 sm:h-32 sm:w-32`}>
      <svg viewBox="0 0 120 120" className="h-full w-full" style={{ transform: transforms[corner] }}>
        <defs>
          <linearGradient id={`ig-stone-${corner}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1c2538" />
            <stop offset="50%" stopColor="#0a1428" />
            <stop offset="100%" stopColor="#03070f" />
          </linearGradient>
          <linearGradient id={`ig-ice-${corner}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8e6ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2a6bb0" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M0,0 L80,0 L80,8 L20,8 L20,20 L8,20 L8,80 L0,80 Z" fill={`url(#ig-stone-${corner})`} stroke="#0a1428" strokeWidth="0.5" />
        <path d="M14,14 L72,14 L72,18 L18,18 L18,72 L14,72 Z" fill="none" stroke="#1c2538" strokeWidth="1" />
        <path d="M40,0 L52,16 L46,18 L52,4 L58,16 L40,8 Z" fill={`url(#ig-ice-${corner})`} opacity="0.7" />
        <g transform="translate(28,28)" className="ig-rune-pulse-slow">
          <circle cx="0" cy="0" r="10" fill="none" stroke="#6fc3ff" strokeWidth="0.6" opacity="0.5" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="#b8e6ff" strokeWidth="0.4" opacity="0.7" />
          <path d="M-5,-5 L5,5 M5,-5 L-5,5 M0,-7 L0,7 M-7,0 L7,0" stroke="#6fc3ff" strokeWidth="0.5" opacity="0.6" />
          <circle cx="0" cy="0" r="1.2" fill="#b8e6ff" />
        </g>
        <g opacity="0.6">
          <path d="M30,8 L32,18 L31,8 Z" fill={`url(#ig-ice-${corner})`} />
          <path d="M50,8 L51,14 L50,8 Z" fill={`url(#ig-ice-${corner})`} />
          <path d="M68,8 L70,22 L69,8 Z" fill={`url(#ig-ice-${corner})`} />
          <path d="M8,30 L18,32 L8,31 Z" fill={`url(#ig-ice-${corner})`} />
          <path d="M8,50 L14,51 L8,50 Z" fill={`url(#ig-ice-${corner})`} />
          <path d="M8,68 L22,70 L8,69 Z" fill={`url(#ig-ice-${corner})`} />
        </g>
      </svg>
    </div>
  );
}

function SigilDivider({ label }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2a6bb0] to-transparent" />
      <svg viewBox="0 0 60 24" className="h-6 w-16 ig-rune-pulse-slow">
        <g stroke="#6fc3ff" strokeWidth="0.6" fill="none">
          <circle cx="30" cy="12" r="6" />
          <circle cx="30" cy="12" r="3" />
          <path d="M24,12 L36,12 M30,6 L30,18" />
          <path d="M14,12 L20,12 M40,12 L46,12" strokeWidth="0.4" />
          <path d="M10,12 L4,8 M10,12 L4,16" strokeWidth="0.4" />
          <path d="M50,12 L56,8 M50,12 L56,16" strokeWidth="0.4" />
        </g>
        <circle cx="30" cy="12" r="1" fill="#b8e6ff" />
      </svg>
      {label && <span className="ig-font-rune text-[10px] tracking-[0.3em] text-[#6fc3ff]/70">{label}</span>}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#2a6bb0] to-transparent" />
    </div>
  );
}

function IcicleRow() {
  return (
    <svg viewBox="0 0 1200 40" className="h-6 w-full opacity-70" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ig-icicle-row-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8e6ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2a6bb0" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g fill="url(#ig-icicle-row-grad)">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = i * 40 + (i % 3) * 6;
          const h = 12 + ((i * 7) % 22);
          const w = 6 + ((i * 3) % 5);
          return <path key={i} d={`M${x},0 L${x + w / 2},${h} L${x + w},0 Z`} />;
        })}
      </g>
    </svg>
  );
}

function GothicArchSilhouette() {
  return (
    <svg viewBox="0 0 800 300" className="h-full w-full opacity-25" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="ig-arch-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1428" stopOpacity="0" />
          <stop offset="100%" stopColor="#03070f" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="ig-window-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#6fc3ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1a4880" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M0,300 L0,140 L20,120 L40,140 L40,300 Z" fill="#060d1c" />
      <path d="M60,300 L60,180 L80,160 L100,180 L100,300 Z" fill="#060d1c" />
      <path d="M700,300 L700,180 L720,160 L740,180 L740,300 Z" fill="#060d1c" />
      <path d="M760,300 L760,140 L780,120 L800,140 L800,300 Z" fill="#060d1c" />
      <path d="M280,300 L280,140 Q280,80 320,60 Q360,40 400,40 Q440,40 480,60 Q520,80 520,140 L520,300 Z" fill="#0a1428" />
      <path d="M360,260 L360,160 Q360,120 400,120 Q440,120 440,160 L440,260 Z" fill="url(#ig-window-glow)" />
      <path d="M380,250 L380,170 Q380,140 400,140 Q420,140 420,170 L420,250 Z" fill="#03070f" opacity="0.7" />
      <path d="M390,40 L400,0 L410,40 Z" fill="#060d1c" />
      <path d="M310,80 L320,30 L330,80 Z" fill="#060d1c" />
      <path d="M470,80 L480,30 L490,80 Z" fill="#060d1c" />
      <rect width="800" height="300" fill="url(#ig-arch-grad)" />
    </svg>
  );
}

type ProjectStatus = Project["status"];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = {
    live:    { label: "Vigente",  bg: "rgba(111,195,255,0.08)", border: "rgba(111,195,255,0.4)", text: "#b8e6ff", dot: "#6fc3ff" },
    standby: { label: "Dormido",  bg: "rgba(200,162,86,0.08)",  border: "rgba(200,162,86,0.4)",  text: "#e6c98a", dot: "#c8a256" },
    wip:     { label: "En Forja", bg: "rgba(180,80,40,0.1)",    border: "rgba(180,80,40,0.45)",  text: "#e6a274", dot: "#c8602a" },
  }[status];
  return (
    <span
      className="ig-font-rune inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px]"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0 50%)",
      }}
    >
      <span className="ig-torch inline-block h-1 w-1 rounded-full" style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}` }} />
      {cfg.label}
    </span>
  );
}

const PROJECT_ICONS: Record<string, string> = {
  "idyllic-mmo": "⚔",
  "mercadolibre-electrodomesticos": "△",
  "car-shop-app": "✧",
  inversionistas: "❖",
  "boti-finder": "♆",
  "free-pickup": "✺",
  github: "✦",
};

const PROJECT_SIGILS: Record<string, string> = {
  "idyllic-mmo": "I",
  "mercadolibre-electrodomesticos": "II",
  "car-shop-app": "III",
  inversionistas: "IV",
  "boti-finder": "V",
  "free-pickup": "VI",
  github: "VII",
};

function ProjectCard({
  project,
  index,
  lang,
  enterPortalLabel,
  visitLabel,
  githubLabel,
}: {
  project: Project;
  index: number;
  lang: "en" | "es";
  enterPortalLabel: string;
  visitLabel: string;
  githubLabel: string;
}) {
  const flash = useClickFlash();
  const icon = PROJECT_ICONS[project.id] ?? "✦";
  const sigil = PROJECT_SIGILS[project.id] ?? String(index + 1);
  const tagline = lang === "es" ? (PROJECT_ES[project.id]?.tagline ?? project.tagline) : project.tagline;
  const description = lang === "es" ? (PROJECT_ES[project.id]?.description ?? project.description) : project.description;
  const runeLabel = `◇ ${tagline.split(" ")[0]} ◇`;

  return (
    <div
      onClick={flash}
      className="ig-frame-card ig-reveal group relative flex flex-col p-6 cursor-default"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <span className="ig-click-flash" />

      {(["tl", "tr", "bl", "br"] as const).map((c) => {
        const t = c === "tl" ? "" : c === "tr" ? "scaleX(-1)" : c === "bl" ? "scaleY(-1)" : "scale(-1,-1)";
        const pos = c === "tl" ? "left-1 top-1" : c === "tr" ? "right-1 top-1" : c === "bl" ? "bottom-1 left-1" : "bottom-1 right-1";
        return (
          <svg key={c} viewBox="0 0 40 40" className={`pointer-events-none absolute ${pos} h-6 w-6 opacity-60`} style={{ transform: t }}>
            <path d="M0,0 L20,0 L20,2 L2,2 L2,20 L0,20 Z" fill="#6fc3ff" opacity="0.4" />
            <path d="M6,6 L14,6 M6,6 L6,14" stroke="#b8e6ff" strokeWidth="0.5" />
          </svg>
        );
      })}

      <div className="mb-4 flex items-start justify-between">
        <div className="relative">
          <div
            className="flex h-14 w-14 items-center justify-center text-2xl text-[#b8e6ff] transition-all duration-500 group-hover:text-[#e8f4ff]"
            style={{
              background: "radial-gradient(circle, rgba(111,195,255,0.15), rgba(3,7,15,0.6))",
              border: "1px solid rgba(111,195,255,0.3)",
              clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
              filter: "drop-shadow(0 0 8px rgba(111,195,255,0.3))",
            }}
          >
            {icon}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="ig-font-rune text-[9px] tracking-[0.3em] text-[#6fc3ff]/60">· {sigil} ·</span>
        </div>
      </div>

      <h2 className="ig-font-display ig-glow-text mb-1 text-xl font-bold uppercase tracking-wider text-[#e8f4ff] transition-all duration-500 group-hover:text-white">
        {project.name}
      </h2>
      <span className="ig-font-rune mb-3 text-[9px] tracking-[0.35em] text-[#6fc3ff]/70 italic">
        {runeLabel}
      </span>

      <div className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-[#2a6bb0]/60 to-transparent" />

      <p className="ig-font-body mb-5 flex-1 text-base italic leading-relaxed text-[#7ab8f5]/85">
        {description}
      </p>

      <div className="mb-4 flex items-center justify-between">
        <span className="ig-font-rune text-[10px] tracking-[0.3em] text-[#b8e6ff]/80 transition-all duration-500 group-hover:text-[#e8f4ff]">
          {enterPortalLabel}
        </span>
        <svg viewBox="0 0 32 16" className="h-3 w-8 text-[#6fc3ff] transition-all duration-500 group-hover:translate-x-1">
          <path d="M0,8 L26,8 M22,4 L26,8 L22,12" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="2" cy="8" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ig-font-rune inline-flex items-center px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#b8e6ff] transition-all duration-300 hover:text-white"
            style={{
              background: "rgba(111,195,255,0.12)",
              border: "1px solid rgba(111,195,255,0.4)",
              clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
            }}
          >
            {visitLabel}
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ig-font-rune inline-flex items-center px-3 py-1.5 text-[9px] tracking-[0.2em] text-[#6fc3ff]/70 transition-all duration-300 hover:text-[#b8e6ff]"
            style={{
              background: "transparent",
              border: "1px solid rgba(111,195,255,0.25)",
              clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
            }}
          >
            {githubLabel}
          </a>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(ellipse at top, rgba(111,195,255,0.12), transparent 70%)" }}
      />
    </div>
  );
}

// ─── Main theme component ─────────────────────────────────────────────────────

export default function IceCitadelTheme() {
  const { lang } = useLang();
  const { nextLabel, onNext } = useNextTheme();
  const t = ICE_CITADEL_T[lang];
  const sh = SHARED[lang];
  const flash = useClickFlash();

  return (
    <div className="t-ice-citadel ig-bg-obsidian ig-bg-noise ig-bg-cracks relative min-h-screen">
      {/* Aurora layer */}
      <div className="ig-aurora-layer absolute inset-0 z-[1]" />

      {/* Particle canvas */}
      <MagicCanvas />

      {/* Vignette */}
      <div className="ig-vignette absolute inset-0 z-[4]" />

      {/* Gothic arch silhouette */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[60vh]">
        <GothicArchSilhouette />
      </div>

      {/* Mist layers */}
      <div className="pointer-events-none fixed inset-0 z-[3]">
        <div
          className="ig-mist absolute bottom-0 left-0 h-[30vh] w-full"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(111,195,255,0.08), transparent 60%)" }}
        />
        <div
          className="ig-mist absolute top-1/3 right-0 h-[40vh] w-1/2 opacity-50"
          style={{ background: "radial-gradient(ellipse at right, rgba(74,144,217,0.06), transparent 70%)", animationDelay: "5s" }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12">

        {/* ── Header ── */}
        <header className="ig-frame-master ig-reveal relative mb-16 px-6 py-12 sm:px-12 sm:py-16">
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="tr" />
          <CornerOrnament corner="bl" />
          <CornerOrnament corner="br" />

          <div className="absolute inset-x-12 top-0">
            <IcicleRow />
          </div>

          {/* Rotating ring emblem */}
          <div className="relative mx-auto mb-8 mt-4 flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
            <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full" style={{ animation: "ig-spin-slow 40s linear infinite" }}>
              <defs>
                <radialGradient id="ig-emblem-glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#b8e6ff" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#1a4880" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#03070f" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="110" cy="110" r="108" fill="url(#ig-emblem-glow)" />
              <circle cx="110" cy="110" r="100" fill="none" stroke="#2a6bb0" strokeWidth="0.7" opacity="0.8" />
              <circle cx="110" cy="110" r="93" fill="none" stroke="#6fc3ff" strokeWidth="0.4" opacity="0.5" strokeDasharray="3 5" />
              {Array.from({ length: 24 }).map((_, i) => {
                const ang = (i * Math.PI * 2) / 24;
                const r1 = i % 6 === 0 ? 86 : i % 3 === 0 ? 89 : 91;
                const r2 = 96;
                return (
                  <line key={i}
                    x1={110 + Math.cos(ang) * r1} y1={110 + Math.sin(ang) * r1}
                    x2={110 + Math.cos(ang) * r2} y2={110 + Math.sin(ang) * r2}
                    stroke="#6fc3ff" strokeWidth={i % 6 === 0 ? "1" : "0.4"} opacity="0.6"
                  />
                );
              })}
              {[0, 90, 180, 270].map((deg, i) => {
                const ang = (deg * Math.PI) / 180;
                return (
                  <polygon key={i}
                    points={`${110 + Math.cos(ang) * 80},${110 + Math.sin(ang) * 80} ${110 + Math.cos(ang + 0.15) * 70},${110 + Math.sin(ang + 0.15) * 70} ${110 + Math.cos(ang - 0.15) * 70},${110 + Math.sin(ang - 0.15) * 70}`}
                    fill="#b8e6ff" opacity="0.9"
                  />
                );
              })}
            </svg>

            <svg viewBox="0 0 220 220" className="ig-rune-pulse-slow absolute inset-0 h-full w-full">
              <defs>
                <radialGradient id="ig-inner-bg" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#0a1428" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#03070f" stopOpacity="0.98" />
                </radialGradient>
              </defs>
              <circle cx="110" cy="110" r="68" fill="url(#ig-inner-bg)" />
              <circle cx="110" cy="110" r="68" fill="none" stroke="#6fc3ff" strokeWidth="1" opacity="0.7" />
              <circle cx="110" cy="110" r="62" fill="none" stroke="#2a6bb0" strokeWidth="0.5" opacity="0.5" />
            </svg>

            {/* Portrait photo — centered in ring */}
            <div
              className="relative z-10 overflow-hidden"
              style={{
                width: 176,
                height: 176,
                borderRadius: "50%",
                border: "1.5px solid rgba(111,195,255,0.5)",
                filter: "drop-shadow(0 0 16px rgba(111,195,255,0.8)) drop-shadow(0 0 40px rgba(74,144,217,0.5))",
              }}
            >
              <img
                src="/api/portrait/ice-citadel"
                alt="Portrait"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/me.jpg"; }}
              />
            </div>
          </div>

          {/* Hero text */}
          <div className="relative text-center">
            <p className="ig-font-rune mb-3 text-[10px] tracking-[0.5em] text-[#6fc3ff]/70">
              {t.prologue}
            </p>
            <h1 className="ig-font-display ig-glow-text-strong mb-4 text-4xl font-black uppercase tracking-[0.15em] text-[#e8f4ff] sm:text-6xl md:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="ig-font-rune mb-6 text-xs tracking-[0.4em] text-[#7ab8f5]">
              {t.heroSubtitle}
            </p>
            <div className="mx-auto max-w-2xl">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-[#2a6bb0]" />
                <span className="ig-font-rune text-[10px] tracking-[0.3em] text-[#6fc3ff]/70">{t.chapterLabel}</span>
                <div className="h-px w-12 bg-[#2a6bb0]" />
              </div>
              <p className="ig-font-body text-lg italic leading-relaxed text-[#7ab8f5]">
                {t.heroBody}
              </p>
            </div>
          </div>

          <div className="absolute inset-x-12 bottom-0 rotate-180">
            <IcicleRow />
          </div>
        </header>

        {/* ── Projects grid ── */}
        <section className="mb-16">
          <SigilDivider label={t.portalsLabel} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                lang={lang}
                enterPortalLabel={t.enterPortal}
                visitLabel={sh.visit}
                githubLabel={sh.github}
              />
            ))}
          </div>
        </section>

        {/* ── Next theme button ── */}
        <section className="mt-20 mb-12">
          <SigilDivider />
          <button
            onClick={(e) => { flash(e); onNext(e.clientX, e.clientY); }}
            className="ig-frame-card group relative flex w-full items-center justify-between p-6 sm:p-8 cursor-pointer"
          >
            <span className="ig-click-flash" />

            <div className="flex items-center gap-6">
              {/* Compass icon */}
              <svg viewBox="0 0 48 48" className="ig-rune-pulse-slow h-12 w-12 shrink-0 text-[#6fc3ff]">
                <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
                <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4" />
                <polygon points="24,8 27,22 24,20 21,22" fill="#b8e6ff" opacity="0.9" />
                <polygon points="24,40 27,26 24,28 21,26" fill="currentColor" opacity="0.5" />
                <polygon points="8,24 22,21 20,24 22,27" fill="currentColor" opacity="0.5" />
                <polygon points="40,24 26,21 28,24 26,27" fill="currentColor" opacity="0.5" />
                <circle cx="24" cy="24" r="3" fill="none" stroke="#b8e6ff" strokeWidth="0.8" />
                <circle cx="24" cy="24" r="1.2" fill="#b8e6ff" />
              </svg>

              <div className="text-left">
                <div className="ig-font-rune text-[10px] tracking-[0.35em] text-[#6fc3ff]/60 mb-1">
                  {lang === "es" ? "PRÓXIMO CÓDICE" : "NEXT CODEX"}
                </div>
                <div className="ig-font-display ig-glow-text text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#e8f4ff] transition-all duration-500 group-hover:text-white group-hover:ig-glow-text-strong">
                  {nextLabel}
                </div>
                <div className="ig-font-rune mt-1 text-[9px] tracking-[0.3em] text-[#6fc3ff]/50">
                  {sh.nextHint}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <svg viewBox="0 0 40 24" className="h-5 w-12 shrink-0 text-[#6fc3ff] transition-all duration-500 group-hover:translate-x-2">
              <path d="M0,12 L34,12 M28,6 L34,12 L28,18" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>

            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(ellipse at left, rgba(111,195,255,0.1), transparent 70%)" }}
            />
          </button>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-8 mb-8 text-center">
          <SigilDivider label={t.finis} />
          <div className="ig-font-display text-sm uppercase tracking-[0.4em] text-[#7ab8f5]/70">
            Agrim Portfolio
          </div>
          <div className="ig-font-rune mt-3 text-[9px] tracking-[0.4em] text-[#6fc3ff]/50">
            {t.subtitleFinis}
          </div>
          <div className="ig-font-body mt-2 text-[9px] tracking-[0.3em] text-[#4a90d9]/50">
            {t.body(projects.length)}
          </div>
          <div className="ig-font-body mt-4 text-xs italic text-[#4a90d9]/50">
            Anno Domini MMXXVI · Idyllic Entertainment
          </div>
        </footer>
      </main>
    </div>
  );
}
