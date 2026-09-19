/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT YOUR PORTFOLIO CONTENT HERE
 *  Every section of the site reads from this file.
 *  Anything marked isPlaceholder: true is layout filler only.
 * ─────────────────────────────────────────────────────────────
 */

import lineFollowerSideView from "@/assets/line-follower-side-view.jpg.asset.json";
import lineFollowerBackView from "@/assets/line-follower-back-view.jpg.asset.json";
import lineFollowerFrontView from "@/assets/line-follower-front-view.jpg.asset.json";
import grpFinals from "@/assets/grp-2k24-finals.jpg.asset.json";
import grpCelebrations from "@/assets/grp-2k24-celebrations.jpg.asset.json";
import mindbendCertificate from "@/assets/mindbend-certificate.png.asset.json";
import pathfinderCertificate from "@/assets/pathfinder-certificate.png.asset.json";
import pathfinderFrontView from "@/assets/pathfinder-front-view.jpg.asset.json";
import pathfinderSideView from "@/assets/pathfinder-side-view.jpg.asset.json";
import pathfinderThreeQuarterView from "@/assets/pathfinder-three-quarter-view.jpg.asset.json";
import lineFollowerAbstract from "@/assets/robonovices-line-follower-abstract.pdf.asset.json";
import stabiloIsometric from "@/assets/stabilo-isometric.png.asset.json";
import stabiloFront from "@/assets/stabilo-front.png.asset.json";
import stabiloTop from "@/assets/stabilo-top.png.asset.json";
import stabiloSide from "@/assets/stabilo-side.png.asset.json";
import sentinelAlpha from "@/assets/S_Alpha.jpg.asset.json";
import sentinelBeta from "@/assets/S_Beta.png.asset.json";



export type GalleryImage = {
  /** Image URL or imported asset. Leave empty ("") to render a marked placeholder tile. */
  src?: string;
  caption?: string;
  alt?: string;
};

export type ProjectCategory =
  | "Mechanical Design"
  | "Robotics"
  | "Research"
  | "Sustainability"
  | "Simulation"
  | "Data Analysis"
  | "Embedded Systems"
  | "Interdisciplinary";

export type Project = {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  categories: ProjectCategory[];
  overview?: string;
  role?: string;
  contributions?: string[];
  tools?: string[];
  outcomes?: string[];
  event?: string;
  link?: { label: string; url: string };
  video?: string;
  images?: GalleryImage[];
  featured?: boolean;
  isPlaceholder?: boolean;
};

export type TimelineEntry = {
  id: string;
  position: string;
  organization: string;
  date?: string;
  description?: string;
  responsibilities?: string[];
  milestones?: string[];
  images?: GalleryImage[];
  /** Sub-steps for a progression within one organization (e.g. Co-Head → Head → Manager). */
  progression?: { title: string; date?: string; note?: string }[];
  isPlaceholder?: boolean;
};


export const profile = {
  brand: "RUDRAGIRI",
  brandSubtitle: "MECHANICAL ENGINEERING",
  name: "Rudragiri Goswami",
  kicker: "Mechanical Engineering · Experience",
  headline:
    "Mechanical engineering student building, testing, and researching practical engineering work.",
  intro:
    "B.Tech Mechanical Engineering student at SVNIT Surat. I work across design and simulation, research and data analysis, sustainable engineering, embedded and robotic systems, and the technical execution of large student events.",
  about: [
    "Placeholder - replace with your own words. A short paragraph on how you approach engineering: design intent, hands-on building, testing, and iteration.",
    "Placeholder - replace with your own words. A second paragraph on what you are looking for next: research, internships, or collaboration.",
  ],
  email: "goswamirudra268@gmail.com",
  phone: "+91 7984559807",
  linkedin: "https://www.linkedin.com/in/rudragirigoswami",
  location: "Surat, Gujarat, India",
  focusAreas: [
    "Mechanical design",
    "Simulation & analysis",
    "Research & data analysis",
    "Sustainable engineering",
    "Robotics & embedded systems",
    "Technical events & leadership",
  ],
};

export type AcademicMilestone = {
  id: string;
  year: string;
  qualification: string;
  authority: string;
  result: string;
  /** Secondary line tied to the result (e.g. admission merit rank). */
  subResult?: string;
  /** Smaller supporting line below subResult (e.g. candidate pool size). */
  subResultNote?: string;
};

