export type CasStrand = "Service" | "Creativity" | "Activity";
export type ExperienceStatus = "completed" | "ongoing" | "projected" | "reflection-pending";
export type OutcomeId = "RA1" | "RA2" | "RA3" | "RA4" | "RA5" | "RA6" | "RA7";
export type MediaPrivacy = "public" | "redact" | "private";
export type EvidenceCategory =
  | "photographs"
  | "certificates"
  | "confirmations"
  | "activity-tracking"
  | "videos"
  | "notes";

type MediaBase = {
  category: EvidenceCategory;
  privacy?: MediaPrivacy;
  caption?: string;
  date?: string;
};

export type ExperienceMedia =
  | (MediaBase & {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      credit?: string;
    })
  | (MediaBase & {
      type: "video";
      src: string;
      poster?: string;
      transcript?: string;
    })
  | (MediaBase & {
      type: "document";
      src: string;
      label: string;
      format?: string;
    })
  | (MediaBase & {
      type: "external";
      href: string;
      label: string;
    });

export type Experience = {
  slug: string;
  title: string;
  shortTitle: string;
  status: ExperienceStatus;
  strands: CasStrand[];
  dateLabel: string;
  hoursLabel: string;
  locationLabel?: string;
  role?: string;
  outcomes: OutcomeId[];
  summary: string;
  challenge: string;
  keyLearning: string;
  evidenceChecklist: string[];
  privacyNote?: string;
  featured?: boolean;
  award?: string;
};

export const siteMeta = {
  name: "Iker López",
  title: "CAS Portfolio",
  programme: "IB Diploma Programme 2025–2027",
  location: "Barcelona, Spain",
  intro:
    "A documented record of the projects I create, the challenges I take on, and the communities I contribute to.",
};

export const publicStats = [
  { value: "7", label: "CAS learning outcomes addressed" },
  { value: "24h", label: "NASA Space Apps hackathon" },
  { value: "2", label: "Mountain leadership expeditions completed" },
  { value: "13", label: "Bojos economics sessions planned" },
];

export const contentWarnings = [
  "The source document's headline total hours and strand subtotals do not reconcile. Do not publish a definitive total-hours counter until the figures are checked.",
  "Several experiences are projected or have reflections marked as incomplete. Label them clearly rather than presenting them as completed.",
  "Do not publish names of minors, private emails, exact participant details, or unredacted evidence.",
];

