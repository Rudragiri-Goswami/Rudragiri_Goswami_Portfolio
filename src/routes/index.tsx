import { createFileRoute } from "@tanstack/react-router";
import { AtSign, Linkedin, Phone } from "lucide-react";

const RESUME_URL =
  "https://drive.google.com/file/d/1ARk7t-DKg4gUeSjHCAt1qJhacHejvF1R/view?usp=drive_link";
const orderedShowcaseProjects = [...showcaseProjects].sort((a, b) => {
  if (a.id === "pathfinder" && b.id === "line-follower") return -1;
  if (a.id === "line-follower" && b.id === "pathfinder") return 1;
  return 0;
});
import {
  achievements,
  certifications,
  education,
  electives,
  navItems,
  profile,
  positions,
  showcaseProjects,
} from "@/content/portfolio";
import { Section } from "@/components/portfolio/Section";
import { Certifications } from "@/components/portfolio/Certifications";
import { OrdinalText } from "@/components/portfolio/OrdinalText";
import { Positions } from "@/components/portfolio/Positions";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { ResearchAndInternshipExperience } from "@/components/portfolio/InternshipExperience";
import { CourseworkProjects } from "@/components/portfolio/CourseworkProjects";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rudragiri Goswami | Mechanical Engineering Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Rudragiri Goswami, mechanical engineering student at SVNIT Surat - projects, research, simulation, sustainable engineering, leadership, and competitions.",
      },
      {
        property: "og:title",
        content: "Rudragiri Goswami | Mechanical Engineering Portfolio",
      },
      {
        property: "og:description",
        content:
          "Mechanical engineering projects, research and data analysis, sustainable engineering, leadership, and competition work by Rudragiri Goswami.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-display text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-end gap-4 px-5 py-2 sm:px-6">
          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap items-center justify-end gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase sm:gap-x-3 md:text-[11px] lg:gap-x-5"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = item.href.slice(1);
                  const el = document.getElementById(id);
                  const navbar = document.querySelector("header");
                  const navH = navbar ? navbar.getBoundingClientRect().height : 56;
                  if (el)
                    window.scrollTo({
                      top: Math.max(el.getBoundingClientRect().top + window.scrollY - navH, 0),
                      behavior: "smooth",
                    });
                }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              <span aria-hidden="true">↓</span> Resume
            </a>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Hero */}
        <section
          aria-label="Introduction"
          className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-start pb-16 pt-10 sm:pb-20 sm:pt-12"
        >
          <div className="max-w-4xl">
            <div className="min-w-0">
              <h1 className="font-display text-[11vw] font-extrabold uppercase leading-[1.04] tracking-tight text-foreground sm:text-[3.5rem] sm:leading-[1.04] md:text-[4rem] lg:text-[3.75rem] lg:whitespace-nowrap xl:text-[4.5rem]">
                Rudragiri Goswami
              </h1>
              <p className="mt-4 max-w-3xl text-xl text-muted-foreground sm:text-2xl lg:text-[1.9rem] lg:leading-snug">
                Exploring ideas. Analysing possibilities. Creating impact.
              </p>
              <p className="mt-3 font-mono text-lg uppercase tracking-widest text-primary sm:text-xl lg:text-2xl">
                Final Year Mechanical Major @ SVNIT Surat
              </p>
            </div>
          </div>
          <div className="mt-10 flex w-full justify-start sm:mt-12">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                // Match the ABOUT navbar click exactly: target section container,
                // subtract only the navbar height, no extra breathing.
                const el = document.getElementById("about");
                const navbar = document.querySelector("header");
                const navH = navbar ? navbar.getBoundingClientRect().height : 56;
                if (el)
                  window.scrollTo({
                    top: Math.max(el.getBoundingClientRect().top + window.scrollY - navH, 0),
                    behavior: "smooth",
                  });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore My Work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        {/* About */}
        <Section
          id="about"
          title={<span className="flex flex-col items-start"><span>About</span><span className="text-primary">Me</span></span>}
        >
          <div className="max-w-3xl space-y-5 text-justify text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I’m a final-year Mechanical Engineering student at SVNIT Surat, driven by curiosity
              and a desire to explore ideas beyond a single discipline. I enjoy stepping into
              unfamiliar areas, understanding how things work, and connecting concepts across
              different fields. What excites me most is the process of conceptualising an idea,
              analysing its possibilities and limitations, and refining it into a practical
              solution.
            </p>
            <p>
              My experience and interests span robotics, mechanical design, simulation, data
              analysis, astronomy and astrophysics, and engineering research, alongside a growing
              interest in business and how ideas can create real-world value. I enjoy learning
              through projects, experimentation, and problem solving, and I’m always looking for
              new areas to explore, new perspectives to understand, and better ways to turn ideas
              into something meaningful.
            </p>
          </div>
        </Section>

        {/* Research and internship experience */}
        <Section id="experience" title="Experience">
          <ResearchAndInternshipExperience />
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          kicker="Projects"
          title="Robotics"
          aside="Scroll horizontally · open a card for the full case study"
          className="py-8 sm:py-10 pb-14 sm:pb-16"
          compact
        >
          <ProjectShowcase projects={orderedShowcaseProjects} />
        </Section>

        {/* Achievements */}
        <Section
          id="achievements"
          title="Achievements"
          className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-12 sm:py-14"
        >
          <ol className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {achievements.map((item) => (
              <li key={item.title} className="bg-background p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  {item.organization}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug">
                  <OrdinalText text={item.title} />
                </h3>
                {"supportingLine" in item && item.supportingLine ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.supportingLine}
                  </p>
                ) : null}
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Positions of Responsibility */}
        <Section
          id="positions"
          kicker="Leadership & extracurriculars"
          title="Positions of Responsibility"
        >
          <Positions entries={positions} />
        </Section>

        {/* Education */}
        <Section
          id="education"
          kicker="Education"
          title="Academic Record"
          className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-12 sm:py-14"
        >
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            {/* Featured qualification */}
            <div className="md:col-span-5">
              <article className="relative flex h-full flex-col border border-border bg-card p-6 sm:p-7">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-primary"
                />
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Current stage
                </p>
                <h3 className="mt-3 text-xl font-bold leading-tight sm:text-2xl">
                  {education.featured.degree}
                </h3>
                <p className="mt-1 text-base text-foreground/85">
                  {education.featured.discipline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {education.featured.institution}
                </p>
                <div className="mt-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-border pt-5 md:mt-auto">
                  <div>
                    <p className="text-2xl font-bold tabular-nums tracking-tight">
                      {education.featured.cgpa}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Current CGPA
                    </p>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {education.featured.period}
                  </p>
                </div>
              </article>
            </div>

            {/* Chronological progression */}
            <div className="md:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Academic progression
              </p>
              <ol className="relative mt-6 space-y-7 border-l border-border pl-6 sm:pl-8">
                {(["higher-secondary", "gujcet", "secondary"] as const).map(
                  (id) => education.milestones.find((m) => m.id === id)!,
                ).map((milestone) => (
                  <li key={milestone.id} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[calc(1.5rem+4px)] top-1.5 h-2 w-2 rounded-full bg-primary sm:-left-[calc(2rem+4px)]"
                    />
                    <div className="grid gap-x-6 gap-y-1 sm:grid-cols-[1fr_auto]">
                      <h3 className="text-base font-semibold leading-snug">
                        {milestone.qualification}
                      </h3>
                      <p className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:justify-self-end sm:pt-0.5">
                        {milestone.year}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{milestone.authority}</p>
                    <p className="mt-2.5 text-base font-semibold tabular-nums text-foreground">
                      {milestone.result}
                    </p>
                    {milestone.subResult && (
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                        {milestone.subResult}
                      </p>
                    )}
                    {milestone.subResultNote && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground/70">
                        {milestone.subResultNote}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* Academic electives */}
        <Section id="electives" kicker="Academic electives" title="Selected Coursework">
          <div className="grid gap-x-14 gap-y-8 md:grid-cols-2">
            {(["left", "right"] as const).map((column) => (
              <ul key={column} className="space-y-3.5">
                {electives
                  .filter((elective) => elective.column === column)
                  .map((elective) => (
                    <li
                      key={elective.id}
                      className="group flex items-baseline gap-3.5 border-b border-border/60 pb-3.5 transition-colors duration-200 hover:border-primary/60"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-primary transition-transform duration-200 group-hover:scale-125"
                      />
                      <span className="text-base leading-relaxed text-foreground/90 group-hover:text-foreground">
                        {elective.name}
                      </span>
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </Section>

        {/* Coursework projects */}
        <Section id="coursework-projects" kicker="Academic work" title="Coursework Projects">
          <CourseworkProjects />
        </Section>

        {/* Certifications */}
        <Section
          id="certifications"
          kicker="Professional Credentials"
          title="Certifications"
          className="flex min-h-[calc(100svh-3.5rem)] flex-col py-10 sm:py-12"
        >
          <Certifications entries={certifications} />
        </Section>

        {/* Contact */}

        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-14 border-b border-border py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="section-kicker">Contact</p>
            <h2
              id="contact-title"
              className="mt-3 text-4xl font-extrabold leading-none sm:text-5xl"
            >
              Let's Engineer what’s next.
            </h2>
            <p className="mt-5 text-xl font-semibold text-foreground/90 sm:text-2xl">
              Imagine. Explore. Innovate. Evolve.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85"
              >
                <AtSign className="size-4 shrink-0" aria-hidden="true" />
                <span className="break-all">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {profile.phone}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground"
              >
                <Linkedin className="size-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Open to ideas, collaborations, and opportunities.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 font-mono text-[10px] uppercase text-muted-foreground sm:px-6">
          <p>© 2026 {profile.name} · SVNIT Surat</p>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            Resume →
          </a>
        </div>
      </footer>
    </div>
  );
}