export const education: {
  featured: {
    degree: string;
    discipline: string;
    institution: string;
    cgpa: string;
    period: string;
  };
  milestones: AcademicMilestone[];
} = {
  featured: {
    degree: "Bachelor of Technology",
    discipline: "Mechanical Engineering",
    institution: "Sardar Vallabhbhai National Institute of Technology, Surat",
    cgpa: "9.18",
    period: "2023 - PRESENT",
  },
  milestones: [
    {
      id: "secondary",
      year: "2021",
      qualification: "Secondary",
      authority: "Gujarat Board",
      result: "94.52 Percentile",
    },
    {
      id: "higher-secondary",
      year: "2023",
      qualification: "Higher Secondary",
      authority: "Gujarat Board",
      result: "99.52 Percentile",
    },
    {
      id: "gujcet",
      year: "2023",
      qualification: "GUJCET",
      authority: "Gujarat Common Entrance Test",
      result: "98.45 Percentile",
      subResult: "ACPC State Merit Rank: 418",
      subResultNote: "Among 40,176 students",
    },
  ],
};

/** Academic electives - selected coursework, shown in two columns. */
export const electives: { id: string; column: "left" | "right"; name: string }[] = [
  { id: "elective-1", column: "left", name: "Energy and Exergy Analysis of Thermal Systems" },
  { id: "elective-2", column: "left", name: "Total Quality Management" },
  { id: "elective-3", column: "left", name: "Additive Manufacturing" },
  { id: "elective-4", column: "left", name: "Logistics and Supply Chain" },
  { id: "elective-5", column: "right", name: "Data Analytics in Smart Manufacturing" },
  { id: "elective-6", column: "right", name: "Computer Integrated Manufacturing" },
  { id: "elective-7", column: "right", name: "Production and Operation Management" },
  { id: "elective-8", column: "right", name: "Cryogenics Engineering" },
];

/** Certifications - exact wording preserved; certificates open in an in-page viewer. */
export type Certification = {
  id: string;
  title: string;
  organization: string;
  issued: string;
  /** Optional course duration shown under the organisation line. */
  duration?: string;
  url: string;
  embedUrl: string;
};

/** Latest first (chronological, newest at the top). */
export const certifications: Certification[] = [
  {
    id: "remote-sensing-gis",
    title: "Remote Sensing and GIS Applications in Forest Fire",
    organization: "India Space Academy",
    issued: "Issued December 2025",
    url: "https://drive.google.com/file/d/16Y5IUFqCiEPA9_gWltbiM0fkFqLJrYwa/view?usp=drive_link",
    embedUrl: "https://drive.google.com/file/d/16Y5IUFqCiEPA9_gWltbiM0fkFqLJrYwa/preview",
  },
  {
    id: "sttp-indian-standards",
    title: "Short-Term Training Program (STTP) on Introduction to Indian Standards",
    organization: "Sardar Vallabhbhai National Institute of Technology, Surat",
    issued: "Issued October 2025",
    url: "https://drive.google.com/file/d/12AIGsJpKwFdZgWYs8BzSV7Fx-t_OOUBB/view?usp=drive_link",
    embedUrl: "https://drive.google.com/file/d/12AIGsJpKwFdZgWYs8BzSV7Fx-t_OOUBB/preview",
  },
  {
    id: "solidworks-udemy",
    title: "Master SOLIDWORKS 3D CAD using real-world examples",
    organization: "Udemy",
    issued: "Issued September 2025",
    url: "https://drive.google.com/file/d/1i05f3rqxzp9OgVS_ir0PGCfJCUbQqN7J/view?usp=drive_link",
    embedUrl: "https://drive.google.com/file/d/1i05f3rqxzp9OgVS_ir0PGCfJCUbQqN7J/preview",
  },
  {
    id: "drone-design-ansys",
    title: "Drone Design and Analysis using ANSYS Simulation Solutions",
    organization: "Sardar Vallabhbhai National Institute of Technology, Surat",
    issued: "Issued November 2023",
    url: "https://drive.google.com/file/d/1k8t_sNojz4JclSog5vcc4NBRXQdq3KCP/view?usp=drive_link",
    embedUrl: "https://drive.google.com/file/d/1k8t_sNojz4JclSog5vcc4NBRXQdq3KCP/preview",
  },
];

/** Positions of Responsibility - grouped by organisation, exact wording preserved. */
export type PositionDesignation = {
  title: string;
  date: string;
};

export type PositionEntry = {
  id: string;
  organization: string;
  /** Institute line shown directly below the organisation name. */
  subtitle?: string;
  /** Short supporting line shown under the organisation name where applicable. */
  description?: string;
  period: string;
  designations: PositionDesignation[];
  responsibilities: string[];
};

