# vulkan-portofolio-web — Overview

Portfolio personal. **Producción:** `agrimminck-portofolio.vercel.app`. Next.js App Router + Tailwind. 7 temas (default = `metropolis`), switcher con clip-path circular reveal. Admin secreto + i18n EN/ES + portrait dinámico por tema.

## Stack

| Capa | Tech |
|---|---|
| Framework | Next.js App Router + React |
| Lenguaje | TypeScript |
| Styles | Tailwind CSS v4 |
| Auth | next-auth v4 + Google OAuth |
| DB | Neon Postgres (`portfolio_settings` schema) |
| Deploy | Vercel (`agrimminck-portofolio`) |

## Env vars requeridas

| Var | Valor/Fuente |
|---|---|
| `DATABASE_URL` | Neon `basilisk-prod`, schema `portfolio_settings` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console (OAuth separado del de idyllic-web) |
| `GOOGLE_CLIENT_SECRET` | ídem |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` local / `https://agrimminck-portofolio.vercel.app` prod |
| `ADMIN_EMAIL` | `agrimminck.94@gmail.com` (sin newline — copiarlo con cuidado) |

Google OAuth redirect URI: `{NEXTAUTH_URL}/api/auth/callback/google`

## Estructura archivos

```
app/
  layout.tsx                  # root: Providers + AdminKeyListener + LangToggle
  page.tsx                    # theme state + settings fetch (no-store) + LangProvider + SettingsContext
  globals.css                 # tokens 7 temas + fonts + keyframes
  lib/
    projects.ts               # projects[] + themes[] (source of truth)
    settings.ts               # PortfolioSettings type + DEFAULT_SETTINGS + fetchSettings()
    auth.ts                   # authOptions NextAuth exportado (importar desde aquí, NO desde [...nextauth]/route)
    i18n.ts                   # traducciones EN/ES por tema + PROJECT_ES + SHARED
    lang-context.tsx          # LangProvider (acepta defaultLang) + useLang() hook
    settings-context.tsx      # SettingsContext (NO mover a page.tsx — rompe circular dep)
  components/
    ThemeSwitcher.tsx         # dial top-right, chips → emite (id, x, y)
    ThemedPortrait.tsx        # portrait dinámico: lee portrait_{variant} de SettingsContext
    AdminKeyListener.tsx      # escucha 'idy' en keydown → window.location '/admin'
    LangToggle.tsx            # botón fixed top-left: muestra idioma opuesto, toggle al click
    Providers.tsx             # SessionProvider de next-auth
    themes/
      MetropolisTheme.tsx     # DEFAULT: ciudad futurista + espacio. ACCENT_ON_WHITE map para taglines en cards blancas
      RefinedTheme.tsx
      CorporateTheme.tsx
      CyberpunkTheme.tsx
      EditorialTheme.tsx
      OrganicTheme.tsx
      HolographicTheme.tsx
  admin/
    page.tsx                  # panel admin: theme default + lang default + portrait por tema
  api/
    auth/[...nextauth]/       # next-auth Google handler (importa authOptions de lib/auth.ts)
    settings/route.ts         # GET (público, force-dynamic) + POST (getToken jwt, normaliza email)
    portrait/[theme]/         # GET imagen desde Neon DB
    portrait/[theme]/meta/    # GET position JSON
    portrait/position/        # POST update position only
    portrait/upload/          # POST upload + crop
```

## Acceso admin (secreto)

Tipear `idy` en cualquier página (sin foco en input) → navega a `/admin`. El admin requiere login Google con `agrimminck.94@gmail.com`. Nadie más puede entrar.

## Auth — pitfalls conocidos

- `authOptions` vive en `app/lib/auth.ts` — exportarlo desde `[...nextauth]/route.ts` causaba import failure en runtime (path con brackets)
- POST `/api/settings` usa `getToken({ req, secret })` de `next-auth/jwt` — NO `getServerSession` (falla en App Router route handlers)
- `ADMIN_EMAIL` en Vercel env vars: NO pegar con newline al final. El token de Google retorna email sin punto (`agrimminck94@gmail.com`); el handler normaliza ambos (trim + strip dots en parte local) antes de comparar

## Settings en DB

Tabla `portfolio_settings.settings (key text PK, value text)`:

| key | default | descripción |
|---|---|---|
| `default_theme` | `metropolis` | tema que ven los visitantes al entrar |
| `default_lang` | `en` | idioma por defecto para visitantes |
| `portrait_<theme>` | `/me.jpg` | path imagen en `/public` por tema |

Cambios en admin → POST `/api/settings` → DB → visitantes ven el nuevo valor inmediatamente (GET es `force-dynamic`, fetch en page.tsx usa `cache: 'no-store'`).

## i18n

`useLang()` hook disponible en todos los temas. `LangProvider` en `page.tsx` acepta `defaultLang` desde DB. Toggle top-left muestra idioma actual (EN/ES), click cambia.

**CRÍTICO — circular dep:** `SettingsContext` vive en `app/lib/settings-context.tsx` (NO en `page.tsx`). Si se mueve de vuelta a `page.tsx`, el toggle de idioma rompe.

