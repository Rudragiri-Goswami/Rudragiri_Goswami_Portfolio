import * as React from "react";
import type { Certification } from "@/content/portfolio";

export function Certifications({ entries }: { entries: Certification[] }) {
  const [active, setActive] = React.useState<Certification | null>(null);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <ol className="relative border-l border-border pl-6 sm:pl-8">
        {entries.map((certification) => (
          <li key={certification.id} className="relative pb-5 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary sm:-left-[calc(2rem+5px)]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="max-w-2xl text-lg font-semibold leading-snug">
                {certification.title}
              </h3>
              <p className="font-mono text-[11px] uppercase text-muted-foreground">
                {certification.issued}
              </p>
            </div>
            <p className="mt-1 text-sm text-foreground/80">{certification.organization}</p>
            {certification.duration && (
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {certification.duration}
              </p>
            )}
            <button
              type="button"
              onClick={() => setActive(certification)}
              className="mt-3 inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View Certificate →
            </button>
          </li>
        ))}
      </ol>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} certificate`}
          className="fixed inset-0 z-[110] flex flex-col bg-background/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase text-muted-foreground">
              {active.title}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
              >
                Open in new tab
              </a>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
              >
                Close
              </button>
            </div>
          </div>
          <iframe
            src={active.embedUrl}
            title={`${active.title} certificate`}
            allow="autoplay"
            className="mt-4 min-h-0 w-full flex-1 rounded-md border border-border bg-white"
          />
        </div>
      )}
    </>
  );
}
