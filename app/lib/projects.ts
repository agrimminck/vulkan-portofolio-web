export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url?: string;
  github?: string;
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
    tagline: "Large-scale online video game, built ground-up",
    description:
      "Massive online game. Custom Godot engine work, NestJS backend mesh, server meshing, multi-region. Player-driven economy, anti-P2W manifesto.",
    url: "https://idyllic-web.vercel.app",
    github: "https://github.com/agrimminck/idyllic-web",
    category: "idyllic",
    tags: ["Godot", "NestJS", "Postgres", "Server Mesh", "Game Design"],
    status: "wip",
    year: 2026,
    accent: "#c8a86b",
  },
  {
    id: "mercadolibre-electrodomesticos",
    name: "Mercado Libre Electrodomésticos",
    tagline: "Affiliate marketplace, MLC API",
    description:
      "Next.js 15 affiliate site for home appliances in Chile. Full SEO pipeline, JSON-LD, sitemap, Mercado Libre OAuth integration.",
    url: "https://topelectrohogar.com",
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
    github: "https://github.com/agrimminck/basilisk-car-shop-app",
    category: "basilisk",
    tags: ["Next.js", "Transbank", "Postgres", "POS"],
    status: "live",
    year: 2026,
    accent: "#dc2626",
  },
  {
    id: "inversionistas",
    name: "Inversionistas",
    tagline: "Match investors w/ projects",
    description:
      "Web + mobile PWA. Document vault, interest signals, 1-to-1 chat after acceptance. Standby on R2 storage credentials.",
    url: "https://basilisk-inversionistas.vercel.app",
    github: "https://github.com/agrimminck/basilisk-inversionistas",
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
    url: "https://basilisk-boti-finder.vercel.app",
    github: "https://github.com/agrimminck/basilisk-boti-finder",
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
    url: "https://basilisk-free-pickup.vercel.app",
    github: "https://github.com/agrimminck/basilisk-free-pickup",
    category: "basilisk",
    tags: ["Next.js 16", "Better Auth", "Geolocation"],
    status: "live",
    year: 2026,
    accent: "#84cc16",
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
  { id: "refined", label: "Refined", subtitle: "Quiet · Considered", color: "#1e3a5f" },
  { id: "metropolis", label: "Metropolis", subtitle: "Future City + Orbit", color: "#67e8f9" },
  { id: "corporate", label: "Corporate", subtitle: "Boardroom", color: "#0a2540" },
  { id: "cyberpunk", label: "Cyberpunk", subtitle: "Terminal/Neon", color: "#ff007a" },
  { id: "editorial", label: "Editorial", subtitle: "Print Brutalism", color: "#1a1a1a" },
  { id: "organic", label: "Organic", subtitle: "Risograph", color: "#d97757" },
  { id: "holographic", label: "Holographic", subtitle: "Y2K Aurora", color: "#a78bfa" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
