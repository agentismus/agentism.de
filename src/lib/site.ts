/** Facts about the site that several files need. */

export const EMAIL = "hallo@agentism.de";

export const REPOSITORY = "https://github.com/agentismus/agentism.de";

/**
 * Absolute address of the site without a trailing slash, for example "https://agentism.de".
 * It is set at build time through VITE_SITE_URL. Without it, absolute links are left out.
 */
const origin = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

/** The absolute address of a path on this site, or null when the site's address is unknown. */
export function absoluteUrl(path: string): string | null {
  if (!origin) return null;
  return origin + import.meta.env.BASE_URL.replace(/\/$/, "") + path;
}

/** Canonical link and og:url for a page, when the site's address is known. */
export function pageAddress(path: string) {
  const url = absoluteUrl(path);
  return {
    meta: url ? [{ property: "og:url", content: url }] : [],
    links: url ? [{ rel: "canonical", href: url }] : [],
  };
}
