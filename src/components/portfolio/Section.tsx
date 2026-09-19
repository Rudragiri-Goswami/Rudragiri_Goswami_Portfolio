import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  kicker,
  title,
  aside,
  children,
  className,
  compact = false,
}: {
  id?: string;
  kicker?: string;
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Tightens the heading-to-content gap for sections where content needs more vertical room. */
  compact?: boolean;
}) {
  const reactId = useId();
  const headingId = `${id ?? reactId}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-14 border-b border-border py-16 sm:py-20", className)}
    >
      <div className={cn("flex flex-wrap items-end justify-between gap-4", compact ? "mb-6" : "mb-10")}>
        <div>
          {kicker && <p className="section-kicker">{kicker}</p>}
          <h2 id={headingId} className="mt-3 text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
        </div>
        {aside && (
          <p className="font-mono text-[11px] uppercase text-muted-foreground">{aside}</p>
        )}
      </div>
      {children}
    </section>
  );
}
