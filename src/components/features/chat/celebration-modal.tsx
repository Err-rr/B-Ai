"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Session } from "@/lib/types/domain";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/utils/motion";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";
import { STAGE_CLASSES } from "@/lib/utils/stage";

/**
 * The one designed celebration moment (brief section 6) - a human
 * approving a session's artifact, the core "approval gate" of the
 * product thesis. Deliberately not confetti: a single well-composed
 * beat tied to the session's own stage color.
 */
export function CelebrationModal({
  session,
  open,
  onClose,
}: {
  session: Session;
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useSafeReducedMotion();
  const stage = STAGE_CLASSES[session.stage];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Session approved"
            className="bg-card shadow-soft flex max-w-sm flex-col items-center gap-4 rounded-2xl p-10 text-center"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.32, ease: EASE.out }}
            onClick={(event) => event.stopPropagation()}
          >
            <motion.span
              className={`inline-flex size-16 items-center justify-center rounded-full ${stage.bg} text-on-accent`}
              initial={reduceMotion ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: EASE.out, delay: 0.1 }}
            >
              <Check className="size-8" aria-hidden="true" />
            </motion.span>

            <div>
              <p className="text-eyebrow text-ink-3 font-semibold uppercase">
                Session approved
              </p>
              <h2 className="text-ink mt-1 font-sans text-xl font-semibold">
                {session.title}
              </h2>
              <p className="text-ink-2 mt-1 text-sm">
                You committed: {session.artifact}
              </p>
            </div>

            <Button onClick={onClose} className="w-full">
              Keep going
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
