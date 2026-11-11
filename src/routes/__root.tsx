import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { NotFound } from "@/components/agentism/NotFound";
import { absoluteUrl } from "@/lib/site";

import appCss from "../styles.css?url";
// The text face for Latin script. Preloading it avoids a flash of the fallback font.
import textFont from "@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2?url";

// Runs before the first paint: applies a stored colour scheme so the page does not
// flash, and marks the document as scripted (the vault's scroll track depends on it).
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("agentism_theme");if(t==="day"||t==="night")d.dataset.theme=t}catch(e){}})()`;

// Link previews need an absolute address; without one the share image is left out.
const shareImage = absoluteUrl("/og.jpg");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Agentism — KI-Beratung & Automatisierung · Berlin" },
      {
        name: "description",
        content: "Agentism baut KI-Systeme, die wirklich funktionieren. KI-Beratung aus Berlin.",
      },
      { name: "author", content: "Agentism" },
      { property: "og:site_name", content: "Agentism" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_DE" },
      { name: "twitter:card", content: shareImage ? "summary_large_image" : "summary" },
      ...(shareImage
        ? [
            { property: "og:image", content: shareImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
      { name: "theme-color", content: "#0a0f21", media: "(prefers-color-scheme: dark)" },
      { name: "theme-color", content: "#f8f5ee", media: "(prefers-color-scheme: light)" },
    ],
    links: [
      { rel: "preload", href: textFont, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: `${import.meta.env.BASE_URL}favicon.svg` },
    ],
    scripts: [{ children: bootScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    // The boot script adds a class and a data attribute before React hydrates.
    <html lang="de" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#inhalt" className="skip">
          Zum Inhalt springen
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