export const positions: PositionEntry[] = [
  {
    id: "mindbend",
    organization: "Mindbend",
    subtitle: "SVNIT Surat",
    description: "Gujarat’s Largest Techno-Managerial Fest",
    period: "Nov 2024 - Present",
    designations: [
      { title: "Manager - Technical Committee", date: "Nov 2025 - Present" },
      { title: "Head - Technical Committee", date: "Apr 2025 - Nov 2025" },
      { title: "Co-Head - Technical Committee", date: "Nov 2024 - Apr 2025" },
    ],
    responsibilities: [
      "Managed technical event planning, BOM preparation, infrastructure, venue arrangements, procurement, and logistics.",
      "Served as judge and oversaw on-ground execution, managing teams, participants, and operational decisions.",
      "Acted as the primary point of contact for technical events, handling rulebook communication, participant queries, and event-day issue resolution.",
    ],
  },
  {
    id: "drishti",
    organization: "DRISHTI - Robotics Club, SVNIT | Team Innovation",
    period: "Oct 2024 - Present",
    designations: [
      { title: "Senior Technical Member [STM] & Team Lead", date: "Sep 2025 - Present" },
      { title: "Junior Technical Member [JTM]", date: "Oct 2024 - Sep 2025" },
    ],
    responsibilities: [
      "Planned robotics workshops and events, managed infrastructure and arena setup, and mentored teams through mini and major projects.",
      "Served as a judge and supported technical evaluations, project execution, and robot development.",
      "Guided students in robot development while contributing to team development, technical coordination, and club activities.",
    ],
  },
  {
    id: "bis",
    organization: "Bureau of Indian Standards (BIS) Club",
    subtitle: "SVNIT Surat",
    period: "Feb 2025 - Present",
    designations: [
      { title: "Senior Executive", date: "Aug 2025 - Present" },
      { title: "Junior Executive", date: "Feb 2025 - Aug 2025" },
    ],
    responsibilities: [
      "Coordinated student outreach and supported guest lectures, workshops, and industrial visits.",
      "Contributed to technical communication, collaboration, and club activities.",
      "Participated in BIS quizzes, Short-Term Training Programmes (STTPs), industrial visits, and other technical initiatives.",
    ],
  },
];

/** Internship experience - exact role details and wording. */
export type InternshipEntry = {
  id: string;
  type: "INTERNSHIP";
  designation: string;
  organization: string;
  duration: string;
  description: string;
  technicalDetails: string[];
};

export const internshipExperience: InternshipEntry = {
  id: "india-space-academy-internship",
  type: "INTERNSHIP",
  designation: "Astronomy & Astrophysics Intern",
  organization: "India Space Academy",
  duration: "Jun 2024 - Jul 2024",
  description:
    "Performed computational cosmological analysis on real Type Ia supernova datasets, including Pantheon+ and SH0ES, using Python in Anaconda JupyterLab with NumPy, SciPy, Matplotlib, and Astropy. Processed redshift and distance modulus observations to generate Hubble diagrams and residual plots, applying the ΛCDM cosmological model to estimate the Hubble constant (H₀) and the age of the Universe.",
  technicalDetails: [
    "Dataset preparation, redshift-distance analysis, and quantitative processing of observational data.",
    "Generated Hubble diagrams, residual plots, and low-redshift versus high-redshift comparisons using Matplotlib.",
    "Gained foundational exposure to FITS image processing, SAOImage DS9, and introductory AI/ML applications in astronomy.",
    "Strengthened understanding of observational cosmology, stellar evolution, and planetary systems.",
  ],
};

/** Research project content, kept distinct from internship experience. */
export type ResearchEntry = {
  id: string;
  type: "RESEARCH PROJECT" | "INTERNSHIP";
  role: string;
  organization: string;
  duration: string;
  status?: string;
  description?: string;
  technicalDetails?: string[];
  contributions?: string[];
  cadModelPending?: boolean;
  resultImages?: GalleryImage[];
  tags?: string[];
};

