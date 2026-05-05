"use client";

import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../lib/settings-context";

type Variant =
  | "refined" | "corporate" | "cyberpunk" | "editorial"
  | "organic" | "holographic" | "metropolis";

type Props = {
  variant: Variant;
  size?: number;
  className?: string;
  ringColor?: string;
};

type CropData = { x: number; y: number; zoom: number };

function parseCrop(raw: string): CropData {
  // Try JSON format {"x":50,"y":50,"zoom":1.2}
  try {
    const d = JSON.parse(raw);
    if (typeof d.x === "number") return d;
  } catch { /* ignore */ }
  // Legacy "50% 50% 1.2" or "center center"
  const parts = raw.replace(/%/g, "").split(/\s+/);
  const x = parseFloat(parts[0]) || 50;
  const y = parseFloat(parts[1]) || 50;
  const zoom = parseFloat(parts[2]) || 1;
  return { x, y, zoom };
}

export default function ThemedPortrait({ variant, size = 210, className = "", ringColor }: Props) {
  const settings = useContext(SettingsContext);
  const [version, setVersion] = useState<number>(0);
  const [crop, setCrop] = useState<CropData>({ x: 50, y: 50, zoom: 1 });
  const [srcError, setSrcError] = useState(false);

  useEffect(() => {
    setSrcError(false);
    fetch(`/api/portrait/${variant}/meta`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => {
        if (d?.position) setCrop(parseCrop(d.position));
        if (d?.version) setVersion(d.version);
      })
      .catch(() => {});
  }, [variant]);

  const dbSrc = `/api/portrait/${variant}?v=${version}`;
  const staticSrc = (settings[`portrait_${variant}` as keyof typeof settings] as string) || "/me.jpg";
  const src = srcError ? staticSrc : dbSrc;

  const filterClass = `portrait-${variant === "cyberpunk" ? "cyber" : variant === "holographic" ? "holo" : variant}`;
  const frameClass =
    variant === "cyberpunk" ? "portrait-cyber-frame"
    : variant === "editorial" ? "portrait-editorial-frame"
    : variant === "organic" ? "portrait-organic-frame"
    : variant === "holographic" ? "portrait-holo-frame"
    : "";

  const ring = ringColor ?? defaultRing(variant);

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <div
        className={`relative w-full h-full ${frameClass}`}
        style={{ borderRadius: "22%", overflow: "hidden", boxShadow: ring }}
      >
        <Image
          src={src}
          alt="Portrait"
          fill
          sizes={`${size}px`}
          className={`portrait-base ${filterClass}`}
          style={{
            objectFit: "cover",
            objectPosition: `${crop.x}% ${crop.y}%`,
            transform: `scale(${crop.zoom})`,
            transformOrigin: `${crop.x}% ${crop.y}%`,
          }}
          priority={variant === "refined" || variant === "metropolis"}
          onError={() => setSrcError(true)}
        />
      </div>
    </div>
  );
}

function defaultRing(v: Variant): string {
  switch (v) {
    case "refined": return "0 0 0 1px rgba(24,24,27,0.08), 0 18px 40px -16px rgba(24,24,27,0.18)";
    case "corporate": return "0 0 0 2px var(--gold, #b08a3e), 0 0 0 6px rgba(176,138,62,0.15), 0 16px 36px -12px rgba(10,37,64,0.25)";
    case "cyberpunk": return "0 0 0 2px #ff007a, 0 0 24px rgba(0,240,255,0.55)";
    case "editorial": return "0 0 0 3px #0c0c0c, 8px 8px 0 #c8281e";
    case "organic": return "0 0 0 4px #2b1d12, 8px 8px 0 #d97757";
    case "holographic": return "0 0 0 1px rgba(255,255,255,0.3), 0 0 60px rgba(192,132,252,0.4), 0 0 100px rgba(103,232,249,0.25)";
    case "metropolis": return "0 0 0 2px rgba(255,255,255,0.6), 0 0 0 4px rgba(103,232,249,0.45), 0 12px 30px rgba(0,0,0,0.35)";
  }
}
