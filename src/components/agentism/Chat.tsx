import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendChatMessage } from "@/lib/chat.functions";
import { Ar, Gloss, Row, Section, Tr } from "./Text";

type Msg = { role: "user" | "assistant"; text: string };

const suggestions = [
  "Wo kann KI meinem Betrieb helfen?",
  "Was kostet eine Beratung?",
  "Ich habe eine Web-App. Was ist möglich?",
  "Zeigen Sie mir ein Praxisbeispiel.",
];

function sessionId() {
  let s = localStorage.getItem("agentism_session");
  if (!s) {
    s = crypto.randomUUID();
    localStorage.setItem("agentism_session", s);
  }
  return s;
}

/** The chat section. Loaded only when chatEnabled is set (see src/lib/features.ts). */
export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Guten Tag. Stellen Sie Ihre Frage oder wählen Sie einen Einstieg.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sendFn = useServerFn(sendChatMessage);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    setBusy(true);
    const history = messages.slice(-10);
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    try {
      const { reply } = await sendFn({ data: { sessionId: sessionId(), message: t, history } });
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Die Verbindung ist unterbrochen. Bitte schreiben Sie uns an hallo@agentism.de.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      id="auskunft"
      lemma="Auskunft"
      grammar={<i>die</i>}
      title="Fragen Sie die Maschine."
      lead="Ein Sprachmodell beantwortet erste Fragen zu Agentism. Es urteilt aus Gewohnheit; für verbindliche Auskünfte schreiben Sie uns."
    >
      <Row
        className="mt-9"
        notes={
          <Gloss term="Auskunft">
            Ibn Khaldūn beschreibt in der <Tr>Muqaddima</Tr> (1377) die <Ar>زايرجة</Ar>{" "}
            <Tr>zāʾirja</Tr>: ein Verfahren, das aus den Buchstaben einer Frage einen Antwortsatz
            errechnete. Viele hielten das für Einblick ins Verborgene. Sein Urteil: Die Antwort
            passt zur Frage, weil sie aus deren Wortlaut gewonnen ist, mehr nicht. Für dieses
            Fenster gilt Ähnliches.
          </Gloss>
        }
      >
        <div className="border flex flex-col h-[26rem] max-w-[38em]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={`smallcaps ${m.role === "assistant" ? "text-rubric" : "text-ink-soft"}`}
                >
                  {m.role === "assistant" ? "Agentism" : "Sie"}
                </div>
                <p>{m.text}</p>
              </div>
            ))}
            {busy && <p className="text-ink-soft">…</p>}
          </div>
          {messages.length <= 1 && (
            <div className="px-5 pb-4 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="border px-3 py-1 text-[0.86em] text-ink-soft hover:text-accent hover:border-accent transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-stretch border-t"
          >
            <label className="flex-1">
              <span className="sr-only">Ihre Frage</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Beschreiben Sie Ihren Betrieb oder stellen Sie eine Frage"
                maxLength={2000}
                className="w-full bg-transparent px-5 py-3 placeholder:text-ink-soft focus:outline-none"
              />
            </label>
            <button type="submit" disabled={busy} className="btn border-0 border-l">
              Senden
            </button>
          </form>
        </div>
      </Row>
    </Section>
  );
}