export const researchExperience: ResearchEntry[] = [
  {
    id: "low-velocity-impact-testing-fixture",
    type: "RESEARCH PROJECT",
    role: "Design and Analysis of Low-velocity Impact Testing Fixture with Experimental and Numerical Study on Aluminium 6061-T6 Plate",
    organization: "Sardar Vallabhbhai National Institute of Technology, Surat",
    duration: "Ongoing",
    status: "Ongoing",
    description:
      "Developing a low-velocity drop-weight impact testing fixture and analysing the dynamic response of Aluminium 6061-T6 using Abaqus/Explicit. The study combines FEA, Johnson-Cook material modelling, contact mechanics, parametric analysis, and experimental-numerical validation.",
    contributions: [
      "Performed Abaqus/Explicit FEA of Aluminium 6061-T6 under low-velocity impact using Johnson-Cook plasticity, General Contact, and fixed boundary conditions.",
      "Analysed Von Mises stress, plastic strain, displacement, contact force, and energy components across varying impactor masses and drop heights.",
      "Conducted literature review on low-velocity impact, drop-weight testing, strain-rate effects, Johnson-Cook modelling, impactor geometry, and fixture boundary conditions to identify the research gap in fixture design and experimental-numerical correlation.",
    ],
    cadModelPending: true,
    resultImages: [
      {
        caption: "Displacement-Time graph",
        alt: "Displacement-Time graph for varying impactor masses and drop heights",
      },
      {
        caption: "Energy-Time graph",
        alt: "Energy-Time analysis graph",
      },
      {
        caption: "Force-Time graph",
        alt: "Force-Time analysis graph",
      },
    ],
    tags: [
      "Abaqus/Explicit",
      "FEA",
      "Johnson-Cook",
      "Low-Velocity Impact",
      "Contact Mechanics",
      "Parametric Analysis",
      "Structural Validation",
      "Drop-Weight Testing",
    ],
  },
  {
    id: "floral-waste-research",
    type: "RESEARCH PROJECT",
    role: "Sustainable Valorisation of Floral Waste using Solar Energy for Dual-Product Extraction",
    organization: "Sardar Vallabhbhai National Institute of Technology, Surat",
    duration: "Jun 2025 - Jul 2025",
    description:
      "Contributed to the experimental development and process validation of a solar-assisted floral waste valorisation system focused on dual-product recovery, combining floral hydrosol extraction with the utilisation of residual biomass for natural dhoop production.",
    technicalDetails: [
      "Assisted in experimental trials involving forced-convection drying and floral hydrosol extraction, using Pt-100 RTDs, STC-3028 humidity sensors, a Testo 405i anemometer, and mass-based moisture measurements.",
      "Applied psychrometric analysis, moisture-ratio calculations, and drying-kinetics analysis to interpret temperature, relative humidity, air velocity, and moisture-content data, contributing to the reported 94.71% drying efficiency.",
      "Supported the validation of residual biomass utilisation for natural dhoop production, demonstrating a waste-to-value conversion pathway through sustainable biomass valorisation.",
    ],
  },
];

/** Projects - reusable structure. Add LinkedIn projects here later. */
export const projects: Project[] = [
  {
    id: "impact-fixture",
    title: "Low-Velocity Impact Testing Fixture",
    organization: "SVNIT Surat",
    date: "Aug 2026 - Present",
    categories: ["Mechanical Design", "Simulation"],
    overview:
      "Design of an Al 6061-T6 impact testing fixture in Abaqus/Explicit using the Johnson-Cook material model.",
    tools: ["Abaqus/Explicit", "SolidWorks"],
    featured: true,
    images: [
      { caption: "Placeholder - fixture CAD view" },
      { caption: "Placeholder - simulation result" },
    ],
  },
  {
    id: "sentinel",
    title: "Sentinel",
    organization: "DRISHTI - Robotics Club, SVNIT | Team Innovation",
    date: "Oct 2024 - Dec 2025",
    categories: ["Robotics", "Interdisciplinary"],
    overview:
      "Dual-robotic system for land restoration and precision farming; led research and technical direction.",
    role: "Research and technical lead",
    images: [{ caption: "Placeholder - prototype photograph" }],
  },
  {
    id: "stabilo",
    title: "STABILO Rally Car Suspension",
    date: "Jul - Aug 2024",
    categories: ["Mechanical Design"],
    overview:
      "Two CAD variants developed and validated for structural integrity through drop and load testing.",
    tools: ["SolidWorks"],
  },
];

export const achievements: {
  title: string;
  organization: string;
  supportingLine?: string;
  description: string;
}[] = [
  {
    title: "Ranked 25th out of 1,000+ Nationwide",
    organization: "GUJCOST Robofest 5.0 (Senior Category)",
    description: "India’s Biggest Robotics Competition",
  },
  {
    title: "Provisional Patent Grant & ₹50,000 Funding",
    organization: "GUJCOST Robofest 5.0 (Senior Category)",
    description: "India’s Biggest Robotics Competition",
  },
  {
    title: "Finalist",
    organization: "NIDHI-PRAYAS Program (DST) · IIT Gandhinagar",
    description: "Presented Sentinel under a Robot-as-a-Service (RaaS) model.",
  },
  {
    title: "Institute Rank 1 - Grand Robo-Prix (GRP) 2024",
    organization: "DRISHTI - A REVOLUTIONARY CONCEPT, SVNIT Surat",
    description: "Autonomous Line Follower Robot",
  },
  {
    title: "Ranked 8th out of 135+ Teams Nationwide",
    organization: "Mindbend 2024",
    supportingLine: "Gujarat’s Largest Techno-Managerial Fest",
    description: "National-level Line Follower",
  },
  {
    title: "Ranked 5th out of 40+ Teams Nationwide",
    organization: "Mindbend 2024",
    supportingLine: "Gujarat’s Largest Techno-Managerial Fest",
    description: "National-level Pathfinder",
  },
];

