import type { Session } from "@/lib/types/domain";
import { delay } from "./delay";
import { SESSIONS } from "./fixtures/sessions";

export async function getSessions(): Promise<Session[]> {
  return delay(SESSIONS);
}

export async function getSession(id: string): Promise<Session | undefined> {
  return delay(SESSIONS.find((s) => s.id === id));
}

export async function getCurrentSession(): Promise<Session | undefined> {
  return delay(SESSIONS.find((s) => s.status === "current"));
}

/**
 * The 10 numbered sessions, excluding "Pre" — this is the denominator
 * behind every "X of 10 sessions" figure in the app (landing headline,
 * progress bars, stat pills), matching the brief's "10 sessions."
 */
export async function getNumberedSessions(): Promise<Session[]> {
  return delay(SESSIONS.filter((s) => s.id !== "pre"));
}
