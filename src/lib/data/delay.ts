/**
 * Simulates network latency for the mock data layer. Every accessor in
 * lib/data/ awaits this — when a real backend arrives, only the body
 * of each accessor changes (fixture read -> fetch/query); call sites
 * never change (see docs/DECISIONS.md D-010).
 */
export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
