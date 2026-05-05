export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url?: string;
  category: "idyllic" | "basilisk" | "social";
  tags: string[];
  status: "live" | "wip" | "standby";
  year: number;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "idyllic-mmo",
    name: "Idyllic",
    tagline: "MMORPG world built ground-up",
    description:
      "Multiplayer online RPG. Custom Godot engine work, NestJS backend mesh, server meshing, multi-region. Player-driven economy, anti-P2W manifesto.",
    url: "https://idyllic-web.vercel.app",
    category: "idyllic",
    tags: ["Godot", "NestJS", "Postgres", "Server Mesh", "Game Design"],
    status: "wip",
    year: 2026,
    accent: "#c8a86b",
  },
  {
    id: "trading",
    name: "Trading",
    tagline: "Algorithmic forex w/ Claude in the loop",
    description:
      "Hybrid swing trader. Claude API decides 2x/day, FastAPI executor manages SL/TP autonomously. IBKR + Finnhub + ForexFactory.",
    category: "basilisk",
    tags: ["Next.js", "FastAPI", "Claude API", "IBKR", "Drizzle"],
    status: "wip",
    year: 2026,
    accent: "#22c55e",
  },
  {
    id: "mercadolibre-electrodomesticos",
    name: "Mercado Libre Electrodomésticos",
    tagline: "Affiliate marketplace, MLC API",
    description:
      "Next.js 15 affiliate site for home appliances in Chile. Full SEO pipeline, JSON-LD, sitemap, Mercado Libre OAuth integration.",
    category: "basilisk",
    tags: ["Next.js 15", "MLC API", "SEO", "Affiliate"],
    status: "live",
    year: 2026,
    accent: "#ffe600",
  },
  {
    id: "car-shop-app",
    name: "Car Shop App",
    tagline: "POS + inventory for auto workshop",
    description:
      "Sales, inventory, customers, vehicles, services. Transbank POS Integrado. pnpm monorepo, Vercel deploy.",
    url: "https://basilisk-car-shop-app.vercel.app",
    category: "basilisk",
    tags: ["Next.js", "Transbank", "Postgres", "POS"],
    status: "live",
    year: 2026,
    accent: "#dc2626",
  },
  {
    id: "turnos-qf",
    name: "Turnos QF",
    tagline: "Marketplace for pharmacist shifts",
    description:
      "Cross-user shift alert flow, Leaflet map w/ 3914 OSM-seeded farmacias, MercadoPago, Better Auth + Google OAuth.",
    category: "basilisk",
    tags: ["Next.js 15", "Better Auth", "MercadoPago", "Leaflet"],
    status: "live",
    year: 2026,
    accent: "#10b981",
  },
  {
    id: "inversionistas",
    name: "Inversionistas",
    tagline: "Match investors w/ projects",
    description:
      "Web + mobile PWA. Document vault, interest signals, 1-to-1 chat after acceptance. Standby on R2 storage credentials.",
    category: "basilisk",
    tags: ["Next.js 16", "Better Auth", "PWA", "Drizzle"],
    status: "standby",
    year: 2026,
    accent: "#3b82f6",
  },
  {
    id: "boti-finder",
    name: "Boti Finder",
    tagline: "Discover liquor stores w/ live promos",
    description:
      "Map-driven discovery for botillerías y minimarkets. Google Places API (New). Standby on GCP billing.",
    category: "basilisk",
    tags: ["Next.js 16", "Places API", "Drizzle"],
    status: "standby",
    year: 2026,
    accent: "#f59e0b",
  },
  {
    id: "free-pickup",
    name: "Free Pickup",
    tagline: "Give away items locally for free",
    description:
      "Geolocated free-item exchange. Better Auth, Drizzle ORM, Neon. Schema-isolated multi-tenant.",
    category: "basilisk",
    tags: ["Next.js 16", "Better Auth", "Geolocation"],
    status: "live",
    year: 2026,
    accent: "#84cc16",
  },
  {
    id: "sports-betting-info",
    name: "Sports Information for Betting",
    tagline: "Poisson predictions for Chilean football",
    description:
      "Analytics platform for sports bettors. Value bets, Primera División CL, freemium + affiliate model.",
    category: "basilisk",
    tags: ["React", "Poisson Model", "API-Football"],
    status: "wip",
    year: 2026,
    accent: "#ef4444",
  },
  {
    id: "hub",
    name: "Hub",
    tagline: "Dashboard for the whole ecosystem",
    description:
      "Central directory for every public app. Static export, fast as light. Built to grow with each new shipped product.",
    url: "https://basilisk-hub.vercel.app",
    category: "basilisk",
    tags: ["Next.js 16", "Tailwind v4", "Static"],
    status: "live",
    year: 2026,
    accent: "#a855f7",
  },
  {
    id: "github",
    name: "GitHub",
    tagline: "Source code, public repos",
    description:
      "Open source contributions and public repos. Engine work, web stacks, infra automation.",
    url: "https://github.com/agrimminck",
    category: "social",
    tags: ["Open Source"],
    status: "live",
    year: 2026,
    accent: "#fafafa",
  },
];

export const themes = [
  { id: "corporate", label: "Corporate", subtitle: "Boardroom", color: "#0a2540" },
  { id: "cyberpunk", label: "Cyberpunk", subtitle: "Terminal/Neon", color: "#ff007a" },
  { id: "editorial", label: "Editorial", subtitle: "Print Brutalism", color: "#1a1a1a" },
  { id: "organic", label: "Organic", subtitle: "Risograph", color: "#d97757" },
  { id: "holographic", label: "Holographic", subtitle: "Y2K Aurora", color: "#a78bfa" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
