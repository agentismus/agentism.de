import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/agentism/Nav";
import { Footer } from "@/components/agentism/Footer";
import { chatEnabled } from "@/lib/features";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Agentism" },
      {
        name: "description",
        content:
          "Wie Agentism personenbezogene Daten verarbeitet: Kontaktformular, Hosting und Ihre Rechte nach DSGVO.",
      },
      { property: "og:title", content: "Datenschutzerklärung — Agentism" },
      {
        property: "og:description",
        content: "Informationen zur Datenverarbeitung bei Agentism nach DSGVO.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/datenschutz" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: Datenschutz,
});

const mail = (
  <a href="mailto:hallo@agentism.de" className="link">
    hallo@agentism.de
  </a>
);

// The chat exists only in server builds, so its paragraphs appear only there.
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
      <p>
        Beim Aufruf dieser Website werden technisch notwendige Daten verarbeitet (IP-Adresse, Datum
        und Uhrzeit, aufgerufene Seite, Browsertyp). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        — unser berechtigtes Interesse am sicheren und stabilen Betrieb der Website. Diese Daten
        werden nicht mit anderen Datenquellen zusammengeführt.
      </p>
    ),
  },
  {
    title: "Kontaktformular",
    body: (
      <p>
        Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir Name, E-Mail-Adresse und
        Ihre Nachricht, um die Anfrage zu beantworten. Rechtsgrundlage ist Ihre Einwilligung (Art. 6
        Abs. 1 lit. a DSGVO) sowie Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Anfragen. Die
        Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen
        Aufbewahrungsfristen entgegenstehen.
      </p>
    ),
  },
  ...(chatEnabled
    ? [
        {
          title: "KI-Assistent (Chat)",
          body: (
            <p>
              Die Eingaben im Chat werden zur Beantwortung an unseren KI-Dienstleister Mistral AI
              (Mistral AI SAS, Paris, Frankreich) übermittelt und in unserer Datenbank
              protokolliert, um den Dienst bereitzustellen und zu verbessern. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO. Bitte geben Sie im Chat keine sensiblen personenbezogenen
              Daten ein.
            </p>
          ),
        },
      ]
    : []),
  {
    title: "Auftragsverarbeiter",
    body: (
      <p>
        Für Datenbank, Hosting und Formularspeicherung setzen wir Dienstleister ein, mit denen
        Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO bestehen. Eine Übermittlung in
        Drittländer erfolgt nur auf Grundlage geeigneter Garantien (z. B.
        EU-Standardvertragsklauseln).
      </p>
    ),
  },
  {
    title: "Cookies, lokale Speicherung und Schriften",
    body: (
      <>
        <p>
          Diese Website setzt keine Analyse- oder Marketing-Cookies ein. Wenn Sie zwischen Tag- und
          Nachtansicht wechseln, wird Ihre Wahl lokal im Browser gespeichert (localStorage).
          {chatEnabled
            ? " Für die Funktion des KI-Assistenten wird außerdem eine zufällige Sitzungskennung lokal gespeichert."
            : ""}{" "}
          Diese Einträge enthalten keine personenbezogenen Daten und können jederzeit über die
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
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch
        (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
        widerrufen. Zudem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu, etwa der
        Berliner Beauftragten für Datenschutz und Informationsfreiheit.
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
      <main className="page legal max-w-[48rem] pt-14 pb-8">
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
