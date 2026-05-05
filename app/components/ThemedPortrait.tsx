"use client";

import Image from "next/image";

type Variant =
  | "refined"
  | "corporate"
  | "cyberpunk"
  | "editorial"
  | "organic"
  | "holographic"
  | "metropolis";

type Props = {
  variant: Variant;
  size?: number;
  shape?: "circle" | "square";
  className?: string;
  ringColor?: string;
};

export default function ThemedPortrait({
  variant,
  size = 160,
  shape = "circle",
  className = "",
  ringColor,
}: Props) {
  const radius = shape === "circle" ? "9999px" : "8px";
  const filterClass = `portrait-${variant === "cyberpunk" ? "cyber" : variant === "holographic" ? "holo" : variant}`;
  const frameClass =
    variant === "cyberpunk"
      ? "portrait-cyber-frame"
      : variant === "editorial"
        ? "portrait-editorial-frame"
        : variant === "organic"
          ? "portrait-organic-frame"
          : variant === "holographic"
            ? "portrait-holo-frame"
            : "";

  const ring = ringColor ?? defaultRing(variant);

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`relative w-full h-full ${frameClass}`}
        style={{
          borderRadius: radius,
          overflow: "hidden",
          boxShadow: ring,
        }}
      >
        <Image
          src="/me.jpg"
          alt="Portrait"
          fill
          sizes={`${size}px`}
          className={`portrait-base ${filterClass}`}
          priority={variant === "refined"}
        />
      </div>
    </div>
  );
}

function defaultRing(v: Variant): string {
  switch (v) {
    case "refined":
      return "0 0 0 1px rgba(24,24,27,0.08), 0 18px 40px -16px rgba(24,24,27,0.18)";
    case "corporate":
      return "0 0 0 2px var(--gold, #b08a3e), 0 0 0 6px rgba(176,138,62,0.15), 0 16px 36px -12px rgba(10,37,64,0.25)";
    case "cyberpunk":
      return "0 0 0 2px #ff007a, 0 0 24px rgba(0,240,255,0.55)";
    case "editorial":
      return "0 0 0 3px #0c0c0c, 8px 8px 0 #c8281e";
    case "organic":
      return "0 0 0 4px #2b1d12, 8px 8px 0 #d97757";
    case "holographic":
      return "0 0 0 1px rgba(255,255,255,0.3), 0 0 60px rgba(192,132,252,0.4), 0 0 100px rgba(103,232,249,0.25)";
    case "metropolis":
      return "0 0 0 2px rgba(255,255,255,0.6), 0 0 0 4px rgba(103,232,249,0.45), 0 12px 30px rgba(0,0,0,0.35)";
  }
}
