"use client";

import { motion, useReducedMotion } from "framer-motion";

const headlineWords = ["Four", "Minds.", "One", "Mission."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center pt-20 pb-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <motion.p
            className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-violet-300/90"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Multi-agent studio
          </motion.p>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="sr-only">Four Minds. One Mission.</span>
            <span
              aria-hidden
              className="kinetic-gradient flex flex-wrap gap-x-[0.28em]"
            >
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word + i}
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: reduce ? 0 : 0.12 + i * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.55 }}
          >
            The Grok Collective is a studio of complementary intelligences —
            strategy, architecture, design, and interaction — building together
            with premium craft.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.65 }}
          >
            <a href="#agents" className="btn-primary">
              Meet the Collective
            </a>
            <a href="#brief" className="btn-ghost">
              Brief Us
            </a>
          </motion.div>

          <motion.dl
            className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.8 }}
          >
            {[
              { label: "Agents", value: "4" },
              { label: "Mode", value: "Parallel" },
              { label: "Stack", value: "Next.js" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-text sm:text-xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
