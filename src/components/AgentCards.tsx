"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { agents, type Agent } from "@/lib/agents";
import { SectionHeading } from "./SectionHeading";

const accentRing: Record<Agent["accent"], string> = {
  cyan: "from-[#00E5FF]/50 to-cyan-900/10",
  violet: "from-[#8B5CF6]/50 to-violet-900/10",
  mixed: "from-[#00E5FF]/40 via-[#8B5CF6]/40 to-transparent",
  "cyan-hot": "from-[#00E5FF]/60 to-[#8B5CF6]/20",
};

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        // Return focus to the card control after collapse
        requestAnimationFrame(() => buttonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group glass relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-[#00E5FF]/30 hover:shadow-[0_20px_60px_-20px_rgba(0,229,255,0.35)] sm:min-h-[30rem]"
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${accentRing[agent.accent]} opacity-60`}
      />

      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="focus-ring relative flex h-full min-h-0 flex-1 flex-col p-5 text-left"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <div className="relative mx-auto mb-5 h-36 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-lg sm:h-40 sm:w-40">
          <Image
            src={agent.portrait}
            alt={`${agent.name}, ${agent.role}`}
            fill
            sizes="(max-width: 640px) 144px, 160px"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            priority={index < 2}
          />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-text">
              {agent.name}
            </h3>
            <p className="mt-0.5 text-sm text-[#00E5FF]/90">{agent.role}</p>
          </div>
          <span
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-muted transition group-hover:border-[#00E5FF]/40 group-hover:text-cyan-100"
            aria-hidden
          >
            {open ? "−" : "+"}
          </span>
        </div>

        <p className="mt-3 shrink-0 text-sm leading-relaxed text-muted">
          {agent.tagline}
        </p>

        {/* Expand-in-place details: fills remaining card height for equal row stretch */}
        <div className="mt-4 flex min-h-0 flex-1 flex-col border-t border-white/10 pt-4">
          <AnimatePresence initial={false} mode="wait">
            {open ? (
              <motion.div
                key="open"
                id={panelId}
                role="region"
                aria-label={`${agent.name} details`}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-0 flex-1 flex-col"
              >
                <p className="text-sm leading-relaxed text-text/90">
                  {agent.personality}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {agent.specialties.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.p
                key="closed"
                initial={false}
                className="text-xs leading-relaxed text-muted/70"
              >
                Expand for personality and specialties
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.article>
  );
}

export function AgentCards() {
  return (
    <section id="agents" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Meet the Collective"
          title="Four complementary intelligences."
          description="Each agent brings a distinct craft. Expand a card with click, Enter, or Space — Escape to close."
        />
        <div className="grid auto-rows-fr items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
