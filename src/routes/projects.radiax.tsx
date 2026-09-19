import { DetailNavigation } from "@/components/portfolio/DetailNavigation";
import { createFileRoute } from "@tanstack/react-router";
import { CadViewer } from "@/components/portfolio/CadViewer";
import {
  radiaxDocumentationUrl,
  radiaxIterationOneModelUrl,
  radiaxIterationTwoModelUrl,
} from "@/content/portfolio";

export const Route = createFileRoute("/projects/radiax")({
  component: RadiaxPage,
  head: () => ({
    meta: [
      {
        title: "RADIAX - AGV for Radiopharmaceutical Material Handling | Rudragiri Goswami",
      },
      {
        name: "description",
        content:
          "RADIAX - a proposed compact Automated Guided Vehicle (AGV) concept for the safe transportation of radioactive vials and lead-shielded radiopharmaceutical containers, with an interactive 3D CAD model.",
      },
      {
        property: "og:title",
        content: "RADIAX - AGV for Radiopharmaceutical Material Handling | Rudragiri Goswami",
      },
      {
        property: "og:description",
        content:
          "Conceptual design of a compact AGV for radiopharmaceutical handling - two mechanical design iterations over a common electronics and ROS 2 navigation architecture, with an interactive 3D CAD model.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects/radiax" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="section-kicker">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const iterationOnePoints = [
  "Screw-actuated lifting mechanism for vertical positioning of the handling assembly, providing controlled vertical displacement through the linkage.",
  "Two-finger gripping mechanism for handling radioactive vials and lead-shielded containers.",
  "Mecanum-wheel drive platform for omnidirectional mobility.",
];

const iterationTwoPoints = [
  "Scissor-lift mechanism actuated by a lead screw for vertical extension.",
  "Parallel rack-and-pinion gripper with opposing racks for synchronized jaw movement.",
  "Compliant gripping pads for handling cylindrical vials and moderately irregular containers.",
  "Extension rods and counterweight arrangement to reduce wobble and maintain balance during lifting and manipulation.",
  "Mecanum-wheel drive platform for omnidirectional mobility.",
];

const systemArchitecture = [
  "Raspberry Pi 4",
  "Arduino Mega 2560",
  "ESP32",
  "RPLIDAR C1",
  "GPS NEO-M8N + IMU",
  "Camera module",
  "DC gear motors and motor drivers",
  "LiPo battery and LM2596 voltage converters",
  "ROS 2 for navigation, planning, and system integration",
  "Hardware kill switch for emergency motor shutdown",
];

const contributions = [
  "Contributed to the conceptualisation of RADIAX as an autonomous platform for radiopharmaceutical handling.",
  "Helped define the intended functional workflow and control architecture, including navigation, object detection, obstacle avoidance, lifting, and gripping operations.",
  "Prepared and organised the technical documentation, diagrams, component descriptions, methodology, and proposed implementation timeline.",
  "Reviewed the overall technical presentation to clearly communicate the project’s working principle, societal application, and proposed development pathway.",
];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
      <span
        aria-hidden="true"
        className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
      />
      {children}
    </li>
  );
}

function IterationCard({
  title,
  points,
  modelUrl,
  modelTitle,
}: {
  title: string;
  points: string[];
  modelUrl: string;
  modelTitle: string;
}) {
  return (
    <article className="bg-background p-5 sm:p-6">
      <h3 className="text-base font-semibold leading-snug">{title}</h3>
      <p className="mt-2 font-mono text-[10px] uppercase text-primary">Mechanical Design</p>
      <div className="mt-4">
        <CadViewer src={modelUrl} title={modelTitle} />
      </div>
      <ul className="mt-4 grid gap-2">
        {points.map((point) => (
          <Bullet key={point}>{point}</Bullet>
        ))}
      </ul>
    </article>
  );
}

function RadiaxPage() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background font-display text-foreground selection:bg-primary selection:text-primary-foreground">
      <DetailNavigation />

      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <div>
          <h1 className="text-3xl font-bold leading-snug sm:text-4xl">RADIAX</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Automated Guided Vehicle (AGV) for Radiopharmaceutical Material Handling
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase text-primary sm:text-[11px]">
            GUJCOST Proposal · Conceptual Design
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase text-muted-foreground sm:text-[11px]">
            Team DRISHTI | Technical Member
          </p>
        </div>

        <div className="mt-10 grid gap-10">
          <Block title="Project overview">
            <p className="text-sm leading-relaxed text-muted-foreground">
              RADIAX is a proposed compact Automated Guided Vehicle (AGV) designed for the
              safe and precise transportation of radioactive vials and lead-shielded
              radiopharmaceutical containers within controlled radiopharmacy environments.
              The project was developed through two mechanical design iterations, exploring
              different lifting and gripping mechanisms while retaining a common electronic
              hardware and autonomous navigation architecture.
            </p>
          </Block>

          <Block title="Design iterations">
            <p className="text-sm leading-relaxed text-muted-foreground">
              RADIAX evolved through two mechanical design iterations while retaining a
              common electronics and autonomous navigation architecture. Each iteration
              below includes its interactive 3D CAD model.
            </p>
            <div className="mt-6 grid gap-px border border-border bg-border lg:grid-cols-2">
              <IterationCard
                title="Iteration 01 - Initial Concept"
                points={iterationOnePoints}
                modelUrl={radiaxIterationOneModelUrl}
                modelTitle="RADIAX · Iteration 01 CAD Model"
              />
              <IterationCard
                title="Iteration 02 - Finalised Concept"
                points={iterationTwoPoints}
                modelUrl={radiaxIterationTwoModelUrl}
                modelTitle="RADIAX · Iteration 02 CAD Model"
              />
            </div>
          </Block>

          <Block title="Common system architecture">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold">Electronics &amp; Navigation</h3>
              <p className="font-mono text-[10px] uppercase text-muted-foreground">
                Shared by both mechanical iterations
              </p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {systemArchitecture.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </Block>

          <Block title="My contributions">
            <ul className="grid gap-2 sm:grid-cols-2">
              {contributions.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </Block>

          <Block title="Technical Documentation">
            {radiaxDocumentationUrl ? (
              <a
                href={radiaxDocumentationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Document ↗
              </a>
            ) : (
              <p className="font-mono text-[10px] uppercase text-muted-foreground">
                Technical documentation - link coming soon
              </p>
            )}
          </Block>
        </div>
        </div>
      </main>
    </div>
  );
}
