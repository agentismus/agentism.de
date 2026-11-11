/**
 * Build-time switches.
 *
 * The chat needs a server, because the model's API key must stay secret. It is
 * therefore part of the site only in builds made with VITE_ENABLE_CHAT=true,
 * and the static build leaves it out completely.
 */
export const chatEnabled = import.meta.env.VITE_ENABLE_CHAT === "true";
