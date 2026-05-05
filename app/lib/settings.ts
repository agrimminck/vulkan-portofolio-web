export type PortfolioSettings = {
  default_theme: string;
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
  portrait_refined: "/me.jpg",
  portrait_metropolis: "/me.jpg",
  portrait_corporate: "/me.jpg",
  portrait_cyberpunk: "/me.jpg",
  portrait_editorial: "/me.jpg",
  portrait_organic: "/me.jpg",
  portrait_holographic: "/me.jpg",
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
