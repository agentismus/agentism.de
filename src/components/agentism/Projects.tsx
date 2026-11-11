import { projects } from "@/content/projects";
import { Row, Section } from "./Text";

/** References. The list lives in src/content/projects.ts; the section is hidden while it is empty. */
export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section id="arbeiten" lemma="Arbeit" grammar={<i>die</i>} title="Arbeiten.">
      <Row className="mt-9">
        <ul className="items">
          {projects.map((p) => (
            <li key={p.name} className="py-[0.95em] border-b">
              <p>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="item-name link">
                    {p.name}
                  </a>
                ) : (
                  <span className="item-name">{p.name}</span>
                )}
                {p.category ? <span className="text-ink-soft"> · {p.category}</span> : null}
              </p>
              {p.description ? <p className="text-ink-soft">{p.description}</p> : null}
            </li>
          ))}
        </ul>
      </Row>
    </Section>
  );
}
