# vulkan-portofolio-web — Overview

Portfolio personal. **Producción:** `agrimminck-portofolio.vercel.app`. Next.js App Router + Tailwind. **10 temas** (default = `metropolis`), switcher con clip-path circular reveal. Admin secreto + i18n EN/ES + portrait dinámico por tema + arquitectura diagram per-theme.

## ⚠️ Nota crítica para entrevistas (vibecoding disclosure)

**Todo este portfolio fue construido por vibecoding** (con Claude Code, sin escribir código frontend manualmente). En entrevistas técnicas frontend (React/Next.js/CSS profundo) **NO** debe presentarse como evidencia de experiencia frontend deep. Lo que demuestra honestamente:
- Capacidad de dirección creativa y diseño visual
- Capacidad de coordinar agentes y arquitectura de proyecto
- Conocimiento de stack y decisiones técnicas a alto nivel
- Visión de producto

Para frontend deep usar idyllic-mmo1-game (Godot, no React) o trabajos universitarios documentados. Mencionar el portfolio como "AI-assisted development project" si se pregunta por la implementación.

## Stack

| Capa | Tech |
|---|---|
| Framework | Next.js App Router (16.x) + React |
| Lenguaje | TypeScript estricto |
| Styles | Tailwind CSS v4 + globals.css custom |
| Auth | next-auth v4 + Google OAuth |
| DB | Neon Postgres (`portfolio_settings` schema) |
| Deploy | Vercel (`agrimminck-portofolio`) |

## Env vars requeridas

| Var | Valor/Fuente |
|---|---|
| `DATABASE_URL` | Neon `basilisk-prod`, schema `portfolio_settings` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | ídem |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` local / `https://agrimminck-portofolio.vercel.app` prod |
| `ADMIN_EMAIL` | `agrimminck.94@gmail.com` (sin newline) |

## 10 temas

| ID | Label | Estética | Fuente |
|---|---|---|---|
| `metropolis` | Metropolis | DEFAULT — ciudad futurista + foto Singapore | propio |
| `ice-citadel` | Ice Citadel | Cinzel + frost + Canvas particles + aurora | port basilisk-hub ice-gothic |
| `tron` | Tron Grid | Orbitron + Matrix rain + RGB glitch + perimeter laser | port basilisk-hub tron |
| `netflix` | Netflix | Bebas Neue + black/red, hero + thumbnail row | propio |
| `cyberpunk` | Cyberpunk | VT323 + neon pink/cyan + scanlines | propio |
| `holographic` | Holographic | DM Serif + iridescent + glass orbs | propio |
| `refined` | Refined | EB Garamond + cream + minimal | propio |
| `corporate` | Corporate | Playfair + boardroom + gold rule | propio |
| `editorial` | Editorial | Fraunces + newspaper brutalism | propio |
| `organic` | Organic | Bricolage + Caveat + risograph stickers | propio |

## Estructura archivos

```
app/
  layout.tsx                  # root: Providers + AdminKeyListener + LangToggle
  page.tsx                    # theme state + 3 contexts (Lang/Settings/NextTheme) + ArchitectureDiagram
  globals.css                 # tokens 10 temas + ALL keyframes (incluye t-ice-citadel/t-tron/t-netflix completos)
  lib/
    projects.ts               # projects[] + themes[] (10 entries)
    settings.ts               # PortfolioSettings type + DEFAULT_SETTINGS
    auth.ts                   # authOptions NextAuth
    i18n.ts                   # 10 theme T objects EN/ES + NETFLIX_T + ICE_CITADEL_T + TRON_T + SHARED.next/nextHint
    lang-context.tsx          # LangProvider + useLang
    settings-context.tsx      # SettingsContext (NO mover — circular dep)
    next-theme-context.tsx    # ★ NUEVO: NextThemeContext + useNextTheme hook
  components/
    ThemeSwitcher.tsx         # ★ collapse-on-hover: dot pulsante → expand "SWITCH WORLD" en hover
    ThemedPortrait.tsx        # portrait dinámico
    AdminKeyListener.tsx      # 'idy' keydown → /admin
    LangToggle.tsx
    ArchitectureDiagram.tsx   # ★ REFACTORED: theme prop + 10 skins distintos
    themes/
      MetropolisTheme.tsx     # DEFAULT
      RefinedTheme.tsx
      CorporateTheme.tsx
      CyberpunkTheme.tsx
      EditorialTheme.tsx
      OrganicTheme.tsx
      HolographicTheme.tsx
      NetflixTheme.tsx        # ★ NUEVO
      IceCitadelTheme.tsx     # ★ NUEVO (incluye MagicCanvas inline)
      TronTheme.tsx           # ★ NUEVO (incluye MatrixRain inline)
  admin/page.tsx              # admin: theme default + lang default + portrait por tema
  api/
    auth/[...nextauth]/       # next-auth (importa authOptions de lib/auth.ts)
    settings/route.ts         # GET force-dynamic + POST getToken JWT
    portrait/[theme]/         # portrait CRUD
```

