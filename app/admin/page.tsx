"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState, useCallback, useRef } from "react";
import { themes } from "../lib/projects";
import type { ThemeId } from "../lib/projects";
import type { PortfolioSettings } from "../lib/settings";
import { DEFAULT_SETTINGS } from "../lib/settings";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [settings, setSettings] = useState<PortfolioSettings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings((prev) => ({ ...prev, ...d })));
  }, [status]);

  async function save() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (status === "loading") {
    return <Screen><p style={{ color: "#888" }}>Loading...</p></Screen>;
  }

  if (!session) {
    return (
      <Screen>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13, textDecoration: "none", marginBottom: 32 }}>
          ← Portfolio
        </a>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Admin</h1>
        <p style={{ color: "#888", marginBottom: 24, fontSize: 14 }}>Sign in with your Google account to continue.</p>
        <button onClick={() => signIn("google")} style={btnStyle("#4285F4")}>
          Sign in with Google
        </button>
      </Screen>
    );
  }

  return (
    <Screen>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Portfolio Admin</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#aaa", fontSize: 12, textDecoration: "none", padding: "6px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8 }}>
            ← Portfolio
          </a>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={btnStyle("#333", { fontSize: 12, padding: "6px 14px" })}>
            Sign out
          </button>
        </div>
      </div>

      {/* Default theme */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#888", marginBottom: 16 }}>
          Default Theme
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {themes.map((t) => {
            const active = settings.default_theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSettings((s) => ({ ...s, default_theme: t.id }))}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 16px", borderRadius: 999,
                  border: active ? `2px solid ${t.color}` : "2px solid rgba(255,255,255,0.12)",
                  background: active ? `${t.color}22` : "rgba(255,255,255,0.04)",
                  color: active ? t.color : "#aaa",
                  cursor: "pointer", fontSize: 13, fontWeight: active ? 700 : 400,
                  transition: "all 0.2s",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
                {t.label}
                {active && <span style={{ fontSize: 10, opacity: 0.7 }}>● Default</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Default language */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#888", marginBottom: 16 }}>
          Default Language
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          {(["en", "es"] as const).map((l) => {
            const active = settings.default_lang === l;
            return (
              <button
                key={l}
                onClick={() => setSettings((s) => ({ ...s, default_lang: l }))}
                style={{
                  padding: "10px 28px", borderRadius: 999,
                  border: active ? "2px solid #67e8f9" : "2px solid rgba(255,255,255,0.12)",
                  background: active ? "rgba(103,232,249,0.15)" : "rgba(255,255,255,0.04)",
                  color: active ? "#67e8f9" : "#aaa",
                  cursor: "pointer", fontSize: 14, fontWeight: active ? 700 : 400,
                  textTransform: "uppercase", letterSpacing: "0.15em",
                }}
              >
                {l === "en" ? "English" : "Español"}
                {active && <span style={{ fontSize: 10, opacity: 0.7, marginLeft: 8 }}>● Default</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Portrait per theme */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#888", marginBottom: 16 }}>
          Portrait per Theme
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {themes.map((t) => (
            <PortraitUploader key={t.id} theme={t.id as ThemeId} color={t.color} label={t.label} />
          ))}
        </div>
      </section>

      {/* Save */}
      <button onClick={save} disabled={saving} style={btnStyle(saved ? "#16a34a" : "#4285F4", { width: "100%", padding: "13px" })}>
        {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
      </button>
    </Screen>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a", color: "#eee",
      fontFamily: "system-ui, -apple-system, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 600 }}>{children}</div>
    </div>
  );
}

// ── Crop editor ───────────────────────────────────────────────────────────
const FRAME = 260;

type Crop = { x: number; y: number; zoom: number };

function parseCropStr(raw: string): Crop {
  try { const d = JSON.parse(raw); if (typeof d.x === "number") return d; } catch { /* */ }
  return { x: 50, y: 50, zoom: 1 };
}

function CropEditor({ src, initial, onSave }: { src: string; initial: Crop; onSave: (c: Crop) => void }) {
  const [crop, setCrop] = useState<Crop>(initial);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    const room = FRAME * (crop.zoom - 1);
    if (room < 1) return;
    setCrop(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100, prev.x - (dx / room) * 100)),
      y: Math.max(0, Math.min(100, prev.y - (dy / room) * 100)),
    }));
  };
  const onMouseUp = () => { dragging.current = false; };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {/* Crop frame */}
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          width: FRAME, height: FRAME, borderRadius: "22%",
          overflow: "hidden", cursor: "grab", userSelect: "none",
          background: "#111", border: "2px solid rgba(255,255,255,0.15)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          draggable={false}
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: `${crop.x}% ${crop.y}%`,
            transform: `scale(${crop.zoom})`,
            transformOrigin: `${crop.x}% ${crop.y}%`,
            pointerEvents: "none", userSelect: "none",
          }}
        />
      </div>
      <p style={{ fontSize: 11, color: "#555", margin: 0 }}>Drag to reposition</p>

      {/* Zoom slider */}
      <div style={{ width: FRAME }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: "#888" }}>Zoom</span>
          <span style={{ fontSize: 11, color: "#ccc" }}>{crop.zoom.toFixed(1)}×</span>
        </div>
        <input
          type="range" min="1" max="3" step="0.05"
          value={crop.zoom}
          onChange={e => setCrop(prev => ({ ...prev, zoom: Number(e.target.value) }))}
          style={{ width: "100%", accentColor: "#67e8f9" }}
        />
      </div>

      <button onClick={() => onSave(crop)} style={btnStyle("#4285F4", { width: FRAME + "px" })}>
        Save crop
      </button>
    </div>
  );
}

