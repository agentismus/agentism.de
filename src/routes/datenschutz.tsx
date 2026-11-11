import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/agentism/Nav";
import { Footer } from "@/components/agentism/Footer";
import { EMAIL, pageAddress } from "@/lib/site";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Agentism" },
      {
        name: "description",
        content:
          "Wie Agentism personenbezogene Daten verarbeitet: Hosting, Kontakt per E-Mail und Ihre Rechte nach DSGVO.",
      },
      { property: "og:title", content: "Datenschutzerklärung — Agentism" },
      {
        property: "og:description",
        content: "Informationen zur Datenverarbeitung bei Agentism nach DSGVO.",
      },
      ...pageAddress("/datenschutz").meta,
    ],
    links: pageAddress("/datenschutz").links,
  }),
  component: Datenschutz,
});

const mail = (
  <a href={`mailto:${EMAIL}`} className="link">
    {EMAIL}
  </a>
);

// Keep this page in step with what the site really does. It has no database,
// no forms that send data, no cookies and no third-party scripts or fonts.
const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Verantwortlicher",
    body: (
      <p>
        Agentism — Omar [Nachname], [Straße und Hausnummer], [PLZ] Berlin, Deutschland.
        <br />
        E-Mail: {mail}
      </p>
    ),
  },
  {
    title: "Hosting und Server-Logfiles",
    body: (
      <>
        <p>
          Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc., 88 Colin P.
          Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Website verarbeitet GitHub
          technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit, die
          aufgerufene Seite und den Browsertyp. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1
          lit.&nbsp;f DSGVO: unser berechtigtes Interesse am sicheren und stabilen Betrieb der
          Website.
        </p>
        <p>
          Dabei können Daten in die USA übermittelt werden. GitHub, Inc. ist nach dem EU-US Data
          Privacy Framework zertifiziert. Wir selbst werten diese Daten nicht aus und führen sie
          nicht mit anderen Daten zusammen.
        </p>
      </>
    ),
  },
  {
    title: "Kontakt per E-Mail",
    body: (
      <>
        <p>
          Wenn Sie uns eine E-Mail schreiben, verarbeiten wir Ihre Angaben, um die Anfrage zu
          beantworten. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO bei
          vorvertraglichen Anfragen, sonst Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO. Die Daten
          werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen
          Aufbewahrungsfristen entgegenstehen.
        </p>
        <p>
          Das Formular auf der Startseite erstellt lediglich einen Entwurf in Ihrem eigenen
          E-Mail-Programm. Die Website selbst speichert und überträgt Ihre Eingaben nicht.
        </p>
      </>
    ),
  },
  {
    title: "Cookies, lokale Speicherung und Schriften",
    body: (
      <>
        <p>
          Diese Website setzt keine Cookies und kein Tracking ein. Wenn Sie zwischen Tag- und
          Nachtansicht wechseln, wird Ihre Wahl lokal im Browser gespeichert (localStorage). Der
          Eintrag enthält keine personenbezogenen Daten und kann jederzeit über die
          Browsereinstellungen gelöscht werden.
        </p>
        <p>
          Die Schriften dieser Website werden von der Website selbst ausgeliefert. Es wird dafür
          keine Verbindung zu Dritten aufgebaut.
        </p>
      </>
    ),
  },
  {
    title: "Ihre Rechte",
    body: (
      <p>
        Sie haben das Recht auf Auskunft (Art.&nbsp;15), Berichtigung (Art.&nbsp;16), Löschung
        (Art.&nbsp;17), Einschränkung der Verarbeitung (Art.&nbsp;18), Datenübertragbarkeit
        (Art.&nbsp;20) und Widerspruch (Art.&nbsp;21 DSGVO). Zudem steht Ihnen ein Beschwerderecht
        bei einer Aufsichtsbehörde zu, etwa der Berliner Beauftragten für Datenschutz und
        Informationsfreiheit.
      </p>
    ),
  },
  {
    title: "Kontakt in Datenschutzfragen",
    body: (
      <p>Für Auskünfte und die Ausübung Ihrer Rechte genügt eine formlose Nachricht an {mail}.</p>
    ),
  },
];

function Datenschutz() {
  return (
    <>
      <Nav />
      <main id="inhalt" className="page legal max-w-[48rem] pt-14 pb-8">
        <p className="lemma">
          <b>Datenschutz</b>, <i>der</i>
        </p>
        <h1 className="section-title">Datenschutzerklärung</h1>

        <div className="mt-10">
          {sections.map((s, i) => (
            <section key={s.title}>
              <h2>
                {i + 1}. {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
