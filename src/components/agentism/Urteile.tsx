import { Ar, Gloss, Row, Section, Tr } from "./Text";

const urteile = [
  {
    name: "Notwendig",
    text: "Was in jedem Fall gelten muss: Datenschutz, Sicherheit und ein Mensch, der verantwortlich bleibt. Darüber wird nicht verhandelt.",
  },
  {
    name: "Unmöglich",
    text: "Was ein Sprachmodell nicht leisten kann, etwa Gewissheit ohne Quellen oder Wissen ohne Daten. Das sagen wir, bevor Geld fließt.",
  },
  {
    name: "Möglich",
    text: "Was gelingen kann, aber nicht muss. Hier entscheidet der Nutzen: Wir bauen nur, wo er sich messen lässt.",
  },
];

/** The three judgements every project idea receives before anything is built. */
export function Urteile() {
  return (
    <Section
      id="urteile"
      lemma="Urteil"
      grammar={<i>das</i>}
      title="Drei Urteile, bevor wir bauen."
      lead="Am Anfang steht keine Technik, sondern eine Prüfung. Jede Idee, die Sie mitbringen, erhält eines von drei Urteilen."
    >
      <Row
        className="mt-9"
        notes={
          <>
            <Gloss term="Dreiteilung">
              Sie ist geliehen. Muḥammad al-Sanūsī (gest. 1490 in Tlemcen) eröffnet sein Lehrbuch{" "}
              <Tr>Umm al-Barāhīn</Tr> mit dem Satz, das Urteil der Vernunft kenne genau drei Fälle:
              das Notwendige (<Ar>واجب</Ar> <Tr>wājib</Tr>), das Unmögliche (<Ar>مستحيل</Ar>{" "}
              <Tr>mustaḥīl</Tr>) und das Mögliche (<Ar>جائز</Ar> <Tr>jāʾiz</Tr>). Er meinte
              Größeres; die Einteilung trägt auch im Kleinen.
            </Gloss>
            <Gloss term="Grund">
              Was sein kann oder nicht, braucht nach den Gelehrten des Kalām einen Grund, der den
              Ausschlag gibt (<Tr>murajjiḥ</Tr>). Im Projekt heißt dieser Grund: ein Nutzen, den man
              messen kann.
            </Gloss>
          </>
        }
      >
        <ol className="items">
          {urteile.map((u, i) => (
            <li key={u.name} className="item">
              <span className="item-n">{i + 1}</span>
              <p>
                <span className="item-name">{u.name}.</span> {u.text}
              </p>
            </li>
          ))}
        </ol>
      </Row>
    </Section>
  );
}
