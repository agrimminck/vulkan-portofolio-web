export type Lang = "en" | "es";

// ── Project translations ──────────────────────────────────────────────────────

export const PROJECT_ES: Record<string, { tagline: string; description: string }> = {
  "idyllic-mmo": {
    tagline: "Videojuego online a gran escala, construido desde cero",
    description:
      "Videojuego online masivo. Motor Godot personalizado, backend NestJS con server meshing, múltiples regiones. Economía player-driven, manifiesto anti-P2W.",
  },
  trading: {
    tagline: "Trading algorítmico de forex con Claude en el loop",
    description:
      "Swing trader híbrido. Claude API decide 2 veces al día, executor FastAPI gestiona SL/TP de forma autónoma. IBKR + Finnhub + ForexFactory.",
  },
  "mercadolibre-electrodomesticos": {
    tagline: "Marketplace de afiliados con API MLC",
    description:
      "Sitio de afiliados Next.js 15 para electrodomésticos en Chile. Pipeline SEO completo, JSON-LD, sitemap, integración OAuth de Mercado Libre.",
  },
  "car-shop-app": {
    tagline: "POS + inventario para taller mecánico",
    description:
      "Ventas, inventario, clientes, vehículos y servicios. POS Integrado Transbank. Monorepo pnpm, deploy en Vercel.",
  },
  inversionistas: {
    tagline: "Conecta inversores con proyectos",
    description:
      "Web + PWA móvil. Bóveda de documentos, señales de interés, chat 1:1 tras aceptación. En standby por credenciales R2.",
  },
  "boti-finder": {
    tagline: "Descubre botillerías con promos en tiempo real",
    description:
      "Descubrimiento de botillerías y minimarkets en mapa. Google Places API (New). En standby por billing de GCP.",
  },
  "free-pickup": {
    tagline: "Regala objetos localmente gratis",
    description:
      "Intercambio geolocalizados de objetos gratis. Better Auth, Drizzle ORM, Neon. Multi-tenant con schema aislado.",
  },
  github: {
    tagline: "Código fuente, repos públicos",
    description:
      "Contribuciones open source y repos públicos. Motor, stacks web, automatización de infra.",
  },
};

// ── Shared labels ─────────────────────────────────────────────────────────────

export const SHARED: Record<Lang, {
  visit: string;
  studio: string;
  openSource: string;
  product: string;
  live: string;
  wip: string;
  standby: string;
}> = {
  en: {
    visit: "Visit →",
    studio: "Studio Project",
    openSource: "Open Source",
    product: "Public Product",
    live: "In production",
    wip: "In progress",
    standby: "Standby",
  },
  es: {
    visit: "Visitar →",
    studio: "Proyecto de Estudio",
    openSource: "Open Source",
    product: "Producto Público",
    live: "En producción",
    wip: "En progreso",
    standby: "En espera",
  },
};

// ── Per-theme strings ─────────────────────────────────────────────────────────

export const REFINED_T: Record<Lang, {
  eyebrow: string; location: string; headline: string; body: string;
  statLive: string; statWip: string; statTotal: string;
  sectionTitle: string; colophon: string; updated: string;
  catStudio: string; catOSS: string; catProduct: string;
  footer: string; tagline: string;
}> = {
  en: {
    eyebrow: "Idyllic Entertainment · Est. 2026",
    location: "Santiago, CL · Available for selected work",
    headline: "Software, built carefully — by one engineer based in Santiago, Chile.",
    body: "I run a small studio responsible for one ambitious long-running project — a large-scale online video game built ground-up — alongside a handful of public products I ship for clients and the open web. This page is a quiet index of what I keep on the shelf.",
    statLive: "in production",
    statWip: "in development",
    statTotal: "total",
    sectionTitle: "❶   Selected Work",
    colophon: "A working portfolio",
    updated: "Updated continuously",
    catStudio: "Studio Project",
    catOSS: "Open Source",
    catProduct: "Public Product",
    footer: "© 2026 Idyllic Entertainment · Crafted in Santiago, Chile",
    tagline: "Quiet by design.",
  },
  es: {
    eyebrow: "Idyllic Entertainment · Est. 2026",
    location: "Santiago, CL · Disponible para proyectos seleccionados",
    headline: "Software, construido con cuidado — por un ingeniero en Santiago, Chile.",
    body: "Dirijo un estudio pequeño responsable de un proyecto ambicioso de largo plazo — un videojuego online a gran escala construido desde cero — junto a un puñado de productos públicos que desarrollo para clientes y la web abierta. Esta página es un índice tranquilo de lo que tengo en el estante.",
    statLive: "en producción",
    statWip: "en desarrollo",
    statTotal: "total",
    sectionTitle: "❶   Trabajo Selecto",
    colophon: "Un portfolio funcional",
    updated: "Actualizado continuamente",
    catStudio: "Proyecto de Estudio",
    catOSS: "Open Source",
    catProduct: "Producto Público",
    footer: "© 2026 Idyllic Entertainment · Creado en Santiago, Chile",
    tagline: "Diseño discreto.",
  },
};

