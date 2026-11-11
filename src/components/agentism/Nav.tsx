import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Leistungen", hash: "leistungen" },
  { label: "Arbeitsweise", hash: "prozess" },
  { label: "Einwände", hash: "einwaende" },
  { label: "Über uns", hash: "ueber" },
  { label: "Kontakt", hash: "kontakt" },
];

/** Switches between the night and day colour schemes and remembers the choice. */
function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "day" : "night");
    const next = current === "day" ? "night" : "day";
    root.dataset.theme = next;
    try {
      localStorage.setItem("agentism_theme", next);
    } catch {
      // Private mode or blocked storage: the choice simply lasts for this page view.
    }
    window.dispatchEvent(new Event("agentism:theme"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="nav-link flex items-center"
      aria-label="Zwischen Tag- und Nachtansicht wechseln"
      title="Tag / Nacht"
    >
      <svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 1.8a6.2 6.2 0 0 1 0 12.4Z" fill="currentColor" />
      </svg>
    </button>
  );
}

/** The section that currently crosses the middle of the screen, if it is one of the nav targets. */
function useCurrentSection() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.hash))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
          else setCurrent((id) => (id === entry.target.id ? null : id));
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return current;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const current = useCurrentSection();

  return (
    <header className="nav">
      <div className="page h-full flex items-center justify-between gap-6">
        <Link to="/" hash="top" className="wordmark" aria-label="Agentism, zur Startseite">
          Agent<span className="dot">·</span>ism
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Hauptnavigation">
          {links.map((l) => (
            <Link
              key={l.hash}
              to="/"
              hash={l.hash}
              className="nav-link"
              activeOptions={{ includeHash: true }}
              data-current={current === l.hash}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/" hash="kontakt" className="btn btn-primary">
            Gespräch anfragen
          </Link>
        </nav>

        <div className="flex lg:hidden items-center gap-5">
          <ThemeToggle />
          <button
            type="button"
            className="nav-link"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Hauptnavigation"
          className="lg:hidden fixed inset-x-0 bottom-0 top-[var(--nav-h)] bg-ground z-40 page py-8 flex flex-col gap-6 text-[1.2em]"
        >
          {links.map((l) => (
            <Link key={l.hash} to="/" hash={l.hash} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="kontakt"
            onClick={() => setOpen(false)}
            className="btn btn-primary w-fit mt-2"
          >
            Gespräch anfragen
          </Link>
        </nav>
      )}
    </header>
  );
}
