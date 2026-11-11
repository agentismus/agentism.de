import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";

/** Shown when a page fails to render. */
export function ErrorPage({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : String(error);

  return (
    <div className="page min-h-screen flex flex-col justify-center py-16">
      <p className="lemma">
        <b>Fehler</b>, <i>der</i>
      </p>
      <h1 className="section-title">Etwas ist schiefgegangen.</h1>
      <p className="lead mt-5">Bitte versuchen Sie es noch einmal.</p>
      {import.meta.env.DEV && message && (
        <pre className="mt-5 max-h-40 overflow-auto border p-3 text-[0.8em] text-rubric">
          {message}
        </pre>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Erneut versuchen
        </button>
        <a href={import.meta.env.BASE_URL} className="btn">
          Zur Startseite
        </a>
      </div>
    </div>
  );
}
