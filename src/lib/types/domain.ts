import type { Stage } from "./stage";

export type CXORole = "CEO" | "CTO" | "CMO" | "CFO";

export type SessionStatus = "complete" | "current" | "upcoming";

export interface Session {
  id: string;
  /** Display number: "Pre", "1".."10". */
  number: string;
  title: string;
  stage: Stage;
  /** What the session produces, e.g. "Problem statement". */
  artifact: string;
  status: SessionStatus;
}

export interface Member {
  id: string;
  name: string;
  role: CXORole;
  email: string;
}

export interface Team {
  id: string;
  name: string;
  mission: string;
  members: Member[];
}

export interface Venture {
  id: string;
  name: string;
  description: string;
  stage: Stage;
  /** Natural-language maturity label shown alongside the stage badge, e.g. "Early validation". */
  maturity: string;
}

export interface Artifact {
  id: string;
  sessionId: string;
  sessionTitle: string;
  title: string;
  committedBy: string;
  committedAt: string;
  status: "approved" | "pending";
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  /** Markdown content. */
  content: string;
  createdAt: string;
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Key into the icon registry - data stays framework-agnostic. */
  icon: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  covers: string[];
}

export interface Contribution {
  memberId: string;
  sessionId: string;
  /** Heatmap cell strength. */
  intensity: 0 | 1 | 2 | 3;
}

export interface SessionTimeLog {
  sessionId: string;
  sessionTitle: string;
  minutesSpent: number;
  minutesTotal: number;
}

export interface Profile {
  member: Member;
  school: string;
  stagesComplete: number;
  totalSessions: number;
  totalTimeMinutes: number;
  contributions: SessionTimeLog[];
}