## Sistema "Next theme button"

- `lib/next-theme-context.tsx` provee `{ nextThemeId, nextLabel, onNext(x, y) }`
- `page.tsx` calcula next theme cíclicamente desde `themes[]` y wraps en `NextThemeContext.Provider`
- Cada theme implementa su propio botón con estética matching:
  - Refined → arrow tipográfica italic
  - Metropolis → panel HUD frosted
  - Corporate → footnote gold-rule "TURN PAGE"
  - Cyberpunk → terminal command + blinking cursor
  - Editorial → brutalist "TURN THE PAGE" + tilt hover
  - Organic → blob orgánico con flor
  - Holographic → glass-card + iridescent + chrome arrow
  - Netflix → "Up Next" pop-up bottom-right con countdown bar
  - IceCitadel → ig-frame-card + compass icon
  - Tron → tn-card + hexagon "JUMP_NODE"

## Sistema "Architecture diagram per-theme"

`ArchitectureDiagram` recibe `theme: ThemeId` prop y renderiza 10 versiones visualmente distintas:

| Tema | Diagrama |
|---|---|
| Metropolis | Frosted glass cards sobre gradiente nocturno |
| IceCitadel | Boxes obsidiana + frost-blue stroke + aurora detrás |
| Tron | Cyan grid + tn-glitch + perimeter laser + matrix rain |
| Netflix | Cards Netflix #181818 + red borders en game layer |
| Cyberpunk | Cyber-grid + neon pink/cyan + scanlines |
| Holographic | Glass cards + iridescent text + floating orbs |
| Refined | Cream bg + boxes blancos + thin gold rule |
| Corporate | Parchment + gold borders + Playfair italic |
| Editorial | Paper texture + thick black borders + red game layer |
| Organic | Cream + boxes con rotación + 8px_8px_0 shadow |

Implementación: `Skin` type con todos los colores/fonts customizables + `SKINS: Record<ThemeId, Skin>` + decoraciones por tema vía `bgDecor` ReactNode.

## ThemeSwitcher (collapse-on-hover)

- Default: círculo 40x40px con dot pulsante en color del tema actual + ring expansion animation
- Hover: expand a 168px wide pill con label "SWITCH WORLD"
- Click: abre chip list (10 temas)
- Mantiene sistema clip-path circular reveal de transiciones

## Auth — pitfalls (sin cambios)

- `authOptions` vive en `lib/auth.ts` — NO importar desde `[...nextauth]/route.ts` (path con brackets falla)
- POST `/api/settings` usa `getToken({ req, secret })` de `next-auth/jwt` — NO `getServerSession`
- `ADMIN_EMAIL` en Vercel: SIN newline. Token Google retorna sin punto; handler normaliza ambos (trim + strip dots)

## Settings DB

Tabla `portfolio_settings.settings (key text PK, value text)`:

| key | default | descripción |
|---|---|---|
| `default_theme` | `metropolis` | tema visitor inicial |
| `default_lang` | `en` | idioma visitor inicial |
| `portrait_<theme>` | `/me.jpg` | path imagen por tema |

GET `force-dynamic`, fetch `cache: 'no-store'` → no caching CDN/browser.

