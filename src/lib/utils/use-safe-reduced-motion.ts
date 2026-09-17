"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * A hydration-safe `prefers-reduced-motion` read, via useSyncExternalStore
 * rather than Framer Motion's own `useReducedMotion()` — that hook reads
 * `matchMedia` synchronously on the client but can't on the server, so a
 * user who already has the OS preference on gets a real hydration
 * mismatch (caught via Playwright's `reducedMotion: 'reduce'` context).
 * `getServerSnapshot` returns `false`, matching what the server rendered;
 * React reconciles to the real value immediately after mount, the same
 * pattern `ThemeProvider` uses for its own OS-preference read.
 */
export function useSafeReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
