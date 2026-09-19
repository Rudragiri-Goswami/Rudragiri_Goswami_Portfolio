import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { ShowcaseProject } from "@/content/portfolio";
import { OrdinalText } from "./OrdinalText";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { CarouselArrow } from "./CarouselArrow";


export function ProjectShowcase({ projects }: { projects: ShowcaseProject[] }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;
  const navigate = useNavigate();
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  const updateScrollState = React.useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setCanScrollPrev(row.scrollLeft > 1);
    setCanScrollNext(row.scrollLeft < row.scrollWidth - row.clientWidth - 1);
  }, []);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(row);
    return () => observer.disconnect();
  }, [projects, updateScrollState]);

  const scrollCards = (direction: "prev" | "next") => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector<HTMLElement>("[role='listitem']");
    const distance = (card?.offsetWidth ?? 352) + 1;
    row.scrollBy({ left: direction === "prev" ? -distance : distance, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative px-8 sm:px-10">
      <div
        ref={rowRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory items-stretch gap-px overflow-x-auto overscroll-x-contain bg-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label="Project cards"
      >
        {projects.map((project) => (
          <article
            key={project.id}
            role="listitem"
            onClick={() => {
              if (project.href) void navigate({ to: project.href });
              else if (project.caseStudy) setOpenId(project.id);
            }}
            className="flex w-[19rem] shrink-0 snap-start flex-col self-stretch bg-background transition-colors hover:bg-card sm:w-[22rem]"
            style={{ cursor: project.caseStudy || project.href ? "pointer" : "default" }}
          >
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
              <p className="mt-2 font-mono text-[10px] uppercase text-primary">
                {project.teamLine}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.overview}
              </p>

              <ul className="mt-4 flex min-h-7 flex-wrap content-start gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-border px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {project.achievementPreview.length > 0 && (
                <ul className="mt-4 grid gap-1.5 border-t border-border pt-4">
                  {project.achievementPreview.map((item) => (
                    <li key={item} className="flex gap-2.5 text-xs leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-[0.4rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
                      />
                      <span className="text-foreground/85">
                        <OrdinalText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {(project.caseStudy || project.href) && (
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  {project.href ? (
                    <Link
                      to={project.href}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Know more →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenId(project.id);
                      }}
                      className="border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Know more →
                    </button>
                  )}
                  {project.badge && (
                    <span className="border border-primary/60 px-2 py-1 font-mono text-[10px] uppercase text-primary">
                      {project.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <CarouselArrow
        direction="prev"
        onClick={() => scrollCards("prev")}
        label="Previous projects"
        disabled={!canScrollPrev}
      />
      <CarouselArrow
        direction="next"
        onClick={() => scrollCards("next")}
        label="Next projects"
        disabled={!canScrollNext}
      />
      </div>

      <ProjectCaseStudy project={active} onClose={() => setOpenId(null)} />
    </>
  );
}
