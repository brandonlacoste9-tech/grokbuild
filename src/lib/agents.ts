export type AgentId = "grok" | "benjamin" | "harper" | "lucas";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  tagline: string;
  personality: string;
  specialties: string[];
  accent: "cyan" | "violet" | "mixed" | "cyan-hot";
  portrait: string;
  monogram: string;
}

export const agents: Agent[] = [
  {
    id: "grok",
    name: "Grok",
    role: "Team Lead",
    tagline: "The orchestrator with a dry wit and zero patience for fluff.",
    personality:
      "Coordinates the collective with clarity and edge. Cuts fluff, frames the mission, and stitches every specialist thread into one coherent ship.",
    specialties: [
      "Coordination",
      "Prompt engineering",
      "High-level strategy",
      "Final synthesis",
    ],
    accent: "mixed",
    portrait: "/agents/grok.jpg",
    monogram: "G",
  },
  {
    id: "benjamin",
    name: "Benjamin",
    role: "Architecture",
    tagline: "The systems thinker who turns chaos into clean structure.",
    personality:
      "Calm and structural. Maps requirements, scalability, and information architecture before a single pixel is polished.",
    specialties: [
      "Information architecture",
      "Technical strategy",
      "Requirements",
      "Scalability & performance foundations",
    ],
    accent: "cyan",
    portrait: "/agents/benjamin.jpg",
    monogram: "B",
  },
  {
    id: "harper",
    name: "Harper",
    role: "Design & Experience",
    tagline: "The visual craftsperson who makes the invisible feel inevitable.",
    personality:
      "Taste-forward and precise. Owns design systems, motion language, and the shared Imagine style so every surface feels of one mind.",
    specialties: [
      "Design systems",
      "UI/UX",
      "Motion language",
      "Visual consistency & Grok Imagine direction",
    ],
    accent: "violet",
    portrait: "/agents/harper.jpg",
    monogram: "H",
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Engineering & Interaction",
    tagline: "The pragmatic builder who makes things work and feel alive.",
    personality:
      "Performance-obsessed and accessibility-first. Wires interactivity, forms, and progressive enhancement so craft survives contact with the real world.",
    specialties: [
      "Interactivity",
      "Performance",
      "Form logic",
      "Accessibility & progressive enhancement",
    ],
    accent: "cyan-hot",
    portrait: "/agents/lucas.jpg",
    monogram: "L",
  },
];

export const processSteps = [
  {
    id: "plan",
    title: "Plan",
    description:
      "Align on goals, constraints, and architecture. Define success before we write a line.",
  },
  {
    id: "parallel",
    title: "Parallel Subagents",
    description:
      "Specialists work concurrently — structure, design, interaction, and synthesis in concert.",
  },
  {
    id: "review",
    title: "Review & Iterate",
    description:
      "Critique hard, refine soft. Harden the edges until the product feels inevitable.",
  },
  {
    id: "ship",
    title: "Ship",
    description:
      "Deploy, verify, and tell the story. Coordinated craft, not lone-wolf heroics.",
  },
] as const;

export const projects = [
  {
    id: "grok-collective",
    title: "The Grok Collective",
    blurb:
      "Flagship — our own studio home. A living demo of multi-agent process and refined cosmic craft.",
    tags: ["Flagship", "Next.js", "Motion"],
    featured: true,
    status: "Live",
  },
  {
    id: "horizon-station",
    title: "Horizon Station",
    blurb: "An orbital habitat experience — immersive UI for life beyond the atmosphere.",
    tags: ["Experience", "Spatial UI"],
    featured: false,
    status: "Example",
  },
  {
    id: "cosmos-codex",
    title: "Cosmos Codex",
    blurb: "Interactive universe explorer with structured knowledge and cinematic navigation.",
    tags: ["Explorer", "Content"],
    featured: false,
    status: "Example",
  },
  {
    id: "prompt-forge",
    title: "Prompt Forge",
    blurb: "Multi-agent brief tool that turns rough ideas into structured collaborative plans.",
    tags: ["Tools", "Multi-agent"],
    featured: false,
    status: "Example",
  },
] as const;
