import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Row, Section } from "./Text";

type Post = { id: string; date: string; preview_text: string; url: string };

/**
 * Recent LinkedIn posts from the `linkedin_posts` table. The section appears
 * only when at least one post is published there.
 */
export function LinkedinFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from("linkedin_posts")
      .select("id,date,preview_text,url")
      .eq("published", true)
      .order("date", { ascending: false })
      .limit(5)
      .then(
        ({ data }) => setPosts(data ?? []),
        () => setPosts([]),
      );
  }, []);

  if (posts.length === 0) return null;

  return (
    <Section id="aktuelles" lemma="Notiz" grammar={<i>die</i>} title="Aktuelles.">
      <Row className="mt-9">
        <ul className="items">
          {posts.map((p) => (
            <li key={p.id} className="border-b">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline gap-5 py-[0.85em] hover:text-accent transition-colors"
              >
                <span className="text-ink-soft shrink-0 w-[6.5em]">
                  {new Date(p.date).toLocaleDateString("de-DE")}
                </span>
                <span className="truncate">{p.preview_text}</span>
              </a>
            </li>
          ))}
        </ul>
      </Row>
    </Section>
  );
}
