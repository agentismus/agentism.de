import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/agentism/Nav";
import { Hero } from "@/components/agentism/Hero";
import { Urteile } from "@/components/agentism/Urteile";
import { Services } from "@/components/agentism/Services";
import { Prozess } from "@/components/agentism/Prozess";
import { Einwaende } from "@/components/agentism/Einwaende";
import { About } from "@/components/agentism/About";
import { Projects } from "@/components/agentism/Projects";
import { LinkedinFeed } from "@/components/agentism/LinkedinFeed";
import { Contact } from "@/components/agentism/Contact";
import { Kolophon } from "@/components/agentism/Kolophon";
import { Footer } from "@/components/agentism/Footer";
import { chatEnabled } from "@/lib/features";

// The static build never requests this chunk.
const Chat = chatEnabled ? lazy(() => import("@/components/agentism/Chat")) : null;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agentism — KI-Beratung & Automatisierung · Berlin" },
      {
        name: "description",
        content:
          "Agentism baut KI-Systeme, die wirklich funktionieren. Beratung, Systemdesign, Agenten, Sicherheits- und Bias-Audits aus Berlin.",
      },
      { property: "og:title", content: "Agentism — KI-Beratung · Berlin" },
      {
        property: "og:description",
        content: "KI-Systeme, die wirklich funktionieren. Beratung, Umsetzung, Audits. Berlin.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Urteile />
        <Services />
        <Prozess />
        <Einwaende />
        {Chat ? (
          <Suspense fallback={null}>
            <Chat />
          </Suspense>
        ) : null}
        <About />
        <Projects />
        <LinkedinFeed />
        <Contact />
        <Kolophon />
      </main>
      <Footer />
    </>
  );
}
