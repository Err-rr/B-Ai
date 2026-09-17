import type { Chapter } from "@/lib/types/domain";

export const CHAPTERS: Chapter[] = [
  {
    id: "speedrunning",
    number: 1,
    title: "Speedrunning",
    description: "Build a wireframe MVP in under an hour.",
    covers: [
      "Sketch a low-fi MVP",
      "Drag in 8+ components",
      "Save your first canvas",
    ],
  },
  {
    id: "working-with-ai",
    number: 2,
    title: "Working with AI",
    description: "Learn the AI fundamentals every founder needs.",
    covers: [
      "Complete 3 lessons",
      "Score ≥80% on quizzes",
      "Reflect on AI use",
    ],
  },
  {
    id: "ideation",
    number: 3,
    title: "Ideation",
    description: "Find a real problem worth solving.",
    covers: [
      "Pick up to 3 SDGs",
      "Draft a problem statement",
      "Survive the assumption challenger",
    ],
  },
  {
    id: "team-formation",
    number: 4,
    title: "Team Formation",
    description: "Lock in your founding team and roles.",
    covers: ["Invite teammates", "Pick CXO roles", "Commit your team"],
  },
  {
    id: "market-gtm",
    number: 5,
    title: "Market & GTM",
    description: "Size your market and design GTM experiments.",
    covers: [
      "Define your ICP",
      "Run a GTM experiment",
      "Estimate TAM, SAM, SOM",
    ],
  },
  {
    id: "financials",
    number: 6,
    title: "Financials",
    description: "Build your business model and 12-month P&L.",
    covers: [
      "Model your revenue streams",
      "Project a 12-month P&L",
      "Stress-test your assumptions",
    ],
  },
];
