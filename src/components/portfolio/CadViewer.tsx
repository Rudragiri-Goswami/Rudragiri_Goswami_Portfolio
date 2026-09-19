import * as React from "react";
import { cn } from "@/lib/utils";

export type CadViewMode = "solid" | "wireframe" | "transparent";

/**
 * SSR-safe shell for the 3D CAD viewer.
 * The WebGL scene (three.js) is lazy-loaded on the client only.
 */
const CadViewerScene = React.lazy(() => import("./CadViewerScene"));

function ViewerState({ children, loading = false }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <span role={loading ? "status" : "alert"} aria-live="polite" className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card">
      {loading && <span aria-hidden="true" className="h-5 w-5 rounded-full border-2 border-primary/25 border-t-primary motion-safe:animate-spin" />}
      <span className="font-mono text-[10px] uppercase text-primary">{children}</span>
    </span>
  );
}

class ViewerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() {
    return this.state.failed ? <ViewerState>3D CAD FAILED TO LOAD</ViewerState> : this.props.children;
  }
}

const MODE_LABELS: Record<CadViewMode, string> = {
  solid: "Solid",
  wireframe: "Wireframe",
  transparent: "Transparent",
};

export function CadViewer({
  src,
  title,
  className,
  emptyLabel = "3D model coming soon",
  viewportClassName = "h-[320px] sm:h-[400px] lg:h-[450px]",
  daylight = false,
  modelRotation,
}: {
  /** CDN URL of the .glb model. When undefined, a "coming soon" state is shown. */
  src?: string | undefined;
  title: string;
  className?: string | undefined;
  loadingLabel?: string | undefined;
  emptyLabel?: string | undefined;
  /** Height utilities for the viewport; override for compact cards. */
  viewportClassName?: string | undefined;
  /** Bright daylight lighting environment instead of the default dark studio look. */
  daylight?: boolean | undefined;
  /** Fixed orientation correction applied to the model (e.g. Z-up CAD exports). */
  modelRotation?: [number, number, number] | undefined;
}) {
  const [mode, setMode] = React.useState<CadViewMode>("solid");
  const [resetSignal, setResetSignal] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [sceneResult, setSceneResult] = React.useState<{ src: string; state: "loaded" | "error" } | null>(null);
  const sceneState = sceneResult && sceneResult.src === src ? sceneResult.state : "loading";
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);
  const onLoaded = React.useCallback(() => {
    if (src) setSceneResult({ src, state: "loaded" });
  }, [src]);
  const onError = React.useCallback(() => {
    if (src) setSceneResult({ src, state: "error" });
  }, [src]);

  const enterFullscreen = () => {
    frameRef.current?.requestFullscreen?.().catch(() => {});
  };

  const controlButton =
    "border border-border px-2.5 py-1 font-mono text-[10px] uppercase text-muted-foreground transition-colors hover:border-foreground hover:text-foreground";

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className="group border border-border bg-card/30 fullscreen:flex fullscreen:h-full fullscreen:flex-col fullscreen:bg-background"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase text-muted-foreground">{title}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {src &&
              (Object.keys(MODE_LABELS) as CadViewMode[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  aria-pressed={mode === option}
                  className={cn(
                    controlButton,
                    mode === option &&
                      "border-primary/60 text-primary hover:border-primary hover:text-primary",
                  )}
                >
                  {MODE_LABELS[option]}
                </button>
              ))}
            {src && (
              <button
                type="button"
                onClick={() => setResetSignal((value) => value + 1)}
                className={controlButton}
              >
                Reset
              </button>
            )}
            {src && (
              <button type="button" onClick={enterFullscreen} className={controlButton}>
                Fullscreen
              </button>
            )}
          </div>
        </div>

        <div className={cn("relative overflow-hidden group-fullscreen:min-h-0 group-fullscreen:flex-1", viewportClassName)}>
          {!src ? (
            <ViewerState>{emptyLabel}</ViewerState>
          ) : !mounted ? (
            <ViewerState loading>3D CAD LOADING...</ViewerState>
          ) : (
            <>
              <ViewerErrorBoundary key={src}>
              {sceneState === "loading" && <ViewerState loading>3D CAD LOADING...</ViewerState>}
              <React.Suspense fallback={null}>
                <CadViewerScene
                  key={src}
                  src={src}
                  mode={mode}
                  resetSignal={resetSignal}
                  fallback={<ViewerState>3D CAD FAILED TO LOAD</ViewerState>}
                  daylight={daylight}
                  modelRotation={modelRotation}
                  onLoaded={onLoaded}
                  onError={onError}
                />
              </React.Suspense>
              {sceneState === "error" && <ViewerState>3D CAD FAILED TO LOAD</ViewerState>}
              </ViewerErrorBoundary>
            </>
          )}
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] uppercase text-muted-foreground">
        Drag to rotate · Scroll to zoom · Right-click to pan
      </p>
    </div>
  );
}