export const METROPOLIS_T: Record<Lang, {
  eyebrow: string; h1a: string; h1b: string; h1c: string; body: string;
  sActive: string; sWip: string; sStandby: string; sTotal: string;
  sectionTitle: string; manifest: string;
  catStudio: string; catOSS: string; catProduct: string;
  footerL: string; footerR: string;
}> = {
  en: {
    eyebrow: "Live broadcast · 12.34°N · 103.84°E",
    h1a: "From the", h1b: "ground floor", h1c: "to orbit.",
    body: "Software shipped from a small studio in Santiago — a large-scale online video game with its own custom backend mesh, alongside a handful of public products serving Latin America.",
    sActive: "Active deploys", sWip: "In progress", sStandby: "Standing by", sTotal: "Total payload",
    sectionTitle: "Selected Work", manifest: "Manifest",
    catStudio: "Studio", catOSS: "Open Source", catProduct: "Product",
    footerL: "// SIGNAL.STABLE · TX 24/7 · MMXXVI", footerR: "END_OF_FEED ✦",
  },
  es: {
    eyebrow: "Transmisión en vivo · 12.34°N · 103.84°E",
    h1a: "Del piso", h1b: "cero", h1c: "a la órbita.",
    body: "Software desarrollado desde un pequeño estudio en Santiago — un videojuego online a gran escala con su propia malla de servidores personalizada, junto a una serie de productos públicos para América Latina.",
    sActive: "Deploys activos", sWip: "En progreso", sStandby: "En espera", sTotal: "Carga total",
    sectionTitle: "Trabajo Selecto", manifest: "Manifiesto",
    catStudio: "Estudio", catOSS: "Open Source", catProduct: "Producto",
    footerL: "// SEÑAL.ESTABLE · TX 24/7 · MMXXVI", footerR: "FIN_DE_TRANSMISIÓN ✦",
  },
};

export const CORPORATE_T: Record<Lang, {
  established: string; sub: string; reg: string; volume: string;
  reportTitle: string; principal: string; body: string; intent: string;
  indexTitle: string; i1: string; i2: string; i3: string; i4: string;
  portfolioLabel: string; entries: string;
  footer1: string; footer2: string;
}> = {
  en: {
    established: "Established · 2026 · Santiago, Chile",
    sub: "software · games · infrastructure",
    reg: "Reg. № CL-2026-MMXXVI",
    volume: "Volume I · Folio 01",
    reportTitle: "Annual Report",
    principal: "Principal —",
    body: "A boutique studio building a large-scale online video game from first principles, alongside a small portfolio of public-facing software products serving Latin America.",
    intent: "— Statement of Intent",
    indexTitle: "Index",
    i1: "I. Flagship Project", i2: "II. Public Portfolio", i3: "III. Open Source", i4: "IV. Correspondence",
    portfolioLabel: "Portfolio",
    entries: "entries",
    footer1: "Idyllic Entertainment · MMXXVI",
    footer2: "Crafted in Santiago · Latin America",
  },
  es: {
    established: "Establecido · 2026 · Santiago, Chile",
    sub: "software · juegos · infraestructura",
    reg: "Reg. № CL-2026-MMXXVI",
    volume: "Volumen I · Folio 01",
    reportTitle: "Informe Anual",
    principal: "Director —",
    body: "Un estudio boutique que construye un videojuego online a gran escala desde principios fundamentales, junto a un pequeño portfolio de productos de software para América Latina.",
    intent: "— Declaración de Intención",
    indexTitle: "Índice",
    i1: "I. Proyecto Insignia", i2: "II. Portfolio Público", i3: "III. Open Source", i4: "IV. Correspondencia",
    portfolioLabel: "Portfolio",
    entries: "entradas",
    footer1: "Idyllic Entertainment · MMXXVI",
    footer2: "Creado en Santiago · América Latina",
  },
};

export const CYBERPUNK_T: Record<Lang, {
  nodeTag: string; sProjects: string; sLive: string; sWip: string; sStandby: string;
  manifest: string; eof: string;
}> = {
  en: {
    nodeTag: "NODE.LATAM // PORTFOLIO_v5.0 // 2026.05",
    sProjects: "PROJECTS", sLive: "DEPLOYED", sWip: "STACKS", sStandby: "UPTIME",
    manifest: "MANIFEST",
    eof: "EOF // session=alive // mem=98%",
  },
  es: {
    nodeTag: "NODO.LATAM // PORTFOLIO_v5.0 // 2026.05",
    sProjects: "PROYECTOS", sLive: "DESPLEGADOS", sWip: "STACKS", sStandby: "UPTIME",
    manifest: "MANIFIESTO",
    eof: "EOF // sesión=activa // mem=98%",
  },
};

