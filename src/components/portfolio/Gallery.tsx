import * as React from "react";
import type { GalleryImage } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  images: GalleryImage[];
  className?: string;
  /** Tailwind grid class override */
  gridClassName?: string;
};

export function Gallery({ images, className, gridClassName }: Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const close = React.useCallback(() => setOpenIndex(null), []);
  const step = React.useCallback(
    (delta: number) =>
      setOpenIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, step]);

  if (!images?.length) return null;

  return (
    <div className={className}>
      <ul className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3", gridClassName)}>
        {images.map((image, index) => (
          <li key={`${image.caption}-${index}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full overflow-hidden rounded-md border border-border bg-card text-left transition-colors hover:border-foreground/40"
              aria-label={`View image: ${image.caption}`}
            >
              <span className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt ?? image.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="px-3 text-center font-mono text-[10px] uppercase leading-relaxed text-muted-foreground">
                    Image placeholder
                  </span>
                )}
              </span>
              <span className="block border-t border-border px-3 py-2 font-mono text-[10px] uppercase leading-relaxed text-muted-foreground">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase text-muted-foreground">
              {openIndex + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4">
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="rounded-full border border-border px-3 py-2 text-sm transition-colors hover:border-foreground"
              >
                ←
              </button>
            )}
            <figure className="flex min-h-0 max-h-full w-full max-w-4xl flex-col items-center gap-4">
              {images[openIndex]?.src ? (
                <img
                  src={images[openIndex]?.src}
                  alt={images[openIndex]?.alt ?? images[openIndex]?.caption ?? ""}
                  className="max-h-[70vh] w-auto rounded-md border border-border object-contain"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md border border-border bg-card font-mono text-[11px] uppercase text-muted-foreground">
                  Image placeholder
                </div>
              )}
              <figcaption className="text-center text-sm text-muted-foreground">
                {images[openIndex]?.caption}
              </figcaption>
            </figure>
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="rounded-full border border-border px-3 py-2 text-sm transition-colors hover:border-foreground"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
