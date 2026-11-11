import type { ReactNode } from "react";

/**
 * Building blocks of the page form: main text with notes in the margin.
 * The rules for using them are in docs/design-language.md, section 2.
 */

/** An Arabic term. Always follow it with <Tr> and a German meaning. */
export function Ar({ children }: { children: string }) {
  return (
    <span lang="ar" dir="rtl" className="ar">
      {children}
    </span>
  );
}

/** A Greek term. It never breaks across lines. */
export function Gr({ children }: { children: string }) {
  return (
    <span lang="grc" className="whitespace-nowrap">
      {children}
    </span>
  );
}

/** A transliterated or foreign term, set in italics. */
export function Tr({ children, lang = "ar-Latn" }: { children: ReactNode; lang?: string }) {
  return (
    <i lang={lang} className="tr">
      {children}
    </i>
  );
}

/** One margin note. It opens with its keyword, which ties it to the text beside it. */
export function Gloss({ term, children }: { term: string; children: ReactNode }) {
  return (
    <p className="gloss">
      <span className="gloss-term">{term}</span>
      {children}
    </p>
  );
}

/** A block of main text with its margin notes. */
export function Row({
  children,
  notes,
  className = "",
}: {
  children: ReactNode;
  notes?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`row ${className}`}>
      <div>{children}</div>
      {notes ? <aside className="margin">{notes}</aside> : null}
    </div>
  );
}

/** The eight-pointed star that marks a section break. */
export function Star({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-7 -7 14 14" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="miter">
        <path d="M0 -6 6 0 0 6 -6 0Z" />
        <path d="M-4.24 -4.24H4.24V4.24H-4.24Z" />
      </g>
    </svg>
  );
}

/** A section: star rule, lemma line in dictionary form, title, optional lead and notes. */
export function Section({
  id,
  lemma,
  grammar,
  title,
  lead,
  notes,
  children,
}: {
  id: string;
  lemma: string;
  grammar: ReactNode;
  title: string;
  lead?: ReactNode;
  notes?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="section page" aria-labelledby={`${id}-title`}>
      <div className="rule" aria-hidden="true">
        <Star />
      </div>
      <Row notes={notes}>
        <p className="lemma">
          <b>{lemma}</b>, {grammar}
        </p>
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        {lead ? <p className="lead mt-5">{lead}</p> : null}
      </Row>
      {children}
    </section>
  );
}
