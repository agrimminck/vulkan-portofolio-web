export type PortfolioSettings = {
  default_theme: string;
  default_lang: string;
  portrait_refined: string;
  portrait_metropolis: string;
  portrait_corporate: string;
  portrait_cyberpunk: string;
  portrait_editorial: string;
  portrait_organic: string;
  portrait_holographic: string;
};

export const DEFAULT_SETTINGS: PortfolioSettings = {
  default_theme: "metropolis",
  default_lang: "en",
  portrait_refined: "/me.png",
  portrait_metropolis: "/me-metropolis.png",
  portrait_corporate: "/me-corporate.png",
  portrait_cyberpunk: "/me-cyberpunk.png",
  portrait_editorial: "/me.png",
  portrait_organic: "/me.png",
  portrait_holographic: "/me.png",
};

export async function fetchSettings(): Promise<PortfolioSettings> {
  try {
    const base = typeof window !== "undefined" ? "" : (process.env.NEXTAUTH_URL ?? "http://localhost:3000");
    const res = await fetch(`${base}/api/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(await res.json()) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
