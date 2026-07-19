"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  kinetic?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  kinetic = true,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`mb-12 max-w-2xl ${alignClass}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#00E5FF]/80">
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
          kinetic ? "kinetic-gradient" : "text-text"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
