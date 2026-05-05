"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
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
        <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>
          Path relative to /public (e.g. /me.jpg or /me-metropolis.jpg). Image must be uploaded to the repo.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {themes.map((t) => {
            const key = `portrait_${t.id}` as keyof PortfolioSettings;
            return (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: t.color, flexShrink: 0 }} />
                <span style={{ width: 120, fontSize: 13, color: "#ccc" }}>{t.label}</span>
                <input
                  value={settings[key] ?? "/me.jpg"}
                  onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))}
                  style={{
                    flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: 6, padding: "7px 12px", color: "#eee", fontSize: 13,
                    fontFamily: "monospace",
                  }}
                  placeholder="/me.jpg"
                />
              </div>
            );
          })}
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

function btnStyle(bg: string, extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: bg, color: "#fff", border: "none", borderRadius: 8,
    padding: "10px 20px", cursor: "pointer", fontWeight: 600,
    fontSize: 14, transition: "opacity 0.2s", ...extra,
  };
}
