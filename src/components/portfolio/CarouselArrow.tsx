import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Square carousel arrow: near-black square with a thin white border and a
 * thin orange chevron. Sits in the outer margin of the carousel (the wrapper
 * reserves horizontal padding for it), so it never covers the visual content.
 */
export function CarouselArrow({
  direction,
  onClick,
  label,
  disabled = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center border border-white/25 bg-neutral-950/90 p-1.5 text-primary/90 transition-colors hover:border-white/60 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 active:border-primary/70 active:bg-primary/15 disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground/35 disabled:hover:bg-neutral-950/90 sm:p-2 ${
        direction === "prev" ? "left-0" : "right-0"
      }`}
    >
      <Icon aria-hidden="true" className="size-4 sm:size-5" strokeWidth={2} />
    </button>
  );
}
