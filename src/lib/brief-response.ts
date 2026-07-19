export type AgentName = "Grok" | "Benjamin" | "Harper" | "Lucas";
export type Complexity = "lean" | "standard" | "ambitious";

export interface BriefInput {
  idea: string;
  goals?: string;
  stylePreferences?: string;
  complexity: Complexity;
}

/** API-ready response shape for future multi-agent backend swap. */
export interface BriefResponse {
  summary: string;
  process: string[];
  contributions: Array<{
    agent: AgentName;
    role: string;
    contribution: string;
  }>;
  nextSteps: string[];
}

function pickSnippet(idea: string, max = 90): string {
  const cleaned = idea.trim().replace(/\s+/g, " ");
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max).trim()}…`;
}

export function buildBriefResponse(input: BriefInput): BriefResponse {
  const snippet = pickSnippet(input.idea);
  const goals = input.goals?.trim();
  const style = input.stylePreferences?.trim();
  const complexity = input.complexity;

  const complexityNote =
    complexity === "lean"
      ? "We’ll bias toward a sharp MVP with ruthless scope control."
      : complexity === "ambitious"
        ? "We’ll stage an ambitious roadmap with clear phase gates so ambition doesn’t become thrash."
        : "We’ll target a balanced first ship: polished, complete, and ready to grow.";

  const styleNote = style
    ? ` Visual direction will honor: “${pickSnippet(style, 70)}”.`
    : " Visual direction stays refined cosmic — cyan/violet glass on deep void.";

  const goalsNote = goals
    ? ` Success criteria anchor on: “${pickSnippet(goals, 70)}”.`
    : "";

  return {
    summary: `We’ve reviewed “${snippet}”.${goalsNote} ${complexityNote}${styleNote} Here’s how The Grok Collective would approach it as a studio.`,
    process: [
      "Plan — align goals, constraints, and architecture",
      "Parallel Subagents — structure, design, interaction, and synthesis in concert",
      "Review & Iterate — critique, refine, harden",
      "Ship — deploy, verify, tell the story",
    ],
    contributions: [
      {
        agent: "Grok",
        role: "Team Lead",
        contribution: `I’d frame the mission as one sharp promise with measurable outcomes. For “${snippet}”, I’d cut fluff, set tone, and own final synthesis so the team ships one coherent story — not four clever fragments.`,
      },
      {
        agent: "Benjamin",
        role: "Architecture",
        contribution:
          complexity === "ambitious"
            ? `I’d break this into modular domains with clear interfaces: core experience first, expansion surfaces second. Prefer typed content models, a single-page or light multi-section shell, and a brief/response boundary that stays API-ready.`
            : `I’d lock a clean information architecture early — hero → proof → action — with typed models and a client-first brief pipeline that can later call a real multi-agent API without redesign.`,
      },
      {
        agent: "Harper",
        role: "Design & Experience",
        contribution: `I’d set a premium studio system: void backgrounds, glass panels, cyan (#00E5FF) and violet (#8B5CF6) accents only where hierarchy needs light. Kinetic type on the hero and major titles; quieter motion elsewhere so craft feels inevitable, not noisy.`,
      },
      {
        agent: "Lucas",
        role: "Engineering & Interaction",
        contribution: `I’d wire progressive, accessible interaction: keyboard-expandable agent surfaces, scroll-aware process reveals, and a brief form with structured loading/error/success states. Performance and reduced-motion paths are non-negotiable.`,
      },
    ],
    nextSteps: [
      "Share audience, timeline, and hard constraints (stack, brand, compliance).",
      "Approve a one-page build plan with scope gates for the first ship.",
      "Generate consistent Imagine assets from a shared style anchor.",
      "Ship a polished frontend, then optionally wire a real multi-agent API into the same response shape.",
    ],
  };
}
