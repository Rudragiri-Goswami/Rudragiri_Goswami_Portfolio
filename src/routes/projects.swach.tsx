import { DetailNavigation } from "@/components/portfolio/DetailNavigation";
import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CadViewer } from "@/components/portfolio/CadViewer";

export const Route = createFileRoute("/projects/swach")({
  component: SwachPage,
  head: () => ({
    meta: [
      {
        title:
          "SWACH: Smart Waste Autonomous Collector and Handler | Rudragiri Goswami",
      },
      {
        name: "description",
        content:
          "SWACH is an innovative solar-powered autonomous waste management robot designed for automated waste collection and handling in public and community spaces.",
      },
      {
        property: "og:title",
        content:
          "SWACH: Smart Waste Autonomous Collector and Handler | Rudragiri Goswami",
      },
      {
        property: "og:description",
        content:
          "A project detail page for SWACH, an innovative solar-powered autonomous waste management robot for automated waste collection and handling in public and community spaces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

// The model is a Vercel static asset, not a Lovable-only /__l5e URL.
const swachModelUrl = "/models/swach_ex_r5.0.glb";
const swachDocumentationUrl =
  "https://drive.google.com/file/d/1qf69qUAa4l9ZY_lWVmI7rZpCddKuqWYz/view?usp=drive_link";

const technicalSections = [
  {
    title: "Hardware",
    items: [
      "Aluminium structural frame",
      "Four-wheel mobility platform",
      "DC gear motors",
      "Servo motors",
      "Stepper motor",
      "Ultrasonic sensors",
      "Front and rear cameras",
      "Raspberry Pi",
      "Arduino Mega 2560",
      "Motor drivers",
      "Solar panels",
      "MPPT controller",
      "Battery and power regulation",
    ],
  },
  {
    title: "Mechanisms",
    items: [
      "Loader bucket mechanism for collecting waste from the ground.",
      "Lead-screw-driven flap mechanism for controlled opening and closing of the collection assembly.",
      "Segregation mechanism for directing waste into biodegradable and non-biodegradable categories.",
      "Pulley-driven bin mechanism for positioning the internal bins during waste disposal.",
      "Rear-facing bin disposal mechanism for transferring collected waste into designated disposal locations.",
    ],
  },
  {
    title: "Waste Detection & Segregation",
    items: [
      "Camera-based waste detection.",
      "YOLO-based object detection and classification.",
      "Classification of biodegradable and non-biodegradable waste.",
    ],
  },
  {
    title: "Autonomous Navigation",
    items: [
      "Autonomous path planning.",
      "Obstacle avoidance.",
      "Camera-based environmental perception.",
      "Ultrasonic distance sensing.",
      "ROS-based navigation architecture.",
    ],
  },
  {
    title: "Power System",
    items: [
      "Solar panels for energy generation.",
      "MPPT controller for solar power management.",
      "Battery storage.",
      "Power regulation for motors and electronic systems.",
    ],
  },
  {
    title: "Software & Development",
    items: ["YOLO", "ROS", "Gazebo", "Arduino IDE", "Raspberry Pi Environment", "SolidWorks"],
  },
];

const contributions = [
  "Contributed to the conceptualisation and development of the SWACH system, helping define its functional workflow and integrated waste-management approach.",
  "Prepared and structured the technical documentation and system representation, including CAD views, system architecture, mechanisms, component descriptions, working principle, and proposed implementation methodology.",
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

function SwachPage() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background font-display text-foreground selection:bg-primary selection:text-primary-foreground">
      <DetailNavigation />

      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <div>
          <h1 className="break-words text-3xl font-bold leading-snug sm:text-4xl">
            SWACH: Smart Waste Autonomous Collector and Handler
          </h1>
          <p className="mt-3 font-mono text-[10px] uppercase text-primary sm:text-[11px]">
            Team DRISHTI | Technical Member
          </p>
        </div>

        <div className="mt-10 grid gap-10">
          <Block title="Project Overview">
            <p className="text-sm leading-relaxed text-muted-foreground">
              SWACH (Smart Waste Autonomous Collector and Handler) is an innovative
              solar-powered autonomous waste management robot designed for automated waste
              collection and handling in public and community spaces. The system integrates
              waste detection, autonomous navigation, collection, segregation, and disposal,
              with camera and sensor-based perception and solar-assisted power management.
            </p>
          </Block>

          <Block title="CAD MODEL">
            <CadViewer
              src={swachModelUrl}
              title="SWACH CAD Model"
              loadingLabel="Loading CAD Model..."
              emptyLabel="CAD model coming soon"
              modelRotation={[-Math.PI / 2, 0, 0]}
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
            <ul className="grid gap-2 sm:grid-cols-2">
              {contributions.map((item) => (
                <Bullet key={item}>{item}</Bullet>
              ))}
            </ul>
          </Block>

          <Block title="Technical Documentation">
            {swachDocumentationUrl ? (
              <a
                href={swachDocumentationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block border border-primary/60 px-4 py-2 font-mono text-[11px] uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                DOCUMENT ↗
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-block cursor-not-allowed border border-primary/30 px-4 py-2 font-mono text-[11px] uppercase text-primary/60"
              >
                DOCUMENT ↗
              </span>
            )}
          </Block>
        </div>
        </div>
      </main>
    </div>
  );
}
