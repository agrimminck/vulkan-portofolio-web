# vulkan-portofolio-web — Overview

Portfolio landing page. Vercel-deployed (`agrimminck-portofolio.vercel.app`). Next.js 16 + Tailwind v4. **Seis temas drásticamente distintos** (default = `metropolis`), switcher con clip-path circular reveal.

## Stack

| Capa | Tech |
|---|---|
| Framework | Next.js 16 App Router + React 19 |
| Lenguaje | TypeScript |
| Styles | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Motion | CSS keyframes + clip-path circle reveal |
| Fonts | Google Fonts (10 familias, una sola request) |
| Deploy | Vercel (sin env vars) |

## Estructura archivos

```
app/
  globals.css              # tokens 5 temas + fonts + keyframes
  layout.tsx               # root html
  page.tsx                 # ThemeContext state + transition orchestrator
  lib/projects.ts          # single source of truth: projects[] + themes[]
  components/
    ThemeSwitcher.tsx      # dial top-right, 5 chips → emite (id, x, y) al click
    themes/
      MetropolisTheme.tsx  # **DEFAULT**: ciudad futurista + espacio, satélites, aviones, autos calle, skyline procedural windows
      CorporateTheme.tsx   # navy/oro, aviones SVG volando, contrails
      CyberpunkTheme.tsx   # CRT scanlines, glitch text, neón grid
      EditorialTheme.tsx   # paper grain, masthead, columnas magazine
      OrganicTheme.tsx     # blobs SVG, sticker cards w/ tape
      HolographicTheme.tsx # mesh gradient + glass + iridescent
```

## Switcher — mecánica

1. Click en chip → emite `(themeId, clientX, clientY)`.
2. `page.tsx` setea `revealing` con coords + theme nuevo.
3. Render: tema actual `z-0` + tema nuevo overlay `z-40` con clase `theme-revealing`.
4. CSS keyframe `circle-reveal` anima `clip-path: circle(0% → 150%)` desde `(--reveal-x, --reveal-y)`.
5. `setTimeout(900ms)` → commit theme nuevo, desmonta overlay.

Resultado: revelar circular cinematográfico desde donde el usuario tocó.

## Datos — `app/lib/projects.ts`

7 proyectos hard-coded. **Basilisk apps SIN prefix** (regla de marca portfolio):
- Idyllic (MMORPG)
- Trading
- Mercado Libre Electrodomésticos
- Car Shop App
- Inversionistas
- Free Pickup
- GitHub (link)

Removidos del scope portfolio: turnos-qf, boti-finder, sports-betting-info, hub.

Cada proyecto: `id, name, tagline, description, url?, category, tags[], status, year, accent`.

`status`: `live | wip | standby`.

## Convenciones temas

Cada tema:
- Wrapper `.t-<id>` con CSS vars locales (`--bg`, `--ink`, etc.)
- Renderiza header propio + grid de `projects` con su lenguaje visual
- Sin compartir layout — cada uno es full re-imagining

Para agregar tema nuevo:
1. Bloque CSS `.t-<id>` en `globals.css`
2. Componente en `themes/<Name>Theme.tsx`
3. Entry en `themes` array (`projects.ts`) + `THEMES_MAP` (`page.tsx`)

## Deploy Vercel

```bash
cd vulkan-portofolio-web
vercel link
vercel deploy --prod
```

No env vars. SSR ok pero página puede ser static export si se prefiere.

## Pendientes

- [ ] `vercel link` + deploy producción
- [ ] Custom domain
- [ ] OG image (per tema?)
- [ ] Lighthouse pass
- [ ] Reemplazar GitHub URL placeholder por usuario real si corresponde
- [ ] Considerar reduced-motion fallback (planes/scanlines/blobs)
