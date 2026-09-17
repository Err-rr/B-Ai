"use client";

import { motion } from "framer-motion";
import { STAGE_CLASSES, SESSION_STAGE_SEQUENCE } from "@/lib/utils/stage";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";

/**
 * The route-transition loader: the eleven session dots (Pre + 1-10)
 * chase through in stage-colour sequence. Chosen over a generic
 * progress bar or a logo draw because it rehearses the one thing every
 * screen in the app wants a student to feel — where they sit on the
 * ten-session arc — even during a loading state. See docs/DECISIONS.md.
 *
 * `compact` drops the full-viewport min-height for embedding inline
 * (e.g. the /design showcase) rather than as a route's loading.tsx.
 */
export function RouteTransitionLoader({ compact }: { compact?: boolean }) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${compact ? "py-10" : "min-h-[50vh]"}`}
    >
      <div className="flex items-center gap-2.5">
        {SESSION_STAGE_SEQUENCE.map((stage, index) => (
          <motion.span
            key={index}
            className={`size-2.5 rounded-full ${STAGE_CLASSES[stage].bg}`}
            animate={
              reduceMotion
                ? { opacity: 0.9 }
                : { opacity: [0.25, 1, 0.25], scale: [0.85, 1.1, 0.85] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.08,
                  }
            }
          />
        ))}
      </div>
      <p className="text-ink-3 text-sm">Loading your bootcamp…</p>
    </div>
  );
}