export const experiences: Experience[] = [
  {
    slug: "bingo-musical",
    title: "Bingo Musical",
    shortTitle: "Bingo Musical",
    status: "completed",
    strands: ["Service"],
    dateLabel: "26 September 2025",
    hoursLabel: "2 hours",
    role: "Volunteer organiser",
    outcomes: ["RA4", "RA5"],
    summary:
      "Supported the setup, materials, participant assistance and event coordination for an inclusive school-community activity.",
    challenge:
      "A technical problem with the music system required a quick response without interrupting the experience.",
    keyLearning:
      "Small community events still require coordination, attention to detail and calm problem-solving.",
    evidenceChecklist: ["Event photographs", "Volunteer confirmation email"],
  },
  {
    slug: "cm-talks-david-bueno",
    title: "CM Talks — David Bueno",
    shortTitle: "CM Talks",
    status: "completed",
    strands: ["Service"],
    dateLabel: "13 October 2025",
    hoursLabel: "1.5 hours",
    role: "Event support volunteer",
    outcomes: ["RA6"],
    summary:
      "Helped welcome attendees, distribute materials and support a public talk on the brain, learning and scientific communication.",
    challenge:
      "Supporting an event aimed at an audience with different levels of scientific knowledge.",
    keyLearning:
      "Complex knowledge becomes useful only when it is communicated accessibly without being oversimplified.",
    evidenceChecklist: ["Event announcement", "Venue and speaker photographs"],
  },
  {
    slug: "via-verda-leadership",
    title: "Via Verda del Llobregat",
    shortTitle: "Mountain Leadership I",
    status: "completed",
    strands: ["Service", "Activity"],
    dateLabel: "19 October 2025",
    hoursLabel: "9.5 hours",
    locationLabel: "Berguedà",
    role: "Volunteer youth mountain monitor",
    outcomes: ["RA1", "RA2", "RA4", "RA5", "RA7"],
    summary:
      "Guided a youth group across approximately 15 km of varied terrain, including dark tunnels, while managing safety, pacing and group motivation.",
    challenge:
      "A participant froze inside a dark tunnel. I had to balance the needs of the individual with the progress and safety of the group.",
    keyLearning:
      "Leadership is not forcing people forward; it is helping them reach a goal they doubt they can achieve.",
    evidenceChecklist: ["Route programme", "Group and route photographs", "Leadership confirmation", "Activity video"],
    featured: true,
  },
  {
    slug: "gran-recapte-2025",
    title: "Gran Recapte 2025",
    shortTitle: "Gran Recapte",
    status: "completed",
    strands: ["Service"],
    dateLabel: "7 November 2025",
    hoursLabel: "4 hours",
    role: "Food-drive volunteer",
    outcomes: ["RA2", "RA4", "RA5", "RA6", "RA7"],
    summary:
      "Engaged supermarket customers, explained the campaign and encouraged donations while working in rotating volunteer roles.",
    challenge:
      "Repeated rejection made approaching strangers uncomfortable, requiring me to adapt my communication without becoming pushy.",
    keyLearning:
      "Persistence is different from pressure. Ethical service respects autonomy while removing barriers to participation.",
    evidenceChecklist: ["Registration and campaign emails", "Training PDF", "Volunteer photographs", "Campaign statistics"],
    featured: true,
  },
  {
    slug: "parc-sequia-leadership",
    title: "Parc de la Sèquia",
    shortTitle: "Mountain Leadership II",
    status: "completed",
    strands: ["Service", "Activity"],
    dateLabel: "15 November 2025",
    hoursLabel: "9 hours",
    locationLabel: "Manresa area",
    role: "Volunteer youth mountain monitor",
    outcomes: ["RA1", "RA2", "RA4", "RA5", "RA6", "RA7"],
    summary:
      "Led educational and physical activities along a historic water system, combining hiking, team challenges and wetland biodiversity observation.",
    challenge:
      "The flatter route was less immediately exciting, so maintaining engagement required varied pacing, storytelling and participatory activities.",
    keyLearning:
      "The framing of an experience changes how people engage with it; good leadership can make ordinary terrain meaningful.",
    evidenceChecklist: ["Route programme", "Landscape and group photographs", "Biodiversity notes", "Activity video"],
    featured: true,
  },
  {
    slug: "ocean-documentary",
    title: "Ocean — Environmental Screening",
    shortTitle: "Ocean",
    status: "reflection-pending",
    strands: ["Service"],
    dateLabel: "23 November 2025",
    hoursLabel: "3 hours",
    role: "Environmental education participant",
    outcomes: ["RA6"],
    summary:
      "Attended an environmental documentary screening focused on marine ecosystems, climate impact and collective action.",
    challenge:
      "The source portfolio marks the detailed post-screening reflection as incomplete.",
    keyLearning:
      "Publish this experience only with a visible 'reflection pending' status until the final reflection is written.",
    evidenceChecklist: ["Attendance confirmation", "Event materials", "Cinema or event photograph"],
  },
  {
    slug: "bojos-economia",
    title: "Bojos per la Ciència — Economia",
    shortTitle: "Bojos Economia",
    status: "projected",
    strands: ["Service", "Creativity"],
    dateLabel: "January–April 2026",
    hoursLabel: "39 projected hours",
    role: "Selected participant",
    outcomes: ["RA3", "RA4", "RA6"],
    summary:
      "A planned thirteen-session programme connecting secondary students with active economics researchers across markets, climate, cities, migration and behavioural decisions.",
    challenge:
      "Balancing a demanding Saturday programme with IB academics and ongoing commitments.",
    keyLearning:
      "The programme should be shown as planned until attendance, session notes and progressive reflections are documented.",
    evidenceChecklist: ["Selection email", "Programme schedule", "Future session notes", "Future completion certificate"],
    featured: true,
  },
  {
    slug: "nasa-space-apps",
    title: "NASA Space Apps Challenge 2025",
    shortTitle: "NASA Space Apps",
    status: "completed",
    strands: ["Creativity"],
    dateLabel: "4–5 October 2025",
    hoursLabel: "24 hours",
    locationLabel: "Barcelona",
    role: "Team member",
    outcomes: ["RA1", "RA2", "RA3", "RA4", "RA5"],
    summary:
      "Worked in a six-person team during an intensive hackathon as the only secondary-school team competing against university and master's students.",
    challenge:
      "At hour eighteen, the team was exhausted and a key component was not working, forcing a strategic pause and a change of approach.",
    keyLearning:
      "Creativity is a disciplined process of research, divergence, convergence, iteration and synthesis rather than a sudden idea.",
    evidenceChecklist: ["Award certificate", "Team photograph", "Presentation slides", "Event programme"],
    award: "Creation and Innovation Award",
    featured: true,
  },
  {
    slug: "ecommerce-project",
    title: "E-commerce and Entrepreneurship Project",
    shortTitle: "E-commerce",
    status: "projected",
    strands: ["Creativity"],
    dateLabel: "Summer 2026",
    hoursLabel: "30–40 projected hours",
    role: "Founder and designer",
    outcomes: ["RA1", "RA2", "RA3", "RA4"],
    summary:
      "A planned third e-commerce attempt designed around market validation, audience definition, branding, content and measurable learning.",
    challenge:
      "Previous attempts failed because of weak product validation, undefined audiences, absent marketing and premature abandonment.",
    keyLearning:
      "The next attempt is not blind repetition; it is an evidence-based iteration with clearer hypotheses and metrics.",
    evidenceChecklist: ["Market research", "Brand assets", "Website screenshots", "Analytics", "Financial tracking"],
  },
  {
    slug: "boxing",
    title: "Boxing",
    shortTitle: "Boxing",
    status: "ongoing",
    strands: ["Activity"],
    dateLabel: "May 2024–present",
    hoursLabel: "24 documented hours in Sep–Nov 2025; 72 projected DP1 hours",
    role: "Athlete",
    outcomes: ["RA1", "RA2", "RA4"],
    summary:
      "Ongoing twice-weekly boxing practice focused on cardiovascular endurance, technique, composure and discipline.",
    challenge:
      "Sparring required learning to keep thinking after being hit rather than reacting through fear or frustration.",
    keyLearning:
      "Progress is non-linear, consistency matters more than intensity, and ego interferes with learning.",
    evidenceChecklist: ["Training photographs", "Bag or pad-work videos", "Attendance tracking"],
    featured: true,
  },
  {
    slug: "brazilian-jiu-jitsu",
    title: "Brazilian Jiu-Jitsu",
    shortTitle: "BJJ",
    status: "ongoing",
    strands: ["Activity"],
    dateLabel: "From 18 November 2025",
    hoursLabel: "Approximately 50 projected DP1 hours",
    role: "Beginner practitioner",
    outcomes: ["RA1", "RA2", "RA3", "RA4"],
    summary:
      "A new grappling discipline added to complement boxing through strategic problem-solving, leverage and beginner humility.",
    challenge:
      "Managing ego, physical fatigue and time while starting again as a complete beginner.",
    keyLearning:
      "Technique and patience can outperform brute force, but progress requires accepting repeated failure.",
    evidenceChecklist: ["Training photographs", "Attendance log", "Technique videos", "Future grading evidence"],
  },
  {
    slug: "running-spinning",
    title: "Running and Spinning",
    shortTitle: "Running",
    status: "ongoing",
    strands: ["Activity"],
    dateLabel: "September 2025–present",
    hoursLabel: "15–20 estimated current hours; 60–80 projected DP1 hours",
    role: "Self-directed athlete",
    outcomes: ["RA1", "RA4"],
    summary:
      "Garmin-tracked cardiovascular training used for active recovery, aerobic development and stress management.",
    challenge:
      "Unlike scheduled classes, running depends entirely on self-accountability and realistic intensity management.",
    keyLearning:
      "Flexible, self-directed activity can support academic focus when sleep, nutrition and recovery are protected.",
    evidenceChecklist: ["Garmin activity screenshots", "Monthly summaries", "Route maps", "Post-run photographs"],
  },
  {
    slug: "popular-races",
    title: "Popular Races",
    shortTitle: "Race Goals",
    status: "projected",
    strands: ["Activity"],
    dateLabel: "Dates to be confirmed",
    hoursLabel: "10–12 estimated hours",
    role: "Participant",
    outcomes: ["RA2", "RA3", "RA4"],
    summary:
      "Planned official races intended to turn regular cardiovascular training into concrete, measurable challenges.",
    challenge:
      "One planned race was cancelled from the schedule because it conflicted with a unique environmental event.",
    keyLearning:
      "CAS planning includes prioritising opportunities rather than treating every activity as equally urgent.",
    evidenceChecklist: ["Registration emails", "Race numbers", "Official results", "Garmin race data", "Finish photographs"],
  },
];

