import * as React from "react";

type Status = "loading" | "loaded" | "error";

export function LoadingImage({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  /** Classes for the container that holds the image (set aspect ratio/size here). */
  className?: string | undefined;
  imgClassName?: string | undefined;
}) {
  const [status, setStatus] = React.useState<Status>("loading");

  React.useEffect(() => {
    setStatus("loading");
  }, [src]);

  return (
    <span className={`relative block overflow-hidden ${className ?? ""}`}>
      {status !== "error" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`${imgClassName ?? "h-full w-full object-cover"} transition-opacity duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {status === "loading" && (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card">
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            style={{ animation: "image-shimmer 1.8s ease-in-out infinite" }}
          />
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rotate-45 bg-primary pulse"
          />
          <span className="font-mono text-[10px] uppercase text-muted-foreground">
            Loading image…
          </span>
        </span>
      )}

      {status === "error" && (
        <span className="absolute inset-0 flex items-center justify-center bg-card px-4">
          <span className="font-mono text-[10px] uppercase text-muted-foreground">
            Image unavailable
          </span>
        </span>
      )}
    </span>
  );
}
