import type { Contribution } from "@/lib/types/domain";

/**
 * Heatmap cells for sessions 1-10 (the numbered curriculum, matching
 * the brief's "10 sessions across the top" - Pre isn't a column here).
 * Sessions without an entry for a member render as an empty cell.
 */
export const CONTRIBUTIONS: Contribution[] = [
  { memberId: "heera", sessionId: "1", intensity: 2 },
  { memberId: "heera", sessionId: "2", intensity: 3 },
  { memberId: "heera", sessionId: "3", intensity: 2 },
  { memberId: "heera", sessionId: "4", intensity: 3 },
  { memberId: "heera", sessionId: "5", intensity: 1 },

  { memberId: "ravi", sessionId: "1", intensity: 3 },
  { memberId: "ravi", sessionId: "2", intensity: 1 },
  { memberId: "ravi", sessionId: "3", intensity: 2 },
  { memberId: "ravi", sessionId: "4", intensity: 1 },
  { memberId: "ravi", sessionId: "5", intensity: 2 },

  { memberId: "mei", sessionId: "1", intensity: 1 },
  { memberId: "mei", sessionId: "2", intensity: 2 },
  { memberId: "mei", sessionId: "3", intensity: 3 },
  { memberId: "mei", sessionId: "4", intensity: 3 },
  { memberId: "mei", sessionId: "5", intensity: 2 },

  { memberId: "jamal", sessionId: "1", intensity: 2 },
  { memberId: "jamal", sessionId: "2", intensity: 1 },
  { memberId: "jamal", sessionId: "3", intensity: 3 },
  { memberId: "jamal", sessionId: "4", intensity: 2 },
  { memberId: "jamal", sessionId: "5", intensity: 1 },
];
