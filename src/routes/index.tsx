import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/agentism/Nav";
import { Hero } from "@/components/agentism/Hero";
import { Urteile } from "@/components/agentism/Urteile";
import { Services } from "@/components/agentism/Services";
import { Prozess } from "@/components/agentism/Prozess";
import { Einwaende } from "@/components/agentism/Einwaende";
import { About } from "@/components/agentism/About";
import { Projects } from "@/components/agentism/Projects";
import { Contact } from "@/components/agentism/Contact";
import { Kolophon } from "@/components/agentism/Kolophon";
import { Footer } from "@/components/agentism/Footer";
import { EMAIL, absoluteUrl, pageAddress } from "@/lib/site";

const description =
  "Agentism baut KI-Systeme, die wirklich funktionieren. Beratung, Systemdesign, Agenten, Sicherheits- und Bias-Audits aus Berlin.";

// Structured data, so search engines know what kind of business this is.
const business = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Agentism",
  description,
  email: EMAIL,
  ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
  address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
  areaServed: "DE",
  knowsLanguage: "de",
};

export const Route = createFileRoute("/")({
  head: () => {
    const address = pageAddress("/");
    return {
      meta: [
        { title: "Agentism — KI-Beratung & Automatisierung · Berlin" },
        { name: "description", content: description },
        { property: "og:title", content: "Agentism — KI-Beratung · Berlin" },
        {
          property: "og:description",
          content: "KI-Systeme, die wirklich funktionieren. Beratung, Umsetzung, Audits. Berlin.",
        },
        ...address.meta,
      ],
      links: address.links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(business) }],
    };
  },
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main id="inhalt">
        <Hero />
        <Urteile />
        <Services />
        <Prozess />
        <Einwaende />
        <About />
        <Projects />
        <Contact />
        <Kolophon />
      </main>
      <Footer />
    </>
  );
}
