# tunyx.ai website

Marketing site and documentation for [Tunyx](https://github.com/Tunyx-ai/tunyx), built with
[Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

## Layout

| Path | What |
|---|---|
| `src/pages/index.astro` | Landing page, composed from `src/components/landing/*` |
| `src/layouts/Marketing.astro` | Landing layout: nav, footer, meta tags, shared scripts |
| `src/content/docs/docs/` | Documentation pages (Markdown / MDX), served under `/docs/` |
| `astro.config.mjs` | Site URL, base path, docs sidebar |
| `src/styles/tokens.css` | Brand tokens: colors, type, radii, motion |
| `src/styles/global.css` | Landing styles; `src/styles/starlight.css` themes the docs |
| `src/site.config.ts` | Install command, contact email, links: edit these at launch |
| `scripts/og.html` | Link-preview image source; re-render with `scripts/render-og.sh` |

## Brand

- Surfaces: blue-black ink (`#080b10` → `#1f2733`). Text `#eef1f6` / `#a9b2c1` / `#6f7a8c`.
- Action color: signal mint `#3ee8b5` (dark text `#03140e` on it). Mint → sky (`#38bdf8`) gradient is reserved
  for the logo and hero accents.
- Docs light mode uses deep mint `#087a5a` for accessible contrast on white.
- Chart series were validated for color-vision deficiency: tuned `#17a37a`, baseline `#7a8fd1` (dashed).
- Type: Geist and Geist Mono (self-hosted via Fontsource).

## Deploying

`.github/workflows/deploy.yml` builds on every push and deploys `main` to GitHub Pages.

- GitHub Pages on the free plan only serves **public** repositories. The deploy step is skipped while the repo
  is private. Make it public (or upgrade the org) and enable Pages with source "GitHub Actions".
- This repository is named `Tunyx-ai.github.io`, so the site is served at `https://tunyx-ai.github.io/`.
- Custom domain: add `public/CNAME` containing `tunyx.ai`, point the domain's DNS at GitHub Pages, and build
  with `TUNYX_SITE_URL=https://tunyx.ai`.
- For a project-page URL (`https://tunyx-ai.github.io/website/`), build with `TUNYX_BASE_PATH=/website/`.
