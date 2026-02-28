# E-Compvenience (ECV) — Project Context for New Chat

## Project Overview

**"Dark Mode Spatial Tech"** landing page for E-Compvenience. Single-page site with scrollspy navigation, hero, and placeholder sections. Built with **Astro 5**, **pure vanilla CSS** (no Tailwind), and **Three.js** available for 3D assets.

---

## Tech Stack

- **Framework:** Astro 5.x
- **Styling:** Pure CSS (no Tailwind), CSS variables
- **3D:** Three.js (`^0.183.1`) — installed but not yet wired
- **Fonts:** Lato (body), Space Grotesk (headings) via Google Fonts

---

## Project Structure

```
ecv/
├── public/
│   ├── favicon.svg
│   ├── ecv.svg
│   ├── Social_square.glb      # 3D asset
│   └── XOTH_01.fbx            # 3D asset
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   └── Navbar.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── Context.md (this file)
```

---

## Page Structure & Section IDs

The page is a single scroll with these sections (Navbar scrollspy targets these IDs):

| Section           | ID                 |
|-------------------|--------------------|
| Hero              | (no ID)            |
| Services          | `#services`        |
| About ECV         | `#about`           |
| Digital Twins     | `#digital-twins`   |
| Interactive Model | `#interactive-model`|
| Use Cases         | `#use-cases`       |
| Contact           | `#contact`         |

All sections except Hero are currently **placeholders** (`min-height: 100vh`, centered `<h2>`). Ready for content.

---

## Design System (global.css)

### Colors
```css
--c-bg: rgb(27, 27, 27);        /* Page background */
--c-surface: rgb(40, 40, 40);   /* Cards, buttons */
--c-border: rgb(60, 60, 60);
--c-text: #ffffff;
--c-text-muted: rgb(160, 160, 160);
--bg-void: #000000;             /* Pure black (overlays) */
--accent-primary: #FFD700;      /* Cyber Yellow */
```

### Typography
- **Body:** `--font-sans` (Lato)
- **Headings:** `--font-heading` (Space Grotesk)
- Sizes: `--text-xs` through `--text-4xl`

### Spacing (4px base)
- `--s-1` (0.25rem) through `--s-16` (4rem)

### Radius
- `--r-sm`, `--r-md`, `--r-lg`

---

## Component Details

### Base.astro
- Imports `global.css` and `Navbar.astro`
- Props: `title`, `description`
- Renders: `<Navbar />` + `<main><slot /></main>`
- Fonts: Lato, Space Grotesk

### Navbar.astro
- **Desktop (≥769px):** Fixed top-left nav, vertical links, scrollspy active state (white + yellow left border)
- **Mobile (≤768px):** Hamburger top-right → full-screen black overlay, centered links
- **Inactive links:** `#666666` (muted), hover `#888888`
- **Active link:** `#FFFFFF` + `--accent-primary` left border (desktop) or yellow dot (mobile)
- IntersectionObserver for scrollspy
- No Tailwind — pure CSS

### Hero.astro
- Full-viewport hero
- **Desktop:** Visual fills hero, content bottom-right (eyebrow, title, 2 CTAs)
- **Mobile:** Stacked, centered
- Placeholder: `[3D / visual placeholder]` in `hero__visual` — ready for 3D scene
- CTAs: "Explore Solutions" (#work), "Get in Touch" (#contact)

---

## Next Steps / Suggestions for New Chat

1. **Services section** — First real content section; define layout, copy, and visuals
2. **About ECV** — Company story, team, or mission
3. **Digital Twins** — Likely 3D/immersive content; Three.js + `.glb` / `.fbx` assets
4. **Interactive Model** — 3D model viewer (Social_square.glb, XOTH_01.fbx)
5. **Use Cases** — Case studies or feature highlights
6. **Contact** — Form or contact details
7. **Hero 3D** — Replace placeholder with Three.js scene

### Conventions to Follow
- Use **pure CSS**, no Tailwind
- Use design tokens from `global.css` (--c-*, --s-*, --text-*, etc.)
- Section IDs must match Navbar targets above
- Keep BEM-style classes where appropriate (e.g. `section__title`)

---

## Commands

```bash
npm run dev      # Dev server (e.g. localhost:4321 or 4322)
npm run build    # Production build
npm run preview  # Preview build
```

---

*Last updated: Feb 28, 2025*