export const learningOutcomes = [
  {
    id: "RA1" as const,
    title: "Strengths and growth",
    description: "Identify personal strengths and develop areas for growth.",
    examples: [
      "Patience and adaptability during mountain leadership",
      "Systemic thinking during NASA Space Apps",
      "Technical and defensive development in boxing",
    ],
  },
  {
    id: "RA2" as const,
    title: "Challenge",
    description: "Undertake challenges and develop new skills through them.",
    examples: [
      "Supporting a participant through a dark tunnel",
      "Approaching strangers during Gran Recapte",
      "Continuing after setbacks during the hackathon and sparring",
    ],
  },
  {
    id: "RA3" as const,
    title: "Initiative and planning",
    description: "Initiate and plan a CAS experience.",
    examples: [
      "Structuring the twenty-four-hour NASA workflow",
      "Planning BJJ around other commitments",
      "Designing the research, branding and testing phases of the e-commerce project",
    ],
  },
  {
    id: "RA4" as const,
    title: "Commitment and perseverance",
    description: "Demonstrate commitment and perseverance in CAS experiences.",
    examples: [
      "Long-term boxing practice",
      "Repeated monthly mountain leadership",
      "Maintaining effort after rejection during Gran Recapte",
    ],
  },
  {
    id: "RA5" as const,
    title: "Collaboration",
    description: "Work collaboratively and recognise the benefits of teamwork.",
    examples: [
      "Six-person NASA team",
      "Role coordination between mountain monitors",
      "Rotating volunteer strategies during Gran Recapte",
    ],
  },
  {
    id: "RA6" as const,
    title: "Global significance",
    description: "Engage with issues of global importance.",
    examples: [
      "Food insecurity",
      "Biodiversity, water and climate",
      "Economic inequality, migration and energy transition",
    ],
  },
  {
    id: "RA7" as const,
    title: "Ethics",
    description: "Consider the ethics of decisions and actions.",
    examples: [
      "Prioritising safety over excitement",
      "Respecting donor autonomy",
      "Applying Leave No Trace principles",
    ],
  },
];

export const monthlyReflections = [
  {
    month: "September 2025",
    title: "Reframing CAS",
    summary:
      "CAS initially felt like another obligation. The month established a more useful view: service, creativity and activity can protect balance and prevent academic burnout.",
    status: "completed",
  },
  {
    month: "October 2025",
    title: "Adapting across contexts",
    summary:
      "NASA, a scientific public event and mountain leadership demanded very different forms of communication, creativity and responsibility within one intense month.",
    status: "completed",
  },
  {
    month: "November 2025",
    title: "Consolidation and new commitments",
    summary:
      "A second mountain expedition showed visible improvement, Gran Recapte developed confidence with strangers, BJJ began, and Bojos introduced a future time-management test.",
    status: "completed",
  },
  {
    month: "December 2025",
    title: "Pending reflection",
    summary: "The source document marks this monthly reflection as projected.",
    status: "projected",
  },
];

export const featuredExperiences = experiences.filter((experience) => experience.featured);
