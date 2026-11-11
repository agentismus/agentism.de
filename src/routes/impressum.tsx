import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/agentism/Nav";
import { Footer } from "@/components/agentism/Footer";
import { EMAIL, pageAddress } from "@/lib/site";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Agentism" },
      {
        name: "description",
        content: "Impressum und Anbieterkennzeichnung von Agentism, KI-Beratung aus Berlin.",
      },
      { property: "og:title", content: "Impressum — Agentism" },
      { property: "og:description", content: "Anbieterkennzeichnung nach § 5 DDG." },
      ...pageAddress("/impressum").meta,
    ],
    links: pageAddress("/impressum").links,
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <>
      <Nav />
      <main id="inhalt" className="page legal max-w-[48rem] pt-14 pb-8">
        <p className="lemma">
          <b>Impressum</b>, <i>das</i>
        </p>
        <h1 className="section-title">Impressum</h1>

        <div className="mt-10">
          <section>
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>
              Agentism — Omar [Nachname]
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ] Berlin
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2>Kontakt</h2>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${EMAIL}`} className="link">
                {EMAIL}
              </a>
              <br />
              Telefon: [Telefonnummer]
            </p>
          </section>

          <section>
            <h2>Umsatzsteuer</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]
              <br />
              Kleinunternehmerregelung gemäß § 19 UStG: [zutreffend / nicht zutreffend]
            </p>
          </section>

          <section>
            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              Omar [Nachname]
              <br />
              [Anschrift wie oben]
            </p>
          </section>

          <section>
            <h2>Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2>Haftung für Inhalte und Links</h2>
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Für Inhalte externer Links sind ausschließlich deren
              Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße
              erkennbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir betroffene Links
              umgehend.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
