import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/agentism/NotFound";

// Prerendered to 404.html, which static hosts such as GitHub Pages serve for unknown addresses.
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Seite nicht gefunden — Agentism" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFound,
});
