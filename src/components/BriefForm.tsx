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

        <div className="grid gap-8 lg:grid-cols-2">
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
                      className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition ${
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
                  <div className="mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#00E5FF]/30 border-t-[#00E5FF]" />
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
                  className="glass rounded-2xl p-6 sm:p-8"
                >
                  <p className="text-sm leading-relaxed text-[#00E5FF]/90">
                    {response.summary}
                  </p>

                  <div className="mt-5">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
                      Process
                    </h3>
                    <ol className="mt-2 space-y-1.5">
                      {response.process.map((step) => (
                        <li
                          key={step}
                          className="text-sm text-muted before:mr-2 before:text-[#8B5CF6] before:content-['→']"
                        >
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <ul className="mt-6 space-y-5">
                    {response.contributions.map((c) => (
                      <li
                        key={c.agent}
                        className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-lg font-semibold text-text">
                            {c.agent}
                          </h3>
                          <span className="text-xs text-muted">{c.role}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {c.contribution}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-4 py-3">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-violet-200">
                      Next steps
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {response.nextSteps.map((step) => (
                        <li key={step} className="text-sm text-violet-100/90">
                          • {step}
                        </li>
                      ))}
                    </ul>
                  </div>
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
