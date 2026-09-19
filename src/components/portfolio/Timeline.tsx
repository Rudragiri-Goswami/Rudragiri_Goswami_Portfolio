import type { TimelineEntry } from "@/content/portfolio";
import { Gallery } from "./Gallery";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-border pl-6 sm:pl-8">
      {entries.map((entry) => (
        <li key={entry.id} className="relative pb-12 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary sm:-left-[calc(2rem+5px)]"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-lg font-semibold">{entry.position}</h3>
            {entry.date && (
              <p className="font-mono text-[11px] uppercase text-muted-foreground">{entry.date}</p>
            )}
          </div>
          <p className="mt-1 text-sm text-foreground/80">{entry.organization}</p>

          {entry.description && (
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
          )}

          {entry.progression && entry.progression.length > 0 && (
            <ol className="mt-6 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
              {entry.progression.map((stepItem, index) => (
                <li key={stepItem.title} className="bg-card p-4">
                  <p className="font-mono text-[10px] uppercase text-primary">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 font-semibold">{stepItem.title}</p>
                  {stepItem.date && (
                    <p className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">
                      {stepItem.date}
                    </p>
                  )}
                  {stepItem.note && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {stepItem.note}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}

          {entry.responsibilities && entry.responsibilities.length > 0 && (
            <ul className="mt-6 grid max-w-2xl gap-2">
              {entry.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="text-primary">
                    -
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {entry.milestones && entry.milestones.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.milestones.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {entry.images && entry.images.length > 0 && (
            <Gallery images={entry.images} className="mt-6 max-w-xl" />
          )}
        </li>
      ))}
    </ol>
  );
}
