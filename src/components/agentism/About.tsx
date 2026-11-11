import { Gloss, Row, Section, Tr } from "./Text";

const credentials = [
  "Machine Learning, M.Sc., TU Berlin",
  "Produktionserfahrung aus dem Startup-Umfeld",
  "Schwerpunkt: KI-Systeme im echten Betrieb",
  "Berlin",
];

const tools = [
  "PyTorch",
  "Hugging Face",
  "Ollama",
  "LangChain",
  "LangGraph",
  "Claude Code",
  "Supabase",
];

export function About() {
  return (
    <Section
      id="ueber"
      lemma="Werkstatt"
      grammar={<i>die</i>}
      title="Technische Tiefe. Klare Sprache."
    >
      <Row
        className="mt-9"
        notes={
          <Gloss term="Begriff">
            Klare Sprache beginnt bei den Begriffen. Die islamische Gelehrsamkeit pflegte dafür eine
            eigene Gattung, die Bücher der Definitionen (<Tr>taʿrīfāt</Tr>); das bekannteste schrieb
            al-Jurjānī (gest. 1413). Ihr Handwerk, das Bestimmen nach Gattung und Unterschied,
            stammt von Aristoteles. Daher das Wörterbuch auf dieser Seite.
          </Gloss>
        }
      >
        <div className="space-y-4 max-w-[38em]">
          <p>
            Agentism ist eine Berliner KI-Werkstatt. Wir entwickeln Systeme, die im Alltag
            funktionieren, statt Präsentationen über Technologie, die nie in Betrieb geht.
          </p>
          <p>
            Unsere Arbeit beruht auf einem Machine-Learning-Studium an der TU Berlin und auf
            Produktionserfahrung als Founding Engineer: ein KI-gestütztes Produkt, von Grund auf
            gebaut, vom Modell über die Integration bis zur Plattform im täglichen Einsatz.
          </p>
          <p>
            Forschungsnähe und Umsetzung gehören für uns zusammen. Wir reden nicht über KI in der
            Theorie, wir bauen sie: klar, sicher, messbar.
          </p>
        </div>

        <ul className="items mt-9">
          {credentials.map((c) => (
            <li key={c} className="py-[0.7em] border-b">
              {c}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-ink-soft">
          <span className="smallcaps mr-2">Werkzeuge</span>
          {tools.map((t) => t.replace(/ /g, "\u00a0")).join(" · ")}
        </p>
      </Row>
    </Section>
  );
}
