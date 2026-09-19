import { DetailNavigation } from "./DetailNavigation";
import * as React from "react";
import { CadViewer } from "./CadViewer";
import legoModel from "@/assets/lego_exr.glb.asset.json";
import magicBallModel from "@/assets/magic_ball_exr.glb.asset.json";
import beamEngineModel from "@/assets/beam_engine_exr.glb.asset.json";
import { useOverlayScrollLock } from "@/hooks/use-overlay-scroll-lock";

const reports = {
  additive:
    "https://drive.google.com/file/d/1F1KLkRYELFCFsQRUsDXTo0A3zpgLs9_c/view?usp=sharing",
  analytics:
    "https://drive.google.com/file/d/1J6Z5YTq95S1JAo5jN9cqSRS5MMmc7bOw/view?usp=drive_link",
  machines:
    "https://drive.google.com/file/d/17VdDgpqv7f9ONxJcpqCuLRgqi81uwiGR/view?usp=drive_link",
};

const VIEWPORT = "h-[320px] sm:h-[400px] lg:h-[450px]";

type CourseworkId = "additive" | "machines" | "analytics";

type CourseworkProject = {
  id: CourseworkId;
  index: string;
  course: string;
  title: string;
  overview: string;
  description: string;
  report: string;
};

const courseworkProjects: CourseworkProject[] = [
  {
    id: "additive",
    index: "01",
    course: "Additive Manufacturing",
    title: "FDM 3D Printing - LEGO Minifigure & Magic Ball",
    overview:
      "Fabrication of 3D Printed LEGO Minifigure and Magic Ball using the FDM Process.",
    description:
      "Designed two 3D CAD models in SolidWorks and followed the FDM workflow from CAD modelling and STL conversion to slicing, G-code generation, machine setup, printing, and post-processing.",
    report: reports.additive,
  },
  {
    id: "machines",
    index: "02",
    course: "Theory of Machines",
    title: "Beam Engine",
    overview:
      "Study of the Beam Engine mechanism, working principle, components, historical development, and applications.",
    description:
      "Analysed the Beam Engine as a six-link mechanism converting rotary crank motion into linear sliding motion, covering its components, working principle, and historical development.",
    report: reports.machines,
  },
  {
    id: "analytics",
    index: "03",
    course: "Data Analytics in Smart Manufacturing",
    title: "Surface Roughness Prediction using Multiple Linear Regression",
    overview:
      "Application of Multiple Linear Regression for Predicting Surface Roughness in CNC Machining Process.",
    description:
      "Applied exploratory data analysis and multiple linear regression to study the relationship between CNC machining parameters and surface roughness.",
    report: reports.analytics,
  },
];

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tag) => (
        <li
          key={tag}
          className="border border-border px-2 py-1 font-mono text-[10px] uppercase text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-1.5">
      <span className="font-mono text-[10px] uppercase text-muted-foreground">{label}</span>
      <span className="text-right text-xs text-foreground/90">{value}</span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Report({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block self-start border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      Document ↗
    </a>
  );
}

function AdditiveDetail() {
  const models = [
    { id: "lego", label: "Lego Minifigure", name: "LEGO Minifigure", src: legoModel.url },
    { id: "ball", label: "Magic Ball", name: "Magic Ball", src: magicBallModel.url },
  ];
  const [active, setActive] = React.useState(models[0]!.id);
  const current = models.find((model) => model.id === active) ?? models[0]!;

  return (
    <div className="grid gap-8">
      <Block title="Project overview">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Designed two 3D CAD models in SolidWorks - a LEGO Minifigure and a Magic Ball - and
          followed the FDM workflow from CAD modelling and STL conversion to slicing, G-code
          generation, machine setup, printing, and post-processing. The LEGO Minifigure presented
          challenges due to its intricate geometry, while the Magic Ball achieved comparatively
          better print quality after parameter and support adjustments.
        </p>
      </Block>

      <Block title="CAD model">
        <div className="flex gap-1.5">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => setActive(model.id)}
              aria-pressed={active === model.id}
              className={`border px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                active === model.id
                  ? "border-primary/60 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>
        <CadViewer
          key={current.id}
          src={current.src}
          title={current.name}
          className="mt-3"
          viewportClassName={VIEWPORT}
          loadingLabel="Loading 3D CAD..."
        />
        <p className="mt-3 text-center font-mono text-[10px] uppercase text-muted-foreground">
          Interactive CAD Model · <span className="text-primary">{current.name}</span>
        </p>
      </Block>

      <Block title="Technical details">
        <div className="grid gap-1.5">
          <Detail label="CAD" value="SolidWorks" />
          <Detail label="Material" value="PLA" />
          <Detail label="Build volume" value="50 × 50 × 50 mm" />
          <Detail label="Nozzle" value="220°C" />
          <Detail label="Bed" value="70°C" />
          <Detail label="Layer height" value="0.2 mm" />
          <Detail label="Infill" value="15%" />
        </div>
      </Block>

      <Block title="Technical tags">
        <Tags items={["SolidWorks", "FDM", "3D CAD", "STL", "G-code", "PLA"]} />
      </Block>

      <Report href={reports.additive} />
    </div>
  );
}

function MachinesDetail() {
  return (
    <div className="grid gap-8">
      <Block title="Project overview">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Analysed the Beam Engine as a six-link mechanism that converts rotary motion of the crank
          into linear motion of a vertical sliding link. Studied its key components, working
          principle, historical development, and major types including Newcomen, Watt, and Cornish
          Beam Engines.
        </p>
      </Block>

      <Block title="CAD model">
        <CadViewer
          src={beamEngineModel.url}
          title="Beam Engine"
          viewportClassName={VIEWPORT}
          loadingLabel="Loading 3D CAD..."
        />
        <p className="mt-3 text-center font-mono text-[10px] uppercase text-muted-foreground">
          Interactive CAD Model · <span className="text-primary">Beam Engine</span>
        </p>
      </Block>

      <Block title="Mechanism details">
        <div className="grid gap-1.5">
          <Detail label="Mechanism" value="Six-link mechanism" />
          <Detail label="Motion" value="Rotary → Linear" />
          <Detail
            label="Key components"
            value="Beam, piston & cylinder, flywheel, crankshaft, condenser, support structure"
          />
          <Detail label="Types studied" value="Newcomen, Watt, Cornish" />
        </div>
      </Block>

      <Block title="Technical tags">
        <Tags
          items={["Mechanisms", "Kinematics", "Six-Link Mechanism", "Beam Engine", "Steam Engines"]}
        />
      </Block>

      <Report href={reports.machines} />
    </div>
  );
}

function AnalyticsDetail() {
  return (
    <div className="grid gap-8">
      <Block title="Project overview">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Applied exploratory data analysis and multiple linear regression to study the relationship
          between CNC machining parameters and surface roughness. Cutting speed, feed rate, and depth
          of cut were used as input variables, with surface roughness (Ra) as the predicted output.
        </p>
      </Block>

      <Block title="Workflow">
        <ol className="grid gap-1.5">
          {[
            "Dataset",
            "Exploratory Data Analysis",
            "Correlation Analysis",
            "Train/Test Split",
            "Linear Regression",
            "Prediction",
            "Model Evaluation",
          ].map((step) => (
            <li key={step} className="flex items-baseline gap-2 text-sm text-muted-foreground">
              <span aria-hidden="true" className="text-primary">
                →
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Analysis">
        <div className="grid gap-1.5">
          <Detail label="Inputs" value="Cutting Speed · Feed Rate · Depth of Cut" />
          <Detail label="Output" value="Surface Roughness (Ra)" />
          <Detail label="Model" value="Multiple Linear Regression" />
        </div>
      </Block>

      <Block title="Results">
        <div className="grid gap-1.5">
          <Detail label="R² score" value="0.939591836734693" />
          <Detail label="Mean squared error" value="0.003775510204081612" />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed text-muted-foreground">
          Model evaluation using R² score and Mean Squared Error.
        </p>
      </Block>

      <Block title="Technical tags">
        <Tags
          items={[
            "Python",
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Seaborn",
            "Scikit-learn",
            "Linear Regression",
          ]}
        />
      </Block>

      <Report href={reports.analytics} />
    </div>
  );
}

function CourseworkDetail({
  project,
  onClose,
}: {
  project: CourseworkProject | null;
  onClose: () => void;
}) {
  useOverlayScrollLock(Boolean(project));

  React.useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-background">
      <DetailNavigation onBack={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        className="min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-background"
      >
        <header className="border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-4 px-5 py-5 sm:px-8">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-[10px] uppercase text-primary">{project.course}</p>
            <h2 className="text-xl font-bold leading-snug sm:text-2xl">{project.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>
          </div>

          </div>
        </header>

        <div className="w-full">
          <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
          {project.id === "additive" && <AdditiveDetail />}
          {project.id === "machines" && <MachinesDetail />}
          {project.id === "analytics" && <AnalyticsDetail />}
          </div>
        </div>
      </aside>
    </div>
  );
}

export function CourseworkProjects() {
  const [openId, setOpenId] = React.useState<CourseworkId | null>(null);
  const active = courseworkProjects.find((project) => project.id === openId) ?? null;

  return (
    <>
      <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
        {courseworkProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => setOpenId(project.id)}
            className="flex h-full cursor-pointer flex-col bg-background p-6 transition-colors hover:bg-card/40 sm:p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[10px] uppercase text-primary">{project.course}</p>
              <span className="font-mono text-[10px] text-muted-foreground">{project.index}</span>
            </div>
            <h3 className="mt-3 text-lg font-bold leading-snug">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{project.overview}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-auto pt-6">
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
            </div>
          </article>
        ))}
      </div>

      <CourseworkDetail project={active} onClose={() => setOpenId(null)} />
    </>
  );
}
