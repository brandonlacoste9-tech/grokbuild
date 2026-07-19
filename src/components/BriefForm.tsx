"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  buildBriefResponse,
  type BriefResponse,
  type Complexity,
} from "@/lib/brief-response";
import { SectionHeading } from "./SectionHeading";

const complexityOptions: { value: Complexity; label: string }[] = [
  { value: "lean", label: "Lean MVP" },
  { value: "standard", label: "Standard" },
  { value: "ambitious", label: "Ambitious" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00E5FF]/85">
      {children}
    </h3>
  );
}

function ContributionItem({
  agent,
  role,
  contribution,
  defaultOpen,
}: {
  agent: string;
  role: string;
  contribution: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-text">
          {agent}
        </span>
        <span className="flex items-center gap-2">
          <span className="hidden text-xs text-muted sm:inline">{role}</span>
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-xs text-muted"
            aria-hidden
          >
            {open ? "−" : "+"}
          </span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="border-t border-white/10 px-4 pb-4 pt-3 text-sm leading-relaxed text-muted">
              <span className="mb-1 block text-xs text-muted/80 sm:hidden">
                {role}
              </span>
              {contribution}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export function BriefForm() {
  const reduce = useReducedMotion();
  const [idea, setIdea] = useState("");
  const [goals, setGoals] = useState("");
  const [stylePreferences, setStylePreferences] = useState("");
  const [complexity, setComplexity] = useState<Complexity>("standard");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<BriefResponse | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = idea.trim();
    if (trimmed.length < 12) {
      setError("Give us a bit more detail — at least a sentence about the idea.");
      return;
    }

    setLoading(true);
    setResponse(null);

    await new Promise((r) => setTimeout(r, reduce ? 200 : 1400));

    setResponse(
      buildBriefResponse({
        idea: trimmed,
        goals: goals.trim() || undefined,
        stylePreferences: stylePreferences.trim() || undefined,
        complexity,
      }),
    );
    setLoading(false);
  }

  return (
    <section id="brief" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Engage"
          title="Brief the Collective"
          description="Describe an idea. We’ll return a structured multi-agent response — API-ready shape, client-side simulation for v1."
        />

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <motion.form
            onSubmit={onSubmit}
            noValidate
            className="glass rounded-2xl p-6 sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Project idea <span className="text-[#00E5FF]">*</span>
              </span>
              <textarea
                name="idea"
                required
                rows={5}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="field min-h-[120px] resize-y"
                placeholder="What should we build? Audience and constraints welcome…"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Goals{" "}
                <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <textarea
                name="goals"
                rows={2}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="field resize-y"
                placeholder="What does success look like?"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Style preferences{" "}
                <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <input
                type="text"
                name="stylePreferences"
                value={stylePreferences}
                onChange={(e) => setStylePreferences(e.target.value)}
                className="field"
                placeholder="e.g. refined cosmic, editorial, minimal glass"
              />
            </label>

            <fieldset className="mt-5">
              <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                Complexity
              </legend>
              <div className="flex flex-wrap gap-2">
                {complexityOptions.map((opt) => {
                  const active = complexity === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`focus-within:ring-2 focus-within:ring-[#00E5FF]/70 focus-within:ring-offset-2 focus-within:ring-offset-void cursor-pointer rounded-full border px-3 py-1.5 text-sm transition ${
                        active
                          ? "border-[#00E5FF]/40 bg-[#00E5FF]/15 text-cyan-50"
                          : "border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-text"
                      }`}
                    >
                      <input
                        type="radio"
                        name="complexity"
                        value={opt.value}
                        checked={active}
                        onChange={() => setComplexity(opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {error ? (
              <p className="mt-4 text-sm text-rose-300" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-6 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Assembling the Collective…" : "Send brief"}
            </button>
          </motion.form>

          <div className="min-h-[320px]" aria-live="polite">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl p-8 text-center"
                >
                  <div
                    className="mb-4 h-10 w-10 rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF] motion-safe:animate-spin"
                    aria-hidden
                  />
                  <p className="font-display text-lg text-text">
                    The Collective is assembling…
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Grok · Benjamin · Harper · Lucas
                  </p>
                </motion.div>
              ) : response ? (
                <motion.div
                  key="response"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass max-h-[min(70vh,720px)] overflow-y-auto rounded-2xl p-6 sm:p-8"
                >
                  <section className="pb-6">
                    <SectionLabel>Summary</SectionLabel>
                    <p className="text-sm leading-relaxed text-text/95 sm:text-[0.95rem]">
                      {response.summary}
                    </p>
                  </section>

                  <section className="border-t border-white/10 py-6">
                    <SectionLabel>Process</SectionLabel>
                    <ol className="space-y-2.5">
                      {response.process.map((step, i) => (
                        <li
                          key={step}
                          className="flex gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#8B5CF6]/35 bg-[#8B5CF6]/10 text-[10px] font-semibold text-violet-200">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="border-t border-white/10 py-6">
                    <SectionLabel>Contributions</SectionLabel>
                    <ul className="space-y-3">
                      {response.contributions.map((c, i) => (
                        <ContributionItem
                          key={c.agent}
                          agent={c.agent}
                          role={c.role}
                          contribution={c.contribution}
                          defaultOpen={i === 0}
                        />
                      ))}
                    </ul>
                  </section>

                  <section className="border-t border-white/10 pt-6">
                    <div className="rounded-xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-4 py-4">
                      <SectionLabel>Next steps</SectionLabel>
                      <ul className="space-y-2">
                        {response.nextSteps.map((step) => (
                          <li
                            key={step}
                            className="flex gap-2 text-sm leading-relaxed text-violet-100/90"
                          >
                            <span className="text-violet-300" aria-hidden>
                              •
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass flex h-full min-h-[320px] flex-col justify-center rounded-2xl border-dashed p-8"
                >
                  <p className="font-display text-xl text-text">
                    Your multi-agent response appears here.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Submit a brief for a structured response: summary, process,
                    each agent’s contribution, and next steps.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
