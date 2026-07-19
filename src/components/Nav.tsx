"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const links = [
  { href: "#agents", label: "Agents" },
  { href: "#process", label: "How we build" },
  { href: "#showcase", label: "Showcase" },
  { href: "#brief", label: "Brief us" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-void/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-text"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition group-hover:border-cyan-300/50">
            GC
          </span>
          <span className="hidden sm:inline">The Grok Collective</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#brief" className="btn-primary text-sm">
          Brief the Collective
        </a>
      </div>
    </motion.header>
  );
}
