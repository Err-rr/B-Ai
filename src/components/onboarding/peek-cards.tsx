"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { EASE } from "@/lib/utils/motion";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";

const ROTATIONS = [-6, 3, 8];

/**
 * A fanned, rotated preview of what a selected option actually involves.
 * Brilliant fans these directly behind a single focal card; with four
 * options side by side here, the fan lives in a dedicated preview zone
 * below the grid instead (see docs/DECISIONS.md, onboarding entry).
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
        <div className="grid w-full grid-cols-1 gap-3 sm:flex sm:items-center sm:justify-center">
          {peeks.map((peek, index) => (
            <div
              key={peek}
              className="border-line bg-card shadow-hover flex items-start gap-2 rounded-xl border p-3 sm:w-40"
              style={{
                rotate: `${ROTATIONS[index % ROTATIONS.length]}deg`,
              }}
            >
              <Sparkle
                className="text-stage-learn size-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-ink-2 text-xs">{peek}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