Traducciones: `SHARED`, `REFINED_T`, `METROPOLIS_T`, `CORPORATE_T`, `CYBERPUNK_T`, `EDITORIAL_T`, `ORGANIC_T`, `HOLOGRAPHIC_T`, `PROJECT_ES`.

## Botones Visit/GitHub en tarjetas

Todos los temas tienen botones pill explícitos (no `<a>` wrapper en card — HTML no permite `<a>` anidado). Cada tema tiene su propio estilo matching:
- Metropolis: navy `#0b1320` fill + outlined
- Refined: `var(--ink)` fill + outlined
- Corporate: `var(--ink)` fill + outlined
- Cyberpunk: cyan fill + pink outlined
- Editorial: ink fill + outlined (inner `<a>` sigue existiendo para click en título)
- Organic: ink fill + outlined pill grande
- Holographic: glassy backdrop-blur + outlined

**MetropolisTheme — ACCENT_ON_WHITE:** las tarjetas frosted glass son casi blancas → colores accent claros (amarillo, lima, blanco) invisibles. `taglineColor(accent)` mapea a versiones oscurecidas para el tagline.

## Framing de contenido (decisión 2026-05-05)

- **No es un estudio** — un desarrollador solo, una pieza en Santiago
- **Nada en producción** — todos los proyectos son prototipos
- **Framing** → "prototipos para posible inserción en América Latina"
- `SHARED.product` = "Prototype" / "Prototipo"
- Textos hero de todos los temas actualizados en EN+ES para reflejar esto

## Stats bars por tema

- **Metropolis**: panel inline con total de proyectos únicamente
- **Refined**: inline total de proyectos
- **Holographic**: glass card con total de proyectos
- **Cyberpunk**: 2 stats — PROJECTS + UPTIME (99.9%)
- **Corporate, Editorial, Organic**: sin stats bar separada

## Switcher — mecánica

1. Click chip → `(themeId, clientX, clientY)`
2. `page.tsx` setea `revealing`
3. Nuevo tema en overlay `z-40` con clase `theme-revealing`
4. Keyframe `circle-reveal`: `clip-path: circle(0% → 150%)` desde `(--reveal-x, --reveal-y)`
5. `setTimeout(900ms)` → commit + desmonta overlay

## Deploy

```bash
vercel link --scope agrimmincks-projects --project agrimminck-portofolio
vercel --prod --yes
```

Vercel Deployment Protection: **deshabilitado** (visitors públicos, sin login requerido).

**Alias post-deploy** (asignar manualmente — Vercel CLI no lo hace solo en este proyecto):
```bash
TOKEN=$(python3 -c "import json; print(json.load(open('/home/agrim/.local/share/com.vercel.cli/auth.json'))['token'])")
TEAM="team_x509LqbXHosCqV1elhJ8DVhc"
DEPLOY_UID=$(curl -s "https://api.vercel.com/v6/deployments?teamId=$TEAM&app=agrimminck-portofolio&limit=1" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import json,sys; deps=json.load(sys.stdin).get('deployments',[]); print(deps[0]['uid'] if deps else 'none')")
curl -s -X POST "https://api.vercel.com/v2/deployments/$DEPLOY_UID/aliases?teamId=$TEAM" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"alias":"agrimminck-portofolio.vercel.app"}' | python3 -c "import json,sys; d=json.load(sys.stdin); print('✓' if d.get('alias') else d)"
```

## Datos — projects.ts

Sin mencionar MMORPG — referir a Idyllic como "large-scale online video game" / "videojuego online a gran escala". 7 proyectos activos:

| Proyecto | URL | GitHub | Status |
|---|---|---|---|
| Idyllic | https://idyllic-web.vercel.app | https://github.com/agrimminck/idyllic-web | wip |
| Mercado Libre Electrodomésticos | https://topelectrohogar.com | — | prototipo |
| Car Shop App | https://basilisk-car-shop-app.vercel.app | https://github.com/agrimminck/basilisk-car-shop-app | prototipo |
| Inversionistas | https://basilisk-inversionistas.vercel.app | https://github.com/agrimminck/basilisk-inversionistas | prototipo |
| Boti Finder | https://basilisk-boti-finder.vercel.app | https://github.com/agrimminck/basilisk-boti-finder | prototipo |
| Free Pickup | https://basilisk-free-pickup.vercel.app | https://github.com/agrimminck/basilisk-free-pickup | prototipo |
| GitHub | https://github.com/agrimminck | — | social |

## Portrait dinámico

`ThemedPortrait` sirve imagen desde Neon DB (`/api/portrait/{theme}?v={version}`). Fallback: path estático de `SettingsContext`. Cache busting via columna `version` (timestamp).

Crop data: JSON `{"x":50,"y":50,"zoom":1.2}` en columna `position`. `ThemedPortrait` aplica `objectPosition: x% y%` + `transform: scale(zoom)` + `transformOrigin: x% y%`.

Admin: "Choose photo" → CropEditor → "Save crop" → upload a Neon + actualiza version.
