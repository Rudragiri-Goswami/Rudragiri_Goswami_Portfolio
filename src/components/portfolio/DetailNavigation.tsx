import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

/** A reserved row outside the independently scrolling project body. */
export function DetailNavigation({ onBack }: { onBack?: () => void }) {
  const className = "h-8 rounded-none border-border bg-background px-3 font-mono text-[10px] font-normal uppercase text-foreground shadow-none hover:border-primary hover:bg-background hover:text-primary";
  return (
    <nav aria-label="Project navigation" className="shrink-0 border-b border-border bg-background">
      <div className={`mx-auto w-full px-5 py-3 sm:px-8 ${onBack ? "max-w-6xl" : "max-w-3xl"}`}>
        {onBack ? (
          <Button variant="outline" className={className} onClick={onBack}>← Back to projects</Button>
        ) : (
          <Button asChild variant="outline" className={className}>
            <Link to="/" hash="projects">← Back to projects</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
