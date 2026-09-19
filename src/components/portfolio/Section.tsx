import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  kicker,
  title,
  aside,
  children,
  className,
  fullScreen = false,
}: {
  id?: string;
  kicker?: string;
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  /**
   * When true the section uses a minimum height of one viewport (minus the
   * sticky navbar) so it visually fills the browser window. Content remains
   * its natural size; extra space is distributed as bottom padding. The
   * section can still grow beyond the viewport if content requires it.
   */
  fullScreen?: boolean;
}) {
  const reactId = useId();
  const headingId = `${id ?? reactId}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-14 border-b border-border py-16 sm:py-20",
        fullScreen && "flex min-h-[calc(100svh-3.5rem)] flex-col",
        className,
      )}
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
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
      {/* When fullScreen, the content area grows to consume remaining space */}
      <div className={cn(fullScreen && "flex flex-1 flex-col justify-center")}>
        {children}
      </div>
    </section>
  );
}