/** Standalone gallery (events, competitions, behind-the-scenes). */
export const gallery: { id: string; group: string; images: GalleryImage[] }[] = [
  {
    id: "competitions",
    group: "Competitions",
    images: [
      { caption: "Placeholder - competition photograph" },
      { caption: "Placeholder - team photograph" },
      { caption: "Placeholder - trophy" },
    ],
  },
  {
    id: "workshop",
    group: "Workshops & events",
    images: [
      { caption: "Placeholder - workshop photograph" },
      { caption: "Placeholder - behind the scenes" },
    ],
  },
];

export const skillGroups = [
  { title: "Design & simulation", items: "SolidWorks · AutoCAD · Abaqus" },
  { title: "Data & programming", items: "Data analytics · Python · SQL · Embedded C" },
  { title: "Documentation", items: "Technical documentation · Design records" },
  { title: "Coordination", items: "Event management · Cross-functional team coordination" },
];

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#positions", label: "Positions" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

/**
 * ─────────────────────────────────────────────────────────────
 *  SHOWCASE PROJECTS - horizontal card row + case-study drawer.
 *  Add a new entry per project; the interaction pattern is shared.
 * ─────────────────────────────────────────────────────────────
 */
export type ShowcaseProject = {
  id: string;
  title: string;
  /** Optional category line shown above the project title. */
  category?: string;
  /** e.g. "Team RoboNovices | Team Lead" */
  teamLine: string;
  /** Optional event line shown below the title. */
  event?: string;
  /** Small optional corner badge, e.g. "GUJCOST Proposal". */
  badge?: string;
  /** Card thumbnail. Leave undefined until the real photograph is added. */
  cover?: GalleryImage;
  overview: string;
  tags: string[];
  achievementPreview: string[];
  /** When set, "Know more" links to a dedicated page instead of opening the drawer. */
  href?: "/projects/radiax" | "/projects/swach" | "/projects/aar";
  caseStudy?: {
    /** Lead photograph shown near the top of the case study. */
    lead?: GalleryImage;
    overview: string[];
    systemArchitecture?: { title: string; description: string }[];
    researchConceptDevelopment?: string[];
    technicalDescription?: string;
    hardware: string[];
    navigation: string;
    sensorOptimisation?: string;
    contributionsIntro: string;
    contributions: string[];
    gallery?: { primary?: GalleryImage; supporting?: GalleryImage[] };
    galleryFit?: "cover" | "contain";
    galleryAfterContributions?: boolean;
    showTechnicalTags?: boolean;
    video?: { label: string; url: string };
    achievements: { event: string; lines: string[] }[];
    certificate?: GalleryImage;
    documentation?: { label: string; url: string; embedUrl?: string };
  };
};