## i18n

Hook `useLang()` en todos los temas. `LangContext` accepta `defaultLang` desde DB. Toggle top-left.

**CRÍTICO — circular dep:** `SettingsContext` vive en `lib/settings-context.tsx` (NO mover a page.tsx).

Traducciones T objects: `SHARED`, `REFINED_T`, `METROPOLIS_T`, `CORPORATE_T`, `CYBERPUNK_T`, `EDITORIAL_T`, `ORGANIC_T`, `HOLOGRAPHIC_T`, `NETFLIX_T`, `ICE_CITADEL_T`, `TRON_T`, `PROJECT_ES`.

## Botones Visit/GitHub

Todos los temas usan pills explícitos (no `<a>` wrapper en card — HTML inválido). Estilos por tema documentados en código.

**MetropolisTheme — ACCENT_ON_WHITE:** map de accents claros (yellow/lime/white) → versiones oscuras para tagline en cards frosted-white.

## Framing de contenido

- Un desarrollador solo en Santiago, Chile
- Técnicamente desplegados, pero prototipos sin uso real — `SHARED.live = "Deployed"` (no "En producción")
- Framing: "prototipos para posible inserción en América Latina"
- `SHARED.product` = "Prototype"

## Stats bars por tema

- Metropolis/Refined/Holographic: total proyectos
- Cyberpunk: PROJECTS + UPTIME (99.9%)
- Corporate/Editorial/Organic/Netflix/IceCitadel/Tron: sin stats bar (incluyen counts en otras secciones)

## Switcher mecánica

1. Click chip → `(themeId, clientX, clientY)` o `onNext(x, y)` desde NextThemeContext
2. `page.tsx` setea `revealing`
3. Nuevo tema en overlay z-40 con `theme-revealing`
4. Keyframe `circle-reveal`: clip-path circle 0% → 150% desde (--reveal-x, --reveal-y)
5. setTimeout 900ms → commit + desmonta overlay

## Deploy

```bash
vercel link --scope agrimmincks-projects --project agrimminck-portofolio
vercel --prod --yes
```

Vercel Deployment Protection: deshabilitado.

**Alias post-deploy:**
```bash
TOKEN=$(python3 -c "import json; print(json.load(open('/home/agrim/.local/share/com.vercel.cli/auth.json'))['token'])")
TEAM="team_x509LqbXHosCqV1elhJ8DVhc"
DEPLOY_UID=$(curl -s "https://api.vercel.com/v6/deployments?teamId=$TEAM&app=agrimminck-portofolio&limit=1" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import json,sys; deps=json.load(sys.stdin).get('deployments',[]); print(deps[0]['uid'] if deps else 'none')")
curl -s -X POST "https://api.vercel.com/v2/deployments/$DEPLOY_UID/aliases?teamId=$TEAM" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"alias":"agrimminck-portofolio.vercel.app"}'
```

## Datos — projects.ts

Sin mencionar MMORPG — referir Idyllic como "large-scale online video game". 7 proyectos:

| Proyecto | URL | GitHub | Status |
|---|---|---|---|
| Idyllic | https://idyllic-web.vercel.app | github.com/agrimminck/idyllic-web | wip |
| Mercado Libre Electrodomésticos | https://topelectrohogar.com | — | prototipo |
| Car Shop App | https://basilisk-car-shop-app.vercel.app | github.com/agrimminck/basilisk-car-shop-app | prototipo |
| Inversionistas | https://basilisk-inversionistas.vercel.app | github.com/agrimminck/basilisk-inversionistas | prototipo |
| Boti Finder | https://basilisk-boti-finder.vercel.app | github.com/agrimminck/basilisk-boti-finder | prototipo |
| Free Pickup | https://basilisk-free-pickup.vercel.app | github.com/agrimminck/basilisk-free-pickup | prototipo |
| GitHub | https://github.com/agrimminck | — | social |

## Efectos especiales port basilisk-hub

Para Ice Citadel y Tron, se portó código directo desde `/home/agrim/github/idyllic/repos/basilisk-hub/themes/{ice-gothic,tron}/`:

