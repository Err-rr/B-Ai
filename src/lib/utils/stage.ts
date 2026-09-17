import type { Stage } from "@/lib/types/stage";

export type { Stage };

/**
 * Every place a stage color appears (badges, progress segments, tinted
 * panels, the session journey) reads from here, never a raw class string.
 */
export const STAGE_ORDER: Stage[] = [
  "learn",
  "learn-to-build",
  "build",
  "launch",
];

export const STAGE_LABEL: Record<Stage, string> = {
  learn: "Learn",
  "learn-to-build": "Learn to Build",
  build: "Build",
  launch: "Launch",
};

interface StageClasses {
  bg: string;
  text: string;
  border: string;
  tintBg: string;
}

export const STAGE_CLASSES: Record<Stage, StageClasses> = {
  learn: {
    bg: "bg-stage-learn",
    text: "text-stage-learn",
    border: "border-stage-learn",
    tintBg: "bg-stage-learn-tint",
  },
  "learn-to-build": {
    bg: "bg-stage-learn-to-build",
    text: "text-stage-learn-to-build",
    border: "border-stage-learn-to-build",
    tintBg: "bg-stage-learn-to-build-tint",
  },
  build: {
    bg: "bg-stage-build",
    text: "text-stage-build",
    border: "border-stage-build",
    tintBg: "bg-stage-build-tint",
  },
  launch: {
    bg: "bg-stage-launch",
    text: "text-stage-launch",
    border: "border-stage-launch",
    tintBg: "bg-stage-launch-tint",
  },
};

/**
 * The real stage of each of the 11 sessions (Pre + 1-10), in order.
 * Drives the route-transition loader dots. This is intentionally a
 * static content fact, not routed through lib/data/ — a loading.tsx
 * fallback must render instantly and can't await a fixture. The real
 * Session fixtures in lib/data/sessions.ts are the source of truth
 * everywhere else and must stay consistent with this order.
 */
export const SESSION_STAGE_SEQUENCE: Stage[] = [
  "learn", // Pre — AI Readiness & Digital Citizenship
  "learn-to-build", // 1 — Problem & Solution
  "learn-to-build", // 2 — Team Formation & CXO Roles
  "learn-to-build", // 3 — Mentorship & Booking
  "learn-to-build", // 4 — Market, Competition & GTM
  "build", // 5 — Product Logic & MVP
  "learn-to-build", // 6 — Business Model Canvas
  "learn-to-build", // 7 — Financial Model
  "build", // 8 — Pitch Deck & Visuals
  "launch", // 9 — Pitch Practice & Feedback
  "launch", // 10 — Final Pitch Presentation
];
