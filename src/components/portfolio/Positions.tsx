import type { PositionEntry } from "@/content/portfolio";

/**
 * Positions of Responsibility - one vertical-timeline entry per organisation.
 * Designations render as a compact LinkedIn-style vertical list with a thin
 * connecting rail; responsibilities use small orange horizontal markers.
 */
export function Positions({ entries }: { entries: PositionEntry[] }) {
  return (
    <ol className="relative border-l border-border pl-6 sm:pl-10">
      {entries.map((entry) => (
        <li key={entry.id} className="relative pb-14 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary sm:-left-[calc(2.5rem+4.5px)]"
          />

          {/* Organisation header */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-lg font-bold leading-tight sm:text-xl">{entry.organization}</h3>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {entry.period}
            </p>
          </div>
          {entry.subtitle ? (
            <p className="mt-0.5 text-sm text-muted-foreground/90">{entry.subtitle}</p>
          ) : null}
          {entry.description ? (
            <p className="body-copy mt-1 text-sm text-muted-foreground">{entry.description}</p>
          ) : null}

          {/* Designations - compact vertical list, LinkedIn-style rail */}
          <ul className="mt-6">
            {entry.designations.map((designation, designationIndex) => (
              <li
                key={designation.title}
                className="relative pl-5 pb-5 last:pb-0"
              >
                {designationIndex < entry.designations.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-3 bottom-0 w-px bg-border"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="absolute left-[-2.5px] top-2.5 h-[5px] w-[5px] rounded-full border border-muted-foreground/50 bg-background"
                />
                <p className="text-sm font-semibold text-foreground/90 sm:text-[0.95rem]">
                  {designation.title}
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  {designation.date}
                </p>
              </li>
            ))}
          </ul>

          {/* Responsibilities - three points, orange horizontal markers */}
          <ul className="mt-5 grid max-w-3xl gap-2.5 border-t border-border pt-5">
            {entry.responsibilities.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-[0.55rem] h-[2px] w-3 shrink-0 bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
