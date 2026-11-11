import { Link } from "@tanstack/react-router";
import { EMAIL } from "@/lib/site";

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/agentism" },
  { label: "GitHub", href: "https://github.com/agentismus" },
  { label: "E-Mail", href: `mailto:${EMAIL}` },
];

export function Footer() {
  return (
    <footer className="border-t mt-[clamp(3.5rem,8vw,6rem)]">
      <div className="page py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <span className="wordmark text-[1.1em]">
          Agent<span className="dot">·</span>ism
        </span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Rechtliches und Kontakt">
          <Link to="/impressum" className="nav-link">
            Impressum
          </Link>
          <Link to="/datenschutz" className="nav-link">
            Datenschutz
          </Link>
          {social.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="nav-link"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
