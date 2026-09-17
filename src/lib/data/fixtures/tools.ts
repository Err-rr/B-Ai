import type { Tool } from "@/lib/types/domain";

export const TOOLS: Tool[] = [
  {
    id: "idea-pressure-tester",
    slug: "idea-pressure-tester",
    title: "Idea Pressure-Tester",
    description:
      "Stress-test your venture's core assumptions before you build.",
    icon: "FlaskConical",
  },
  {
    id: "customer-interview-coach",
    slug: "customer-interview-coach",
    title: "Customer Interview Coach",
    description: "Plan, role-play, and debrief customer interviews.",
    icon: "MessagesSquare",
  },
  {
    id: "lean-canvas-builder",
    slug: "lean-canvas-builder",
    title: "Lean Canvas Builder",
    description: "Co-author a one-page strategy you'll actually use.",
    icon: "LayoutGrid",
  },
  {
    id: "pitch-rehearsal",
    slug: "pitch-rehearsal",
    title: "Pitch Rehearsal",
    description: "Practice your pitch and get instant feedback on delivery.",
    icon: "Mic",
  },
  {
    id: "market-sizing-helper",
    slug: "market-sizing-helper",
    title: "Market-Sizing Helper",
    description: "Size your market with real numbers, not guesses.",
    icon: "Calculator",
  },
];