**ice-gothic → IceCitadelTheme:**
- MagicCanvas (~426 líneas) inline: 140 stars + 120 snow + mouse trail + click shards (28) + embers + rings + aurora
- ig-frame-card hover lift + inset glow
- ig-aurora-layer breathing background
- ig-bg-noise + ig-bg-cracks SVG patterns
- ig-rune-pulse-slow animations
- CornerOrnament + IcicleRow + GothicArchSilhouette + SigilDivider sub-components

**tron → TronTheme:**
- MatrixRain (~85 líneas) inline: japanese katakana + ASCII rain
- tn-glitch-strong RGB shift on h1
- tn-perimeter laser stroke on cards
- tn-card scanline + load bar
- tn-hbeam horizontal data beams
- PerspectiveGrid SVG (perspective lines bottom)
- LogoFX rotating rings + scanbar (centro → portrait circular con glow cyan; era "AG" SVG text)
- HeaderCircuits animated traces

Selectores reescritos de `[data-theme="ice-gothic"]` → `.t-ice-citadel`, `[data-theme="tron"]` → `.t-tron`.

## Portrait dinámico

`ThemedPortrait` sirve imagen desde Neon DB. Variants: **todos los 10 temas** — refined/metropolis/corporate/cyberpunk/editorial/organic/holographic/netflix/ice-citadel/tron. Fallback `/me.jpg` vía `onError`. Subir por tema desde `/admin`.

Netflix/IceCitadel/Tron no usan `<ThemedPortrait>` (tamaño no cuadrado) — usan `<img src="/api/portrait/<theme>">` directo con `onError → /me.jpg`.

**LogoFX (Tron):** centro del anillo → portrait circular. **IceCitadel hero:** centro del anillo giratorio → portrait circular. **Netflix poster:** portrait fill + helm logo (`/public/idyllic-helm.png` — copiado de `idyllic-web/src/assets/brand/02-color-cinematic.png`).

## Historial de cambios clave

- **visibleThemes filtering:** `themes.filter((t) => isDev || !t.wip)` — netflix/tron/ice-citadel ocultos en prod (`wip: true`), visibles en `npm run dev`
- **Badge JWT · 5 roles:** movido a `y=372` en ArchitectureDiagram.tsx (estaba en `y=318`, tapaba caja GAME LAYER)
- **Branding "Idyllic" en diagramas:** todos los 10 skins tienen eyebrow o title que menciona "Idyllic" explícitamente
- **Copy review (2026-05):** removidos "pharmacy/farmacia/turnos", "tranquilo/quiet index", "pieza/bedroom" de todos los T objects EN+ES
- **MetropolisTheme next button:** movido inline con el stat panel "proyectos lanzados" (flex row, justify-between)
- **IceCitadel scrollbar fix:** `ig-aurora-layer` → `position: fixed; inset: 0` (era `absolute; inset: -10%`). La extensión -10% con `overflow-x-hidden` (fuerza `overflow-y: auto` por CSS spec) creaba scrollbar extra en el wrapper. Con `fixed` es viewport-relative como MagicCanvas. Wrapper sin overflow class.
- **Foto en 10 temas:** ThemedPortrait extendido con variants netflix/ice-citadel/tron. Portraits usan `/api/portrait/<theme>` con fallback `/me.jpg`.
- **IceCitadel:** statusbadge "Vigente/Dormido/En Forja" removidos de project cards. Centro del anillo hero ahora muestra portrait circular.
- **Tron:** todos los statuses → "ONLINE" cyan. Centro LogoFX → portrait circular.
- **Netflix:** portrait + casco alado en movie poster hero. Logo en `/public/idyllic-helm.png` (copiado de idyllic-web).

## Pendientes / mejoras futuras

- [ ] Subir fotos por tema desde /admin (actualmente todos fallback a /me.jpg)
- [ ] Test A/B framing actual ("solo dev prototypes") vs versión más confiada
- [ ] Mobile responsive review en los 10 temas (especialmente IceCitadel + Tron con muchos efectos)
- [ ] Lighthouse audit — Canvas pesado puede afectar performance score