export const EDITORIAL_T: Record<Lang, {
  vol: string; date: string; lede: string; byline: string; photoCaption: string;
  body1: string; body2: string;
  catalogTitle: string; continued: string; footer: string; end: string;
}> = {
  en: {
    vol: "Vol. I · No. 01",
    date: "Tuesday, May 5, 2026",
    lede: "A solo studio building eleven things at once.",
    byline: "By Idyllic Entertainment",
    photoCaption: "↳ The author, photographed in studio",
    body1: "The portfolio you are reading is intentionally heterogeneous. A large-scale online video game built ground-up shares a column with a forex algorithm, a pharmacy-shift marketplace, and a humble affiliate site for home appliances.",
    body2: "This is not a contradiction — it is the working method. Build small, ship often, and hold one ambitious thing on the long horizon.",
    catalogTitle: "The Catalogue",
    continued: "Continued from cover →",
    footer: "The Idyllic Review © MMXXVI",
    end: "— continued indefinitely —",
  },
  es: {
    vol: "Vol. I · N.º 01",
    date: "Martes, 5 de mayo de 2026",
    lede: "Un estudio en solitario construyendo once cosas a la vez.",
    byline: "Por Idyllic Entertainment",
    photoCaption: "↳ El autor, fotografiado en el estudio",
    body1: "El portfolio que estás leyendo es intencionalmente heterogéneo. Un videojuego online a gran escala construido desde cero comparte columna con un algoritmo de forex, un marketplace de turnos de farmacia y un sitio de afiliados para electrodomésticos.",
    body2: "Esto no es una contradicción — es el método de trabajo. Construir pequeño, lanzar seguido, y mantener una cosa ambiciosa en el horizonte largo.",
    catalogTitle: "El Catálogo",
    continued: "Continúa en portada →",
    footer: "The Idyllic Review © MMXXVI",
    end: "— continúa indefinidamente —",
  },
};

export const ORGANIC_T: Record<Lang, {
  role: string; title: string; sub: string; body: string;
  tag1: string; tag2: string; tag3: string; tag4: string; tag5: string;
  footer: string;
}> = {
  en: {
    role: "✿ the gardener",
    title: "✦ a portfolio garden ✦",
    sub: "grown slowly, with hands.",
    body: "eleven projects, one gardener. a video game that takes years, an affiliate site that took weekends. each one watered when it asked for water.",
    tag1: "✿ chile", tag2: "✦ santiago", tag3: "❀ since 2026", tag4: "✺ open source", tag5: "❁ slow software",
    footer: "keep growing ✿ keep shipping ✦ keep going",
  },
  es: {
    role: "✿ el jardinero",
    title: "✦ un jardín portfolio ✦",
    sub: "cultivado lentamente, con las manos.",
    body: "once proyectos, un jardinero. un videojuego que lleva años, un sitio de afiliados que tomó fines de semana. cada uno regado cuando lo pedía.",
    tag1: "✿ chile", tag2: "✦ santiago", tag3: "❀ desde 2026", tag4: "✺ open source", tag5: "❁ software lento",
    footer: "seguir creciendo ✿ seguir lanzando ✦ seguir adelante",
  },
};

export const HOLOGRAPHIC_T: Record<Lang, {
  title: string; sub: string; body: (n: number) => string;
  sProjects: string; sLive: string; sWip: string; sStandby: string;
  footer: string;
}> = {
  en: {
    title: "✦ a portfolio of impossible objects ✦",
    sub: "Software from a parallel timeline.",
    body: (n) => `// ${n} projects rendered through a chrome lens. some live, some still loading, // all built by one engineer & a small library of tools.`,
    sProjects: "PROJECTS", sLive: "LIVE", sWip: "WIP", sStandby: "STAND BY",
    footer: "// signal stable · channel open · MMXXVI",
  },
  es: {
    title: "✦ un portfolio de objetos imposibles ✦",
    sub: "Software de una línea temporal paralela.",
    body: (n) => `// ${n} proyectos renderizados a través de un lente cromado. algunos en vivo, algunos aún cargando, // todos construidos por un ingeniero y una pequeña biblioteca de herramientas.`,
    sProjects: "PROYECTOS", sLive: "EN VIVO", sWip: "EN DESARROLLO", sStandby: "EN ESPERA",
    footer: "// señal estable · canal abierto · MMXXVI",
  },
};
