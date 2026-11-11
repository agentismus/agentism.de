import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Row, Section } from "./Text";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "busy" | "done" | "failed">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !consent) return;
    setState("busy");
    try {
      const { error } = await supabase.from("contact_requests").insert(form);
      if (error) throw error;
      setState("done");
      setForm({ name: "", email: "", message: "" });
      setConsent(false);
    } catch {
      setState("failed");
    }
  }

  return (
    <Section
      id="kontakt"
      lemma="Gespräch"
      grammar={<i>das</i>}
      title="Sprechen wir."
      lead="Ein kurzes Erstgespräch: kostenlos, unverbindlich, konkret. Wir hören zu und sagen ehrlich, ob KI in Ihrem Fall sinnvoll ist."
    >
      <Row
        className="mt-9"
        notes={
          <p>
            Oder direkt per E-Mail:
            <br />
            <a href="mailto:hallo@agentism.de" className="link text-[1.15em]">
              hallo@agentism.de
            </a>
          </p>
        }
      >
        <form onSubmit={submit} className="max-w-[34em]">
          <label className="block">
            <span className="sr-only">Name</span>
            <input
              className="field"
              placeholder="Name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              maxLength={120}
            />
          </label>
          <label className="block mt-2">
            <span className="sr-only">E-Mail</span>
            <input
              className="field"
              type="email"
              placeholder="E-Mail"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              maxLength={200}
            />
          </label>
          <label className="block mt-2">
            <span className="sr-only">Nachricht</span>
            <textarea
              className="field resize-none"
              placeholder="Nachricht"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              maxLength={2000}
            />
          </label>

          <label className="flex items-start gap-3 mt-6 cursor-pointer text-[0.84em] leading-[1.5] text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-[0.3em] h-4 w-4 shrink-0 accent-(--accent)"
            />
            <span>
              Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden.
              Weitere Informationen in der{" "}
              <Link to="/datenschutz" className="link">
                Datenschutzerklärung
              </Link>
              . Die Einwilligung kann jederzeit widerrufen werden.
            </span>
          </label>

          <button
            type="submit"
            disabled={state === "busy" || !consent}
            className="btn btn-primary mt-7"
          >
            {state === "busy" ? "Wird gesendet …" : "Absenden"}
          </button>

          <p className="mt-4" role="status">
            {state === "done" && "Danke. Wir melden uns bald."}
            {state === "failed" && (
              <>
                Das hat nicht geklappt. Bitte schreiben Sie uns direkt an{" "}
                <a href="mailto:hallo@agentism.de" className="link">
                  hallo@agentism.de
                </a>
                .
              </>
            )}
          </p>
        </form>
      </Row>
    </Section>
  );
}
