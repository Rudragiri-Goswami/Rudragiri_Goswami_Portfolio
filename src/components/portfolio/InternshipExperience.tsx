import { DetailNavigation } from "./DetailNavigation";
import * as React from "react";
import { CarouselArrow } from "./CarouselArrow";
import { Button } from "@/components/ui/button";
import { CadViewer } from "./CadViewer";
import { LoadingImage } from "./LoadingImage";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  internshipExperience,
  researchExperience,
  type ResearchEntry,
} from "@/content/portfolio";
import { useOverlayScrollLock } from "@/hooks/use-overlay-scroll-lock";

const outputs = [
  {
    src: "/images/isa/Hubble_Dgm_Enhanced.png",
    title: "Hubble Diagram",
  },
  {
    src: "/images/isa/Hubble_Residuals_vs_Redshift_Enhanced.png",
    title: "Hubble Residuals vs Redshift",
  },
  {
    src: "/images/isa/Low_z_vs_High_z_Enhanced.png",
    title: "Low-z vs High-z Hubble Diagram with Fit",
  },
];

const impactResults = [
  {
    src: "/images/1vi/Force_vs_Time.png",
    title: "Impact Force vs Time - 1 kg Impactor, 1 m Drop Height",
    alt: "Impact Force vs Time Abaqus/Explicit result - 1 kg impactor, 1 m drop height",
  },
  {
    src: "/images/1vi/Energy_vs_Time.png",
    title: "Energy Components vs Time - 1 kg Impactor, 1 m Drop Height",
    alt: "Energy Components vs Time Abaqus/Explicit result - 1 kg impactor, 1 m drop height",
  },
  {
    src: "/images/1vi/Displacement_vs_Time.png",
    title: "Displacement of Centre of Gravity vs Time - 1 kg Impactor, 1 m Drop Height",
    alt: "Displacement of Centre of Gravity vs Time Abaqus/Explicit result - 1 kg impactor, 1 m drop height",
  },
];

const fixtureCadModels = [
  {
    id: "initial",
    label: "Initial Fixture Design",
    context: "Original fixture concept",
    src: "/models/base1.glb",
  },
  {
    id: "modified",
    label: "Modified Fixture Design",
    context: "Final modular fixture configuration",
    src: "/models/base_i2_f_fyp.glb",
  },
  {
    id: "impactor",
    label: "Impactor Assembly",
    context: "Rigid impactor and loading assembly",
    src: "/models/impactorexr.glb",
  },
];

