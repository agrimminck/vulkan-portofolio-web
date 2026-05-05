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
| `ADMIN_EMAIL` | `agrimminck.94@gmail.com` |

Google OAuth redirect URI: `{NEXTAUTH_URL}/api/auth/callback/google`

## Estructura archivos

```
app/
  layout.tsx                  # root: Providers + AdminKeyListener + LangToggle
  page.tsx                    # theme state + settings fetch + LangProvider + SettingsContext
  globals.css                 # tokens 7 temas + fonts + keyframes
  lib/
    projects.ts               # projects[] + themes[] (source of truth)
    settings.ts               # PortfolioSettings type + DEFAULT_SETTINGS + fetchSettings()
    i18n.ts                   # traducciones EN/ES por tema + PROJECT_ES + SHARED
    lang-context.tsx          # LangProvider (acepta defaultLang) + useLang() hook
  components/
    ThemeSwitcher.tsx         # dial top-right, chips → emite (id, x, y)
    ThemedPortrait.tsx        # portrait dinámico: lee portrait_{variant} de SettingsContext
    AdminKeyListener.tsx      # escucha 'idy' en keydown → window.location '/admin'
    LangToggle.tsx            # botón fixed top-left: muestra idioma opuesto, toggle al click
    Providers.tsx             # SessionProvider de next-auth
    themes/
      MetropolisTheme.tsx     # DEFAULT: ciudad futurista + espacio
      RefinedTheme.tsx
      CorporateTheme.tsx
      CyberpunkTheme.tsx
      EditorialTheme.tsx
      OrganicTheme.tsx
      HolographicTheme.tsx
  admin/
    page.tsx                  # panel admin: theme default + lang default + portrait por tema
  api/
    auth/[...nextauth]/       # next-auth Google handler
    settings/route.ts         # GET (público) + POST (solo ADMIN_EMAIL)
```

## Acceso admin (secreto)

Tipear `idy` en cualquier página (sin foco en input) → navega a `/admin`. El admin requiere login Google con `agrimminck.94@gmail.com`. Nadie más puede entrar.

## Settings en DB

Tabla `portfolio_settings.settings (key text PK, value text)`:

| key | default | descripción |
|---|---|---|
| `default_theme` | `metropolis` | tema que ven los visitantes al entrar |
| `default_lang` | `en` | idioma por defecto para visitantes |
| `portrait_<theme>` | `/me.jpg` | path imagen en `/public` por tema |

Cambios en admin → POST `/api/settings` → DB → visitantes ven el nuevo valor en ~60s (revalidate).

## i18n

`useLang()` hook disponible en todos los temas. `LangProvider` en `page.tsx` acepta `defaultLang` desde DB. Toggle top-left muestra idioma actual (EN/ES), click cambia.

**CRÍTICO — circular dep:** `SettingsContext` vive en `app/lib/settings-context.tsx` (NO en `page.tsx`). `ThemedPortrait` importa de ahí. `page.tsx` re-exporta para compatibilidad. Si se mueve de vuelta a `page.tsx`, el toggle de idioma rompe (circular dep corrompe el contexto).

Traducciones: `SHARED`, `REFINED_T`, `METROPOLIS_T`, `CORPORATE_T`, `CYBERPUNK_T`, `EDITORIAL_T`, `ORGANIC_T`, `HOLOGRAPHIC_T`, `PROJECT_ES`.

## Portrait dinámico

`ThemedPortrait` sirve imagen desde Neon DB (`/api/portrait/{theme}?v={version}`). Fallback: path estático de `SettingsContext`. Cache busting via columna `version` (timestamp) — cambia en cada upload.

Crop data almacenada como JSON en columna `position`: `{"x":50,"y":50,"zoom":1.2}`. `ThemedPortrait` aplica `objectPosition: x% y%` + `transform: scale(zoom)` + `transformOrigin: x% y%`.

Admin: "Choose photo" → abre CropEditor (drag reposicionar + zoom slider estilo LinkedIn) → "Save crop" → upload a Neon + actualiza version.

Prompts Gemini: usar foto real como input, pedir cambios de ropa/iluminación/fondo manteniendo persona idéntica.

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
Alias `agrimminck-portofolio.vercel.app` se asigna automáticamente en cada prod deploy.

## Datos — projects.ts

Sin mencionar MMORPG — referir a Idyllic como "large-scale online video game" / "videojuego online a gran escala". 7 proyectos activos (Trading removido):

| Proyecto | URL | Status |
|---|---|---|
| Idyllic | https://idyllic-web.vercel.app | wip |
| Mercado Libre Electrodomésticos | https://topelectrohogar.com | live |
| Car Shop App | https://basilisk-car-shop-app.vercel.app | live |
| Inversionistas | https://basilisk-inversionistas.vercel.app | standby |
| Boti Finder | https://basilisk-boti-finder.vercel.app | standby |
| Free Pickup | (sin URL pública aún) | live |
| GitHub | https://github.com/agrimminck | social |
