"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/agents";
import { SectionHeading } from "./SectionHeading";

export function Showcase() {
  const reduce = useReducedMotion();

  return (
    <section id="showcase" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Work"
          title="Showcase"
          description="Flagship first — plus example builds that show the range of the studio."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const featured = project.featured;
            return (
              <motion.article
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`glass group relative overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 ${
                  featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-3xl ${
                    featured
                      ? "bg-gradient-to-br from-cyan-400/25 to-violet-500/25"
                      : "bg-violet-500/15"
                  }`}
                />

                <div className="relative flex h-full flex-col">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        project.status === "Live"
                          ? "border border-[#00E5FF]/30 bg-[#00E5FF]/10 text-cyan-100"
                          : "border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 text-violet-200"
                      }`}
                    >
                      {project.status}
                    </span>
                    {featured ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted">
                        Flagship
                      </span>
                    ) : null}
                  </div>

                  <h3
                    className={`font-display font-semibold text-text ${
                      featured ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed text-muted ${
                      featured ? "max-w-xl text-base sm:text-lg" : "text-sm"
                    }`}
                  >
                    {project.blurb}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