// ── Portrait uploader ──────────────────────────────────────────────────────
function PortraitUploader({ theme, color, label }: { theme: ThemeId; color: string; label: string }) {
  const [crop, setCrop] = useState<Crop>({ x: 50, y: 50, zoom: 1 });
  const [preview, setPreview] = useState<string | null>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null); // blob URL for crop editor
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    fetch(`/api/portrait/${theme}/meta`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.position) setCrop(parseCropStr(d.position)); })
      .catch(() => {});
    setPreview(`/api/portrait/${theme}?v=${Date.now()}`);
  }, [theme]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setCropSrc(URL.createObjectURL(file));
    // Reset crop for new image
    setCrop({ x: 50, y: 50, zoom: 1 });
  }

  async function handleSaveCrop(newCrop: Crop) {
    setCrop(newCrop);
    const posJson = JSON.stringify(newCrop);

    if (pendingFile) {
      // Upload new file with crop
      const fd = new FormData();
      fd.append("file", pendingFile);
      fd.append("theme", theme);
      fd.append("position", posJson);
      setUploading(true);
      const res = await fetch("/api/portrait/upload", { method: "POST", body: fd });
      setUploading(false);
      if (res.ok) {
        setStatus("ok");
        setPendingFile(null);
        setCropSrc(null);
        setPreview(`/api/portrait/${theme}?v=${Date.now()}`);
      } else {
        setStatus("err");
      }
    } else {
      // Update position only
      await fetch("/api/portrait/position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, position: posJson }),
      });
      setStatus("ok");
      setCropSrc(null);
    }
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: "22%", overflow: "hidden", background: "#111", flexShrink: 0, border: `2px solid ${color}55` }}>
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.zoom})`, transformOrigin: `${crop.x}% ${crop.y}%` }} onError={() => setPreview(null)} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: color }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{label}</span>
            {status === "ok" && <span style={{ fontSize: 11, color: "#4ade80" }}>✓ Saved</span>}
            {status === "err" && <span style={{ fontSize: 11, color: "#f87171" }}>✗ Error</span>}
            {uploading && <span style={{ fontSize: 11, color: "#67e8f9" }}>Uploading...</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <label style={{ cursor: "pointer" }}>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileSelect} style={{ display: "none" }} />
            <span style={{ ...btnStyle("#333"), fontSize: 12, padding: "6px 14px", display: "inline-block" }}>
              Choose photo
            </span>
          </label>
          {!cropSrc && preview && (
            <button onClick={() => setCropSrc(preview)} style={btnStyle("#1a1a2e", { fontSize: 12, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.15)" })}>
              Adjust crop
            </button>
          )}
        </div>
      </div>

      {/* Crop editor */}
      {cropSrc && (
        <CropEditor src={cropSrc} initial={crop} onSave={handleSaveCrop} />
      )}
    </div>
  );
}

function btnStyle(bg: string, extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: bg, color: "#fff", border: "none", borderRadius: 8,
    padding: "10px 20px", cursor: "pointer", fontWeight: 600,
    fontSize: 14, transition: "opacity 0.2s", ...extra,
  };
}
