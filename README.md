# agentism.de

The website of Agentism, a Berlin AI consultancy. It is a static site: every page is rendered to HTML at build time, and there is no server or database behind it.

## Run it

You need Node.js 22 or newer.

```bash
npm install
npm run dev      # development server
npm run build    # static site in dist/client
npm run preview  # serve the build locally
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/pages.yml` builds and deploys on every push to `main`.

1. In the repository on GitHub, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. With "Deploy from a branch", GitHub shows this README instead of the site.
2. Push to `main`, or start the workflow by hand under **Actions → Deploy to GitHub Pages → Run workflow**.

### The address

- Without further setup the site is at `https://agentismus.github.io/agentism.de/`.
- To serve it from `agentism.de`, enter the domain under **Settings → Pages → Custom domain** and point the domain's DNS at GitHub Pages. The build adapts by itself. Also add a repository variable `SITE_URL` with the value `https://agentism.de` (**Settings → Secrets and variables → Actions → Variables**), so that link previews and the sitemap use the new address.
- Renaming the repository only changes the part after the slash. The only name that serves from the root of `agentismus.github.io` is `agentismus.github.io` itself.

## Contact form

The form does not send anything. It opens the visitor's mail program with a prepared draft to `hallo@agentism.de`. The address is set in `src/lib/site.ts`.

## References

Add entries to `src/content/projects.ts`. The section "Arbeiten" appears once the list is not empty.

## Design

`docs/design-language.md` explains the design: the dictionary entry, the margin notes, the vault, the colours and typefaces, and the sources behind every historical reference.
