import { DetailNavigation } from "./DetailNavigation";
import * as React from "react";
import { CarouselArrow } from "./CarouselArrow";
import type { GalleryImage, ShowcaseProject } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { OrdinalText } from "./OrdinalText";
import { LoadingImage } from "./LoadingImage";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useOverlayScrollLock } from "@/hooks/use-overlay-scroll-lock";

function GalleryCarousel({
  images,
  onEnlarge,
  fit = "contain",
}: {
  images: GalleryImage[];
  onEnlarge: (image: GalleryImage) => void;
  fit?: "cover" | "contain";
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  React.useEffect(() => {
    if (!api) return;
    const updateSelection = () => setSelectedIndex(api.selectedScrollSnap());
    updateSelection();
    api.on("select", updateSelection);
    return () => {
      api.off("select", updateSelection);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || isPaused || reduceMotion) return;
    const timer = window.setInterval(() => api.scrollNext(), 5500);
    return () => window.clearInterval(timer);
  }, [api, isPaused, reduceMotion]);

  return (
    <div
      className="relative mx-auto w-full max-w-[760px] px-8 sm:px-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <Carousel setApi={setApi} opts={{ loop: true, duration: 36 }} aria-label="Project photographs">

        <CarouselContent className="ml-0">
          {images.map((image, index) => (
            <CarouselItem key={image.caption ?? image.src ?? index} className="pl-0">
              <figure>
                <button
                  type="button"
                  onClick={() => onEnlarge(image)}
                  aria-label={`Enlarge photograph${image.caption ? `: ${image.caption}` : ""}`}
                  className="block aspect-[4/3] w-full overflow-hidden rounded-md border border-border bg-card ring-1 ring-primary/15"
                >
                  <LoadingImage
                    src={image.src ?? ""}
                    alt={image.alt ?? image.caption ?? "Project photograph"}
                    className="h-full w-full"
                     imgClassName={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                </button>
                {image.caption && (
                  <figcaption className="mt-3 text-center text-sm font-semibold">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselArrow
        direction="prev"
        onClick={() => api?.scrollPrev()}
        label="Previous photograph"
      />
      <CarouselArrow direction="next" onClick={() => api?.scrollNext()} label="Next photograph" />


      <div className="mt-4 flex justify-center gap-2" aria-label="Select photograph">
        {images.map((image, index) => (
          <Button
            key={image.src ?? image.caption ?? index}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollTo(index)}
            className="size-5 rounded-full p-0"
            aria-label={`Show photograph ${index + 1}`}

            aria-current={selectedIndex === index ? "true" : undefined}
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                selectedIndex === index ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/50"
              }`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}


function Block({ title, children }: { title: string; children: React.ReactNode }) {

  return (
    <section className="border-t border-border pt-8">
      <h3 className="section-kicker">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ImageFrame({
  image,
  ratio = "aspect-[16/10]",
  onEnlarge,
}: {
  image?: GalleryImage | undefined;
  ratio?: string | undefined;
  onEnlarge?: (() => void) | undefined;
}) {
  const content = image?.src ? (
    <LoadingImage
      src={image.src}
      alt={image.alt ?? image.caption ?? "Project photograph"}
      className="flex h-full w-full items-center justify-center"
      imgClassName="h-full w-full object-contain"
    />
  ) : (
    <span className="flex h-full w-full items-center justify-center px-4 text-center font-mono text-[10px] uppercase text-muted-foreground">
      {image?.caption ?? "Photograph pending"}
    </span>
  );

  return (
    <figure className="border border-border bg-secondary/30">
      {onEnlarge && image?.src ? (
        <button
          type="button"
          onClick={onEnlarge}
          className={`block w-full overflow-hidden ${ratio}`}
          aria-label="Enlarge image"
        >
          {content}
        </button>
      ) : (
        <div className={`overflow-hidden ${ratio}`}>{content}</div>
      )}
      {image?.caption && image.src && (
        <figcaption className="border-t border-border px-3 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ProjectCaseStudy({
  project,
  onClose,
}: {
  project: ShowcaseProject | null;
  onClose: () => void;
}) {
  const [enlarged, setEnlarged] = React.useState<GalleryImage | null>(null);
  const [showDoc, setShowDoc] = React.useState(false);

  useOverlayScrollLock(Boolean(project));

  React.useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (showDoc) setShowDoc(false);
      else if (enlarged) setEnlarged(null);
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [project, enlarged, showDoc, onClose]);

  React.useEffect(() => {
    setShowDoc(false);
  }, [project]);


  const study = project?.caseStudy;
  const galleryImages: GalleryImage[] = study?.gallery
    ? [study.gallery.primary, ...(study.gallery.supporting ?? [])].filter(
        (image): image is GalleryImage => Boolean(image?.src),
      )
    : [];
  if (!project || !study) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-background">
      <DetailNavigation onBack={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-background"
      >
        <header className="border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-4 px-5 py-5 sm:px-8">
          <div className="min-w-0">
             {project.category && (
               <p className="mb-3 font-mono text-[10px] uppercase text-primary">
                 {project.category}
               </p>
             )}
            <h2 className="text-xl font-bold leading-snug sm:text-2xl">{project.title}</h2>
             <p className="mt-2 font-mono text-[10px] uppercase text-primary">
               {project.event ?? project.teamLine}
             </p>
          </div>

          </div>
        </header>

        <div className="w-full">
          <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
          {study.lead && (
            <ImageFrame image={study.lead} onEnlarge={() => setEnlarged(study.lead ?? null)} />
          )}


          <div className="mt-8 grid gap-8">
            <Block title="Project overview">
              <div className="grid gap-4">
                {study.overview.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Block>

            {study.systemArchitecture && study.systemArchitecture.length > 0 && (
              <Block title="System architecture">
                <div className="grid gap-px bg-border sm:grid-cols-2">
                  {study.systemArchitecture.map((system) => (
                    <article key={system.title} className="bg-background p-5">
                      <h4 className="text-sm font-semibold">{system.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {system.description}
                      </p>
                    </article>
                  ))}
                </div>
              </Block>
            )}

            {study.researchConceptDevelopment && study.researchConceptDevelopment.length > 0 && (
              <Block title="Research & concept development">
                <ul className="grid gap-2">
                  {study.researchConceptDevelopment.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {galleryImages.length > 0 && !study.galleryAfterContributions && (
              <Block title="Project gallery">
                <GalleryCarousel
                  images={galleryImages}
                  onEnlarge={(image) => setEnlarged(image)}
                   {...(study.galleryFit ? { fit: study.galleryFit } : {})}
                />
              </Block>
            )}

             {study.video && (
               <div>
                 <Button
                   asChild
                   variant="outline"
                   className="h-auto rounded-none border-primary/60 bg-transparent px-4 py-2 font-mono text-[11px] uppercase text-primary shadow-none hover:bg-primary hover:text-primary-foreground"
                 >
                   <a href={study.video.url} target="_blank" rel="noreferrer">
                     {study.video.label}
                   </a>
                 </Button>
               </div>
             )}

             {study.technicalDescription ? (
               <Block title="Technical description">
                 <p className="text-sm leading-relaxed text-muted-foreground">
                   {study.technicalDescription}
                 </p>
               </Block>
             ) : study.hardware.length > 0 || study.navigation ? (
             <Block title="Technical implementation">

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Hardware</p>
                  <ul className="mt-3 grid gap-2">
                    {study.hardware.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-5">
                  <div>
                    <p className="text-sm font-medium">Navigation</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {study.navigation}
                    </p>
                  </div>
                  {study.sensorOptimisation && (
                    <div>
                      <p className="text-sm font-medium">Sensor optimisation</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {study.sensorOptimisation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Block>
             ) : null}

            <Block title="My contributions">
               {study.contributionsIntro && (
                 <p className="text-sm text-foreground/90">{study.contributionsIntro}</p>
               )}
               <ul className={`${study.contributionsIntro ? "mt-3" : ""} grid gap-2 sm:grid-cols-2`}>
                {study.contributions.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Block>

            {galleryImages.length > 0 && study.galleryAfterContributions && (
              <Block title="SENTINEL-Alpha / SENTINEL-Beta image gallery">
                <GalleryCarousel
                  images={galleryImages}
                  onEnlarge={(image) => setEnlarged(image)}
                  {...(study.galleryFit ? { fit: study.galleryFit } : {})}
                />
              </Block>
            )}

            {study.showTechnicalTags && (
              <Block title="Technical tags">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag} className="border border-border px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

             {project.id === "stabilo" && (
               <ul className="flex flex-wrap gap-1.5 border-t border-border pt-8">
                 {project.tags.map((tag) => (
                   <li
                     key={tag}
                     className="border border-border px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground"
                   >
                     {tag}
                   </li>
                 ))}
               </ul>
             )}



            {(study.achievements.length > 0 || study.certificate) && (
            <Block title="Competition achievements">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Certificate column - renders LEFT when certificateFirst, otherwise RIGHT */}
                {study.certificate && study.certificateFirst && (
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">
                    Certificate
                  </p>
                  <div className="mt-3">
                    <ImageFrame
                      image={study.certificate}
                      ratio="aspect-[4/3]"
                      onEnlarge={
                        study.certificateUrl
                          ? () => window.open(study.certificateUrl, "_blank", "noreferrer")
                          : () => setEnlarged(study.certificate ?? null)
                      }
                    />
                  </div>
                </div>
                )}
                {study.achievements.length > 0 && (
                <ul className="grid gap-px self-start bg-border">
                  {study.achievements.map((entry) => (
                    <li key={entry.event} className="bg-background p-5">
                      <p className="font-mono text-[10px] uppercase text-primary">{entry.event}</p>
                      {entry.lines.map((line, index) => (
                        <p
                          key={line}
                          className={
                            index === 0
                              ? "mt-2 text-base font-semibold"
                              : "mt-1 text-sm text-muted-foreground"
                          }
                        >
                          <OrdinalText text={line} />
                        </p>
                      ))}
                    </li>
                  ))}
                </ul>
                )}
                {/* Certificate column - renders RIGHT when not certificateFirst (default) */}
                {study.certificate && !study.certificateFirst && (
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">
                    Certificate
                  </p>
                  <div className="mt-3">
                    <ImageFrame
                      image={study.certificate ?? { caption: "Mindbend certificate pending" }}
                      ratio="aspect-[4/3]"
                      onEnlarge={
                        study.certificateUrl
                          ? () => window.open(study.certificateUrl, "_blank", "noreferrer")
                          : () => setEnlarged(study.certificate ?? null)
                      }
                    />
                  </div>
                </div>
                )}
              </div>
            </Block>
            )}

            {(study.documentation || study.cft) && (
              <Block title="Documentation">
                <div className="flex flex-wrap gap-3">
                  {study.documentation && (
                    <button
                      type="button"
                      onClick={() => setShowDoc(true)}
                      className="inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {study.documentation.label} →
                    </button>
                  )}
                  {study.cft && (
                    <a
                      href={study.cft.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {study.cft.label} ↗
                    </a>
                  )}
                </div>
              </Block>
            )}

          </div>
          </div>
        </div>
      </aside>

      {enlarged?.src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image"
          className="fixed inset-0 z-[110] flex flex-col bg-background/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setEnlarged(null)}
              className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
            >
              Close
            </button>
          </div>
          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
            <span className="flex min-h-[10rem] items-center justify-center">
              <LoadingImage
                src={enlarged.src}
                alt={enlarged.alt ?? enlarged.caption ?? "Project photograph"}
                className="max-h-[75vh]"
                imgClassName="max-h-[75vh] w-auto border border-border object-contain"
              />
            </span>
            <figcaption className="text-center text-sm text-muted-foreground">
              {enlarged.caption}
            </figcaption>
          </figure>
        </div>
      )}

      {showDoc && study.documentation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project documentation"
          className="fixed inset-0 z-[110] flex flex-col bg-background/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase text-muted-foreground">
              {project.title} - {study.documentation.label}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={study.documentation.embedUrl ?? study.documentation.url}
                target="_blank"
                rel="noreferrer"
                className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
              >
                Open in new tab
              </a>
              <button
                type="button"
                onClick={() => setShowDoc(false)}
                className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
              >
                Close
              </button>
            </div>
          </div>
          <iframe
            src={study.documentation.embedUrl ?? study.documentation.url}
            title={`${project.title} - ${study.documentation.label}`}
            allow="autoplay"
            className="mt-4 min-h-0 w-full flex-1 rounded-md border border-border bg-white"
          />
        </div>
      )}
    </div>
  );
}

