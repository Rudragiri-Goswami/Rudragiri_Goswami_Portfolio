import { DetailNavigation } from "@/components/portfolio/DetailNavigation";
import type { ReactNode } from "react";
import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CadViewer } from "@/components/portfolio/CadViewer";
import { OrdinalText } from "@/components/portfolio/OrdinalText";
import { LoadingImage } from "@/components/portfolio/LoadingImage";

export const Route = createFileRoute("/projects/aar")({
  component: AarPage,
  head: () => ({
    meta: [
      {
        title: "AAR: Autonomous Agricultural Robot for Precision Farming | Rudragiri Goswami",
      },
      {
        name: "description",
        content:
          "AAR is an autonomous agricultural robot for precision farming, integrating soil sensing, autonomous navigation, targeted spraying, and structured field traversal.",
      },
      {
        property: "og:title",
        content: "AAR: Autonomous Agricultural Robot for Precision Farming | Rudragiri Goswami",
      },
      {
        property: "og:description",
        content:
          "A technical project detail page for AAR, an autonomous agricultural robot integrating soil sensing, navigation, targeted spraying, and structured field traversal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects/aar" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/projects/aar" }],
  }),
});

const technicalSections = [
  {
    title: "Mechanical System",
    items: [
      "Soil-sensor actuation mechanism",
      "Independent passive suspension units derived from double-wishbone geometry",
      "Four-wheel drive configuration",
      "Lead-screw-based spraying mechanism",
      "Rack-and-pinion nozzle positioning",
      "Fluid storage and delivery assembly",
    ],
  },
  {
    title: "Electronics & Instrumentation",
    items: [
      "Raspberry Pi 4",
      "ESP32",
      "HC-SR04 ultrasonic sensors",
      "Rotary encoders",
      "Motor drivers",
      "LiPo battery and power regulation",
      "Camera-based sensing and system monitoring",
    ],
  },
  {
    title: "Autonomous System",
    items: [
      "Camera-based navigation",
      "Obstacle detection and avoidance",
      "Soil sensing and data acquisition",
      "Marker-based spraying operation",
      "ROS-based system coordination",
      "YOLO-based crop and weed detection",
    ],
  },
  {
    title: "Engineering Analysis",
    items: [
      "Total weight calculation",
      "Drive-motor torque requirement",
      "Locomotion runtime estimation",
      "Spraying-assembly lifting torque",
      "Rack-and-pinion force calculation",
    ],
  },
];

const contributions = [
  "Led the end-to-end conceptualisation and system development of AAR, translating the precision-farming requirements into an integrated architecture covering soil sensing, mobility, autonomous navigation, and targeted spraying.",
  "Developed and refined the mechanical architecture, including the independent passive suspension units derived from double-wishbone geometry, soil-sensor actuation, lead-screw-based spraying actuation, rack-and-pinion nozzle positioning, and fluid-delivery assembly.",
  "Performed system-level engineering calculations and design analysis, including total operating weight, drive-motor torque, locomotion runtime, spraying-assembly lifting torque, and rack-and-pinion force requirements.",
  "Oversaw the ECE subsystem and hardware integration, coordinating the Raspberry Pi 4, ESP32, motor drivers, ultrasonic sensing, rotary encoders, camera interface, servo control, and power-distribution architecture.",
  "Worked across the autonomous-control and perception stack, including ROS-based system coordination, camera-based navigation, obstacle detection, soil-data acquisition, marker-based spraying logic, and YOLO-based crop/weed detection.",
  "Analysed the R1-to-R2 design evolution, evaluating changes to the soil-interaction mechanism, nozzle translation, spraying actuation, camera configuration, navigation, and suspension system for improved fabrication feasibility and system stability.",
  "Prepared the complete technical documentation and engineering representation, including CAD views, electrical schematics, system flowcharts, calculations, technical figures, software architecture, and fabrication documentation.",
  "Led the technical presentation of AAR at GUJCOST Robofest 5.0 and prepared the documentation supporting its provisional patent grant and ₹50,000 funding.",
];

const achievements = [
  {
    event: "GUJCOST Robofest 5.0 (Senior Category)",
    title: "Ranked 25th out of 1,000+ Nationwide",
    description: "India’s Biggest Robotics Competition",
  },
  {
    event: "GUJCOST Robofest 5.0 (Senior Category)",
    title: "Provisional Patent Grant & ₹50,000 Funding",
    description: "India’s Biggest Robotics Competition",
  },
];

const documents = [
  {
    round: "Round 1",
    url: "https://drive.google.com/file/d/16ETzkue2BxSBDy30lAXLcjAPwTt-n-CD/view?usp=drive_link",
  },
  {
    round: "Round 2",
    url: "https://drive.google.com/file/d/1jPRfZ81XgljUnGAhFyUI5ur_EsFdl61e/view?usp=drive_link",
  },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="section-kicker">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
      <span
        aria-hidden="true"
        className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
      />
      <span>{children}</span>
    </li>
  );
}

function GujcostCertificate() {
  const [enlarged, setEnlarged] = React.useState(false);
  const src = "/images/certificates/gujcost_cft.jpg";
  const driveUrl = "https://drive.google.com/file/d/1jJzlPoZ6q4pMHj40alLMNu5uCHXwj0TE/view?usp=drive_link";

  return (
    <>
      <figure className="max-w-sm border border-border bg-secondary/30">
        <button
          type="button"
          onClick={() => setEnlarged(true)}
          className="block aspect-[4/3] w-full overflow-hidden"
          aria-label="Enlarge GUJCOST certificate"
        >
          <LoadingImage
            src={src}
            alt="GUJCOST Robofest 5.0 certificate for AAR"
            className="flex h-full w-full items-center justify-center"
            imgClassName="h-full w-full object-contain"
          />
        </button>
      </figure>

      {enlarged && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="GUJCOST certificate"
          className="fixed inset-0 z-[110] flex flex-col bg-background/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="flex justify-end gap-2">
            <a
              href={driveUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
            >
              Open in new tab
            </a>
            <button
              type="button"
              onClick={() => setEnlarged(false)}
              className="border border-border px-4 py-2 font-mono text-[11px] uppercase transition-colors hover:border-foreground"
            >
              Close
            </button>
          </div>
          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
            <img
              src={src}
              alt="GUJCOST Robofest 5.0 certificate for AAR"
              className="max-h-[75vh] max-w-full border border-border object-contain"
            />
          </figure>
        </div>
      )}
    </>
  );
}

function AarPage() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background font-display text-foreground selection:bg-primary selection:text-primary-foreground">
      <DetailNavigation />

      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <div>
          <h1 className="break-words text-3xl font-bold leading-snug sm:text-4xl">
            AAR: Autonomous Agricultural Robot for Precision Farming
          </h1>
          <p className="mt-3 font-mono text-[10px] uppercase text-primary sm:text-[11px]">
            Team DRISHTI | Team Lead
          </p>
        </div>

        <div className="mt-10 grid gap-10">
          <Block title="Project Overview">
            <p className="text-sm leading-relaxed text-muted-foreground">
              AAR: Autonomous Agricultural Robot is designed for precision farming,
              integrating soil sensing, autonomous navigation, targeted spraying, and
              structured field traversal to support data-driven and resource-efficient
              agricultural operations. The system combines mechanical, electronic, and
              software subsystems for automated field-level sensing and intervention.
            </p>
          </Block>

          <Block title="CAD MODEL">
            <CadViewer
              src="/models/AAR.glb"
              title="AAR CAD Model"
              loadingLabel="Loading CAD Model..."
              emptyLabel="CAD model coming soon"
            />
          </Block>

          <Block title="Technical Implementation">
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {technicalSections.map((section) => (
                <section key={section.title} className="bg-background p-5 sm:p-6">
                  <h3 className="font-mono text-[10px] uppercase text-primary">
                    {section.title}
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    {section.items.map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </Block>

          <Block title="My Contributions">
            <ul className="grid gap-3 sm:grid-cols-2">
              {contributions.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </Block>

          <Block title="Achievement">
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {achievements.map((achievement) => (
                <article key={achievement.title} className="bg-background p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase text-primary">
                    {achievement.event}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    <OrdinalText text={achievement.title} />
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </article>
              ))}
            </div>
          </Block>

          <div className="grid gap-px border-t border-border pt-8 sm:grid-cols-2 sm:gap-10">
            {/* Left column: Certification */}
            <div>
              <h2 className="section-kicker">Certification</h2>
              <div className="mt-4">
                <GujcostCertificate />
              </div>
            </div>

            {/* Right column: Technical Documentation */}
            <div>
              <h2 className="section-kicker">Technical Documentation</h2>
              <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-2">
                {documents.map((document) => (
                  <article key={document.round} className="bg-background p-5 sm:p-6">
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">
                      {document.round}
                    </p>
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      DOCUMENT ↗
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
