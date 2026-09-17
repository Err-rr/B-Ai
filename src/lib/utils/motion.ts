/**
 * Numeric mirror of the easing/duration custom properties in
 * src/styles/tokens.css, for use in Framer Motion transition objects
 * (which need numbers and bezier arrays, not CSS var strings). Keep
 * these two files in sync if either changes.
 */
export const EASE = {
  standard: [0.4, 0, 0.2, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const DURATION = {
  fast: 0.12,
  base: 0.2,
  slow: 0.36,
};
