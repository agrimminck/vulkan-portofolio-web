# vulkan-portofolio-web

Personal portfolio landing page. One page, five dramatically different aesthetics, switchable live with a circular clip-path reveal.

**Live:** _(pending Vercel deploy)_

## Themes

| ID | Name | Direction |
|---|---|---|
| `metropolis` ★ default | Future City + Orbit | Layered scene: deep-space backdrop w/ satellites + shooting stars, aviation traffic, procedurally-generated skyline w/ lit windows, cars driving the foreground street. Orbitron + Rajdhani. |
| `corporate` | Boardroom | Navy + gold serif. Planes flying across the sky, contrails, gold rules, letterhead-style typography. |
| `cyberpunk` | Terminal/Neon | Dark slate, neon pink/cyan grid, scanlines, CRT flicker, glitching display type, ASCII terminal hero. |
| `editorial` | Print Brutalism | Cream paper grain, editorial serif (Fraunces), asymmetric column grid, drop caps, magazine masthead. |
| `organic` | Risograph | Warm earth palette, hand-drawn blobs, sticker-style cards w/ tape, cursive accent typography (Caveat). |
| `holographic` | Y2K Aurora | Iridescent mesh-gradient backdrop, glassmorphic cards, animated chrome blobs, monospace body. |

Switcher (top-right) cycles all five. The transition uses a circular clip-path expansion from the click point, animating the new theme over the old one.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 (PostCSS-based)
- framer-motion (reserved for future hover orchestration; current FX are CSS-only)
- Google Fonts: Playfair Display, Cormorant Garamond, JetBrains Mono, VT323, Fraunces, Instrument Serif, Bricolage Grotesque, Caveat, DM Serif Display, Space Mono

## Project list

Hard-coded in `app/lib/projects.ts`. Categories: `idyllic`, `basilisk`, `social`. **Basilisk apps render without their `basilisk-` prefix** — per portfolio brief, the brand stays Idyllic-facing.

Add/remove projects → edit one file, all five themes update.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Vercel)

```bash
vercel link
vercel deploy --prod
```

No env vars required. Pure static-friendly Next.js page.

## Structure

```
app/
  globals.css           — theme tokens, fonts, all keyframes
  layout.tsx            — root html shell
  page.tsx              — theme state + clip-path orchestrator
  lib/projects.ts       — single source of truth
  components/
    ThemeSwitcher.tsx   — floating dial top-right
    themes/
      CorporateTheme.tsx
      CyberpunkTheme.tsx
      EditorialTheme.tsx
      OrganicTheme.tsx
      HolographicTheme.tsx
```

## Adding a sixth theme

1. Add CSS scope `.t-yourname { … }` in `globals.css`
2. Create `app/components/themes/YourTheme.tsx`
3. Register in `themes` array (`app/lib/projects.ts`) and `THEMES_MAP` (`app/page.tsx`)

That's it.
