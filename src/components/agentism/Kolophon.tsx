import { REPOSITORY } from "@/lib/site";
import { Row, Section, Tr } from "./Text";

/** The colophon: like the closing note of a manuscript, it says how the page was made. */
export function Kolophon() {
  return (
    <Section
      id="kolophon"
      lemma="Kolophon"
      grammar={
        <>
          <i>der</i> ‹gr. <span lang="grc">κολοφών</span> „Gipfel, Abschluss“›
        </>
      }
      title="Zu dieser Seite."
    >
      <Row
        className="mt-9"
        notes={
          <figure>
            <blockquote className="italic text-[1.12em] leading-[1.45] text-ink">
              Wer sich selbst und andre kennt,
              <br />
              Wird auch hier erkennen:
              <br />
              Orient und Okzident
              <br />
              Sind nicht mehr zu trennen.
            </blockquote>
            <figcaption className="mt-2">Goethe, West-östlicher Divan</figcaption>
          </figure>
        }
      >
        <dl className="space-y-5 max-w-[38em]">
          <div>
            <dt className="smallcaps text-rubric">Form</dt>
            <dd>
              Die Seite ist gebaut wie ein kommentiertes Lehrbuch: in der Mitte der Text (
              <Tr>matn</Tr>), am Rand die Anmerkung (<Tr>ḥāshiya</Tr>). Wer nur den Text liest,
              weiß, was wir tun. Die Ränder sagen, woher die Begriffe kommen.
            </dd>
          </div>
          <div>
            <dt className="smallcaps text-rubric">Gewölbe</dt>
            <dd>
              Das Muqarnas am Anfang ist nicht gezeichnet, sondern errechnet: aus einem Grundriss,
              Stufe für Stufe. Wie man solche Gewölbe berechnet, beschrieb Ghiyāth al-Dīn al-Kāshī
              1427 in Samarkand. Der Kunsthistoriker Yasser Tabbaa liest die Form als Bild der
              ashʿaritischen Lehre, nach der die Welt aus kleinsten Teilen besteht, die in jedem
              Augenblick neu gehalten werden. Ein Rechner verfährt ähnlich: Er baut das Stetige aus
              Einzelnem.
            </dd>
          </div>
          <div>
            <dt className="smallcaps text-rubric">Schrift</dt>
            <dd>
              Gesetzt aus der EB Garamond, nach dem Egenolff-Berner-Schriftmuster (Frankfurt am
              Main, 1592), und der Amiri, nach den Lettern der Bulaq-Druckerei (Kairo, 1905). Beide
              sind frei lizenziert und werden von dieser Seite selbst ausgeliefert, nicht von
              Dritten.
            </dd>
          </div>
          <div>
            <dt className="smallcaps text-rubric">Farbe</dt>
            <dd>
              Nachts Lapislazuli und Gold, die Farben der Buchmalerei; tags das Weiß und Blau von
              Sidi Bou Said. Rot steht, wie in Handschriften, nur für Stichwörter. Zwei der
              Farbnamen kamen über das Arabische ins Deutsche: Azur von <Tr>lāzaward</Tr>, Karmesin
              von <Tr>qirmiz</Tr>.
            </dd>
          </div>
          <div>
            <dt className="smallcaps text-rubric">Quelltext</dt>
            <dd>
              Der Quelltext dieser Seite ist offen:{" "}
              <a href={REPOSITORY} target="_blank" rel="noreferrer" className="link">
                {REPOSITORY.replace("https://", "")}
              </a>
              . Wer andere prüft, sollte sich selbst prüfen lassen.
            </dd>
          </div>
        </dl>
        <p className="mt-8 text-ink-soft">Berlin, 2026 · 1448&nbsp;n.&nbsp;H.</p>
      </Row>
    </Section>
  );
}
