import { useState } from "react";
import { EMAIL } from "@/lib/site";
import { Row, Section } from "./Text";

/**
 * Contact by e-mail. The form only prepares a draft in the visitor's own mail
 * program, so the site needs no server and stores nothing.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  function openDraft(e: React.FormEvent) {
    e.preventDefault();
    const who = name.trim();
    const subject = who ? `Erstgespräch – ${who}` : "Erstgespräch";
    const body = who ? `${message.trim()}\n\n${who}` : message.trim();
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // No clipboard access: the address stays visible and can be selected by hand.
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
          <>
            <p>
              Direkt per E-Mail:
              <br />
              <a href={`mailto:${EMAIL}`} className="link text-[1.15em]">
                {EMAIL}
              </a>
            </p>
            <p className="mt-3">
              <button type="button" onClick={copyAddress} className="nav-link underline">
                {copied ? "Adresse kopiert" : "Adresse kopieren"}
              </button>
              <span className="sr-only" role="status">
                {copied ? "Die E-Mail-Adresse wurde kopiert." : ""}
              </span>
            </p>
          </>
        }
      >
        <p className="max-w-[38em]">
          Für den Anfang genügen drei Angaben: was Ihr Betrieb tut, welche Aufgabe Sie beschäftigt
          und welche Daten oder Systeme es dazu schon gibt.
        </p>

        <form onSubmit={openDraft} className="max-w-[34em] mt-6">
          <label className="block">
            <span className="sr-only">Name</span>
            <input
              className="field"
              placeholder="Name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
            />
          </label>
          <label className="block mt-2">
            <span className="sr-only">Nachricht</span>
            <textarea
              className="field resize-none"
              placeholder="Nachricht"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={4000}
            />
          </label>

          <button type="submit" className="btn btn-primary mt-7">
            E-Mail-Entwurf öffnen
          </button>

          <p className="mt-4 text-[0.84em] leading-[1.5] text-ink-soft">
            Die Schaltfläche öffnet Ihr E-Mail-Programm mit dem fertigen Entwurf. Diese Seite
            speichert und überträgt Ihre Eingaben nicht.
          </p>
        </form>
      </Row>
    </Section>
  );
}
