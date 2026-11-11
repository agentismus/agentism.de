/**
 * References shown in the section "Arbeiten". The section stays hidden while
 * this list is empty, so the page never shows placeholders.
 */
export type Project = {
  name: string;
  /** For example "Startup · Plattform". */
  category?: string;
  description?: string;
  url?: string;
};

export const projects: Project[] = [];
