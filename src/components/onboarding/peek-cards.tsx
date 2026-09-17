"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { EASE } from "@/lib/utils/motion";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";

const ROTATIONS = [
  "-rotate-[6deg]",
  "rotate-[3deg]",
  "rotate-[8deg]",
];

/**
 * A fanned, rotated preview of what a selected option actually involves.
 * Brilliant fans these directly behind a single focal card; with four
 * options side by side here, the fan lives in a dedicated preview zone
 * below the grid instead (see docs/DECISIONS.md, onboarding entry).
 * Same fanned row at every width - only the card size shrinks on phone.
 */
export function PeekCards({
  roleLabel,
  peeks,
}: {
  roleLabel: string;
  peeks: string[];
}) {
  const reduceMotion = useSafeReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={roleLabel}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.24, ease: EASE.out }}
        className="flex w-full flex-col items-center gap-4 pb-4"
      >
        <p className="text-ink-3 text-sm">What the {roleLabel} actually does</p>
        <div className="flex w-full items-center justify-center gap-1.5 sm:gap-3">
          {peeks.map((peek, index) => (
            <div
              key={peek}
              className={`border-line bg-stage-learn-tint shadow-hover flex w-24 items-start gap-1 rounded-lg border p-2 sm:w-40 sm:gap-2 sm:rounded-xl sm:p-3 ${ROTATIONS[index % ROTATIONS.length]}`}
            >
              <Sparkle
                className="text-stage-learn mt-0.5 size-3 shrink-0 sm:mt-0 sm:size-3.5"
                aria-hidden="true"
              />
              <span className="text-ink-2 text-[11px] leading-snug sm:text-xs">
                {peek}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