function FixtureCadModels() {
  const [active, setActive] = React.useState(0);
  const model = fixtureCadModels[active]!;

  return (
    <div className="mt-4 border border-border bg-card p-3 sm:p-4">
      <div className="flex flex-wrap gap-2">
        {fixtureCadModels.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={index === active}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              index === active
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {model.context}
      </p>
      <CadViewer
        key={model.id}
        src={model.src}
        title={`${model.label} - interactive CAD model`}
        className="mt-3"
        daylight={model.id === "impactor"}
      />
    </div>
  );
}



function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid max-w-4xl gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <span aria-hidden="true" className="mt-[0.7rem] h-0.5 w-3 shrink-0 bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function GraphCarousel() {
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
      className="relative mx-auto mt-10 w-full max-w-[650px] px-8 sm:px-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
    >
      <Carousel setApi={setApi} opts={{ loop: true, duration: 36 }} aria-label="Internship graphs">
        <CarouselContent className="ml-0">
          {outputs.map((output) => (
            <CarouselItem key={output.title} className="pl-0">
              <figure>
                <div className="aspect-[3/2] overflow-hidden rounded-md border border-border bg-card ring-1 ring-primary/15 shadow-[0_0_24px_var(--color-border)]">
                  <LoadingImage
                    src={output.src}
                    alt={`${output.title} computational graph`}
                    className="flex h-full w-full items-center justify-center"
                    imgClassName="block max-h-full w-full object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm font-semibold">
                  {output.title}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselArrow direction="prev" onClick={() => api?.scrollPrev()} label="Previous graph" />
      <CarouselArrow direction="next" onClick={() => api?.scrollNext()} label="Next graph" />


      <div className="mt-4 flex justify-center gap-2" aria-label="Select graph">
        {outputs.map((output, index) => (
          <Button
            key={output.title}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollTo(index)}
            className="size-5 rounded-full p-0"
            aria-label={`Show ${output.title}`}
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

function ResultsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [enlargedIndex, setEnlargedIndex] = React.useState<number | null>(null);

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
    if (enlargedIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEnlargedIndex(null);
      if (event.key === "ArrowLeft") {
        setEnlargedIndex((index) =>
          index === null ? null : (index - 1 + impactResults.length) % impactResults.length,
        );
      }
      if (event.key === "ArrowRight") {
        setEnlargedIndex((index) =>
          index === null ? null : (index + 1) % impactResults.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enlargedIndex]);

  return (
    <>
      <div className="relative mx-auto mt-5 w-full max-w-[760px] px-8 sm:px-10">
        <Carousel setApi={setApi} opts={{ loop: false, duration: 36 }} aria-label="Abaqus results">
          <CarouselContent className="ml-0">
            {impactResults.map((result, index) => (
              <CarouselItem key={result.title} className="pl-0">
                <figure>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEnlargedIndex(index)}
                    className="block h-auto w-full rounded-md border border-border bg-card p-0 ring-1 ring-primary/15 hover:bg-card"
                    aria-label={`Enlarge ${result.title}`}
                  >
                    <span className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden">
                      <LoadingImage
                        src={result.src}
                        alt={result.alt}
                        className="flex h-full w-full items-center justify-center"
                        imgClassName="block max-h-full w-full object-contain"
                      />
                    </span>
                  </Button>
                  <figcaption className="mt-3 text-center text-sm font-semibold">
                    {result.title}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <CarouselArrow
          direction="prev"
          onClick={() => api?.scrollPrev()}
          label="Previous Abaqus result"
          disabled={selectedIndex === 0}
        />
        <CarouselArrow
          direction="next"
          onClick={() => api?.scrollNext()}
          label="Next Abaqus result"
          disabled={selectedIndex === impactResults.length - 1}
        />
        <div className="mt-4 flex justify-center gap-2" aria-label="Select Abaqus result">
          {impactResults.map((result, index) => (
            <Button
              key={result.title}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollTo(index)}
              className="size-5 rounded-full p-0"
              aria-label={`Show ${result.title}`}
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

      {enlargedIndex !== null && impactResults[enlargedIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={impactResults[enlargedIndex].title}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase text-muted-foreground">
              {enlargedIndex + 1} / {impactResults.length}
            </p>
            <Button type="button" variant="outline" onClick={() => setEnlargedIndex(null)}>
              Close
            </Button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-8 py-4 sm:px-12">
            <CarouselArrow
              direction="prev"
              onClick={() =>
                setEnlargedIndex(
                  (enlargedIndex - 1 + impactResults.length) % impactResults.length,
                )
              }
              label="Previous enlarged result"
            />
            <figure className="flex min-h-0 max-h-full w-full max-w-6xl flex-col items-center gap-4">
              <img
                src={impactResults[enlargedIndex].src}
                alt={impactResults[enlargedIndex].alt}
                className="max-h-[75vh] max-w-full rounded-md border border-border object-contain"
              />
              <figcaption className="text-center text-sm text-muted-foreground">
                {impactResults[enlargedIndex].title}
              </figcaption>
            </figure>
            <CarouselArrow
              direction="next"
              onClick={() => setEnlargedIndex((enlargedIndex + 1) % impactResults.length)}
              label="Next enlarged result"
            />
          </div>
        </div>
      )}
    </>
  );
}

type ExperienceCard = {
  id: string;
  organization: string;
  role: string;
  duration: string;
  type: string;
  status?: string;
  overview: string;
  detail: React.ReactNode;
};

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-8">
      <p className="section-kicker">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ExperienceDetailPanel({
  card,
  onClose,
}: {
  card: ExperienceCard | null;
  onClose: () => void;
}) {
  useOverlayScrollLock(Boolean(card));

  React.useEffect(() => {
    if (!card) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-background">
      <DetailNavigation onBack={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${card.role} details`}
        className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-background"
      >
        <header className="border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-4 px-5 py-5 sm:px-8">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[10px] uppercase text-primary">
              {card.type} · {card.duration}
            </p>
            <h2 className="text-xl font-bold leading-snug sm:text-2xl">{card.role}</h2>
            <p className="mt-2 text-sm text-foreground/80">{card.organization}</p>
          </div>

          </div>
        </header>
        <div className="w-full">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-8 sm:px-8">{card.detail}</div>
        </div>
      </aside>
    </div>
  );
}

function ExperienceCarousel({
  cards,
  label,
  titleFirst = false,
}: {
  cards: ExperienceCard[];
  label: string;
  titleFirst?: boolean;
}) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const active = cards.find((card) => card.id === openId) ?? null;
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
  }, [cards, updateScrollState]);

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
          className="flex w-full snap-x snap-mandatory items-stretch gap-px overflow-x-auto overscroll-x-contain bg-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label={label}
        >
          {cards.map((card) => (
            <article
              key={card.id}
              role="listitem"
              onClick={() => setOpenId(card.id)}
              className="flex w-full md:w-[calc((100%-1px)/2)] shrink-0 cursor-pointer snap-start flex-col self-stretch bg-background transition-colors hover:bg-card"
            >
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-3 font-mono text-[10px] uppercase text-primary">{card.type}</p>
                {titleFirst ? (
                  <>
                    <h3 className="text-lg font-semibold leading-snug">{card.role}</h3>
                    <p className="mt-2 font-mono text-[10px] uppercase text-primary">
                      {card.organization}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[10px] uppercase text-primary">
                      {card.organization}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug">{card.role}</h3>
                  </>
                )}
                <p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
                  {card.duration}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {card.overview}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenId(card.id);
                    }}
                    className="border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Know more →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <CarouselArrow
          direction="prev"
          onClick={() => scrollCards("prev")}
          label={`Previous ${label}`}
          disabled={!canScrollPrev}
        />
        <CarouselArrow
          direction="next"
          onClick={() => scrollCards("next")}
          label={`Next ${label}`}
          disabled={!canScrollNext}
        />
      </div>

      <ExperienceDetailPanel card={active} onClose={() => setOpenId(null)} />
    </>
  );
}

function researchDetail(entry: ResearchEntry) {
  return (
    <>
      {entry.description && (
        <DetailBlock title="Project overview">
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
        </DetailBlock>
      )}
      {entry.contributions && entry.contributions.length > 0 && (
        <DetailBlock title="My Contributions">
          <DetailList items={entry.contributions} />
        </DetailBlock>
      )}
      {entry.cadModelPending && (
        <DetailBlock title="Interactive CAD Model">
          <FixtureCadModels />
        </DetailBlock>
      )}
      {entry.resultImages && entry.resultImages.length > 0 && (
        <DetailBlock title="Abaqus Results Gallery">
          <ResultsCarousel />
        </DetailBlock>
      )}
      {entry.technicalDetails && entry.technicalDetails.length > 0 && (
        <DetailBlock title="Technical work">
          <DetailList items={entry.technicalDetails} />
        </DetailBlock>
      )}
      {entry.tags && entry.tags.length > 0 && (
        <DetailBlock title="Technical Tags">
          <TagList tags={entry.tags} />
        </DetailBlock>
      )}
    </>
  );
}

export function ResearchAndInternshipExperience() {
  const researchCards: ExperienceCard[] = researchExperience.map((entry) => ({
    id: entry.id,
    organization: entry.organization,
    role: entry.role,
    duration: entry.duration,
    type: entry.type,
    ...(entry.status ? { status: entry.status } : {}),
    overview: entry.description ?? "",
    detail: researchDetail(entry),
  }));

  const internshipCards: ExperienceCard[] = [
    {
      id: internshipExperience.id,
      organization: internshipExperience.organization,
      role: internshipExperience.designation,
      duration: internshipExperience.duration,
      type: internshipExperience.type,
      overview: internshipExperience.description,
      detail: (
        <>
          <DetailBlock title="Internship overview">
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {internshipExperience.description}
            </p>
          </DetailBlock>
          <DetailBlock title="My Contributions">
            <DetailList items={internshipExperience.technicalDetails} />
          </DetailBlock>
          <DetailBlock title="Computational Outputs">
            <GraphCarousel />
          </DetailBlock>
          <DetailBlock title="Technical Documentation">
            <a
              href="https://drive.google.com/file/d/1lLHOACjwFfkXJBp1fvmQDcigU-1QfJc_/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              DOCUMENT ↗
            </a>
          </DetailBlock>
        </>
      ),
    },
  ];

  return (
    <ExperienceCarousel
      cards={[...researchCards.slice(0, 1), ...internshipCards, ...researchCards.slice(1)]}
      label="Research and internship cards"
      titleFirst
    />
  );
}
