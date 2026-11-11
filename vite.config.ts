import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

// BASE_PATH lets the same build be served from a sub-path, for example
// https://<user>.github.io/<repo>/ on GitHub Pages. With a custom domain it stays "/".
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Every page is rendered to static HTML at build time, so the output in
      // dist/client can be served by any static host.
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoStaticPathsDiscovery: false,
        autoSubfolderIndex: true,
        failOnError: true,
      },
      pages: [
        { path: "/" },
        { path: "/impressum" },
        { path: "/datenschutz" },
        // Static hosts serve this file for unknown addresses.
        { path: "/404", prerender: { outputPath: "/404.html" } },
      ],
    }),
    viteReact(),
  ],
});
