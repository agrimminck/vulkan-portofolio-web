"use client";

import { useLang } from "../lib/lang-context";

export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      title="Toggle language"
      style={{
        position: "fixed",
        top: 24,
        left: 24,
        zIndex: 9999,
        background: "rgba(0,0,0,0.65)",
        color: "#fff",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 9999,
        padding: "7px 14px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        cursor: "pointer",
        fontFamily: "system-ui, sans-serif",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = "0.75")}
      onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = "1")}
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}
