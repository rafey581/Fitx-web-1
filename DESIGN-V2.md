# FITX website redesign (v2): "Chalk & Fire"

The client kept the 3D but did not like the previous dark, sci-fi "film" design
(full-screen loader, scroll-jacked chapters, HUD/monospace chrome, neon tunnel).
v2 replaces it with a bright, photo-led athletic look while keeping all content
CMS-driven.

## What changed

| Area | Before | After |
| --- | --- | --- |
| Home | Scroll-driven 3D "film": loader, fixed chapters that fade in and out | Normal scrolling page: 3D hero, then readable sections (programs, coaching approach, progress tracking, coaches, studio photos, fees, timings, visit) |
| 3D | Neon tunnel, rings, particles, post-processing | Studio-lit hex dumbbell, kettlebell and bumper plate floating over the page; follows the pointer and turns as you scroll (`src/components/v2/hero-scene.tsx`) |
| Colour | Near-black everywhere | Chalk white pages (`#f3f1ec`), ink-black bands (`#111014`), brand orange `#FF4B00` |
| Type | Montserrat + JetBrains Mono HUD labels | Barlow Condensed display headlines + Inter body |
| Navigation | "Menu" button opening a full-screen index | Floating pill header with inline links and dropdowns, a full-screen menu on phones, hides while scrolling down |
| Inner pages | Text over a dark animated 3D backdrop | Rounded dark page hero + light content + dark footer with outlined FITX wordmark |

## Where things live

- `src/components/v2/site-header.tsx`: header and mobile menu
- `src/components/v2/scroll-fx.tsx`: smooth scroll and scroll-in reveals
- `src/components/v2/home-view.tsx`: home page sections
- `src/components/v2/hero-scene.tsx` / `hero-canvas.tsx`: the 3D hero (no model downloads; falls back to plain type without WebGL)
- `src/lib/site/nav.ts`: header links (CMS menu + Transformations/Blog)
- `src/app/globals.css`: the "FITX site design (v2)" block, scoped to `.site`, inside `@layer components` so Tailwind utilities still win

Legacy class names (`film-btn`, `film-display`, `film-mono`, `film-link`, `film-glass`)
are kept for compatibility but restyled to the new look.
