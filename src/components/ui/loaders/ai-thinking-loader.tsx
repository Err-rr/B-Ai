"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/utils/motion";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";

export interface AIThinkingLoaderProps {
  /** Contextual narration, e.g. ["Reading your problem statement", "Checking competitors"]. */
  messages: string[];
  className?: string;
}

/**
 * Carries the long AI waits (30-90s on research-heavy sessions). Never
 * a bare spinner - it narrates what the AI is actually doing, cycling
 * through the messages the caller passes in for its own context.
 */
export function AIThinkingLoader({
  messages,
  className,
}: AIThinkingLoaderProps) {
  const reduceMotion = useSafeReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 2) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 2200);
    return () => clearInterval(id);
  }, [messages.length]);

  const current = messages[index % messages.length];

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <motion.span
        className="bg-green size-2 shrink-0 rounded-full"
        animate={reduceMotion ? { opacity: 0.9 } : { opacity: [0.3, 1, 0.3] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASE.out }}
          className="text-ink-2 text-sm"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