/** RADIAX - CDN URLs of the GLB CAD models for each design iteration. */
// GLB files live in public/models so these root-relative URLs work from every route.
export const radiaxIterationOneModelUrl = "/models/AGV_I1_PF.glb";
export const radiaxIterationTwoModelUrl = "/models/AGV_I1_F.glb";
/** RADIAX - technical documentation link once provided. */
export const radiaxDocumentationUrl: string | undefined =
  "https://drive.google.com/file/d/1k7VhnCWHyE5CXYLapofIDBBYXNEa6ldD/view?usp=drive_link";

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "sentinel",
    title: "SENTINEL - Dual Robotic System for Land Restoration and Afforestation",
    teamLine: "DRISHTI - Robotics Club, SVNIT | Team Innovation",
    overview:
      "A dual-robotic system comprising SENTINEL-Alpha (The Soil Analyst) and SENTINEL-Beta (The Planter), developed to support land restoration and afforestation through soil assessment, targeted plantation, nutrient delivery, and sustainable land-management practices.",
    tags: ["Robotics", "Mechanism Design", "System Architecture", "Land Restoration", "Afforestation", "Sustainable Agriculture", "AI/ML", "RaaS"],
    achievementPreview: ["Finalist - NIDHI-PRAYAS (DST) Program, IIT Gandhinagar"],
    caseStudy: {
      overview: [
        "A dual-robotic system comprising SENTINEL-Alpha (The Soil Analyst) and SENTINEL-Beta (The Planter), developed to support land restoration and afforestation through soil assessment, targeted plantation, nutrient delivery, and sustainable land-management practices.",
      ],
      systemArchitecture: [
        {
          title: "SENTINEL-Alpha (The Soil Analyst)",
          description: "A robotic soil-analysis unit designed for on-site soil sampling and assessment using an auger-based mechanism. The concept incorporates soil-parameter sensing for NPK, pH, moisture, temperature, and electrical conductivity, along with mechanisms for soil treatment and land preparation.",
        },
        {
          title: "SENTINEL-Beta (The Planter)",
          description: "A robotic planting unit designed for seed, bulb, and pod plantation using strip tilling and mulching approaches to support sustainable plantation and improve soil moisture retention.",
        },
      ],
      researchConceptDevelopment: [
        "Researched land degradation, afforestation, desert restoration, sustainable agriculture, and existing large-scale land-restoration initiatives.",
        "Studied UN Sustainable Development Goals and relevant government/technical resources to define the project's objectives.",
        "Researched soil-health parameters and their relevance to assessing degraded land and selecting suitable plantation strategies.",
        "Evaluated alternative mechanisms for soil sampling, planting, mulching, nutrient delivery, and land preparation.",
        "Developed the overall SENTINEL concept, system architecture, working sequence, and technical direction.",
      ],
      hardware: [],
      navigation: "",
      contributionsIntro: "",
      contributions: [
        "Led the research and defined the project's objectives, technical direction, and development plan.",
        "Developed the overall SENTINEL-Alpha and SENTINEL-Beta system concept and architecture.",
        "Researched soil parameters, land-restoration methods, and alternative mechanisms for the proposed robotic operations.",
        "Evaluated and selected mechanisms for soil sampling, planting, mulching, nutrient delivery, and land preparation.",
        "Led technical documentation, design records, project specifications, presentations, and competition submissions.",
        "Developed and presented the Robot-as-a-Service (RaaS) concept; SENTINEL reached the NIDHI-PRAYAS (DST) finalist stage at IIT Gandhinagar.",
      ],
      gallery: {
        primary: { src: sentinelAlpha.url, caption: "SENTINEL-Alpha (The Soil Analyst)", alt: "CAD render of SENTINEL-Alpha, the soil-analysis robot" },
        supporting: [
          { src: sentinelBeta.url, caption: "SENTINEL-Beta (The Planter)", alt: "CAD render of SENTINEL-Beta, the planting robot" },
        ],
      },
      galleryFit: "contain",
      galleryAfterContributions: true,
      showTechnicalTags: true,
      achievements: [],
    },
  },
  {
    id: "aar",
    title: "AAR: Autonomous Agricultural Robot for Precision Farming",
    badge: "GUJCOST Proposal",
    teamLine: "Team DRISHTI | Team Lead",
    overview:
      "AAR is an autonomous agricultural robot designed for precision farming, integrating soil sensing, autonomous navigation, targeted spraying, and structured field traversal to support data-driven and resource-efficient agricultural operations.",
    tags: ["Precision Farming", "Autonomous Navigation", "Soil Sensing", "Targeted Spraying"],
    achievementPreview: [
      "Ranked 25th out of 1,000+ Nationwide",
      "Provisional Patent Grant & ₹50,000 Funding",
    ],
    href: "/projects/aar",
  },
  {
    id: "radiax",
    title: "RADIAX: Automated Guided Vehicle (AGV) for Radiopharmaceutical Material Handling",
    badge: "GUJCOST Proposal",
    teamLine: "Team DRISHTI | Technical Member",
    overview:
      "A proposed compact Automated Guided Vehicle (AGV) designed for the safe and precise transportation of radioactive vials and lead-shielded radiopharmaceutical containers within controlled radiopharmacy environments.",
    tags: ["AGV", "Mechanical Design", "ROS 2", "Mecanum Drive"],
    achievementPreview: [],
    href: "/projects/radiax",
  },
  {
    id: "swach",
    title: "SWACH: Smart Waste Autonomous Collector and Handler",
    badge: "GUJCOST Proposal",
    teamLine: "Team DRISHTI | Technical Member",
    overview:
      "SWACH (Smart Waste Autonomous Collector and Handler) is an innovative solar-powered autonomous waste management robot designed for automated waste collection and handling in public and community spaces. The system integrates waste detection, autonomous navigation, collection, segregation, and disposal, with camera and sensor-based perception and solar-assisted power management.",
    tags: ["Waste Collection", "Waste Segregation", "Autonomous Navigation", "Solar Power"],
    achievementPreview: [],
    href: "/projects/swach",
  },
  {
    id: "stabilo",
    title: "STABILO - Rally Car Suspension System",
    teamLine: "MAKERNOVA 2.0 · DRISHTI, SVNIT",
    event: "MAKERNOVA 2.0 · DRISHTI, SVNIT",
    overview:
      "STABILO, a model rally car featuring a non-Grashof four-bar coil spring suspension, was designed and fabricated as part of MAKERNOVA 2.0 conducted by DRISHTI, SVNIT. The prototype had overall dimensions of 300 × 260 × 98 mm (wheelbase × track width × ground clearance), with a 420 × 170 mm chassis and a 2.45 N/mm spring constant.",
    tags: [
      "SolidWorks",
      "CAD Design",
      "Fabrication",
      "Suspension Systems",
      "Load Test",
      "Drop Test",
    ],
    achievementPreview: [],
    caseStudy: {
      overview: [
        "STABILO, a model rally car featuring a non-Grashof four-bar coil spring suspension, was designed and fabricated as part of MAKERNOVA 2.0 conducted by DRISHTI, SVNIT. The prototype had overall dimensions of 300 × 260 × 98 mm (wheelbase × track width × ground clearance), with a 420 × 170 mm chassis and a 2.45 N/mm spring constant.",
      ],
      technicalDescription:
        "The team developed an independent, passive, double-wishbone-inspired suspension architecture based on a non-Grashof four-bar linkage, using coil springs for passive load support and shock absorption. Multiple CAD variants were explored during design selection, considering mechanism feasibility, wheel movement, structural integrity, and manufacturability, before fabrication and physical testing.",
      hardware: [],
      navigation: "",
      contributionsIntro: "",
      contributions: [
        "Developed 2 of 5 CAD variants in SolidWorks, contributing to design selection and manufacturing.",
        "Assessed structural integrity through simultaneous 7 ft and 5 ft drop tests and load tests up to 3.5 kg, recording 87.9 mm ground clearance at a 3.5 kg load and evaluating suspension response and structural performance.",
      ],
      gallery: {
        primary: {
          src: stabiloIsometric.url,
          caption: "STABILO - Isometric View",
          alt: "Isometric view of the fabricated STABILO rally car prototype",
        },
        supporting: [
          {
            src: stabiloFront.url,
            caption: "STABILO - Front View",
            alt: "Front view of the fabricated STABILO rally car prototype",
          },
          {
            src: stabiloTop.url,
            caption: "STABILO - Top View",
            alt: "Top view of the STABILO chassis and fabricated components",
          },
          {
            src: stabiloSide.url,
            caption: "STABILO - Side View",
            alt: "Side view of the STABILO wheels and suspension assembly",
          },
        ],
      },
      galleryFit: "contain",
      video: {
        label: "See it in action →",
        url: "https://drive.google.com/file/d/1i5YfcloJGSqyc2I3gvvYURSh8lDraslc/view?usp=drive_link",
      },
      achievements: [],
    },
  },
  {
    id: "line-follower",
    title: "Autonomous Line Follower Robot",
    teamLine: "Team RoboNovices | Team Lead",
    cover: {
      src: lineFollowerSideView.url,
      caption: "Autonomous Line Follower Robot - side view",
      alt: "Autonomous Line Follower Robot, side view showing the Arduino Uno, L293D driver board and wiring",
    },
    overview:
      "Led a five-member team in developing an autonomous Line Follower Robot using Arduino Uno, IR sensors, an L293D motor driver, DC motors, and Embedded C. The project focused on sensor-based tracking, motion response, hardware integration, and iterative testing.",
    tags: ["Arduino Uno", "IR Sensors", "L293D", "Embedded C"],
    achievementPreview: [
      "Institute Rank 1 - Grand Robo-Prix (GRP) 2024",
      "8th place among 200+ teams at Mindbend 2024",
    ],
    caseStudy: {
      overview: [
        "Led a five-member team in developing an autonomous Line Follower Robot designed to follow white tracks on a black background. The robot used IR sensors for line detection, an Arduino Uno for control, an L293D motor driver, and DC motors.",
        "The project involved hardware integration, sensor-based navigation, motion-response analysis, and iterative testing across straight paths, curves, and sharp turns. The development process focused on improving tracking reliability, sensor positioning, calibration, and overall competition performance.",
      ],
      hardware: [
        "Arduino Uno R3",
        "IR sensor array",
        "L293D motor driver",
        "DC motors",
        "Power supply and wiring",
      ],
      navigation:
        "The robot used IR sensor responses to determine its position relative to the line and select the corresponding motor response. Navigation logic was reviewed by analysing different sensor combinations and the expected robot response during straight movement, curves, and turns.",
      sensorOptimisation:
        "Sensor placement was refined through repeated testing, symmetry checks, spacing measurements, and calibration. Slow-motion video analysis was used to study sensor activation, turning behaviour, overshoot, oscillation, and delayed response.",
      contributionsIntro: "As Team Lead of RoboNovices, I:",
      contributions: [
        "Coordinated task allocation and the development sequence",
        "Assigned responsibilities according to team members' strengths",
        "Contributed to control-circuit integration and troubleshooting",
        "Reviewed navigation logic and sensor-response conditions",
        "Optimised sensor placement, spacing, symmetry, and calibration",
        "Analysed robot movement using slow-motion videos",
        "Tested straight paths, curves, sharp turns, and different track conditions",
        "Operated the robot during competitions and made real-time rerun and route decisions",
      ],
      gallery: {
        primary: {
          src: lineFollowerSideView.url,
          alt: "Side view of the complete Line Follower Robot showing the Arduino Uno, L293D driver board and wiring",
        },
        supporting: [
          {
            src: lineFollowerBackView.url,
            alt: "Back view of the Line Follower Robot with the Robo Novices GJ05 team label",
          },
          {
            src: lineFollowerFrontView.url,
            alt: "Front view of the Line Follower Robot showing the IR sensor array",
          },
          {
            src: grpFinals.url,
            caption: "Grand Robo-Prix (GRP) 2K24 Finals",
            alt: "Team RoboNovices with their robots during the Grand Robo-Prix (GRP) 2K24 Finals",
          },
          {
            src: grpCelebrations.url,
            caption: "Grand Robo-Prix (GRP) 2K24 Celebrations",
            alt: "Team RoboNovices with the Grand Robo-Prix (GRP) 2K24 winner trophy in front of the DRISHTI sign",
          },
        ],
      },

      achievements: [
        {
          event: "Grand Robo-Prix (GRP) 2024",
          lines: ["Institute Rank 1", "DRISHTI - A Revolutionary Concept"],
        },

        {
          event: "Mindbend 2024",
          lines: [
            "8th place among 200+ Teams",
            "Gujarat's Largest Techno-Managerial Fest",
          ],
        },

      ],
      certificate: {
        src: mindbendCertificate.url,
        caption: "Mindbend 2024 Certificate",
        alt: "Certificate of Appreciation for participating in the Line Follower event at Mindbend 2024, SVNIT Surat",
      },
      documentation: {
        label: "Abstract",
        url: lineFollowerAbstract.url,
        embedUrl:
          "https://drive.google.com/file/d/1j_mIGrRmKaWGbeXVyb1MYZqXDC9VWlet/preview",
      },

    },
  },
  {
    id: "pathfinder",
    title: "Pathfinder Robot",
    teamLine: "Team RoboNovices | Team Lead",
    cover: {
      src: pathfinderSideView.url,
      alt: "Pathfinder Robot side view showing the Arduino Uno, HC-SR04 ultrasonic sensors, motor driver board and wheels",
    },
    overview:
      "An autonomous maze-solving robot designed to navigate maze paths and reach the destination using distance-based directional decisions, with obstacle-avoidance capabilities. The system used an Arduino Uno, HC-SR04 ultrasonic sensor, L293D motor driver, LM7805 voltage regulator, DC motors, and Embedded C navigation logic.",
    tags: ["Arduino Uno", "HC-SR04", "L293D", "Embedded C"],
    achievementPreview: ["5th place among 40+ teams at Mindbend 2024"],
    caseStudy: {
      overview: [
        "An autonomous maze-solving robot designed to navigate maze paths and reach the destination using distance-based directional decisions, with obstacle-avoidance capabilities. The system used an Arduino Uno, HC-SR04 ultrasonic sensor, L293D motor driver, LM7805 voltage regulator, DC motors, and Embedded C navigation logic.",
      ],
      hardware: [
        "Arduino Uno",
        "HC-SR04 ultrasonic sensor",
        "L293D motor driver",
        "LM7805 voltage regulator",
        "DC motors",
      ],
      navigation:
        "The robot navigated maze paths and reached the destination using distance-based directional decisions, with obstacle-avoidance capabilities, through Embedded C navigation logic.",
      contributionsIntro: "Led a five-member team, RoboNovices, and:",
      contributions: [
        "Coordinated the development and testing of the Pathfinder Robot",
        "Contributed to hardware integration, navigation-logic review, sensor positioning, and troubleshooting",
        "Analysed maze conditions and robot responses to evaluate distance-based directional decisions and improve navigation reliability",
        "Served as the competition operator, making real-time route and risk-management decisions during arena runs",
      ],
      gallery: {
        primary: {
          src: pathfinderSideView.url,
          alt: "Pathfinder Robot side view showing the Arduino Uno, HC-SR04 ultrasonic sensors, motor driver board and wheels",
        },
        supporting: [
          {
            src: pathfinderFrontView.url,
            alt: "Front view of the Pathfinder Robot with the HC-SR04 ultrasonic sensor array",
          },
          {
            src: pathfinderThreeQuarterView.url,
            alt: "Three-quarter view of the Pathfinder Robot showing the sensor array, Arduino Uno and wiring",
          },
        ],
      },
      achievements: [],
      certificate: {
        src: pathfinderCertificate.url,
        caption: "Mindbend 2024 Certificate",
        alt: "Certificate of Appreciation for participating in the Pathfinder event at Mindbend 2024, SVNIT Surat",
      },
      documentation: {
        label: "Abstract",
        url: "https://drive.google.com/file/d/1jH0i7jqoNKyCYS-BRbtBw3Ye6E4N-1wA/view",
        embedUrl:
          "https://drive.google.com/file/d/1jH0i7jqoNKyCYS-BRbtBw3Ye6E4N-1wA/preview",
      },
    },
  },
];
