import type { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Gallery } from "./Gallery";

export function ProjectCard({ project }: { project: Project }) {
  const featured = Boolean(project.featured);

  return (
    <article
      className={cn(
        "flex flex-col border border-border bg-card/40 p-6 transition-colors hover:border-foreground/30",
        featured && "lg:col-span-2 lg:p-8",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {project.categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase text-muted-foreground"
          >
            {category}
          </span>
        ))}
        {project.isPlaceholder && (
          <span className="rounded-full border border-primary/50 px-2.5 py-1 font-mono text-[10px] uppercase text-primary">
            Placeholder
          </span>
        )}
      </div>

      <h3 className={cn("mt-5 font-semibold", featured ? "text-2xl" : "text-lg")}>
        {project.title}
      </h3>
      {(project.organization || project.date) && (
        <p className="mt-2 font-mono text-[11px] uppercase text-muted-foreground">
          {[project.organization, project.date].filter(Boolean).join(" · ")}
        </p>
      )}

      {project.overview && (
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{project.overview}</p>
      )}

      {project.role && (
        <p className="mt-4 text-sm">
          <span className="font-mono text-[10px] uppercase text-muted-foreground">Role · </span>
          {project.role}
        </p>
      )}

      {project.contributions && project.contributions.length > 0 && (
        <ul className="mt-4 grid gap-2">
          {project.contributions.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="text-primary">
                -
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {project.outcomes && project.outcomes.length > 0 && (
        <ul className="mt-4 grid gap-2">
          {project.outcomes.map((item) => (
            <li key={item} className="text-sm leading-relaxed text-foreground/80">
              {item}
            </li>
          ))}
        </ul>
      )}

      {project.images && project.images.length > 0 && (
        <Gallery
          images={project.images}
          className="mt-6"
          gridClassName={featured ? "sm:grid-cols-4" : "sm:grid-cols-2"}
        />
      )}

      <div className="mt-auto pt-6">
        {project.tools && project.tools.length > 0 && (
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            {project.tools.join(" · ")}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-4 font-mono text-[11px] uppercase">
          {project.event && <span className="text-muted-foreground">{project.event}</span>}
          {project.link && (
            <a
              href={project.link.url}
              target="_blank"
              rel="noreferrer"
              className="text-primary transition-opacity hover:opacity-80"
            >
              {project.link.label} →
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noreferrer"
              className="text-primary transition-opacity hover:opacity-80"
            >
              Video →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
