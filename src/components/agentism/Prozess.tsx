import { Ar, Gloss, Gr, Row, Section, Tr } from "./Text";

const steps = [
  {
    title: "Erstgespräch",
    text: "30 Minuten, kostenfrei. Wir hören zu, verstehen Ihren Betrieb und sagen ehrlich, ob KI hier etwas bringt.",
  },
  {
    title: "Analyse",
    text: "Prozesse, Datenquellen, Systeme. Wir prüfen, was vorhanden ist und wo Automatisierung wirklich Zeit spart.",
  },
  {
    title: "Systemdesign",
    text: "Ein konkreter Plan: Architektur, Werkzeuge, Aufwand, Kosten. Nachvollziehbar dokumentiert.",
  },
  {
    title: "Umsetzung",
    text: "Wir bauen, integrieren und testen in kleinen Schritten, mit einem Ergebnis nach jeder Iteration.",
  },
  {
    title: "Betrieb & Übergabe",
    text: "Schulung, Dokumentation, Monitoring. Sie behalten die Kontrolle über Ihre Systeme.",
  },
];

export function Prozess() {
  return (
    <Section
      id="prozess"
      lemma="Verfahren"
      grammar={<i>das</i>}
      title="Vom Möglichen zum Wirklichen."
      lead="Fünf Schritte führen von der ersten Frage zum System im Betrieb."
    >
      <Row
        className="mt-9"
        notes={
          <Gloss term="tätig">
            Aristoteles nannte „tätig“ den Verstand, der Mögliches wirklich macht (
            <Gr>νοῦς ποιητικός</Gr>). In der arabischen Philosophie wurde daraus{" "}
            <Ar>العقل الفعّال</Ar> <Tr>al-ʿaql al-faʿʿāl</Tr>, bei al-Fārābī und Ibn Sīnā
            (Avicenna). Mit den Übersetzungen aus dem Arabischen gelangte die Lehre als{" "}
            <Tr lang="la">intellectus agens</Tr> an die lateinischen Schulen, bis zu Albertus Magnus
            in Köln. Im tätigen Verstand steckt dasselbe <Tr lang="la">agens</Tr> wie im Agenten.
          </Gloss>
        }
      >
        <ol className="items">
          {steps.map((s, i) => (
            <li key={s.title} className="item">
              <span className="item-n">{i + 1}</span>
              <p>
                <span className="item-name">{s.title}.</span> {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Row>
    </Section>
  );
}
