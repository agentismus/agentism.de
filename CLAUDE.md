# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for **Agentism**, a Berlin AI consultancy. All user-facing copy is German and uses the formal "Sie". The project started in Lovable and was moved off it in November 2026; nothing in the repository depends on Lovable any more.

**Read [docs/design-language.md](docs/design-language.md) before changing copy, colour, type or layout.** It records what every element of the design means, where the historical references come from, which of them have been verified, and the rules for using them.

Stack: TanStack Start (React 19) on Vite 8, prerendered to static HTML; Tailwind CSS v4; Supabase; fonts bundled from Fontsource.

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

Build-time variables:

- `BASE_PATH`: path the site is served from, with slashes on both ends (`/agentism-build/`). Defaults to `/`. The GitHub Pages workflow sets it.
- `VITE_SITE_URL`: absolute address of the site. When set, pages get an `og:image`.
- `VITE_ENABLE_CHAT=true`: includes the chat section. It needs a server, so leave it unset for the static build.
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`: read from `.env`.

Do not pass `--outDir` pointing outside the repository: prerendering then fails to find the server build.

## Architecture

**Static output.** `vite.config.ts` lists the pages to prerender. `npm run build` writes them to `dist/client`, which any static host can serve. The route `/404` is written to `404.html`, the file static hosts serve for unknown addresses. `.github/workflows/pages.yml` builds and deploys to GitHub Pages on every push to `main`. `src/routeTree.gen.ts` is generated from `src/routes/`; do not edit it.

**Page form.** The page is main text with notes in the margin. `src/components/agentism/Text.tsx` holds the building blocks:

- `Section`: star rule, lemma line in dictionary form, title, optional lead and notes.
- `Row`: a block of main text with its margin notes. On small screens the notes follow the block.
- `Gloss`: one margin note, opened by its keyword.
- `Ar`, `Gr`, `Tr`: Arabic, Greek and transliterated terms.

Each section is one component in `src/components/agentism/` and carries its own copy. `src/routes/index.tsx` sets their order. `Projects` and `LinkedinFeed` render nothing until rows are published in their tables, so the page never shows placeholders.

**The vault (Abb. 1).** `muqarnas/geometry.ts` generates the vault from a ground plan and is pure. `muqarnas/render.ts` draws it on a canvas with a painter's algorithm and hides faces turned away from the viewer. `Muqarnas.tsx` pins the figure inside a taller track and maps the scroll position within the track to how far the plan has risen. The ground plan is also rendered on the server as SVG and replaced by the canvas after hydration.

**Styling.** `src/styles.css` defines the tokens and the component classes; there is no `tailwind.config`. Tailwind utilities are used for spacing and layout only.

- Night is the default scheme. The day values appear twice (system preference and toggle) and must stay in sync.
- The toggle in `Nav.tsx` sets `data-theme` on `<html>`, stores the choice in `localStorage` and fires `agentism:theme`, which the vault listens for. A boot script in `src/routes/__root.tsx` applies the stored choice before the first paint and adds the `js` class that the vault's scroll track depends on.
- The typeface has no small-caps feature, no `⟨ ⟩` and no arrows. Labels are spaced capitals, etymology brackets are `‹ ›`.

**Data access** takes two paths:

1. **Browser to Supabase**, through the publishable-key client `@/integrations/supabase/client`. `Contact.tsx` inserts into `contact_requests`. `LinkedinFeed.tsx` and `Projects.tsx` select published rows.
2. **Server functions** in `src/lib/*.functions.ts`, which may use `supabaseAdmin` from `client.server.ts`. That client uses the service role and **bypasses row-level security**, so import it only from server functions. The only one is the chat (`chat.functions.ts`), which proxies to Mistral and logs to `chat_logs`. It is not part of the static build (`src/lib/features.ts`).

**Schema and row-level security** are defined in `supabase/migrations/`. Anonymous visitors may insert into `chat_logs` and `contact_requests` and may read `projects` and `linkedin_posts` rows where `published = true`. Nothing else is readable without the service role, and there is no admin UI. A new table needs a migration with policies, and `src/integrations/supabase/types.ts` has to be regenerated.

The database is still the Supabase project that Lovable Cloud created (its id is in `supabase/config.toml`). Moving it to an own Supabase project is an open task.
