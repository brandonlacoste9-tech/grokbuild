# The Grok Collective — Full Product Brief (Source of Truth)

**Locked for polish of the existing build at `C:\Users\north\grok-collective`.**

## 1. Project Overview

**Name:** The Grok Collective  
**Type:** Single-page immersive studio site  
**Goal:** Premium digital home of a multi-agent AI building team. Demonstrates collaboration, process, and craft. Feels like a high-end design studio, not a product landing page.

**Tone:** Premium, collaborative, lightly witty. Confident without being corporate. Never meme-y, never brochure-like.

### Hard constraints
- Pure frontend only (v1)
- Single page with anchored sections
- Client-side simulated “Brief the Collective” responses only (API-ready shape)
- Refined cosmic aesthetic only — no noisy cyberpunk
- Dark-only
- Elegant Framer Motion (respect `prefers-reduced-motion`)
- Lighthouse-friendly (`next/image`, optimized assets)
- Full accessibility (keyboard expand, labeled fields, focus rings, semantic HTML)
- Out of scope: 3D/WebGL, auth, CMS, real multi-agent API, blog, i18n, light mode

**Footer (exact):** “Built by The Grok Collective with Grok Build” + links to Grok and xAI

**Process credit:** This site itself was created through Plan → Parallel Subagents → Review & Iterate → Ship.

## 2. Design System

| Token | Value |
|-------|--------|
| Background | `#05050A` |
| Card / secondary | `#0A0A12` / `rgba(15,15,25,0.7)` |
| Glass | `rgba(255,255,255,0.04–0.08)` + blur |
| Cyan | `#00E5FF` |
| Violet | `#8B5CF6` |
| Text | `#F1F5F9` |
| Muted | `#94A3B8` |

Typography: clean geometric sans (Inter / Geist). Kinetic treatment on hero + major section titles only.

## 3. Agents

See `src/lib/agents.ts` for locked bios.

## 4–6. Sections, brief API shape, image guide

See implementation + `docs/MASTER_PROMPT.md`.
