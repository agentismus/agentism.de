import { Link } from "@tanstack/react-router";
import { Muqarnas } from "./Muqarnas";
import { Ar, Gr, Tr } from "./Text";

/** The dictionary entry for the word "Agentism", with the vault beside it. */
export function Hero() {
  return (
    <section id="top" className="page pt-8 lg:pt-12">
      <div className="row hero-row">
        <div className="hero-entry">
          {/* Running head: the neighbours of the word in a dictionary, all from Latin agere. */}
          <p className="runhead" aria-hidden="true">
            <span>Agenda</span>
            <span>Agens</span>
            <span>Agent</span>
            <strong>Agentism</strong>
            <span>Agentur</span>
            <span>agieren</span>
            <span>agil</span>
          </p>

          <h1 className="headword mt-7 lg:mt-9" aria-label="Agentism">
            Agent<span className="dot">·</span>ism
          </h1>

          <p className="entry-meta mt-4">
            [ˈeɪdʒəntɪzəm], <i>der</i>; – ‹lat. <Tr lang="la">agēns</Tr> „handelnd, wirkend“ + gr.{" "}
            <Gr>-ισμός</Gr> „Lehre, Haltung“; vgl. arab. <Ar>فاعل</Ar> <Tr>fāʿil</Tr> „der
            Handelnde“›
          </p>

          <ol className="senses mt-7">
            <li>
              <p>
                <span className="label">Philosophie.</span>
                Die Frage nach dem Handelnden: Wer wirkt, wenn etwas geschieht?
              </p>
            </li>
            <li>
              <p>
                <span className="label">Recht.</span>
                Handeln im Auftrag eines anderen, in den Grenzen einer Vollmacht.
              </p>
            </li>
            <li>
              <p>
                <span className="label">Informatik.</span>
                Bau von Software, die Aufgaben selbstständig ausführt, statt nur zu antworten.
              </p>
            </li>
            <li>
              <p>
                <span className="label">Berlin.</span>
                Werkstatt für KI-Systeme. Wendet KI dort an, wo sie wirklich wirkt, und verzichtet
                dort, wo sie es nicht tut. <i>Wir bauen Systeme, die wirklich funktionieren.</i>
              </p>
            </li>
          </ol>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/" hash="kontakt" className="btn btn-primary">
              Erstgespräch anfragen
            </Link>
            <Link to="/" hash="prozess" className="btn">
              Wie wir arbeiten
            </Link>
          </div>
        </div>

        <Muqarnas />
      </div>
    </section>
  );
}
