import { Link } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

/** Shown for unknown addresses. The static build also writes it to 404.html. */
export function NotFound() {
  return (
    <>
      <Nav />
      <main className="page py-20">
        <p className="lemma">
          <b>404</b>, <i>die</i>
        </p>
        <h1 className="section-title">Diese Seite gibt es nicht.</h1>
        <p className="lead mt-5">Sie wurde verschoben oder hat nie existiert.</p>
        <div className="mt-8">
          <Link to="/" className="btn btn-primary">
            Zur Startseite
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
