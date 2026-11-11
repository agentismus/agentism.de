<<<<<<< HEAD
# Agentism

The website of Agentism, a Berlin AI consultancy. It is a static site: every page is rendered to HTML at build time.

## Run it

You need Node.js 22 or newer.

```bash
npm install
npm run dev      # development server
npm run build    # static site in dist/client
npm run preview  # serve the build locally
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/pages.yml` builds and deploys on every push to `main`. To switch it on:

1. Push the repository to GitHub. On the free plan it has to be public.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Optional: set a custom domain on the same page. The build picks up the right base path by itself.
4. Optional: add a repository variable `SITE_URL` (for example `https://agentism.de`) under **Settings → Secrets and variables → Actions → Variables**. Link previews then get an image.

The build reads the Supabase address and publishable key from `.env`.

## What does not run on a static host

The chat assistant needs a server, because its API key must stay secret. It is left out of the static build and comes back with `VITE_ENABLE_CHAT=true` on a host that runs the server build.

## Design

`docs/design-language.md` explains the design: the dictionary entry, the margin notes, the vault, the colours and typefaces, and the sources behind every historical reference.
=======
# agentism.de
>>>>>>> a749d9fc88c19531e7a7170756028c0a602029e7
