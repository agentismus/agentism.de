import type { ReactNode } from "react";
import { Ar, Gloss, Gr, Row, Section, Tr } from "./Text";

type Group = {
  title: string;
  services: [name: string, text: string][];
  notes: ReactNode;
};

const groups: Group[] = [
  {
    title: "Erkennen",
    services: [
      [
        "KI-Potenzialanalyse",
        "Wir gehen Ihre Abläufe durch und sagen klar, wo KI echten Nutzen stiftet und wo nicht.",
      ],
      [
        "Datenquellen-Analyse",
        "Wir bewerten Ihre Daten nach Qualität, Struktur und Zugänglichkeit. Ohne diese Grundlage trägt kein System.",
      ],
      [
        "Systemdesign & Anforderungsanalyse",
        "Von der Anforderung zur Architektur: ein System, das zu Ihren tatsächlichen Abläufen passt.",
      ],
    ],
    notes: (
      <Gloss term="Potenzial">
        ‹lat. <Tr lang="la">potentia</Tr>, gr. <Gr>δύναμις</Gr>, arab. <Ar>قوّة</Ar> <Tr>quwwa</Tr>›
        Das Vermögen, etwas zu werden. Sein Gegenstück ist der Akt (<Gr>ἐνέργεια</Gr>, <Ar>فعل</Ar>{" "}
        <Tr>fiʿl</Tr>): das Verwirklichte. Eine Potenzialanalyse fragt, was davon sich zu
        verwirklichen lohnt.
      </Gloss>
    ),
  },
  {
    title: "Bauen",
    services: [
      [
        "RAG-Systeme",
        "Antworten aus Ihren eigenen Dokumenten, jede mit Quellenangabe, damit sie sich nachprüfen lässt.",
      ],
      [
        "KI-Agenten",
        "Software, die Aufgaben ausführt: recherchieren, klassifizieren, koordinieren. Mit klar begrenzter Vollmacht.",
      ],
      [
        "Integration & Automatisierung",
        "Anbindung an Ihre bestehenden Werkzeuge und Abläufe, mit n8n, APIs und eigenen Schnittstellen. Gebaut für kleine und mittlere Unternehmen.",
      ],
    ],
    notes: (
      <>
        <Gloss term="Quelle">
          Die Gelehrten der Überlieferung verlangten für jede Aussage die Kette ihrer Gewährsleute (
          <Ar>إسناد</Ar> <Tr>isnād</Tr>). Ibn al-Mubārak (gest.&nbsp;797) nannte den Grund: Ohne sie
          könnte jeder sagen, was er will. Für Sprachmodelle gilt dasselbe.
        </Gloss>
        <Gloss term="Wahl">
          Fakhr al-Dīn al-Rāzī (gest.&nbsp;1210) nannte den Menschen einen Gezwungenen in der
          Gestalt eines Wählenden (<Tr>muḍṭarr fī ṣūrat mukhtār</Tr>). Über den Menschen wird bis
          heute gestritten. Auf einen Software-Agenten trifft der Satz wörtlich zu, und deshalb
          bleibt die Verantwortung beim Menschen.
        </Gloss>
        <Gloss term="Automat">
          ‹gr. <Gr>αὐτόματον</Gr> „sich selbst bewegend“› Um 850 beschrieben die Brüder Banū Mūsā in
          Bagdad einen Flötenspieler, dessen Melodie eine Stiftwalze vorgab: eine frühe
          programmierbare Maschine. Ihr Fach hieß <Tr>ʿilm al-ḥiyal</Tr>, die Wissenschaft der
          sinnreichen Vorrichtungen. Der Algorithmus trägt den Namen ihres Zeitgenossen
          al-Khwārizmī.
        </Gloss>
      </>
    ),
  },
  {
    title: "Prüfen und Lehren",
    services: [
      [
        "KI-Sicherheitsaudit",
        "Wir prüfen bestehende KI-Anbindungen auf Schwachstellen: Prompt Injection, Datenabfluss, unsichere Schnittstellen.",
      ],
      [
        "Bias- & Fairness-Audit",
        "Wir untersuchen Trainingsdaten und Ausgaben auf systematische Verzerrungen und dokumentieren das Ergebnis nachvollziehbar, auch für Aufsicht und Regulierung.",
      ],
      [
        "Workshop & Schulung",
        "Ihr Team lernt, KI-Werkzeuge sicher und wirksam einzusetzen. Praxisnah, ohne unnötige Theorie.",
      ],
    ],
    notes: (
      <Gloss term="Kasten">
        1770 führte Wolfgang von Kempelen am Wiener Hof einen Automaten vor, der Schach spielte. Im
        Kasten saß ein Mensch. Walter Benjamin machte daraus 1940 ein Gleichnis; bei ihm sitzt die
        Theologie im Kasten. Ein Audit öffnet den Kasten.
      </Gloss>
    ),
  },
];

export function Services() {
  return (
    <Section id="leistungen" lemma="Leistung" grammar={<i>die</i>} title="Was wir tun.">
      {groups.map((g, gi) => (
        <Row key={g.title} className="mt-10" notes={g.notes}>
          <h3 className="group-title mb-3">{g.title}</h3>
          <ol className="items" start={gi * 3 + 1}>
            {g.services.map(([name, text], i) => (
              <li key={name} className="item">
                <span className="item-n">{gi * 3 + i + 1}</span>
                <p>
                  <span className="item-name">{name}.</span> {text}
                </p>
              </li>
            ))}
          </ol>
        </Row>
      ))}
    </Section>
  );
}
