import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SYSTEM_PROMPT = `Du bist der KI-Assistent von Agentism, einer KI-Beratung aus Berlin.
Antworte präzise, ehrlich, auf Deutsch. Keine Buzzwords. Sprich die Nutzer mit „Sie“ an.
Agentism wendet KI dort an, wo sie wirklich wirkt — und verzichtet dort, wo sie es nicht tut.
Leistungen: KI-Potenzialanalyse, Datenquellen-Analyse, Systemdesign, RAG-Systeme, KI-Agenten,
Integration & Automatisierung (n8n), KI-Sicherheitsaudit, Bias & Fairness Audit, Workshops.
Erstgespräch ist kostenfrei. Bei tiefgehenden Fragen empfehle ein direktes Gespräch
über das Kontaktformular oder hallo@agentism.de.`;

const InputSchema = z.object({
  sessionId: z.string().min(1).max(100),
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().max(4000),
      }),
    )
    .max(20)
    .optional()
    .default([]),
});

export const sendChatMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return {
        reply:
          "Der KI-Assistent ist gerade nicht verfügbar. Bitte schreiben Sie uns direkt an hallo@agentism.de.",
      };
    }

    await supabaseAdmin.from("chat_logs").insert({
      session_id: data.sessionId,
      role: "user",
      message: data.message,
    });

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...data.history.map((m) => ({
        role: m.role,
        content: m.text,
      })),
      { role: "user", content: data.message },
    ];

    let reply =
      "Entschuldigung, da ist etwas schiefgegangen. Bitte versuchen Sie es später erneut.";
    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages,
          temperature: 0.4,
          max_tokens: 400,
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
        reply = json.choices?.[0]?.message?.content?.trim() || reply;
      } else {
        console.error("Mistral API error", res.status, await res.text());
      }
    } catch (e) {
      console.error("Mistral request failed", e);
    }

    await supabaseAdmin.from("chat_logs").insert({
      session_id: data.sessionId,
      role: "assistant",
      message: reply,
    });

    return { reply };
  });
