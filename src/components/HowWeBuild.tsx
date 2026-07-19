"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/agents";
import { SectionHeading } from "./SectionHeading";

export function HowWeBuild() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we build"
          title="Plan. Parallel. Review. Ship."
          description="A deliberate multi-agent pipeline — coordinated craft at speed."
        />

        <motion.div
          className="glass mb-12 rounded-2xl border-[#00E5FF]/20 p-5 sm:p-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-center text-sm leading-relaxed text-text sm:text-base">
            <span className="font-medium text-[#00E5FF]">
              This site itself was created through the multi-agent process
            </span>{" "}
            by The Grok Collective:{" "}
            <span className="text-muted">
              Plan → Parallel Subagents → Review & Iterate → Ship.
            </span>
          </p>
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#00E5FF]/50 via-[#8B5CF6]/40 to-transparent md:left-1/2 md:block"
          />

          <ol className="space-y-6 md:space-y-0">
            {processSteps.map((step, index) => {
              const left = index % 2 === 0;
              return (
                <motion.li
                  key={step.id}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative md:grid md:grid-cols-2 md:gap-10 md:py-6"
                >
                  <div
                    className={
                      left
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    }
                  >
                    <div className="glass group rounded-2xl p-6 transition hover:border-[#8B5CF6]/30">
                      <div
                        className={`mb-3 flex items-center gap-3 ${
                          left ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 font-display text-sm font-semibold text-cyan-100">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl font-semibold text-text">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div
                    aria-hidden
                    className="absolute left-6 top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#00E5FF] bg-void shadow-[0_0_16px_rgba(0,229,255,0.7)] md:left-1/2 md:block"
                  />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
