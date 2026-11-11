import type { ReactNode } from "react";
import { Ar, Gloss, Row, Section, Tr } from "./Text";

type Objection = { said: string; answer: string; notes?: ReactNode };

const objections: Objection[] = [
  {
    said: "Sprachmodelle erfinden Dinge. Darauf kann man keinen Betrieb stützen.",
    answer:
      "Auf ein Modell allein nicht. Ein Sprachmodell weiß, was gewöhnlich folgt, nicht, was folgen muss. Deshalb belegen unsere Systeme ihre Antworten mit Quellen, und wo ein Fehler teuer wäre, entscheidet ein Mensch.",
    notes: (
      <Gloss term="Gewohnheit">
        Ein trainiertes Modell verknüpft, was in seinen Daten wiederholt zusammen auftrat. Al-Sanūsī
        nannte ein solches Urteil <Ar>الحكم العادي</Ar> <Tr>al-ḥukm al-ʿādī</Tr>, Urteil aus
        Gewohnheit: Zwei Dinge gelten als verbunden, weil man sie immer wieder zusammen fand. Die
        Ausnahme bleibt möglich, und keines bewirkt das andere.
      </Gloss>
    ),
  },
  {
    said: "Unsere Daten sind dafür viel zu unordentlich.",
    answer:
      "Das ist der Normalfall. Die Datenquellen-Analyse zeigt, was brauchbar ist. Manchmal ist der erste Schritt keine KI, sondern Ordnung, und dann sagen wir das.",
  },
  {
    said: "Ein Agent, der selbstständig handelt, ist ein Risiko.",
    answer:
      "Ja, wenn er alles darf. Unsere Agenten erhalten eine eng gefasste Vollmacht: klar benannte Rechte, ein Protokoll ihrer Schritte und die Freigabe durch einen Menschen für alles, was sich nicht rückgängig machen lässt.",
    notes: (
      <Gloss term="Vollmacht">
        Ein Agent handelt im Auftrag. Das islamische Recht kennt dafür die <Ar>وكالة</Ar>{" "}
        <Tr>wakāla</Tr>, das BGB die Stellvertretung (§§&nbsp;164&nbsp;ff.). Beide kommen zum selben
        Schluss: Der Vertreter ist an seine Vollmacht gebunden. Was darüber hinausgeht, bleibt
        schwebend unwirksam, bis der Vertretene es genehmigt (§&nbsp;177&nbsp;BGB).
      </Gloss>
    ),
  },
  {
    said: "Das kann ChatGPT doch längst.",
    answer:
      "Oft ja, und dann raten wir dazu. Ein eigenes System lohnt sich erst, wenn es um Ihre Daten, Ihre Abläufe und nachprüfbare Ergebnisse geht.",
  },
  {
    said: "Für einen Betrieb unserer Größe lohnt sich das nicht.",
    answer:
      "Vielleicht nicht. Das klären wir im Erstgespräch, in dreißig Minuten und ohne Kosten. Wenn es sich nicht lohnt, hören Sie es von uns.",
  },
];

/** The objections section. Its form follows the disputations of kalam: objection, then answer. */
export function Einwaende() {
  return (
    <Section
      id="einwaende"
      lemma="Einwand"
      grammar={<i>der</i>}
      title="Was man einwenden kann."
      lead="Skepsis gegenüber KI ist oft berechtigt. Deshalb stehen die häufigsten Einwände hier zuerst, und in voller Stärke."
      notes={
        <Gloss term="Einwand">
          Die Form ist alt. In den Lehrbüchern des Kalām heißt sie <Tr>fa-in qīla … qulnā</Tr>:
          „Wendet man ein …, so antworten wir …“. Die lateinische Scholastik kennt sie als{" "}
          <Tr lang="la">videtur quod … respondeo</Tr>. Fakhr al-Dīn al-Rāzī trug die Einwände seiner
          Gegner so gründlich vor, dass Kritiker spotteten, er zahle die Einwände bar und die
          Antworten auf Kredit. Wir bemühen uns, beides bar zu zahlen.
        </Gloss>
      }
    >
      <div className="mt-9">
        {objections.map((o) => (
          <Row key={o.said} notes={o.notes} className="objection">
            <p className="said">
              <span className="voice">Man wendet ein</span>„{o.said}“
            </p>
            <p className="mt-3">
              <span className="voice">Wir antworten</span>
              {o.answer}
            </p>
          </Row>
        ))}
      </div>
    </Section>
  );
}
