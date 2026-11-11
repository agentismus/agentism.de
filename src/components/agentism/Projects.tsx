import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Row, Section } from "./Text";

type Project = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  url: string | null;
};

/**
 * References from the `projects` table. The section appears only when at
 * least one project is published there, so the page never shows placeholders.
 */
export function Projects() {
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id,name,category,description,url")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(
        ({ data }) => setItems(data ?? []),
        () => setItems([]),
      );
  }, []);

  if (items.length === 0) return null;

  return (
    <Section id="arbeiten" lemma="Arbeit" grammar={<i>die</i>} title="Arbeiten.">
      <Row className="mt-9">
        <ul className="items">
          {items.map((p) => (
            <li key={p.id} className="py-[0.95em] border-b">
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
