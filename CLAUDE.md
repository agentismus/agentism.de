# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Agentism**, a Berlin AI consultancy. All user-facing copy is German and uses the formal "Sie". The project started in Lovable and was moved off it in November 2026; nothing in the repository depends on Lovable any more.

**Read [docs/design-language.md](docs/design-language.md) before changing copy, colour, type or layout.** It records what every element of the design means, where the historical references come from, which of them have been verified, and the rules for using them.

Stack: TanStack Start (React 19) on Vite 8, prerendered to static HTML; Tailwind CSS v4; fonts bundled from Fontsource. There is no server, no database and no API: the deployed site is static files only.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # static site in dist/client (every page prerendered)
npm run preview    # serve the build
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint; Prettier runs as an ESLint rule, so formatting issues fail lint
npm run format     # prettier --write .
```

There is no test framework and there are no tests.

Build-time variables, both optional:

- `BASE_PATH`: path the site is served from, with slashes on both ends (`/agentism.de/`). Defaults to `/`.
- `VITE_SITE_URL`: the site's origin without a path (`https://agentism.de`). When set, pages get canonical links, `og:url`, a share image, and a `sitemap.xml` is written.

The GitHub Pages workflow sets both. Do not pass `--outDir` pointing outside the repository: prerendering then fails to find the server build.

## Architecture

**Static output.** `vite.config.ts` lists the pages to prerender. `npm run build` writes them to `dist/client`, which any static host can serve. The route `/404` is written to `404.html`, the file static hosts serve for unknown addresses. `.github/workflows/pages.yml` builds and deploys to GitHub Pages on every push to `main`; it only works while the repository's Pages source is set to "GitHub Actions". `src/routeTree.gen.ts` is generated from `src/routes/`; do not edit it.

**Page form.** The page is main text with notes in the margin. `src/components/agentism/Text.tsx` holds the building blocks:

- `Section`: star rule, lemma line in dictionary form, title, optional lead and notes.
- `Row`: a block of main text with its margin notes. On small screens the notes follow the block.
- `Gloss`: one margin note, opened by its keyword.
- `Ar`, `Gr`, `Tr`: Arabic, Greek and transliterated terms.

Each section is one component in `src/components/agentism/` and carries its own copy. `src/routes/index.tsx` sets their order. Every page wraps its content in `<main id="inhalt">`, the target of the skip link in `src/routes/__root.tsx`.

**Content and site facts.**

- `src/content/projects.ts` is the list of references. The section "Arbeiten" stays hidden while the list is empty.
- `src/lib/site.ts` holds the e-mail address, the repository address and the helpers that build absolute links from `VITE_SITE_URL`.

**Contact.** `Contact.tsx` does not send anything. Its form builds a `mailto:` link and opens the visitor's mail program. The privacy page (`src/routes/datenschutz.tsx`) describes exactly this, and names GitHub Pages as the host; keep it in step with what the site really does.

**Figures.**

- Abb. 1, the vault: `muqarnas/geometry.ts` generates it from a ground plan and is pure. `muqarnas/render.ts` draws it on a canvas with a painter's algorithm and hides faces turned away from the viewer. `Muqarnas.tsx` pins the figure inside a taller track and maps the scroll position within the track to how far the plan has risen. The ground plan is also rendered on the server as SVG and replaced by the canvas after hydration.
- Abb. 2, the path of a term: `Weg.tsx`, plain markup and CSS.

**Styling.** `src/styles.css` defines the tokens and the component classes; there is no `tailwind.config`. Tailwind utilities are used for spacing and layout only.

- Night is the default scheme. The day values appear twice (system preference and toggle) and must stay in sync.
- The toggle in `Nav.tsx` sets `data-theme` on `<html>`, stores the choice in `localStorage` and fires `agentism:theme`, which the vault listens for. A boot script in `src/routes/__root.tsx` applies the stored choice before the first paint and adds the `js` class that the vault's scroll track depends on.
- `Nav.tsx` also marks the link of the section currently in the middle of the screen (`data-current`).
- The typeface has no small-caps feature, no `⟨ ⟩` and no arrows. Labels are spaced capitals, etymology brackets are `‹ ›`.

## Checking changes visually

Screenshots taken at page load can show the server-rendered ground plan instead of the canvas, and they ignore scrolling. To see a scrolled or settled state, load the page in a frame and wait before capturing.
