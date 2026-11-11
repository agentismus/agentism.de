import type { ReactNode } from "react";
import { Ar, Gr, Tr } from "./Text";

type Station = { place: string; time: string; who: string; term: ReactNode };

// See docs/design-language.md, section 4.1, for the sources.
const stations: Station[] = [
  {
    place: "Athen",
    time: "4. Jh. v. Chr.",
    who: "Aristoteles",
    term: <Gr>νοῦς ποιητικός</Gr>,
  },
  {
    place: "Bagdad",
    time: "10. Jh.",
    who: "al-Fārābī",
    term: (
      <>
        <Ar>العقل الفعّال</Ar>
        <br />
        <Tr>al-ʿaql al-faʿʿāl</Tr>
      </>
    ),
  },
  {
    place: "Toledo",
    time: "12. Jh.",
    who: "Übersetzer aus dem Arabischen",
    term: "ins Lateinische",
  },
  {
    place: "Köln",
    time: "13. Jh.",
    who: "Albertus Magnus",
    term: <Tr lang="la">intellectus agens</Tr>,
  },
  {
    place: "Berlin",
    time: "heute",
    who: "Agentism",
    term: "Agent",
  },
];

/** Abb. 2: how the idea of an acting intellect travelled from Greek through Arabic into Latin. */
export function Weg() {
  return (
    <figure className="mt-12">
      <ol className="weg">
        {stations.map((s) => (
          <li key={s.place}>
            <p className="smallcaps text-accent">{s.place}</p>
            <p className="text-ink-soft text-[0.84em]">{s.time}</p>
            <p className="mt-2 text-[1.08em] leading-[1.3]">{s.term}</p>
            <p className="text-ink-soft text-[0.84em] mt-1">{s.who}</p>
          </li>
        ))}
      </ol>
      <figcaption className="figcap mx-0 max-w-[46em]">
        <span className="smallcaps">Abb.&nbsp;2</span> — Der Weg eines Begriffs. Der Verstand, der
        Mögliches wirklich macht, wandert durch vier Sprachen: Griechisch, Arabisch, Latein,
        Deutsch. Am Ende steht das Wort, das heute Software bezeichnet.
      </figcaption>
    </figure>
  );
}
